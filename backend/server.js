require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());

// Connection to MySQL (settings come from .env)
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

app.get("/", (req, res) => {
  res.send("Lebanon Travel API is running");
});

// All destinations, with their region name
app.get("/api/destinations", async (req, res) => {
  const [rows] = await db.query(
    `SELECT d.id, d.name, d.slug, d.image, r.name AS region
     FROM destinations d
     JOIN regions r ON r.id = d.region_id
     ORDER BY r.id, d.name`
  );
  res.json(rows);
});

// One destination + its approved places (with rating)
app.get("/api/destinations/:slug", async (req, res) => {
  const [dest] = await db.query(
    `SELECT d.id, d.name, d.slug, d.description, d.image, d.latitude, d.longitude, r.name AS region
     FROM destinations d
     JOIN regions r ON r.id = d.region_id
     WHERE d.slug = ?`,
    [req.params.slug]
  );
  if (dest.length === 0) {
    return res.status(404).json({ message: "Destination not found" });
  }

  const [places] = await db.query(
    `SELECT p.id, p.name, p.type, p.description, p.image,
            pr.avg_rating, pr.review_count
     FROM places p
     JOIN place_ratings pr ON pr.place_id = p.id
     WHERE p.destination_id = ? AND p.status = 'approved'
     ORDER BY p.id`,
    [dest[0].id]
  );

  res.json({ ...dest[0], places });
});


// ---------------------- AUTH ----------------------

// Middleware: checks the token sent by the frontend
function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return res.status(401).json({ message: "Please log in" });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET); // { id, role }
    next();
  } catch (err) {
    res.status(401).json({ message: "Session expired, please log in again" });
  }
}

// Register: normal users are active immediately; owners wait for admin approval
app.post("/api/auth/register", async (req, res) => {
  const { name, email, password, role, business_name, phone } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Name, email and password are required" });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters" });
  }

  const isOwner = role === "owner"; // nobody can register as admin from the website
  if (isOwner && !business_name) {
    return res.status(400).json({ message: "Business name is required for owners" });
  }

  const hash = await bcrypt.hash(password, 10);
  try {
    await db.query(
      `INSERT INTO users (name, email, password_hash, role, status, business_name, phone)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        email.toLowerCase().trim(),
        hash,
        isOwner ? "owner" : "user",
        isOwner ? "pending" : "active",
        isOwner ? business_name : null,
        phone || null,
      ]
    );
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ message: "This email is already registered" });
    }
    throw err;
  }

  res.status(201).json({
    message: isOwner
      ? "Account created. The admin must approve it before you can log in."
      : "Account created. You can log in now.",
  });
});

// Login
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [
    email.toLowerCase().trim(),
  ]);
  const user = rows[0];
  const ok = user && (await bcrypt.compare(password, user.password_hash));
  if (!ok) return res.status(401).json({ message: "Wrong email or password" });

  if (user.status === "pending") {
    return res.status(403).json({ message: "Your account is waiting for admin approval" });
  }
  if (user.status !== "active") {
    return res.status(403).json({ message: "Your account is not active" });
  }

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.json({
    token,
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  });
});

// Who am I? (to test the token)
app.get("/api/me", requireAuth, async (req, res) => {
  const [rows] = await db.query(
    "SELECT id, name, email, role, status, business_name, phone FROM users WHERE id = ?",
    [req.user.id]
  );
  if (rows.length === 0) return res.status(404).json({ message: "User not found" });
  res.json(rows[0]);
});


// ---------------------- PLACES + REVIEWS ----------------------

// One place with its images, rating and reviews
app.get("/api/places/:id", async (req, res) => {
  const [rows] = await db.query(
    `SELECT p.id, p.name, p.type, p.description, p.image, p.address, p.phone,
            p.opening_hours, p.price_range, (p.owner_id IS NOT NULL) AS claimed,
            d.name AS destination_name, d.slug AS destination_slug,
            pr.avg_rating, pr.review_count
     FROM places p
     LEFT JOIN destinations d ON d.id = p.destination_id
     JOIN place_ratings pr ON pr.place_id = p.id
     WHERE p.id = ? AND p.status = 'approved'`,
    [req.params.id]
  );
  if (rows.length === 0) return res.status(404).json({ message: "Place not found" });

  const [images] = await db.query(
    "SELECT image_url FROM place_images WHERE place_id = ? ORDER BY sort_order",
    [req.params.id]
  );
  const [reviews] = await db.query(
    `SELECT r.id, r.rating, r.comment, r.created_at, u.name AS user_name
     FROM reviews r
     JOIN users u ON u.id = r.user_id
     WHERE r.place_id = ?
     ORDER BY r.created_at DESC`,
    [req.params.id]
  );

  res.json({ ...rows[0], images: images.map((i) => i.image_url), reviews });
});

// Add (or update) my review for a place. One review per user per place.
app.post("/api/places/:id/reviews", requireAuth, async (req, res) => {
  if (req.user.role !== "user") {
    return res.status(403).json({ message: "Only travelers can write reviews" });
  }
  const rating = parseInt(req.body.rating, 10);
  const comment = (req.body.comment || "").trim();
  if (!(rating >= 1 && rating <= 5)) {
    return res.status(400).json({ message: "Rating must be from 1 to 5" });
  }

  const [place] = await db.query(
    "SELECT id FROM places WHERE id = ? AND status = 'approved'",
    [req.params.id]
  );
  if (place.length === 0) return res.status(404).json({ message: "Place not found" });

  await db.query(
    `INSERT INTO reviews (user_id, place_id, rating, comment)
     VALUES (?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE rating = VALUES(rating), comment = VALUES(comment), created_at = NOW()`,
    [req.user.id, req.params.id, rating, comment || null]
  );
  res.status(201).json({ message: "Thank you for your review!" });
});


// ---------------------- BOOKINGS ----------------------

// Create a booking (restaurants, cafes and hotels only)
app.post("/api/bookings", requireAuth, async (req, res) => {
  if (req.user.role !== "user") {
    return res.status(403).json({ message: "Only travelers can make bookings" });
  }
  const { place_id, booking_date, booking_time, notes } = req.body;
  const guests = parseInt(req.body.guests, 10) || 1;

  if (!place_id || !booking_date) {
    return res.status(400).json({ message: "Place and date are required" });
  }
  if (guests < 1 || guests > 50) {
    return res.status(400).json({ message: "Guests must be between 1 and 50" });
  }
  const today = new Date().toISOString().slice(0, 10);
  if (booking_date < today) {
    return res.status(400).json({ message: "The date cannot be in the past" });
  }

  const [place] = await db.query(
    "SELECT id, type FROM places WHERE id = ? AND status = 'approved'",
    [place_id]
  );
  if (place.length === 0) return res.status(404).json({ message: "Place not found" });
  if (place[0].type === "attraction") {
    return res.status(400).json({ message: "Attractions cannot be booked" });
  }

  await db.query(
    `INSERT INTO bookings (user_id, place_id, booking_date, booking_time, guests, notes)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [req.user.id, place_id, booking_date, booking_time || null, guests, notes || null]
  );
  res.status(201).json({ message: "Booking request sent! The place will confirm it soon." });
});

