import { LayoutGroup } from "framer-motion";
import ProductCard from "./ProductCard";

export default function ProductGrid({ products }) {
  if (products.length === 0) {
    return (
      <div className="border border-goldsoft px-6 py-20 text-center">
        <p className="font-serif text-4xl text-wine">No pieces on this thread.</p>
        <p className="mt-3 text-sm text-charcoal/70">Try another size, colour, or clear the filters.</p>
      </div>
    );
  }

  return (
    <LayoutGroup>
      <div className="grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-3 md:gap-x-5 xl:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </LayoutGroup>
  );
}
