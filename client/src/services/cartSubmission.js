export function orderRequestSignature(customer, items, language = "ar") {
  return JSON.stringify({
    customer: Object.fromEntries(["name", "phone", "email", "notes"].map(key => [key, String(customer[key] || "").trim()])),
    items: items.map(({ id, quantity }) => ({ id, quantity })).sort((a, b) => a.id - b.id),
    language
  });
}

export function remainingAfterSubmission(current, submitted) {
  const quantities = new Map(submitted.map(({ id, quantity }) => [id, quantity]));
  return current.filter((item) => quantities.get(item.id) !== item.quantity);
}
