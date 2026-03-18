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
  Globe,
  Download
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
    if (e && typeof e.preventDefault === 'function') {
        e.preventDefault();
    }
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
      const response = await fetch("https://ai-email-server.onrender.com/api/email", {
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

  const handleDownload = () => {
    const fullText = `Subject: ${editableSubject}\n\n${editableBody}`;
    const blob = new Blob([fullText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${editableSubject || "email"}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
      const response = await fetch("https://ai-email-server.onrender.com/api/email", {
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
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start max-w-[1600px] mx-auto">
        {/* AI Settings Panel - 35-40% Width */}
        <div className="w-full lg:w-[40%] xl:w-[35%] flex flex-col gap-10 shrink-0">
          <div className="bg-white p-12 rounded-[3.5rem] border border-gray-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] ring-1 ring-black/[0.03]">
            <div className="flex items-center gap-3 mb-10">
              <span className="w-10 h-[2px] bg-violet-400 rounded-full"></span>
              <h3 className="text-[11px] font-black text-violet-500 uppercase tracking-[0.3em] font-sans">AI Configuration</h3>
            </div>
            <h4 className="text-3xl font-black text-[#2e2a27] mb-8 font-serif leading-tight">Refine your <br/>message intent</h4>

            <form onSubmit={handleGenerate} className="space-y-6">
              <div className="space-y-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Info className="w-4 h-4 text-gray-400" />
                  Email Purpose
                </label>
                <textarea
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  placeholder="Describe the context of your email..."
                  className="w-full px-7 py-6 rounded-[2rem] border border-gray-100/50 bg-[#fbfaf8] focus:bg-white focus:ring-4 focus:ring-violet-500/10 focus:border-violet-400/50 transition-all min-h-[180px] text-base leading-relaxed font-medium placeholder-gray-300 shadow-inner"
                />

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#2e2a27] text-[#f6f3ee] py-6 rounded-[2rem] font-black text-sm uppercase tracking-widest flex items-center justify-center gap-4 hover:bg-black transition-all duration-700 disabled:opacity-50 shadow-[0_20px_50px_rgba(46,42,39,0.15)] group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  {isLoading ? (
                    <>
                      <RefreshCw className="w-6 h-6 animate-spin" />
                      Crafting Response...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-6 h-6 group-hover:scale-125 transition-transform duration-700 relative z-10" />
                      <span className="relative z-10">Generate Draft</span>
                    </>
                  )}
                </button>
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
                <div className="text-red-500 text-xs font-semibold bg-red-50 p-4 rounded-2xl flex items-center gap-2 border border-red-100">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Email Draft Panel - 60-65% Width */}
        <div className="flex-1 lg:w-[62%] xl:w-[65%] min-w-0">
          <AnimatePresence mode="wait">
            {!generatedEmail && !isLoading ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-[600px] border-2 border-dashed border-gray-200 rounded-[3.5rem] flex flex-col items-center justify-center p-16 text-center bg-white/50 group hover:bg-white hover:border-violet-200 transition-all duration-700 shadow-sm"
              >
                <div className="bg-white p-8 rounded-[2.5rem] shadow-sm mb-8 group-hover:scale-110 transition-transform duration-700 ring-1 ring-black/5">
                  <Mail className="w-16 h-16 text-gray-200 group-hover:text-violet-400" />
                </div>
                <h3 className="text-3xl font-bold text-[#2e2a27] mb-4 font-serif">Compose with AI</h3>
                <p className="text-gray-400 max-w-sm leading-relaxed text-lg font-medium">
                  Provide context in the settings and watch our AI craft a masterpiece for you.
                </p>
              </motion.div>
            ) : isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                className="h-[650px] bg-white rounded-[3.5rem] border border-gray-100 flex flex-col items-center justify-center p-16 text-center shadow-2xl relative overflow-hidden group ring-1 ring-black/[0.03]"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-violet-50/20 to-transparent"></div>
                <div className="relative mb-10">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.4, 1], 
                      opacity: [0.2, 0.4, 0.2],
                      rotate: [0, 180, 360]
                    }}
                    transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                    className="absolute -inset-10 bg-violet-400 rounded-full blur-[60px]"
                  />
                  <div className="relative z-10 bg-white p-8 rounded-[2rem] shadow-xl border border-gray-50 group-hover:rotate-12 transition-transform duration-700">
                    <RefreshCw className="w-14 h-14 text-violet-500 animate-spin" strokeWidth={1.5} />
                  </div>
                </div>
                <h3 className="text-4xl font-black text-[#2e2a27] mb-4 font-serif relative z-10">Crafting Intelligence</h3>
                <p className="text-gray-400 max-w-sm leading-relaxed text-lg font-medium relative z-10">
                  Our advanced AI is analyzing your intent to draft the perfect professional response.
                </p>
                <div className="w-64 h-1.5 bg-gray-50 rounded-full mt-10 overflow-hidden relative z-10 border border-gray-100/50">
                  <motion.div 
                    className="h-full bg-violet-500"
                    animate={{ width: ["0%", "80%", "95%"] }}
                    transition={{ duration: 10, ease: "circOut" }}
                  />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="content"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-[3.5rem] border border-gray-100 shadow-2xl overflow-hidden flex flex-col ring-1 ring-black/[0.03] ring-offset-[12px] ring-offset-white min-h-[750px]"
              >
                <div className="p-10 border-b border-gray-50 bg-[#fbfaf8]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-8">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-[2.5px] bg-violet-500 rounded-full"></span>
                      <p className="text-[10px] font-black text-violet-500 uppercase tracking-[0.3em]">AI Output</p>
                    </div>
                    <h3 className="font-black text-[#2e2a27] text-3xl font-serif">Compose Premium</h3>
                  </div>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={handleGenerate}
                      className="flex items-center gap-3 px-6 py-4 rounded-[1.5rem] bg-white border border-gray-100 text-[11px] font-black uppercase tracking-widest text-gray-500 hover:text-violet-600 hover:border-violet-100 transition-all shadow-sm active:scale-95"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Regenerate
                    </button>
                    <button
                      onClick={handleDownload}
                      className="flex items-center gap-3 px-6 py-4 rounded-[1.5rem] bg-white border border-gray-100 text-[11px] font-black uppercase tracking-widest text-[#2e2a27] hover:bg-gray-50 transition-all shadow-sm active:scale-95"
                    >
                      <Download className="w-4 h-4 text-violet-500" />
                      Export .txt
                    </button>
                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-4 px-8 py-4 rounded-[1.5rem] bg-[#2e2a27] text-[#f6f3ee] text-[11px] font-black uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-gray-200/50 active:scale-95"
                    >
                      {copySuccess ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      {copySuccess ? "Secured" : "Copy Draft"}
                    </button>
                  </div>
                </div>

                <div className="p-10 space-y-10 flex-1">
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 block">Subject Header</label>
                    <input
                      value={editableSubject}
                      onChange={(e) => setEditableSubject(e.target.value)}
                      className="w-full text-3xl font-black text-[#2e2a27] border-none focus:ring-0 p-0 placeholder-gray-200 font-serif"
                      placeholder="Email Subject Line"
                    />
                  </div>

                  <div className="h-px bg-gray-100/50" />

                  <div className="flex-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 block">Composition Body</label>
                    <textarea
                      value={editableBody}
                      onChange={(e) => setEditableBody(e.target.value)}
                      className="w-full min-h-[350px] text-gray-600 leading-relaxed border-none focus:ring-0 p-0 resize-none placeholder-gray-200 text-lg font-medium"
                      placeholder="Your AI composition will appear here..."
                    />
                  </div>
                </div>

                {/* Send Controls */}
                <div className="p-10 bg-[#fbfaf8]/50 border-t border-gray-100">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                        <Globe className="w-5 h-5 text-gray-400 group-focus-within:text-violet-500 transition-colors" />
                      </div>
                      <input
                        type="email"
                        placeholder="Recipient's Digital Address"
                        value={receiverEmail}
                        onChange={(e) => setReceiverEmail(e.target.value)}
                        className="w-full pl-14 pr-6 py-5 rounded-[1.75rem] border border-gray-100/50 bg-white focus:ring-4 focus:ring-violet-500/10 focus:border-violet-400 transition-all text-sm font-bold shadow-sm"
                      />
                    </div>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                        <User className="w-5 h-5 text-gray-400 group-focus-within:text-violet-500 transition-colors" />
                      </div>
                      <input
                        type="text"
                        placeholder="Premium Sender Identity (Optional)"
                        value={senderEmail}
                        onChange={(e) => setSenderEmail(e.target.value)}
                        className="w-full pl-14 pr-6 py-5 rounded-[1.75rem] border border-gray-100/50 bg-white focus:ring-4 focus:ring-violet-500/10 focus:border-violet-400 transition-all text-sm font-bold shadow-sm"
                      />
                    </div>
                  </div>

                  {sendSuccess && (
                     <motion.div 
                       initial={{ opacity: 0, scale: 0.95 }}
                       animate={{ opacity: 1, scale: 1 }}
                       className="flex items-center gap-4 text-emerald-600 bg-emerald-50 px-8 py-5 rounded-[2rem] mb-8 border border-emerald-100/50 shadow-sm"
                     >
                       <div className="bg-emerald-500 p-1.5 rounded-full text-white shadow-sm">
                        <Check className="w-4 h-4" />
                       </div>
                       <span className="text-sm font-black uppercase tracking-widest">Transmission Successful</span>
                     </motion.div>
                  )}

                  {sendError && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center gap-4 text-red-600 bg-red-50 px-8 py-5 rounded-[2rem] mb-8 border border-red-100/50 shadow-sm"
                    >
                      <AlertCircle className="w-5 h-5 text-red-500" />
                      <span className="text-sm font-black uppercase tracking-widest">{sendError}</span>
                    </motion.div>
                  )}

                  <button
                    onClick={handleSendEmail}
                    disabled={isSending}
                    className="w-full bg-[#2e2a27] text-[#f6f3ee] py-6 rounded-[2.25rem] font-black text-sm uppercase tracking-widest flex items-center justify-center gap-4 hover:bg-black transition-all duration-700 disabled:opacity-50 shadow-[0_30px_60px_-10px_rgba(46,42,39,0.25)] group relative overflow-hidden active:scale-[0.98]"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    {isSending ? (
                      <RefreshCw className="w-6 h-6 animate-spin" />
                    ) : (
                      <>
                        <Send className="w-5 h-5 group-hover:translate-x-3 group-hover:-translate-y-3 transition-transform duration-700 relative z-10" />
                        <span className="relative z-10">Dispatch Final Composition</span>
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
