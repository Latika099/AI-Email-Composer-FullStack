import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-[#1F2A37] transition-all duration-300">
            AI Email Composer
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            <Link
              to="/"
              className="text-gray-700 hover:text-[#1F2A37] font-medium transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              to="/login"
              className="text-gray-700 hover:text-[#1F2A37] font-medium transition-colors duration-200"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-[#1F2A37] text-white px-6 py-2 rounded-full font-medium hover:opacity-90 transition-all duration-200"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

