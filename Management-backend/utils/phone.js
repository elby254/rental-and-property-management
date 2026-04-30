function normalizePhoneNumber(value) {
  if (!value || typeof value !== "string") return value;

  let cleaned = value.trim().replace(/[^\d+]/g, "");

  if (cleaned.startsWith("00")) {
    cleaned = cleaned.slice(2);
  }

  if (cleaned.startsWith("+")) {
    return cleaned;
  }

  if (cleaned.startsWith("254")) {
    return "+" + cleaned;
  }

  if (cleaned.startsWith("0")) {
    return "+254" + cleaned.slice(1);
  }

  if (cleaned.length === 9 && cleaned.startsWith("7")) {
    return "+254" + cleaned;
  }

  return cleaned;
}

module.exports = { normalizePhoneNumber };