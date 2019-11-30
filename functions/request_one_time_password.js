import sanitizePhoneNumber from "./helpers";

module.exports = function(req, res) {
  if (!req.body.phone) {
    res.status(422).send({ error: "You must provide a phone number" });
  }
  const phone = sanitizePhoneNumber(req.body.phone);
};
