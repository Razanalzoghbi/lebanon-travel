import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FavoriteButton from "../components/FavoriteButton";
import PlaceImage from "../components/PlaceImage";
import { API, getUser, getToken } from "../auth";

const FILTERS = [
  { value: "all", label: "All" },
  { value: "attraction", label: "Attractions" },
  { value: "restaurant", label: "Restaurants" },
  { value: "cafe", label: "Cafes" },
  { value: "hotel", label: "Hotels" },
  { value: "experience", label: "Experiences" },
];

const BADGE_COLORS = {
  attraction: "#10b981",
  restaurant: "#f59e0b",
  cafe: "#8b5cf6",
  hotel: "#3b82f6",
  experience: "#ec4899",
};

function Stars({ value }) {
  const full = Math.round(value || 0);
  if (!full) return <span className="text-muted small">No rating yet</span>;
  return (
    <span style={{ color: "#f5a623" }}>
      {"★".repeat(full)}
      <span style={{ color: "#ccc" }}>{"★".repeat(5 - full)}</span>
    </span>
  );
}

function FavoritesPage() {
  const user = getUser();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (!user || user.role !== "user") return;
    fetch(`${API}/api/favorites`, { headers: { Authorization: `Bearer ${getToken()}` } })
      .then((res) => {
        if (!res.ok) throw new Error("Could not load your favorites");
        return res.json();
      })
      .then(setData)
      .catch((err) => setError(err.message));
  }, []); // eslint-disable-line

  if (!user || user.role !== "user") {
    return (
      <div>
        <Navbar />
        <div className="container mt-5" style={{ minHeight: "60vh" }}>
          <h1 className="fw-bold">My Favorites</h1>
          <p className="text-muted">
            Your favorites are saved on your account. <Link to="/login">Login</Link> as a traveler to see them.
          </p>
        </div>
        <Footer />
      </div>
    );
  }

  // one list for places and experiences
  const all = data
    ? [
        ...data.places.map((p) => ({ ...p, kind: "places", filterType: p.type })),
        ...data.experiences.map((e) => ({ ...e, kind: "experiences", filterType: "experience" })),
      ]
    : [];
  const shown = filter === "all" ? all : all.filter((x) => x.filterType === filter);

  const removeFromList = (kind, id) => {
    setData((d) => ({ ...d, [kind]: d[kind].filter((x) => x.id !== id) }));
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-5 mb-5" style={{ minHeight: "65vh" }}>
        <style>{`
          @keyframes favFloat { 0%,100% { transform: translateY(0) rotate(-4deg); } 50% { transform: translateY(-14px) rotate(4deg); } }
          @keyframes favPulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.2); } }
          @keyframes favRise { 0% { opacity: 0; transform: translateY(10px) scale(0.6); } 40% { opacity: 1; } 100% { opacity: 0; transform: translateY(-46px) scale(1.1); } }
          .fav-empty-icon { display: inline-block; font-size: 4.2rem; animation: favFloat 3s ease-in-out infinite; }
          .fav-heart { position: absolute; color: #ff6b81; animation: favRise 3s ease-in infinite; }
          .fav-explore { transition: transform 0.2s, box-shadow 0.2s; }
          .fav-explore:hover { transform: translateY(-3px) scale(1.04); box-shadow: 0 8px 18px rgba(13,110,253,0.35); }
          .fav-explore .fav-btn-heart { display: inline-block; animation: favPulse 1.4s ease-in-out infinite; }
        `}</style>

        <h1 className="fw-bold text-center">
          My Favorites <span style={{ color: "#e53935" }}>💖</span>
        </h1>
        <p className="text-muted text-center">Your personal travel list for Lebanon</p>

        <div className="d-flex flex-wrap align-items-center justify-content-center gap-2 mb-4">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              className={`btn rounded-pill ${filter === f.value ? "btn-primary" : "btn-outline-secondary"}`}
              onClick={() => setFilter(f.value)}
            >
              {f.label}
            </button>
          ))}
          <span className="ms-auto text-muted small">{all.length} saved</span>
        </div>

        {error && <p className="text-danger">{error}</p>}
        {!data && !error && <p>Loading...</p>}
        {data && all.length === 0 && (
          <div
            className="card shadow-sm border-0 text-center mx-auto my-4 p-4 p-md-5"
            style={{ maxWidth: 520, borderRadius: 24 }}
          >
            <div style={{ position: "relative", height: 110 }}>
              <span className="fav-heart" style={{ left: "30%", top: 30, animationDelay: "0s", fontSize: "1.1rem" }}>♥</span>
              <span className="fav-heart" style={{ left: "62%", top: 20, animationDelay: "1s", fontSize: "1.4rem" }}>♥</span>
              <span className="fav-heart" style={{ left: "48%", top: 40, animationDelay: "2s", fontSize: "0.9rem" }}>♥</span>
              <span className="fav-empty-icon">🧳</span>
            </div>
            <h4 className="fw-bold mt-2">Nothing saved yet</h4>
            <p className="text-muted mb-4">
              Find a place you love, tap the <span style={{ color: "#e53935" }}>♥</span> and it will wait for
              you here.
            </p>
            <div>
              <Link to="/destinations" className="btn btn-primary btn-lg rounded-pill px-4 fav-explore">
                <span className="fav-btn-heart">♥</span> Start exploring
              </Link>
            </div>
          </div>
        )}
        {data && all.length > 0 && shown.length === 0 && (
          <p className="text-muted text-center">Nothing in this category yet.</p>
        )}

        <div className="row g-4">
          {shown.map((x) => {
            const isPlace = x.kind === "places";
            const bookable = isPlace && x.type !== "attraction";
            return (
              <div key={`${x.kind}-${x.id}`} className="col-12 col-md-6 col-lg-4">
                <div className="card h-100 shadow-sm position-relative">
                  <FavoriteButton
                    placeId={isPlace ? x.id : undefined}
                    experienceId={!isPlace ? x.id : undefined}
                    onChange={(now) => {
                      if (!now) removeFromList(x.kind, x.id);
                    }}
                  />
                  <div style={{ position: "relative" }}>
                    {isPlace ? (
                      <PlaceImage src={x.image} alt={x.name} height={190} />
                    ) : x.image ? (
                      <img src={x.image} alt={x.title} style={{ height: 190, width: "100%", objectFit: "cover" }} />
                    ) : (
                      <div
                        className="d-flex align-items-center justify-content-center bg-light text-muted"
                        style={{ height: 190 }}
                      >
                        No photo
                      </div>
                    )}
                    <span
                      className="badge rounded-pill text-capitalize"
                      style={{
                        position: "absolute",
                        left: 10,
                        bottom: 10,
                        background: BADGE_COLORS[x.filterType],
                      }}
                    >
                      {x.filterType}
                    </span>
                  </div>
                  <div className="card-body d-flex flex-column">
                    <h5 className="fw-bold mb-1">{isPlace ? x.name : x.title}</h5>
                    <div className="text-muted small mb-2">
                      {isPlace ? x.destination_name || x.area_name || "" : `by ${x.user_name} · ${x.region_name}`}
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-auto">
                      <Stars value={isPlace ? x.avg_rating : x.rating} />
                      {isPlace ? (
                        <Link to={`/places/${x.id}`} className={`btn btn-sm rounded-pill px-3 ${bookable ? "btn-primary" : "btn-outline-primary"}`}>
                          {bookable ? "Book" : "View"}
                        </Link>
                      ) : (
                        <Link to="/experiences" className="btn btn-sm btn-outline-primary rounded-pill px-3">
                          View
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default FavoritesPage;