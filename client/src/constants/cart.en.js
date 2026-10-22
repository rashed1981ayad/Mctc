export const cartEnglishContent = {
  lang: "en", direction: "ltr", productsPath: "/en/products-list", productPath: (id) => `/en/product/${id}`,
  title: "Build the right solution for your project", intro: "Choose the products and quantities you need, then send your request for a tailored offer from our team.",
  empty: "Your cart is empty.", browse: "Browse products", loading: "Loading cart products...",
  unavailable: "This product is no longer available. Remove it to continue.", item: "product", quantity: "Quantity",
  remove: "Remove", customerTitle: "Your details", name: "Name", phone: "Phone number",
  recommended: { title: "You may also like", loading: "Loading suggested products...", details: "View details", add: "Add to cart", full: "Cart is full" },
  email: "Email (optional)", notes: "Project notes (optional)", security: "Security check",
  send: "Send request", sending: "Saving request...", orderPrefix: "Request #",
  success: "Your request has been saved.",
  whatsappHint: "Open WhatsApp, then send the message to contact our team.",
  popupBlocked: "Your request was saved. Open the WhatsApp message below and press Send to contact us.",
  reopen: "Open WhatsApp", editAfterSend: "If you change your cart or details, you can create a new request.",
  errors: { missingSecurity: "Complete the security check first.", securityRender: "Security check could not load. Refresh the page and try again.", rate: "Too many requests. Try again in 15 minutes.", conflict: "Your request changed. Review the cart and send again to create a new request.", submit: "We could not confirm whether your request was saved. Retry with the same details to recover the result without duplicating it.", storage: "Your browser could not save retry information. Allow site storage and try again.", load: "Could not load cart products." }
};
