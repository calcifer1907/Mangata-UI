/**
 * Versión simplificada para sanitización básica
 */
export const sanitizeInput = (texto: string) => {
  if (typeof texto !== "string") return "";

  // Eliminar caracteres peligrosos para inyección SQL y XSS
  return texto.replace(/[<>"'`;\\/&|+*=$%(){}[\]]/g, "");
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
