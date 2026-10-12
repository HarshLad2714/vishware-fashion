import Seo from "../components/common/Seo";
import Button from "../components/common/Button";

const steps = [
  {
    title: "Draft",
    text: "The silhouette is drawn before the cloth is cut. Shoulder, waist, hem — three decisions, then the needle.",
  },
  {
    title: "Stitch",
    text: "Satin, silk, velvet. Each one takes the thread differently. We follow the grain, not a template.",
  },
  {
    title: "Finish",
    text: "A ribbon, a border, a button. The last detail is the one a person remembers in a photograph.",
  },
];

export default function About() {
  return (
    <div className="pt-24 md:pt-28">
      <Seo
        title="About"
        description="Vishwear is a fashion atelier. Silhouette tera signature hamara — cloth cut with a needle, a ribbon, and time."
        path="/about"
        image="/images/hero/atelier.webp"
      />
      <section className="mx-auto grid max-w-[1440px] items-center gap-10 px-5 py-10 md:grid-cols-2 md:px-12 md:py-16">
        <div>
          <p className="text-[11px] uppercase tracking-[0.32em] text-burgundy">The house</p>
          <h1 className="mt-4 font-serif text-5xl leading-[0.95] text-wine md:text-7xl">
            Silhouette tera signature hamara
          </h1>
          <div className="mt-6 h-px w-16 bg-gold" />
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-charcoal/80 md:text-lg">
            Vishwear is a small fashion house. The mark is a W drawn as ribbon and needle — because that is the whole method. We drape, we tailor, and we leave the loudness out.
          </p>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-charcoal/80 md:text-lg">
            Phase one of the house is this catalog. You look, you choose a size and a colour, and you write to us. There is no cart. A person answers.
          </p>
        </div>
        <img src="/images/logo/logo.png" alt="Vishwear monogram, needle and ribbon" className="mx-auto w-full max-w-md" />
      </section>

      <section className="bg-wine px-5 py-16 text-ivory md:px-12 md:py-24">
        <div className="mx-auto grid max-w-[1440px] gap-10 md:grid-cols-3">
          {steps.map((step, index) => (
            <article key={step.title}>
              <p className="text-[11px] uppercase tracking-[0.28em] text-gold">0{index + 1}</p>
              <h2 className="mt-3 font-serif text-4xl">{step.title}</h2>
              <p className="mt-4 text-sm leading-relaxed text-ivory/75">{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-[1440px] items-center gap-10 px-5 py-16 md:grid-cols-2 md:px-12 md:py-24">
        <img
          src="/images/hero/atelier.webp"
          alt="Atelier table with needle, gold thread and burgundy silk"
          className="h-[60vh] w-full object-cover"
        />
        <div>
          <h2 className="font-serif text-5xl text-wine">Craft, kept visible</h2>
          <p className="mt-5 text-sm leading-relaxed text-charcoal/80 md:text-base">
            The photographs in this catalog are the first edit — a burgundy and champagne house, shot in daylight. When a new cloth is ready, it is added as a picture and a few lines in the product file. The site, and the QR on the visiting card, show it the same day.
          </p>
          <div className="mt-8">
            <Button to="/collection">Enter the collection</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
