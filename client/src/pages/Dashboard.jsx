import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Mail,
  Users,
  FileText,
  TrendingUp,
  ArrowUpRight,
  Activity,
  History,
  Send
} from "lucide-react";
import DashboardLayout from "../components/DashboardLayout";
import { apiFetch } from "../utils/api";

const Dashboard = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalEmails: 0,
    emailsThisWeek: 0,
    savedDrafts: 0,
  });
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await apiFetch("/api/email/stats", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        const data = await res.json();
        if (data?.success) {
          setStats({
            totalEmails: data?.totalEmails || 0,
            emailsThisWeek: data?.emailsThisWeek || 0,
            savedDrafts: data?.savedDrafts || 0,
          });
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    const fetchActivity = async () => {
      try {
        const res = await apiFetch("/api/email/activity", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        const data = await res.json();
        if (data?.success) {
          setActivities(data?.activities || []);
        }
      } catch (error) {
        console.error("Error fetching activity:", error);
      }
    };

    fetchStats();
    fetchActivity();
  }, []);

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

  const statCards = [
    {
      label: "Total Generated",
      value: stats.totalEmails,
      icon: <Mail className="w-6 h-6" />,
      color: "text-amber-600",
      bg: "bg-amber-50"
    },
    {
      label: "Active This Week",
      value: stats.emailsThisWeek,
      icon: <TrendingUp className="w-6 h-6" />,
      color: "text-emerald-600",
      bg: "bg-emerald-50"
    },
    {
      label: "Saved Drafts",
      value: stats.savedDrafts,
      icon: <FileText className="w-6 h-6" />,
      color: "text-violet-600",
      bg: "bg-violet-50"
    }
  ];

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-12">
        <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-10 mb-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3">
              <span className="w-12 h-[2px] bg-violet-500 rounded-full"></span>
              <p className="text-[11px] font-black text-violet-500 uppercase tracking-[0.3em]">Performance Overview</p>
            </div>
            <h2 className="text-6xl font-black text-[#2e2a27] tracking-tight font-serif leading-tight">
              Good day, <br/><span className="text-violet-600/90">{stats.userName || 'Writer'}</span>
            </h2>
            <p className="text-gray-400 text-xl font-medium max-w-xl leading-relaxed">
              Your AI-assisted communication performance is looking strong today.
            </p>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05, translateY: -4 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/create-email")}
            className="inline-flex items-center justify-center gap-4 px-10 py-5 rounded-[2rem] bg-[#2e2a27] text-[#f6f3ee] font-black text-sm uppercase tracking-widest shadow-[0_20px_50px_rgba(46,42,39,0.2)] hover:bg-black transition-all group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-700 relative z-10" />
            <span className="relative z-10">New Composition</span>
          </motion.button>
        </header>

        {/* Stats Grid */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid gap-10 sm:grid-cols-3"
        >
          {statCards?.map((card, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="bg-white border border-gray-100/50 rounded-[3.5rem] p-12 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] hover:-translate-y-3 transition-all duration-700 group relative overflow-hidden ring-1 ring-black/[0.03] ring-offset-[8px] ring-offset-white"
            >
              <div className="relative z-10 flex flex-col gap-10">
                <div className={`w-16 h-16 rounded-[1.5rem] ${card.bg} ${card.color} flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-700`}>
                  {card.icon}
                </div>
                <div className="space-y-4">
                  <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.25em]">{card.label}</p>
                  <div className="flex items-baseline gap-4">
                    <span className="text-6xl font-black text-[#2e2a27] tracking-tighter">{card.value}</span>
                    <span className="text-[11px] font-black text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm border border-emerald-100/50">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                      12%
                    </span>
                  </div>
                </div>
              </div>
              <div className="absolute -top-10 -right-10 p-12 opacity-[0.02] group-hover:opacity-[0.06] scale-[3.5] rotate-[25deg] transition-all duration-1000 group-hover:rotate-[45deg]">
                {card.icon}
              </div>
            </motion.div>
          ))}
        </motion.section>

        {/* Recent Activity */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white border border-gray-100 rounded-[2.5rem] p-10 shadow-sm relative overflow-hidden"
        >
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <Activity className="w-7 h-7 text-indigo-500" />
              Recent Logs
            </h3>
            <button
              onClick={() => navigate("/email-history")}
              className="text-indigo-600 font-bold text-sm hover:text-indigo-700 transition-colors flex items-center gap-1"
            >
              View All
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          {activities?.length === 0 ? (
            <div className="text-center py-20 bg-gray-50/50 rounded-3xl border border-dashed border-gray-200">
              <History className="w-12 h-12 text-gray-200 mx-auto mb-4" />
              <p className="text-gray-400 font-medium">No activity recorded yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {activities?.map((activity) => (
                <motion.div
                  key={activity._id}
                  whileHover={{ x: 10 }}
                  className="flex items-center justify-between p-6 rounded-2xl border border-transparent hover:border-gray-50 hover:bg-gray-50/50 transition-all group"
                >
                  <div className="flex items-center gap-6">
                    <div className={`p-3 rounded-xl ${activity.action === "sent" ? "bg-green-50 text-green-600" : "bg-blue-50 text-blue-600"}`}>
                      {activity.action === "sent" ? <Send className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors truncate max-w-[200px] md:max-w-md">
                        {activity.emailId?.subject || "Email Task"}
                      </h4>
                      <div className="flex items-center gap-3 mt-1 text-xs font-bold uppercase tracking-widest text-gray-400">
                        <span>{activity.action}</span>
                        <span className="w-1 h-1 bg-gray-200 rounded-full" />
                        <span>AI Draft</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold text-gray-900">
                      {new Date(activity.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {new Date(activity.timestamp).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.section>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;