import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { API, getUser, getToken } from "../auth";

const BOOKING_BADGE = {
  pending: "bg-warning text-dark",
  confirmed: "bg-success",
  rejected: "bg-danger",
  cancelled: "bg-danger",
  completed: "bg-secondary",
};
const PLACE_BADGE = { pending: "bg-warning text-dark", approved: "bg-success", rejected: "bg-danger" };

const EMPTY = {
  name: "",
  type: "restaurant",
  destination_id: "",
  description: "",
  address: "",
  phone: "",
  opening_hours: "",
  price_range: "",
  image: "",
  area_name: "",
  latitude: "",
  longitude: "",
};

function OwnerDashboardPage() {
  const user = getUser();
  const headers = { "Content-Type": "application/json", Authorization: `Bearer ${getToken()}` };

  const [tab, setTab] = useState("bookings");
  const [bookings, setBookings] = useState([]);
  const [places, setPlaces] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("success");

  const loadBookings = useCallback(() => {
    fetch(`${API}/api/owner/bookings`, { headers })
      .then((r) => (r.ok ? r.json() : []))
      .then(setBookings);
  }, []); // eslint-disable-line

  const loadPlaces = useCallback(() => {
    fetch(`${API}/api/owner/places`, { headers })
      .then((r) => (r.ok ? r.json() : []))
      .then(setPlaces);
  }, []); // eslint-disable-line

  useEffect(() => {
    if (user && user.role === "owner") {
      loadBookings();
      loadPlaces();
      fetch(`${API}/api/destinations`)
        .then((r) => r.json())
        .then(setDestinations);
    }
  }, [loadBookings, loadPlaces]); // eslint-disable-line

  const setBookingStatus = async (id, status) => {
    const res = await fetch(`${API}/api/owner/bookings/${id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ status }),
    });
    if (!res.ok) window.alert((await res.json()).message);
    loadBookings();
    loadPlaces();
  };

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const addPlace = async (e) => {
    e.preventDefault();
    setMsg("");
    const res = await fetch(`${API}/api/owner/places`, {
      method: "POST",
      headers,
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setMsgType(res.ok ? "success" : "danger");
    setMsg(data.message);
    if (res.ok) {
      setForm(EMPTY);
      loadPlaces();
    }
  };

  if (!user || user.role !== "owner") {
    return (
      <div>
        <Navbar />
        <div className="container mt-5" style={{ minHeight: "60vh" }}>
          <p className="text-center">
            This page is for business owners only. <Link to="/login">Login</Link>
          </p>
        </div>
        <Footer />
      </div>
    );
  }

  const pendingCount = bookings.filter((b) => b.status === "pending").length;

  return (
    <div>
      <Navbar />
      <div className="container mt-5 mb-5" style={{ minHeight: "65vh" }}>
        <h1 className="fw-bold text-center mb-4">Owner Dashboard</h1>

        <ul className="nav nav-pills justify-content-center mb-4">
          {[
            ["bookings", `Bookings${pendingCount ? ` (${pendingCount})` : ""}`],
            ["places", "My places"],
            ["add", "Add a place"],
          ].map(([key, label]) => (
            <li className="nav-item" key={key}>
              <button className={`nav-link ${tab === key ? "active" : ""}`} onClick={() => setTab(key)}>
                {label}
              </button>
            </li>
          ))}
        </ul>

        {tab === "bookings" && (
          <>
            {bookings.length === 0 && (
              <p className="text-center text-muted">
                No bookings yet. You need an approved place first (see "My places").
              </p>
            )}
            {bookings.map((b) => (
              <div key={b.id} className="card mb-2 shadow-sm">
                <div className="card-body d-flex flex-wrap justify-content-between align-items-center">
                  <div>
                    <strong>{b.place_name}</strong>{" "}
                    <span className={`badge text-capitalize ${BOOKING_BADGE[b.status]}`}>{b.status}</span>
                    <div>
                      📅 {String(b.booking_date).slice(0, 10)}
                      {b.booking_time && ` · ${String(b.booking_time).slice(0, 5)}`} · 👥 {b.guests}
                    </div>
                    <div className="text-muted small">
                      {b.user_name} · {b.user_email}
                    </div>
                    {b.notes && <div className="small">{b.notes}</div>}
                  </div>
                  <div>
                    {b.status === "pending" && (
                      <>
                        <button className="btn btn-success btn-sm me-2" onClick={() => setBookingStatus(b.id, "confirmed")}>
                          Confirm
                        </button>
                        <button className="btn btn-outline-danger btn-sm" onClick={() => setBookingStatus(b.id, "rejected")}>
                          Reject
                        </button>
                      </>
                    )}
                    {b.status === "confirmed" && (
                      <button className="btn btn-outline-secondary btn-sm" onClick={() => setBookingStatus(b.id, "completed")}>
                        Mark completed
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </>
        )}

        {tab === "places" && (
          <>
            {places.length === 0 && (
              <p className="text-center text-muted">
                You have no places yet. Add a new one, or open an existing place and press "Claim this business".
              </p>
            )}
            <div className="row">
              {places.map((p) => (
                <div className="col-md-6 mb-3" key={p.id}>
                  <div className="card shadow-sm h-100">
                    <div className="card-body">
                      <div className="d-flex justify-content-between">
                        <h5 className="mb-1">
                          {p.status === "approved" ? (
                            <Link to={`/places/${p.id}`} className="text-dark text-decoration-none">
                              {p.name}
                            </Link>
                          ) : (
                            p.name
                          )}
                        </h5>
                        <span className={`badge text-capitalize align-self-start ${PLACE_BADGE[p.status]}`}>
                          {p.status}
                        </span>
                      </div>
                      <div className="text-muted text-capitalize">
                        {p.type} · {p.destination_name || p.area_name}
                      </div>
                      <div className="small mt-1">
                        {p.review_count > 0 ? `★ ${p.avg_rating} (${p.review_count})` : "No reviews yet"}
                        {p.pending_bookings > 0 && ` · ${p.pending_bookings} pending bookings`}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {tab === "add" && (
          <form onSubmit={addPlace} className="mx-auto p-4 border rounded shadow-sm bg-white" style={{ maxWidth: "600px" }}>
            {msg && <div className={`alert alert-${msgType}`}>{msg}</div>}

            <div className="row">
              <div className="col-md-8 mb-3">
                <label className="form-label">Name</label>
                <input name="name" className="form-control" value={form.name} onChange={change} required />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Type</label>
                <select name="type" className="form-select" value={form.type} onChange={change}>
                  <option value="restaurant">Restaurant</option>
                  <option value="cafe">Cafe</option>
                  <option value="hotel">Hotel</option>
                  <option value="attraction">Attraction</option>
                </select>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Destination</label>
              <select name="destination_id" className="form-select" value={form.destination_id} onChange={change}>
                <option value="">Other area (not in the list)</option>
                {destinations.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            {!form.destination_id && (
              <div className="row">
                <div className="col-12 mb-3">
                  <label className="form-label">Area name (e.g. Khaldeh)</label>
                  <input name="area_name" className="form-control" value={form.area_name} onChange={change} required />
                </div>
                <div className="col-6 mb-3">
                  <label className="form-label">Latitude</label>
                  <input name="latitude" className="form-control" placeholder="33.787" value={form.latitude} onChange={change} required />
                </div>
                <div className="col-6 mb-3">
                  <label className="form-label">Longitude</label>
                  <input name="longitude" className="form-control" placeholder="35.479" value={form.longitude} onChange={change} required />
                </div>
                <div className="col-12 mb-3 small text-muted">
                  Tip: in Google Maps, right-click the place and click the numbers to copy them.
                </div>
              </div>
            )}

            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea name="description" rows="3" className="form-control" value={form.description} onChange={change} />
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Address</label>
                <input name="address" className="form-control" value={form.address} onChange={change} />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Phone</label>
                <input name="phone" className="form-control" value={form.phone} onChange={change} />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Opening hours</label>
                <input name="opening_hours" className="form-control" placeholder="9:00 - 23:00" value={form.opening_hours} onChange={change} />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Price range</label>
                <select name="price_range" className="form-select" value={form.price_range} onChange={change}>
                  <option value="">-</option>
                  <option value="$">$</option>
                  <option value="$$">$$</option>
                  <option value="$$$">$$$</option>
                  <option value="$$$$">$$$$</option>
                </select>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Image link (URL)</label>
              <input name="image" className="form-control" placeholder="https://..." value={form.image} onChange={change} />
            </div>

            <button type="submit" className="btn custom-btn w-100">
              Send for approval
            </button>
          </form>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default OwnerDashboardPage;