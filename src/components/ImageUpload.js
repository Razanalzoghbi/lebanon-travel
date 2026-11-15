import React, { useState } from "react";
import { API, getToken } from "../auth";

// Choose a photo -> it is uploaded to our server -> onChange(url) gives the link back.
function ImageUpload({ value, onChange }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const pick = async (e) => {
    const file = e.target.files[0];
    e.target.value = "";
    if (!file) return;
    setError("");
    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("The photo is too big (max 5 MB)");
      return;
    }
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch(`${API}/api/upload`, {
        method: "POST",
        headers: { Authorization: `Bearer ${getToken()}` },
        body: fd,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Upload failed");
      onChange(data.url);
    } catch (err) {
      setError(err.message || "Upload failed");
    }
    setUploading(false);
  };

  return (
    <div>
      {value && (
        <div className="mb-2">
          <img src={value} alt="Preview" style={{ maxHeight: 140, maxWidth: "100%", borderRadius: 8 }} />
        </div>
      )}
      <input type="file" accept="image/*" className="form-control" onChange={pick} disabled={uploading} />
      {uploading && <div className="form-text">Uploading...</div>}
      {error && <div className="text-danger small mt-1">{error}</div>}
      {value && !uploading && (
        <button type="button" className="btn btn-link btn-sm text-danger p-0 mt-1" onClick={() => onChange("")}>
          Remove photo
        </button>
      )}
    </div>
  );
}

export default ImageUpload;