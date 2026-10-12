import { Link } from "react-router-dom";
import { categories } from "../../data/categories";
import SectionTitle from "../common/SectionTitle";

export default function CategoryShowcase() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-16 md:px-12 md:py-24">
      <div className="flex items-end justify-between gap-6">
        <SectionTitle eyebrow="The edit" title="Twelve ways to arrive." />
        <Link to="/collection" className="hidden shrink-0 text-[11px] uppercase tracking-[0.22em] text-burgundy md:inline">
          All pieces
        </Link>
      </div>
      <div className="no-scrollbar mt-10 flex snap-x gap-4 overflow-x-auto pb-2">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/category/${category.slug}`}
            className="group w-[74vw] shrink-0 snap-start sm:w-[46vw] lg:w-[24vw]"
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-goldsoft/40">
              <img
                src={category.image}
                alt=""
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <svg className="pointer-events-none absolute inset-3 h-[calc(100%-1.5rem)] w-[calc(100%-1.5rem)] text-gold" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                <rect className="draw-rect" x="1" y="1" width="98" height="98" fill="none" stroke="currentColor" strokeWidth="0.7" />
              </svg>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-wine/70 to-transparent p-5">
                <h3 className="font-serif text-3xl text-ivory">{category.name}</h3>
              </div>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-charcoal/70">{category.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
