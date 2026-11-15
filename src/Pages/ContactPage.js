import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { API } from "../auth";

const EMPTY = { name: "", email: "", message: "" };

const HELP = [
  {
    icon: "🗺️",
    title: "Planning a trip?",
    text: "Browse our destinations or ask the AI assistant for ideas.",
    to: "/destinations",
    link: "Explore destinations",
  },
  {
    icon: "🏪",
    title: "Own a business?",
    text: "Create an owner account and add your restaurant, cafe or hotel.",
    to: "/register",
    link: "Join as an owner",
  },
  {
    icon: "📸",
    title: "Been somewhere nice?",
    text: "Share your story and photos with other travelers.",
    to: "/share-experience",
    link: "Share an experience",
  },
];

function ContactPage() {
  const [form, setForm] = useState(EMPTY);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setSending(true);
    try {
      const res = await fetch(`${API}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setSent(true);
        setForm(EMPTY);
      } else {
        setError(data.message || "Something went wrong");
      }
    } catch (err) {
      setError("Cannot reach the server. Is the backend running?");
    }
    setSending(false);
  };

  return (
    <div>
      <Navbar />

      <style>{`
        .contact-card { transition: transform .2s ease, box-shadow .2s ease; }
        .contact-card:hover { transform: translateY(-3px); box-shadow: 0 .5rem 1rem rgba(0,0,0,.12) !important; }
        @keyframes contactFade { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: none; } }
        .contact-fade { animation: contactFade .5s ease both; }
      `}</style>

      <div className="container mt-5 mb-5">
        <div className="contact-fade">
          <h1 className="text-center mb-2 fw-bold">Get In Touch</h1>
          <p className="text-center text-muted mb-5">
            If you have any questions about traveling in Lebanon, feel free to contact us!
          </p>
        </div>

        <div className="row g-4 justify-content-center">
          <div className="col-lg-6 contact-fade">
            <div className="p-4 border rounded shadow-sm bg-white h-100">
              <h4 className="mb-4 text-secondary">Send us a message</h4>

              {sent ? (
                <div className="text-center py-4">
                  <div style={{ fontSize: "3rem" }}>✨</div>
                  <h5 className="fw-bold mt-2">Thank you!</h5>
                  <p className="text-muted">We received your message and will get back to you soon.</p>
                  <button className="btn btn-outline-primary rounded-pill px-4" onClick={() => setSent(false)}>
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={submit}>
                  {error && <div className="alert alert-danger py-2">{error}</div>}

                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Your Name"
                      value={form.name}
                      onChange={change}
                      maxLength={100}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="name@example.com"
                      value={form.email}
                      onChange={change}
                      maxLength={150}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Message</label>
                    <textarea
                      name="message"
                      className="form-control"
                      rows="4"
                      placeholder="How can we help you?"
                      value={form.message}
                      onChange={change}
                      maxLength={3000}
                      required
                    ></textarea>
                  </div>

                  <button type="submit" className="btn custom-btn w-100 mt-3" disabled={sending}>
                    {sending ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </div>
          </div>

          <div className="col-lg-5 contact-fade" style={{ animationDelay: ".15s" }}>
            {HELP.map((h) => (
              <div key={h.title} className="contact-card p-3 border rounded shadow-sm bg-white mb-3 d-flex">
                <div className="me-3" style={{ fontSize: "2rem" }}>
                  {h.icon}
                </div>
                <div>
                  <h6 className="fw-bold mb-1">{h.title}</h6>
                  <p className="small text-muted mb-1">{h.text}</p>
                  <Link to={h.to} className="small fw-semibold text-decoration-none">
                    {h.link} →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default ContactPage;