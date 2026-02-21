import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import EditorialFeatureBlock from "../components/EditorialFeatureBlock";
import ImageBanner from "../components/ImageBanner";
import MinimalCTA from "../components/MinimalCTA";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="min-h-screen bg-[#EEF3F5]">
      <Navbar />
      <Hero />
      <EditorialFeatureBlock />
      <ImageBanner />
      <MinimalCTA />
      <Footer />
    </div>
  );
};

export default Home;
