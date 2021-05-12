export const formatPrice = (value) => {
  const formattedValue = new Intl.NumberFormat("pt-BR", {
    currency: "BRL",
    style: "currency",
  }).format(value);

  return formattedValue;
};
