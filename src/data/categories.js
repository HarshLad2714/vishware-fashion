/**
 * Navi category: ahiya ek object add karo.
 * `slug` product ni `category` field sathe match thavo joie.
 * Bridal alag che — product par tag "bridal" muko, category change karvi na pade.
 */

export const categories = [
  {
    id: "sarees",
    name: "Sarees",
    slug: "sarees",
    image: "/images/categories/sarees.webp",
    description: "Timeless drapes, woven with a quiet gold edge.",
  },
  {
    id: "kurtis",
    name: "Kurtis",
    slug: "kurtis",
    image: "/images/categories/kurtis.webp",
    description: "Everyday silhouettes, finished like occasion wear.",
  },
  {
    id: "lehengas",
    name: "Lehengas",
    slug: "lehengas",
    image: "/images/categories/lehengas.webp",
    description: "Volume, embroidery, and a hem that knows how to move.",
  },
  {
    id: "gowns",
    name: "Gowns",
    slug: "gowns",
    image: "/images/categories/gowns.webp",
    description: "Satin columns for evenings that ask for stillness.",
  },
  {
    id: "co-ord-sets",
    name: "Co-ord Sets",
    slug: "co-ord-sets",
    image: "/images/categories/co-ord-sets.webp",
    description: "Matched separates, cut from one length of silk.",
  },
  {
    id: "western-wear",
    name: "Western Wear",
    slug: "western-wear",
    image: "/images/categories/western-wear.webp",
    description: "Tailoring with an atelier hand.",
  },
  {
    id: "kurtas",
    name: "Kurtas",
    slug: "kurtas",
    image: "/images/categories/kurtas.webp",
    description: "Ease, cut close to the craft.",
  },
  {
    id: "sherwanis",
    name: "Sherwanis",
    slug: "sherwanis",
    image: "/images/categories/sherwanis.webp",
    description: "Ceremony, held in ivory and gold.",
  },
  {
    id: "indo-western",
    name: "Indo-Western",
    slug: "indo-western",
    image: "/images/categories/indo-western.webp",
    description: "A bandhgala, cut for now.",
  },
  {
    id: "kids",
    name: "Kids",
    slug: "kids",
    image: "/images/categories/kids.webp",
    description: "Small festive sets, made with the same thread.",
  },
  {
    id: "accessories",
    name: "Accessories",
    slug: "accessories",
    image: "/images/categories/accessories.webp",
    description: "Gold, ribbon, and the last quiet detail.",
  },
  {
    id: "bridal",
    name: "Bridal",
    slug: "bridal",
    image: "/images/categories/bridal.webp",
    description: "Pieces kept for the day the silhouette has to last.",
  },
];

export function getCategory(slug) {
  return categories.find((category) => category.slug === slug);
}
