export const sanitizePhoneNumber = phone => {
  return String(phone).replace(/[^\d]/g, "");
};
