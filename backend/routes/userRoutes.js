const express = require('express');
const authMiddleware = require('../middleware/authMiddleware')
const router = express.Router();
const userController = require("../controllers/userController");
 router.post('/login', userController.login);
 router.post('/signup',  userController.signup);
router.get('/getdetails',authMiddleware, userController.profile );
 module.exports = router