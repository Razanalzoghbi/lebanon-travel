import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FavoriteButton from "../components/FavoriteButton";

function ByblosPage() {
  return (
    <div>
      <Navbar />

      <div className="container mt-5">
        <h1 className="text-center mb-4">Explore Byblos</h1>
        
        <div className="text-center mb-4">
          <a href="#attractions" className="btn btn-outline-primary m-1">Attractions</a>
          <a href="#restaurants" className="btn btn-outline-success m-1">Restaurants</a>
          <a href="#cafes" className="btn btn-outline-warning m-1">Cafes</a>
          <a href="#hotels" className="btn btn-outline-danger m-1">Hotels</a>
        </div>

        <img src="images/byblos.jpeg" className="img-fluid mb-5 hero-img" alt="Byblos Hero" />

        <p className="text-center">
          Byblos is one of the oldest cities in the world, known for its historical sites, ancient ruins, and charming old souks.
        </p>

        {/*Attractions */}
        <h2 id="attractions">Attractions</h2>
        <p>Explore historical landmarks and ancient ruins.</p>

        <div className="row">

          <div className="col-md-6">
            <div className="card mb-4">
               <FavoriteButton item={{ title: "Al Mina-Jbeil.", image: "images/mina.jpeg" }} />
              <img src="images/mina.jpeg" className="img-fluid w-100 card-img" alt="Mina-Jbeil" />
              <div className="card-body text-center">
                <h5>Al Mina-Jbeil.</h5>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-4">
              <FavoriteButton item={{ title: "Byblos Old Souk.", image: "images/souk.jpeg" }} />
              <img src="images/souk.jpeg" className="img-fluid w-100 card-img" alt="Byblos Old Souk" />
              <div className="card-body text-center">
                <h5>Byblos Old Souk.</h5>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-4">
               <FavoriteButton item={{ title: "Byblos Castle.", image: "images/castle.jpeg" }} />
              <img src="images/castle.jpeg" className="img-fluid w-100 card-img" alt="Byblos Castle" />
              <div className="card-body text-center">
                <h5>Byblos Castle.</h5>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-4">
              <FavoriteButton item={{ title: "Al Bahsa Beach in Byblos.", image: "images/bahsa.jpeg" }} />
              <img src="images/bahsa.jpeg" className="img-fluid w-100 card-img" alt="Al Bahsa Beach" />
              <div className="card-body text-center">
                <h5>Al Bahsa Beach in Byblos.</h5>
              </div>
            </div>
          </div>
        </div>

        {/*Restaurants */}
        <h2 id="restaurants">Restaurants</h2>
        <p>Enjoy traditional and modern restaurants.</p>
        <div className="row">
          <div className="col-md-6">
            <div className="card mb-4">
               <FavoriteButton item={{ title: "Ayla By Ayloul.", image: "images/ayla.jpeg" }} />
              <img src="images/ayla.jpeg" className="img-fluid w-100 card-img" alt="Ayla By Ayloul" />
              <div className="card-body text-center">
                <h5>Ayla By Ayloul.</h5>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-4">
               <FavoriteButton item={{ title: "Burger Society.", image: "images/burger.jpeg" }} />
              <img src="images/burger.jpeg" className="img-fluid w-100 card-img" alt="Burger Society" />
              <div className="card-body text-center">
                <h5>Burger Society.</h5>
              </div>
            </div>
          </div>
        </div>

        {/*Cafes */}
        <h2 id="cafes">Cafes</h2>
        <p>Spend relaxing time in cafes with a lively atmosphere.</p>

        <div className="row">
          <div className="col-md-6">
            <div className="card mb-4">
               <FavoriteButton item={{ title: "é Caffé Edd and yard.", image: "images/edd.jpeg" }} />
              <img src="images/edd.jpeg" className="img-fluid w-100 card-img" alt="é Caffé" />
              <div className="card-body text-center">
                <h5>é Caffé Edd and yard.</h5>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-4">
              <FavoriteButton item={{ title: "Croissant Bar.", image: "images/bar.jpeg" }} />
              <img src="images/bar.jpeg" className="img-fluid w-100 card-img" alt="Croissant Bar" />
              <div className="card-body text-center">
                <h5>Croissant Bar.</h5>
              </div>
            </div>
          </div>
        </div>

        {/*Hotels */}
        <h2 id="hotels">Hotels</h2>
        <p>Stay in cozy and authentic hotels.</p>
        <div className="row">
          <div className="col-md-6">
            <div className="card mb-4">
               <FavoriteButton item={{ title: "Byblos Comfort Hotel.", image: "images/comfort.jpeg" }} />
              <img src="images/comfort.jpeg" className="img-fluid w-100 card-img" alt="Byblos Comfort Hotel" />
              <div className="card-body text-center">
                <h5>Byblos Comfort Hotel.</h5>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-4">
               <FavoriteButton item={{ title: "Inside Byblos Comfort Hotel.", image: "images/comfort1.jpeg" }} />
              <img src="images/comfort1.jpeg" className="img-fluid w-100 card-img" alt="Inside Byblos Comfort Hotel" />
              <div className="card-body text-center">
                <h5>Inside Byblos Comfort Hotel.</h5>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-4">
               <FavoriteButton item={{ title: "Ahiram Hotel.", image: "images/ahiram.jpeg" }} />
              <img src="images/ahiram.jpeg" className="img-fluid w-100 card-img" alt="Ahiram Hotel" />
              <div className="card-body text-center">
                <h5>Ahiram Hotel.</h5>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-4">
              <FavoriteButton item={{ title: "Inside Ahiram Hotel.", image: "images/ahiram1.jpeg" }} />
              <img src="images/ahiram1.jpeg" className="img-fluid w-100 card-img" alt="Inside Ahiram Hotel" />
              <div className="card-body text-center">
                <h5>Inside Ahiram Hotel.</h5>
              </div>
            </div>
          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
}

export default ByblosPage;