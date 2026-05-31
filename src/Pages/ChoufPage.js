import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FavoriteButton from "../components/FavoriteButton";

function ChoufPage() {
  return (
    <div>
      <Navbar />

      <div className="container mt-5">
        <h1 className="text-center mb-4">Explore Chouf</h1>
        
        <div className="text-center mb-4">
          <a href="#attractions" className="btn btn-outline-primary m-1">Attractions</a>
          <a href="#restaurants" className="btn btn-outline-success m-1">Restaurants</a>
          <a href="#cafes" className="btn btn-outline-warning m-1">Cafes</a>
          <a href="#hotels" className="btn btn-outline-danger m-1">Hotels</a>
        </div>

        <img src="images/chouf.jpeg" className="img-fluid mb-5 hero-img" alt="Chouf Hero" />

        <p className="text-center">
          Chouf is a mountainous region known for its natural beauty, cedar forests, and peaceful villages.
        </p>

        {/* Attractions */}
        <h2 id="attractions">Attractions</h2>
        <p>Explore nature reserves and mountains.</p>
        
        <div className="row">
          <div className="col-md-6">
            <div className="card mb-4">
              <FavoriteButton item={{ title: "Niha Castle.", image: "images/niha.jpeg" }} />
              <img src="images/niha.jpeg" className="img-fluid w-100 card-img" alt="Niha Castle" />
              <div className="card-body text-center">
                <h5>Niha Castle.</h5>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-4">
              <FavoriteButton item={{ title: "Barouk cedar forest.", image: "images/cedar.jpeg" }} />
              <img src="images/cedar.jpeg" className="img-fluid w-100 card-img" alt="Barouk Cedar Forest" />
              <div className="card-body text-center">
                <h5>Barouk cedar forest.</h5>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-4">
              <FavoriteButton item={{ title: "Museum Atelier Assaf.", image: "images/museum.jpeg" }} />
              <img src="images/museum.jpeg" className="img-fluid w-100 card-img" alt="Museum Atelier Assaf" />
              <div className="card-body text-center">
                <h5>Museum Atelier Assaf.</h5>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-4">
              <FavoriteButton item={{ title: "Moussa Castle.<", image: "images/moussa.jpeg" }} />
              <img src="images/moussa.jpeg" className="img-fluid w-100 card-img" alt="Moussa Castle" />
              <div className="card-body text-center">
                <h5>Moussa Castle.</h5>
              </div>
            </div>
          </div>
        </div>

        {/* Restaurants */}
        <h2 id="restaurants">Restaurants</h2>
        <p>Enjoy traditional food in local restaurants.</p>
        
        <div className="row">
          <div className="col-md-6">
            <div className="card mb-4">
             <FavoriteButton item={{ title: "Shallalat Al Zarka.", image: "images/shallalat.jpeg" }} />
              <img src="images/shallalat.jpeg" className="img-fluid w-100 card-img" alt="Shallalat Al Zarka" />
              <div className="card-body text-center">
                <h5>Shallalat Al Zarka.</h5>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-4">
              <FavoriteButton item={{ title: "Paradise Waterfalls.", image: "images/paradise.jpeg" }} />
              <img src="images/paradise.jpeg" className="img-fluid w-100 card-img" alt="Paradise Waterfalls" />
              <div className="card-body text-center">
                <h5>Paradise Waterfalls.</h5>
              </div>
            </div>
          </div>
        </div>

        {/*Cafes */}
        <h2 id="cafes">Cafes</h2>
        <p>Relax in quiet cafes surrounded by nature.</p>

        <div className="row">
          <div className="col-md-6">
            <div className="card mb-4">
              <FavoriteButton item={{ title: "Highland.", image: "images/highland.jpeg" }} />
              <img src="images/highland.jpeg" className="img-fluid w-100 card-img" alt="Highland Cafe" />
              <div className="card-body text-center">
                <h5>Highland.</h5>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-4">
             <FavoriteButton item={{ title: "Sky Tales.", image: "images/sky.jpeg" }} />
              <img src="images/sky.jpeg" className="img-fluid w-100 card-img" alt="Sky Tales" />
              <div className="card-body text-center">
                <h5>Sky Tales.</h5>
              </div>
            </div>
          </div>
        </div>

        {/*Hotels */}
        <h2 id="hotels">Hotels</h2>
        <p>Stay in eco-lodges and guesthouses.</p>
        
        <div className="row">
          <div className="col-md-6">
            <div className="card mb-4">
              <FavoriteButton item={{ title: "Mresty Guest House.", image: "images/mresty.jpeg" }} />
              <img src="images/mresty.jpeg" className="img-fluid w-100 card-img" alt="Mresty Guest House" />
              <div className="card-body text-center">
                <h5>Mresty Guest House.</h5>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-4">
              <FavoriteButton item={{ title: "Inside Mresty Guest House.", image: "images/mresty1.jpeg" }} />
              <img src="images/mresty1.jpeg" className="img-fluid w-100 card-img" alt="Inside Mresty Guest House" />
              <div className="card-body text-center">
                <h5>Inside Mresty Guest House.</h5>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-4">
              <FavoriteButton item={{ title: "Casa Del Mir.", image: "images/casa.jpeg" }} />
              <img src="images/casa.jpeg" className="img-fluid w-100 card-img" alt="Casa Del Mir" />
              <div className="card-body text-center">
                <h5>Casa Del Mir.</h5>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-4">
              <FavoriteButton item={{ title: "Inside Casa Del Mir.", image: "images/casa1.jpeg" }} />
             <img src="images/casa1.jpeg" className="img-fluid w-100 card-img" alt="Inside Casa Del Mir" />
              <div className="card-body text-center">
                <h5>Inside Casa Del Mir.</h5>
              </div>
            </div>
          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
}

export default ChoufPage;