const express = require("express");
const router = express.Router();
const { sendSms } = require("../controllers/twilioController");
console.log("sendSms imported is:", sendSms);
router.post("/send-sms", sendSms);
module.exports = router;