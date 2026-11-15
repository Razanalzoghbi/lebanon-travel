import React from "react";
import { Link } from "react-router-dom";

const STYLE = `
  .pb {
    position: relative; overflow: hidden; border-radius: 22px; color: #fff; padding: 2.4rem 2.2rem;
    display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1.5rem;
    background-size: cover; background-position: center;
    box-shadow: 0 8px 24px rgba(0,0,0,.16);
  }
  /* decorative shapes */
  .pb::before {
    content: ""; position: absolute; width: 260px; height: 260px; border-radius: 50%;
    right: -70px; top: -110px; border: 2px solid rgba(255,255,255,.28);
  }
  .pb::after {
    content: ""; position: absolute; width: 170px; height: 170px; border-radius: 50%;
    left: -60px; bottom: -80px; background: rgba(255,255,255,.10);
  }
  .pb-dots {
    position: absolute; right: 26%; bottom: 14px; width: 90px; height: 50px; opacity: .35;
    background-image: radial-gradient(#fff 2px, transparent 2.5px); background-size: 14px 14px;
  }
  .pb-body { position: relative; z-index: 1; display: flex; align-items: center; gap: 1.2rem; max-width: 640px; }
  .pb-icon {
    flex: 0 0 64px; height: 64px; border-radius: 50%; font-size: 1.9rem;
    display: flex; align-items: center; justify-content: center;
    background: rgba(255,255,255,.18); border: 1.5px solid rgba(255,255,255,.45);
    backdrop-filter: blur(4px);
  }
  .pb h3 { font-weight: 800; font-size: clamp(1.25rem, 2.6vw, 1.7rem); margin: 0 0 .25rem; }
  .pb p { margin: 0; opacity: .92; }
  .pb .btn { position: relative; z-index: 1; transition: transform .15s ease, box-shadow .15s ease; }
  .pb .btn:hover { transform: translateY(-2px); box-shadow: 0 6px 14px rgba(0,0,0,.25); }

  /* light version: soft box with a few shapes */
  .pb-light { background: #f1f6fb; color: #1d2733; border: 1px solid #dbe7f3; box-shadow: none; }
  .pb-light::before { border: 0; background: rgba(31,127,201,.12); }
  .pb-light::after { background: rgba(245,166,35,.16); }
  .pb-light .pb-dots { background-image: radial-gradient(#1f7fc9 2px, transparent 2.5px); opacity: .25; }
  .pb-light .pb-icon { background: #fff; border: 1.5px solid #cfe0f1; backdrop-filter: none; }
  .pb-light p { color: #6b7480; opacity: 1; }
  .pb-light .pb-btn { background: #1c4f8f; border-color: #1c4f8f; color: #fff; }
  .pb-light .pb-btn:hover { background: #163f73; color: #fff; }
`;

// A nice call-to-action banner: image background, soft shapes, icon, text and one button.
function PromoBanner({ image, emoji = "🧭", title, text, to, button, className = "", variant = "image" }) {
  const light = variant === "light";
  const bg = light
    ? undefined
    : image
    ? `linear-gradient(100deg, rgba(12,38,68,.88) 20%, rgba(12,38,68,.45)), url("${image}")`
    : "linear-gradient(135deg, #1f7fc9, #1c4f8f)";

  return (
    <div className={`pb ${light ? "pb-light" : ""} ${className}`} style={bg ? { backgroundImage: bg } : undefined}>
      <style>{STYLE}</style>
      <span className="pb-dots" aria-hidden="true" />
      <div className="pb-body">
        <div className="pb-icon" aria-hidden="true">
          {emoji}
        </div>
        <div>
          <h3>{title}</h3>
          <p>{text}</p>
        </div>
      </div>
      <Link to={to} className={`btn ${light ? "pb-btn" : "btn-light"} rounded-pill px-4 fw-semibold flex-shrink-0`}>
        {button}
      </Link>
    </div>
  );
}

export default PromoBanner;