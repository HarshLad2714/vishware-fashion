import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "../common/Button";

const lines = ["Silhouette", "tera signature", "hamara"];

const slides = [
  { src: "/images/products/vw-017-1.webp", alt: "Black oversized tee, Always Do Your Best" },
  { src: "/images/products/vw-019-1.webp", alt: "White oversized tee, She Is" },
  { src: "/images/products/vw-018-1.webp", alt: "Black oversized tee, Live in the Moment" },
  { src: "/images/products/vw-020-1.webp", alt: "White oversized tee, Grow Through" },
  { src: "/images/products/vw-021-1.webp", alt: "White oversized tee, Together in Every Season" },
  { src: "/images/products/vw-017-2.webp", alt: "Back of the black Always Do Your Best tee" },
  { src: "/images/products/vw-019-2.webp", alt: "Back of the white She Is tee" },
  { src: "/images/products/vw-018-2.webp", alt: "Back of the black Live in the Moment tee" },
  { src: "/images/products/vw-020-2.webp", alt: "Back of the white Grow Through tee" },
  { src: "/images/products/vw-021-2.webp", alt: "Back of the white Together tee" },
];

export default function Hero() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce) return undefined;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, 4200);
    return () => window.clearInterval(timer);
  }, [reduce]);

  function shift(direction) {
    setIndex((current) => (current + direction + slides.length) % slides.length);
  }

  const slide = slides[index];

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-wine text-ivory" aria-roledescription="carousel" aria-label="Black and white oversized tees">
      <AnimatePresence mode="sync">
        <motion.img
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          className="absolute inset-0 h-full w-full object-cover object-top"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          fetchPriority={index === 0 ? "high" : "auto"}
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-b from-ivory/45 via-transparent to-wine/80" />
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1440px] flex-col justify-end px-5 pb-16 pt-32 md:px-12 md:pb-20">
        <p className="text-[11px] uppercase tracking-[0.42em] text-gold">The atelier</p>
        <h1 className="mt-4 max-w-5xl font-serif text-[16vw] leading-[0.84] text-ivory md:text-[7.4rem]">
          {lines.map((line, lineIndex) => (
            <span key={line} className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.9, delay: 0.15 + lineIndex * 0.12, ease: [0.22, 1, 0.36, 1] }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Button to="/collection" variant="light">
            Explore collection
          </Button>
          <a href="#new" className="text-[11px] uppercase tracking-[0.22em] text-ivory/80">
            The tees
          </a>
        </div>
        <div className="mt-8 flex items-center gap-4">
          <button type="button" aria-label="Previous tee" onClick={() => shift(-1)} className="grid h-10 w-10 place-items-center border border-ivory/40 text-ivory">
            <ChevronLeft size={18} />
          </button>
          <div className="flex gap-2" role="tablist" aria-label="Tee photos">
            {slides.map((item, itemIndex) => (
              <button
                key={item.src}
                type="button"
                role="tab"
                aria-label={item.alt}
                aria-selected={itemIndex === index}
                onClick={() => setIndex(itemIndex)}
                className={`h-1.5 rounded-full transition-all ${itemIndex === index ? "w-6 bg-ivory" : "w-1.5 bg-ivory/45"}`}
              />
            ))}
          </div>
          <button type="button" aria-label="Next tee" onClick={() => shift(1)} className="grid h-10 w-10 place-items-center border border-ivory/40 text-ivory">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
