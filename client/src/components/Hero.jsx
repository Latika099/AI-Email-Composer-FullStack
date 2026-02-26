import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, CheckCircle, Mail, Shield, Zap } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-white">
      {/* Background Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 blur-[120px] opacity-20 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-400 rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-300 rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-600 text-sm font-bold mb-8">
              <Sparkles className="w-4 h-4" />
              Trusted by professionals
            </span>

            <h1 className="text-5xl md:text-7xl font-extrabold text-[#1F2A37] tracking-tight mb-8 leading-[1.1]">
              Write professional emails <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">
                10x faster with AI
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-500 mb-12 leading-relaxed max-w-3xl mx-auto">
              The ultimate AI sidekick for your inbox. Craft perfectly toned, professional messages
              for every situation in seconds, not hours.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Link
                to="/register"
                className="w-full sm:w-auto bg-[#1F2A37] text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-[#111827] transition-all duration-300 shadow-xl shadow-gray-200 flex items-center justify-center gap-2 group"
              >
                Get Started for Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="w-full sm:w-auto text-gray-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all">
                View Demo
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left max-w-3xl mx-auto">
              <div className="flex items-center gap-3 text-gray-600 font-medium">
                <CheckCircle className="w-5 h-5 text-green-500" />
                No Credit Card Required
              </div>
              <div className="flex items-center gap-3 text-gray-600 font-medium">
                <CheckCircle className="w-5 h-5 text-green-500" />
                100% Privacy Focused
              </div>
              <div className="flex items-center gap-3 text-gray-600 font-medium">
                <CheckCircle className="w-5 h-5 text-green-500" />
                Smart Tone Detection
              </div>
            </div>
          </motion.div>
        </div>

        {/* Floating Preview Element */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-20 relative px-4 lg:px-20"
        >
          <div className="relative bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl overflow-hidden p-2">
            <div className="bg-gray-50 rounded-[2rem] p-6 md:p-12">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="w-full md:w-1/3 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-4">
                  <div className="h-4 bg-gray-100 rounded-full w-2/3" />
                  <div className="h-10 bg-gray-50 rounded-xl" />
                  <div className="grid grid-cols-2 gap-2">
                    <div className="h-8 bg-gray-50 rounded-xl" />
                    <div className="h-8 bg-gray-50 rounded-xl" />
                  </div>
                  <div className="h-12 bg-[#1F2A37] rounded-xl" />
                </div>
                <div className="w-full md:w-2/3 space-y-4">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
                      <Mail className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div className="space-y-1">
                      <div className="h-4 bg-gray-200 rounded-full w-24" />
                      <div className="h-3 bg-gray-100 rounded-full w-32" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-100 rounded-full w-full" />
                    <div className="h-4 bg-gray-100 rounded-full w-[90%]" />
                    <div className="h-4 bg-gray-100 rounded-full w-[95%]" />
                    <div className="h-4 bg-gray-100 rounded-full w-[80%]" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative floating badges */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="absolute -top-12 -left-4 md:left-12 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-gray-100"
          >
            <div className="p-2 bg-yellow-50 rounded-lg"><Zap className="w-5 h-5 text-yellow-500" /></div>
            <div className="text-sm font-bold text-gray-800">Generated in 0.8s</div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 4, delay: 0.5 }}
            className="absolute -bottom-8 -right-4 md:right-12 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-gray-100"
          >
            <div className="p-2 bg-blue-50 rounded-lg"><Shield className="w-5 h-5 text-blue-500" /></div>
            <div className="text-sm font-bold text-gray-800">Bank-level Security</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
