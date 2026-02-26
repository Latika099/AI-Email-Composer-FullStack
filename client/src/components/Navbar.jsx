import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-md border-b border-gray-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-[#1F2A37] p-2 rounded-xl group-hover:scale-110 transition-transform duration-300">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-[#1F2A37] tracking-tight">
              MailFlow AI
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-sm font-semibold text-gray-600 hover:text-[#1F2A37] transition-colors"
            >
              Features
            </Link>
            <Link
              to="/"
              className="text-sm font-semibold text-gray-600 hover:text-[#1F2A37] transition-colors"
            >
              How it Works
            </Link>
            <div className="h-6 w-px bg-gray-200 mx-2" />
            <Link
              to="/login"
              className="text-sm font-semibold text-gray-600 hover:text-[#1F2A37] transition-colors"
            >
              Log in
            </Link>
            <Link
              to="/register"
              className="bg-[#1F2A37] text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-[#111827] transition-all duration-300 shadow-lg shadow-gray-200 active:scale-95"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button - Placeholder as per scope */}
          <div className="md:hidden">
            <button className="p-2 text-gray-600">
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

