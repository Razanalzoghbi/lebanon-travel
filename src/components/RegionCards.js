import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API } from "../auth";

// one picture for each region (a destination that has a photo)
const REGION_IMAGE = {
  "Beirut & Mount Lebanon": "/images/beirut.jpeg",
  "North Lebanon": "/images/tripoli.jpeg",
  "South Lebanon": "/images/tyre.jpeg",
  Bekaa: "/images/baalbek.jpeg",
};

function RegionCards() {
  const [regions, setRegions] = useState([]);

  useEffect(() => {
    fetch(`${API}/api/destinations`)
      .then((res) => res.json())
      .then((rows) => {
        const map = {};
        rows.forEach((d) => {
          if (!map[d.region]) map[d.region] = [];
          map[d.region].push(d.name);
        });
        setRegions(Object.keys(map).map((name) => ({ name, destinations: map[name] })));
      })
      .catch(() => {});
  }, []);

  if (regions.length === 0) return null;

  return (
    <div className="container mt-5">
      <h2 className="text-center fw-bold mb-4">Explore By Region</h2>
      <div className="row g-4">
        {regions.map((r) => (
          <div key={r.name} className="col-12 col-md-6 col-lg-3">
            <Link to="/destinations" className="text-decoration-none">
              <div className="card h-100 shadow-sm border-0 overflow-hidden region-card">
                <div style={{ height: 160, overflow: "hidden" }}>
                  <img
                    src={REGION_IMAGE[r.name]}
                    alt={r.name}
                    style={{ width: "100%", height: 160, objectFit: "cover", transition: "transform .3s" }}
                    className="region-img"
                  />
                </div>
                <div className="card-body">
                  <h5 className="fw-bold text-dark">{r.name}</h5>
                  <div className="text-muted small">{r.destinations.join(" · ")}</div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <style>{`.region-card:hover .region-img { transform: scale(1.07); }`}</style>
    </div>
  );
}

export default RegionCards;