import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { categoryName, products } from "../../data/products";
import { formatPrice } from "../../utils/formatPrice";
import { useUi } from "../../context/UiContext";

export default function SearchModal() {
  const { searchOpen, setSearchOpen } = useUi();
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!searchOpen) return undefined;
    setQuery("");
    const timer = window.setTimeout(() => inputRef.current?.focus(), 40);
    return () => window.clearTimeout(timer);
  }, [searchOpen]);

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const source = needle
      ? products.filter((product) =>
          [product.name, product.fabric, product.category, ...product.tags].join(" ").toLowerCase().includes(needle)
        )
      : products.filter((product) => product.isNew);
    return source.slice(0, 6);
  }, [query]);

  if (!searchOpen) return null;

  function go(path) {
    setSearchOpen(false);
    navigate(path);
  }

  return (
    <div className="fixed inset-0 z-[60] bg-wine/40" role="dialog" aria-modal="true" aria-label="Search">
      <button type="button" className="absolute inset-0 cursor-default" aria-label="Close search" onClick={() => setSearchOpen(false)} />
      <div className="relative mx-auto mt-24 w-[min(720px,calc(100%-2rem))] bg-ivory p-6 shadow-soft md:p-8">
        <div className="flex items-center justify-between gap-4">
          <label htmlFor="site-search" className="text-[11px] uppercase tracking-[0.28em] text-burgundy">
            Search the atelier
          </label>
          <button type="button" aria-label="Close search" onClick={() => setSearchOpen(false)} className="text-burgundy">
            <X size={18} />
          </button>
        </div>
        <form
          className="mt-4"
          onSubmit={(event) => {
            event.preventDefault();
            go(`/collection?q=${encodeURIComponent(query.trim())}`);
          }}
        >
          <input
            id="site-search"
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Saree, gown, sherwani…"
            className="w-full border-b border-gold bg-transparent py-3 font-serif text-3xl text-wine outline-none placeholder:text-goldsoft"
          />
        </form>
        <ul className="mt-6 divide-y divide-goldsoft">
          {results.length === 0 ? (
            <li className="py-6 text-sm text-charcoal/70">Nothing by that name yet.</li>
          ) : (
            results.map((product) => (
              <li key={product.id}>
                <Link to={`/product/${product.slug}`} className="flex items-center gap-4 py-3">
                  <img src={product.images[0]} alt="" className="h-16 w-12 object-cover" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-serif text-xl text-wine">{product.name}</span>
                    <span className="text-[11px] uppercase tracking-[0.16em] text-charcoal/60">
                      {categoryName(product.category)}
                    </span>
                  </span>
                  <span className="text-sm">{formatPrice(product.price)}</span>
                </Link>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
