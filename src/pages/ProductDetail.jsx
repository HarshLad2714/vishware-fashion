import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Heart, Phone, Share2 } from "lucide-react";
import { getProduct, products, categoryName } from "../data/products";
import { getCategory } from "../data/categories";
import { siteConfig, telHref } from "../data/siteConfig";
import { discountPercent, formatPrice } from "../utils/formatPrice";
import { enquiryText, whatsappHref } from "../utils/whatsapp";
import { useUi } from "../context/UiContext";
import Seo from "../components/common/Seo";
import Gallery from "../components/product/Gallery";
import ProductCard from "../components/product/ProductCard";
import { WhatsAppIcon } from "../components/common/Icons";
import NotFound from "./NotFound";

export default function ProductDetail() {
  const { slug } = useParams();
  const product = getProduct(slug);
  const { toggleWish, wished, viewProduct, recent } = useUi();
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [hint, setHint] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!product) return;
    setSize(product.sizes.length === 1 ? product.sizes[0] : "");
    setColor(product.colors[0]?.name || "");
    setHint("");
    viewProduct(product.id);
  }, [product, viewProduct]);

  if (!product) return <NotFound />;

  const category = getCategory(product.category);
  const off = discountPercent(product.price, product.mrp);
  const saved = wished(product.id);
  const wa = whatsappHref(enquiryText({ product, size, color }));
  const sameCategory = products.filter((item) => item.id !== product.id && item.category === product.category);
  const sameOccasion = products.filter(
    (item) =>
      item.id !== product.id &&
      item.category !== product.category &&
      item.tags.some((tag) => ["wedding", "bridal", "festive", "party"].includes(tag) && product.tags.includes(tag))
  );
  const related = [...sameCategory, ...sameOccasion].slice(0, 4);
  const recentProducts = recent.map((id) => products.find((item) => item.id === id)).filter((item) => item && item.id !== product.id).slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    sku: product.id,
    image: product.images.map((image) => `${siteConfig.url}${image}`),
    description: product.description,
    brand: { "@type": "Brand", name: "Vishwear" },
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: product.price,
      availability: "https://schema.org/InStock",
      url: `${siteConfig.url}/product/${product.slug}`,
    },
  };

  async function share() {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: product.name, text: product.name, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  function enquire(event) {
    if (!size) {
      event.preventDefault();
      setHint("Choose a size first.");
    }
  }

  return (
    <div className="mx-auto max-w-[1440px] px-5 pb-20 pt-28 md:px-12 md:pt-32">
      <Seo
        title={product.name}
        description={product.description}
        path={`/product/${product.slug}`}
        image={product.images[0]}
        jsonLd={jsonLd}
      />
      <nav className="mb-6 text-[11px] uppercase tracking-[0.16em] text-charcoal/60" aria-label="Breadcrumb">
        <Link to="/" className="hover:text-burgundy">Home</Link>
        <span className="px-2">/</span>
        <Link to="/collection" className="hover:text-burgundy">Collection</Link>
        <span className="px-2">/</span>
        <Link to={`/category/${product.category}`} className="hover:text-burgundy">{categoryName(product.category)}</Link>
        <span className="px-2">/</span>
        <span className="text-burgundy">{product.name}</span>
      </nav>

      <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <Gallery images={product.images} name={product.name} />
        <div className="lg:sticky lg:top-28">
          <p className="text-[11px] uppercase tracking-[0.28em] text-burgundy">{category?.name || categoryName(product.category)}</p>
          <h1 className="mt-3 font-serif text-5xl leading-[0.95] text-wine md:text-6xl">{product.name}</h1>
          <div className="mt-5 flex items-end gap-3">
            <p className="font-serif text-3xl text-charcoal">{formatPrice(product.price)}</p>
            {off > 0 ? (
              <>
                <p className="text-sm text-charcoal/45 line-through">{formatPrice(product.mrp)}</p>
                <p className="text-[11px] uppercase tracking-[0.16em] text-burgundy">{off}% off</p>
              </>
            ) : null}
          </div>
          <p className="mt-2 text-xs text-charcoal/60">Enquiry only. We confirm size and delivery on WhatsApp.</p>
          <p className="mt-6 max-w-lg text-sm leading-relaxed text-charcoal/80 md:text-base">{product.description}</p>

          <div className="mt-8">
            <p className="text-[11px] uppercase tracking-[0.2em] text-charcoal/70">Colour · {color || "Select"}</p>
            <div className="mt-3 flex gap-2">
              {product.colors.map((swatch) => (
                <button
                  key={swatch.name}
                  type="button"
                  aria-label={swatch.name}
                  aria-pressed={color === swatch.name}
                  onClick={() => setColor(swatch.name)}
                  className={`h-9 w-9 rounded-full border ${color === swatch.name ? "border-burgundy ring-2 ring-gold ring-offset-2" : "border-black/10"}`}
                  style={{ background: swatch.hex }}
                />
              ))}
            </div>
          </div>

          <div className="mt-6">
            <p className="text-[11px] uppercase tracking-[0.2em] text-charcoal/70">Size</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.sizes.map((item) => (
                <button
                  key={item}
                  type="button"
                  aria-pressed={size === item}
                  onClick={() => {
                    setSize(item);
                    setHint("");
                  }}
                  className={`min-w-12 border px-3 py-2 text-[12px] uppercase tracking-[0.12em] ${
                    size === item ? "border-burgundy bg-burgundy text-ivory" : "border-goldsoft hover:border-burgundy"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
            {hint ? <p className="mt-2 text-sm text-burgundy">{hint}</p> : null}
          </div>

          <dl className="mt-8 grid grid-cols-2 gap-4 border-y border-goldsoft py-5 text-sm">
            <div>
              <dt className="text-[11px] uppercase tracking-[0.16em] text-charcoal/50">Fabric</dt>
              <dd className="mt-1">{product.fabric}</dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-[0.16em] text-charcoal/50">Care</dt>
              <dd className="mt-1">{product.care}</dd>
            </div>
          </dl>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            {wa ? (
              <a
                href={wa}
                target="_blank"
                rel="noreferrer"
                onClick={enquire}
                className="btn-shimmer inline-flex flex-1 items-center justify-center gap-2 bg-burgundy px-6 py-4 text-[11px] uppercase tracking-[0.2em] text-ivory hover:bg-wine"
              >
                <WhatsAppIcon /> Enquire on WhatsApp
              </a>
            ) : (
              <Link
                to={`/contact?piece=${encodeURIComponent(product.name)}&size=${encodeURIComponent(size)}&color=${encodeURIComponent(color)}`}
                onClick={enquire}
                className="inline-flex flex-1 items-center justify-center gap-2 bg-burgundy px-6 py-4 text-center text-[11px] uppercase tracking-[0.2em] text-ivory"
              >
                Enquire with the atelier
              </Link>
            )}
            {telHref() ? (
              <a href={telHref()} className="inline-flex items-center justify-center gap-2 border border-burgundy px-6 py-4 text-[11px] uppercase tracking-[0.2em] text-burgundy">
                <Phone size={15} /> Call now
              </a>
            ) : null}
          </div>

          <div className="mt-4 flex gap-4">
            <button type="button" onClick={() => toggleWish(product.id)} className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.16em] text-burgundy">
              <Heart size={15} fill={saved ? "currentColor" : "none"} /> {saved ? "Saved" : "Save"}
            </button>
            <button type="button" onClick={share} className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.16em] text-burgundy">
              <Share2 size={15} /> {copied ? "Link copied" : "Share"}
            </button>
          </div>
        </div>
      </div>

      {related.length > 0 ? (
        <section className="mt-20">
          <h2 className="font-serif text-4xl text-wine">You may also like</h2>
          <div className="mt-8 grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-4">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      ) : null}

      {recentProducts.length > 0 ? (
        <section className="mt-16">
          <h2 className="font-serif text-3xl text-wine">Recently viewed</h2>
          <div className="mt-6 grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-4">
            {recentProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
