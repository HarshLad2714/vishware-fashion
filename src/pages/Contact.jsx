import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Instagram, Mail, MapPin, Phone } from "lucide-react";
import { hasContactNumber, siteConfig, telHref } from "../data/siteConfig";
import { enquiryText, whatsappHref } from "../utils/whatsapp";
import { WhatsAppIcon } from "../components/common/Icons";
import Seo from "../components/common/Seo";

export default function Contact() {
  const [params] = useSearchParams();
  const piece = params.get("piece");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    message: piece
      ? `I'm interested in ${piece}.\nSize: ${params.get("size") || "—"} | Color: ${params.get("color") || "—"}`
      : "",
  });
  const [error, setError] = useState("");
  const map = `https://maps.google.com/maps?q=${encodeURIComponent(siteConfig.mapQuery)}&z=13&output=embed`;

  function setField(key, value) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function submit(event) {
    event.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.message.trim()) {
      setError("Name, phone and a short note are enough.");
      return;
    }
    setError("");
    const text = enquiryText(form);
    const wa = whatsappHref(text);
    if (wa) {
      window.open(wa, "_blank", "noopener,noreferrer");
      return;
    }
    window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent("Vishwear enquiry")}&body=${encodeURIComponent(text)}`;
  }

  return (
    <div className="mx-auto max-w-[1440px] px-5 pb-20 pt-28 md:px-12 md:pt-32">
      <Seo
        title="Contact"
        description={`Visit ${siteConfig.address}. WhatsApp, call, or send a note to the Vishwear atelier.`}
        path="/contact"
      />
      <p className="text-[11px] uppercase tracking-[0.32em] text-burgundy">The atelier</p>
      <h1 className="mt-3 font-serif text-5xl text-wine md:text-7xl">Write, or walk in.</h1>
      <div className="mt-6 h-px w-16 bg-gold" />

      <div className="mt-12 grid gap-12 lg:grid-cols-2">
        <div className="space-y-6">
          <p className="flex gap-3 text-sm leading-relaxed">
            <MapPin className="mt-0.5 text-burgundy" size={18} aria-hidden="true" />
            <span>
              {siteConfig.address}
              <span className="mt-1 block text-charcoal/60">{siteConfig.hours}</span>
            </span>
          </p>
          <p className="flex items-center gap-3 text-sm">
            <Mail className="text-burgundy" size={18} aria-hidden="true" />
            <a href={`mailto:${siteConfig.email}`} className="hover:text-burgundy">{siteConfig.email}</a>
          </p>
          {telHref() ? (
            <p className="flex items-center gap-3 text-sm">
              <Phone className="text-burgundy" size={18} aria-hidden="true" />
              <a href={telHref()}>{siteConfig.phoneDisplay}</a>
            </p>
          ) : null}
          <p className="flex items-center gap-3 text-sm">
            <Instagram className="text-burgundy" size={18} aria-hidden="true" />
            <a href={siteConfig.instagram} target="_blank" rel="noreferrer" className="hover:text-burgundy">
              {siteConfig.instagramHandle}
            </a>
          </p>
          <div className="h-72 overflow-hidden border border-goldsoft">
            <iframe title="Map showing the Vishwear atelier in Surat" src={map} className="h-full w-full grayscale" loading="lazy" />
          </div>
        </div>

        <form onSubmit={submit} className="border border-goldsoft p-6 md:p-8" noValidate>
          <p className="font-serif text-3xl text-wine">Send an enquiry</p>
          <p className="mt-2 text-sm text-charcoal/70">
            {hasContactNumber() ? "This opens WhatsApp with your note already written." : "This sends your note to the atelier by email."}
          </p>
          <label className="mt-8 block text-[11px] uppercase tracking-[0.18em] text-charcoal/60" htmlFor="name">Name</label>
          <input id="name" value={form.name} onChange={(event) => setField("name", event.target.value)} className="mt-2 w-full border-b border-goldsoft bg-transparent py-3 outline-none focus:border-burgundy" autoComplete="name" />
          <label className="mt-6 block text-[11px] uppercase tracking-[0.18em] text-charcoal/60" htmlFor="phone">Phone</label>
          <input id="phone" value={form.phone} onChange={(event) => setField("phone", event.target.value)} className="mt-2 w-full border-b border-goldsoft bg-transparent py-3 outline-none focus:border-burgundy" autoComplete="tel" inputMode="tel" />
          <label className="mt-6 block text-[11px] uppercase tracking-[0.18em] text-charcoal/60" htmlFor="message">Message</label>
          <textarea id="message" rows={4} value={form.message} onChange={(event) => setField("message", event.target.value)} className="mt-2 w-full resize-none border-b border-goldsoft bg-transparent py-3 outline-none focus:border-burgundy" />
          {error ? <p className="mt-4 text-sm text-burgundy">{error}</p> : null}
          <button type="submit" className="btn-shimmer mt-8 inline-flex items-center gap-2 bg-burgundy px-7 py-3.5 text-[11px] uppercase tracking-[0.22em] text-ivory hover:bg-wine">
            <WhatsAppIcon /> Send
          </button>
        </form>
      </div>
    </div>
  );
}
