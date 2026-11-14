import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { API, getUser, getToken } from "../auth";

function ShareExperiencePage() {
  const user = getUser();
  const [regions, setRegions] = useState([]);
  const [form, setForm] = useState({
    title: "",
    place_name: "",
    category: "attraction",
    region_id: "",
    location: "",
    content: "",
    image_url: "",
  });
  const [rating, setRating] = useState(0); // 0 = no rating (optional)
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(`${API}/api/regions`)
      .then((res) => res.json())
      .then(setRegions)
      .catch(() => {});
  }, []);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.region_id) {
      setError("Please choose a region");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch(`${API}/api/experiences`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ ...form, rating }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Something went wrong");
      } else {
        setMsg(data.message);
        setSent(true);
      }
    } catch (err) {
      setError("Cannot reach the server. Is the backend running?");
    }
    setSaving(false);
  };

  if (!user || user.role !== "user") {
    return (
      <div>
        <Navbar />
        <div className="container mt-5" style={{ minHeight: "60vh" }}>
          <p className="text-center">
            Only travelers can share experiences. <Link to="/login">Login</Link> with a traveler account.
          </p>
        </div>
        <Footer />
      </div>
    );
  }

  if (sent) {
    return (
      <div>
        <Navbar />
        <div className="container mt-5 text-center" style={{ minHeight: "60vh" }}>
          <h3 className="fw-bold">Thank you!</h3>
          <p>{msg}</p>
          <Link to="/experiences" className="btn btn-primary">
            Back to Experiences
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="container mt-5 mb-5" style={{ maxWidth: 650, minHeight: "65vh" }}>
        <h1 className="fw-bold mb-1">Share Your Experience</h1>
        <p className="text-muted">The admin will review it before it appears on the site.</p>

        <form onSubmit={submit}>
          <div className="mb-3">
            <label className="form-label">Title *</label>
            <input className="form-control" name="title" value={form.title} onChange={change} maxLength={150} required />
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Place name *</label>
              <input
                className="form-control"
                name="place_name"
                value={form.place_name}
                onChange={change}
                maxLength={150}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Category *</label>
              <select className="form-select" name="category" value={form.category} onChange={change}>
                <option value="attraction">Attraction</option>
                <option value="restaurant">Restaurant</option>
                <option value="cafe">Cafe</option>
                <option value="hotel">Hotel</option>
              </select>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Region *</label>
              <select className="form-select" name="region_id" value={form.region_id} onChange={change} required>
                <option value="">Choose a region</option>
                {regions.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Location (optional)</label>
              <input
                className="form-control"
                name="location"
                value={form.location}
                onChange={change}
                maxLength={255}
                placeholder="Town or address"
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Your experience *</label>
            <textarea
              className="form-control"
              name="content"
              rows={5}
              value={form.content}
              onChange={change}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label d-block">Rating (optional)</label>
            {[1, 2, 3, 4, 5].map((n) => (
              <span
                key={n}
                onClick={() => setRating(n === rating ? 0 : n)}
                style={{ cursor: "pointer", fontSize: "1.8rem", color: n <= rating ? "#f5a623" : "#ccc" }}
              >
                ★
              </span>
            ))}
            {rating > 0 && <span className="text-muted small ms-2">Click the same star again to remove</span>}
          </div>

          <div className="mb-4">
            <label className="form-label">Photo link (optional)</label>
            <input
              className="form-control"
              name="image_url"
              value={form.image_url}
              onChange={change}
              placeholder="https://..."
            />
            <div className="form-text">Photo upload will be added later. For now, paste a link to your photo.</div>
          </div>

          {error && <p className="text-danger">{error}</p>}
          <button className="btn btn-success px-4" disabled={saving}>
            {saving ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default ShareExperiencePage;