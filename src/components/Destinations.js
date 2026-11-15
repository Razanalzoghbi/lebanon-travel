import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const API = "http://localhost:5000";

// one color per region (by order)
const COLORS = ["#1f7fc9", "#2e9e5b", "#c8452f", "#d98a1c", "#7a4fb5"];

const STYLE = `
  .dest-hero-box { text-align: center; padding: 1rem 0 .5rem; animation: destIn .5s ease both; }
  .dest-search { max-width: 520px; margin: 1.2rem auto 0; position: relative; }
  .dest-search input {
    border-radius: 999px; padding: .75rem 2.8rem .75rem 1.2rem; border: 1px solid #d5dbe3;
    box-shadow: 0 2px 8px rgba(0,0,0,.06);
  }
  .dest-search .dest-search-icon { position: absolute; right: 18px; top: 50%; transform: translateY(-50%); pointer-events: none; }
  .dest-chip {
    border: 1.5px solid var(--c, #1c4f8f); color: var(--c, #1c4f8f); background: #fff; border-radius: 999px;
    padding: .35rem 1rem; margin: .25rem; font-weight: 600; font-size: .9rem; transition: background .2s, color .2s;
  }
  .dest-chip:hover, .dest-chip.active { background: var(--c, #1c4f8f); color: #fff; }
  .dest-chip small { opacity: .8; }
  .dest-card {
    position: relative; display: block; aspect-ratio: var(--ratio, 4 / 3); border-radius: 18px; overflow: hidden;
    background: #dfe6ee; box-shadow: 0 3px 12px rgba(0,0,0,.12); text-decoration: none;
    transition: transform .25s ease, box-shadow .25s ease; animation: destIn .5s ease both;
  }
  .dest-card:hover { transform: translateY(-5px); box-shadow: 0 .9rem 1.8rem rgba(0,0,0,.2); }
  .dest-card img { width: 100%; height: 100%; object-fit: cover; transition: transform .6s ease; }
  .dest-card:hover img { transform: scale(1.07); }
  .dest-card::after { content: ""; position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,.72), rgba(0,0,0,0) 55%); }
  .dest-card-text { position: absolute; left: 16px; right: 16px; bottom: 14px; z-index: 2; color: #fff; }
  .dest-region-title { border-left: 5px solid var(--c); padding-left: .75rem; }
  .dest-card-go {
    position: absolute; top: 12px; right: 12px; z-index: 2; width: 34px; height: 34px; border-radius: 50%;
    background: rgba(255,255,255,.92); color: #1c4f8f; display: flex; align-items: center; justify-content: center;
    font-weight: 700; opacity: 0; transform: translateX(6px); transition: opacity .25s, transform .25s;
  }
  .dest-card:hover .dest-card-go { opacity: 1; transform: none; }
  @keyframes destIn { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
`;

function Destinations() {
  const [list, setList] = useState(null);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("All");

  useEffect(() => {
    fetch(`${API}/api/destinations`)
      .then((res) => {
        if (!res.ok) throw new Error("Could not load destinations");
        return res.json();
      })
      .then(setList)
      .catch(() => setError("Could not load destinations. Is the backend running?"));
  }, []);

  const regions = list ? [...new Set(list.map((d) => d.region))] : [];
  const colorOf = (r) => COLORS[Math.max(regions.indexOf(r), 0) % COLORS.length];

  const q = search.trim().toLowerCase();
  const shown = (list || []).filter(
    (d) =>
      (region === "All" || d.region === region) &&
      (!q || d.name.toLowerCase().includes(q) || d.region.toLowerCase().includes(q))
  );

  const groups = regions
    .map((r) => ({ name: r, color: colorOf(r), items: shown.filter((d) => d.region === r) }))
    .filter((g) => g.items.length > 0);

  return (
    <div className="container mt-5 mb-5" style={{ minHeight: "60vh" }}>
      <style>{STYLE}</style>

      <div className="dest-hero-box">
        <h1 className="fw-bold">Explore Lebanon</h1>
        <p className="text-muted mb-0">
          {list ? `Discover ${list.length} destinations across ${regions.length} regions` : "Discover Lebanon"}
        </p>
        <div className="dest-search">
          <input
            type="text"
            className="form-control"
            placeholder="Search destination..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span className="dest-search-icon">🔍</span>
        </div>
      </div>

      {error && <p className="text-center text-danger mt-4">{error}</p>}
      {!list && !error && <p className="text-center mt-4">Loading...</p>}

      {list && (
        <>
          <div className="text-center my-4">
            <button className={`dest-chip ${region === "All" ? "active" : ""}`} onClick={() => setRegion("All")}>
              All <small>({list.length})</small>
            </button>
            {regions.map((r) => (
              <button
                key={r}
                className={`dest-chip ${region === r ? "active" : ""}`}
                style={{ "--c": colorOf(r) }}
                onClick={() => setRegion(r)}
              >
                {r} <small>({list.filter((d) => d.region === r).length})</small>
              </button>
            ))}
          </div>

          {groups.map((g) => {
            const wide = g.items.length <= 2 || g.items.length === 4; // 2 per row, bigger cards
            return (
              <section key={g.name} className="mb-5" style={{ "--c": g.color }}>
                <h2 className="dest-region-title h3 fw-bold mb-1">{g.name}</h2>
                <p className="text-muted small mb-3" style={{ paddingLeft: "1.05rem" }}>
                  {g.items.length} {g.items.length === 1 ? "destination" : "destinations"}
                </p>
                <div className="row g-4" style={{ "--ratio": wide ? "16 / 10" : "4 / 3" }}>
                  {g.items.map((d, i) => (
                    <div className={wide ? "col-md-6" : "col-lg-4 col-md-6"} key={d.id}>
                      <Link to={`/${d.slug}`} className="dest-card" style={{ animationDelay: `${i * 0.05}s` }}>
                        {d.image && <img src={d.image} alt={d.name} loading="lazy" />}
                        <span className="dest-card-go">→</span>
                        <div className="dest-card-text">
                          <h4 className="fw-bold mb-0">{d.name}</h4>
                          {d.places_count !== undefined && (
                            <small style={{ opacity: 0.9 }}>
                              {d.places_count} {d.places_count === 1 ? "place" : "places"} to explore
                            </small>
                          )}
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}

          {groups.length === 0 && <h4 className="text-center mt-5 text-muted">No destinations found 🔍</h4>}
        </>
      )}
    </div>
  );
}

export default Destinations;