import React, { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FavoriteButton from "../components/FavoriteButton";
import PlaceMap from "../components/PlaceMap";
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

const TYPES = {
  attraction: { label: "Attraction", icon: "🏛️", color: "#1f7fc9" },
  restaurant: { label: "Restaurant", icon: "🍽️", color: "#2e9e5b" },
  cafe: { label: "Cafe", icon: "☕", color: "#d98a1c" },
  hotel: { label: "Hotel", icon: "🏨", color: "#c8452f" },
};

const STYLE = `
  .pd-main { position: relative; aspect-ratio: 16 / 10; overflow: hidden; border-radius: 18px; background: #eef1f4; }
  .pd-main img { width: 100%; height: 100%; object-fit: cover; }
  .pd-type {
    position: absolute; left: 14px; bottom: 14px; background: rgba(255,255,255,.95);
    border-radius: 999px; padding: .2rem .8rem; font-size: .85rem; font-weight: 600;
  }
  .pd-thumbs { display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px; margin-top: 10px; }
  .pd-thumb {
    aspect-ratio: 4 / 3; border-radius: 10px; overflow: hidden; cursor: pointer; padding: 0;
    border: 3px solid transparent; opacity: .75; transition: opacity .2s, border-color .2s; background: #eef1f4;
  }
  .pd-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .pd-thumb:hover { opacity: 1; }
  .pd-thumb.active { border-color: #1f7fc9; opacity: 1; }
  .pd-info { display: flex; align-items: flex-start; gap: .7rem; margin-bottom: .6rem; }
  .pd-info-icon {
    flex: 0 0 34px; height: 34px; border-radius: 50%; background: #eaf3fb;
    display: flex; align-items: center; justify-content: center; font-size: 1rem;
  }
  .pd-card { border: 1px solid #e6e9ee; border-radius: 16px; background: #fff; box-shadow: 0 2px 10px rgba(0,0,0,.05); }
  .pd-avatar {
    width: 40px; height: 40px; border-radius: 50%; background: #1c4f8f; color: #fff; font-weight: 700;
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }
  .pd-bar { height: 8px; background: #edf0f3; border-radius: 99px; overflow: hidden; }
  .pd-bar > div { height: 100%; background: #f5a623; }
  .pd-section-title { border-left: 5px solid #1f7fc9; padding-left: .75rem; }
`;

function Avatar({ name }) {
  return <div className="pd-avatar">{(name || "?").trim().charAt(0).toUpperCase()}</div>;
}

function PlaceDetailsPage() {
  const { id } = useParams();
  const user = getUser();
  const [place, setPlace] = useState(null);
  const [error, setError] = useState("");
  const [activeImg, setActiveImg] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [experiences, setExperiences] = useState([]);

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
    setActiveImg(0);
    load();
  }, [load]);

  useEffect(() => {
    fetch(`${API}/api/places/${id}/experiences`)
      .then((res) => (res.ok ? res.json() : []))
      .then(setExperiences)
      .catch(() => {});
  }, [id]);

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

  // main photo first, then the gallery photos
  const photos = place ? [place.image, ...place.images].filter((u, i, a) => u && a.indexOf(u) === i) : [];
  const shown = photos[Math.min(activeImg, Math.max(photos.length - 1, 0))];
  const t = place ? TYPES[place.type] || TYPES.attraction : null;
  const counts = [5, 4, 3, 2, 1].map((n) => (place ? place.reviews.filter((r) => r.rating === n).length : 0));

  return (
    <div>
      <style>{STYLE}</style>
      <Navbar />
      <div className="container mt-4 mb-5" style={{ minHeight: "65vh" }}>
        {error && <p className="text-center text-danger">{error}</p>}
        {!place && !error && <p className="text-center">Loading...</p>}

        {place && (
          <>
            {place.destination_slug ? (
              <Link to={`/${place.destination_slug}`} className="text-decoration-none">
                ← Back to {place.destination_name}
              </Link>
            ) : (
              <Link to="/destinations" className="text-decoration-none">
                ← Back to destinations
              </Link>
            )}

            <div className="row mt-3 g-4">
              <div className="col-lg-7">
                <div className="pd-main shadow-sm">
                  <FavoriteButton placeId={place.id} />
                  {shown ? (
                    <img src={shown} alt={place.name} />
                  ) : (
                    <div className="h-100 d-flex align-items-center justify-content-center text-muted">
                      No photo yet
                    </div>
                  )}
                  <span className="pd-type" style={{ color: t.color }}>
                    {t.icon} {t.label}
                  </span>
                </div>

                {photos.length > 1 && (
                  <div className="pd-thumbs">
                    {photos.slice(0, 10).map((url, i) => (
                      <button
                        type="button"
                        key={url}
                        className={`pd-thumb ${i === activeImg ? "active" : ""}`}
                        onClick={() => setActiveImg(i)}
                        aria-label={`Photo ${i + 1}`}
                      >
                        <img src={url} alt="" loading="lazy" />
                      </button>
                    ))}
                  </div>
                )}

                <PlaceMap
                  lat={place.latitude ?? place.dest_latitude}
                  lng={place.longitude ?? place.dest_longitude}
                  name={place.name}
                  approximate={place.latitude == null || place.longitude == null}
                />
              </div>

              <div className="col-lg-5">
                <h1 className="fw-bold mb-2" style={{ fontSize: "2rem" }}>
                  {place.name}
                </h1>

                <div className="d-flex align-items-center flex-wrap gap-2 mb-3">
                  <Stars value={place.avg_rating} />
                  <span>
                    {place.review_count > 0 ? (
                      <>
                        <strong>{place.avg_rating}</strong>{" "}
                        <span className="text-muted">({place.review_count} reviews)</span>
                      </>
                    ) : (
                      <span className="text-muted">No reviews yet</span>
                    )}
                  </span>
                  {place.price_range && <span className="badge bg-light text-dark border">{place.price_range}</span>}
                </div>

                {place.description && <p className="text-muted">{place.description}</p>}

                <div className="mb-3">
                  {place.address && (
                    <div className="pd-info">
                      <div className="pd-info-icon">📍</div>
                      <div>{place.address}</div>
                    </div>
                  )}
                  {place.phone && (
                    <div className="pd-info">
                      <div className="pd-info-icon">📞</div>
                      <div>{place.phone}</div>
                    </div>
                  )}
                  {place.opening_hours && (
                    <div className="pd-info">
                      <div className="pd-info-icon">🕒</div>
                      <div>{place.opening_hours}</div>
                    </div>
                  )}
                </div>

                {user && user.role === "owner" && !place.claimed && (
                  <div className="mb-3">
                    <button className="btn btn-outline-primary btn-sm" onClick={claimPlace}>
                      Claim this business
                    </button>
                    {claimMsg && <div className="small mt-1">{claimMsg}</div>}
                  </div>
                )}

                {place.type !== "attraction" && (
                  <div className="pd-card p-3 mt-3">
                    <h5 className="fw-bold">{place.type === "hotel" ? "Book a room" : "Book a table"}</h5>

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

                        <div className="row g-2 mb-2">
                          <div className={place.type === "hotel" ? "col-12" : "col-7"}>
                            <label className="form-label mb-1 small">
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
                            <div className="col-5">
                              <label className="form-label mb-1 small">Time</label>
                              <input
                                type="time"
                                className="form-control"
                                required
                                value={bk.booking_time}
                                onChange={(e) => setBk({ ...bk, booking_time: e.target.value })}
                              />
                            </div>
                          )}
                        </div>

                        <div className="mb-2">
                          <label className="form-label mb-1 small">Guests</label>
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
                          <label className="form-label mb-1 small">
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

            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4">
              <h3 className="pd-section-title fw-bold mb-0">Experiences at this place</h3>
              {user && user.role === "user" && (
                <Link to={`/share-experience?place=${place.id}`} className="btn btn-outline-success btn-sm rounded-pill">
                  + Share your experience here
                </Link>
              )}
            </div>
            {experiences.length === 0 && (
              <div className="pd-card text-center text-muted p-4 mb-4">
                <div style={{ fontSize: "1.8rem" }}>📸</div>
                No experiences shared about this place yet.
              </div>
            )}
            <div className="row g-3 mb-4">
              {experiences.map((x) => (
                <div className="col-md-6" key={x.id}>
                  <div className="pd-card p-3 h-100">
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <Avatar name={x.user_name} />
                      <div className="flex-grow-1">
                        <strong>{x.user_name}</strong>
                        <div className="text-muted small">{new Date(x.created_at).toLocaleDateString()}</div>
                      </div>
                      {x.rating && <Stars value={x.rating} />}
                    </div>
                    <h6 className="fw-bold">{x.title}</h6>
                    {x.images.length > 0 && (
                      <div className="d-flex gap-2 mb-2">
                        {x.images.slice(0, 3).map((url) => (
                          <img
                            key={url}
                            src={url}
                            alt=""
                            loading="lazy"
                            style={{ flex: 1, minWidth: 0, height: 110, objectFit: "cover", borderRadius: 8 }}
                          />
                        ))}
                      </div>
                    )}
                    <p className="mb-0 small">{x.content}</p>
                  </div>
                </div>
              ))}
            </div>

            <hr className="my-5" />

            <h3 className="pd-section-title fw-bold mb-4">Reviews</h3>
            <div className="row g-4">
              <div className="col-lg-7">
                {place.review_count > 0 && (
                  <div className="pd-card p-3 mb-3 d-flex align-items-center gap-4 flex-wrap">
                    <div className="text-center">
                      <div style={{ fontSize: "2.6rem", fontWeight: 700, lineHeight: 1 }}>{place.avg_rating}</div>
                      <Stars value={place.avg_rating} />
                      <div className="text-muted small">{place.review_count} reviews</div>
                    </div>
                    <div className="flex-grow-1" style={{ minWidth: 160 }}>
                      {[5, 4, 3, 2, 1].map((n, i) => (
                        <div key={n} className="d-flex align-items-center gap-2 small mb-1">
                          <span style={{ width: 12 }}>{n}</span>
                          <div className="pd-bar flex-grow-1">
                            <div style={{ width: `${(counts[i] / place.review_count) * 100}%` }} />
                          </div>
                          <span className="text-muted" style={{ width: 20 }}>
                            {counts[i]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {place.reviews.length === 0 && (
                  <div className="pd-card text-center text-muted p-4">
                    <div style={{ fontSize: "1.8rem" }}>⭐</div>
                    Be the first to review this place.
                  </div>
                )}
                {place.reviews.map((r) => (
                  <div key={r.id} className="pd-card p-3 mb-3">
                    <div className="d-flex align-items-center gap-2 mb-1">
                      <Avatar name={r.user_name} />
                      <div className="flex-grow-1">
                        <strong>{r.user_name}</strong>
                        <div className="text-muted small">{new Date(r.created_at).toLocaleDateString()}</div>
                      </div>
                      <Stars value={r.rating} />
                    </div>
                    {r.comment && <p className="mb-0 mt-2">{r.comment}</p>}
                  </div>
                ))}
              </div>

              <div className="col-lg-5">
                <div className="pd-card p-3">
                  <h5 className="fw-bold">Write a review</h5>

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

                      <div className="mb-2" style={{ fontSize: "1.8rem" }} onMouseLeave={() => setHoverRating(0)}>
                        {[1, 2, 3, 4, 5].map((n) => (
                          <span
                            key={n}
                            onClick={() => setRating(n)}
                            onMouseEnter={() => setHoverRating(n)}
                            style={{
                              cursor: "pointer",
                              color: n <= (hoverRating || rating) ? "#f5a623" : "#ccc",
                              transition: "color .15s",
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