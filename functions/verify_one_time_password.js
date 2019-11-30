const admin = require("firebase-admin");
const helpers = require("./helpers");
const sanitize = helpers.sanitize;
module.exports = function(req, res) {
  const { phone, code } = req.body;
  if (!phone || !code) {
    res.status(422).send({ error: "Phone and code must be provided" });
  }
  const p = sanitize(phone);
  const c = parseInt(code);

  admin
    .auth()
    .getUser(p)
    .then(() => {
      const ref = admin.database().ref("users/" + p);

      ref.on("value", snapshot => {
        // stop listening;
        ref.off();
        const user = snapshot.val();
        if (user.code !== c || !user.codeValid) {
          return res.status(422).send({ error: "Code is invalid" });
        }
        ref.update({ codeValid: false });
        admin
          .auth()
          .createCustomToken(p)
          .then(token => res.send({ token }));
      });
    })
    .catch(e => res.status(422).send({ errr: e }));
};
