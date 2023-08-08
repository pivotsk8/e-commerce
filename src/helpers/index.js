export const formatCurrency = (price) =>
  Number(price).toLocaleString('es-CO', {
    style: 'currency',
    currency: 'COP',
  });

export const getCurrentDate = () => {
  const date = new Date();
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};
