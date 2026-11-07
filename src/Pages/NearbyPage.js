import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FavoriteButton from "../components/FavoriteButton";
import PlaceImage from "../components/PlaceImage";
import { API } from "../auth";

function NearbyPage() {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    setData(null);
    setError("");
    fetch(`${API}/api/destinations/${slug}/nearby`)
      .then((res) => {
        if (!res.ok) throw new Error("Destination not found");
        return res.json();
      })
      .then(setData)
      .catch((err) => setError(err.message));
  }, [slug]);

  return (
    <div>
      <Navbar />
      <div className="container mt-5 mb-5" style={{ minHeight: "65vh" }}>
        {error && <p className="text-center text-danger">{error}</p>}
        {!data && !error && <p className="text-center">Loading...</p>}

        {data && (
          <>
            <Link to={`/${data.destination.slug}`}>← Back to {data.destination.name}</Link>
            <h1 className="text-center fw-bold mt-3 mb-2">Nearby {data.destination.name}</h1>
            <p className="text-center text-muted mb-5">
              Places you might want to visit, close to {data.destination.name}.
            </p>

            {data.places.length === 0 && (
              <p className="text-center text-muted">No nearby suggestions yet.</p>
            )}

            <div className="row">
              {data.places.map((p) => (
                <div className="col-md-6 col-lg-4" key={p.id}>
                  <div className="card mb-4 h-100 position-relative">
                    <FavoriteButton item={{ title: p.name, image: p.image }} />
                    <Link to={`/places/${p.id}`}>
                      <PlaceImage src={p.image} alt={p.name} />
                    </Link>
                    <div className="card-body text-center">
                      <h5>{p.name}</h5>
                      <div className="mb-1">
                        <span className="badge bg-primary me-1">{p.distance_km} km away</span>
                        <span className="badge bg-secondary text-capitalize">{p.type}</span>
                      </div>
                      <div className="text-muted small mb-2">{p.area_name}</div>
                      {p.description && <p className="small">{p.description}</p>}
                      <small className="text-muted d-block mb-2">
                        {p.review_count > 0 ? `★ ${p.avg_rating} (${p.review_count})` : "No reviews yet"}
                      </small>
                      <Link to={`/places/${p.id}`} className="btn custom-btn btn-sm">
                        {p.type === "attraction" ? "View details" : "Book now"}
                      </Link>
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

export default NearbyPage;