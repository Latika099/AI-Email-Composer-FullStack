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
        <aside className="w-64 bg-white border-r border-gray-100 hidden md:flex flex-col py-8 px-4 h-screen sticky top-0 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
            <div className="mb-10 px-4 flex items-center gap-3">
                <div className="bg-[#1F2A37] p-2 rounded-xl shadow-lg shadow-gray-100">
                    <Mail className="text-white w-6 h-6" />
                </div>
                <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#1F2A37] to-[#4B5563] tracking-tight">
                    MailFlow AI
                </h1>
            </div>

            <nav className="space-y-2 flex-1">
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <button
                            key={item.path}
                            onClick={() => navigate(item.path)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative ${isActive
                                ? "bg-[#1F2A37] text-white shadow-lg shadow-gray-200"
                                : "text-gray-500 hover:bg-gray-50 hover:text-[#1F2A37]"
                                }`}
                        >
                            <item.icon className={`w-5 h-5 ${isActive ? "text-white" : "group-hover:text-[#1F2A37]"}`} />
                            <span className="font-medium">{item.name}</span>
                            {isActive && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute left-0 w-1 h-6 bg-white rounded-r-full"
                                />
                            )}
                        </button>
                    );
                })}
            </nav>

            <div className="pt-6 border-t border-gray-100">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-all duration-200"
                >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default DashboardSidebar;
