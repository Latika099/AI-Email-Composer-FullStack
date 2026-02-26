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
    Clock
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "../components/DashboardLayout";

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
                const res = await fetch(
                    `http://localhost:5000/api/email?search=${search}&tone=${tone}&sort=${sort}`,
                    {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("token"),
                        },
                    }
                );

                const data = await res.json();
                if (data.success) {
                    setEmails(data.emails);
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
            const res = await fetch(`http://localhost:5000/api/email/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            });

            const data = await res.json();

            if (data.success) {
                setEmails((prev) => prev.filter((email) => email._id !== id));
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
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-3xl font-bold text-[#1F2A37]">Email History</h2>
                        <p className="text-gray-400 mt-1">Manage and view your previously generated emails.</p>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 items-center">
                    <div className="relative flex-1 w-full">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by subject or content..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-50 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
                        />
                    </div>

                    <div className="flex gap-2 w-full md:w-auto">
                        <div className="relative flex-1 md:w-40">
                            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                            <select
                                value={tone}
                                onChange={(e) => setTone(e.target.value)}
                                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-50 bg-gray-50 focus:ring-2 focus:ring-indigo-500 transition-all text-sm appearance-none font-medium text-gray-600"
                            >
                                <option value="">All Tones</option>
                                <option value="friendly">Friendly</option>
                                <option value="formal">Formal</option>
                                <option value="professional">Professional</option>
                            </select>
                        </div>

                        <div className="relative flex-1 md:w-40">
                            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                            <select
                                value={sort}
                                onChange={(e) => setSort(e.target.value)}
                                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-50 bg-gray-50 focus:ring-2 focus:ring-indigo-500 transition-all text-sm appearance-none font-medium text-gray-600"
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
                ) : emails.length === 0 ? (
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
                        className="grid gap-4"
                    >
                        {emails.map((email) => (
                            <motion.div
                                key={email._id}
                                variants={itemVariants}
                                onClick={() => setSelectedEmail(email)}
                                className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all cursor-pointer group flex items-center justify-between gap-4"
                            >
                                <div className="flex items-center gap-4 min-w-0 flex-1">
                                    <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center shrink-0 group-hover:bg-indigo-50 transition-colors">
                                        <MailIcon className="w-5 h-5 text-gray-400 group-hover:text-indigo-600" />
                                    </div>
                                    <div className="min-w-0">
                                        <h4 className="font-bold text-gray-900 truncate pr-4">{email.subject || "Untitled Email"}</h4>
                                        <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                                            <span className="flex items-center gap-1">
                                                <Calendar className="w-3 h-3" />
                                                {new Date(email.createdAt).toLocaleDateString()}
                                            </span>
                                            <span className="w-1 h-1 bg-gray-200 rounded-full" />
                                            <span className="capitalize px-2 py-0.5 bg-gray-100 rounded-full text-gray-500 font-medium">{email.tone || 'General'}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={(e) => handleDelete(email._id, e)}
                                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                    <div className="p-2 text-indigo-600">
                                        <ChevronRight className="w-5 h-5" />
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
                    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedEmail(null)}
                            className="absolute inset-0 bg-[#1F2A37]/40 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl relative z-10 overflow-hidden flex flex-col max-h-[90vh]"
                        >
                            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                                <div className="flex items-center gap-3">
                                    <div className="bg-indigo-600 p-2 rounded-xl text-white">
                                        <MailIcon className="w-5 h-5" />
                                    </div>
                                    <h3 className="font-bold text-gray-900">Email Details</h3>
                                </div>
                                <button
                                    onClick={() => setSelectedEmail(null)}
                                    className="p-2 hover:bg-white rounded-full text-gray-400 transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="p-8 overflow-y-auto space-y-8">
                                <section>
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 block">Info & Metadata</label>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-gray-50 p-4 rounded-2xl">
                                            <p className="text-xs text-gray-400 mb-1">Created On</p>
                                            <p className="font-bold text-gray-900 text-sm">{new Date(selectedEmail.createdAt).toLocaleString()}</p>
                                        </div>
                                        <div className="bg-gray-50 p-4 rounded-2xl">
                                            <p className="text-xs text-gray-400 mb-1">Tone & Type</p>
                                            <p className="font-bold text-gray-900 text-sm capitalize">{selectedEmail.tone || 'N/A'} • {selectedEmail.type || 'N/A'}</p>
                                        </div>
                                    </div>
                                    {selectedEmail.recipient && (
                                        <div className="mt-4 bg-gray-50 p-4 rounded-2xl flex items-center gap-3">
                                            <User className="w-4 h-4 text-indigo-600" />
                                            <div>
                                                <p className="text-xs text-gray-400 mb-0.5">Recipient Details</p>
                                                <p className="font-bold text-gray-900 text-sm">{selectedEmail.recipient}</p>
                                            </div>
                                        </div>
                                    )}
                                </section>

                                <section>
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 block">Subject</label>
                                    <p className="text-xl font-bold text-gray-900">{selectedEmail.subject || "No Subject provided"}</p>
                                </section>

                                <section>
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 block">Generated Content</label>
                                    <div className="bg-white border border-gray-100 p-6 rounded-2xl text-gray-700 whitespace-pre-wrap leading-relaxed shadow-sm">
                                        {selectedEmail.generatedContent}
                                    </div>
                                </section>
                            </div>

                            <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
                                <button
                                    onClick={() => setSelectedEmail(null)}
                                    className="px-6 py-2.5 rounded-xl font-bold text-gray-500 hover:text-gray-900 transition-colors"
                                >
                                    Close
                                </button>
                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText(selectedEmail.generatedContent);
                                        alert("Copied to clipboard!");
                                    }}
                                    className="bg-[#1F2A37] text-white px-8 py-2.5 rounded-xl font-bold hover:bg-[#111827] transition-all shadow-md active:scale-95"
                                >
                                    Copy Content
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