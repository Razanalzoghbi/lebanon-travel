import { Link } from "react-router-dom";

function Footer() {
  return (

    <footer className="footer text-white pt-4">

      <div className="container">

        <div className="row">

          {/* About */}
          <div className="col-md-4 mb-3">

            <h4>Lebanon Travel</h4>

            <p>
              Discover the beauty of Lebanon, its culture,
              food, nature, and amazing destinations.
            </p>

          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-3">

            <h4>Quick Links</h4>

            <ul className="list-unstyled">

              <li>
                <Link href="/" className="text-white text-decoration-none">
                  Home
                </Link>
              </li>

              <li>
                <Link href="/" className="text-white text-decoration-none">
                  Destinations
                </Link>
              </li>

              <li>
                <Link href="/" className="text-white text-decoration-none">
                  About
                </Link>
              </li>

              <li>
                <Link href="/" className="text-white text-decoration-none">
                  Contact
                </Link>
              </li>

            </ul>

          </div>

          {/* Contact Info */}
          <div className="col-md-4 mb-3">

            <h4>Contact Info</h4>

            <p>Email: lebanontravel@gmail.com</p>

            <p>Phone: +961 71 558 059 </p>

            <p>Location: Beirut, Lebanon</p>

          </div>

        </div>

        <hr className="border-light" />

        <div className="text-center pb-3">

          <p className="mb-0">
            © 2026 Lebanon Travel | All Rights Reserved
          </p>

        </div>

      </div>

    </footer>

  );
}

export default Footer;