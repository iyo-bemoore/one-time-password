const admin = require("firebase-admin");
const helpers = require("./helpers");
const sanitize = helpers.sanitize;

module.exports = async function(req, res) {
  if (!req.body.phone) {
    res.status(422).send({ error: "Bad Input" });
  }

  const phone = sanitize(req.body.phone);
  try {
    const user = await admin.auth().createUser({ uid: phone });
    res.send(user);
  } catch (e) {
    res.status(422).send({ error: e.message });
  }
};
// +14804482907
