const API_BASE = "/api";
let csrfToken = "";

export function expireSession() {
  csrfToken = "";
  window.location.replace("/login");
}

async function request(path, options = {}) {
  const headers = { ...(options.headers || {}) };
  if (options.body && !(options.body instanceof FormData)) headers["Content-Type"] = "application/json";
  if (options.method && options.method !== "GET") headers["X-CSRF-Token"] = csrfToken;

  const response = await fetch(`${API_BASE}${path}`, { ...options, headers, credentials: "same-origin" });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(data.message || "تعذر تنفيذ الطلب");
    error.status = response.status;
    if (response.status === 401 && path !== "/auth/session" && path !== "/auth/logout") expireSession();
    throw error;
  }
  return data;
}

export const api = {
  async getSession() {
    const data = await request("/auth/session");
    csrfToken = data.csrfToken;
    return data;
  },
  async logout() {
    const data = await request("/auth/logout", { method: "POST" });
    csrfToken = "";
    return data;
  },
  listProducts: (params = {}) => request(`/products?${new URLSearchParams(params)}`),
  getProduct: (id) => request(`/products/${id}`),
  getOptions: (params = {}) => request(`/products/meta/options?${new URLSearchParams(params)}`),
  listOrders: (params = {}) => request(`/orders?${new URLSearchParams(params)}`),
  updateOrderStatus: (id, status) => request(`/orders/${id}/status`, { method: "PATCH", body: JSON.stringify({ status }) }),
  listContactMessages: (params = {}) => request(`/contact/messages?${new URLSearchParams(params)}`),
  getContactMessage: (id) => request(`/contact/messages/${id}`),
  updateContactMessageStatus: (id, status) => request(`/contact/messages/${id}/status`, { method: "PATCH", body: JSON.stringify({ status }) }),
  updateContactMessagesStatus: (ids, status) => request("/contact/messages/bulk-status", { method: "PATCH", body: JSON.stringify({ ids, status }) }),
  deleteContactMessage: (id) => request(`/contact/messages/${id}`, { method: "DELETE" }),
  deleteContactMessages: (ids) => request("/contact/messages/bulk-delete", { method: "POST", body: JSON.stringify({ ids }) }),
  createProduct: (formData, turnstileToken) => request("/products", { method: "POST", body: formData, headers: { "X-Turnstile-Token": turnstileToken } }),
  updateProduct: (id, formData, turnstileToken) => request(`/products/${id}`, { method: "PUT", body: formData, headers: { "X-Turnstile-Token": turnstileToken } }),
  deleteProduct: (id) => request(`/products/${id}`, { method: "DELETE" })
};
