require('dotenv').config({ path: '.env' }); // Explicit path
const express = require('express');
const app = express();
const cors = require('cors');

// DB Connection (choose the right one)
const client = require('./connectDB/connectDb'); // or connectDb2, depending on which you actually use

// CORS Configuration
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Routes
const userRoutes = require("./routes/userRoutes");
const zoneRoutes = require("./routes/zonesRoutes");

app.use('/user', userRoutes);
app.use('/api/zones', zoneRoutes);

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
