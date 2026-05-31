import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FavoriteButton from "../components/FavoriteButton";

function FarayaPage() {
  return (
    <div>

      <Navbar />

      <div className="container mt-5">
        <h1 className="text-center mb-4">Explore Faraya</h1>
        
        <div className="text-center mb-4">
          <a href="#attractions" className="btn btn-outline-primary m-1">Attractions</a>
          <a href="#restaurants" className="btn btn-outline-success m-1">Restaurants</a>
          <a href="#cafes" className="btn btn-outline-warning m-1">Cafes</a>
          <a href="#hotels" className="btn btn-outline-danger m-1">Hotels</a>
        </div>

        <img src="images/faraya.jpeg" className="img-fluid mb-5 hero-img" alt="Faraya Hero" />

        <p className="text-center">
          Faraya is a famous mountain destination known for its ski resorts and winter activities. It is perfect for adventure and nature lovers.
        </p>

        {/* Attractions */}
        <h2 id="attractions">Attractions</h2>
        <p>Enjoy skiing, mountain activities and beautiful views.</p>

        <div className="row">
          <div className="col-md-6">
            <div className="card mb-4">
            <FavoriteButton item={{ title: "Chabrouh Dam.", image: "images/chabrouh.jpeg" }} />
             <img src="images/chabrouh.jpeg" className="img-fluid w-100 card-img" alt="Chabrouh Dam" />
              <div className="card-body text-center">
                <h5>Chabrouh Dam.</h5>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-4">
             <FavoriteButton item={{ title: ">Hiking in summer.", image: "images/hiking.jpeg" }} />
              <img src="images/hiking.jpeg" className="img-fluid w-100 card-img" alt="Hiking in Summer" />
              <div className="card-body text-center">
                <h5>Hiking in summer.</h5>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-4">
            <FavoriteButton item={{ title: "Mzaar Ski Resort.", image: "images/mzaar.jpeg" }} />
              <img src="images/mzaar.jpeg" className="img-fluid w-100 card-img" alt="Mzaar Ski Resort" />
              <div className="card-body text-center">
                <h5>Mzaar Ski Resort.</h5>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-4">
            <FavoriteButton item={{ title: "Skiing.", image: "images/ski.jpeg" }} />
              <img src="images/ski.jpeg" className="img-fluid w-100 card-img" alt="Skiing" />
              <div className="card-body text-center">
                <h5>Skiing.</h5>
              </div>
            </div>
          </div>
        </div>

        {/* Restaurants */}
        <h2 id="restaurants">Restaurants</h2>
        <p>Visit cozy mountain restaurants.</p>
        <div className="row">
          <div className="col-md-6">
            <div className="card mb-4">
             <FavoriteButton item={{ title: "Jalset Al Erzal.", image: "images/jalset.jpeg" }} />
              <img src="images/jalset.jpeg" className="img-fluid w-100 card-img" alt="Jalset Al Erzal" />
              <div className="card-body text-center">
                <h5>Jalset Al Erzal.</h5>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-4">
            <FavoriteButton item={{ title: "Le Montagnou kfardebian.", image: "images/montagnou.jpeg" }} />
              <img src="images/montagnou.jpeg" className="img-fluid w-100 card-img" alt="Le Montagnou" />
              <div className="card-body text-center">
                <h5>Le Montagnou kfardebian.</h5>
              </div>
            </div>
          </div>
        </div>

        {/* Cafes */}
        <h2 id="cafes">Cafes</h2>
        <p>Relax in warm cafes.</p>

        <div className="row">
          <div className="col-md-6">
            <div className="card mb-4">
             <FavoriteButton item={{ title: "Rustic café & bar.", image: "images/rustic.jpeg" }} />
              <img src="images/rustic.jpeg" className="img-fluid w-100 card-img" alt="Rustic Cafe" />
              <div className="card-body text-center">
                <h5>Rustic café & bar.</h5>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-4">
             <FavoriteButton item={{ title: "Panorama Cafe.", image: "images/panorama.jpeg" }} />
              <img src="images/panorama.jpeg" className="img-fluid w-100 card-img" alt="Panorama Cafe" />
              <div className="card-body text-center">
                <h5>Panorama Cafe.</h5>
              </div>
            </div>
          </div>
        </div>

        {/* Hotels */}
        <h2 id="hotels">Hotels</h2>
        <p>Stay in beautiful mountain hotels.</p>
        
        <div className="row">
          <div className="col-md-6">
            <div className="card mb-4">
            <FavoriteButton item={{ title: "Chalet Guide.", image: "images/chalet.jpeg" }} />
              <img src="images/chalet.jpeg" className="img-fluid w-100 card-img" alt="Chalet Guide" />
              <div className="card-body text-center">
                <h5>Chalet Guide.</h5>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-4">
             <FavoriteButton item={{ title: "Inside Chalet Guide.", image: "images/chalet1.jpeg" }} />
              <img src="images/chalet1.jpeg" className="img-fluid w-100 card-img" alt="Inside Chalet Guide" />
              <div className="card-body text-center">
                <h5>Inside Chalet Guide.</h5>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-4">
             <FavoriteButton item={{ title: "Auberge Le Valais Hotel and Restaurant.", image: "images/auberge.jpeg" }} />
              <img src="images/auberge.jpeg" className="img-fluid w-100 card-img" alt="Auberge Le Valais" />
              <div className="card-body text-center">
                <h5>Auberge Le Valais Hotel and Restaurant.</h5>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-4">
             <FavoriteButton item={{ title: "Inside Auberge Le Valais Hotel and Restaurant.", image: "images/auberge1.jpeg" }} />
              <img src="images/auberge1.jpeg" className="img-fluid w-100 card-img" alt="Inside Auberge Le Valais" />
              <div className="card-body text-center">
                <h5>Inside Auberge Le Valais Hotel and Restaurant.</h5>
              </div>
            </div>
          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
}

export default FarayaPage;