import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FavoriteButton from "../components/FavoriteButton";

function HarissaPage() {
  return (
    <div>
      <Navbar />

      <div className="container mt-5">
        <h1 className="text-center mb-4">Explore Harissa</h1>
        
        <div className="text-center mb-4">
          <a href="#attractions" className="btn btn-outline-primary m-1">Attractions</a>
          <a href="#restaurants" className="btn btn-outline-success m-1">Restaurants</a>
          <a href="#cafes" className="btn btn-outline-warning m-1">Cafes</a>
          <a href="#hotels" className="btn btn-outline-danger m-1">Hotels</a>
        </div>

        <img src="images/harissa.jpeg" className="img-fluid mb-5 hero-img" alt="Harissa Hero" />

        <p className="text-center">
          Harissa is one of the most famous tourist destinations in Lebanon, offering breathtaking views, relaxing vibes, and the iconic statue of Our Lady of Lebanon.
        </p>

        {/* Attractions */}
        <h2 id="attractions">Attractions</h2>
        <p>Discover the main attractions, scenic views and beautiful things to do in Harissa.</p>

        <div className="row">
          {/* Teleferique */}
          <div className="col-md-6">
            <div className="card mb-4">
             <FavoriteButton item={{ title: "This Teleferique between Jounieh and Harissa is a popular tourist attraction in Lebanon.", image: "images/teleferique.jpeg" }} />
              <img src="images/teleferique.jpeg" className="img-fluid w-100 card-img" alt="Teleferique" />
              <div className="card-body text-center">
                <h5>This Teleferique between Jounieh and Harissa is a popular tourist attraction in Lebanon.</h5>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-4">
             <FavoriteButton item={{ title: "A panoramic view of Jounieh Bay from walk in Harissa.", image: "images/panoramic.jpeg" }} />
              <img src="images/panoramic.jpeg" className="img-fluid w-100 card-img" alt="Panoramic View" />
              <div className="card-body text-center">
                <h5>A panoramic view of Jounieh Bay from walk in Harissa.</h5>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-4">
             <FavoriteButton item={{ title: "Our Lady of Lebanon statue in Harissa, overlooking Jounieh Bay.", image: "images/lady.jpeg" }} />
              <img src="images/lady.jpeg" className="img-fluid w-100 card-img" alt="Our Lady of Lebanon" />
              <div className="card-body text-center">
                <h5>Our Lady of Lebanon statue in Harissa, overlooking Jounieh Bay.</h5>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-4">
             <FavoriteButton item={{ title: "Visit Saint Peter and Paul Cathedral.", image: "images/saint.jpeg" }} />
              <img src="images/saint.jpeg" className="img-fluid w-100 card-img" alt="Saint Peter and Paul Cathedral" />
              <div className="card-body text-center">
                <h5>Visit Saint Peter and Paul Cathedral.</h5>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-4">
             <FavoriteButton item={{ title: "Melkite Greek Catholic Basilica of St. Paul in Harissa.", image: "images/basilica.jpeg" }} />
              <img src="images/basilica.jpeg" className="img-fluid w-100 card-img" alt="Basilica St. Paul" />
              <div className="card-body text-center">
                <h5>Melkite Greek Catholic Basilica of St. Paul in Harissa.</h5>
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
             <FavoriteButton item={{ title: "Beit Yossef.", image: "images/beit.jpeg" }} />
              <img src="images/beit.jpeg" className="img-fluid w-100 card-img" alt="Beit Yossef" />
              <div className="card-body text-center">
                <h5>Beit Yossef.</h5>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-4">
             <FavoriteButton item={{ title: "Atyab Harissa Restaurant.", image: "images/atyab.jpeg" }} />
              <img src="images/atyab.jpeg" className="img-fluid w-100 card-img" alt="Atyab Harissa" />
              <div className="card-body text-center">
                <h5>Atyab Harissa Restaurant.</h5>
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
             <FavoriteButton item={{ title: "Bayline resto cafe.", image: "images/bayline.jpeg" }} />
              <img src="images/bayline.jpeg" className="img-fluid w-100 card-img" alt="Bayline Cafe" />
              <div className="card-body text-center">
                <h5>Bayline resto cafe.</h5>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-4">
            <FavoriteButton item={{ title: "The Terrace Restaurant / Bar Lounge.", image: "images/terrace1.jpeg" }} />
              <img src="images/terrace1.jpeg" className="img-fluid w-100 card-img" alt="The Terrace" />
              <div className="card-body text-center">
                <h5>The Terrace Restaurant / Bar Lounge.</h5>
              </div>
            </div>
          </div>
        </div>

        {/* Hotels */}
        <h2 id="hotels">Hotels</h2>
        <p>Find the best hotels for a comfortable and luxurious stay.</p>
        <div className="row">
          <div className="col-md-6">
            <div className="card mb-4">
             <FavoriteButton item={{ title: "Bay Lodge Boutique Hotel.", image: "images/bayhotel.jpeg" }} />
              <img src="images/bayhotel.jpeg" className="img-fluid w-100 card-img" alt="Bay Lodge Hotel" />
              <div className="card-body text-center">
                <h5>Bay Lodge Boutique Hotel.</h5>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-4">
             <FavoriteButton item={{ title: "Bedrooms inside Bay Lodge Boutique Hotel.", image: "images/bayhotel1.jpeg" }} />
              <img src="images/bayhotel1.jpeg" className="img-fluid w-100 card-img" alt="Bay Lodge Room" />
              <div className="card-body text-center">
                <h5>Bedrooms inside Bay Lodge Boutique Hotel.</h5>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-4">
             <FavoriteButton item={{ title: "Bethania Harissa Hotel.", image: "images/bethani.jpeg" }} />
              <img src="images/bethani.jpeg" className="img-fluid w-100 card-img" alt="Bethania Harissa" />
              <div className="card-body text-center">
                <h5>Bethania Harissa Hotel.</h5>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-4">
             <FavoriteButton item={{ title: "Inside Bethania Harissa Hotel.", image: "images/bethani1.jpeg" }} />
              <img src="images/bethani1.jpeg" className="img-fluid w-100 card-img" alt="Inside Bethania Harissa" />
              <div className="card-body text-center">
                <h5>Inside Bethania Harissa Hotel.</h5>
              </div>
            </div>
          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
}

export default HarissaPage;