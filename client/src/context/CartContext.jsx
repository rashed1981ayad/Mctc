import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { remainingAfterSubmission } from "../services/cartSubmission.js";
import { addCartQuantity } from "../services/cartQuantity.js";

const STORAGE_KEY = "almutqaddim-cart-v1";
export const MAX_CART_ITEMS = 12;
const CartContext = createContext(null);

function normalizeItems(value) {
  if (!Array.isArray(value)) return [];
  const seen = new Set();
  return value.filter((item) => {
    const id = Number(item?.id);
    const quantity = Number(item?.quantity);
    if (!Number.isSafeInteger(id) || id < 1 || !Number.isInteger(quantity) || quantity < 1 || quantity > 99 || seen.has(id) || seen.size >= MAX_CART_ITEMS) return false;
    seen.add(id);
    return true;
  }).map((item) => ({ id: Number(item.id), quantity: Number(item.quantity) }));
}

function readCart() {
  try {
    return normalizeItems(JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"));
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(readCart);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); } catch { /* Storage can be unavailable. */ }
  }, [items]);

  useEffect(() => {
    const sync = (event) => {
      if (event.key === STORAGE_KEY) setItems(readCart());
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  const value = useMemo(() => ({
    items,
    count: items.reduce((total, item) => total + item.quantity, 0),
    addItem(id, quantity = 1) {
      setItems((current) => addCartQuantity(current, id, quantity, MAX_CART_ITEMS));
    },
    putItem(id, quantity) {
      const productId = Number(id);
      const nextQuantity = Number(quantity);
      if (!Number.isSafeInteger(productId) || productId < 1 || !Number.isInteger(nextQuantity) || nextQuantity < 1 || nextQuantity > 99) return;
      setItems((current) => {
        if (current.some((item) => item.id === productId)) {
          return current.map((item) => item.id === productId ? { ...item, quantity: nextQuantity } : item);
        }
        if (current.length >= MAX_CART_ITEMS) return current;
        return [...current, { id: productId, quantity: nextQuantity }];
      });
    },
    setQuantity(id, quantity) {
      const productId = Number(id);
      const nextQuantity = Number(quantity);
      if (!Number.isInteger(nextQuantity)) return;
      setItems((current) => nextQuantity <= 0
        ? current.filter((item) => item.id !== productId)
        : current.map((item) => item.id === productId ? { ...item, quantity: Math.min(99, nextQuantity) } : item));
    },
    removeItem(id) { setItems((current) => current.filter((item) => item.id !== Number(id))); },
    clearCart() {
      setItems([]);
      try { localStorage.setItem(STORAGE_KEY, "[]"); } catch { /* Storage can be unavailable. */ }
    },
    removeSubmittedItems(snapshot) {
      setItems((current) => remainingAfterSubmission(current, normalizeItems(snapshot)));
    }
  }), [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const cart = useContext(CartContext);
  if (!cart) throw new Error("useCart must be used inside CartProvider");
  return cart;
}
