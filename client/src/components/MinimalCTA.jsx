import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const MinimalCTA = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto relative bg-[#1F2A37] rounded-[3rem] px-8 py-20 text-center overflow-hidden"
      >
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-8 tracking-tight">
            Ready to reclaim <br className="hidden md:block" />
            <span className="text-indigo-400">your productive time?</span>
          </h2>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join 10,000+ professionals who have already upgraded their email game with MailFlow AI.
            No credit card required. Free forever (tier available).
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              to="/register"
              className="w-full sm:w-auto bg-white text-[#1F2A37] rounded-2xl px-10 py-4 font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-xl flex items-center justify-center gap-2 group"
            >
              Get Started for Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/login"
              className="text-white font-bold text-lg hover:text-indigo-400 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default MinimalCTA;

