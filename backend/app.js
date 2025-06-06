require('dotenv').config({ path: '.env' });
const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const fileUpload = require("express-fileupload");
// DB Connection
const client = require('./connectDB/connectDb');

// CORS Configuration
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(fileUpload()); // enable file upload
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // serve uploaded files

// Routes
// Routes
const userRoutes = require("./routes/userRoutes");
const zoneRoutes = require("./routes/zonesRoutes");
const policeStationsRoutes = require("./routes/policeStationsRoutes");
const postRoutes = require("./routes/incidentRoutes");

app.use('/user', userRoutes);
app.use('/api/zones', zoneRoutes);
app.use('/police-stations', policeStationsRoutes);
app.use("/post", postRoutes);

// Test endpoint
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File too large' });
    }
  }
  res.status(500).json({ error: 'Something broke!', details: err.message });
});

const PORT = 5000 || process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});