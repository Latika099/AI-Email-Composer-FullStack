import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CreateEmail = () => {
  const navigate = useNavigate();
  const [emailPurpose, setEmailPurpose] = useState("");
  const [tone, setTone] = useState("");
  const [emailType, setEmailType] = useState("");
  const [emailLength, setEmailLength] = useState("");
  const [keywords, setKeywords] = useState("");
  const [generatedEmail, setGeneratedEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  const getSuggestedKeywords = (tone) => {
    const suggestions = {
      professional: "meeting, schedule, update, project",
      friendly: "thanks, appreciate, happy, connect",
      apology: "sorry, apologize, inconvenience, regret",
      "follow-up": "reminder, checking, update, status",
      casual: "quick note, hey, just checking"
    };
    return suggestions[tone] || "";
  };

  // Auto-fill keywords when tone changes
  useEffect(() => {
    if (tone && !keywords.trim()) {
      setKeywords(getSuggestedKeywords(tone));
    }
  }, [tone]);

  const getSubject = (purpose, emailType) => {
    if (purpose.toLowerCase().includes("leave")) {
      return "Request for Leave";
    }
    if (emailType === "formal") {
      return "Regarding: " + purpose;
    }
    return purpose;
  };

  const getGreeting = (emailType) => {
    return emailType === "formal"
      ? "Dear Sir/Madam,"
      : "Hi there,";
  };

  const buildMockEmail = (purpose, tone, type, length, keywords) => {
    const selectedTone = tone || "professional";
    const selectedType = type || "formal";
    const selectedLength = length || "medium";

    // Special Leave Email Template
    const isLeaveRequest = purpose.toLowerCase().includes("leave");
    if (isLeaveRequest && selectedType === "formal") {
      return `Subject: Request for Leave

Dear Sir/Madam,

I hope this message finds you well. I would like to formally request leave as ${purpose}. I will ensure that all my responsibilities are managed appropriately during my absence.

Kindly grant approval for the same. Please let me know if any further information is required.

Sincerely,
AI Email Composer`;
    }

    const greeting = getGreeting(selectedType);

    // Determine closing based on type and tone
    let closing = "";
    if (selectedType === "formal") {
      closing = selectedTone === "apology"
        ? "Sincerely,"
        : "Best regards,";
    } else {
      closing = selectedTone === "apology"
        ? "With sincere apologies,"
        : selectedTone === "friendly"
          ? "Best regards,"
          : "Thanks,";
    }

    // Weave keywords naturally only when they exist (no bullet dumping)
    const keywordSnippet = keywords && keywords.trim()
      ? ` This relates to ${keywords.trim()}.`
      : "";

    let paragraphs = [];

    if (selectedTone === "professional") {
      paragraphs.push(`I hope this message finds you well. ${purpose}${keywordSnippet}`);
      paragraphs.push(`I wanted to reach out regarding this matter and would appreciate your attention to the details provided above.`);
      if (selectedLength !== "short") {
        paragraphs.push(`I believe this approach will help us move forward effectively. Please feel free to reach out if you have any questions or require further clarification.`);
      }
    }
    else if (selectedTone === "friendly") {
      paragraphs.push(`Hope you're doing great! ${purpose}${keywordSnippet}`);
      paragraphs.push(`I thought this would be a good opportunity to connect and share this information with you.`);
      if (selectedLength !== "short") {
        paragraphs.push(`Looking forward to hearing from you soon and continuing our conversation!`);
      }
    }
    else if (selectedTone === "apology") {
      paragraphs.push(`I wanted to reach out and sincerely apologize for the inconvenience. ${purpose}${keywordSnippet}`);
      paragraphs.push(`I understand the inconvenience this may have caused, and I take full responsibility for this matter.`);
      if (selectedLength !== "short") {
        paragraphs.push(`I am committed to resolving this issue promptly and ensuring it doesn't happen again. I hope we can move forward positively and I appreciate your understanding.`);
      }
    }
    else if (selectedTone === "follow-up") {
      paragraphs.push(`I'm following up on our previous conversation regarding ${purpose}${keywordSnippet}`);
      paragraphs.push(`I wanted to check in and see if you had any questions or needed any additional information.`);
      if (selectedLength !== "short") {
        paragraphs.push(`Please let me know if there's anything else I can assist with or if you need any clarification on the points we discussed.`);
      }
    }
    else if (selectedTone === "casual") {
      paragraphs.push(`Hey! ${purpose}${keywordSnippet}`);
      paragraphs.push(`Just wanted to drop you a quick note about this.`);
      if (selectedLength !== "short") {
        paragraphs.push(`Let me know what you think when you get a chance!`);
      }
    }
    else {
      paragraphs.push(`${purpose}${keywordSnippet}`);
      paragraphs.push(`Thank you for your time and consideration.`);
    }

    // Adjust length
    let bodyContent = "";
    if (selectedLength === "short") {
      bodyContent = paragraphs[0];
    } else if (selectedLength === "medium") {
      bodyContent = paragraphs.slice(0, 2).join('\n\n');
    } else {
      bodyContent = paragraphs.join('\n\n');
      if (selectedTone === "professional" && paragraphs.length < 3) {
        bodyContent += '\n\nI wanted to provide you with comprehensive details to ensure clarity. If you need any additional information or have questions, please dont hesitate to reach out.';
      }
    }

    const subject = getSubject(purpose, selectedType);

    return `Subject: ${subject}\n\n${greeting}\n\n${bodyContent}\n\n${closing}\nAI Email Composer`;
  };

  const generateEmailRequest = async () => {
    setIsLoading(true);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/api/email/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          purpose: emailPurpose,
          tone: tone || "professional",
          type: emailType || "formal",
          length: emailLength || "medium",
          keywords
        })
      });

      const data = await response.json();
      console.log("API response:", data);

      if (!response.ok) {
        throw new Error(data.message || "Failed to generate email");
      }

      setGeneratedEmail(data.email);

    } catch (error) {
      console.error("Error generating email:", error);
      alert(error.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerate = (e) => {
    e.preventDefault();
    if (!emailPurpose.trim()) {
      alert("Please enter email purpose");
      return;
    }
    generateEmailRequest();
  };

  const handleRegenerate = () => {
    if (!emailPurpose.trim()) {
      alert("Please enter email purpose");
      return;
    }
    generateEmailRequest();
  };

  const handleCopy = () => {
    if (generatedEmail) {
      navigator.clipboard.writeText(generatedEmail);
    }
  };

  return (
    <div className="min-h-screen bg-[#EEF3F5] text-gray-800">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col py-6 px-4 sticky top-0 h-screen shadow-md">
          <div className="mb-8 px-2">
            <h1 className="text-2xl font-bold text-[#1F2A37]">
              AI Email Composer
            </h1>
          </div>
          <nav className="space-y-2 flex-1">
            <button
              onClick={() => navigate("/dashboard")}
              className="w-full text-left px-3 py-2 rounded-lg text-gray-700 hover:bg-[#EEF3F5] transition-colors"
            >
              Dashboard
            </button>
            <button className="w-full text-left px-3 py-2 rounded-lg bg-[#EEF3F5] text-[#1F2A37] font-semibold">
              Create Email
            </button>
            <button className="w-full text-left px-3 py-2 rounded-lg text-gray-700 hover:bg-[#EEF3F5] transition-colors">
              Email History
            </button>
            <button
              onClick={handleLogout}
              className="w-full text-left px-3 py-2 rounded-lg text-red-500 hover:text-red-600 transition-colors"
            >
              Logout
            </button>
          </nav>
          <p className="px-2 text-xs text-gray-500 mt-4">
            Dashboard UI placeholder – backend integration coming later.
          </p>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* LEFT — Email Input Card */}
              <div className="bg-white rounded-2xl shadow-md p-6 space-y-4">
                <h2 className="text-2xl font-bold text-[#1F2A37]">
                  Generate Email
                </h2>

                <form onSubmit={handleGenerate} className="space-y-4">
                  {/* Email Purpose */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Purpose
                    </label>
                    <textarea
                      value={emailPurpose}
                      onChange={(e) => setEmailPurpose(e.target.value)}
                      placeholder="Describe what you want to communicate..."
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1F2A37] transition resize-none"
                      rows="4"
                    />
                  </div>

                  {/* Tone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tone
                    </label>
                    <select
                      value={tone}
                      onChange={(e) => setTone(e.target.value)}
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1F2A37] transition"
                    >
                      <option value="">Select tone</option>
                      <option value="professional">Professional</option>
                      <option value="friendly">Friendly</option>
                      <option value="apology">Apology</option>
                      <option value="follow-up">Follow-up</option>
                      <option value="casual">Casual</option>
                    </select>
                  </div>

                  {/* Email Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Type
                    </label>
                    <select
                      value={emailType}
                      onChange={(e) => setEmailType(e.target.value)}
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1F2A37] transition"
                    >
                      <option value="">Select type</option>
                      <option value="formal">Formal</option>
                      <option value="casual">Casual</option>
                    </select>
                  </div>

                  {/* Email Length */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Length
                    </label>
                    <select
                      value={emailLength}
                      onChange={(e) => setEmailLength(e.target.value)}
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1F2A37] transition"
                    >
                      <option value="">Select length</option>
                      <option value="short">Short</option>
                      <option value="medium">Medium</option>
                      <option value="long">Long</option>
                    </select>
                  </div>

                  {/* Keywords */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Keywords
                    </label>
                    <textarea
                      value={keywords}
                      onChange={(e) => setKeywords(e.target.value)}
                      placeholder="Add keywords or phrases to include..."
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1F2A37] transition resize-none"
                      rows="3"
                    />
                  </div>

                  {/* Generate Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#1F2A37] text-white py-3 rounded-xl font-semibold hover:bg-[#111827] transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? "Generating..." : "Generate Email"}
                  </button>
                </form>
              </div>

              {/* RIGHT — Email Preview Card */}
              <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col h-full">
                <h2 className="text-2xl font-bold text-[#1F2A37] mb-4">
                  Generated Email
                </h2>

                {/* Preview Box */}
                <div className="border border-gray-200 rounded-xl p-4 min-h-[300px] bg-gray-50 text-gray-700 whitespace-pre-wrap flex-1 mb-4">
                  {generatedEmail || "Your AI-generated email will appear here..."}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={handleRegenerate}
                    disabled={!generatedEmail}
                    className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-xl font-medium hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Regenerate
                  </button>
                  <button
                    onClick={handleCopy}
                    disabled={!generatedEmail}
                    className="flex-1 bg-[#1F2A37] text-white py-2 px-4 rounded-xl font-medium hover:bg-[#111827] transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Copy
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CreateEmail;
