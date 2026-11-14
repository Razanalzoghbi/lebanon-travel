import { Link } from "react-router-dom";
import { getUser, logout } from "../auth";

function Navbar() {
  const user = getUser();

  const handleLogout = () => {
    logout();
    window.location.assign("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container">
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
          <ul className="navbar-nav ms-auto align-items-lg-center">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/destinations">Destinations</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/experiences">Experiences</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/favorites">Favorites</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>

            {user ? (
              <>
                {user.role === "admin" && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin">Dashboard</Link>
                  </li>
                )}
                {user.role === "owner" && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/owner">Dashboard</Link>
                  </li>
                )}
                {user.role === "user" && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/my-bookings">My Bookings</Link>
                  </li>
                )}
                <li className="nav-item">
                  <span className="nav-link fw-bold">Hi, {user.name}</span>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-secondary btn-sm ms-lg-2" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-sm custom-btn ms-lg-2" to="/register">Register</Link>
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