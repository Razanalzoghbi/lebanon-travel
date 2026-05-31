import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FavoriteButton from "../components/FavoriteButton";

function FavoritesPage() {
  const [favItems, setFavItems] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavItems(savedFavorites);
  }, []);

  const handleRefresh = () => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavItems(savedFavorites);
  };

  return (
    <div>
      <Navbar />

      <div className="container mt-5 mb-5" style={{ minHeight: "65vh" }}>
        <h1 className="fw-bold text-center mb-2">My Favorites 💖</h1>
        <p className="text-muted text-center mb-5">Your personal travel list for Lebanon</p>

        {favItems.length === 0 ? (
          <div className="mt-5 p-5 border rounded bg-white shadow-sm mx-auto text-center" style={{ maxWidth: "500px" }}>
            <div className="display-1 mb-3">🌍</div>
            <h4 className="fw-bold text-secondary">Your favorites list is empty</h4>
            <p className="text-muted mt-2">Start exploring destinations to add them here.</p>
            <a href="/destinations" className="btn btn-primary mt-3 px-4 py-2">Explore</a>
          </div>
        ) : (

          <div className="row" onClick={handleRefresh}>
            {favItems.map((item, index) => (
              <div className="col-md-4 key={index}">
                <div className="card mb-4 shadow-sm">
                  
                  <FavoriteButton item={item} />

                  <img src={item.image} className="img-fluid w-100 card-img" alt={item.title} />
                  
                  <div className="card-body text-center">
                    <h5 className="fw-bold">{item.title}</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default FavoritesPage;