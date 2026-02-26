import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Send,
  Copy,
  Check,
  AlertCircle,
  RefreshCw,
  Mail,
  User,
  Info,
  Type,
  Globe
} from "lucide-react";
import DashboardLayout from "../components/DashboardLayout";

const CreateEmail = () => {
  const navigate = useNavigate();

  // Form State
  const [purpose, setPurpose] = useState("");
  const [tone, setTone] = useState("friendly");
  const [type, setType] = useState("direct");
  const [length, setLength] = useState("medium");
  const [keywords, setKeywords] = useState("");

  // Generation State
  const [isLoading, setIsLoading] = useState(false);
  const [generatedEmail, setGeneratedEmail] = useState("");
  const [currentEmailId, setCurrentEmailId] = useState(null);
  const [error, setError] = useState("");

  // Editing State
  const [editableSubject, setEditableSubject] = useState("");
  const [editableBody, setEditableBody] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);

  // Sending State
  const [receiverEmail, setReceiverEmail] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [sendError, setSendError] = useState("");

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!purpose.trim()) {
      setError("Please describe the purpose of the email");
      return;
    }

    setIsLoading(true);
    setError("");
    setGeneratedEmail("");
    setSendSuccess(false);
    setSendError("");

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/email/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          purpose,
          tone,
          type,
          length,
          keywords
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to generate email");
      }

      setGeneratedEmail(data.email);
      setCurrentEmailId(data.emailId);

      // Parse subject and body
      const subjectMatch = data.email.match(/Subject:\s*(.*)/i);
      if (subjectMatch && subjectMatch[1]) {
        setEditableSubject(subjectMatch[1].trim());
        setEditableBody(data.email.replace(/Subject:\s*.*\n/i, "").trim());
      } else {
        setEditableSubject("Generated Email");
        setEditableBody(data.email);
      }
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    const fullText = `Subject: ${editableSubject}\n\n${editableBody}`;
    navigator.clipboard.writeText(fullText);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const handleSendEmail = async () => {
    if (!receiverEmail.trim()) {
      setSendError("Recipient email is required");
      return;
    }

    setIsSending(true);
    setSendSuccess(false);
    setSendError("");

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          to: receiverEmail,
          from: senderEmail,
          subject: editableSubject,
          body: editableBody,
          emailId: currentEmailId
        })
      });

      const data = await response.json();

      if (response.ok) {
        setSendSuccess(true);
      } else {
        setSendError(data.message || "Failed to send email");
      }
    } catch (error) {
      setSendError("Network error. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
        {/* Input Section */}
        <div className="w-full lg:w-80 xl:w-96 flex flex-col gap-6 shrink-0">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-600" />
              AI Settings
            </h3>

            <form onSubmit={handleGenerate} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Info className="w-4 h-4 text-gray-400" />
                  Email Purpose
                </label>
                <textarea
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  placeholder="What is this email about?"
                  className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all min-h-[120px] text-sm"
                />
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 text-gray-400" />
                    Tone
                  </label>
                  <select
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-100 bg-gray-50 focus:ring-2 focus:ring-indigo-500 transition-all font-medium text-sm"
                  >
                    <option value="friendly">Friendly</option>
                    <option value="formal">Formal</option>
                    <option value="professional">Professional</option>
                    <option value="assertive">Assertive</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Length</label>
                    <select
                      value={length}
                      onChange={(e) => setLength(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-100 bg-gray-50 text-sm"
                    >
                      <option value="short">Short</option>
                      <option value="medium">Medium</option>
                      <option value="long">Long</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Type</label>
                    <select
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-100 bg-gray-50 text-sm"
                    >
                      <option value="direct">Direct</option>
                      <option value="detailed">Detailed</option>
                    </select>
                  </div>
                </div>
              </div>

              {error && (
                <div className="text-red-500 text-xs font-medium bg-red-50 p-3 rounded-lg flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#1F2A37] text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#111827] transition-all duration-300 disabled:opacity-50 shadow-md"
              >
                {isLoading ? (
                  <RefreshCw className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Generate
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Output Section */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            {!generatedEmail && !isLoading ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-[400px] border-2 border-dashed border-gray-200 rounded-3xl flex flex-col items-center justify-center p-8 text-center bg-gray-50/50"
              >
                <div className="bg-white p-4 rounded-2xl shadow-sm mb-4">
                  <Mail className="w-8 h-8 text-gray-300" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Start Writing</h3>
                <p className="text-sm text-gray-400 max-w-xs">
                  Fill in the settings on the left to generate your AI-powered email.
                </p>
              </motion.div>
            ) : isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-[400px] bg-white rounded-3xl border border-gray-100 flex flex-col items-center justify-center p-8 text-center shadow-sm"
              >
                <div className="relative mb-6">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute -inset-4 bg-indigo-100 rounded-full blur-xl"
                  />
                  <Sparkles className="w-12 h-12 text-indigo-600 relative z-10" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Composing...</h3>
                <p className="text-sm text-gray-400">Our AI is drafting the perfect response for you.</p>
              </motion.div>
            ) : (
              <motion.div
                key="content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden flex flex-col"
              >
                <div className="p-6 border-b border-gray-50 bg-gray-50/50 flex items-center justify-between">
                  <h3 className="font-bold text-gray-900">Email Draft</h3>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-gray-200 text-sm font-semibold text-gray-600 hover:text-indigo-600 hover:border-indigo-100 transition-all"
                  >
                    {copySuccess ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                    {copySuccess ? "Copied" : "Copy"}
                  </button>
                </div>

                <div className="p-8 space-y-6">
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">Subject</label>
                    <input
                      value={editableSubject}
                      onChange={(e) => setEditableSubject(e.target.value)}
                      className="w-full text-xl font-bold text-gray-900 border-none focus:ring-0 p-0 placeholder-gray-300"
                      placeholder="Email Subject"
                    />
                  </div>

                  <div className="h-px bg-gray-100" />

                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">Body</label>
                    <textarea
                      value={editableBody}
                      onChange={(e) => setEditableBody(e.target.value)}
                      className="w-full min-h-[250px] text-gray-700 leading-relaxed border-none focus:ring-0 p-0 resize-none placeholder-gray-300"
                      placeholder="Start writing..."
                    />
                  </div>
                </div>

                {/* Send Controls */}
                <div className="p-8 border-t border-gray-100 bg-gray-50/30">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="relative">
                      <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="email"
                        placeholder="Recipient Email"
                        value={receiverEmail}
                        onChange={(e) => setReceiverEmail(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-100 focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
                      />
                    </div>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="email"
                        placeholder="Sender Name (Optional)"
                        value={senderEmail}
                        onChange={(e) => setSenderEmail(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-100 focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
                      />
                    </div>
                  </div>

                  {sendSuccess && (
                    <div className="flex items-center gap-2 text-green-600 bg-green-50 p-4 rounded-2xl mb-6">
                      <Check className="w-5 h-5" />
                      <span className="text-sm font-bold">Email sent successfully!</span>
                    </div>
                  )}

                  {sendError && (
                    <div className="flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-2xl mb-6">
                      <AlertCircle className="w-5 h-5" />
                      <span className="text-sm font-bold">{sendError}</span>
                    </div>
                  )}

                  <button
                    onClick={handleSendEmail}
                    disabled={isSending}
                    className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all duration-300 disabled:opacity-50 shadow-lg shadow-indigo-100"
                  >
                    {isSending ? (
                      <RefreshCw className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Now
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CreateEmail;
