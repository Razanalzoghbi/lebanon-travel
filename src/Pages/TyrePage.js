import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FavoriteButton from "../components/FavoriteButton";

function TyrePage() {
  return (
    <div>
      <Navbar />

      <div className="container mt-5">
        <h1 className="text-center mb-4">Explore Tyre</h1>
        
        <div className="text-center mb-4">
          <a href="#attractions" className="btn btn-outline-primary m-1">Attractions</a>
          <a href="#restaurants" className="btn btn-outline-success m-1">Restaurants</a>
          <a href="#cafes" className="btn btn-outline-warning m-1">Cafes</a>
          <a href="#hotels" className="btn btn-outline-danger m-1">Hotels</a>
        </div>

        <img src="images/tyre.jpeg" className="img-fluid mb-5 hero-img" alt="Tyre Hero" />

        <p className="text-center">
          Tyre is a beautiful southern city known for its sandy beaches and ancient ruins. It is a perfect destination for relaxation and history lovers.
        </p>

        {/*Attractions */}
        <h2 id="attractions">Attractions</h2>
        <p>Explore archaeological sites and beaches.</p>

        <div className="row">
          <div className="col-md-6">
            <div className="card mb-4">
             <FavoriteButton item={{ title: "Tyre Old Harbor.", image: "images/harbor.jpeg" }} />
              <img src="images/harbor.jpeg" className="img-fluid w-100 card-img" alt="Tyre Old Harbor" />
              <div className="card-body text-center">
                <h5>Tyre Old Harbor.</h5>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-4">
            <FavoriteButton item={{ title: "The distinctive beach in Tyre Lebanon.", image: "images/beacht.jpeg" }} />
              <img src="images/beacht.jpeg" className="img-fluid w-100 card-img" alt="Tyre Beach" />
              <div className="card-body text-center">
                <h5>The distinctive beach in Tyre Lebanon.</h5>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-4">
             <FavoriteButton item={{ title: "Roman Ruins Of Tyre Lebanon.", image: "images/ruins.jpeg" }} />
              <img src="images/ruins.jpeg" className="img-fluid w-100 card-img" alt="Roman Ruins" />
              <div className="card-body text-center">
                <h5>Roman Ruins Of Tyre Lebanon.</h5>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-4">
             <FavoriteButton item={{ title: "Tyre Corniche is a beautiful place to walk, relax, and enjoy the sea view.", image: "images/kornish.jpeg" }} />
              <img src="images/kornish.jpeg" className="img-fluid w-100 card-img" alt="Tyre Corniche" />
              <div className="card-body text-center">
                <h5>Tyre Corniche is a beautiful place to walk, relax, and enjoy the sea view.</h5>
              </div>
            </div>
          </div>
        </div>

        {/* Restaurants */}
        <h2 id="restaurants">Restaurants</h2>
        <p>Enjoy Best seafood restaurants by the sea.</p>

        <div className="row">
          <div className="col-md-6">
            <div className="card mb-4">
             <FavoriteButton item={{ title: "Al Fanar restaurant and Auberge.", image: "images/fanar.jpeg" }} />
              <img src="images/fanar.jpeg" className="img-fluid w-100 card-img" alt="Al Fanar" />
              <div className="card-body text-center">
                <h5>Al Fanar restaurant and Auberge.</h5>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-4">
             <FavoriteButton item={{ title: "La phenicien.", image: "images/laphen.jpeg" }} />
              <img src="images/laphen.jpeg" className="img-fluid w-100 card-img" alt="Le Phenicien" />
              <div className="card-body text-center">
                <h5>La phenicien.</h5>
              </div>
            </div>
          </div>
        </div>

        {/* Cafes */}
        <h2 id="cafes">Cafes</h2>
        <p>Relax in calm and peaceful cafes.</p>
        
        <div className="row">
          <div className="col-md-6">
            <div className="card mb-4">
            <FavoriteButton item={{ title: "Rustica Cafe.<", image: "images/rustica.jpeg" }} />
              <img src="images/rustica.jpeg" className="img-fluid w-100 card-img" alt="Rustica Cafe" />
              <div className="card-body text-center">
                <h5>Rustica Cafe.</h5>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-4">
             <FavoriteButton item={{ title: "Seaside cafè.", image: "images/sea.jpeg" }} />
              <img src="images/sea.jpeg" className="img-fluid w-100 card-img" alt="Seaside Cafe" />
              <div className="card-body text-center">
                <h5>Seaside cafè.</h5>
              </div>
            </div>
          </div>
        </div>

        {/* Hotels */}
        <h2 id="hotels">Hotels</h2>
        <p>Stay in hotels with sea views.</p>
        
        <div className="row">
          <div className="col-md-6">
            <div className="card mb-4">
             <FavoriteButton item={{ title: "Asamina Boutique Hotel.", image: "images/asamina.jpeg" }} />
              <img src="images/asamina.jpeg" className="img-fluid w-100 card-img" alt="Asamina Boutique Hotel" />
              <div className="card-body text-center">
                <h5>Asamina Boutique Hotel.</h5>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-4">
            <FavoriteButton item={{ title: "Asamina Boutique Hotel From Behind.", image: "images/asamina1.jpeg" }} />
              <img src="images/asamina1.jpeg" className="img-fluid w-100 card-img" alt="Asamina Boutique Hotel View" />
              <div className="card-body text-center">
                <h5>Asamina Boutique Hotel From Behind.</h5>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-4">
            <FavoriteButton item={{ title: "Dar alma Hotel.", image: "images/dar.jpeg" }} />
              <img src="images/dar.jpeg" className="img-fluid w-100 card-img" alt="Dar Alma Hotel" />
              <div className="card-body text-center">
                <h5>Dar alma Hotel.</h5>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-4">
             <FavoriteButton item={{ title: "Inside Dar alma Hotel.", image: "images/dar1.jpeg" }} />
              <img src="images/dar1.jpeg" className="img-fluid w-100 card-img" alt="Inside Dar Alma" />
              <div className="card-body text-center">
                <h5>Inside Dar alma Hotel.</h5>
              </div>
            </div>
          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
}

export default TyrePage;