import { motion } from "framer-motion";
import { Settings, PenTool, Send, CheckCircle2 } from "lucide-react";

const HowItWorks = () => {
    const steps = [
        {
            title: "Define Objectives",
            description: "Articulate your purpose and core message. Our system ingests your keywords to establish a baseline for the AI.",
            icon: <Settings className="w-8 h-8" />,
            color: "bg-violet-50/50 text-violet-500",
        },
        {
            title: "Curate Resonance",
            description: "Select from a spectrum of professional tones. The engine adapts its linguistic structure to match your persona.",
            icon: <PenTool className="w-8 h-8" />,
            color: "bg-fuchsia-50/50 text-violet-500",
        },
        {
            title: "Deploy Artifacts",
            description: "Receive a high-fidelity composition instantly. Refine, duplicate, or dispatch directly to any platform.",
            icon: <Send className="w-8 h-8" />,
            color: "bg-indigo-50/50 text-violet-500",
        },
    ];

    return (
        <section id="how-it-works" className="py-40 bg-white relative">
            <div className="max-w-[1600px] mx-auto px-10 sm:px-12 lg:px-16">
                <div className="text-center max-w-4xl mx-auto mb-32">
                    <div className="flex items-center justify-center gap-4 mb-8 uppercase">
                        <span className="w-12 h-[2px] bg-violet-400 rounded-full"></span>
                        <h2 className="text-[11px] font-black text-violet-500 tracking-[0.4em]">The Methodology</h2>
                        <span className="w-12 h-[2px] bg-violet-400 rounded-full"></span>
                    </div>
                    <h3 className="text-5xl md:text-7xl font-black text-[#2e2a27] mb-10 font-serif leading-tight">
                        Seamlessly orchestrated <br className="hidden md:block" />
                        professional communication.
                    </h3>
                    <p className="text-xl text-gray-400 leading-relaxed font-medium max-w-2xl mx-auto">
                        A refined three-step paradigm that transforms abstract concepts into 
                        prestigious digital correspondence.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-12">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2, duration: 0.8 }}
                            className="relative group p-12 rounded-[3.5rem] border border-gray-100 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] transition-all duration-700 ring-1 ring-black/[0.02] bg-white cursor-default"
                        >
                            <div className={`w-16 h-16 rounded-[1.75rem] ${step.color} flex items-center justify-center mb-10 transform group-hover:rotate-[360deg] transition-all duration-1000 shadow-inner`}>
                                {step.icon}
                            </div>
                            <h4 className="text-3xl font-black text-[#2e2a27] mb-6 font-serif">{step.title}</h4>
                            <p className="text-gray-400 leading-relaxed font-medium mb-10">
                                {step.description}
                            </p>
                            <div className="flex items-center gap-3 text-violet-500 font-black text-[10px] uppercase tracking-[0.2em] opacity-40 group-hover:opacity-100 transition-opacity">
                                <CheckCircle2 className="w-4 h-4" />
                                Sequence {index + 1}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
