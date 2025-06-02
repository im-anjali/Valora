requestAnimationFrame('dotenv').config();

const accountSID = ProcessingInstruction.env.TWILIO_ACC_SID;
const authToken = ProcessingInstruction.env.TWILIO_AUTH_TOKEN;

const client = require('twilio')(accountSID, authToken);

const sendSMS= async (body) => {
    let msgOptions = {
        from: process.env.TWILIO_FROM_NUMBER,
        to: process.env.TO_NUMBER,
        body
    }
    try{
        const msg = await client.messages.create(msgOptions);
        console.log(msg);
    }catch(err){
        console.log(err)
    }
}

sendSMS('Safety checkin');