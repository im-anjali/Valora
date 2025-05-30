require('dotenv').config({ path: '.env' }); // Explicit path
const express = require('express');
const app = express();
const cors = require('cors');



// Initialize DB connection early
const client = require('./connectDB/connectDb2');

// CORS Configuration
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Routes
app.use('/user', require("./routes/userRoutes"));
app.use('/api/zones', require("./routes/zonesRoutes"));

// Test endpoint
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});