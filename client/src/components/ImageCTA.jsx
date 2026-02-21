import { Link } from "react-router-dom";

const ImageCTA = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#2E7D32] to-[#1B5E20] text-white">
      <div
        className="relative bg-cover bg-center bg-no-repeat rounded-2xl overflow-hidden shadow-lg"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=600&fit=crop')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-[#1B5E20]/80"></div>
        
        {/* Content */}
        <div className="relative z-10 py-20 px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Email Workflow?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who are already saving time and improving their communication with AI Email Composer.
          </p>
          <Link
            to="/register"
            className="inline-block bg-[#2E7D32] text-white px-10 py-4 rounded-xl font-semibold text-lg hover:bg-green-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Get Started Free
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ImageCTA;

