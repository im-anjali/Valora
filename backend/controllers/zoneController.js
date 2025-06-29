const client = require('../connectDB/connectDb.js'); 


const findZoneByLocation = async (req, res) => {
  try {
    const { lat, lng } = req.body;
    if (typeof lat !== 'number' || typeof lng !== 'number') {
      return res.status(400).json({ error: 'Invalid or missing latitude/longitude' });
    }


   const query = `
  SELECT zone, color, ST_AsGeoJSON(boundary_geom) AS boundary
  FROM zones
  WHERE ST_Intersects(
    boundary_geom,
    ST_SetSRID(ST_MakePoint($1, $2), 4326)
  )
  LIMIT 1;
`;

    const result = await client.query(query, [lng, lat]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'No zone found for this location' });
    }

    const zone = result.rows[0];
    zone.boundary = JSON.parse(zone.boundary);

    res.json(zone);
  } catch (error) {
    console.error('Error finding zone:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { findZoneByLocation };



