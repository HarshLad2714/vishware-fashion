import { History, Package, ShieldCheck, Smartphone, Star } from "lucide-react";
import { siteConfig } from "../../data/siteConfig";

const assurances = [
  { icon: ShieldCheck, lines: ["100% Secure", "Payment"] },
  { icon: Smartphone, lines: ["Online Payment", "UPI"] },
  { icon: Package, lines: ["5 Days Returns", "& Exchange"] },
  { icon: History, lines: ["Fast", "Shipping"] },
  { icon: Star, lines: ["Quality", "Guaranteed"], filled: true },
];

export default function ProductAssurance() {
  return (
    <section className="mt-8" aria-label="Payment and delivery">
      <ul className="grid grid-cols-5 gap-2">
        {assurances.map(({ icon: Icon, lines, filled }) => (
          <li key={lines.join(" ")} className="flex min-h-[5.6rem] flex-col items-center justify-center rounded-2xl border border-black/[0.06] bg-[#F6F6F7] px-1.5 py-3 text-center">
            <Icon size={22} strokeWidth={1.75} className="text-charcoal" fill={filled ? "currentColor" : "none"} aria-hidden="true" />
            <p className="mt-2 text-[10px] font-medium leading-tight text-charcoal sm:text-[11px]">
              {lines[0]}
              <br />
              {lines[1]}
            </p>
          </li>
        ))}
      </ul>

      <div className="mt-4 rounded-2xl border border-black/[0.06] bg-[#F6F6F7] px-4 py-4 sm:flex sm:gap-6 sm:px-5">
        <p className="shrink-0 text-[11px] font-semibold uppercase tracking-[0.28em] text-charcoal">Shipping</p>
        <ul className="mt-3 space-y-1 text-sm leading-relaxed text-charcoal/80 sm:mt-0">
          {siteConfig.shippingPoints.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
