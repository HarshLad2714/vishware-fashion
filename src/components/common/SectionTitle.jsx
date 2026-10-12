export default function SectionTitle({ eyebrow, title, text }) {
  return (
    <div className="max-w-2xl">
      {eyebrow ? (
        <p className="text-[11px] uppercase tracking-[0.32em] text-burgundy">{eyebrow}</p>
      ) : null}
      <h2 className="mt-3 font-serif text-4xl leading-[0.95] text-wine md:text-6xl">{title}</h2>
      <div className="mt-5 h-px w-16 bg-gold" />
      {text ? <p className="mt-5 text-sm leading-relaxed text-charcoal/75 md:text-base">{text}</p> : null}
    </div>
  );
}
