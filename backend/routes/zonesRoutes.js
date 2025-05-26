const express = require('express');
const { findZoneByLocation } = require('../controllers/zoneController');

const router = express.Router();

router.post("/find-zone", findZoneByLocation);

module.exports = router;

