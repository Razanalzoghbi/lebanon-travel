import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { API } from "../auth";

function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    business_name: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Registration failed");
      } else {
        setSuccess(data.message);
      }
    } catch (err) {
      setError("Cannot reach the server. Is the backend running?");
    }
    setLoading(false);
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-5 mb-5" style={{ minHeight: "60vh", maxWidth: "450px" }}>
        <h1 className="text-center fw-bold mb-4">Create Account</h1>

        <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-white">
          {error && <div className="alert alert-danger">{error}</div>}
          {success && (
            <div className="alert alert-success">
              {success} <Link to="/login">Go to login</Link>
            </div>
          )}

          <div className="mb-3">
            <label className="form-label">I am a</label>
            <select name="role" className="form-select" value={form.role} onChange={change}>
              <option value="user">Traveler</option>
              <option value="owner">Business owner</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Full name</label>
            <input name="name" className="form-control" value={form.name} onChange={change} required />
          </div>

          {form.role === "owner" && (
            <>
              <div className="mb-3">
                <label className="form-label">Business name</label>
                <input
                  name="business_name"
                  className="form-control"
                  value={form.business_name}
                  onChange={change}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Phone</label>
                <input name="phone" className="form-control" value={form.phone} onChange={change} />
              </div>
            </>
          )}

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={form.email}
              onChange={change}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password (min 6 characters)</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={form.password}
              onChange={change}
              required
              minLength={6}
            />
          </div>

          <button type="submit" className="btn custom-btn w-100" disabled={loading}>
            {loading ? "Please wait..." : "Register"}
          </button>

          <p className="text-center mt-3 mb-0">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default RegisterPage;