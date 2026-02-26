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
            title: "Instant Generation",
            description: "Generate high-quality email drafts in less than a second using world-class AI models.",
            icon: <Zap className="w-6 h-6" />,
            color: "text-yellow-600",
            bg: "bg-yellow-50"
        },
        {
            title: "Context Awareness",
            description: "Our AI understands the nuances of your request, ensuring the content is always relevant.",
            icon: <MessageSquare className="w-6 h-6" />,
            color: "text-blue-600",
            bg: "bg-blue-50"
        },
        {
            title: "Global Support",
            description: "Write emails in multiple languages with native-level fluency and cultural context.",
            icon: <Globe className="w-6 h-6" />,
            color: "text-green-600",
            bg: "bg-green-50"
        },
        {
            title: "Privacy First",
            description: "Your data is encrypted and never used for training. Your privacy is our top priority.",
            icon: <ShieldCheck className="w-6 h-6" />,
            color: "text-purple-600",
            bg: "bg-purple-50"
        },
        {
            title: "Direct Integration",
            description: "Copy and paste into any email client with perfectly formatted subject lines and signatures.",
            icon: <MousePointer2 className="w-6 h-6" />,
            color: "text-red-600",
            bg: "bg-red-50"
        },
        {
            title: "Clean Experience",
            description: "A distraction-free interface designed to help you focus on your communication goals.",
            icon: <Layout className="w-6 h-6" />,
            color: "text-indigo-600",
            bg: "bg-indigo-50"
        }
    ];

    return (
        <section id="features" className="py-24 bg-gray-50/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
                    <div className="max-w-2xl">
                        <h2 className="text-base font-bold text-indigo-600 tracking-wider uppercase mb-3 text-center md:text-left">Features</h2>
                        <h3 className="text-4xl md:text-5xl font-extrabold text-gray-900 text-center md:text-left">
                            Powerful tools for the modern professional
                        </h3>
                    </div>
                    <p className="text-lg text-gray-500 max-w-sm text-center md:text-left">
                        Everything you need to master your inbox and reclaim your productive time.
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group"
                        >
                            <div className={`w-12 h-12 rounded-xl ${feature.bg} ${feature.color} flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform`}>
                                {feature.icon}
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h4>
                            <p className="text-gray-500 leading-relaxed text-sm">
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
