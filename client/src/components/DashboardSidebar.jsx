import { useNavigate, useLocation } from "react-router-dom";
import {
    LayoutDashboard,
    PenBox,
    History,
    LogOut,
    Mail
} from "lucide-react";
import { motion } from "framer-motion";

const DashboardSidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    const menuItems = [
        { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
        { name: "Create Email", path: "/create-email", icon: PenBox },
        { name: "Email History", path: "/email-history", icon: History },
    ];

    return (
        <aside className="w-80 bg-white border-r border-gray-100 hidden lg:flex flex-col py-10 px-8 h-screen sticky top-0 shadow-[10px_0_40px_rgba(0,0,0,0.01)]">
            <div className="mb-14 px-4 flex items-center gap-5">
                <div className="relative group/logo">
                    <div className="absolute -inset-2 bg-violet-100 rounded-[1.5rem] blur-xl opacity-0 group-hover/logo:opacity-100 transition-opacity duration-700"></div>
                    <div className="bg-[#2e2a27] p-3.5 rounded-[1.5rem] shadow-xl relative z-10 transition-transform duration-700 group-hover/logo:rotate-[360deg]">
                        <Mail className="text-[#f6f3ee] w-7 h-7" />
                    </div>
                </div>
                <div>
                    <h1 className="text-2xl font-black text-[#2e2a27] tracking-tighter leading-none font-serif">
                        MailFlow
                    </h1>
                    <div className="flex items-center gap-2 mt-2">
                        <span className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-pulse"></span>
                        <p className="text-[10px] font-black text-violet-500 uppercase tracking-[0.2em] opacity-80">Workspace v2.1</p>
                    </div>
                </div>
            </div>

            <nav className="space-y-4 flex-1">
                {menuItems?.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <button
                            key={item.path}
                            onClick={() => navigate(item.path)}
                            className={`w-full flex items-center gap-4 px-6 py-4.5 rounded-[1.75rem] transition-all duration-500 group relative ${
                                isActive
                                ? "bg-white text-violet-700 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-50 scale-[1.02]"
                                : "text-gray-400 hover:bg-[#fbfaf8] hover:text-[#2e2a27]"
                            }`}
                        >
                            <item.icon className={`w-5 h-5 transition-all duration-500 ${isActive ? "text-violet-600 scale-125" : "group-hover:text-violet-500 group-hover:scale-110"}`} />
                            <span className={`font-black text-[13px] uppercase tracking-widest transition-all duration-500 ${isActive ? "translate-x-1" : "group-hover:translate-x-1"}`}>
                                {item.name}
                            </span>
                            {isActive && (
                                <motion.div
                                    layoutId="activeTabIndicator"
                                    className="absolute left-0 w-1.5 h-6 bg-violet-500 rounded-r-full"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, ease: "backOut" }}
                                />
                            )}
                        </button>
                    );
                })}
            </nav>

            <div className="pt-10 border-t border-gray-50">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-4 px-5 py-4 rounded-[1.5rem] text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all duration-400 group"
                >
                    <div className="p-2 rounded-xl group-hover:bg-red-100 transition-colors">
                        <LogOut className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    </div>
                    <span className="font-bold text-sm">Sign Out</span>
                </button>
            </div>
        </aside>
    );
};

export default DashboardSidebar;
