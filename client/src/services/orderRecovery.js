import { orderRequestSignature } from "./cartSubmission.js";

const STORAGE_KEY = "mctc-order-recovery-v1";
export const RECOVERY_TTL = 24 * 60 * 60 * 1000;

function recent(value, now) {
  return value && Number.isFinite(value.createdAt) && value.createdAt <= now && now - value.createdAt < RECOVERY_TTL;
}

function read(storage) {
  try { return JSON.parse(storage.getItem(STORAGE_KEY) || "{}") || {}; }
  catch { return {}; }
}

export async function requestFingerprint(customer, items, language) {
  const bytes = new TextEncoder().encode(orderRequestSignature(customer, items, language));
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, "0")).join("");
}

export function prepareOrderRequest(signature, storage = window.sessionStorage, now = Date.now()) {
  const state = read(storage);
  const previous = state.pending;
  const pending = recent(previous, now) && previous.signature === signature
    && /^[0-9a-f-]{36}$/i.test(previous.requestKey || "")
    ? previous : { signature, requestKey: crypto.randomUUID(), createdAt: now };
  // Persist before sending; a storage failure must not create an unrecoverable request.
  storage.setItem(STORAGE_KEY, JSON.stringify({
    pending, receipt: recent(state.receipt, now) ? state.receipt : null
  }));
  return pending;
}

export function readSavedOrder(storage = window.sessionStorage, now = Date.now()) {
  const receipt = read(storage).receipt;
  if (!recent(receipt, now)) return null;
  try {
    const url = new URL(receipt.whatsappUrl);
    if (url.origin !== "https://wa.me" || !/^\d+$/.test(String(receipt.orderId))) return null;
  } catch { return null; }
  return receipt;
}

export function rememberSavedOrder(pending, result, storage = window.sessionStorage, now = Date.now()) {
  const state = read(storage);
  const receipt = { orderId: result.orderId, whatsappUrl: result.whatsappUrl, createdAt: now };
  storage.setItem(STORAGE_KEY, JSON.stringify({
    pending: state.pending?.requestKey === pending.requestKey ? null : state.pending,
    receipt
  }));
  return receipt;
}

export function discardPendingRequest(pending, storage = window.sessionStorage) {
  const state = read(storage);
  if (state.pending?.requestKey !== pending?.requestKey) return;
  storage.setItem(STORAGE_KEY, JSON.stringify({ ...state, pending: null }));
}

export function navigateWhatsApp(popup, url) {
  try {
    if (!popup || popup.closed) return false;
    popup.location.href = url;
    return true;
  } catch { return false; }
}
