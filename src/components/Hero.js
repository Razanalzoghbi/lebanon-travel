import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

function Hero() {
  return (
    <div className="hero-section">
      <div className="hero-content">
        <h1>Welcome To Lebanon</h1>

        <p>Explore nature, food, and culture</p>

        <div className="px-3 mb-3">
          <SearchBar variant="hero" />
        </div>

        <Link to="/destinations" className="view-btn text-decoration-none">
          View Destinations
        </Link>
      </div>
    </div>
  );
}

export default Hero;