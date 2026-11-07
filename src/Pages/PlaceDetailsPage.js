import React, { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FavoriteButton from "../components/FavoriteButton";
import { API, getUser, getToken } from "../auth";

function Stars({ value }) {
  const full = Math.round(value || 0);
  return (
    <span style={{ color: "#f5a623", letterSpacing: "2px" }}>
      {"★".repeat(full)}
      <span style={{ color: "#ccc" }}>{"★".repeat(5 - full)}</span>
    </span>
  );
}

function PlaceDetailsPage() {
  const { id } = useParams();
  const user = getUser();
  const [place, setPlace] = useState(null);
  const [error, setError] = useState("");

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("success");

  // booking form
  const [bk, setBk] = useState({ booking_date: "", booking_time: "", guests: 2, notes: "" });
  const [bkMsg, setBkMsg] = useState("");
  const [bkType, setBkType] = useState("success");

  const submitBooking = async (e) => {
    e.preventDefault();
    setBkMsg("");
    const res = await fetch(`${API}/api/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ ...bk, place_id: place.id }),
    });
    const data = await res.json();
    setBkType(res.ok ? "success" : "danger");
    setBkMsg(data.message);
    if (res.ok) setBk({ booking_date: "", booking_time: "", guests: 2, notes: "" });
  };

  const [claimMsg, setClaimMsg] = useState("");

  const claimPlace = async () => {
    if (!window.confirm("Send a request to become the owner of this place?")) return;
    const res = await fetch(`${API}/api/places/${id}/claim`, {
      method: "POST",
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    const data = await res.json();
    setClaimMsg(data.message);
  };

  const load = useCallback(() => {
    fetch(`${API}/api/places/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Place not found");
        return res.json();
      })
      .then(setPlace)
      .catch((err) => setError(err.message));
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  const submitReview = async (e) => {
    e.preventDefault();
    setMsg("");
    if (rating === 0) {
      setMsgType("danger");
      setMsg("Please choose a rating");
      return;
    }
    const res = await fetch(`${API}/api/places/${id}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ rating, comment }),
    });
    const data = await res.json();
    setMsgType(res.ok ? "success" : "danger");
    setMsg(data.message);
    if (res.ok) {
      setComment("");
      load(); // refresh rating and reviews
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-5 mb-5" style={{ minHeight: "65vh" }}>
        {error && <p className="text-center text-danger">{error}</p>}
        {!place && !error && <p className="text-center">Loading...</p>}

        {place && (
          <>
            {place.destination_slug && (
              <Link to={`/${place.destination_slug}`}>← Back to {place.destination_name}</Link>
            )}

            <div className="row mt-3 g-4">
              <div className="col-lg-7">
                <div className="card position-relative">
                  <FavoriteButton item={{ title: place.name, image: place.image }} />
                  <img src={place.image} className="img-fluid w-100 card-img" alt={place.name} />
                </div>

                {place.images.length > 0 && (
                  <div className="row mt-3">
                    {place.images.map((url) => (
                      <div className="col-6" key={url}>
                        <img src={url} className="img-fluid rounded" alt={place.name} />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="col-lg-5">
                <span className="badge bg-secondary text-capitalize mb-2">{place.type}</span>
                <h1 className="fw-bold">{place.name}</h1>

                <p className="mb-2">
                  <Stars value={place.avg_rating} />{" "}
                  {place.review_count > 0
                    ? `${place.avg_rating} (${place.review_count} reviews)`
                    : "No reviews yet"}
                </p>

                {place.description && <p>{place.description}</p>}
                {place.address && <p className="mb-1">📍 {place.address}</p>}
                {place.phone && <p className="mb-1">📞 {place.phone}</p>}
                {place.opening_hours && <p className="mb-1">🕒 {place.opening_hours}</p>}

                {user && user.role === "owner" && !place.claimed && (
                  <div className="mt-3">
                    <button className="btn btn-outline-primary btn-sm" onClick={claimPlace}>
                      Claim this business
                    </button>
                    {claimMsg && <div className="small mt-1">{claimMsg}</div>}
                  </div>
                )}

                {place.type !== "attraction" && (
                  <div className="border rounded p-3 mt-4 bg-white shadow-sm">
                    <h5>{place.type === "hotel" ? "Book a room" : "Book a table"}</h5>

                    {!user && (
                      <p className="mb-0">
                        <Link to="/login">Login</Link> to make a booking.
                      </p>
                    )}
                    {user && user.role !== "user" && (
                      <p className="mb-0 text-muted">Only travelers can make bookings.</p>
                    )}

                    {user && user.role === "user" && (
                      <form onSubmit={submitBooking}>
                        {bkMsg && <div className={`alert alert-${bkType} py-2`}>{bkMsg}</div>}

                        <div className="mb-2">
                          <label className="form-label mb-1">
                            {place.type === "hotel" ? "Check-in date" : "Date"}
                          </label>
                          <input
                            type="date"
                            className="form-control"
                            required
                            min={new Date().toISOString().slice(0, 10)}
                            value={bk.booking_date}
                            onChange={(e) => setBk({ ...bk, booking_date: e.target.value })}
                          />
                        </div>

                        {place.type !== "hotel" && (
                          <div className="mb-2">
                            <label className="form-label mb-1">Time</label>
                            <input
                              type="time"
                              className="form-control"
                              required
                              value={bk.booking_time}
                              onChange={(e) => setBk({ ...bk, booking_time: e.target.value })}
                            />
                          </div>
                        )}

                        <div className="mb-2">
                          <label className="form-label mb-1">Guests</label>
                          <input
                            type="number"
                            className="form-control"
                            min="1"
                            max="50"
                            required
                            value={bk.guests}
                            onChange={(e) => setBk({ ...bk, guests: e.target.value })}
                          />
                        </div>

                        <div className="mb-3">
                          <label className="form-label mb-1">
                            Notes {place.type === "hotel" && "(number of nights, room type...)"}
                          </label>
                          <textarea
                            className="form-control"
                            rows="2"
                            value={bk.notes}
                            onChange={(e) => setBk({ ...bk, notes: e.target.value })}
                          />
                        </div>

                        <button type="submit" className="btn custom-btn w-100">
                          Send booking request
                        </button>
                        <small className="d-block mt-2">
                          <Link to="/my-bookings">See my bookings</Link>
                        </small>
                      </form>
                    )}
                  </div>
                )}
              </div>
            </div>

            <hr className="my-5" />

            <h3 className="mb-3">Reviews</h3>
            <div className="row g-4">
              <div className="col-lg-7">
                {place.reviews.length === 0 && (
                  <p className="text-muted">Be the first to review this place.</p>
                )}
                {place.reviews.map((r) => (
                  <div key={r.id} className="border rounded p-3 mb-3 bg-white">
                    <div className="d-flex justify-content-between">
                      <strong>{r.user_name}</strong>
                      <small className="text-muted">
                        {new Date(r.created_at).toLocaleDateString()}
                      </small>
                    </div>
                    <Stars value={r.rating} />
                    {r.comment && <p className="mb-0 mt-1">{r.comment}</p>}
                  </div>
                ))}
              </div>

              <div className="col-lg-5">
                <div className="border rounded p-3 bg-white shadow-sm">
                  <h5>Write a review</h5>

                  {!user && (
                    <p className="mb-0">
                      <Link to="/login">Login</Link> to write a review.
                    </p>
                  )}

                  {user && user.role !== "user" && (
                    <p className="mb-0 text-muted">Only travelers can write reviews.</p>
                  )}

                  {user && user.role === "user" && (
                    <form onSubmit={submitReview}>
                      {msg && <div className={`alert alert-${msgType} py-2`}>{msg}</div>}

                      <div className="mb-2" style={{ fontSize: "1.8rem" }}>
                        {[1, 2, 3, 4, 5].map((n) => (
                          <span
                            key={n}
                            onClick={() => setRating(n)}
                            style={{
                              cursor: "pointer",
                              color: n <= rating ? "#f5a623" : "#ccc",
                            }}
                          >
                            ★
                          </span>
                        ))}
                      </div>

                      <textarea
                        className="form-control mb-3"
                        rows="3"
                        placeholder="Share your experience (optional)"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
                      <button type="submit" className="btn custom-btn w-100">
                        Submit review
                      </button>
                      <small className="text-muted d-block mt-2">
                        Writing again updates your previous review.
                      </small>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default PlaceDetailsPage;