require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));