module.exports = {
  sanitize: function sanitizePhoneNumber(phone) {
    return String(phone).replace(/[^\d]/g, "");
  },
  phone: "+14804482907"
};
