import { products } from "../../data/products";

export default function LookbookMarquee() {
  const frames = products.filter((product) => product.images[0]).slice(0, 10);
  const loop = [...frames, ...frames];

  return (
    <section className="py-8 md:py-12" aria-label="Lookbook">
      <p className="px-5 text-center text-[11px] uppercase tracking-[0.32em] text-burgundy md:px-12">Lookbook</p>
      <div className="look mt-6 overflow-hidden">
        <div className="look-track flex w-max gap-3 px-3">
          {loop.map((product, index) => (
            <img
              key={`${product.id}-${index}`}
              src={product.images[0]}
              alt=""
              className="h-72 w-52 object-cover md:h-96 md:w-64"
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
