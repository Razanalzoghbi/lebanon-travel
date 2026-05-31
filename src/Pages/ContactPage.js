import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function ContactPage() {
  return (
    <div>
      <Navbar />

      <div className="container mt-5 mb-5">
        <h1 className="text-center mb-2 fw-bold">Get In Touch</h1>
        <p className="text-center text-muted mb-5">
          If you have any questions about traveling in Lebanon, feel free to contact us!
        </p>

        <div className="row g-5 align-items-center justify-content-center">
          
          <div className="col-lg-6">
            <div className="p-4 border rounded shadow-sm bg-white">
              <h4 className="mb-4 text-secondary">Send us a message</h4>
              <form onSubmit={(e) => { 
                e.preventDefault(); 
                alert("Thank you! Your message has been sent successfully. ✨"); 
                e.target.reset(); 
                }}>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input type="text" className="form-control" placeholder="Your Name" />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-control" placeholder="name@example.com" />
                </div>

                <div className="mb-3">
                  <label className="form-label">Message</label>
                  <textarea className="form-control" rows="4" placeholder="How can we help you?"></textarea>
                </div>

                <button type="submit" className="btn custom-btn w-100 mt-3">
                  Send Message
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}

export default ContactPage;