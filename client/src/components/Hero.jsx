import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8 bg-[#EEF3F5]">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-6xl md:text-7xl font-bold text-[#1F2A37] mb-8 leading-tight">
              Write Powerful Emails in Seconds with AI
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed">
              Transform your email communication with intelligent AI that crafts professional, personalized messages tailored to your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/register"
                className="bg-[#1F2A37] text-white rounded-full px-6 py-3 font-semibold text-lg hover:opacity-90 transition-all duration-200 inline-block text-center"
              >
                Get Started
              </Link>
              <a
                href="#features"
                className="border border-[#1F2A37] text-[#1F2A37] rounded-full px-6 py-3 font-semibold text-lg hover:opacity-90 transition-all duration-200 inline-block text-center"
              >
                Learn More
              </a>
            </div>
          </div>

          {/* Right Premium Image */}
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=800&fit=crop"
              alt="Premium workspace with modern office setup"
              className="w-full h-auto rounded-3xl shadow-xl object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
