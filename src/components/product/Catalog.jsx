import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SlidersHorizontal } from "lucide-react";
import { categories } from "../../data/categories";
import { useCatalog } from "../../hooks/useCatalog";
import Filters from "./Filters";
import ProductGrid from "./ProductGrid";

const sorts = [
  { id: "newest", label: "Newest" },
  { id: "price-asc", label: "Price · low to high" },
  { id: "price-desc", label: "Price · high to low" },
  { id: "name", label: "Name" },
];

export default function Catalog({ forcedCategory, heading, intro }) {
  const catalog = useCatalog(forcedCategory);
  const [visible, setVisible] = useState(8);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const filterKey = [catalog.category, catalog.sort, catalog.q, catalog.size, catalog.color, catalog.occasion, catalog.price].join("|");

  useEffect(() => {
    setVisible(8);
  }, [filterKey]);

  const shown = catalog.list.slice(0, visible);

  return (
    <div>
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        {heading ? (
          <div>
            <h1 className="font-serif text-5xl text-wine md:text-7xl">{heading}</h1>
            {intro ? <p className="mt-4 max-w-xl text-sm leading-relaxed text-charcoal/75 md:text-base">{intro}</p> : null}
          </div>
        ) : (
          <p className="max-w-xl text-sm leading-relaxed text-charcoal/70">{intro}</p>
        )}
        <p className="text-[11px] uppercase tracking-[0.22em] text-burgundy" aria-live="polite">
          {catalog.list.length} {catalog.list.length === 1 ? "piece" : "pieces"}
        </p>
      </div>

      <div className="no-scrollbar mt-8 flex gap-6 overflow-x-auto border-b border-goldsoft pb-3">
        <Link
          to="/collection"
          className={`shrink-0 text-[12px] uppercase tracking-[0.18em] ${!forcedCategory ? "text-burgundy" : "text-charcoal/60"}`}
        >
          All
        </Link>
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/category/${category.slug}`}
            className={`shrink-0 text-[12px] uppercase tracking-[0.18em] ${
              forcedCategory === category.slug ? "text-burgundy" : "text-charcoal/60 hover:text-burgundy"
            }`}
          >
            {category.name}
          </Link>
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="sr-only" htmlFor="catalog-search">Search this edit</label>
        <input
          id="catalog-search"
          value={catalog.q}
          onChange={(event) => catalog.update({ q: event.target.value })}
          placeholder="Search by name or fabric"
          className="w-full border-b border-goldsoft bg-transparent py-2 text-sm outline-none focus:border-burgundy sm:max-w-xs"
        />
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="inline-flex items-center gap-2 border border-goldsoft px-3 py-2 text-[11px] uppercase tracking-[0.16em] lg:hidden"
            onClick={() => setFiltersOpen(true)}
          >
            <SlidersHorizontal size={14} /> Filter
          </button>
          <label className="text-[11px] uppercase tracking-[0.16em] text-charcoal/60" htmlFor="sort">
            Sort
          </label>
          <select
            id="sort"
            value={catalog.sort}
            onChange={(event) => catalog.update({ sort: event.target.value })}
            className="bg-transparent py-2 text-sm outline-none"
          >
            {sorts.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-8 flex items-start gap-10">
        <Filters
          open={filtersOpen}
          onClose={() => setFiltersOpen(false)}
          size={catalog.size}
          color={catalog.color}
          occasion={catalog.occasion}
          price={catalog.price}
          onChange={catalog.update}
          onClear={catalog.clear}
        />
        <div className="min-w-0 flex-1">
          <ProductGrid products={shown} />
          {visible < catalog.list.length ? (
            <div className="mt-12 text-center">
              <button
                type="button"
                onClick={() => setVisible((count) => count + 8)}
                className="border border-burgundy px-8 py-3 text-[11px] uppercase tracking-[0.22em] text-burgundy hover:bg-burgundy hover:text-ivory"
              >
                Load more
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
