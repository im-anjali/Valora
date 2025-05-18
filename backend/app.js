const express = require('express');
const app = express();
const cors =  require ('cors');
require('dotenv').config();
const userRoutes = require("./routes/userRoutes");
const client = require('./connectDB/connectDb');
app.use(cors());

app.use(express.json());
const PORT = 5000 || process.env.PORT;
app.get("/", (req, res) =>{
    res.send("hello world");
})
app.use('/user', userRoutes);

app.listen(PORT, (req, res) =>{
    console.log(`Server running on port http://localhost:${PORT}`)
});
