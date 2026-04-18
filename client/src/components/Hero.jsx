import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, CheckCircle, Mail, Shield, Zap } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative pt-40 pb-24 lg:pt-56 lg:pb-40 overflow-hidden bg-[#f6f3ee]">
      {/* Background Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 blur-[150px] opacity-30 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-violet-200/40 rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[700px] h-[700px] bg-orange-100/30 rounded-full" />
      </div>

      <div className="max-w-[1600px] mx-auto px-10 sm:px-12 lg:px-16">
        <div className="text-center max-w-5xl mx-auto mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-white/50 backdrop-blur-md border border-gray-100 text-[11px] font-black uppercase tracking-[0.3em] text-violet-500 mb-12 shadow-sm">
              <Sparkles className="w-4 h-4" />
              Intelligence at your fingertips
            </span>

            <h1 className="text-6xl md:text-8xl font-black text-[#2e2a27] tracking-tight mb-10 leading-[1.05] font-serif">
              Master the art of <br className="hidden lg:block" />
              <span className="text-violet-600 italic">digital rapport.</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-500 mb-16 leading-[1.6] max-w-3xl mx-auto font-medium">
              Elevate your outreach with AI that understands nuance. Craft perfectly toned, 
              professional narratives in seconds, not hours.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20 animate-in fade-in slide-in-from-bottom-5 duration-1000">
              <Link
                to="/register"
                className="w-full sm:w-auto bg-[#2e2a27] text-[#f6f3ee] px-12 py-6 rounded-[2rem] font-black text-sm uppercase tracking-widest hover:bg-black transition-all duration-700 shadow-[0_30px_60px_-10px_rgba(46,42,39,0.25)] flex items-center justify-center gap-4 group relative overflow-hidden active:scale-95"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="relative z-10">Start Composing</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-500 relative z-10" />
              </Link>
              <button className="w-full sm:w-auto text-[#2e2a27] px-12 py-6 rounded-[2rem] font-black text-sm uppercase tracking-widest hover:bg-white/60 transition-all border border-transparent hover:border-gray-100">
                Experience Demo
              </button>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-12 text-left max-w-4xl mx-auto opacity-60">
              <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-[#2e2a27]">
                <div className="w-6 h-6 rounded-lg bg-violet-100 flex items-center justify-center"><CheckCircle className="w-3.5 h-3.5 text-violet-600" /></div>
                Zero configuration cost
              </div>
              <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-[#2e2a27]">
                <div className="w-6 h-6 rounded-lg bg-violet-100 flex items-center justify-center"><CheckCircle className="w-3.5 h-3.5 text-violet-600" /></div>
                Privacy by core design
              </div>
              <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-[#2e2a27]">
                <div className="w-6 h-6 rounded-lg bg-violet-100 flex items-center justify-center"><CheckCircle className="w-3.5 h-3.5 text-violet-600" /></div>
                Intelligent Tone Sync
              </div>
            </div>
          </motion.div>
        </div>

        {/* Floating Preview Element */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
          className="relative px-4 lg:px-32 group"
        >
          <div className="relative bg-white rounded-[4rem] border border-gray-100/50 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.12)] overflow-hidden p-3 ring-1 ring-black/[0.02]">
            <div className="bg-[#fbfaf8]/40 rounded-[3.5rem] p-10 md:p-20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-violet-100/30 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
              <div className="flex flex-col lg:flex-row gap-16 items-start relative z-10">
                <div className="w-full lg:w-1/3 bg-white/80 backdrop-blur-md rounded-[3rem] p-10 border border-white shadow-xl space-y-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-1.5 bg-violet-400 rounded-full"></div>
                    <div className="text-[10px] font-black text-violet-500 uppercase tracking-widest">Configuration</div>
                  </div>
                  <div className="space-y-4">
                    <div className="h-14 bg-gray-50/50 rounded-2xl border border-gray-100 flex items-center px-6">
                        <div className="w-1/2 h-2.5 bg-gray-200 rounded-full"></div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="h-14 bg-gray-50/50 rounded-2xl border border-gray-100 flex items-center px-6">
                            <div className="w-full h-2.5 bg-gray-100 rounded-full"></div>
                        </div>
                        <div className="h-14 bg-gray-50/50 rounded-2xl border border-gray-100 flex items-center px-6">
                            <div className="w-full h-2.5 bg-gray-100 rounded-full"></div>
                        </div>
                    </div>
                  </div>
                  <div className="h-16 bg-[#2e2a27] rounded-[1.5rem] flex items-center justify-center gap-3">
                    <Sparkles className="w-5 h-5 text-violet-400" />
                    <div className="text-[10px] font-black text-white uppercase tracking-widest">Refine Composition</div>
                  </div>
                </div>
                <div className="w-full lg:w-2/3 space-y-8 py-4">
                  <div className="flex items-center gap-6 mb-10">
                    <div className="w-16 h-16 rounded-[1.75rem] bg-violet-600 flex items-center justify-center shadow-lg shadow-violet-200">
                      <Mail className="w-7 h-7 text-white" />
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-3">
                            <div className="h-2 w-16 bg-violet-400 rounded-full"></div>
                            <div className="text-[11px] font-black uppercase tracking-widest text-[#2e2a27]">New Message</div>
                        </div>
                      <div className="h-4 bg-gray-100 rounded-full w-48" />
                    </div>
                  </div>
                  <div className="space-y-5">
                    <div className="h-[2px] bg-gray-100 w-full opacity-50"></div>
                    <div className="h-24 bg-gray-50/80 rounded-3xl border border-gray-100/50 flex flex-col justify-center px-8 space-y-3">
                        <div className="h-2.5 bg-gray-200 rounded-full w-full" />
                        <div className="h-2.5 bg-gray-200 rounded-full w-[85%]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative floating badges */}
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute -top-16 -left-8 bg-white/80 backdrop-blur-xl p-6 rounded-[2rem] shadow-2xl flex items-center gap-4 border border-white"
          >
            <div className="p-3 bg-fuchsia-50 rounded-2xl"><Zap className="w-6 h-6 text-fuchsia-500" /></div>
            <div>
                <div className="text-[9px] font-black text-fuchsia-400 uppercase tracking-widest mb-1">Response Time</div>
                <div className="text-sm font-black text-[#2e2a27] uppercase tracking-widest">Instantaneous</div>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ repeat: Infinity, duration: 5, delay: 0.5, ease: "easeInOut" }}
            className="absolute -bottom-12 -right-8 bg-[#2e2a27] p-6 rounded-[2.5rem] shadow-2xl flex items-center gap-4 border border-gray-800"
          >
            <div className="p-3 bg-violet-600/20 rounded-2xl"><Shield className="w-6 h-6 text-violet-400" /></div>
            <div>
                <div className="text-[9px] font-black text-violet-400 uppercase tracking-widest mb-1">Encrypted Gateway</div>
                <div className="text-sm font-black text-white uppercase tracking-widest">Enterprise Secured</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
