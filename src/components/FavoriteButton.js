import React, { useState, useEffect } from "react";

function FavoriteButton({ item }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const exists = savedFavorites.some((fav) => fav.title === item.title);
    setIsFavorite(exists);
  }, [item.title]);

  const toggleFavorite = (e) => {
    e.preventDefault();
    
    let savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (isFavorite) {
      savedFavorites = savedFavorites.filter((fav) => fav.title !== item.title);
    } else {
      savedFavorites.push(item);
    }

    localStorage.setItem("favorites", JSON.stringify(savedFavorites));
    setIsFavorite(!isFavorite);
  };

  return (
    <button className="fav-btn" onClick={toggleFavorite}>
      <span className="heart-icon" style={{ color: isFavorite ? "#dc3545" : "#6c757d" }}>
        {isFavorite ? "♥" : "♡"}
      </span>
    </button>
  );
}

export default FavoriteButton;