// My bookings
app.get("/api/bookings/mine", requireAuth, async (req, res) => {
  const [rows] = await db.query(
    `SELECT b.id, b.booking_date, b.booking_time, b.guests, b.notes, b.status,
            p.id AS place_id, p.name AS place_name, p.type AS place_type, p.image AS place_image
     FROM bookings b
     JOIN places p ON p.id = b.place_id
     WHERE b.user_id = ?
     ORDER BY b.booking_date DESC, b.id DESC`,
    [req.user.id]
  );
  res.json(rows);
});

// Cancel my booking
app.patch("/api/bookings/:id/cancel", requireAuth, async (req, res) => {
  const [result] = await db.query(
    `UPDATE bookings SET status = 'cancelled'
     WHERE id = ? AND user_id = ? AND status IN ('pending', 'confirmed')`,
    [req.params.id, req.user.id]
  );
  if (result.affectedRows === 0) {
    return res.status(400).json({ message: "This booking cannot be cancelled" });
  }
  res.json({ message: "Booking cancelled" });
});


// ---------------------- ADMIN ----------------------

function requireRole(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "You are not allowed to do this" });
    }
    next();
  };
}

// List users (optional filters: ?role=owner&status=pending)
app.get("/api/admin/users", requireAuth, requireRole("admin"), async (req, res) => {
  const where = [];
  const params = [];
  if (req.query.role) {
    where.push("role = ?");
    params.push(req.query.role);
  }
  if (req.query.status) {
    where.push("status = ?");
    params.push(req.query.status);
  }
  const [rows] = await db.query(
    `SELECT id, name, email, role, status, business_name, phone, created_at
     FROM users
     ${where.length ? "WHERE " + where.join(" AND ") : ""}
     ORDER BY created_at DESC`,
    params
  );
  res.json(rows);
});

