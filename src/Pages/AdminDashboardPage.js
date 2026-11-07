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
    if (user && user.role === "admin") load();
  }, [load]); // eslint-disable-line

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