import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Small map with one pin. Needs: npm install leaflet
function PlaceMap({ lat, lng, name, approximate }) {
  const boxRef = useRef(null);

  useEffect(() => {
    const la = Number(lat);
    const lo = Number(lng);
    if (!boxRef.current || Number.isNaN(la) || Number.isNaN(lo)) return;

    const map = L.map(boxRef.current, { scrollWheelZoom: false }).setView([la, lo], 15);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    // our own pin (an emoji), so we don't depend on Leaflet's image files
    const pin = L.divIcon({
      className: "",
      html: '<div style="font-size:34px;line-height:34px;transform:translate(-50%,-100%);filter:drop-shadow(0 2px 3px rgba(0,0,0,.4))">📍</div>',
      iconSize: [0, 0],
    });
    L.marker([la, lo], { icon: pin }).addTo(map).bindPopup(name || "");

    return () => map.remove();
  }, [lat, lng, name]);

  const la = Number(lat);
  const lo = Number(lng);
  if (lat == null || lng == null || Number.isNaN(la) || Number.isNaN(lo)) return null;

  return (
    <div className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h5 className="fw-bold mb-0">
          Location {approximate && <span className="text-muted fw-normal small">(approximate area)</span>}
        </h5>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${la},${lo}`}
          target="_blank"
          rel="noreferrer"
          className="small text-decoration-none"
        >
          Open in Google Maps ↗
        </a>
      </div>
      <div
        ref={boxRef}
        style={{ height: 300, borderRadius: 16, overflow: "hidden", border: "1px solid #e6e9ee", zIndex: 0 }}
      />
    </div>
  );
}

export default PlaceMap;