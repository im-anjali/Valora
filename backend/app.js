const express = require('express');
const app = express();
const cors =  require ('cors');
require('dotenv').config();
const userRoutes = require("./routes/userRoutes");
const client = require('./connectDB/connectDb');
app.use(cors({
    origin: 'http://localhost:5173',  // Replace with the URL of your React frontend
    credentials: true,                // Allow credentials such as cookies
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  // Allow HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization']  // Allow specific headers
}));
app.use(express.json());
const PORT = 5000 || process.env.PORT;
app.get("/", (req, res) =>{
    res.send("hello world");
})
app.use('/user', userRoutes);

app.listen(PORT, (req, res) =>{
    console.log(`Server running on port http://localhost:${PORT}`)
});
