
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

        <div className="row g-5 align-items-center">
          
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

          <div className="col-lg-6">
            <div className="p-4 rounded text-white" style={{ backgroundColor: '#0979a8' }}>
              <h4 className="mb-4 fw-bold" style={{color: '#f2d3a7' }}> Contact Information </h4>
              <p className="mb-4">
                We are here to help you plan your perfect trip across Lebanon. Drop us a line or call anytime!
              </p>
              
              <div className="mb-3">
                <h5>📍 Location</h5>
                <p className="ms-4 text-light">Beirut, Lebanon</p>
              </div>

              <div className="mb-3">
                <h5>📞 Phone Number</h5>
                <p className="ms-4 text-light">+961 71 558 059</p>
              </div>

              <div className="mb-0">
                <h5>✉️ Email Address</h5>
                <p className="ms-4 text-light">lebanontravel@gmail.com</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}

export default ContactPage;