import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PromoBanner from "../components/PromoBanner";
import FavoriteButton from "../components/FavoriteButton";
import NotFoundPage from "./NotFoundPage";

const API = "http://localhost:5000";

const SECTIONS = [
  { type: "attraction", title: "Attractions", id: "attractions", icon: "🏛️", color: "#1f7fc9" },
  { type: "restaurant", title: "Restaurants", id: "restaurants", icon: "🍽️", color: "#2e9e5b" },
  { type: "cafe", title: "Cafes", id: "cafes", icon: "☕", color: "#d98a1c" },
  { type: "hotel", title: "Hotels", id: "hotels", icon: "🏨", color: "#c8452f" },
];

const STYLE = `
  html { scroll-behavior: smooth; }
  .dest-hero {
    position: relative; min-height: clamp(400px, 62vh, 580px); display: flex; align-items: flex-end;
    background-size: cover; background-position: center; color: #fff;
  }
  .dest-hero::before {
    content: ""; position: absolute; inset: 0;
    background: linear-gradient(to top, rgba(0,0,0,.72), rgba(0,0,0,.15) 65%);
  }
  .dest-hero .container { position: relative; padding-bottom: 2rem; }
  .dest-tabs {
    position: sticky; top: 0; z-index: 20; background: rgba(255,255,255,.95);
    backdrop-filter: blur(6px); border-bottom: 1px solid #e6e6e6;
  }
  .dest-tab {
    display: inline-flex; align-items: center; gap: .4rem; margin: .5rem .25rem;
    padding: .4rem 1rem; border-radius: 999px; border: 1.5px solid var(--c);
    color: var(--c); background: #fff; text-decoration: none; font-weight: 600; font-size: .92rem;
    transition: background .2s, color .2s;
  }
  .dest-tab:hover { background: var(--c); color: #fff; }
  .dest-tab small { opacity: .75; }
  .dest-section { scroll-margin-top: 110px; }
  .dest-section-title { border-left: 5px solid var(--c); padding-left: .75rem; }
  .place-card { border: none; border-radius: 16px; overflow: hidden; transition: transform .25s ease, box-shadow .25s ease; }
  .place-card:hover { transform: translateY(-5px); box-shadow: 0 .8rem 1.6rem rgba(0,0,0,.14) !important; }
  .place-img-wrap { position: relative; aspect-ratio: var(--ratio, 3 / 2); overflow: hidden; background: #eef1f4; }
  .place-img-wrap img { width: 100%; height: 100%; object-fit: cover; transition: transform .5s ease; }
  .place-card:hover .place-img-wrap img { transform: scale(1.06); }
  .place-badge {
    position: absolute; left: 12px; bottom: 12px; background: rgba(255,255,255,.95);
    border-radius: 999px; padding: .15rem .7rem; font-size: .8rem; font-weight: 600;
  }
  .place-desc {
    display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
    color: #6c757d; font-size: .88rem; min-height: 2.6em;
  }
  .dest-fade { animation: destFade .5s ease both; }
  @keyframes destFade { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
`;

function PlaceCard({ p, section }) {
  return (
    <div className="card place-card shadow-sm h-100">
      <FavoriteButton placeId={p.id} />
      <Link to={`/places/${p.id}`} className="place-img-wrap d-block">
        {p.image ? (
          <img src={p.image} alt={p.name} loading="lazy" />
        ) : (
          <div className="h-100 d-flex align-items-center justify-content-center text-muted">No photo yet</div>
        )}
      </Link>
      <div className="card-body d-flex flex-column">
        <h5 className="fw-bold mb-1">
          <Link to={`/places/${p.id}`} className="text-dark text-decoration-none">
            {p.name}
          </Link>
        </h5>
        <div className="small mb-2">
          {p.review_count > 0 ? (
            <span>
              <span style={{ color: "#f5a623" }}>★</span> <strong>{p.avg_rating}</strong>{" "}
              <span className="text-muted">({p.review_count})</span>
            </span>
          ) : (
            <span className="text-muted">No reviews yet</span>
          )}
          {p.price_range && <span className="text-muted"> · {p.price_range}</span>}
        </div>
        <p className="place-desc mb-3">{p.description}</p>
        <Link to={`/places/${p.id}`} className="btn custom-btn btn-sm mt-auto align-self-start px-3">
          {p.type === "attraction" ? "View details" : "Book now"}
        </Link>
      </div>
    </div>
  );
}

function DestinationPage() {
  const { slug } = useParams();
  const [dest, setDest] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    setDest(null);
    setError("");
    window.scrollTo(0, 0);
    fetch(`${API}/api/destinations/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error("Destination not found");
        return res.json();
      })
      .then((data) => setDest(data))
      .catch((err) => setError(err.message));
  }, [slug]);

  // /anything-unknown also arrives here (the /:slug route), so show the 404 page
  if (error === "Destination not found") return <NotFoundPage />;

  const groups = dest
    ? SECTIONS.map((s) => ({ ...s, items: dest.places.filter((p) => p.type === s.type) })).filter(
        (s) => s.items.length > 0
      )
    : [];

  return (
    <div>
      <style>{STYLE}</style>
      <Navbar />

      {error && <p className="text-center text-danger mt-5">{error}</p>}
      {!dest && !error && <p className="text-center mt-5">Loading...</p>}

      {dest && (
        <>
          <div className="dest-hero" style={{ backgroundImage: `url("${dest.image}")` }}>
            <div className="container dest-fade">
              {dest.region && (
                <span className="badge rounded-pill bg-light text-dark mb-2">📍 {dest.region}</span>
              )}
              <h1 className="fw-bold display-4 mb-2">{dest.name}</h1>
              {dest.description && (
                <p className="mb-0" style={{ maxWidth: 620, opacity: 0.95 }}>
                  {dest.description}
                </p>
              )}
            </div>
          </div>

          <div className="dest-tabs">
            <div className="container text-center">
              {groups.map((g) => (
                <a key={g.id} href={`#${g.id}`} className="dest-tab" style={{ "--c": g.color }}>
                  {g.icon} {g.title} <small>({g.items.length})</small>
                </a>
              ))}
            </div>
          </div>

          <div className="container mt-4 mb-5" style={{ minHeight: "50vh" }}>
            {groups.length === 0 && <p className="text-center text-muted my-5">No places here yet.</p>}

            {groups.map((g) => (
              <section key={g.id} id={g.id} className="dest-section mb-5" style={{ "--c": g.color }}>
                <h2 className="dest-section-title h3 fw-bold mb-4">
                  {g.icon} {g.title}
                </h2>
                <div className="row g-4 justify-content-center" style={{ "--ratio": g.items.length <= 2 || g.items.length === 4 ? "4 / 3" : "3 / 2" }}>
                  {g.items.map((p) => (
                    <div className={g.items.length <= 2 || g.items.length === 4 ? "col-md-6" : "col-lg-4 col-md-6"} key={p.id}>
                      <PlaceCard p={p} section={g} />
                    </div>
                  ))}
                </div>
              </section>
            ))}

            <PromoBanner
              className="mt-5"
              image={dest.image}
              emoji="🧭"
              title={`More to explore around ${dest.name}`}
              text="Discover nearby places you might want to visit."
              to={`/nearby/${dest.slug}`}
              button="Nearby suggestions →"
            />
          </div>
        </>
      )}

      <Footer />
    </div>
  );
}

export default DestinationPage;