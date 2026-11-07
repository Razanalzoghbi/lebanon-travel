import React from "react";

// Shows the photo, or a simple placeholder when the place has no photo
function PlaceImage({ src, alt, height = 220 }) {
  if (!src) {
    return (
      <div
        className="d-flex align-items-center justify-content-center bg-light text-muted w-100"
        style={{ height }}
      >
        No photo yet
      </div>
    );
  }
  return <img src={src} className="img-fluid w-100 card-img" alt={alt} />;
}

export default PlaceImage;