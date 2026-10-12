const words = ["New arrivals", "Silhouette", "Signature", "Vishwear", "Atelier", "Needle & thread"];

export default function Marquee() {
  const unit = Array.from({ length: 4 }, () => words).flat();
  const loop = [...unit, ...unit];

  return (
    <div className="marquee overflow-hidden border-y border-goldsoft bg-ivory py-4" aria-hidden="true">
      <div className="marquee-track flex w-max items-center">
        {loop.map((word, index) => (
          <span key={`${word}-${index}`} className="flex items-center gap-8 px-4 text-[11px] uppercase tracking-[0.32em] text-burgundy">
            {word}
            <span className="text-gold">—</span>
          </span>
        ))}
      </div>
    </div>
  );
}
