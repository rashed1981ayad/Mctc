export function normalizePhone(value) {
  if (typeof value !== "string") return null;
  const phone = value.trim()
    .replace(/[٠-٩]/g, (digit) => String(digit.charCodeAt(0) - 0x660))
    .replace(/[۰-۹]/g, (digit) => String(digit.charCodeAt(0) - 0x6f0));
  const digitCount = (phone.match(/\d/g) || []).length;
  if (phone.length > 60 || digitCount < 6 || digitCount > 20 || !/^\+?[0-9\s()-]+$/.test(phone)) return null;
  return phone;
}
