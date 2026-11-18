import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ImageUpload from "../components/ImageUpload";
import { API, getUser, getToken } from "../auth";

const MAX_PHOTOS = 5;

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
  });
  const [images, setImages] = useState([]); // up to MAX_PHOTOS photo links
  const [rating, setRating] = useState(0); // 0 = no rating (optional)
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [saving, setSaving] = useState(false);

  // link the experience to a place that exists on the site (optional)
  const [searchParams] = useSearchParams();
  const [placeId, setPlaceId] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  // coming from a place page: /share-experience?place=12
  useEffect(() => {
    const pid = searchParams.get("place");
    if (!pid) return;
    fetch(`${API}/api/places/${pid}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((p) => {
        if (!p) return;
        setPlaceId(p.id);
        setForm((f) => ({
          ...f,
          place_name: p.name,
          category: p.type,
          region_id: p.region_id ? String(p.region_id) : f.region_id,
        }));
      })
      .catch(() => {});
  }, [searchParams]);

  // suggestions while typing the place name
  useEffect(() => {
    const q = form.place_name.trim();
    if (placeId || q.length < 2) {
      setSuggestions([]);
      return;
    }
    const t = setTimeout(() => {
      fetch(`${API}/api/places/suggest?q=${encodeURIComponent(q)}`)
        .then((res) => res.json())
        .then(setSuggestions)
        .catch(() => {});
    }, 250);
    return () => clearTimeout(t);
  }, [form.place_name, placeId]);

  const choosePlace = (p) => {
    setPlaceId(p.id);
    setSuggestions([]);
    setForm((f) => ({
      ...f,
      place_name: p.name,
      category: p.type,
      region_id: p.region_id ? String(p.region_id) : f.region_id,
    }));
  };

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
        body: JSON.stringify({ ...form, images, rating, place_id: placeId }),
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
            <div className="col-md-6 mb-3 position-relative">
              <label className="form-label">Place name *</label>
              <input
                className="form-control"
                name="place_name"
                value={form.place_name}
                onChange={(e) => {
                  setPlaceId(null); // typing again = not linked anymore
                  change(e);
                }}
                maxLength={150}
                autoComplete="off"
                required
              />
              {placeId && <div className="form-text text-success">✓ This place is on our site</div>}
              {suggestions.length > 0 && (
                <div className="list-group position-absolute w-100 shadow" style={{ zIndex: 10 }}>
                  {suggestions.map((p) => (
                    <button
                      type="button"
                      key={p.id}
                      className="list-group-item list-group-item-action py-2"
                      onClick={() => choosePlace(p)}
                    >
                      {p.name}
                      <small className="text-muted text-capitalize">
                        {" "}
                        · {p.type} · {p.destination_name || p.area_name}
                      </small>
                    </button>
                  ))}
                </div>
              )}
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
            <label className="form-label">
              Photos (optional, up to {MAX_PHOTOS}) <span className="text-muted small">{images.length}/{MAX_PHOTOS}</span>
            </label>
            {images.length > 0 && (
              <div className="d-flex flex-wrap gap-2 mb-2">
                {images.map((url, i) => (
                  <div key={url + i} style={{ position: "relative" }}>
                    <img
                      src={url}
                      alt={`Preview ${i + 1}`}
                      style={{ height: 90, width: 120, objectFit: "cover", borderRadius: 8 }}
                    />
                    <button
                      type="button"
                      className="btn btn-sm btn-danger"
                      style={{ position: "absolute", top: 4, right: 4, padding: "0 6px", lineHeight: 1.4 }}
                      title="Remove photo"
                      onClick={() => setImages(images.filter((_, k) => k !== i))}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
            {images.length < MAX_PHOTOS ? (
              <ImageUpload
                key={images.length /* resets the file box after each upload */}
                value=""
                onChange={(url) => url && setImages([...images, url])}
              />
            ) : (
              <div className="form-text">You reached the maximum of {MAX_PHOTOS} photos.</div>
            )}
            {images.length > 0 && images.length < MAX_PHOTOS && (
              <div className="form-text">Choose another photo to add more.</div>
            )}
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