const helpers = require("./helpers");
const admin = require("firebase-admin");
const twilio = require("./twilio");
const PHONE = helpers.phone;
const sanitize = helpers.sanitize;

module.exports = function(req, res) {
  if (!req.body.phone) {
    res.status(422).send({ error: "You must provide a phone number" });
  }
  const phone = sanitize(req.body.phone);

  admin
    .auth()
    .getUser(phone)
    .then(userRecord => {
      const code = Math.floor(Math.random() * 8999 + 1000);

      twilio.messages.create(
        {
          body: `Your code is ${code}`,
          to: "+" + phone,
          from: PHONE
        },
        err => {
          if (err) {
            return res.status(422).send({ error: err });
          }
          admin
            .database()
            .ref("users/" + phone)
            .update({ code: code, codeValid: true }, () => {
              res.send({ success: true });
            });
        }
      );
    })
    .catch(err => {
      res.status(422).send({ error: err });
    });
};
