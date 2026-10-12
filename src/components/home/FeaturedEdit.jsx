import { getProduct } from "../../data/products";
import { formatPrice } from "../../utils/formatPrice";
import Button from "../common/Button";

export default function FeaturedEdit() {
  const product = getProduct("vw-003");
  if (!product) return null;

  return (
    <section className="mx-auto grid max-w-[1440px] items-stretch gap-0 px-5 py-16 md:grid-cols-2 md:px-12 md:py-24">
      <div className="relative min-h-[70vh] overflow-hidden bg-goldsoft/30">
        <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover" loading="lazy" />
      </div>
      <div className="flex flex-col justify-center bg-wine px-6 py-12 text-ivory md:px-14">
        <p className="text-[11px] uppercase tracking-[0.32em] text-gold">Featured</p>
        <h2 className="mt-4 font-serif text-5xl leading-[0.95] md:text-6xl">{product.name}</h2>
        <div className="mt-6 h-px w-16 bg-gold" />
        <p className="mt-6 max-w-md text-sm leading-relaxed text-ivory/75 md:text-base">{product.description}</p>
        <p className="mt-6 font-serif text-3xl">{formatPrice(product.price)}</p>
        <div className="mt-8">
          <Button to={`/product/${product.slug}`} variant="light">
            Enquire on this piece
          </Button>
        </div>
      </div>
    </section>
  );
}
