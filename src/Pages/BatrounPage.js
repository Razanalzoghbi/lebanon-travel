import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FavoriteButton from "../components/FavoriteButton";

function BatrounPage() {
  return (
    <div>
      <Navbar />

      <div className="container mt-5">
        <h1 className="text-center mb-4">Explore Batroun</h1>
        
    
        <div className="text-center mb-4">
          <a href="#attractions" className="btn btn-outline-primary m-1">Attractions</a>
          <a href="#restaurants" className="btn btn-outline-success m-1">Restaurants</a>
          <a href="#cafes" className="btn btn-outline-warning m-1">Cafes</a>
          <a href="#hotels" className="btn btn-outline-danger m-1">Hotels</a>
        </div>

        <img src="images/batroun.jpeg" className="img-fluid mb-5 hero-img" alt="Batroun Hero" />

        <p className="text-center">
          Batroun is a coastal city famous for its beaches, nightlife, and relaxed atmosphere. It is a favorite destination for summer tourism.
        </p>

        {/* Attractions */}
        <h2 id="attractions">Attractions</h2>
        <p>Explore beautiful beaches and old streets.</p>
        <div className="row">
          <div className="col-md-6">
            <div className="card mb-4">
              <FavoriteButton item={{ title: "Bahsa beach.", image: "images/bahsabeach.jpeg" }} />
              <img src="images/bahsabeach.jpeg" className="img-fluid w-100 card-img" alt="Bahsa Beach" />
              <div className="card-body text-center">
                <h5>Bahsa beach.</h5>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-4">
              <FavoriteButton item={{ title: "Old Souk.", image: "images/batrounsouk.jpeg" }} />
              <img src="images/batrounsouk.jpeg" className="img-fluid w-100 card-img" alt="Old Souk" />
              <div className="card-body text-center">
                <h5>Old Souk.</h5>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-4">
              <FavoriteButton item={{ title: "Saint Stephen Cathedral.", image: "images/saintstephen.jpeg" }} />
              <img src="images/saintstephen.jpeg" className="img-fluid w-100 card-img" alt="Saint Stephen Cathedral" />
              <div className="card-body text-center">
                <h5>Saint Stephen Cathedral.</h5>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-4">
              <FavoriteButton item={{ title: "Mina Batroun.", image: "images/minabatroun.jpeg" }} />
              <img src="images/minabatroun.jpeg" className="img-fluid w-100 card-img" alt="Mina Batroun" />
              <div className="card-body text-center">
                <h5>Mina Batroun.</h5>
              </div>
            </div>
          </div>
        </div>

        {/* Restaurants */}
        <h2 id="restaurants">Restaurants</h2>
        <p>Enjoy fresh seafood and seaside restaurants.</p>
        <div className="row">
          <div className="col-md-6">
            <div className="card mb-4">
              <FavoriteButton item={{ title: "Pierre & Friends restaurant.", image: "images/pierre.jpeg" }} />
              <img src="images/pierre.jpeg" className="img-fluid w-100 card-img" alt="Pierre & Friends" />
              <div className="card-body text-center">
                <h5>Pierre & Friends restaurant.</h5>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-4">
              <FavoriteButton item={{ title: "Chez maguy batroun restaurant.", image: "images/chez.jpeg" }} />
              <img src="images/chez.jpeg" className="img-fluid w-100 card-img" alt="Chez Maguy" />
              <div className="card-body text-center">
                <h5>Chez maguy batroun restaurant.</h5>
              </div>
            </div>
          </div>
        </div>

        {/* Cafes */}
        <h2 id="cafes">Cafes</h2>
        <p>Relax in beautiful trendy coffees.</p>
        <div className="row">
          <div className="col-md-6">
            <div className="card mb-4">
              <FavoriteButton item={{ title: "Bartartine Batroun caffee.", image: "images/bartartine.jpeg" }} />
              <img src="images/bartartine.jpeg" className="img-fluid w-100 card-img" alt="Bar Tartine" />
              <div className="card-body text-center">
                <h5>Bartartine Batroun caffee.</h5>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-4">
             <FavoriteButton item={{ title: "Ahwet zeitouna caffee.", image: "images/ahwet.jpeg" }} />
              <img src="images/ahwet.jpeg" className="img-fluid w-100 card-img" alt="Ahwet Zeitouna" />
              <div className="card-body text-center">
                <h5>Ahwet zeitouna caffee.</h5>
              </div>
            </div>
          </div>
        </div>

        {/* Hotels */}
        <h2 id="hotels">Hotels</h2>
        <p>Stay in stylish hotels and guesthouses.</p>
        <div className="row">
          <div className="col-md-6">
            <div className="card mb-4">
              <FavoriteButton item={{ title: "Blue marlin Batroun hotel.", image: "images/blue.jpeg" }} />
              <img src="images/blue.jpeg" className="img-fluid w-100 card-img" alt="Blue Marlin Hotel" />
              <div className="card-body text-center">
                <h5>Blue marlin Batroun hotel.</h5>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-4">
              <FavoriteButton item={{ title: "Inside Blue marlin Batroun hotel.", image: "images/blue1.jpeg" }} />
              <img src="images/blue1.jpeg" className="img-fluid w-100 card-img" alt="Inside Blue Marlin" />
              <div className="card-body text-center">
                <h5>Inside Blue marlin Batroun hotel.</h5>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-4">
              <FavoriteButton item={{ title: "Be batroun hotel.", image: "images/be.jpeg" }} />
              <img src="images/be.jpeg" className="img-fluid w-100 card-img" alt="Be Batroun Hotel" />
              <div className="card-body text-center">
                <h5>Be batroun hotel.</h5>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-4">
             <FavoriteButton item={{ title: "Inside Be batroun hotel.", image: "images/be1.jpeg" }} />
              <img src="images/be1.jpeg" className="img-fluid w-100 card-img" alt="Inside Be Batroun" />
              <div className="card-body text-center">
                <h5>Inside Be batroun hotel.</h5>
              </div>
            </div>
          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
}

export default BatrounPage;