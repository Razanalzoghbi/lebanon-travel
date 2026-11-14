import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API } from "../auth";

// The newest approved traveler stories
function LatestExperiences() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`${API}/api/home`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => data && setItems(data.latestExperiences))
      .catch(() => {});
  }, []);

  if (items.length === 0) return null;

  return (
    <div className="container mt-5">
      <h2 className="text-center fw-bold mb-4">Latest Traveler Stories</h2>
      <div className="row g-4">
        {items.map((e) => (
          <div key={e.id} className="col-12 col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm">
              {e.image && (
                <img src={e.image} alt={e.title} style={{ height: 170, width: "100%", objectFit: "cover" }} className="card-img-top" />
              )}
              <div className="card-body d-flex flex-column">
                <span className="badge bg-secondary align-self-start mb-2">{e.region_name}</span>
                <h5 className="fw-bold">{e.title}</h5>
                <p className="small text-muted mb-2">
                  {e.content.length > 100 ? e.content.slice(0, 100) + "..." : e.content}
                </p>
                <div className="mt-auto small text-muted">by {e.user_name}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-4">
        <Link to="/experiences" className="btn btn-outline-primary rounded-pill px-4">
          See all stories
        </Link>
      </div>
    </div>
  );
}

export default LatestExperiences;