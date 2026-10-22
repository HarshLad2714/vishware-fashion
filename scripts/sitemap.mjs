import { writeFileSync } from "node:fs";
import { categories } from "../src/data/categories.js";
import { products } from "../src/data/products.js";

const base = (process.env.VITE_SITE_URL || "https://vishwear-fashion.netlify.app").replace(/\/$/, "");
const paths = [
  "/",
  "/collection",
  "/about",
  "/contact",
  "/bag",
  ...categories.map((category) => `/category/${category.slug}`),
  ...products.map((product) => `/product/${product.slug}`),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((path) => `  <url><loc>${base}${path}</loc></url>`).join("\n")}
</urlset>
`;

writeFileSync(new URL("../public/sitemap.xml", import.meta.url), xml);
console.log(`sitemap: ${paths.length} urls`);
