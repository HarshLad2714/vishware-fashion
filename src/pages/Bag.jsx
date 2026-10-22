import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";
import { products } from "../data/products";
import { hasContactNumber, siteConfig } from "../data/siteConfig";
import { useUi } from "../context/UiContext";
import { formatPrice } from "../utils/formatPrice";
import { orderText, whatsappHref } from "../utils/whatsapp";
import Seo from "../components/common/Seo";
import Button from "../components/common/Button";
import { WhatsAppIcon } from "../components/common/Icons";

const DRAFT_KEY = "vishwear-order-draft";

function readDraft() {
  try {
    const parsed = JSON.parse(localStorage.getItem(DRAFT_KEY) || "{}");
    return {
      name: parsed.name || "",
      address: parsed.address || "",
      description: parsed.description || "",
    };
  } catch {
    return { name: "", address: "", description: "" };
  }
}

export default function Bag() {
  const { bag, setBagQty, removeFromBag } = useUi();
  const [form, setForm] = useState(readDraft);
  const [error, setError] = useState("");

  const lines = useMemo(
    () =>
      bag
        .map((item, index) => ({ ...item, index, product: products.find((product) => product.id === item.id) }))
        .filter((item) => item.product),
    [bag]
  );
  const total = lines.reduce((sum, line) => sum + line.product.price * line.qty, 0);

  function setField(key, value) {
    setError("");
    setForm((current) => {
      const next = { ...current, [key]: value };
      localStorage.setItem(DRAFT_KEY, JSON.stringify(next));
      return next;
    });
  }

  function placeOrder(event) {
    event.preventDefault();
    if (!form.name.trim() || !form.address.trim()) {
      setError("Name and address are needed before the order can go out.");
      return;
    }
    if (lines.length === 0) {
      setError("Add at least one piece from the collection.");
      return;
    }
    setError("");
    const text = orderText({
      name: form.name.trim(),
      address: form.address.trim(),
      description: form.description.trim(),
      lines,
      total,
    });
    const wa = whatsappHref(text);
    if (wa) {
      window.open(wa, "_blank", "noopener,noreferrer");
      return;
    }
    window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent("Vishwear order")}&body=${encodeURIComponent(text)}`;
  }

  return (
    <div className="mx-auto max-w-[1440px] px-5 pb-20 pt-28 md:px-12 md:pt-32">
      <Seo
        title="Bag"
        description="Add Vishwear pieces to your bag and send the order on WhatsApp with your name and address."
        path="/bag"
      />
      <p className="text-[11px] uppercase tracking-[0.32em] text-burgundy">Your order</p>
      <h1 className="mt-3 font-serif text-5xl text-wine md:text-7xl">Bag</h1>

      {lines.length === 0 ? (
        <div className="mt-10 border border-goldsoft px-6 py-16">
          <p className="font-serif text-4xl text-wine">The bag is empty.</p>
          <p className="mt-3 max-w-md text-sm text-charcoal/70">Use the + on any piece in the collection. Add as many as you like.</p>
          <div className="mt-6">
            <Button to="/collection">Browse the collection</Button>
          </div>
        </div>
      ) : (
        <div className="mt-10 grid items-start gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <ul className="divide-y divide-goldsoft border-y border-goldsoft">
            {lines.map((line) => (
              <li key={`${line.id}-${line.size}-${line.color}-${line.index}`} className="flex gap-4 py-5">
                <Link to={`/product/${line.product.slug}`} className="h-28 w-20 shrink-0 overflow-hidden bg-goldsoft/40">
                  <img src={line.product.images[0]} alt="" className="h-full w-full object-cover" />
                </Link>
                <div className="min-w-0 flex-1">
                  <Link to={`/product/${line.product.slug}`} className="font-serif text-2xl text-wine">
                    {line.product.name}
                  </Link>
                  <p className="mt-1 text-sm text-charcoal/70">{formatPrice(line.product.price)}</p>
                  {line.size || line.color ? (
                    <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-charcoal/55">
                      {[line.size && `Size ${line.size}`, line.color].filter(Boolean).join(" · ")}
                    </p>
                  ) : null}
                  <div className="mt-3 flex items-center gap-3">
                    <button type="button" aria-label="Decrease quantity" onClick={() => setBagQty(line.index, line.qty - 1)} className="grid h-8 w-8 place-items-center border border-goldsoft text-burgundy">
                      <Minus size={14} />
                    </button>
                    <span className="min-w-6 text-center text-sm">{line.qty}</span>
                    <button type="button" aria-label="Increase quantity" onClick={() => setBagQty(line.index, line.qty + 1)} className="grid h-8 w-8 place-items-center border border-goldsoft text-burgundy">
                      <Plus size={14} />
                    </button>
                    <button type="button" onClick={() => removeFromBag(line.index)} className="ml-auto inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.14em] text-charcoal/55">
                      <Trash2 size={14} /> Remove
                    </button>
                  </div>
                </div>
                <p className="text-sm">{formatPrice(line.product.price * line.qty)}</p>
              </li>
            ))}
          </ul>

          <form onSubmit={placeOrder} className="border border-goldsoft p-6 md:p-8" noValidate>
            <p className="text-[11px] uppercase tracking-[0.28em] text-burgundy">From {siteConfig.name}</p>
            <div className="mt-4 border border-gold bg-goldsoft/30 p-4">
              <p className="font-serif text-2xl text-wine">A message from Vishwear</p>
              <p className="mt-3 text-sm leading-relaxed text-charcoal/80">{siteConfig.companyOrderMessage}</p>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-charcoal/60">
              This note is sent with every order. You will see it in WhatsApp before you press send.
            </p>

            <label className="mt-8 block text-[11px] uppercase tracking-[0.18em] text-charcoal/60" htmlFor="order-name">Name</label>
            <input id="order-name" value={form.name} onChange={(event) => setField("name", event.target.value)} autoComplete="name" className="mt-2 w-full border-b border-goldsoft bg-transparent py-3 outline-none focus:border-burgundy" />

            <label className="mt-6 block text-[11px] uppercase tracking-[0.18em] text-charcoal/60" htmlFor="order-address">Address</label>
            <textarea id="order-address" rows={3} value={form.address} onChange={(event) => setField("address", event.target.value)} autoComplete="street-address" className="mt-2 w-full resize-none border-b border-goldsoft bg-transparent py-3 outline-none focus:border-burgundy" />

            <label className="mt-6 block text-[11px] uppercase tracking-[0.18em] text-charcoal/60" htmlFor="order-note">Description</label>
            <textarea id="order-note" rows={3} value={form.description} onChange={(event) => setField("description", event.target.value)} placeholder="Size, colour, or when you need it" className="mt-2 w-full resize-none border-b border-goldsoft bg-transparent py-3 outline-none focus:border-burgundy" />

            <div className="mt-6 flex items-end justify-between border-t border-goldsoft pt-4">
              <p className="text-[11px] uppercase tracking-[0.2em] text-charcoal/60">Total</p>
              <p className="font-serif text-3xl text-wine">{formatPrice(total)}</p>
            </div>
            {error ? <p className="mt-4 text-sm text-burgundy">{error}</p> : null}
            <button type="submit" className="btn-shimmer mt-6 inline-flex w-full items-center justify-center gap-2 bg-burgundy px-6 py-4 text-[11px] uppercase tracking-[0.2em] text-ivory hover:bg-wine">
              <WhatsAppIcon /> {hasContactNumber() ? "Order on WhatsApp" : "Send the order"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
