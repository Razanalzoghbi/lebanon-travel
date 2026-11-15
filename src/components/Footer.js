import { Link } from "react-router-dom";

const STYLE = `
  .footer-link { color: rgba(255,255,255,.88); text-decoration: none; display: inline-block; transition: color .2s, transform .2s; }
  .footer-link:hover { color: #fff; transform: translateX(4px); }
  .footer-title { font-size: 1.1rem; font-weight: 700; margin-bottom: 1rem; position: relative; padding-bottom: .5rem; }
  .footer-title::after { content: ""; position: absolute; left: 0; bottom: 0; width: 36px; height: 3px; border-radius: 3px; background: rgba(255,255,255,.75); }
  .footer-info { display: flex; align-items: center; gap: .6rem; margin-bottom: .6rem; }
  .footer-info-icon {
    width: 32px; height: 32px; border-radius: 50%; background: rgba(255,255,255,.18);
    display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: .95rem;
  }
`;

function Footer() {
  return (
    <footer className="footer text-white pt-5">
      <style>{STYLE}</style>

      <div className="container">
        <div className="row">
          {/* About */}
          <div className="col-md-4 mb-4">
            <h4 className="fw-bold">Lebanon Travel</h4>
            <p style={{ opacity: 0.92 }}>
              Discover the beauty of Lebanon, its culture, food, nature, and amazing destinations.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-4">
            <div className="footer-title">Quick Links</div>
            <ul className="list-unstyled mb-0">
              <li className="mb-2">
                <Link to="/" className="footer-link">
                  Home
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/destinations" className="footer-link">
                  Destinations
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/experiences" className="footer-link">
                  Experiences
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/about" className="footer-link">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="footer-link">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-md-4 mb-4">
            <div className="footer-title">Contact Info</div>

            <div className="footer-info">
              <span className="footer-info-icon">✉️</span>
              <a href="mailto:lebanontravel@gmail.com" className="footer-link">
                lebanontravel.lb@gmail.com
              </a>
            </div>

            <div className="footer-info">
              <span className="footer-info-icon">📞</span>
              <a href="tel:+96171558059" className="footer-link">
                +961 71 558 059
              </a>
            </div>

            <div className="footer-info">
              <span className="footer-info-icon">📍</span>
              <span>Beirut, Lebanon</span>
            </div>
          </div>
        </div>

        <hr className="border-light" style={{ opacity: 0.3 }} />

        <div className="text-center pb-3">
          <p className="mb-0 small" style={{ opacity: 0.9 }}>
            © 2026 Lebanon Travel | All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;