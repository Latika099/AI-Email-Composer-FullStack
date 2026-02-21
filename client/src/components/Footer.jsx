import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-[#1F2A37] mb-4">
              AI Email Composer
            </h3>
            <p className="text-gray-600">
              Transform your email communication with the power of AI.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-[#1F2A37] font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-[#1F2A37] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-600 hover:text-[#1F2A37] transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-600 hover:text-[#1F2A37] transition-colors">
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[#1F2A37] font-semibold mb-4">Contact</h4>
            <p className="text-gray-600">
              support@aiemailcomposer.com
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 pt-8 text-center">
          <p className="text-gray-600">
            © {new Date().getFullYear()} AI Email Composer. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
