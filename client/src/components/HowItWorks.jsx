import { motion } from "framer-motion";
import { Settings, PenTool, Send, CheckCircle2 } from "lucide-react";

const HowItWorks = () => {
    const steps = [
        {
            title: "Set Your Context",
            description: "Tell us who you're writing to and the core purpose of your message. Add keywords to guide the AI.",
            icon: <Settings className="w-7 h-7" />,
            color: "bg-blue-50 text-blue-600",
        },
        {
            title: "Choose the Tone",
            description: "Pick from professional, friendly, or assertive tones. Our AI adapts its language to match your intent.",
            icon: <PenTool className="w-7 h-7" />,
            color: "bg-indigo-50 text-indigo-600",
        },
        {
            title: "Review & Send",
            description: "Get a polished draft in seconds. Edit if needed, then copy or send directly via your preferred email client.",
            icon: <Send className="w-7 h-7" />,
            color: "bg-purple-50 text-purple-600",
        },
    ];

    return (
        <section id="how-it-works" className="py-24 bg-white relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h2 className="text-base font-bold text-indigo-600 tracking-wider uppercase mb-3">Workflow</h2>
                    <h3 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
                        Everything you need for perfect communication
                    </h3>
                    <p className="text-lg text-gray-500">
                        Stop staring at a blank screen. Our simple 3-step process turns your ideas into
                        world-class emails instantly.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-12">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="relative group p-8 rounded-3xl border border-gray-100 hover:border-indigo-100 hover:shadow-2xl hover:shadow-indigo-50 transition-all duration-500"
                        >
                            <div className={`w-14 h-14 rounded-2xl ${step.color} flex items-center justify-center mb-8 transform group-hover:scale-110 transition-transform duration-300`}>
                                {step.icon}
                            </div>
                            <h4 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h4>
                            <p className="text-gray-500 leading-relaxed mb-6">
                                {step.description}
                            </p>
                            <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm">
                                <CheckCircle2 className="w-4 h-4" />
                                Step {index + 1} Complete
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
