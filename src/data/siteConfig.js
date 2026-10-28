/**
 * Vishwear — badhu brand detail ek j file ma.
 *
 * Phone / WhatsApp badalva: `whatsapp` ma country code muko, + vagar.
 *   Example: "919876543210"
 * Pachi address, email, Instagram pan ahiya j update karo.
 * Save kari ne push karo — website live thai jase. QR code same j rahese.
 */

export const siteConfig = {
  name: "Vishwear",
  tagline: "Silhouette tera signature hamara",
  description:
    "Vishwear oversized printed tees in black and white. Choose a size, then order on WhatsApp.",
  url: import.meta.env.VITE_SITE_URL || "https://vishwear-fashion.netlify.app",
  // Digits only, country code sathe, + vagar.
  whatsapp: "918160688508",
  phoneDisplay: "+91 81606 88508",
  email: "vishwear24@gmail.com",
  instagram: "https://www.instagram.com/vishwear_24",
  instagramHandle: "@vishwear_24",
  addressLines: ["Vishwear Atelier", "Surat, Gujarat"],
  address: "Vishwear Atelier, Surat, Gujarat",
  mapQuery: "Surat, Gujarat",
  hours: "Monday to Saturday, 11:00 – 20:00",
  // Bag order par user ne dekhay, ane WhatsApp message ni andar pan jaye. Edit kari shakay.
  companyOrderMessage:
    "Thank you for choosing Vishwear. This order has reached our atelier. We will confirm every piece, the size and delivery on this WhatsApp chat before it is prepared. Silhouette tera signature hamara.",
};

export function hasContactNumber() {
  return /^\d{11,15}$/.test(siteConfig.whatsapp);
}

export function telHref() {
  return hasContactNumber() ? `tel:+${siteConfig.whatsapp}` : null;
}
