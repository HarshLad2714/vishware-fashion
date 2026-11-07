import { History, Package, ShieldCheck, Smartphone, Star } from "lucide-react";
import { WhatsAppIcon } from "../common/Icons";

const assurances = [
  { icon: ShieldCheck, lines: ["100% Secure", "Payment"] },
  { icon: Smartphone, lines: ["Online Payment", "UPI"] },
  { icon: Package, lines: ["5 Days Returns", "& Exchange"] },
  { icon: History, lines: ["Fast", "Shipping"] },
  { icon: Star, lines: ["Quality", "Guaranteed"], filled: true },
];

function PayBadge({ label, children }) {
  return (
    <span className="inline-flex h-11 min-w-[4.75rem] items-center justify-center rounded-xl border border-black/10 bg-white px-2.5" aria-label={label} title={label}>
      {children}
    </span>
  );
}

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

      <h2 className="mt-8 text-center font-sans text-lg font-semibold tracking-tight text-charcoal sm:text-xl">100% Secure Payments</h2>
      <ul className="mt-4 flex flex-wrap items-center justify-center gap-2">
        <li>
          <span className="grid h-11 w-11 place-items-center rounded-full bg-[#25D366] text-white" aria-label="WhatsApp" title="WhatsApp">
            <WhatsAppIcon className="h-6 w-6" />
          </span>
        </li>
        <li>
          <PayBadge label="Visa">
            <span className="font-sans text-[15px] font-extrabold italic tracking-tight text-[#1A1F71]">VISA</span>
          </PayBadge>
        </li>
        <li>
          <PayBadge label="RuPay">
            <span className="font-sans text-[13px] font-bold tracking-tight text-[#0A2F5C]">
              Ru<span className="text-[#F37021]">Pay</span>
            </span>
          </PayBadge>
        </li>
        <li>
          <PayBadge label="Mastercard">
            <svg viewBox="0 0 36 22" className="h-6 w-9" aria-hidden="true">
              <circle cx="13" cy="11" r="8" fill="#EB001B" />
              <circle cx="23" cy="11" r="8" fill="#F79E1B" />
              <path d="M18 5.2a8 8 0 0 1 0 11.6 8 8 0 0 1 0-11.6z" fill="#FF5F00" />
            </svg>
          </PayBadge>
        </li>
        <li>
          <PayBadge label="UPI">
            <svg viewBox="0 0 48 22" className="h-5 w-11" aria-hidden="true">
              <text x="0" y="16" fill="#6F6F6F" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="700">
                UPI
              </text>
              <path d="M34 3l7 8-7 8h-3l7-8-7-8z" fill="#097939" />
              <path d="M38 3l7 8-7 8h-3l7-8-7-8z" fill="#ED752E" />
            </svg>
          </PayBadge>
        </li>
        <li>
          <PayBadge label="PhonePe">
            <span className="inline-flex items-center gap-1 rounded-md bg-[#5F259F] px-1.5 py-1 text-white">
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden="true">
                <path fill="currentColor" d="M8 1.2 9.4 6H14l-3.7 2.7 1.4 4.6L8 10.6 4.3 13.3l1.4-4.6L2 6h4.6z" />
              </svg>
              <span className="text-[10px] font-semibold leading-none">PhonePe</span>
            </span>
          </PayBadge>
        </li>
      </ul>
    </section>
  );
}
