const { Pool } = require('pg');
require('dotenv').config({ path: '.env' });


const pool = new Pool({
  host: process.env.PG_HOST,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  port: process.env.PG_PORT || 5432,
});


// Test connection immediately
pool.query('SELECT NOW()')
  .then(res => console.log('Database connected at:', res.rows[0].now))
  .catch(err => {
    console.error('Database connection failed:', err);
    process.exit(1); // Exit if DB connection fails
  });

module.exports = pool;

