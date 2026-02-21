const EditorialFeatureBlock = () => {
  return (
    <>
      {/* First Feature: Image Left, Text Right */}
      <section className="py-28 px-4 sm:px-6 lg:px-8 bg-[#EEF3F5]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image Left */}
            <div>
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1000&h=700&fit=crop"
                alt="Modern office interior with natural lighting"
                className="w-full h-auto rounded-3xl shadow-lg object-cover"
              />
            </div>

            {/* Text Right */}
            <div>
              <h2 className="text-5xl md:text-6xl font-bold text-[#1F2A37] mb-6 leading-tight">
                Work Smarter, Not Harder
              </h2>
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                Our AI-powered email composer understands context, tone, and intent. 
                Create professional emails that get results in minutes, not hours.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Whether you're crafting a business proposal, following up with clients, 
                or sending personalized messages, our intelligent system adapts to your needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Second Feature: Text Left, Image Right */}
      <section className="py-28 px-4 sm:px-6 lg:px-8 bg-[#E3EBEE]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Text Left */}
            <div className="order-2 lg:order-1">
              <h2 className="text-5xl md:text-6xl font-bold text-[#1F2A37] mb-6 leading-tight">
                Professional Communication Made Simple
              </h2>
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                Save time while maintaining the highest standards of professional communication. 
                Our AI learns your style and preferences to deliver consistent, high-quality results.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                From formal business correspondence to friendly client updates, 
                generate the perfect tone for every situation with just a few clicks.
              </p>
            </div>

            {/* Image Right */}
            <div className="order-1 lg:order-2">
              <img
                src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1000&h=700&fit=crop"
                alt="Elegant workspace with laptop and plants"
                className="w-full h-auto rounded-3xl shadow-lg object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EditorialFeatureBlock;

