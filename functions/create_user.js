const admin = require("firebase-admin");
module.exports = async function(req, res) {
  if (!req.body.phone) {
    res.status(422).send({ error: "Bad Input" });
  }

  const phone = String(req.body.phone).replace(/[^\d]/g, "");
  try {
    const user = await admin.auth().createUser({ uid: phone });
    res.send(user);
  } catch (e) {
    res.status(422).send({ error: e.message });
  }
};
