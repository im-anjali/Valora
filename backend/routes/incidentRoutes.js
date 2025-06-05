const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const authMiddleware = require("../middleware/authMiddleware");
router.post("/postincident",authMiddleware,  postController.createIncident);

router.get("/getincident", authMiddleware, postController.getIncidents);

module.exports = router;
