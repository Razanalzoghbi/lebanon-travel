import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { API, getUser, getToken } from "../auth";

const BADGE = {
  active: "bg-success",
  pending: "bg-warning text-dark",
  blocked: "bg-danger",
  suspended: "bg-secondary",
};

function AdminDashboardPage() {
  const user = getUser();
  const [users, setUsers] = useState(null);
  const [error, setError] = useState("");
  const [claims, setClaims] = useState([]);
  const [newPlaces, setNewPlaces] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [missedSearches, setMissedSearches] = useState([]);
  const [messages, setMessages] = useState([]);
  const [reviews, setReviews] = useState([]);

  const loadPlaces = useCallback(() => {
    fetch(`${API}/api/admin/places`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
      .then((res) => (res.ok ? res.json() : []))
      .then(setNewPlaces);
  }, []);

  const decidePlace = async (id, status) => {
    await fetch(`${API}/api/admin/places/${id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ status }),
    });
    loadPlaces();
  };

  const loadExperiences = useCallback(() => {
    fetch(`${API}/api/admin/experiences`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
      .then((res) => (res.ok ? res.json() : []))
      .then(setExperiences);
  }, []);

  const decideExperience = async (id, status) => {
    await fetch(`${API}/api/admin/experiences/${id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ status }),
    });
    loadExperiences();
  };

  const loadMissedSearches = useCallback(() => {
    fetch(`${API}/api/admin/search-logs`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
      .then((res) => (res.ok ? res.json() : []))
      .then(setMissedSearches);
  }, []);

  const loadMessages = useCallback(() => {
    fetch(`${API}/api/admin/messages`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
      .then((res) => (res.ok ? res.json() : []))
      .then(setMessages);
  }, []);

  const deleteMessage = async (id) => {
    if (!window.confirm("Delete this message?")) return;
    await fetch(`${API}/api/admin/messages/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    loadMessages();
  };

  const loadReviews = useCallback(() => {
    fetch(`${API}/api/admin/reviews`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
      .then((res) => (res.ok ? res.json() : []))
      .then(setReviews);
  }, []);

  const setReviewStatus = async (id, status) => {
    await fetch(`${API}/api/admin/reviews/${id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ status }),
    });
    loadReviews();
  };

  const loadClaims = useCallback(() => {
    fetch(`${API}/api/admin/claims`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
      .then((res) => (res.ok ? res.json() : []))
      .then(setClaims);
  }, []);

  const decideClaim = async (id, status) => {
    const res = await fetch(`${API}/api/admin/claims/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) {
      const data = await res.json();
      window.alert(data.message);
    }
    loadClaims();
  };

  const load = useCallback(() => {
    fetch(`${API}/api/admin/users`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Not allowed");
        return res.json();
      })
      .then(setUsers)
      .catch((err) => setError(err.message));
  }, []);

  useEffect(() => {
    if (user && user.role === "admin") {
      load();
      loadClaims();
      loadPlaces();
      loadExperiences();
      loadMissedSearches();
      loadMessages();
      loadReviews();
    }
  }, [load, loadClaims, loadPlaces, loadExperiences, loadMissedSearches, loadMessages, loadReviews]); // eslint-disable-line

  const setStatus = async (id, status) => {
    await fetch(`${API}/api/admin/users/${id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ status }),
    });
    load();
  };

  if (!user || user.role !== "admin") {
    return (
      <div>
        <Navbar />
        <div className="container mt-5" style={{ minHeight: "60vh" }}>
          <p className="text-center">
            This page is for the admin only. <Link to="/login">Login</Link>
          </p>
        </div>
        <Footer />
      </div>
    );
  }

  const pendingOwners = (users || []).filter((u) => u.role === "owner" && u.status === "pending");
  const others = (users || []).filter((u) => u.role !== "admin" && !(u.role === "owner" && u.status === "pending"));

  return (
    <div>
      <Navbar />
      <div className="container mt-5 mb-5" style={{ minHeight: "65vh" }}>
        <h1 className="fw-bold text-center mb-4">Admin Dashboard</h1>
        {error && <p className="text-danger text-center">{error}</p>}
        {!users && !error && <p className="text-center">Loading...</p>}

        {users && (
          <>
            <h4>Business owners waiting for approval ({pendingOwners.length})</h4>
            {pendingOwners.length === 0 && <p className="text-muted">No requests right now.</p>}
            {pendingOwners.map((o) => (
              <div key={o.id} className="card mb-2 shadow-sm">
                <div className="card-body d-flex flex-wrap justify-content-between align-items-center">
                  <div>
                    <strong>{o.business_name}</strong>
                    <div className="text-muted small">
                      {o.name} · {o.email} {o.phone && `· ${o.phone}`}
                    </div>
                  </div>
                  <div>
                    <button className="btn btn-success btn-sm me-2" onClick={() => setStatus(o.id, "active")}>
                      Approve
                    </button>
                    <button className="btn btn-outline-danger btn-sm" onClick={() => setStatus(o.id, "blocked")}>
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <h4 className="mt-5">New places waiting for approval ({newPlaces.length})</h4>
            {newPlaces.length === 0 && <p className="text-muted">No new places right now.</p>}
            {newPlaces.map((p) => (
              <div key={p.id} className="card mb-2 shadow-sm">
                <div className="card-body d-flex flex-wrap justify-content-between align-items-center">
                  <div>
                    <strong>{p.name}</strong>{" "}
                    <span className="badge bg-secondary text-capitalize">{p.type}</span>
                    <div className="text-muted small">
                      {p.destination_name || p.area_name} · by {p.business_name || p.owner_email}
                    </div>
                    {p.description && <div className="small">{p.description}</div>}
                  </div>
                  <div>
                    <button className="btn btn-success btn-sm me-2" onClick={() => decidePlace(p.id, "approved")}>
                      Approve
                    </button>
                    <button className="btn btn-outline-danger btn-sm" onClick={() => decidePlace(p.id, "rejected")}>
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <h4 className="mt-5">Experiences waiting for approval ({experiences.length})</h4>
            {experiences.length === 0 && <p className="text-muted">No new experiences right now.</p>}
            {experiences.map((e) => (
              <div key={e.id} className="card mb-2 shadow-sm">
                <div className="card-body d-flex flex-wrap justify-content-between align-items-start">
                  <div style={{ maxWidth: "75%" }}>
                    <strong>{e.title}</strong>{" "}
                    <span className="badge bg-secondary text-capitalize">{e.category}</span>
                    <div className="text-muted small">
                      {e.place_name} · {e.region_name} · by {e.user_name} ({e.user_email})
                      {e.rating && ` · ${e.rating}/5`}
                    </div>
                    <div className="small mt-1">{e.content}</div>
                    {e.image && (
                      <a href={e.image} target="_blank" rel="noreferrer" className="small">
                        View photo
                      </a>
                    )}
                  </div>
                  <div>
                    <button className="btn btn-success btn-sm me-2" onClick={() => decideExperience(e.id, "approved")}>
                      Approve
                    </button>
                    <button className="btn btn-outline-danger btn-sm" onClick={() => decideExperience(e.id, "rejected")}>
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <h4 className="mt-5">Place claims waiting for approval ({claims.length})</h4>
            {claims.length === 0 && <p className="text-muted">No claims right now.</p>}
            {claims.map((c) => (
              <div key={c.id} className="card mb-2 shadow-sm">
                <div className="card-body d-flex flex-wrap justify-content-between align-items-center">
                  <div>
                    <strong>{c.place_name}</strong>{" "}
                    <span className="badge bg-secondary text-capitalize">{c.place_type}</span>
                    <div className="text-muted small">
                      Requested by {c.business_name || c.user_name} · {c.email}
                      {c.phone && ` · ${c.phone}`}
                    </div>
                  </div>
                  <div>
                    <button className="btn btn-success btn-sm me-2" onClick={() => decideClaim(c.id, "approved")}>
                      Approve
                    </button>
                    <button className="btn btn-outline-danger btn-sm" onClick={() => decideClaim(c.id, "rejected")}>
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <h4 className="mt-5">Searches with no results</h4>
            <p className="text-muted small">
              What visitors looked for and we do not have yet. Good ideas for new places.
            </p>
            {missedSearches.length === 0 && <p className="text-muted">No missed searches yet.</p>}
            {missedSearches.length > 0 && (
              <div className="table-responsive">
                <table className="table table-sm align-middle bg-white">
                  <thead>
                    <tr>
                      <th>Search</th>
                      <th>Times</th>
                      <th>Last searched</th>
                    </tr>
                  </thead>
                  <tbody>
                    {missedSearches.map((m) => (
                      <tr key={m.query}>
                        <td>{m.query}</td>
                        <td>
                          <span className="badge bg-secondary">{m.times}</span>
                        </td>
                        <td className="text-muted small">{new Date(m.last_seen).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <h4 className="mt-5">Contact messages</h4>
            {messages.length === 0 && <p className="text-muted">No messages yet.</p>}
            {messages.map((m) => (
              <div key={m.id} className="card mb-2 shadow-sm">
                <div className="card-body d-flex justify-content-between align-items-start">
                  <div>
                    <strong>{m.name}</strong>{" "}
                    <a href={`mailto:${m.email}`} className="small">
                      {m.email}
                    </a>
                    <div className="text-muted small">{new Date(m.created_at).toLocaleString()}</div>
                    <div className="mt-2" style={{ whiteSpace: "pre-wrap" }}>
                      {m.message}
                    </div>
                  </div>
                  <button className="btn btn-outline-danger btn-sm ms-3" onClick={() => deleteMessage(m.id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}

            <h4 className="mt-5">Reviews ({reviews.length})</h4>
            <p className="text-muted small">Hide a review that is rude or fake. It stays in the database but visitors will not see it and it will not count in the rating.</p>
            {reviews.length === 0 && <p className="text-muted">No reviews yet.</p>}
            {reviews.map((r) => (
              <div key={r.id} className={`card mb-2 shadow-sm ${r.status === "hidden" ? "bg-light" : ""}`}>
                <div className="card-body d-flex justify-content-between align-items-start">
                  <div style={r.status === "hidden" ? { opacity: 0.6 } : undefined}>
                    <strong>{r.user_name}</strong> on{" "}
                    <a href={`/places/${r.place_id}`} target="_blank" rel="noreferrer">
                      {r.place_name}
                    </a>{" "}
                    <span style={{ color: "#f5a623" }}>{"★".repeat(r.rating)}</span>
                    <span className="text-muted">{"★".repeat(5 - r.rating)}</span>
                    {r.status === "hidden" && <span className="badge bg-secondary ms-2">Hidden</span>}
                    <div className="text-muted small">{new Date(r.created_at).toLocaleString()}</div>
                    {r.comment && (
                      <div className="mt-2" style={{ whiteSpace: "pre-wrap" }}>
                        {r.comment}
                      </div>
                    )}
                  </div>
                  {r.status === "hidden" ? (
                    <button className="btn btn-outline-success btn-sm ms-3" onClick={() => setReviewStatus(r.id, "visible")}>
                      Show
                    </button>
                  ) : (
                    <button className="btn btn-outline-danger btn-sm ms-3" onClick={() => setReviewStatus(r.id, "hidden")}>
                      Hide
                    </button>
                  )}
                </div>
              </div>
            ))}

            <h4 className="mt-5">All users</h4>
            <div className="table-responsive">
              <table className="table table-hover align-middle bg-white">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {others.map((u) => (
                    <tr key={u.id}>
                      <td>{u.name}</td>
                      <td>{u.email}</td>
                      <td className="text-capitalize">{u.role}</td>
                      <td>
                        <span className={`badge text-capitalize ${BADGE[u.status]}`}>{u.status}</span>
                      </td>
                      <td className="text-end">
                        {u.status === "blocked" ? (
                          <button className="btn btn-outline-success btn-sm" onClick={() => setStatus(u.id, "active")}>
                            Unblock
                          </button>
                        ) : (
                          <button className="btn btn-outline-danger btn-sm" onClick={() => setStatus(u.id, "blocked")}>
                            Block
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default AdminDashboardPage;