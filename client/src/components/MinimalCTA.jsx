import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const MinimalCTA = () => {
  return (
    <section className="py-40 px-6 sm:px-12 lg:px-16 bg-[#f6f3ee] overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="max-w-[1400px] mx-auto relative bg-[#2e2a27] rounded-[4rem] px-10 py-32 text-center overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] ring-1 ring-white/5"
      >
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-violet-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-fuchsia-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-10 opacity-60">
                <span className="w-8 h-px bg-white rounded-full"></span>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white">The Final Frontier</p>
                <span className="w-8 h-px bg-white rounded-full"></span>
            </div>
          <h2 className="text-5xl md:text-7xl font-black text-white mb-10 tracking-tight font-serif leading-tight">
            Elevate your <br className="hidden md:block" />
            <span className="text-violet-400 italic">digital presence.</span>
          </h2>
          <p className="text-xl text-gray-400 mb-16 max-w-2xl mx-auto leading-relaxed font-medium">
            Join a collective of high-performing professionals who have already 
            transformed their outreach paradigm. Zero friction, total clarity.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-10">
            <Link
              to="/register"
              className="w-full sm:w-auto bg-[#f6f3ee] text-[#2e2a27] rounded-[2rem] px-14 py-6 font-black text-sm uppercase tracking-widest hover:bg-white transition-all duration-700 shadow-2xl flex items-center justify-center gap-4 group active:scale-95"
            >
              <span>Begin Your Voyage</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-500" />
            </Link>
            <Link
              to="/"
              className="text-white font-black text-[11px] uppercase tracking-[0.3em] hover:text-violet-400 transition-colors py-4 px-8"
            >
              Explore Hierarchy
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default MinimalCTA;

