import { X } from "lucide-react";
import { catalogColors, catalogSizes, occasions, priceBands } from "../../hooks/useCatalog";

function Chip({ active, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`border px-3 py-2 text-[11px] uppercase tracking-[0.14em] transition-colors ${
        active ? "border-burgundy bg-burgundy text-ivory" : "border-goldsoft text-charcoal hover:border-burgundy"
      }`}
    >
      {children}
    </button>
  );
}

function FilterBody({ size, color, occasion, price, onChange, onClear }) {
  const sizes = catalogSizes();
  const colors = catalogColors();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <p className="text-[11px] uppercase tracking-[0.28em] text-burgundy">Refine</p>
        <button type="button" onClick={onClear} className="text-[11px] uppercase tracking-[0.16em] text-charcoal/60 underline-offset-4 hover:underline">
          Clear
        </button>
      </div>

      <fieldset>
        <legend className="text-[11px] uppercase tracking-[0.2em] text-charcoal/70">Size</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {sizes.map((item) => (
            <Chip key={item} active={size === item} onClick={() => onChange({ size: size === item ? "" : item })}>
              {item}
            </Chip>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-[11px] uppercase tracking-[0.2em] text-charcoal/70">Colour</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {colors.map((swatch) => (
            <button
              key={swatch.name}
              type="button"
              aria-label={swatch.name}
              aria-pressed={color === swatch.name}
              title={swatch.name}
              onClick={() => onChange({ color: color === swatch.name ? "" : swatch.name })}
              className={`h-8 w-8 rounded-full border ${color === swatch.name ? "border-burgundy ring-2 ring-gold ring-offset-2" : "border-black/10"}`}
              style={{ background: swatch.hex }}
            />
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-[11px] uppercase tracking-[0.2em] text-charcoal/70">Occasion</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {occasions.map((item) => (
            <Chip
              key={item.id}
              active={occasion === item.id}
              onClick={() => onChange({ occasion: occasion === item.id ? "" : item.id })}
            >
              {item.label}
            </Chip>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-[11px] uppercase tracking-[0.2em] text-charcoal/70">Price</legend>
        <div className="mt-3 flex flex-col items-start gap-2">
          {priceBands.map((band) => (
            <Chip key={band.id} active={price === band.id} onClick={() => onChange({ price: band.id })}>
              {band.label}
            </Chip>
          ))}
        </div>
      </fieldset>
    </div>
  );
}

export default function Filters({ open, onClose, ...props }) {
  return (
    <>
      <aside className="hidden w-56 shrink-0 lg:block xl:w-64">
        <div className="sticky top-28">
          <FilterBody {...props} />
        </div>
      </aside>
      {open ? (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <button type="button" className="absolute inset-0 bg-wine/40" aria-label="Close filters" onClick={onClose} />
          <div className="absolute inset-y-0 right-0 w-[min(100%,22rem)] overflow-y-auto bg-ivory p-6">
            <button type="button" onClick={onClose} aria-label="Close filters" className="mb-6 text-burgundy">
              <X size={18} />
            </button>
            <FilterBody {...props} />
          </div>
        </div>
      ) : null}
    </>
  );
}
