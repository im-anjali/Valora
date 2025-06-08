// twilioController.js

/*const twilio = require('twilio');

// Load your Twilio credentials from env variables (recommended)
const accountSid = process.env.TWILIO_ACCOUNT_SID; 
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

const twilioNumber = process.env.TWILIO_PHONE_NUMBER; // Your Twilio SMS number
console.log("twilioController.js loaded");



const sendSms = async (req, res) => {
    console.log("👉 sendSms controller called");
  try {
    const { to, message } = req.body;

    if (!to || !message) {
      return res.status(400).json({ error: "Missing 'to' or 'message' in request body" });
    }

    const sms = await client.messages.create({
      body: message,
      from: twilioNumber,
      to: to, // recipient phone number with country code, e.g. '+919876543210'
    });

    res.json({ success: true, sid: sms.sid });
  } catch (error) {
    console.error("Twilio SMS error:", error);
    res.status(500).json({ error: "Failed to send SMS" });
  }
};

module.exports = { sendSms };*/
// twilioController.js

const twilio = require('twilio');

// Load your Twilio credentials from env variables
const accountSid = process.env.TWILIO_ACCOUNT_SID; 
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

const twilioNumber = process.env.TWILIO_PHONE_NUMBER;
console.log("twilioController.js loaded");

const sendSms = async (req, res) => {
  console.log("👉 sendSms controller called");

  try {
    const { numbers, message } = req.body;

    // Validation
    if (!Array.isArray(numbers) || numbers.length === 0 || !message) {
      return res.status(400).json({ error: "Missing or invalid 'numbers' or 'message'" });
    }

    const results = [];

    // Send SMS to each number
    for (const number of numbers) {
      try {
        const sms = await client.messages.create({
          body: message,
          from: twilioNumber,
          to: number,
        });
        console.log(`✅ SMS sent to ${number} - SID: ${sms.sid}`);
        results.push({ to: number, sid: sms.sid, success: true });
      } catch (err) {
        console.error(`❌ Failed to send SMS to ${number}:`, err.message);
        results.push({ to: number, error: err.message, success: false });
      }
    }

    res.json({ success: true, results });
  } catch (error) {
    console.error("❌ Twilio bulk SMS error:", error);
    res.status(500).json({ error: "Failed to process SMS batch" });
  }
};

module.exports = { sendSms };

