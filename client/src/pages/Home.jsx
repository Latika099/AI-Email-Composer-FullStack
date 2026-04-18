import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import FeaturesGrid from "../components/FeaturesGrid";
import MinimalCTA from "../components/MinimalCTA";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="min-h-screen bg-[#f6f3ee] selection:bg-violet-100 selection:text-violet-900">
      <Navbar />
      <main className="transition-all duration-700">
        <Hero />
        <FeaturesGrid />
        <HowItWorks />
        <MinimalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
