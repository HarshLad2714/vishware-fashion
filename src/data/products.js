/**
 * Oversized printed tees. Navo design: tee() call add karo, photos public/images/products/ ma.
 */

export const products = [
  tee({
    id: "vw-017",
    name: "Always Do Your Best Tee",
    slug: "always-do-your-best-tee",
    createdAt: "2026-10-28",
    description:
      "Oversized black tee, loose through the body and the sleeve. The chest reads Always Do Your Best. The back carries a full-colour nature graphic. Sizes S to XXL.",
    colors: [
      {
        name: "Black",
        hex: "#161616",
        images: [
          "/images/products/vw-017-1.webp",
          "/images/products/vw-017-2.webp",
          "/images/products/vw-017-3.webp",
          "/images/products/vw-017-4.webp",
          "/images/products/vw-017-5.webp",
        ],
      },
    ],
  }),
  tee({
    id: "vw-018",
    name: "Live in the Moment Tee",
    slug: "live-in-the-moment-tee",
    createdAt: "2026-10-27",
    description:
      "Oversized black tee. The chest reads Live in the Moment. The back is a London collage with Open Mind. Sizes S to XXL.",
    colors: [
      {
        name: "Black",
        hex: "#161616",
        images: [
          "/images/products/vw-018-1.webp",
          "/images/products/vw-018-2.webp",
          "/images/products/vw-018-3.webp",
          "/images/products/vw-018-4.webp",
        ],
      },
    ],
  }),
  tee({
    id: "vw-019",
    name: "She Is Tee",
    slug: "she-is-tee",
    createdAt: "2026-10-26",
    description:
      "Oversized white tee. The chest reads She Is, with a small camera. The back is a full-colour winged portrait. Sizes S to XXL.",
    colors: [
      {
        name: "White",
        hex: "#F4F1EC",
        images: [
          "/images/products/vw-019-1.webp",
          "/images/products/vw-019-2.webp",
          "/images/products/vw-019-3.webp",
          "/images/products/vw-019-4.webp",
          "/images/products/vw-019-5.webp",
        ],
      },
    ],
  }),
  tee({
    id: "vw-020",
    name: "Grow Through Tee",
    slug: "grow-through-tee",
    createdAt: "2026-10-25",
    description:
      "Oversized white tee. The chest reads Grow Through What You Go Through. The back is a wanderer and city graphic. Sizes S to XXL.",
    colors: [
      {
        name: "White",
        hex: "#F4F1EC",
        images: [
          "/images/products/vw-020-1.webp",
          "/images/products/vw-020-2.webp",
          "/images/products/vw-020-3.webp",
          "/images/products/vw-020-4.webp",
        ],
      },
    ],
  }),
  tee({
    id: "vw-021",
    name: "Together Tee",
    slug: "together-tee",
    createdAt: "2026-10-29",
    description:
      "Oversized white tee. A diagonal print across the front reads Together in Every Season. The back is plain. Sizes S to XXL.",
    colors: [
      {
        name: "White",
        hex: "#F4F1EC",
        images: [
          "/images/products/vw-021-1.webp",
          "/images/products/vw-021-2.webp",
          "/images/products/vw-021-3.webp",
          "/images/products/vw-021-4.webp",
        ],
      },
    ],
  }),
];

function tee({ id, name, slug, createdAt, description, colors }) {
  return {
    id,
    name,
    slug,
    category: "western-wear",
    price: 599,
    images: colors[0].images,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors,
    fabric: "Cotton jersey",
    description,
    care: "Machine wash cold. Dry in the shade.",
    tags: ["new", "casual"],
    isNew: true,
    isFeatured: false,
    inStock: true,
    createdAt,
  };
}

export function getProduct(slugOrId) {
  return products.find((product) => product.slug === slugOrId || product.id === slugOrId);
}

export function categoryName(slug) {
  if (slug === "bridal") return "Bridal";
  const names = {
    sarees: "Sarees",
    kurtis: "Kurtis",
    lehengas: "Lehengas",
    gowns: "Gowns",
    "co-ord-sets": "Co-ord Sets",
    "western-wear": "Western Wear",
    kurtas: "Kurtas",
    sherwanis: "Sherwanis",
    "indo-western": "Indo-Western",
    kids: "Kids",
    accessories: "Accessories",
  };
  return names[slug] || slug;
}
