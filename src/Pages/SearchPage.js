import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FavoriteButton from "../components/FavoriteButton";
import PlaceImage from "../components/PlaceImage";
import SearchBar from "../components/SearchBar";
import { API } from "../auth";

const TYPES = [
  { value: "", label: "All types" },
  { value: "attraction", label: "Attractions" },
  { value: "restaurant", label: "Restaurants" },
  { value: "cafe", label: "Cafes" },
  { value: "hotel", label: "Hotels" },
];

const BADGE_COLORS = {
  attraction: "#10b981",
  restaurant: "#f59e0b",
  cafe: "#8b5cf6",
  hotel: "#3b82f6",
};

function Stars({ value }) {
  const full = Math.round(value || 0);
  if (!full) return <span className="text-muted small">No ratings yet</span>;
  return (
    <span style={{ color: "#f5a623" }}>
      {"★".repeat(full)}
      <span style={{ color: "#ccc" }}>{"★".repeat(5 - full)}</span>
    </span>
  );
}

function SearchPage() {
  const [params, setParams] = useSearchParams();
  const q = params.get("q") || "";
  const type = params.get("type") || "";
  const regionId = params.get("region_id") || "";
  const minRating = params.get("min_rating") || "";

  const [regions, setRegions] = useState([]);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${API}/api/regions`)
      .then((res) => res.json())
      .then(setRegions)
      .catch(() => {});
  }, []);

  useEffect(() => {
    setData(null);
    setError("");
    const query = new URLSearchParams();
    if (q) query.set("q", q);
    if (type) query.set("type", type);
    if (regionId) query.set("region_id", regionId);
    if (minRating) query.set("min_rating", minRating);
    fetch(`${API}/api/search?${query.toString()}`)
      .then((res) => {
        if (!res.ok) throw new Error("Search failed, please try again");
        return res.json();
      })
      .then(setData)
      .catch((err) => setError(err.message));
  }, [q, type, regionId, minRating]);

  // change one filter and keep the others
  const setFilter = (name, value) => {
    const next = new URLSearchParams(params);
    if (value) next.set(name, value);
    else next.delete(name);
    setParams(next);
  };

  const hasSomething = q || type || regionId || minRating;
  const nothingFound = data && data.places.length === 0 && data.destinations.length === 0;

  return (
    <div>
      <Navbar />
      <div className="container mt-5 mb-5" style={{ minHeight: "65vh" }}>
        <h1 className="fw-bold text-center mb-3">Search</h1>
        <div className="d-flex justify-content-center mb-4">
          <div className="w-100" style={{ maxWidth: 640 }}>
            <SearchBar key={q} initial={q} />
          </div>
        </div>

        <div className="row g-2 justify-content-center mb-4">
          <div className="col-6 col-md-3">
            <select className="form-select" value={type} onChange={(e) => setFilter("type", e.target.value)}>
              {TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>
          <div className="col-6 col-md-3">
            <select className="form-select" value={regionId} onChange={(e) => setFilter("region_id", e.target.value)}>
              <option value="">All regions</option>
              {regions.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-6 col-md-3">
            <select className="form-select" value={minRating} onChange={(e) => setFilter("min_rating", e.target.value)}>
              <option value="">Any rating</option>
              <option value="3">3★ and up</option>
              <option value="4">4★ and up</option>
              <option value="4.5">4.5★ and up</option>
            </select>
          </div>
          {(type || regionId || minRating) && (
            <div className="col-6 col-md-2">
              <button
                className="btn btn-outline-secondary w-100"
                onClick={() => {
                  const next = new URLSearchParams();
                  if (q) next.set("q", q);
                  setParams(next);
                }}
              >
                Clear filters
              </button>
            </div>
          )}
        </div>

        {!hasSomething && (
          <p className="text-center text-muted">
            Type a name, a town or a place type above, or choose a filter.
          </p>
        )}
        {error && <p className="text-danger text-center">{error}</p>}
        {hasSomething && !data && !error && <p className="text-center">Searching...</p>}

        {nothingFound && (
          <div className="text-center my-5">
            <div style={{ fontSize: "3rem" }}>🔍</div>
            <h4 className="fw-bold mt-2">
              {q ? `No results for "${q}"` : "No places match these filters"}
            </h4>
            <p className="text-muted">
              Check the spelling, try a shorter word, or remove a filter.
              {q && " We noted your search, so we can add it soon."}
            </p>
            <Link to="/destinations" className="btn btn-primary rounded-pill px-4">
              Browse destinations
            </Link>
          </div>
        )}

        {data && data.destinations.length > 0 && (
          <>
            <h5 className="fw-bold">Destinations</h5>
            <div className="d-flex flex-wrap gap-2 mb-4">
              {data.destinations.map((d) => (
                <Link key={d.id} to={`/${d.slug}`} className="btn btn-outline-primary rounded-pill">
                  {d.name} <span className="text-muted small">· {d.region}</span>
                </Link>
              ))}
            </div>
          </>
        )}

        {data && data.places.length > 0 && (
          <>
            <h5 className="fw-bold">Places ({data.places.length})</h5>
            <div className="row g-4 mt-0">
              {data.places.map((p) => (
                <div key={p.id} className="col-12 col-md-6 col-lg-4">
                  <div className="card h-100 shadow-sm position-relative">
                    <FavoriteButton placeId={p.id} />
                    <Link to={`/places/${p.id}`} style={{ position: "relative", display: "block" }}>
                      <PlaceImage src={p.image} alt={p.name} height={190} />
                      <span
                        className="badge rounded-pill text-capitalize"
                        style={{ position: "absolute", left: 10, bottom: 10, background: BADGE_COLORS[p.type] }}
                      >
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
                      <Stars value={p.avg_rating} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default SearchPage;