// Approve / block / unblock a user or owner (admins cannot be changed)
app.patch("/api/admin/users/:id/status", requireAuth, requireRole("admin"), async (req, res) => {
  const { status } = req.body;
  if (!["active", "blocked"].includes(status)) {
    return res.status(400).json({ message: "Status must be active or blocked" });
  }
  const [result] = await db.query(
    "UPDATE users SET status = ? WHERE id = ? AND role <> 'admin'",
    [status, req.params.id]
  );
  if (result.affectedRows === 0) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json({ message: "Updated" });
});


// ---------------------- CLAIMS (owner asks to own an existing place) ----------------------

app.post("/api/places/:id/claim", requireAuth, requireRole("owner"), async (req, res) => {
  const [place] = await db.query(
    "SELECT id, owner_id FROM places WHERE id = ? AND status = 'approved'",
    [req.params.id]
  );
  if (place.length === 0) return res.status(404).json({ message: "Place not found" });
  if (place[0].owner_id) {
    return res.status(400).json({ message: "This place already has an owner" });
  }
  try {
    await db.query("INSERT INTO place_claims (user_id, place_id) VALUES (?, ?)", [
      req.user.id,
      req.params.id,
    ]);
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ message: "You already sent a claim for this place" });
    }
    throw err;
  }
  res.status(201).json({ message: "Claim sent. The admin will review it." });
});

// Admin: list claims (default: pending)
app.get("/api/admin/claims", requireAuth, requireRole("admin"), async (req, res) => {
  const [rows] = await db.query(
    `SELECT c.id, c.status, c.created_at,
            u.name AS user_name, u.email, u.business_name, u.phone,
            p.id AS place_id, p.name AS place_name, p.type AS place_type
     FROM place_claims c
     JOIN users u ON u.id = c.user_id
     JOIN places p ON p.id = c.place_id
     WHERE c.status = ?
     ORDER BY c.created_at`,
    [req.query.status || "pending"]
  );
  res.json(rows);
});

// Admin: approve or reject a claim
app.patch("/api/admin/claims/:id", requireAuth, requireRole("admin"), async (req, res) => {
  const { status } = req.body;
  if (!["approved", "rejected"].includes(status)) {
    return res.status(400).json({ message: "Status must be approved or rejected" });
  }
  const [claims] = await db.query(
    "SELECT * FROM place_claims WHERE id = ? AND status = 'pending'",
    [req.params.id]
  );
  if (claims.length === 0) return res.status(404).json({ message: "Claim not found" });
  const claim = claims[0];

  if (status === "rejected") {
    await db.query("UPDATE place_claims SET status = 'rejected' WHERE id = ?", [claim.id]);
    return res.json({ message: "Claim rejected" });
  }

  const [result] = await db.query(
    "UPDATE places SET owner_id = ? WHERE id = ? AND owner_id IS NULL",
    [claim.user_id, claim.place_id]
  );
  if (result.affectedRows === 0) {
    return res.status(400).json({ message: "This place already has an owner" });
  }
  await db.query("UPDATE place_claims SET status = 'approved' WHERE id = ?", [claim.id]);
  await db.query(
    "UPDATE place_claims SET status = 'rejected' WHERE place_id = ? AND status = 'pending'",
    [claim.place_id]
  );
  res.json({ message: "Claim approved" });
});


// ---------------------- OWNER ----------------------

// My places (any status) with number of pending bookings
app.get("/api/owner/places", requireAuth, requireRole("owner"), async (req, res) => {
  const [rows] = await db.query(
    `SELECT p.id, p.name, p.type, p.image, p.status, d.name AS destination_name, p.area_name,
            pr.avg_rating, pr.review_count,
            (SELECT COUNT(*) FROM bookings b WHERE b.place_id = p.id AND b.status = 'pending') AS pending_bookings
     FROM places p
     LEFT JOIN destinations d ON d.id = p.destination_id
     JOIN place_ratings pr ON pr.place_id = p.id
     WHERE p.owner_id = ?
     ORDER BY p.id DESC`,
    [req.user.id]
  );
  res.json(rows);
});

// Add a new place (waits for admin approval)
app.post("/api/owner/places", requireAuth, requireRole("owner"), async (req, res) => {
  const b = req.body;
  if (!b.name || !["restaurant", "cafe", "hotel", "attraction"].includes(b.type)) {
    return res.status(400).json({ message: "Name and a valid type are required" });
  }
  const destinationId = b.destination_id ? parseInt(b.destination_id, 10) : null;
  let lat = null;
  let lng = null;
  if (!destinationId) {
    // a place outside the listed destinations needs its own location (used by Nearby Suggestions)
    lat = parseFloat(b.latitude);
    lng = parseFloat(b.longitude);
    if (!b.area_name || isNaN(lat) || isNaN(lng)) {
      return res.status(400).json({ message: "Area name, latitude and longitude are required for this location" });
    }
  }
  await db.query(
    `INSERT INTO places
       (destination_id, owner_id, name, type, description, area_name, address, latitude, longitude,
        phone, opening_hours, price_range, image, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')`,
    [
      destinationId,
      req.user.id,
      b.name.trim(),
      b.type,
      b.description || null,
      b.area_name || null,
      b.address || null,
      lat,
      lng,
      b.phone || null,
      b.opening_hours || null,
      ["$", "$$", "$$$", "$$$$"].includes(b.price_range) ? b.price_range : null,
      b.image || null,
    ]
  );
  res.status(201).json({ message: "Place sent. It will appear after the admin approves it." });
});

