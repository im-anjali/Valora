const express = require('express');
const {findPolicestn} = require('../controllers/policeStnController.js');
const router = express.Router();
router.post('/find-nearby', findPolicestn);
module.exports = router;