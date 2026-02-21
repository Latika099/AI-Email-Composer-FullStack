import { Link } from "react-router-dom";

const MinimalCTA = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-5xl md:text-6xl font-bold text-[#1F2A37] mb-6">
          Start Creating Better Emails Today
        </h2>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Join thousands of professionals who are already saving time and improving their communication.
        </p>
        <Link
          to="/register"
          className="inline-block bg-[#1F2A37] text-white rounded-full px-8 py-4 font-semibold text-lg hover:opacity-90 transition-all duration-200"
        >
          Get Started Free
        </Link>
      </div>
    </section>
  );
};

export default MinimalCTA;

