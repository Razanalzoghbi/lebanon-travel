import { Link } from "react-router-dom";

// A friendly call to action at the bottom of the home page
function ShareCTA() {
  return (
    <div className="container mt-5 mb-5">
      <div
        className="text-center text-white p-4 p-md-5 rounded-4"
        style={{ background: "linear-gradient(135deg, #1f7fc9, #5bb6e6)" }}
      >
        <h3 className="fw-bold">Been somewhere great in Lebanon?</h3>
        <p className="mb-4">Tell other travelers about it. Your story could help someone plan their next trip.</p>
        <Link to="/share-experience" className="btn btn-light btn-lg rounded-pill px-4 fw-semibold">
          + Share Your Experience
        </Link>
      </div>
    </div>
  );
}

export default ShareCTA;