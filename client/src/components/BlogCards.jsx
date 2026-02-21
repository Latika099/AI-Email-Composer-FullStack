import { Link } from "react-router-dom";

const BlogCards = () => {
  const cards = [
    {
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop",
      title: "10 Email Writing Tips for Professionals",
      description: "Learn how to craft emails that get responses and build stronger professional relationships.",
      link: "#",
    },
    {
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      title: "AI in Business Communication",
      description: "Discover how artificial intelligence is transforming the way we communicate in the workplace.",
      link: "#",
    },
    {
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      title: "Productivity Hacks for Email Management",
      description: "Streamline your email workflow and save hours every week with these proven strategies.",
      link: "#",
    },
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#F1F8E9]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1B5E20] mb-4">
            Latest Insights
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Stay updated with tips, trends, and best practices in email communication
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {card.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {card.description}
                </p>
                <Link
                  to={card.link}
                  className="inline-block text-[#2E7D32] font-semibold hover:text-green-700 transition-colors"
                >
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogCards;

