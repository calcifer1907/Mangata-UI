export const formatPrice = (newPrice: number, currency: string = "COP") => {
  const formatPrice = { COP: "es-CO", USD: "en-US" };

  type formatPriceType = keyof typeof formatPrice;

  const FORMAT_PRICE = new Intl.NumberFormat(
    formatPrice[currency as formatPriceType],
    {
      style: "currency",
      currency,
      minimumFractionDigits: 0, // Evitar mostrar los decimales
      maximumFractionDigits: 0, // Evitar decimales adicionales
    }
  ).format(newPrice);
  return `${FORMAT_PRICE}`;
};
