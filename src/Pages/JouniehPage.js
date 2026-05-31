import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FavoriteButton from "../components/FavoriteButton";

function JouniehPage() {
  return (
    <div>
      <Navbar />

      <div className="container mt-5">
        <h1 className="text-center mb-4">Explore Jounieh</h1>
        
        <div className="text-center mb-4">
          <a href="#attractions" className="btn btn-outline-primary m-1">Attractions</a>
          <a href="#restaurants" className="btn btn-outline-success m-1">Restaurants</a>
          <a href="#cafes" className="btn btn-outline-warning m-1">Cafes</a>
          <a href="#hotels" className="btn btn-outline-danger m-1">Hotels</a>
        </div>

        <img src="images/jounieh1.jpeg" className="img-fluid mb-5 hero-img" alt="Jounieh Hero" />

        <p className="text-center">
          Jounieh is a coastal city famous for its nightlife, seaside resorts, and beautiful bay views. It is one of the most popular tourist destinations in Lebanon.
        </p>

        {/*Attractions */}
        <h2 id="attractions">Attractions</h2>
        <p>Discover the main attractions and scenic views and beautiful activities to do in Jounieh.</p>

        <div className="row">
          <div className="col-md-6">
            <div className="card mb-4">
             <FavoriteButton item={{ title: "Tour in Jeita Grotto.", image: "images/jeita.jpeg" }} />
              <img src="images/jeita.jpeg" className="img-fluid w-100 card-img" alt="Jeita Grotto" />
              <div className="card-body text-center">
                <h5>Tour in Jeita Grotto.</h5>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-4">
             <FavoriteButton item={{ title: "Teleferique Jounieh connects the city with Harissa and offers amazing views of the sea and mountains.", image: "images/teleferique.jpeg" }} />
              <img src="images/teleferique.jpeg" className="img-fluid w-100 card-img" alt="Teleferique Jounieh" />
              <div className="card-body text-center">
                <h5>Teleferique Jounieh connects the city with Harissa and offers amazing views of the sea and mountains.</h5>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-4">
             <FavoriteButton item={{ title: "Paragliding in Jounieh offers a stunning view of the city, mountains, and the Mediterranean Sea.", image: "images/Paragliding.jpeg" }} />
              <img src="images/Paragliding.jpeg" className="img-fluid w-100 card-img" alt="Paragliding" />
              <div className="card-body text-center">
                <h5>Paragliding in Jounieh offers a stunning view of the city, mountains, and the Mediterranean Sea.</h5>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-4">
            <FavoriteButton item={{ title: "Jet Ski is the fun and beautiful activity in water.", image: "images/jetski.jpeg" }} />
              <img src="images/jetski.jpeg" className="img-fluid w-100 card-img" alt="Jet Ski" />
              <div className="card-body text-center">
                <h5>Jet Ski is the fun and beautiful activity in water.</h5>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-4">
             <FavoriteButton item={{ title: "Boat rides in Jounieh let you enjoy the beautiful sea and views.", image: "images/boatride.jpeg" }} />
              <img src="images/boatride.jpeg" className="img-fluid w-100 card-img" alt="Boat Ride" />
              <div className="card-body text-center">
                <h5>Boat rides in Jounieh let you enjoy the beautiful sea and views.</h5>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-4">
             <FavoriteButton item={{ title: "Diving in Jounieh is an exciting activity to explore underwater life.", image: "images/diving.jpeg" }} />
              <img src="images/diving.jpeg" className="img-fluid w-100 card-img" alt="Diving" />
              <div className="card-body text-center">
                <h5>Diving in Jounieh is an exciting activity to explore underwater life.</h5>
              </div>
            </div>
          </div>
        </div>

        {/*Restaurants */}
        <h2 id="restaurants">Restaurants</h2>
        <p>Enjoy dining in restaurants overlooking the sea.</p>
        <div className="row">
          <div className="col-md-6">
            <div className="card mb-4">
             <FavoriteButton item={{ title: "Table Fine BEST FRENCH FOOD AND SEAFOOD DISHES.", image: "images/tablefine.jpeg" }} />
              <img src="images/tablefine.jpeg" className="img-fluid w-100 card-img" alt="Table Fine" />
              <div className="card-body text-center">
                <h5>Table Fine BEST FRENCH FOOD AND SEAFOOD DISHES.</h5>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-4">
             <FavoriteButton item={{ title: "Margherita Pizzeria Del Quartiere Dal 1959.", image: "images/margherita.jpeg" }} />
              <img src="images/margherita.jpeg" className="img-fluid w-100 card-img" alt="Margherita Pizzeria" />
              <div className="card-body text-center">
                <h5>Margherita Pizzeria Del Quartiere Dal 1959.</h5>
              </div>
            </div>
          </div>
        </div>

        {/* Cafes */}
        <h2 id="cafes">Cafes</h2>
        <p>Spend relaxing time in cafes with a lively atmosphere.</p>

        <div className="row">
          <div className="col-md-6">
            <div className="card mb-4">
             <FavoriteButton item={{ title: "Latte ART.", image: "images/latte.jpeg" }} />
              <img src="images/latte.jpeg" className="img-fluid w-100 card-img" alt="Latte Art" />
              <div className="card-body text-center">
                <h5>Latte ART.</h5>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-4">
             <FavoriteButton item={{ title: "Cafe du port.", image: "images/port.jpeg" }} />
              <img src="images/port.jpeg" className="img-fluid w-100 card-img" alt="Cafe du Port" />
              <div className="card-body text-center">
                <h5>Cafe du port.</h5>
              </div>
            </div>
          </div>
        </div>

        {/*Hotels */}
        <h2 id="hotels">Hotels</h2>
        <p>Find the best hotels for a comfortable and luxurious stay.</p>
        <div className="row">
          <div className="col-md-6">
            <div className="card mb-4">
             <FavoriteButton item={{ title: "Portaluna Hotel & Resort.", image: "images/portaluna.jpeg" }} />
              <img src="images/portaluna.jpeg" className="img-fluid w-100 card-img" alt="Portaluna Hotel" />
              <div className="card-body text-center">
                <h5>Portaluna Hotel & Resort.</h5>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-4">
             <FavoriteButton item={{ title: "Beautiful Gym in Portaluna Hotel.", image: "images/pgym.jpeg" }} />
              <img src="images/pgym.jpeg" className="img-fluid w-100 card-img" alt="Portaluna Gym" />
              <div className="card-body text-center">
                <h5>Beautiful Gym in Portaluna Hotel.</h5>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-4">
            <FavoriteButton item={{ title: "RESTON HOTEL.", image: "images/reston.jpeg" }} />
              <img src="images/reston.jpeg" className="img-fluid w-100 card-img" alt="Reston Hotel" />
              <div className="card-body text-center">
                <h5>RESTON HOTEL.</h5>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-4">
             <FavoriteButton item={{ title: "RESTON HOTEL POOL.", image: "images/reston1.jpeg" }} />
              <img src="images/reston1.jpeg" className="img-fluid w-100 card-img" alt="Reston Hotel Pool" />
              <div className="card-body text-center">
                <h5>RESTON HOTEL POOL.</h5>
              </div>
            </div>
          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
}

export default JouniehPage;