import { hasContactNumber, siteConfig } from "../data/siteConfig";
import { formatPrice } from "./formatPrice";

export function enquiryText({ product, size, color, name, phone, message }) {
  const origin = typeof window !== "undefined" ? window.location.origin : siteConfig.url;
  if (product) {
    return [
      "Hi Vishwear! 👋",
      "I'm interested in:",
      `*${product.name}* (${product.id})`,
      `Size: ${size || "—"} | Color: ${color || "—"}`,
      `Price: ${formatPrice(product.price)}`,
      `Link: ${origin}/product/${product.slug}`,
    ].join("\n");
  }
  return [
    "Hi Vishwear! 👋",
    name ? `Name: ${name}` : null,
    phone ? `Phone: ${phone}` : null,
    message || "I would like to enquire about the collection.",
  ]
    .filter(Boolean)
    .join("\n");
}

export function whatsappHref(text) {
  if (!hasContactNumber()) return null;
  return `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(text)}`;
}
