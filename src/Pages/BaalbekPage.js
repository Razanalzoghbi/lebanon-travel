import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FavoriteButton from "../components/FavoriteButton";
import React from "react";

function BaalbekPage() {
  return (
    <div>
      <Navbar />

      <div className="container mt-5">
        <h1 className="text-center mb-4">Explore Baalbek</h1>
        
        <div className="text-center mb-4">
          <a href="#attractions" className="btn btn-outline-primary m-1">Attractions</a>
          <a href="#restaurants" className="btn btn-outline-success m-1">Restaurants</a>
          <a href="#cafes" className="btn btn-outline-warning m-1">Cafes</a>
          <a href="#hotels" className="btn btn-outline-danger m-1">Hotels</a>
        </div>

        <img src="images/baalbek.jpeg" className="img-fluid mb-5 hero-img" alt="Baalbek Hero" />

        <p className="text-center">
          Baalbek is famous for its massive Roman temples and historical importance. It is one of the most iconic landmarks in Lebanon.
        </p>

        {/* Attractions */}
        <h2 id="attractions">Attractions</h2>
        <p>Discover ancient temples and ruins.</p>

        <div className="row">
          <div className="col-md-6">
            <div className="card mb-4">
             <FavoriteButton item={{ title: "Temple of Jupiter Tours.", image: "images/jupiter.jpeg" }} />
            <img src="images/jupiter.jpeg" className="img-fluid w-100 card-img" alt="Temple of Jupiter" />
              <div className="card-body text-center">
                <h5>Temple of Jupiter Tours.</h5>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-4">
            <FavoriteButton item={{ title: "Baalbek Roman Temples.", image: "images/roman.jpeg" }} />
              <img src="images/roman.jpeg" className="img-fluid w-100 card-img" alt="Roman Temples" />
              <div className="card-body text-center">
                <h5>Baalbek Roman Temples.</h5>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-4">
             <FavoriteButton item={{ title: "Festivals (Baalbek International Festival).", image: "images/lights.jpeg" }} />
              <img src="images/lights.jpeg" className="img-fluid w-100 card-img" alt="Baalbek Festival" />
              <div className="card-body text-center">
                <h5>Festivals (Baalbek International Festival).</h5>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-4">
            <FavoriteButton item={{ title: "The Stone of the Pregnant Woman (Hajjar al-Hibla).", image: "images/stone.jpeg" }} />
              <img src="images/stone.jpeg" className="img-fluid w-100 card-img" alt="Stone of Pregnant Woman" />
              <div className="card-body text-center">
                <h5>The Stone of the Pregnant Woman (Hajjar al-Hibla).</h5>
              </div>
            </div>
          </div>
        </div>

        {/*Restaurants */}
        <h2 id="restaurants">Restaurants</h2>
        <p>Enjoy local and traditional restaurants.</p>

        <div className="row">
          <div className="col-md-6">
            <div className="card mb-4">
             <FavoriteButton item={{ title: "LAKKIS FARM .", image: "images/lakkis.jpeg" }} />
              <img src="images/lakkis.jpeg" className="img-fluid w-100 card-img" alt="Lakkis Farm" />
              <div className="card-body text-center">
                <h5>LAKKIS FARM .</h5>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-4">
             <FavoriteButton item={{ title: "Baalbeck palace Restaurant.", image: "images/palace.jpeg" }} />
              <img src="images/palace.jpeg" className="img-fluid w-100 card-img" alt="Baalbeck Palace" />
              <div className="card-body text-center">
                <h5>Baalbeck palace Restaurant.</h5>
              </div>
            </div>
          </div>
        </div>

        {/*Cafes */}
        <h2 id="cafes">Cafes</h2>
        <p>Relax in simple cafes.</p>

        <div className="row">
          <div className="col-md-6">
            <div className="card mb-4">
             <FavoriteButton item={{ title: "TERRACE.", image: "images/terrace.jpeg" }} />
              <img src="images/terrace.jpeg" className="img-fluid w-100 card-img" alt="Terrace" />
              <div className="card-body text-center">
                <h5>TERRACE.</h5>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-4">
             <FavoriteButton item={{ title: "Ohannes.", image: "images/ohannes.jpeg" }} />
              <img src="images/ohannes.jpeg" className="img-fluid w-100 card-img" alt="Ohannes" />
              <div className="card-body text-center">
                <h5>Ohannes.</h5>
              </div>
            </div>
          </div>
        </div>

        {/*Hotels */}
        <h2 id="hotels">Hotels</h2>
        <p>Stay in nearby hotels.</p>

        <div className="row">
          <div className="col-md-6">
            <div className="card mb-4">
             <FavoriteButton item={{ title: "Palmyra Hotel Baalbek.", image: "images/palmyra.jpeg" }} />
              <img src="images/palmyra.jpeg" className="img-fluid w-100 card-img" alt="Palmyra Hotel" />
              <div className="card-body text-center">
                <h5>Palmyra Hotel Baalbek.</h5>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-4">
             <FavoriteButton item={{ title: "Inside Palmyra Hotel Baalbek .", image: "images/palmyra1.jpeg" }} />
              <img src="images/palmyra1.jpeg" className="img-fluid w-100 card-img" alt="Inside Palmyra Hotel" />
              <div className="card-body text-center">
                <h5>Inside Palmyra Hotel Baalbek .</h5>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-4">
             <FavoriteButton item={{ title: "Kanaan Group Hotel.", image: "images/kanaan.jpeg" }} />
              <img src="images/kanaan.jpeg" className="img-fluid w-100 card-img" alt="Kanaan Hotel" />
              <div className="card-body text-center">
                <h5>Kanaan Group Hotel.</h5>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-4">
             <FavoriteButton item={{ title: "Inside Kanaan Group Hotel.", image: "images/kanaan1.jpeg" }} />
              <img src="images/kanaan1.jpeg" className="img-fluid w-100 card-img" alt="Inside Kanaan Hotel" />
              <div className="card-body text-center">
                <h5>Inside Kanaan Group Hotel.</h5>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default BaalbekPage;