// Bookings of my places
app.get("/api/owner/bookings", requireAuth, requireRole("owner"), async (req, res) => {
  const [rows] = await db.query(
    `SELECT b.id, b.booking_date, b.booking_time, b.guests, b.notes, b.status,
            u.name AS user_name, u.email AS user_email, p.name AS place_name
     FROM bookings b
     JOIN places p ON p.id = b.place_id
     JOIN users u ON u.id = b.user_id
     WHERE p.owner_id = ?
     ORDER BY FIELD(b.status, 'pending', 'confirmed', 'completed', 'rejected', 'cancelled'),
              b.booking_date, b.id`,
    [req.user.id]
  );
  res.json(rows);
});

// Confirm / reject / complete a booking of my place
app.patch("/api/owner/bookings/:id", requireAuth, requireRole("owner"), async (req, res) => {
  const { status } = req.body;
  if (!["confirmed", "rejected", "completed"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }
  const [result] = await db.query(
    `UPDATE bookings b
     JOIN places p ON p.id = b.place_id
     SET b.status = ?
     WHERE b.id = ? AND p.owner_id = ? AND b.status IN ('pending', 'confirmed')`,
    [status, req.params.id, req.user.id]
  );
  if (result.affectedRows === 0) {
    return res.status(400).json({ message: "This booking cannot be changed" });
  }
  res.json({ message: "Updated" });
});

// Admin: places waiting for approval, and approve / reject
app.get("/api/admin/places", requireAuth, requireRole("admin"), async (req, res) => {
  const [rows] = await db.query(
    `SELECT p.id, p.name, p.type, p.description, p.image, p.address, p.area_name, p.created_at,
            d.name AS destination_name, u.business_name, u.email AS owner_email
     FROM places p
     LEFT JOIN destinations d ON d.id = p.destination_id
     LEFT JOIN users u ON u.id = p.owner_id
     WHERE p.status = 'pending'
     ORDER BY p.created_at`
  );
  res.json(rows);
});

app.patch("/api/admin/places/:id/status", requireAuth, requireRole("admin"), async (req, res) => {
  const { status } = req.body;
  if (!["approved", "rejected"].includes(status)) {
    return res.status(400).json({ message: "Status must be approved or rejected" });
  }
  const [result] = await db.query(
    "UPDATE places SET status = ? WHERE id = ? AND status = 'pending'",
    [status, req.params.id]
  );
  if (result.affectedRows === 0) return res.status(404).json({ message: "Place not found" });
  res.json({ message: "Updated" });
});


// ---------------------- NEARBY SUGGESTIONS ----------------------

// Places that do not belong to a destination, within 30 km, nearest first
app.get("/api/destinations/:slug/nearby", async (req, res) => {
  const [dest] = await db.query(
    "SELECT id, name, slug, latitude, longitude FROM destinations WHERE slug = ?",
    [req.params.slug]
  );
  if (dest.length === 0) return res.status(404).json({ message: "Destination not found" });

  const lat = parseFloat(dest[0].latitude);
  const lng = parseFloat(dest[0].longitude);

  // Haversine formula: distance in km between the destination and each place
  const [places] = await db.query(
    `SELECT p.id, p.name, p.type, p.description, p.image, p.area_name,
            pr.avg_rating, pr.review_count,
            ROUND(6371 * ACOS(LEAST(1,
              COS(RADIANS(?)) * COS(RADIANS(p.latitude)) *
              COS(RADIANS(p.longitude) - RADIANS(?)) +
              SIN(RADIANS(?)) * SIN(RADIANS(p.latitude))
            )), 1) AS distance_km
     FROM places p
     JOIN place_ratings pr ON pr.place_id = p.id
     WHERE p.destination_id IS NULL AND p.status = 'approved' AND p.latitude IS NOT NULL
     HAVING distance_km <= 30
     ORDER BY distance_km
     LIMIT 12`,
    [lat, lng, lat]
  );

  res.json({
    destination: { name: dest[0].name, slug: dest[0].slug },
    places,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));