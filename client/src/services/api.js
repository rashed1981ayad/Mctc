const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api";

export function imageUrl(value) {
  if (!value) return "";
  if (value.startsWith("http") || value.startsWith("/hero")) return value;
  return `${API_BASE.replace("/api", "")}${value}`;
}

async function request(path, options = {}) {
  const headers = { ...(options.headers || {}) };
  if (options.body && !(options.body instanceof FormData)) headers["Content-Type"] = "application/json";

  const response = await fetch(`${API_BASE}${path}`, { ...options, headers });
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(data.message || "تعذر تنفيذ الطلب");
    error.status = response.status;
    throw error;
  }

  return data;
}

export const api = {
  listProducts: (params = {}) => request(`/products?${new URLSearchParams(params)}`),
  getProduct: (id) => request(`/products/${id}`),
  getOptions: () => request("/products/meta/options"),
  getCartProducts: (ids) => request(`/products/cart/items?${new URLSearchParams({ ids: ids.join(",") })}`),
  getCartRecommendations: () => request("/products/cart/recommendations"),
  createOrder: (payload) => request("/orders", { method: "POST", body: JSON.stringify(payload) }),
  sendContactMessage: (payload) => request("/contact", { method: "POST", body: JSON.stringify(payload) }),
};
