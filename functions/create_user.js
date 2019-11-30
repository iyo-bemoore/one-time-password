const admin = require("firebase-admin");
import sanitizePhoneNumber from "./helpers";

module.exports = async function(req, res) {
  if (!req.body.phone) {
    res.status(422).send({ error: "Bad Input" });
  }

  const phone = sanitizePhoneNumber(req.body.phone);
  try {
    const user = await admin.auth().createUser({ uid: phone });
    res.send(user);
  } catch (e) {
    res.status(422).send({ error: e.message });
  }
};
// +14804482907
