const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

router.post("/postincident", postController.createIncident);

router.get("/getincident", postController.getIncidents);

module.exports = router;
