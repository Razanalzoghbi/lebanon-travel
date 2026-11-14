import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../auth";
import { loadFavoriteIds, toggleFavorite, subscribe } from "../favorites";

// Heart button. Use it with placeId={...} or experienceId={...}
function FavoriteButton({ placeId, experienceId, onChange }) {
  const navigate = useNavigate();
  const user = getUser();
  const kind = placeId ? "places" : "experiences";
  const id = placeId || experienceId;
  const [active, setActive] = useState(false);
  const [busy, setBusy] = useState(false);
  const isTraveler = user && user.role === "user";

  useEffect(() => {
    if (!isTraveler || !id) return;
    let alive = true;
    const refresh = () =>
      loadFavoriteIds().then((c) => {
        if (alive) setActive(c[kind].has(id));
      });
    refresh();
    const unsubscribe = subscribe(refresh);
    return () => {
      alive = false;
      unsubscribe();
    };
  }, [id, kind, isTraveler]);

  // owners and admin do not have favorites
  if (user && !isTraveler) return null;

  const click = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      navigate("/login");
      return;
    }
    if (busy) return;
    setBusy(true);
    const now = await toggleFavorite(kind, id);
    setBusy(false);
    if (now !== null && onChange) onChange(now);
  };

  return (
    <button
      type="button"
      onClick={click}
      aria-label={active ? "Remove from favorites" : "Add to favorites"}
      title={active ? "Remove from favorites" : "Add to favorites"}
      style={{
        position: "absolute",
        top: 10,
        right: 10,
        zIndex: 2,
        width: 36,
        height: 36,
        borderRadius: "50%",
        border: "none",
        background: "rgba(255,255,255,0.9)",
        color: active ? "#e53935" : "#999",
        fontSize: "1.3rem",
        lineHeight: 1,
        cursor: "pointer",
      }}
    >
      {active ? "♥" : "♡"}
    </button>
  );
}

export default FavoriteButton;