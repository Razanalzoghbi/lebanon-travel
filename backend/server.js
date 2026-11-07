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
            p.opening_hours, p.price_range,
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));