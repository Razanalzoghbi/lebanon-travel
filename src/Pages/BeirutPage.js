import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FavoriteButton from "../components/FavoriteButton";

function BeirutPage() {
  return (
    <div>
      <Navbar />

      <div className="container mt-5">
        <h1 className="text-center mb-4">Explore Beirut</h1>
        
        <div className="text-center mb-4">
          <a href="#attractions" className="btn btn-outline-primary m-1">Attractions</a>
          <a href="#restaurants" className="btn btn-outline-success m-1">Restaurants</a>
          <a href="#cafes" className="btn btn-outline-warning m-1">Cafes</a>
          <a href="#hotels" className="btn btn-outline-danger m-1">Hotels</a>
        </div>

        <img src="images/beirut-main.jpeg" className="img-fluid mb-5 hero-img" alt="Beirut Main" />

        <p className="text-center">
          Beirut is the capital of Lebanon, known for its vibrant lifestyle, beautiful seaside views, and rich cultural history. It is a perfect mix of modern life and historical charm.
        </p>

        {/* Attractions */}
        <h2 id="attractions">Attractions</h2>
        <p>Explore the most famous attractions in Beirut, from natural landmarks to historic sites.</p>

        <div className="row">
          <div className="col-md-6">
            <div className="card mb-4">
             <FavoriteButton item={{ title: "Raouche Rocks.", image: "images/raouche.jpeg" }} />
              <img src="images/raouche.jpeg" className="img-fluid w-100 card-img" alt="Raouche Rocks" />
              <div className="card-body text-center">
                <h5>Raouche Rocks.</h5>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-4">
             <FavoriteButton item={{ title: "Downtown Beirut.", image: "images/downtown1.jpeg" }} />
              <img src="images/downtown1.jpeg" className="img-fluid w-100 card-img" alt="Downtown Beirut" />
              <div className="card-body text-center">
                <h5>Downtown Beirut.</h5>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-4">
              <FavoriteButton item={{ title: "Shops in Downtown Beirut.", image: "images/downtown2.jpeg" }} />
              <img src="images/downtown2.jpeg" className="img-fluid w-100 card-img" alt="Shops in Downtown" />
              <div className="card-body text-center">
                <h5>Shops in Downtown Beirut.</h5>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-4">
              <FavoriteButton item={{ title: "Zaitouna Bay.", image: "images/zaytouna1.jpeg" }} />
              <img src="images/zaytouna1.jpeg" className="img-fluid w-100 card-img" alt="Zaitouna Bay" />
              <div className="card-body text-center">
                <h5>Zaitouna Bay.</h5>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-4">
              <FavoriteButton item={{ title: "BIEL.", image: "images/zaytouna2.jpeg" }} />
              <img src="images/zaytouna2.jpeg" className="img-fluid w-100 card-img" alt="BIEL" />
              <div className="card-body text-center">
                <h5>BIEL.</h5>
              </div>
            </div>
          </div>

        <div className="col-md-6">
            <div className="card mb-4">
              <FavoriteButton item={{ title: "Sursock Museum.", image: "images/sursock.jpeg" }} />
              <img src="images/sursock.jpeg" className="img-fluid w-100 card-img" alt="BIEL" />
              <div className="card-body text-center">
                <h5>Sursock Museum.</h5>
              </div>
            </div>
          </div>
        </div>

        <h2 id="restaurants">Restaurants</h2>
        <p>Enjoy a variety of restaurants offering delicious Lebanese and international cuisine.</p>
        
        <div className="row">
          <div className="col-md-6">
            <div className="card mb-4">
              <FavoriteButton item={{ title: "AL Falamanki Raouche.", image: "images/restaurant1.jpeg" }} />
              <img src="images/restaurant1.jpeg" className="img-fluid w-100 card-img" alt="Al Falamanki" />
              <div className="card-body text-center">
                <h5>AL Falamanki Raouche.</h5>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-4">
             <FavoriteButton item={{ title: "AL Beiruti Downtown.", image: "images/restaurant1.jpeg" }} />
              <img src="images/restaurant2.jpeg" className="img-fluid w-100 card-img" alt="Al Beiruti" />
              <div className="card-body text-center">
                <h5>AL Beiruti Downtown.</h5>
              </div>
            </div>
          </div>
        </div>

        <h2 id="cafes">Cafes</h2>
        <p>Relax in cozy cafes with great coffee and amazing views.</p>

        <div className="row">
          <div className="col-md-6">
            <div className="card mb-4">
             <FavoriteButton item={{ title: "Cafe Hamra.", image: "images/cafe1.jpeg" }} />
              <img src="images/cafe1.jpeg" className="img-fluid w-100 card-img" alt="Cafe Hamra" />
              <div className="card-body text-center">
                <h5>Cafe Hamra.</h5>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-4">
             <FavoriteButton item={{ title: "Em Sherif cafe.", image: "images/cafe2.jpeg" }} />
              <img src="images/cafe2.jpeg" className="img-fluid w-100 card-img" alt="Em Sherif Cafe" />
              <div className="card-body text-center">
                <h5>Em Sherif cafe.</h5>
              </div>
            </div>
          </div>
        </div>

        <h2 id="hotels">Hotels</h2>
        <p>Find the best hotels for a comfortable and luxurious stay.</p>
        
        <div className="row">
          <div className="col-md-6">
            <div className="card mb-4">
              <FavoriteButton item={{ title: "Phoenicia Hotel Beirut.", image: "images/hotel1.jpeg" }} />
              <img src="images/hotel1.jpeg" className="img-fluid w-100 card-img" alt="Phoenicia Hotel" />
              <div className="card-body text-center">
                <h5>Phoenicia Hotel Beirut.</h5>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-4">
              <FavoriteButton item={{ title: "Inside Phoenicia Hotel Pool.", image: "images/hotel2.jpeg" }} />
              <img src="images/hotel2.jpeg" className="img-fluid w-100 card-img" alt="Phoenicia Hotel Pool" />
              <div className="card-body text-center">
                <h5>Inside Phoenicia Hotel Pool.</h5>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-4">
             <FavoriteButton item={{ title: "Four Seasons Hotel Beirut.", image: "images/hotel3.jpeg" }} />
              <img src="images/hotel3.jpeg" className="img-fluid w-100 card-img" alt="Four Seasons" />
              <div className="card-body text-center">
                <h5>Four Seasons Hotel Beirut.</h5>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-4">
              <FavoriteButton item={{ title: "Inside Four Seasons Hotel Beirut.", image: "images/hotel4.jpeg" }} />
              <img src="images/hotel4.jpeg" className="img-fluid w-100 card-img" alt="Four Seasons View" />
              <div className="card-body text-center">
                <h5>Inside Four Seasons Hotel Beirut.</h5>
              </div>
            </div>
          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
}

export default BeirutPage;