/**
 * Versión simplificada para sanitización básica
 */
export const sanitizeInput = (input: string) => {
  if (typeof input !== "string") {
    if (input === null || input === undefined) return "";
    return String(input);
  }

  return input
    .trim()
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;")
    .replace(/`/g, "&#x60;")
    .replace(/javascript:/gi, "")
    .replace(/on\w+=/gi, "")
    .substring(0, 5000);
};

/**
 * Sanitiza específicamente para emails
 */
export const sanitizeEmail = (email: string) => {
  const sanitized = sanitizeInput(email)
    .toLowerCase()
    .replace(/[^\w@.\-+]/g, "");

  // Validación básica
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(sanitized) ? sanitized : "";
};
