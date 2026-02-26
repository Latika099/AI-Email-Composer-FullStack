import { Link } from "react-router-dom";
import { Sparkles, Twitter, Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white pt-24 pb-12 px-4 sm:px-6 lg:px-8 border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          {/* Brand & Mission */}
          <div className="col-span-1 md:col-span-2 space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-[#1F2A37] p-2 rounded-xl">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-[#1F2A37] tracking-tight">
                MailFlow AI
              </span>
            </Link>
            <p className="text-gray-500 max-w-xs leading-relaxed">
              We're building the future of professional communication. Our AI-powered tools
              help you focus on the relationships that matter, one email at a time.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="p-2 bg-gray-50 text-gray-400 hover:text-[#1F2A37] hover:bg-gray-100 rounded-lg transition-all"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="p-2 bg-gray-50 text-gray-400 hover:text-[#1F2A37] hover:bg-gray-100 rounded-lg transition-all"><Linkedin className="w-5 h-5" /></a>
              <a href="#" className="p-2 bg-gray-50 text-gray-400 hover:text-[#1F2A37] hover:bg-gray-100 rounded-lg transition-all"><Github className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-[#1F2A37] font-bold mb-6">Product</h4>
            <ul className="space-y-4">
              <li><Link to="/" className="text-gray-500 hover:text-indigo-600 transition-colors text-sm font-medium">Features</Link></li>
              <li><Link to="/" className="text-gray-500 hover:text-indigo-600 transition-colors text-sm font-medium">How it Works</Link></li>
              <li><Link to="/" className="text-gray-500 hover:text-indigo-600 transition-colors text-sm font-medium">Pricing</Link></li>
              <li><Link to="/" className="text-gray-500 hover:text-indigo-600 transition-colors text-sm font-medium">Integrations</Link></li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-[#1F2A37] font-bold mb-6">Support</h4>
            <ul className="space-y-4">
              <li><Link to="/login" className="text-gray-500 hover:text-indigo-600 transition-colors text-sm font-medium">Sign in</Link></li>
              <li><Link to="/register" className="text-gray-500 hover:text-indigo-600 transition-colors text-sm font-medium">Register</Link></li>
              <li><a href="mailto:support@mailflowai.com" className="text-gray-500 hover:text-indigo-600 transition-colors text-sm font-medium flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Contact Us
              </a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-gray-400 text-sm font-medium">
            © {new Date().getFullYear()} MailFlow AI. All rights reserved. Built with ❤️ for your inbox.
          </p>
          <div className="flex items-center gap-8">
            <a href="#" className="text-xs text-gray-400 hover:text-gray-600 font-medium">Privacy Policy</a>
            <a href="#" className="text-xs text-gray-400 hover:text-gray-600 font-medium">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
