import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FavoriteButton from "../components/FavoriteButton";

const API = "http://localhost:5000";

const SECTIONS = [
  { type: "attraction", title: "Attractions", id: "attractions", btn: "btn-outline-primary" },
  { type: "restaurant", title: "Restaurants", id: "restaurants", btn: "btn-outline-success" },
  { type: "cafe", title: "Cafes", id: "cafes", btn: "btn-outline-warning" },
  { type: "hotel", title: "Hotels", id: "hotels", btn: "btn-outline-danger" },
];

function DestinationPage() {
  const { slug } = useParams();
  const [dest, setDest] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    setDest(null);
    setError("");
    fetch(`${API}/api/destinations/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error("Destination not found");
        return res.json();
      })
      .then((data) => setDest(data))
      .catch((err) => setError(err.message));
  }, [slug]);

  return (
    <div>
      <Navbar />

      <div className="container mt-5" style={{ minHeight: "65vh" }}>
        {error && <p className="text-center text-danger">{error}</p>}
        {!dest && !error && <p className="text-center">Loading...</p>}

        {dest && (
          <>
            <h1 className="text-center mb-4">Explore {dest.name}</h1>

            <div className="text-center mb-4">
              {SECTIONS.map((s) => (
                <a key={s.id} href={`#${s.id}`} className={`btn ${s.btn} m-1`}>
                  {s.title}
                </a>
              ))}
            </div>

            <img src={dest.image} className="img-fluid mb-5 hero-img" alt={dest.name} />

            {SECTIONS.map((s) => {
              const items = dest.places.filter((p) => p.type === s.type);
              if (items.length === 0) return null;
              return (
                <div key={s.id}>
                  <h2 id={s.id}>{s.title}</h2>
                  <div className="row">
                    {items.map((p) => (
                      <div className="col-md-6" key={p.id}>
                        <div className="card mb-4">
                          <FavoriteButton item={{ title: p.name, image: p.image }} />
                          <Link to={`/places/${p.id}`}>
                            <img src={p.image} className="img-fluid w-100 card-img" alt={p.name} />
                          </Link>
                          <div className="card-body text-center">
                            <h5>
                              <Link to={`/places/${p.id}`} className="text-dark text-decoration-none">
                                {p.name}
                              </Link>
                            </h5>
                            <small className="text-muted">
                              {p.review_count > 0
                                ? `★ ${p.avg_rating} (${p.review_count})`
                                : "No reviews yet"}
                            </small>
                            <div className="mt-2">
                              <Link to={`/places/${p.id}`} className="btn custom-btn btn-sm">
                                {p.type === "attraction" ? "View details" : "Book now"}
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default DestinationPage;