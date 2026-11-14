import React, { useState, useEffect } from "react";
import { API } from "../auth";

// A small strip with numbers: destinations, places, experiences, regions
function HomeStats() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch(`${API}/api/home`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => data && setStats(data.stats))
      .catch(() => {});
  }, []);

  if (!stats) return null;

  const items = [
    { n: stats.destinations, label: "Destinations" },
    { n: stats.places, label: "Places to visit" },
    { n: stats.experiences, label: "Traveler stories" },
    { n: stats.regions, label: "Regions" },
  ];

  return (
    <div className="container mt-5">
      <div className="row g-3 text-center">
        {items.map((it) => (
          <div key={it.label} className="col-6 col-md-3">
            <div className="p-3 rounded-4 bg-white shadow-sm h-100">
              <div className="fw-bold" style={{ fontSize: "2rem", color: "#1f7fc9" }}>
                {it.n}
              </div>
              <div className="text-muted">{it.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomeStats;