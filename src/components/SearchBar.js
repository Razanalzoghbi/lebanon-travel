import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Search box: sends the visitor to /search?q=...
// variant="hero" is the round, glassy one used on the home page
function SearchBar({ placeholder = "Search places, restaurants, cafes, hotels...", initial = "", variant = "normal" }) {
  const navigate = useNavigate();
  const [text, setText] = useState(initial);

  const submit = (e) => {
    e.preventDefault();
    const q = text.trim();
    navigate(q ? `/search?q=${encodeURIComponent(q)}` : "/search");
  };

  if (variant === "hero") {
    return (
      <form
        onSubmit={submit}
        className="d-flex align-items-center mx-auto"
        style={{
          maxWidth: 480,
          background: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(6px)",
          borderRadius: 50,
          padding: 5,
          boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
        }}
      >
        <span style={{ paddingLeft: 14, fontSize: "1.05rem" }}>🔍</span>
        <input
          type="text"
          className="form-control border-0 bg-transparent shadow-none"
          placeholder="Search places, restaurants, cafes..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          aria-label="Search"
        />
        <button
          className="view-btn border-0"
          type="submit"
          style={{ borderRadius: 50, margin: 0, whiteSpace: "nowrap" }}
        >
          Search
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={submit} className="input-group input-group-lg shadow-sm" style={{ maxWidth: 640 }}>
      <input
        type="text"
        className="form-control"
        placeholder={placeholder}
        value={text}
        onChange={(e) => setText(e.target.value)}
        aria-label="Search"
      />
      <button className="btn btn-primary px-4" type="submit">
        🔍 Search
      </button>
    </form>
  );
}

export default SearchBar;