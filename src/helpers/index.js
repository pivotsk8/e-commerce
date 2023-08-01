export const formatCurrency = (price) =>
  Number(price).toLocaleString('es-CO', {
    style: 'currency',
    currency: 'COP',
  });
