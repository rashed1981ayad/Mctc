export function addCartQuantity(items, id, quantity, maxItems = 12) {
  const productId = Number(id);
  const amount = Number(quantity);
  if (!Number.isSafeInteger(productId) || productId < 1 || !Number.isInteger(amount) || amount < 1 || amount > 30) return items;

  const existing = items.find((item) => item.id === productId);
  if (existing) {
    if (existing.quantity + amount > 99) return items;
    return items.map((item) => item.id === productId ? { ...item, quantity: item.quantity + amount } : item);
  }
  if (items.length >= maxItems) return items;
  return [...items, { id: productId, quantity: amount }];
}
