import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { API, getUser, getToken } from "../auth";

const TYPE_LABEL = { attraction: "Attraction", restaurant: "Restaurant", cafe: "Cafe", hotel: "Hotel" };

function MyReviewsPage() {
  const user = getUser();
  const [reviews, setReviews] = useState(null);
  const [error, setError] = useState("");

  const load = useCallback(() => {
    fetch(`${API}/api/reviews/mine`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Please log in again");
        return res.json();
      })
      .then(setReviews)
      .catch((err) => setError(err.message));
  }, []);

  useEffect(() => {
    if (user) load();
  }, [load]); // eslint-disable-line

  const remove = async (id) => {
    if (!window.confirm("Delete this review?")) return;
    await fetch(`${API}/api/reviews/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    load();
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-5 mb-5" style={{ minHeight: "65vh", maxWidth: "800px" }}>
        <h1 className="fw-bold text-center mb-1">My Reviews</h1>
        <p className="text-center text-muted mb-4">The reviews you wrote about places in Lebanon.</p>

        {!user && (
          <p className="text-center">
            <Link to="/login">Login</Link> to see your reviews.
          </p>
        )}
        {error && <p className="text-center text-danger">{error}</p>}
        {user && !reviews && !error && <p className="text-center">Loading...</p>}

        {reviews && reviews.length === 0 && (
          <p className="text-center text-muted">
            You have not written any review yet. <Link to="/destinations">Explore destinations</Link> and share what you think.
          </p>
        )}

        {reviews &&
          reviews.map((r) => (
            <div key={r.id} className="card mb-3 shadow-sm">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start flex-wrap gap-2">
                  <div>
                    <Link to={`/places/${r.place_id}`} className="fw-bold text-decoration-none fs-5">
                      {r.place_name}
                    </Link>
                    <span className="badge bg-light text-dark border ms-2">{TYPE_LABEL[r.place_type] || r.place_type}</span>
                    <div>
                      <span style={{ color: "#f5a623", fontSize: "1.1rem" }}>{"★".repeat(r.rating)}</span>
                      <span className="text-muted">{"★".repeat(5 - r.rating)}</span>
                      <span className="text-muted small ms-2">{new Date(r.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                  {r.status === "hidden" && <span className="badge bg-secondary">Hidden by admin</span>}
                </div>

                {r.comment && (
                  <p className="mt-2 mb-0" style={{ whiteSpace: "pre-wrap" }}>
                    {r.comment}
                  </p>
                )}

                <div className="mt-3 d-flex gap-2">
                  <Link to={`/places/${r.place_id}`} className="btn btn-outline-primary btn-sm">
                    View / edit on the place page
                  </Link>
                  <button className="btn btn-outline-danger btn-sm" onClick={() => remove(r.id)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
      <Footer />
    </div>
  );
}

export default MyReviewsPage;