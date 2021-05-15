export const currencyFormatter = (data) => {
  return data.amount.toLocaleString(data.currency, {
    style: 'currency',
    currency: data.currency,
  });
};