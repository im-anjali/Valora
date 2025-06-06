const pool = require("../connectDB/connectDb");
const path = require("path");
const fs = require("fs");

const createIncident = async (req, res) => {
  const { title, description } = req.body;
  const mediaFile = req.files?.media || null;

  if (!title || !description) {
    return res.status(400).json({ message: "Title and description are required." });
  }

  let fileName = null;

  if (mediaFile) {
    const uploadDir = path.join(__dirname, "../uploads");
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

    fileName = Date.now() + "-" + mediaFile.name;
    const filePath = path.join(uploadDir, fileName);

    try {
      await mediaFile.mv(filePath);
    } catch (err) {
      console.error("Media upload failed:", err);
      return res.status(500).send("Media upload error");
    }
  }

  try {
    const result = await pool.query(
      "INSERT INTO incidents (title, description, media) VALUES ($1, $2, $3) RETURNING *",
      [title, description, fileName]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Create Incident Error:", err);
    res.status(500).send("Server Error");
  }
};


const getIncidents = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM incidents ORDER BY id DESC");
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Get Incidents Error:", err);
    res.status(500).send("Server Error");
  }
};

module.exports = { createIncident, getIncidents };
