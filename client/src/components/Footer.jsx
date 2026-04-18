import { Link } from "react-router-dom";
import { Sparkles, Twitter, Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white pt-40 pb-20 px-10 sm:px-12 lg:px-16 border-t border-gray-100/50">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-20 mb-32">
          {/* Brand & Mission */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2 space-y-10">
            <Link to="/" className="flex items-center gap-4 group">
              <div className="bg-[#2e2a27] p-3 rounded-2xl group-hover:scale-110 transition-all duration-700 shadow-lg">
                <Sparkles className="w-5 h-5 text-fuchsia-400 group-hover:rotate-45 transition-transform duration-700" />
              </div>
              <span className="text-xl font-black text-[#2e2a27] tracking-[0.1em] font-serif">
                MAILFLOW
              </span>
            </Link>
            <p className="text-gray-400 max-w-sm leading-relaxed font-medium text-lg">
              Redefining the architecture of professional communication. Our ecosystem 
              orchestrates relationships through precision-engineered intelligence.
            </p>
            <div className="flex items-center gap-6">
              {[Twitter, Linkedin, Github]?.map((Icon, i) => (
                <a key={i} href="#" className="w-12 h-12 flex items-center justify-center bg-gray-50 text-gray-400 hover:text-violet-500 hover:bg-violet-50 rounded-xl transition-all duration-500 group">
                    <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-[#2e2a27] font-black text-[10px] uppercase tracking-[0.3em] mb-10">Product</h4>
            <ul className="space-y-6">
              {["Features", "Methodology", "Pricing", "Integrations"]?.map((item) => (
                <li key={item}>
                    <Link to="/" className="text-gray-400 hover:text-violet-600 transition-colors text-[11px] font-black uppercase tracking-[0.2em]">
                        {item}
                    </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-[#2e2a27] font-black text-[10px] uppercase tracking-[0.3em] mb-10">Support</h4>
            <ul className="space-y-6">
              {["Log in", "Register", "Privacy", "Terms"]?.map((item) => (
                  <li key={item}>
                    <Link to={item.toLowerCase().includes("log") ? "/login" : item.toLowerCase().includes("reg") ? "/register" : "/"} className="text-gray-400 hover:text-violet-600 transition-colors text-[11px] font-black uppercase tracking-[0.2em]">
                        {item}
                    </Link>
                  </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[#2e2a27] font-black text-[10px] uppercase tracking-[0.3em] mb-10">Connect</h4>
            <a href="mailto:presence@mailflow.ai" className="group block space-y-2">
                <span className="text-gray-400 text-sm font-medium">Inquiries</span>
                <span className="text-[#2e2a27] font-black text-[11px] uppercase tracking-[0.2em] block group-hover:text-violet-500 transition-colors underline underline-offset-8 decoration-gray-100 group-hover:decoration-violet-100">
                    presence@mailflow.ai
                </span>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-gray-100/50 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="flex items-center gap-4">
              <div className="w-8 h-[1px] bg-gray-100"></div>
              <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em]">
                © {new Date().getFullYear()} MailFlow Premium Group. All rights reserved.
              </p>
          </div>
          <div className="flex items-center gap-10">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300">Edition 2.0.4</span>
            <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#2e2a27]">Systems Operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
