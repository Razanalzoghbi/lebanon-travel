import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ImageUpload from "../components/ImageUpload";
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
  images: [],
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
  const [editingId, setEditingId] = useState(null); // null = adding a new place
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

  const savePlace = async (e) => {
    e.preventDefault();
    setMsg("");
    const res = await fetch(`${API}/api/owner/places${editingId ? `/${editingId}` : ""}`, {
      method: editingId ? "PATCH" : "POST",
      headers,
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setMsgType(res.ok ? "success" : "danger");
    setMsg(data.message);
    if (res.ok) {
      setForm(EMPTY);
      setEditingId(null);
      loadPlaces();
      setTab("places");
    }
  };

  const startEdit = (p) => {
    setForm({
      name: p.name || "",
      type: p.type || "restaurant",
      destination_id: p.destination_id ? String(p.destination_id) : "",
      description: p.description || "",
      address: p.address || "",
      phone: p.phone || "",
      opening_hours: p.opening_hours || "",
      price_range: p.price_range || "",
      image: p.image || "",
      images: p.images || [],
      area_name: p.area_name || "",
      latitude: p.latitude ?? "",
      longitude: p.longitude ?? "",
    });
    setEditingId(p.id);
    setMsg("");
    setTab("add");
  };

  const cancelEdit = () => {
    setForm(EMPTY);
    setEditingId(null);
    setMsg("");
    setTab("places");
  };

  const deletePlace = async (p) => {
    if (!window.confirm(`Delete "${p.name}"? Its reviews and favorites will be deleted too. This cannot be undone.`)) {
      return;
    }
    const res = await fetch(`${API}/api/owner/places/${p.id}`, { method: "DELETE", headers });
    const data = await res.json();
    if (!res.ok) {
      window.alert(data.message);
      return;
    }
    setMsgType("success");
    setMsg(data.message);
    loadPlaces();
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

        <style>{`
          .owner-tabs .nav-link { color: #0d6efd !important; background: transparent !important; }
          .owner-tabs .nav-link:hover { color: #0a58ca !important; background: #e7f0ff !important; }
          .owner-tabs .nav-link.active, .owner-tabs .nav-link.active:hover { color: #fff !important; background: #0d6efd !important; }
        `}</style>
        <ul className="nav nav-pills justify-content-center mb-4 owner-tabs">
          {[
            ["bookings", `Bookings${pendingCount ? ` (${pendingCount})` : ""}`],
            ["places", "My places"],
            ["add", editingId ? "Edit place" : "Add a place"],
          ].map(([key, label]) => (
            <li className="nav-item" key={key}>
              <button
                className={`nav-link ${tab === key ? "active" : ""}`}
                onClick={() => {
                  if (key === "add" && tab !== "add" && !editingId) setForm(EMPTY);
                  setTab(key);
                }}
              >
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
            {msg && tab === "places" && <div className={`alert alert-${msgType}`}>{msg}</div>}
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
                      <div className="mt-3">
                        <button className="btn btn-outline-primary btn-sm me-2" onClick={() => startEdit(p)}>
                          Edit
                        </button>
                        <button className="btn btn-outline-danger btn-sm" onClick={() => deletePlace(p)}>
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {tab === "add" && (
          <form onSubmit={savePlace} className="mx-auto p-4 border rounded shadow-sm bg-white" style={{ maxWidth: "600px" }}>
            {editingId && <h5 className="mb-3">Edit place</h5>}
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
              <label className="form-label">Main photo</label>
              <ImageUpload value={form.image} onChange={(url) => setForm({ ...form, image: url })} />
            </div>

            <div className="mb-3">
              <label className="form-label">More photos (optional)</label>
              {form.images.length > 0 && (
                <div className="d-flex flex-wrap gap-2 mb-2">
                  {form.images.map((url, i) => (
                    <div key={url + i} className="position-relative">
                      <img src={url} alt="" style={{ width: 90, height: 70, objectFit: "cover", borderRadius: 6 }} />
                      <button
                        type="button"
                        className="btn btn-danger btn-sm position-absolute top-0 end-0 py-0 px-1"
                        style={{ lineHeight: 1.2 }}
                        onClick={() => setForm({ ...form, images: form.images.filter((_, j) => j !== i) })}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
              {form.images.length < 10 && (
                <ImageUpload value="" onChange={(url) => url && setForm({ ...form, images: [...form.images, url] })} />
              )}
              <div className="form-text">These photos show under the main photo on the place page.</div>
            </div>

            <button type="submit" className="btn custom-btn w-100">
              {editingId ? "Save changes" : "Send for approval"}
            </button>
            {editingId && (
              <button type="button" className="btn btn-link w-100 mt-2" onClick={cancelEdit}>
                Cancel
              </button>
            )}
          </form>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default OwnerDashboardPage;