import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { siteConfig } from "../../data/siteConfig";
import Button from "../common/Button";

export default function BrandStory() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section ref={ref} className="mx-auto grid max-w-[1440px] items-center gap-10 px-5 py-16 md:grid-cols-2 md:px-12 md:py-24">
      <div>
        <p className="text-[11px] uppercase tracking-[0.32em] text-burgundy">The house</p>
        <h2 className="mt-4 font-serif text-5xl italic leading-[0.95] text-wine md:text-6xl">
          {siteConfig.tagline}
        </h2>
        <div className="mt-6 h-px w-16 bg-gold" />
        <p className="mt-6 max-w-md text-sm leading-relaxed text-charcoal/80 md:text-base">
          Vishwear begins with a needle. One line of thread decides the shoulder, the fall of a saree, the quiet of a gown. We cut less, and we finish more — so the silhouette you wear can carry your name without saying it.
        </p>
        <div className="mt-8">
          <Button to="/about" variant="ghost">
            Read the story
          </Button>
        </div>
      </div>
      <div className="relative h-[70vh] overflow-hidden">
        <motion.img
          style={{ y }}
          src="/images/hero/atelier.webp"
          alt="Needle, gold thread and burgundy silk on the atelier table"
          className="absolute inset-x-0 -top-[8%] h-[116%] w-full object-cover"
        />
      </div>
    </section>
  );
}
