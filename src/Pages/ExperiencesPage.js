import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { API, getUser } from "../auth";

const REGION_COLORS = {
  "Beirut & Mount Lebanon": "#3b82f6",
  "North Lebanon": "#f59e0b",
  "South Lebanon": "#8b5cf6",
  Bekaa: "#ef4444",
};

const CATEGORIES = [
  { value: "", label: "All types" },
  { value: "attraction", label: "Attractions" },
  { value: "restaurant", label: "Restaurants" },
  { value: "cafe", label: "Cafes" },
  { value: "hotel", label: "Hotels" },
];

function Stars({ value }) {
  if (!value) return <span className="text-muted small">No rating</span>;
  return (
    <span style={{ color: "#f5a623", fontSize: "1.1rem" }}>
      {"★".repeat(value)}
      <span style={{ color: "#ccc" }}>{"★".repeat(5 - value)}</span>
    </span>
  );
}

function ExperiencesPage() {
  const navigate = useNavigate();
  const user = getUser();
  const [regions, setRegions] = useState([]);
  const [regionId, setRegionId] = useState(0); // 0 = all regions
  const [category, setCategory] = useState(""); // "" = all types
  const [items, setItems] = useState(null);
  const [error, setError] = useState("");
  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    fetch(`${API}/api/regions`)
      .then((res) => res.json())
      .then(setRegions)
      .catch(() => {});
  }, []);

  useEffect(() => {
    setItems(null);
    setError("");
    const query = new URLSearchParams();
    if (regionId) query.set("region_id", regionId);
    if (category) query.set("category", category);
    fetch(`${API}/api/experiences?${query.toString()}`)
      .then((res) => {
        if (!res.ok) throw new Error("Could not load experiences");
        return res.json();
      })
      .then(setItems)
      .catch((err) => setError(err.message));
  }, [regionId, category]);

  const share = () => {
    if (!user) navigate("/login");
    else navigate("/share-experience");
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-5 mb-5" style={{ minHeight: "65vh" }}>
        <div className="d-flex flex-wrap justify-content-between align-items-start mb-3">
          <div>
            <h1 className="fw-bold">User Experiences</h1>
            <p className="text-muted">Real stories from travelers in Lebanon</p>
          </div>
          <button className="btn btn-success rounded-pill px-4" onClick={share}>
            + Share Your Experience
          </button>
        </div>

        <div className="mb-2 d-flex flex-wrap gap-2">
          <button
            className={`btn rounded-pill ${regionId === 0 ? "btn-primary" : "btn-outline-secondary"}`}
            onClick={() => setRegionId(0)}
          >
            All Regions
          </button>
          {regions.map((r) => (
            <button
              key={r.id}
              className={`btn rounded-pill ${regionId === r.id ? "btn-primary" : "btn-outline-secondary"}`}
              onClick={() => setRegionId(r.id)}
            >
              {r.name}
            </button>
          ))}
        </div>

        <div className="mb-4 d-flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c.value}
              className={`btn btn-sm rounded-pill ${category === c.value ? "btn-dark" : "btn-outline-dark"}`}
              onClick={() => setCategory(c.value)}
            >
              {c.label}
            </button>
          ))}
        </div>

        {error && <p className="text-danger">{error}</p>}
        {!items && !error && <p>Loading...</p>}
        {items && items.length === 0 && (
          <p className="text-muted">
            No experiences here yet. Be the first to{" "}
            <button className="btn btn-link p-0 align-baseline" onClick={share}>
              share yours
            </button>
            .
          </p>
        )}

        <div className="row g-4">
          {(items || []).map((e) => {
            const open = openId === e.id;
            const short = e.content.length > 110 ? e.content.slice(0, 110) + "..." : e.content;
            return (
              <div key={e.id} className="col-12 col-md-6 col-lg-4">
                <div className="card h-100 shadow-sm">
                  <div style={{ height: 190, position: "relative" }}>
                    {e.image ? (
                      <img
                        src={e.image}
                        alt={e.title}
                        style={{ height: 190, width: "100%", objectFit: "cover" }}
                        className="card-img-top"
                      />
                    ) : (
                      <div
                        className="d-flex align-items-center justify-content-center bg-light text-muted"
                        style={{ height: 190 }}
                      >
                        No photo
                      </div>
                    )}
                    <span
                      className="badge rounded-pill"
                      style={{
                        position: "absolute",
                        left: 10,
                        bottom: 10,
                        background: REGION_COLORS[e.region_name] || "#6c757d",
                      }}
                    >
                      {e.region_name}
                    </span>
                    <span
                      className="badge bg-dark text-capitalize"
                      style={{ position: "absolute", right: 10, bottom: 10 }}
                    >
                      {e.category}
                    </span>
                  </div>
                  <div className="card-body d-flex flex-column">
                    <h5 className="fw-bold mb-1">{e.title}</h5>
                    <div className="text-muted small mb-2">
                      by {e.user_name} | {new Date(e.created_at).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                    </div>
                    <p className="small mb-2">{open ? e.content : short}</p>
                    {open && (
                      <div className="small text-muted mb-2">
                        <span className="text-capitalize">{e.category}</span>: {e.place_name}
                        {e.location && ` · ${e.location}`}
                      </div>
                    )}
                    <div className="d-flex justify-content-between align-items-center mt-auto">
                      <Stars value={e.rating} />
                      <button
                        className="btn btn-link p-0 text-decoration-none"
                        onClick={() => setOpenId(open ? null : e.id)}
                      >
                        {open ? "Show less" : "Read more >"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {!user && (
          <p className="text-muted mt-4 small">
            Want to share your own story? <Link to="/login">Login</Link> first.
          </p>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default ExperiencesPage;