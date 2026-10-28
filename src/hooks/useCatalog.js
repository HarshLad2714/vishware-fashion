import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { products } from "../data/products";

export const priceBands = [
  { id: "all", label: "All prices" },
  { id: "under-3000", label: "Under ₹3,000" },
  { id: "3000-8000", label: "₹3,000 – ₹8,000" },
  { id: "above-8000", label: "Above ₹8,000" },
];

export const occasions = [
  { id: "wedding", label: "Wedding" },
  { id: "festive", label: "Festive" },
  { id: "party", label: "Party" },
  { id: "casual", label: "Casual" },
];

const sizeOrder = ["XS", "S", "M", "L", "XL", "XXL", "Free", "2-3Y", "4-5Y", "6-7Y", "8-9Y"];

export function useCatalog(forcedCategory) {
  const [params, setParams] = useSearchParams();
  const sort = params.get("sort") || "newest";
  const q = params.get("q") || "";
  const size = params.get("size") || "";
  const color = params.get("color") || "";
  const occasion = params.get("occasion") || "";
  const price = params.get("price") || "all";
  const category = forcedCategory || params.get("category") || "all";

  const list = useMemo(() => {
    let next = products.filter((product) => product.inStock);
    if (category === "bridal") {
      next = next.filter((product) => product.tags.includes("bridal") || product.category === "bridal");
    } else if (category !== "all") {
      next = next.filter((product) => product.category === category);
    }
    if (q.trim()) {
      const needle = q.trim().toLowerCase();
      next = next.filter((product) =>
        [product.name, product.fabric, product.category, ...product.tags].join(" ").toLowerCase().includes(needle)
      );
    }
    if (size) next = next.filter((product) => product.sizes.includes(size));
    if (color) next = next.filter((product) => product.colors.some((swatch) => swatch.name === color));
    if (occasion) next = next.filter((product) => product.tags.includes(occasion));
    if (price === "under-3000") next = next.filter((product) => product.price != null && product.price < 3000);
    if (price === "3000-8000") next = next.filter((product) => product.price != null && product.price >= 3000 && product.price <= 8000);
    if (price === "above-8000") next = next.filter((product) => product.price != null && product.price > 8000);

    next = [...next];
    if (sort === "price-asc") next.sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity));
    else if (sort === "price-desc") next.sort((a, b) => (b.price ?? -1) - (a.price ?? -1));
    else if (sort === "name") next.sort((a, b) => a.name.localeCompare(b.name));
    else next.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    return next;
  }, [category, sort, q, size, color, occasion, price]);

  function update(patch) {
    const next = new URLSearchParams(params);
    Object.entries(patch).forEach(([key, value]) => {
      if (!value || value === "all") next.delete(key);
      else next.set(key, value);
    });
    setParams(next, { replace: true });
  }

  function clear() {
    setParams(new URLSearchParams(), { replace: true });
  }

  return { list, category, sort, q, size, color, occasion, price, update, clear };
}

export function catalogSizes() {
  const present = new Set(products.flatMap((product) => product.sizes));
  return sizeOrder.filter((size) => present.has(size));
}

export function catalogColors() {
  const map = new Map();
  products.forEach((product) => {
    product.colors.forEach((swatch) => map.set(swatch.name, swatch.hex));
  });
  return [...map.entries()].map(([name, hex]) => ({ name, hex }));
}
