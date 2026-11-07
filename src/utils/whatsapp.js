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

export function orderText({ name, address, description, lines, total }) {
  const origin = typeof window !== "undefined" ? window.location.origin : siteConfig.url;
  const pieces = lines.map((line, index) => {
    const unit = line.product.price;
    const detail = [line.size && `Size: ${line.size}`, line.color && `Color: ${line.color}`].filter(Boolean).join(" | ");
    const money = unit == null ? "Price on request" : `${formatPrice(unit)} · ${formatPrice(unit * line.qty)}`;
    return [
      `${index + 1}. *${line.product.name}* (${line.product.id})`,
      detail || null,
      `Qty: ${line.qty} · ${money}`,
      `${origin}/product/${line.product.slug}`,
    ]
      .filter(Boolean)
      .join("\n");
  });
  const pricedLines = lines.filter((line) => line.product.price != null);
  const openPrice = pricedLines.length !== lines.length;
  const totalLabel = pricedLines.length === 0 ? "price on request" : openPrice ? `${formatPrice(total)} + price on request` : formatPrice(total);

  return [
    `*${siteConfig.name}*`,
    siteConfig.tagline,
    "",
    "*A message from Vishwear*",
    siteConfig.companyOrderMessage,
    "",
    "*Order*",
    `Name: ${name}`,
    `Address: ${address}`,
    `Description: ${description || "—"}`,
    "",
    "*Pieces*",
    pieces.join("\n\n"),
    "",
    `*Total: ${totalLabel}*`,
    siteConfig.shippingNote,
  ].join("\n");
}

export function whatsappHref(text) {
  if (!hasContactNumber()) return null;
  return `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(text)}`;
}
