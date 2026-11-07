import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { API, getUser, getToken } from "../auth";

const BADGE = {
  pending: "bg-warning text-dark",
  confirmed: "bg-success",
  rejected: "bg-danger",
  cancelled: "bg-danger",
  completed: "bg-secondary",
};

function MyBookingsPage() {
  const user = getUser();
  const [bookings, setBookings] = useState(null);
  const [error, setError] = useState("");

  const load = useCallback(() => {
    fetch(`${API}/api/bookings/mine`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Please log in again");
        return res.json();
      })
      .then(setBookings)
      .catch((err) => setError(err.message));
  }, []);

  useEffect(() => {
    if (user) load();
  }, [load]); // eslint-disable-line

  const cancel = async (id) => {
    if (!window.confirm("Cancel this booking?")) return;
    await fetch(`${API}/api/bookings/${id}/cancel`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    load();
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-5 mb-5" style={{ minHeight: "65vh", maxWidth: "800px" }}>
        <h1 className="fw-bold text-center mb-4">My Bookings</h1>

        {!user && (
          <p className="text-center">
            <Link to="/login">Login</Link> to see your bookings.
          </p>
        )}
        {error && <p className="text-center text-danger">{error}</p>}
        {user && !bookings && !error && <p className="text-center">Loading...</p>}

        {bookings && bookings.length === 0 && (
          <p className="text-center text-muted">
            No bookings yet. <Link to="/destinations">Explore destinations</Link>
          </p>
        )}

        {bookings &&
          bookings.map((b) => (
            <div key={b.id} className="card mb-3 shadow-sm">
              <div className="row g-0 align-items-center">
                <div className="col-4 col-md-3">
                  <img src={b.place_image} alt={b.place_name} className="img-fluid rounded-start" />
                </div>
                <div className="col-8 col-md-9">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start">
                      <h5 className="mb-1">
                        <Link to={`/places/${b.place_id}`} className="text-dark text-decoration-none">
                          {b.place_name}
                        </Link>
                      </h5>
                      <span className={`badge text-capitalize ${BADGE[b.status]}`}>{b.status}</span>
                    </div>
                    <p className="mb-1 text-muted text-capitalize">{b.place_type}</p>
                    <p className="mb-1">
                      📅 {String(b.booking_date).slice(0, 10)}
                      {b.booking_time && ` · ${String(b.booking_time).slice(0, 5)}`} · 👥 {b.guests}
                    </p>
                    {b.notes && <p className="mb-1 small">{b.notes}</p>}
                    {(b.status === "pending" || b.status === "confirmed") && (
                      <button className="btn btn-outline-danger btn-sm" onClick={() => cancel(b.id)}>
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      <Footer />
    </div>
  );
}

export default MyBookingsPage;