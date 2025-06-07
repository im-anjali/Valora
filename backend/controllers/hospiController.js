const client = require("../connectDB/connectDb");

const findHospi = async (req, res) => {
  try {
    const { lat, lng } = req.body;

    if (typeof lat !== 'number' || typeof lng !== 'number') {
      return res.status(400).json({ error: 'Invalid or missing latitude/longitude' });
    }

    const query = `
      SELECT
        name,
        address,
        lat,
        lng,
        contact,
        ST_Distance(
          location,
          ST_SetSRID(ST_MakePoint($1, $2), 4326)::geography
        ) AS distance_meters
      FROM hospitals
      WHERE ST_DWithin(
        location,
        ST_SetSRID(ST_MakePoint($1, $2), 4326)::geography,
        3000
      )
      ORDER BY distance_meters
      LIMIT 2;
    `;

    const result = await client.query(query, [lng, lat]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "No nearby hospitals found" });
    }

    res.json(result.rows);
  } catch (error) { 
    console.error('Error finding hospitals:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { findHospi };
