import { siteConfig } from "../../data/siteConfig";
import { whatsappHref } from "../../utils/whatsapp";
import Button from "../common/Button";

export default function VisitCta() {
  const wa = whatsappHref("Hi Vishwear! 👋\nI would like to visit or enquire about a piece.");

  return (
    <section className="bg-burgundy px-5 py-20 text-ivory md:px-12 md:py-28">
      <div className="mx-auto max-w-4xl">
        <p className="text-[11px] uppercase tracking-[0.32em] text-gold">Visit · WhatsApp</p>
        <h2 className="mt-4 font-serif text-5xl leading-[0.95] md:text-7xl">
          Come see the cloth.
          <span className="mt-2 block italic text-goldsoft">Or send a note.</span>
        </h2>
        <p className="mt-6 max-w-lg text-sm leading-relaxed text-ivory/80 md:text-base">
          {siteConfig.address}. {siteConfig.hours}. Tell us the piece, the size, and when you need it — we reply on WhatsApp.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button to="/contact" variant="light">
            Visit the atelier
          </Button>
          {wa ? (
            <Button href={wa} target="_blank" rel="noreferrer" variant="gold">
              WhatsApp us
            </Button>
          ) : (
            <Button href={`mailto:${siteConfig.email}`} variant="gold">
              Write to us
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
