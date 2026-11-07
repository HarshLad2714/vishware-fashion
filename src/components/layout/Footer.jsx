import { Link } from "react-router-dom";
import { Instagram, Mail, MapPin } from "lucide-react";
import { siteConfig, hasContactNumber } from "../../data/siteConfig";
import { WhatsAppIcon } from "../common/Icons";
import { whatsappHref } from "../../utils/whatsapp";

export default function Footer() {
  const wa = whatsappHref("Hi Vishwear! 👋\nI would like to know more about the collection.");

  return (
    <footer className="bg-wine text-ivory">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-16 md:grid-cols-[1.3fr_1fr_1fr_1fr] md:px-10">
        <div>
          <div className="inline-block bg-ivory px-4 py-3">
            <img src="/images/logo/logo.png" alt="Vishwear" className="h-28 w-auto" />
          </div>
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-ivory/75">
            A needle, a ribbon, and the silhouette you keep. Enquire on WhatsApp — we confirm size, colour and delivery by hand.
          </p>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.28em] text-gold">Explore</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/collection" className="hover:text-gold">Collection</Link></li>
            <li><Link to="/bag" className="hover:text-gold">Bag</Link></li>
            <li><Link to="/wishlist" className="hover:text-gold">Wishlist</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.28em] text-gold">Atelier</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-gold">Our story</Link></li>
            <li><Link to="/contact" className="hover:text-gold">Visit & contact</Link></li>
            <li><Link to="/collection?sort=newest" className="hover:text-gold">New arrivals</Link></li>
            <li><Link to="/admin" className="hover:text-gold">Admin</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.28em] text-gold">Visit</p>
          <p className="mt-4 flex gap-2 text-sm leading-relaxed text-ivory/80">
            <MapPin size={16} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
            <span>
              {siteConfig.addressLines.map((line) => (
                <span key={line} className="block">{line}</span>
              ))}
              <span className="mt-2 block text-ivory/60">{siteConfig.hours}</span>
            </span>
          </p>
          <div className="mt-5 flex gap-3">
            {wa ? (
              <a href={wa} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="grid h-10 w-10 place-items-center border border-ivory/20 hover:border-gold">
                <WhatsAppIcon />
              </a>
            ) : null}
            <a href={`mailto:${siteConfig.email}`} aria-label="Email" className="grid h-10 w-10 place-items-center border border-ivory/20 hover:border-gold">
              <Mail size={16} />
            </a>
            <a href={siteConfig.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="grid h-10 w-10 place-items-center border border-ivory/20 hover:border-gold">
              <Instagram size={16} />
            </a>
          </div>
          {hasContactNumber() ? (
            <a href={`tel:+${siteConfig.whatsapp}`} className="mt-4 inline-block text-sm text-gold">
              {siteConfig.phoneDisplay}
            </a>
          ) : (
            <a href={`mailto:${siteConfig.email}`} className="mt-4 inline-block text-sm text-gold">
              {siteConfig.email}
            </a>
          )}
        </div>
      </div>
      <div className="border-t border-ivory/10 px-5 py-5 text-center text-[11px] uppercase tracking-[0.22em] text-ivory/50 md:px-10">
        © {new Date().getFullYear()} Vishwear · {siteConfig.tagline}
      </div>
    </footer>
  );
}
