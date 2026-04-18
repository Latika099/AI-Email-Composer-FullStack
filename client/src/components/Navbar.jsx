import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 right-0 z-50 bg-[#fbfaf8]/80 backdrop-blur-3xl border-b border-gray-100 shadow-[0_4px_30px_rgba(0,0,0,0.02)]"
    >
      <div className="max-w-[1600px] mx-auto px-10 sm:px-12 lg:px-16">
        <div className="flex items-center justify-between h-28">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-4 group">
            <div className="relative">
              <div className="absolute -inset-2 bg-violet-400/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="bg-[#2e2a27] p-3 rounded-2xl group-hover:scale-110 transition-all duration-700 shadow-lg relative z-10">
                <Sparkles className="w-5 h-5 text-fuchsia-400 group-hover:rotate-45 transition-transform duration-700" />
              </div>
            </div>
            <span className="text-xl font-black text-[#2e2a27] tracking-[0.1em] font-serif">
              MAILFLOW
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-12">
            {[
              { name: "Features", href: "#features" },
              { name: "How it Works", href: "#how-it-works" }
            ]?.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 hover:text-violet-600 transition-all duration-300 relative group"
              >
                {item.name}
                <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-violet-500 transition-all duration-300 group-hover:w-full rounded-full"></span>
              </a>
            ))}
            <div className="h-6 w-px bg-gray-100 mx-2" />
            <Link
              to="/login"
              className="text-[11px] font-black uppercase tracking-[0.3em] text-[#2e2a27] hover:text-violet-600 transition-colors"
            >
              Log in
            </Link>
            <Link
              to="/register"
              className="bg-[#2e2a27] text-[#f6f3ee] px-10 py-5 rounded-[1.75rem] text-[11px] font-black uppercase tracking-[0.2em] hover:bg-black transition-all duration-700 shadow-[0_20px_40px_rgba(0,0,0,0.1)] active:scale-95 group relative overflow-hidden"
            >
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Link>
          </div>

          {/* Mobile Menu Button - Placeholder as per scope */}
          <div className="md:hidden">
            <button className="p-3 bg-gray-50 rounded-2xl text-gray-400">
              <span className="sr-only">Open menu</span>
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;

