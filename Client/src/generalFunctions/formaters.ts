export const formatPrice = (newPrice: number) => {
  const FORMAT_PRICE = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
  }).format(newPrice);
  return `${FORMAT_PRICE}`;
};
