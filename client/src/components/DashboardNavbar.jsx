import { Link } from "react-router-dom";
import { Bell, UserCircle } from "lucide-react";
import { useEffect, useState } from "react";

const DashboardNavbar = () => {
    const [userName, setUserName] = useState("User");

    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (userData) {
            try {
                const user = JSON.parse(userData);
                if (user && user.name) {
                    setUserName(user.name);
                }
            } catch (error) {
                console.error("Error parsing user data:", error);
            }
        }
    }, []);

    return (
        <header className="h-20 bg-white/70 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-30">
            <div className="flex items-center gap-3">
                <Link to="/dashboard" className="hidden sm:flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Portal</span>
                    <span className="text-gray-300">/</span>
                </Link>
                <span className="text-sm font-bold text-[#1F2A37]">Dashboard Overview</span>
            </div>

            <div className="flex items-center gap-4">
                <button
                    title="Notifications"
                    className="p-2 text-gray-600 hover:text-[#1F2A37] transition-colors relative"
                >
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>
                <div className="h-8 w-[1px] bg-gray-100 mx-2"></div>
                <button className="flex items-center gap-2 text-gray-700 hover:text-[#1F2A37] transition-colors">
                    <UserCircle className="w-6 h-6" />
                    <span className="text-sm font-medium hidden sm:block">{userName} Profile</span>
                </button>
            </div>
        </header>
    );
};

export default DashboardNavbar;
