import { Link, useLocation, useNavigate } from "react-router-dom";
import { Bell, UserCircle, ChevronDown, User, LogOut, ArrowLeft } from "lucide-react";
import { useEffect, useState, useRef } from "react";

const DashboardNavbar = () => {
    const [userName, setUserName] = useState("User");
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const dropdownRef = useRef(null);
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const getBreadcrumbs = () => {
        const path = location.pathname;
        const crumbs = [{ name: "Dashboard", url: "/dashboard" }];
        
        if (path === "/create-email") {
            crumbs.push({ name: "Create Email", url: "/create-email" });
        } else if (path === "/email-history") {
            crumbs.push({ name: "Email History", url: "/email-history" });
        }
        
        return crumbs;
    };

    const breadcrumbs = getBreadcrumbs();
    const isNotDashboard = location.pathname !== "/dashboard";

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
        <header className="h-28 bg-[#fbfaf8]/80 backdrop-blur-3xl border-b border-gray-100/50 flex items-center justify-between px-12 sticky top-0 z-40 transition-all duration-500 shadow-[0_4px_30px_rgba(0,0,0,0.02)]">
            <div className="flex items-center gap-10">
                {isNotDashboard && (
                    <button 
                        onClick={() => navigate("/dashboard")}
                        className="flex items-center gap-3 text-[#2e2a27] font-black text-[12px] hover:translate-x-[-4px] transition-all bg-white px-7 py-3.5 rounded-[1.75rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 group active:scale-95"
                    >
                        <ArrowLeft className="w-4 h-4 text-violet-500 group-hover:scale-110 transition-transform" />
                        <span className="hidden lg:inline uppercase tracking-[0.2em]">Back to Dashboard</span>
                        <span className="lg:hidden uppercase tracking-[0.2em]">Back</span>
                    </button>
                )}
                
                <nav className="flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.3em]">
                    {breadcrumbs?.map((crumb, index) => (
                        <div key={crumb.url} className="flex items-center gap-4">
                            {index > 0 && <span className="text-gray-200">/</span>}
                            <Link
                                to={crumb.url}
                                className={`transition-all duration-300 ${
                                    location.pathname === crumb.url 
                                    ? "text-[#2e2a27]" 
                                    : "text-gray-400 hover:text-violet-500"
                                }`}
                            >
                                {crumb.name}
                            </Link>
                        </div>
                    ))}
                </nav>
            </div>

            <div className="flex items-center gap-8">
                <button
                    title="Notifications"
                    className="p-4 text-gray-400 hover:text-violet-600 hover:bg-white rounded-2xl transition-all shadow-sm group border border-transparent hover:border-gray-50 relative"
                >
                    <Bell className="w-5.5 h-5.5 group-hover:rotate-12 transition-transform" />
                    <span className="absolute top-4 right-4 w-2 h-2 bg-violet-500 rounded-full border-2 border-white"></span>
                </button>

                <div className="h-12 w-[1.5px] bg-gray-100/30"></div>
                
                <div className="relative" ref={dropdownRef}>
                    <button 
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className="flex items-center gap-4 p-2 pr-6 rounded-full hover:bg-white transition-all shadow-sm border border-transparent hover:border-gray-50 group active:scale-95 bg-white/30 backdrop-blur-sm"
                    >
                        <div className="relative">
                            <div className="absolute -inset-1 bg-gradient-to-tr from-violet-500 to-fuchsia-500 rounded-full blur opacity-0 group-hover:opacity-30 transition-opacity"></div>
                            <div className="w-11 h-11 rounded-full bg-violet-50 border-2 border-white flex items-center justify-center text-violet-600 shadow-sm relative z-10 transition-transform group-hover:scale-105">
                                <UserCircle className="w-8 h-8" />
                            </div>
                        </div>
                        <div className="text-left hidden lg:block">
                            <p className="text-[14px] font-black text-[#2e2a27] leading-none mb-1.5 font-serif">{userName}</p>
                            <p className="text-[9px] text-violet-500 font-black uppercase tracking-[0.2em] opacity-70">Premium Active</p>
                        </div>
                        <ChevronDown className={`w-4 h-4 text-gray-300 transition-all duration-500 ${isProfileOpen ? 'rotate-180 text-violet-500' : ''}`} />
                    </button>

                    {isProfileOpen && (
                        <div className="absolute right-0 mt-3 w-56 bg-white rounded-[2rem] shadow-2xl border border-gray-50 py-3 z-50 overflow-hidden transform origin-top-right ring-1 ring-black/5">
                            <div className="px-5 py-3 border-b border-gray-50 mb-2">
                                <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider mb-1">Account</p>
                                <p className="text-sm font-bold text-[#2e2a27] truncate">{userName}</p>
                            </div>
                            <button className="w-full flex items-center gap-3 px-5 py-3 text-sm text-[#2e2a27] hover:bg-violet-50 hover:text-violet-600 transition-all font-semibold">
                                <User className="w-4 h-4" />
                                My Profile
                            </button>
                            <button 
                                onClick={handleLogout}
                                className="w-full flex items-center gap-3 px-5 py-3 text-sm text-red-500 hover:bg-red-50 transition-all border-t border-gray-50 mt-2 font-bold"
                            >
                                <LogOut className="w-4 h-4" />
                                Logout Session
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default DashboardNavbar;
