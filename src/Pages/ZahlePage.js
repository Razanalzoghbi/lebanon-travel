import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FavoriteButton from "../components/FavoriteButton";

function ZahlehPage() {
  return (
    <div>
      <Navbar />

      <div className="container mt-5">
        <h1 className="text-center mb-4">Explore Zahleh</h1>
        
        <div className="text-center mb-4">
          <a href="#attractions" className="btn btn-outline-primary m-1">Attractions</a>
          <a href="#restaurants" className="btn btn-outline-success m-1">Restaurants</a>
          <a href="#cafes" className="btn btn-outline-warning m-1">Cafes</a>
          <a href="#hotels" className="btn btn-outline-danger m-1">Hotels</a>
        </div>

        <img src="images/zahle.jpeg" className="img-fluid mb-5 hero-img" alt="Zahleh Hero" />

        <p className="text-center">
          Zahle is known as the city of wine and poetry, famous for its beautiful scenery and traditional Lebanese restaurants.
        </p>

        <h2 id="attractions">Attractions</h2>
        <p>Explore scenic views and riverside areas.</p>

        <div className="row">
          <div className="col-md-6">
            <div className="card mb-4">
              <FavoriteButton item={{ title: "Our Lady Of Zahle.", image: "images/ladyzahleh.jpeg" }} />
              <img src="images/ladyzahleh.jpeg" className="img-fluid w-100 card-img" alt="Our Lady Of Zahle" />
              <div className="card-body text-center">
                <h5>Our Lady Of Zahle.</h5>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-4">
             <FavoriteButton item={{ title: "bekaa valley vineyards.", image: "images/valley.jpeg" }} />
              <img src="images/valley.jpeg" className="img-fluid w-100 card-img" alt="Bekaa Valley Vineyards" />
              <div className="card-body text-center">
                <h5>bekaa valley vineyards.</h5>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-4">
              <FavoriteButton item={{ title: "Saydet Zahleh.", image: "images/saydetzahle.jpeg" }} />
              <img src="images/saydetzahle.jpeg" className="img-fluid w-100 card-img" alt="Saydet Zahleh" />
              <div className="card-body text-center">
                <h5>Saydet Zahleh.</h5>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-4">
              <FavoriteButton item={{ title: "Berdawni River Zahle.", image: "images/riverzahle.jpeg" }} />
              <img src="images/riverzahle.jpeg" className="img-fluid w-100 card-img" alt="Berdawni River" />
              <div className="card-body text-center">
                <h5>Berdawni River Zahle.</h5>
              </div>
            </div>
          </div>
        </div>

        {/*Restaurants */}
        <h2 id="restaurants">Restaurants</h2>
        <p>Enjoy famous Lebanese restaurants.</p>

        <div className="row">
          <div className="col-md-6">
            <div className="card mb-4">
              <FavoriteButton item={{ title: "Al Wadi Restaurant.", image: "images/wadi.jpeg" }} />
              <img src="images/wadi.jpeg" className="img-fluid w-100 card-img" alt="Al Wadi Restaurant" />
              <div className="card-body text-center">
                <h5>Al Wadi Restaurant.</h5>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-4">
             <FavoriteButton item={{ title: "Casino Arabi Restaurant.", image: "images/casino.jpeg" }} />
              <img src="images/casino.jpeg" className="img-fluid w-100 card-img" alt="Casino Arabi Restaurant" />
              <div className="card-body text-center">
                <h5>Casino Arabi Restaurant.</h5>
              </div>
            </div>
          </div>
        </div>

        {/* Cafes */}
        <h2 id="cafes">Cafes</h2>
        <p>Relax in cozy cafes.</p>

        <div className="row">
          <div className="col-md-6">
            <div className="card mb-4">
             <FavoriteButton item={{ title: "Salon Zahle.", image: "images/salon.jpeg" }} />
              <img src="images/salon.jpeg" className="img-fluid w-100 card-img" alt="Salon Zahle" />
              <div className="card-body text-center">
                <h5>Salon Zahle.</h5>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-4">
              <FavoriteButton item={{ title: "Thinkers C.C.C Zahle.", image: "images/thinkers.jpeg" }} />
              <img src="images/thinkers.jpeg" className="img-fluid w-100 card-img" alt="Thinkers C.C.C Zahle" />
              <div className="card-body text-center">
                <h5>Thinkers C.C.C Zahle.</h5>
              </div>
            </div>
          </div>
        </div>

        {/* Hotels */}
        <h2 id="hotels">Hotels</h2>
        <p>Stay in welcoming hotels.</p>
        
        <div className="row">
          <div className="col-md-6">
            <div className="card mb-4">
              <FavoriteButton item={{ title: "Grand Hotel Kadri.", image: "images/grand.jpeg" }} />
              <img src="images/grand.jpeg" className="img-fluid w-100 card-img" alt="Grand Hotel Kadri" />
              <div className="card-body text-center">
                <h5>Grand Hotel Kadri.</h5>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-4">
              <FavoriteButton item={{ title: "Inside Grand Hotel Kadri.", image: "images/grand1.jpeg" }} />
              <img src="images/grand1.jpeg" className="img-fluid w-100 card-img" alt="Inside Grand Hotel Kadri" />
              <div className="card-body text-center">
                <h5>Inside Grand Hotel Kadri.</h5>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-4">
             <FavoriteButton item={{ title: "Hotel St Jean.", image: "images/st.jpeg" }} />
              <img src="images/st.jpeg" className="img-fluid w-100 card-img" alt="Hotel St Jean" />
              <div className="card-body text-center">
                <h5>Hotel St Jean.</h5>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-4">
              <FavoriteButton item={{ title: "Inside Hotel St Jean.", image: "images/st1.jpeg" }} />
              <img src="images/st1.jpeg" className="img-fluid w-100 card-img" alt="Inside Hotel St Jean" />
              <div className="card-body text-center">
                <h5>Inside Hotel St Jean.</h5>
              </div>
            </div>
          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
}

export default ZahlehPage;