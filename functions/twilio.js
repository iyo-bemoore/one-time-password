const twilio = require("twilio");

const accountSid = "AC48a384b01165bad50930d5322da64b49";
const authToken = "393948145a1146e5344f737e64e64983";

module.exports = new twilio.Twilio(accountSid, authToken);
