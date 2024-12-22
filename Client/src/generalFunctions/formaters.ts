export const formatPrice = (newPrice: number) => {
  const FORMAT_PRICE = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0, // Evitar mostrar los decimales
    maximumFractionDigits: 0, // Evitar decimales adicionales
  }).format(newPrice);
  return `${FORMAT_PRICE}`;
};
