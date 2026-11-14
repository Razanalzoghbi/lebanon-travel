import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import HomeStats from "../components/HomeStats";
import RegionCards from "../components/RegionCards";
import TopRated from "../components/TopRated";
import ThingsToDo from "../components/ThingsToDo";
import LatestExperiences from "../components/LatestExperiences";
import ShareCTA from "../components/ShareCTA";
import Footer from "../components/Footer";

function HomePage() {
  return (
    <div>
      <Navbar />

      <Hero />

      <HomeStats />

      <RegionCards />

      <TopRated />

      <ThingsToDo />

      <LatestExperiences />

      <ShareCTA />

      <Footer />
    </div>
  );
}

export default HomePage;