const express = require('express');
const app = express();
const cors =  require ('cors');
require('dotenv').config();
app.use(cors());
app.use(express.json());
const PORT = 5000 || process.env.PORT;
app.get("/", (req, res) =>{
    res.send("hello world");
})
app.listen(PORT, (req, res) =>{
    console.log(`Server running on port http://localhost:${PORT}`)
});
