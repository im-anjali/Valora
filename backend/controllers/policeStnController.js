const client = require("../connectDB/connectDb");

const findPolicestn = async (req, res) => {
  try {
    const { lat, lng } = req.body || req.query;

    console.log("Incoming coordinates:", lat, lng);

    if (!lat || !lng) {
      return res.status(400).json({ error: "Missing coordinates" });
    }

    const query = `
      SELECT *, 
        ST_Distance(location, ST_MakePoint($1, $2)::geography) AS distance_meters 
      FROM police_stations 
      ORDER BY distance_meters 
      LIMIT 5;
    `;

    const result = await client.query(query, [lng, lat]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "No nearby police stations found" });
    }

    console.log("Nearby stations:", result.rows);
    res.json(result.rows);
  } catch (error) {
    console.error("Error finding police stations:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { findPolicestn };
