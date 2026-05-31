import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FavoriteButton from "../components/FavoriteButton";

function TripoliPage() {
  return (
    <div>
      <Navbar />

      <div className="container mt-5">
        <h1 className="text-center mb-4">Explore Tripoli</h1>
        
        <div className="text-center mb-4">
          <a href="#attractions" className="btn btn-outline-primary m-1">Attractions</a>
          <a href="#restaurants" className="btn btn-outline-success m-1">Restaurants</a>
          <a href="#cafes" className="btn btn-outline-warning m-1">Cafes</a>
          <a href="#hotels" className="btn btn-outline-danger m-1">Hotels</a>
        </div>

        <img src="images/tripoli.jpeg" className="img-fluid mb-5 hero-img" alt="Tripoli Hero" />

        <p className="text-center">
          Tripoli is a historic city in North Lebanon, known for its rich heritage, old markets, and traditional architecture.
        </p>

        {/*Attractions */}
        <h2 id="attractions">Attractions</h2>
        <p>Discover historical sites and cultural landmarks.</p>

        <div className="row">
          <div className="col-md-6">
            <div className="card mb-4">
             <FavoriteButton item={{ title: "AL Mina.", image: "images/minasaida.jpeg" }} />
              <img src="images/minasaida.jpeg" className="img-fluid w-100 card-img" alt="Al Mina" />
              <div className="card-body text-center">
                <h5>AL Mina.</h5>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-4">
             <FavoriteButton item={{ title: "Palm Islands (Rabbit Island).", image: "images/palm.jpeg" }} />
              <img src="images/palm.jpeg" className="img-fluid w-100 card-img" alt="Palm Islands" />
              <div className="card-body text-center">
                <h5>Palm Islands (Rabbit Island).</h5>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-4">
             <FavoriteButton item={{ title: "Tripoli Citadel.", image: "images/citadle.jpeg" }} />
              <img src="images/citadle.jpeg" className="img-fluid w-100 card-img" alt="Tripoli Citadel" />
              <div className="card-body text-center">
                <h5>Tripoli Citadel.</h5>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-4">
             <FavoriteButton item={{ title: "Historical Train Station.", image: "images/train.jpeg" }} />
              <img src="images/train.jpeg" className="img-fluid w-100 card-img" alt="Historical Train Station" />
              <div className="card-body text-center">
                <h5>Historical Train Station.</h5>
              </div>
            </div>
          </div>
        </div>

        {/*Restaurants */}
        <h2 id="restaurants">Restaurants</h2>
        <p>Enjoy authentic Lebanese food in local restaurants.</p>

        <div className="row">
          <div className="col-md-6">
            <div className="card mb-4">
             <FavoriteButton item={{ title: "LA PLAKA.", image: "images/plaka.jpeg" }} />
              <img src="images/plaka.jpeg" className="img-fluid w-100 card-img" alt="La Plaka" />
              <div className="card-body text-center">
                <h5>LA PLAKA.</h5>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-4">
           <FavoriteButton item={{ title: "Celina restaurant Tripoli.", image: "images/celina.jpeg" }} />
              <img src="images/celina.jpeg" className="img-fluid w-100 card-img" alt="Celina Restaurant" />
              <div className="card-body text-center">
                <h5>Celina restaurant Tripoli.</h5>
              </div>
            </div>
          </div>
        </div>

        {/* Cafes */}
        <h2 id="cafes">Cafes</h2>
        <p>Visit traditional cafes with a unique atmosphere.</p>

        <div className="row">
          <div className="col-md-6">
            <div className="card mb-4">
            <FavoriteButton item={{ title: "11:11 coffee shop.", image: "images/coffe11.jpeg" }} />
              <img src="images/coffe11.jpeg" className="img-fluid w-100 card-img" alt="11:11 Coffee" />
              <div className="card-body text-center">
                <h5>11:11 coffee shop.</h5>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-4">
             <FavoriteButton item={{ title: "Vienna 1683 Coffeehouse.", image: "images/vienna.jpeg" }} />
              <img src="images/vienna.jpeg" className="img-fluid w-100 card-img" alt="Vienna Coffeehouse" />
              <div className="card-body text-center">
                <h5>Vienna 1683 Coffeehouse.</h5>
              </div>
            </div>
          </div>
        </div>

        {/*Hotels */}
        <h2 id="hotels">Hotels</h2>
        <p>Stay in simple and comfortable hotels.</p>
        
        <div className="row">
          <div className="col-md-6">
            <div className="card mb-4">
             <FavoriteButton item={{ title: "VIA MINA.", image: "images/viamina.jpeg" }} />
              <img src="images/viamina.jpeg" className="img-fluid w-100 card-img" alt="Via Mina Hotel" />
              <div className="card-body text-center">
                <h5>VIA MINA.</h5>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-4">
             <FavoriteButton item={{ title: "Inside VIA MINA.", image: "images/viamina1.jpeg" }} />
              <img src="images/viamina1.jpeg" className="img-fluid w-100 card-img" alt="Inside Via Mina" />
              <div className="card-body text-center">
                <h5>Inside VIA MINA.</h5>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-4">
            <FavoriteButton item={{ title: "Victoria boutique hotel.", image: "images/victoria.jpeg" }} />
              <img src="images/victoria.jpeg" className="img-fluid w-100 card-img" alt="Victoria Hotel" />
              <div className="card-body text-center">
                <h5>Victoria boutique hotel.</h5>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-4">
             <FavoriteButton item={{ title: "Inside Victoria boutique hotel.", image: "images/victoria1.jpeg" }} />
              <img src="images/victoria1.jpeg" className="img-fluid w-100 card-img" alt="Inside Victoria Hotel" />
              <div className="card-body text-center">
                <h5>Inside Victoria boutique hotel.</h5>
              </div>
            </div>
          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
}

export default TripoliPage;