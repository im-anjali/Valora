const express = require('express');
const {findHospi} = require("../controllers/hospiController.js");
const router = express.Router();
router.post("/findHospi", findHospi);
module.exports = router;