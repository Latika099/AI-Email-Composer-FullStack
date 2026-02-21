import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-[#2E7D32] rounded-2xl p-12 md:p-16 text-center shadow-md">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Email Communication?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who are already using AI Email Composer to write better emails faster.
          </p>
          <Link
            to="/register"
            className="inline-block bg-[#FBC02D] text-black px-10 py-4 rounded-xl font-semibold text-lg hover:bg-yellow-500 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Get Started Free
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTA;

