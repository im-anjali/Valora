// controllers/zoneController.js
const client = require('../connectDB/connectDb'); // Your PostgreSQL client connection

// Controller function to find zone by user location
const findZoneByLocation = async (req, res) => {
  try {
    const { lat, lng } = req.body;

    if (typeof lat !== 'number' || typeof lng !== 'number') {
      return res.status(400).json({ error: 'Invalid or missing latitude/longitude' });
    }

    // Example query to find which polygon contains the point (lat,lng)
    // Assuming you have a 'zones' table with a 'polygon' column of type geometry/polygon
    const query = `
      SELECT zone, color, boundary_name 
      FROM zones 
      WHERE ST_Contains(polygon, ST_SetSRID(ST_Point($1, $2), 4326))
      LIMIT 1
    `;

    const result = await client.query(query, [lng, lat]); // Note lng, lat order for Point

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'No zone found for this location' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error finding zone:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { findZoneByLocation };

