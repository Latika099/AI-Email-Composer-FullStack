import { useEffect, useState } from "react";
import {
    Search,
    Trash2,
    Eye,
    Calendar,
    Mail as MailIcon,
    Filter,
    X,
    ChevronRight,
    User,
    Clock,
    Copy,
    Download
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "../components/DashboardLayout";
import { apiFetch } from "../utils/api";

const EmailHistory = () => {
    const [search, setSearch] = useState("");
    const [emails, setEmails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [tone, setTone] = useState("");
    const [sort, setSort] = useState("");
    const [selectedEmail, setSelectedEmail] = useState(null);

    useEffect(() => {
        const fetchEmails = async () => {
            try {
                const res = await apiFetch(
                    `/api/email?search=${search}&tone=${tone}&sort=${sort}`,
                    {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("token"),
                        },
                    }
                );

                const data = await res.json();
                if (data?.success) {
                    setEmails(data?.emails || []);
                }
            } catch (error) {
                console.error("Error fetching emails:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEmails();
    }, [search, tone, sort]);

    const handleDelete = async (id, e) => {
        e.stopPropagation();
        const confirmDelete = window.confirm("Are you sure you want to delete this email?");
        if (!confirmDelete) return;

        try {
            const res = await apiFetch(`/api/email/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            });

            const data = await res.json();

            if (data?.success) {
                setEmails((prev) => prev?.filter((email) => email?._id !== id) || []);
                if (selectedEmail?._id === id) setSelectedEmail(null);
            }
        } catch (error) {
            console.error("Error deleting email:", error);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <DashboardLayout>
            <div className="flex flex-col gap-8">
                {/* Header & Filters */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-10 mb-10">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <span className="w-10 h-[2px] bg-violet-400 rounded-full"></span>
                            <p className="text-[10px] font-black text-violet-500 uppercase tracking-[0.3em] font-sans">Archives</p>
                        </div>
                        <h2 className="text-5xl font-black text-[#2e2a27] font-serif leading-tight">Digital Correspondence</h2>
                        <p className="text-gray-400 text-lg font-medium">Review and manage your AI-curated communication history.</p>
                    </div>
                </div>

                <div className="bg-white p-10 rounded-[3.5rem] border border-gray-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] flex flex-col lg:flex-row gap-8 items-center ring-1 ring-black/[0.03] mb-12">


                    <div className="relative flex-1 w-full">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by subject or content..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-12 pr-6 py-4 rounded-[1.5rem] border border-gray-50 bg-[#fbfaf8] focus:bg-white focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all text-sm font-medium"
                        />
                    </div>

                    <div className="flex gap-3 w-full lg:w-auto">
                        <div className="relative flex-1 lg:w-48">
                            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            <select
                                value={tone}
                                onChange={(e) => setTone(e.target.value)}
                                className="w-full pl-11 pr-5 py-4 rounded-[1.5rem] border border-gray-50 bg-[#fbfaf8] focus:ring-2 focus:ring-violet-500/20 transition-all text-sm appearance-none font-bold text-gray-600 cursor-pointer"
                            >
                                <option value="">All Tones</option>
                                <option value="friendly">Friendly</option>
                                <option value="formal">Formal</option>
                                <option value="professional">Professional</option>
                            </select>
                        </div>

                        <div className="relative flex-1 lg:w-48">
                            <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            <select
                                value={sort}
                                onChange={(e) => setSort(e.target.value)}
                                className="w-full pl-11 pr-5 py-4 rounded-[1.5rem] border border-gray-50 bg-[#fbfaf8] focus:ring-2 focus:ring-violet-500/20 transition-all text-sm appearance-none font-bold text-gray-600 cursor-pointer"
                            >
                                <option value="">Newest First</option>
                                <option value="oldest">Oldest First</option>
                                <option value="az">A to Z</option>
                                <option value="za">Z to A</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Email List */}
                {loading ? (
                    <div className="grid gap-4">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-24 bg-gray-100 rounded-2xl animate-pulse" />
                        ))}
                    </div>
                ) : (emails?.length || 0) === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                        <MailIcon className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                        <h3 className="text-lg font-bold text-gray-900">No emails found</h3>
                        <p className="text-gray-400 max-w-xs mx-auto">Try adjusting your search or filters to find what you're looking for.</p>
                    </div>
                ) : (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                        className="grid gap-8"
                    >
                        {emails?.map((email) => (
                            <motion.div
                                key={email._id}
                                variants={itemVariants}
                                onClick={() => setSelectedEmail(email)}
                                className="bg-white p-10 rounded-[3.5rem] border border-transparent shadow-[0_5px_25px_rgba(0,0,0,0.02)] hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.06)] hover:-translate-y-2 transition-all duration-700 cursor-pointer group flex items-center justify-between gap-10 ring-1 ring-black/[0.03] ring-offset-[10px] ring-offset-white"
                            >
                                <div className="flex items-center gap-10 min-w-0 flex-1">
                                    <div className="w-16 h-16 rounded-[1.75rem] bg-[#fbfaf8] flex items-center justify-center shrink-0 group-hover:bg-violet-50 transition-all duration-700 shadow-inner group-hover:rotate-[360deg]">
                                        <MailIcon className="w-7 h-7 text-gray-300 group-hover:text-violet-500 transition-all duration-700" />
                                    </div>
                                    <div className="min-w-0">
                                        <h4 className="font-black text-[#2e2a27] text-2xl truncate group-hover:text-violet-600 transition-colors duration-500 pr-10 font-serif leading-tight">{email.subject || "Untitled Email"}</h4>
                                        <div className="flex items-center gap-6 mt-3 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                                            <span className="flex items-center gap-2.5">
                                                <Calendar className="w-4 h-4 text-violet-300" />
                                                {new Date(email.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </span>
                                            <span className="w-1.5 h-1.5 bg-gray-100 rounded-full" />
                                            <span className="px-4 py-1.5 bg-violet-50/50 rounded-full text-violet-500 font-bold border border-violet-100/50">{email.tone || 'General'}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-5 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-x-10 group-hover:translate-x-0">
                                    <button
                                        onClick={(e) => handleDelete(email._id, e)}
                                        className="p-4 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-[1.5rem] transition-all duration-500"
                                    >
                                        <Trash2 className="w-6 h-6" />
                                    </button>
                                    <div className="p-4 text-violet-600 bg-violet-50 rounded-[1.5rem] shadow-sm">
                                        <ChevronRight className="w-8 h-8" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>

            {/* Email Detail Modal */}
            <AnimatePresence>
                {selectedEmail && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-10">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedEmail(null)}
                            className="absolute inset-0 bg-[#2e2a27]/30 backdrop-blur-2xl"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 30 }}
                            transition={{ type: "spring", damping: 30, stiffness: 300 }}
                            className="bg-white w-full max-w-5xl rounded-[4rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.25)] relative z-10 overflow-hidden flex flex-col max-h-[90vh] ring-1 ring-black/5"
                        >
                            <div className="p-12 border-b border-gray-100/50 flex items-start justify-between bg-[#fbfaf8]/30">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <span className="w-10 h-[2.5px] bg-violet-500 rounded-full"></span>
                                        <p className="text-[10px] font-black text-violet-500 uppercase tracking-[0.3em]">Archive Inspector</p>
                                    </div>
                                    <h3 className="text-4xl font-black text-[#2e2a27] font-serif leading-tight max-w-2xl">{selectedEmail.subject || "Untitled Composition"}</h3>
                                    <div className="flex items-center gap-6 text-[11px] font-black uppercase tracking-widest text-gray-400">
                                        <span className="flex items-center gap-2.5">
                                            <Calendar className="w-4 h-4 text-violet-300" />
                                            {new Date(selectedEmail.createdAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                                        </span>
                                        <span className="w-1.5 h-1.5 bg-gray-100 rounded-full" />
                                        <span className="text-violet-500 bg-violet-50/50 px-4 py-1.5 rounded-full border border-violet-100/30">{selectedEmail.tone || 'General'} Tone</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelectedEmail(null)}
                                    className="p-4 hover:bg-white rounded-full text-gray-400 hover:text-red-500 transition-all shadow-sm border border-transparent hover:border-gray-100 group active:scale-90"
                                >
                                    <X className="w-7 h-7 group-hover:rotate-90 transition-transform" />
                                </button>
                            </div>

                            <div className="p-12 overflow-y-auto custom-scrollbar flex-1 bg-white">
                                <div className="max-w-4xl mx-auto space-y-12">
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-8 h-[1px] bg-gray-100"></div>
                                            <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] shrink-0">Content Body</p>
                                            <div className="flex-1 h-[1px] bg-gray-100"></div>
                                        </div>
                                        <div className="text-xl text-gray-600 leading-[1.8] font-medium whitespace-pre-wrap selection:bg-violet-100 px-2 lg:px-8">
                                            {selectedEmail.generatedContent || selectedEmail.body}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-12 bg-[#fbfaf8]/50 border-t border-gray-100/50 flex items-center justify-end gap-6">
                                <button
                                    onClick={() => setSelectedEmail(null)}
                                    className="px-8 py-5 rounded-[1.75rem] text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-[#2e2a27] transition-all"
                                >
                                    Dismiss View
                                </button>
                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText(selectedEmail.generatedContent || selectedEmail.body);
                                        // You could add a temporary toast/success state here if needed
                                    }}
                                    className="flex items-center gap-4 px-12 py-5 bg-[#2e2a27] text-[#f6f3ee] rounded-[2rem] font-black text-[11px] uppercase tracking-[0.2em] hover:bg-black transition-all shadow-[0_20px_50px_rgba(46,42,39,0.2)] group active:scale-95"
                                >
                                    <Copy className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                    Duplicate Body
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </DashboardLayout>
    );
};

export default EmailHistory;