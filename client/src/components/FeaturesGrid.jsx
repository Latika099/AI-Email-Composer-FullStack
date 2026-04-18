import { motion } from "framer-motion";
import {
    Zap,
    MessageSquare,
    Globe,
    ShieldCheck,
    MousePointer2,
    Layout
} from "lucide-react";

const FeaturesGrid = () => {
    const features = [
        {
            title: "Prototypal Intelligence",
            description: "Generate high-fidelity email drafts in less than a second using world-class AI models.",
            icon: <Zap className="w-8 h-8" />,
            color: "text-violet-500",
            bg: "bg-violet-50/50"
        },
        {
            title: "Semantic Context",
            description: "Our AI understands the nuances of your request, ensuring the content is always relevant.",
            icon: <MessageSquare className="w-8 h-8" />,
            color: "text-violet-500",
            bg: "bg-fuchsia-50/50"
        },
        {
            title: "Native Resonance",
            description: "Write emails in multiple languages with native-level fluency and cultural context.",
            icon: <Globe className="w-8 h-8" />,
            color: "text-violet-500",
            bg: "bg-indigo-50/50"
        },
        {
            title: "Sovereign Privacy",
            description: "Your data is encrypted and never used for training. Your privacy is our top priority.",
            icon: <ShieldCheck className="w-8 h-8" />,
            color: "text-violet-500",
            bg: "bg-violet-50/50"
        },
        {
            title: "Seamless Flow",
            description: "Copy and paste into any email client with perfectly formatted subject lines and signatures.",
            icon: <MousePointer2 className="w-8 h-8" />,
            color: "text-violet-500",
            bg: "bg-fuchsia-50/50"
        },
        {
            title: "Minimal UX",
            description: "A distraction-free interface designed to help you focus on your communication goals.",
            icon: <Layout className="w-8 h-8" />,
            color: "text-violet-500",
            bg: "bg-indigo-50/50"
        }
    ];

    return (
        <section id="features" className="py-40 bg-[#fbfaf8]">
            <div className="max-w-[1600px] mx-auto px-10 sm:px-12 lg:px-16">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-32">
                    <div className="max-w-3xl">
                        <div className="flex items-center justify-center lg:justify-start gap-4 mb-8">
                            <span className="w-12 h-[2px] bg-violet-400 rounded-full"></span>
                            <h2 className="text-[11px] font-black text-violet-500 tracking-[0.4em] uppercase">The Architecture</h2>
                        </div>
                        <h3 className="text-5xl md:text-6xl font-black text-[#2e2a27] text-center lg:text-left font-serif leading-tight">
                            Tools for the elite <br className="hidden md:block" />
                            modern professional.
                        </h3>
                    </div>
                    <p className="text-xl text-gray-400 max-w-sm text-center lg:text-left font-medium leading-relaxed">
                        Reclaim your most valuable asset: your time. Our ecosystem handles the rest.
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {features?.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.8 }}
                            className="bg-white p-12 rounded-[3.5rem] border border-gray-100/50 shadow-[0_5px_25px_rgba(0,0,0,0.02)] hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] transition-all duration-700 group ring-1 ring-black/[0.02] ring-offset-[12px] ring-offset-white cursor-default"
                        >
                            <div className={`w-16 h-16 rounded-[1.75rem] ${feature.bg} ${feature.color} flex items-center justify-center mb-10 group-hover:rotate-[360deg] transition-all duration-1000 shadow-inner`}>
                                {feature.icon}
                            </div>
                            <h4 className="text-2xl font-black text-[#2e2a27] mb-5 font-serif">{feature.title}</h4>
                            <p className="text-gray-400 leading-relaxed font-medium">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesGrid;
