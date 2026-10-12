import { Link } from "react-router-dom";
import { products } from "../../data/products";
import ProductCard from "../product/ProductCard";
import SectionTitle from "../common/SectionTitle";

export default function NewArrivals() {
  const newest = products
    .filter((product) => product.isNew)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 8);

  return (
    <section id="new" className="mx-auto max-w-[1440px] px-5 py-8 md:px-12 md:py-12">
      <div className="flex items-end justify-between gap-6">
        <SectionTitle eyebrow="Just in" title="New arrivals" text="Eight pieces from the latest cut." />
        <Link to="/collection?sort=newest" className="hidden text-[11px] uppercase tracking-[0.22em] text-burgundy md:inline">
          View all
        </Link>
      </div>
      <div className="mt-10 grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-4 md:gap-x-5">
        {newest.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
