const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID; 
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

const twilioNumber = process.env.TWILIO_PHONE_NUMBER;
console.log("twilioController.js loaded");

const sendSms = async (req, res) => {
  console.log(" sendSms controller called");

  try {
    const { numbers, message } = req.body;

 
    if (!Array.isArray(numbers) || numbers.length === 0 || !message) {
      return res.status(400).json({ error: "Missing or invalid 'numbers' or 'message'" });
    }

    const results = [];

    for (const number of numbers) {
      try {
        const sms = await client.messages.create({
          body: message,
          from: twilioNumber,
          to: number,
        });
        console.log(`SMS sent to ${number} - SID: ${sms.sid}`);
        results.push({ to: number, sid: sms.sid, success: true });
      } catch (err) {
        console.error(` Failed to send SMS to ${number}:`, err.message);
        results.push({ to: number, error: err.message, success: false });
      }
    }

    res.json({ success: true, results });
  } catch (error) {
    console.error(" Twilio bulk SMS error:", error);
    res.status(500).json({ error: "Failed to process SMS batch" });
  }
};

module.exports = { sendSms };

