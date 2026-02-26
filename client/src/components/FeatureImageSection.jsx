const FeatureImageSection = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#F1F8E9]">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Left */}
          <div className="order-2 lg:order-1">
            {/* main(1) */}
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
              alt="AI workspace with laptop and desk"
              className="w-full h-auto rounded-2xl shadow-lg object-cover"
            />
          </div>

          {/* Text Right */}
          <div className="order-1 lg:order-2 bg-white rounded-2xl shadow-lg p-8 md:p-10">
            <h2 className="text-4xl md:text-5xl font-bold text-[#1B5E20] mb-6">
              Work Smarter, Not Harder
            </h2>
            <p className="text-xl text-gray-600 mb-6 leading-relaxed">
              Our AI-powered email composer understands context, tone, and intent.
              Create professional emails that get results in minutes, not hours.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Whether you're crafting a business proposal, following up with clients,
              or sending personalized messages, our intelligent system adapts to your needs.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start">
                <svg className="w-6 h-6 text-[#2E7D32] mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Context-aware email generation</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-[#2E7D32] mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Multiple tone options for every situation</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-[#2E7D32] mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Save and manage your email library</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureImageSection;

