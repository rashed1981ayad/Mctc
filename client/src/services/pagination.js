export function validPage(value) {
  const page = Number(value);
  return Number.isSafeInteger(page) && page > 0 ? page : 1;
}

export function correctedProductPage(currentPage, data) {
  if (!data || data.page !== currentPage) return currentPage;
  const lastPage = Math.max(1, Number(data.pages) || 0);
  return Math.min(currentPage, lastPage);
}
