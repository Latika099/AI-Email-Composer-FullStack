import { Link } from "react-router-dom";

const ImageBanner = () => {
  return (
    <section className="relative h-[500px] px-4 sm:px-6 lg:px-8">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&h=800&fit=crop')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
        
        {/* Content */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center max-w-4xl mx-auto px-8">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Ready to Transform Your Email Workflow?
            </h2>
            <Link
              to="/register"
              className="inline-block bg-[#1F2A37] text-white rounded-full px-8 py-4 font-semibold text-lg hover:opacity-90 transition-all duration-200"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageBanner;

