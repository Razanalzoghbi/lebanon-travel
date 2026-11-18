import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { getUser, logout } from "../auth";

function Navbar() {
  const user = getUser();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // close the account menu when the visitor clicks somewhere else
  useEffect(() => {
    const onClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const handleLogout = () => {
    logout();
    window.location.assign("/");
  };

  const firstName = user ? user.name.split(" ")[0] : "";
  const dashboardPath = user && user.role === "admin" ? "/admin" : "/owner";

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container-fluid px-lg-5">
        <Link className="navbar-brand" to="/">
          Lebanon Travel
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-1">
            <li className="nav-item">
              <Link className="nav-link text-nowrap" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-nowrap" to="/favorites">Favorites</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-nowrap" to="/destinations">Destinations</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-nowrap" to="/experiences">Experiences</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-nowrap" to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-nowrap" to="/contact">Contact</Link>
            </li>

            {user ? (
              <li className="nav-item dropdown ms-lg-3" ref={menuRef}>
                <button
                  type="button"
                  className="btn btn-outline-dark btn-sm rounded-pill px-3 text-nowrap"
                  onClick={() => setMenuOpen(!menuOpen)}
                  aria-expanded={menuOpen}
                >
                  👤 {firstName} ▾
                </button>
                {menuOpen && (
                  <ul className="dropdown-menu dropdown-menu-end show mt-2" style={{ minWidth: 190 }}>
                    <li className="dropdown-item-text small text-muted text-capitalize">
                      Signed in as {user.role === "user" ? "traveler" : user.role}
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    {user.role === "user" && (
                      <>
                        <li>
                          <Link className="dropdown-item" to="/my-bookings" onClick={() => setMenuOpen(false)}>
                            My Bookings
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="/my-reviews" onClick={() => setMenuOpen(false)}>
                            My Reviews
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="/favorites" onClick={() => setMenuOpen(false)}>
                            My Favorites
                          </Link>
                        </li>
                      </>
                    )}
                    {user.role !== "user" && (
                      <li>
                        <Link className="dropdown-item" to={dashboardPath} onClick={() => setMenuOpen(false)}>
                          Dashboard
                        </Link>
                      </li>
                    )}
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <button className="dropdown-item text-danger" onClick={handleLogout}>
                        Logout
                      </button>
                    </li>
                  </ul>
                )}
              </li>
            ) : (
              <>
                <li className="nav-item ms-lg-3">
                  <Link className="nav-link text-nowrap" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-sm custom-btn text-nowrap" to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;