import { motion } from "framer-motion";
import Button from "../common/Button";

const lines = ["Silhouette", "tera signature", "hamara"];

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-wine text-ivory">
      <img
        src="/images/hero/hero.webp"
        alt="Burgundy satin gown in the Vishwear atelier"
        className="ken absolute inset-0 h-full w-full object-cover"
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ivory/55 via-transparent to-wine/80" />
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1440px] flex-col justify-end px-5 pb-16 pt-32 md:px-12 md:pb-20">
        <p className="text-[11px] uppercase tracking-[0.42em] text-gold">The atelier</p>
        <h1 className="mt-4 max-w-5xl font-serif text-[16vw] leading-[0.84] text-ivory md:text-[7.4rem]">
          {lines.map((line, index) => (
            <span key={line} className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.9, delay: 0.15 + index * 0.12, ease: [0.22, 1, 0.36, 1] }}
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
            New arrivals
          </a>
        </div>
        <div className="mt-10 hidden items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-ivory/70 md:flex">
          <span className="h-10 w-px bg-gold" />
          Scroll
        </div>
      </div>
    </section>
  );
}
