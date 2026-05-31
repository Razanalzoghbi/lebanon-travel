import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FavoriteButton from "../components/FavoriteButton";

function SaidaPage() {
  return (
    <div>
      <Navbar />

      <div className="container mt-5">
        <h1 className="text-center mb-4">Explore Saida</h1>
        
        <div className="text-center mb-4">
          <a href="#attractions" className="btn btn-outline-primary m-1">Attractions</a>
          <a href="#restaurants" className="btn btn-outline-success m-1">Restaurants</a>
          <a href="#cafes" className="btn btn-outline-warning m-1">Cafes</a>
          <a href="#hotels" className="btn btn-outline-danger m-1">Hotels</a>
        </div>

        <img src="images/saida.jpeg" className="img-fluid mb-5 hero-img" alt="Saida Hero" />

        <p className="text-center">
          Saida is a historic coastal city known for its sea castle, old souks, and traditional culture.
        </p>

        {/*Attractions */}
        <h2 id="attractions">Attractions</h2>
        <p>Visit famous landmarks and historical sites.</p>

        <div className="row">
          <div className="col-md-6">
            <div className="card mb-4">
             <FavoriteButton item={{ title: "Khan El Franj.", image: "images/khan.jpeg" }} />
              <img src="images/khan.jpeg" className="img-fluid w-100 card-img" alt="Khan El Franj" />
              <div className="card-body text-center">
                <h5>Khan El Franj.</h5>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-4">
             <FavoriteButton item={{ title: "Sidon souk.", image: "images/sidonsouk.jpeg" }} />
              <img src="images/sidonsouk.jpeg" className="img-fluid w-100 card-img" alt="Sidon Souk" />
              <div className="card-body text-center">
                <h5>Sidon souk.</h5>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-4">
             <FavoriteButton item={{ title: "Saida Castle.", image: "images/saidacastle.jpeg" }} />
              <img src="images/saidacastle.jpeg" className="img-fluid w-100 card-img" alt="Saida Sea Castle" />
              <div className="card-body text-center">
                <h5>Saida Castle.</h5>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-4">
             <FavoriteButton item={{ title: "Saida Beach and Saida International Stadium.", image: "images/beachsidon.jpeg" }} />
              <img src="images/beachsidon.jpeg" className="img-fluid w-100 card-img" alt="Saida Beach and Stadium" />
              <div className="card-body text-center">
                <h5>Saida Beach and Saida International Stadium.</h5>
              </div>
            </div>
          </div>
        </div>

        {/*Restaurants */}
        <h2 id="restaurants">Restaurants</h2>
        <p>Enjoy delicious traditional food.</p>
        <div className="row">
          <div className="col-md-6">
            <div className="card mb-4">
            <FavoriteButton item={{ title: "Saida Rest House Restaurant.", image: "images/resthouse.jpeg" }} />
              <img src="images/resthouse.jpeg" className="img-fluid w-100 card-img" alt="Saida Rest House" />
              <div className="card-body text-center">
                <h5>Saida Rest House Restaurant.</h5>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-4">
             <FavoriteButton item={{ title: "Beit Al Samak.", image: "images/samak.jpeg" }} />
              <img src="images/samak.jpeg" className="img-fluid w-100 card-img" alt="Beit Al Samak" />
              <div className="card-body text-center">
                <h5>Beit Al Samak.</h5>
              </div>
            </div>
          </div>
        </div>

        {/*Cafes */}
        <h2 id="cafes">Cafes</h2>
        <p>Relax in Beautiful local cafes.</p>

        <div className="row">
          <div className="col-md-6">
            <div className="card mb-4">
            <FavoriteButton item={{ title: "Kahwet 60.", image: "images/k60.jpeg" }} />
              <img src="images/k60.jpeg" className="img-fluid w-100 card-img" alt="Kahwet 60" />
              <div className="card-body text-center">
                <h5>Kahwet 60.</h5>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-4">
             <FavoriteButton item={{ title: "Drop.", image: "images/drop.jpeg" }} />
              <img src="images/drop.jpeg" className="img-fluid w-100 card-img" alt="Drop Cafe" />
              <div className="card-body text-center">
                <h5>Drop.</h5>
              </div>
            </div>
          </div>
        </div>

        {/* Hotels */}
        <h2 id="hotels">Hotels</h2>
        <p>Stay in comfortable hotels near the sea.</p>
        <div className="row">
          <div className="col-md-6">
            <div className="card mb-4">
             <FavoriteButton item={{ title: "Laguava Resort.", image: "images/laguava.jpeg" }} />
              <img src="images/laguava.jpeg" className="img-fluid w-100 card-img" alt="Laguava Resort" />
              <div className="card-body text-center">
                <h5>Laguava Resort.</h5>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-4">
             <FavoriteButton item={{ title: "Inside Laguava Resort.", image: "images/laguava1.jpeg" }} />
              <img src="images/laguava1.jpeg" className="img-fluid w-100 card-img" alt="Inside Laguava Resort" />
              <div className="card-body text-center">
                <h5>Inside Laguava Resort.</h5>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-4">
            <FavoriteButton item={{ title: "Rmeileh Resort.", image: "images/remelieh.jpeg" }} />
              <img src="images/remelieh.jpeg" className="img-fluid w-100 card-img" alt="Rmeileh Resort" />
              <div className="card-body text-center">
                <h5>Rmeileh Resort.</h5>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-4">
            <FavoriteButton item={{ title: "Inside Rmeileh Resort.", image: "images/remelieh1.jpeg" }} />
              <img src="images/remelieh1.jpeg" className="img-fluid w-100 card-img" alt="Inside Rmeileh Resort" />
              <div className="card-body text-center">
                <h5>Inside Rmeileh Resort.</h5>
              </div>
            </div>
          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
}

export default SaidaPage;