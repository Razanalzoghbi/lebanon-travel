import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FavoriteButton from "./FavoriteButton";
import PlaceImage from "./PlaceImage";
import { API } from "../auth";

function Stars({ value }) {
  const full = Math.round(Number(value) || 0);
  return (
    <span style={{ color: "#f5a623" }}>
      {"★".repeat(full)}
      <span style={{ color: "#ccc" }}>{"★".repeat(5 - full)}</span>
    </span>
  );
}

// Best rated places (only shows places that have reviews)
function TopRated() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    fetch(`${API}/api/home`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => data && setPlaces(data.topPlaces))
      .catch(() => {});
  }, []);

  if (places.length === 0) return null;

  return (
    <div className="container mt-5">
      <h2 className="text-center fw-bold mb-4">Top Rated Places</h2>
      <div className="row g-4">
        {places.map((p) => (
          <div key={p.id} className="col-12 col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm position-relative">
              <FavoriteButton placeId={p.id} />
              <Link to={`/places/${p.id}`} style={{ position: "relative", display: "block" }}>
                <PlaceImage src={p.image} alt={p.name} height={190} />
                <span className="badge bg-dark text-capitalize" style={{ position: "absolute", left: 10, bottom: 10 }}>
                  {p.type}
                </span>
              </Link>
              <div className="card-body">
                <h5 className="fw-bold mb-1">
                  <Link to={`/places/${p.id}`} className="text-dark text-decoration-none">
                    {p.name}
                  </Link>
                </h5>
                <div className="text-muted small mb-2">{p.destination_name || p.area_name || ""}</div>
                <Stars value={p.avg_rating} />{" "}
                <span className="text-muted small">
                  {Number(p.avg_rating).toFixed(1)} ({p.review_count})
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopRated;