import Email from "../models/email.js";
import { generateEmail as generateEmailWithGroq } from "../services/groqService.js";

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

    return res.status(200).json({
      success: true,
      email: generatedText,
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

// GET /api/email - Get all emails
export const getAllEmails = async (req, res) => {
  try {
    const emails = await Email
      .find({ userId: req.user.id })
      .populate("userId", "name email");

    res.status(200).json({
      success: true,
      count: emails.length,
      data: emails,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching emails",
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
    const email = await Email.findByIdAndDelete(req.params.id);

    if (!email) {
      return res.status(404).json({
        success: false,
        message: "Email not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Email deleted successfully",
      data: email,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting email",
      error: error.message,
    });
  }
};

