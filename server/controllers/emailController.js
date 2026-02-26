import Email from "../models/Email.js";
import { generateEmail as generateEmailWithGroq } from "../services/groqService.js";
import ActivityLog from "../models/ActivityLog.js";
import { sendMail } from "../services/mailService.js";

// POST /api/email/generate - Generate email with AI
export const generateEmail = async (req, res) => {
  console.log("Request received at /api/email/generate");
  console.log("Request body:", req.body);
  try {
    const { purpose, tone, type, length, keywords } = req.body;

    if (!purpose || typeof purpose !== "string" || !purpose.trim()) {
      return res.status(400).json({
        success: false,
        message: "Purpose is required",
      });
    }

    const params = {
      purpose: purpose.trim(),
      tone: tone != null ? String(tone).trim() : "",
      type: type != null ? String(type).trim() : "",
      length: length != null ? String(length).trim() : "",
      keywords: keywords != null ? String(keywords).trim() : "",
    };

    const prompt = `You are a professional email writer. Write a complete, structured email based on the following requirements.

Requirements:
- Purpose: ${params.purpose || "General correspondence"}
- Tone: ${params.tone || "Professional"} (match this tone exactly)
- Formality: ${params.type || "Formal"} (match this level of formality)
- Length requirement:
Length requirement:
${params.length === "short"
        ? "- The email MUST contain only ONE short paragraph in the body (maximum 4 sentences)."
        : params.length === "medium"
          ? "- The email MUST contain exactly TWO paragraphs in the body."
          : "- The email MUST contain at least THREE paragraphs in the body."
      }

- Do not exceed the required number of paragraphs.
- Do not add extra paragraphs beyond the specified length.
${params.keywords ? `- Weave these keywords naturally into the email (do not list them as bullets): ${params.keywords}` : ""}

Instructions:
- Include a clear "Subject:" line at the very beginning.
- Write a complete email with greeting, body, and closing.
- Sound human and natural; avoid robotic or template-like phrasing.
- Match the requested tone and formality throughout.
- Respect the requested length.
- Do not add meta-commentary or explanations—output only the email text.`;

    const generatedText = await generateEmailWithGroq(prompt);
    // Save generated email to database
    // Extract subject from generated text
    let subjectLine = "No Subject";
    const subjectMatch = generatedText.match(/Subject:\s*(.*)/i);
    if (subjectMatch && subjectMatch[1]) {
      subjectLine = subjectMatch[1].trim();
    }

    // Save to database
    const newEmail = await Email.create({
      userId: req.user.id,
      subject: subjectLine,
      purpose: params.purpose,
      tone: params.tone,
      generatedContent: generatedText,
      status: "final",
    });
    await ActivityLog.create({
      userId: req.user.id,
      emailId: newEmail._id,
      action: "created",
    });

    return res.status(200).json({
      success: true,
      email: generatedText,
      emailId: newEmail._id,
    });

  } catch (error) {
    console.error("Email Controller Error:", error);
    if (error.message === "GROQ_API_KEY is not configured") {
      return res.status(503).json({
        success: false,
        message: "Email generation service is not configured",
      });
    }
    if (error.message === "Groq returned no content") {
      return res.status(502).json({
        success: false,
        message: "Email generation failed",
      });
    }
    if (error.status === 401) {
      return res.status(502).json({
        success: false,
        message: "Invalid API key for email generation",
      });
    }
    if (error.status === 429) {
      return res.status(429).json({
        success: false,
        message: "Too many requests; please try again later",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Error generating email",
      error: error.message,
    });
  }
};

// POST /api/email/send - Send an email
export const sendEmailAction = async (req, res) => {
  try {
    const { to, from, subject, body, emailId } = req.body;

    if (!to || !subject || !body) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: to, subject, or body",
      });
    }

    await sendMail({
      from, // Optional, defaults to SMTP_USER
      to,
      subject,
      text: body,
    });

    // Log the activity
    await ActivityLog.create({
      userId: req.user.id,
      emailId: emailId || null,
      action: "sent",
    });


    res.status(200).json({
      success: true,
      message: "Email sent successfully!",
    });
  } catch (error) {
    console.error("Email Send Controller Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send email",
      error: error.message,
    });
  }
};


// GET /api/email - Get all emails
export const getAllEmails = async (req, res) => {
  try {
    const { search, tone, sort } = req.query;

    let query = { userId: req.user.id };
    if (tone) {
      query.tone = tone;
    }

    if (search) {
      query.$or = [
        { subject: { $regex: search, $options: "i" } },
        { generatedContent: { $regex: search, $options: "i" } },
        { tone: { $regex: search, $options: "i" } }
      ];
    }

    let sortOption = { createdAt: -1 }; // default: newest first

    if (sort === "oldest") {
      sortOption = { createdAt: 1 };
    } else if (sort === "az") {
      sortOption = { subject: 1 };
    } else if (sort === "za") {
      sortOption = { subject: -1 };
    }

    const emails = await Email.find(query).sort(sortOption);

    res.status(200).json({
      success: true,
      emails,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching email history",
      error: error.message,
    });
  }
};

// POST /api/email - Create new email
export const createEmail = async (req, res) => {
  try {
    const { subject, purpose, tone, recipient, keyPoints } = req.body;

    const email = await Email.create({
      userId: req.user.id,
      subject,
      purpose,
      tone,
      recipient,
      keyPoints,
    });

    res.status(201).json({
      success: true,
      data: email,
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error creating email",
      error: error.message,
    });
  }
};


// GET /api/email/:id - Get single email
export const getEmailById = async (req, res) => {
  try {
    const email = await Email.findById(req.params.id).populate(
      "userId",
      "name email"
    );

    if (!email) {
      return res.status(404).json({
        success: false,
        message: "Email not found",
      });
    }

    res.status(200).json({
      success: true,
      data: email,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching email",
      error: error.message,
    });
  }
};

// PUT /api/email/:id - Update email
export const updateEmail = async (req, res) => {
  try {
    const email = await Email.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!email) {
      return res.status(404).json({
        success: false,
        message: "Email not found",
      });
    }

    res.status(200).json({
      success: true,
      data: email,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error updating email",
      error: error.message,
    });
  }
};

// DELETE /api/email/:id - Delete email
export const deleteEmail = async (req, res) => {
  try {
    const email = await Email.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!email) {
      return res.status(404).json({
        success: false,
        message: "Email not found or not authorized",
      });
    }

    // Log activity only if deletion actually happened
    await ActivityLog.create({
      userId: req.user.id,
      emailId: req.params.id,
      action: "deleted",
    });

    res.status(200).json({
      success: true,
      message: "Email deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting email",
      error: error.message,
    });
  }
};
export const getEmailStats = async (req, res) => {
  try {
    const userId = req.user.id;

    const totalEmails = await Email.countDocuments({ userId });

    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const emailsThisWeek = await Email.countDocuments({
      userId,
      createdAt: { $gte: oneWeekAgo }
    });

    const savedDrafts = await Email.countDocuments({
      userId,
      status: "draft"
    });

    res.status(200).json({
      success: true,
      totalEmails,
      emailsThisWeek,
      savedDrafts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching stats",
      error: error.message,
    });
  }
};
export const getRecentActivity = async (req, res) => {
  try {
    const activities = await ActivityLog.find({
      userId: req.user.id,
    })
      .sort({ timestamp: -1 })
      .limit(5)
      .populate("emailId", "subject");

    res.status(200).json({
      success: true,
      activities,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching activity",
      error: error.message,
    });
  }
};
