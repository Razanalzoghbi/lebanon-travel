import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function NotFoundPage() {
  return (
    <div>
      <Navbar />
      <div className="container text-center py-5" style={{ minHeight: "65vh" }}>
        <div className="mb-3" style={{ fontSize: "4rem" }} aria-hidden="true">
          🏔️
        </div>
        <h1 className="fw-bold" style={{ fontSize: "6rem", color: "#1d7ec9", lineHeight: 1 }}>
          404
        </h1>
        <h2 className="fw-bold mb-3">Page Not Found</h2>
        <p className="text-muted mb-4">Sorry, the page you are looking for does not exist or has been moved.</p>
        <Link to="/" className="btn custom-btn rounded-pill px-4 me-2">
          Back to Home
        </Link>
        <Link to="/destinations" className="btn btn-outline-primary rounded-pill px-4">
          Explore Destinations
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default NotFoundPage;