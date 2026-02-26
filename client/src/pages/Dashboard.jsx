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
        const res = await fetch("http://localhost:5000/api/email/stats", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        const data = await res.json();
        if (data.success) {
          setStats({
            totalEmails: data.totalEmails,
            emailsThisWeek: data.emailsThisWeek,
            savedDrafts: data.savedDrafts,
          });
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    const fetchActivity = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/email/activity", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        const data = await res.json();
        if (data.success) {
          setActivities(data.activities);
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
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    {
      label: "Active This Week",
      value: stats.emailsThisWeek,
      icon: <TrendingUp className="w-6 h-6" />,
      color: "text-green-600",
      bg: "bg-green-50"
    },
    {
      label: "Saved Drafts",
      value: stats.savedDrafts,
      icon: <FileText className="w-6 h-6" />,
      color: "text-indigo-600",
      bg: "bg-indigo-50"
    }
  ];

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-10">
        <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 tracking-tight">
              Welcome back
            </h2>
            <p className="text-gray-500 mt-2 text-lg">
              Here's how your AI-powered communication is performing.
            </p>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/create-email")}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-[#1F2A37] text-white font-bold shadow-xl shadow-gray-200 hover:bg-[#111827] transition-all group"
          >
            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
            Create New Email
          </motion.button>
        </header>

        {/* Stats Grid */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid gap-6 sm:grid-cols-3"
        >
          {statCards.map((card, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all duration-300 group relative overflow-hidden"
            >
              <div className="relative z-10 flex flex-col gap-6">
                <div className={`w-12 h-12 rounded-xl ${card.bg} ${card.color} flex items-center justify-center`}>
                  {card.icon}
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-400 font-bold uppercase tracking-wider">{card.label}</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black text-gray-900">{card.value}</span>
                    <span className="text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded-lg flex items-center gap-1">
                      <ArrowUpRight className="w-3 h-3" />
                      12%
                    </span>
                  </div>
                </div>
              </div>
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 scale-150 rotate-12 transition-all">
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

          {activities.length === 0 ? (
            <div className="text-center py-20 bg-gray-50/50 rounded-3xl border border-dashed border-gray-200">
              <History className="w-12 h-12 text-gray-200 mx-auto mb-4" />
              <p className="text-gray-400 font-medium">No activity recorded yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {activities.map((activity) => (
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