import { Helmet } from "react-helmet-async";
import { siteConfig } from "../../data/siteConfig";

export default function Seo({ title, description, path = "/", image = "/images/hero/hero.webp", jsonLd }) {
  const fullTitle = title ? `${title} · Vishwear` : `Vishwear — ${siteConfig.tagline}`;
  const desc = description || siteConfig.description;
  const url = `${siteConfig.url}${path}`;
  const imageUrl = image.startsWith("http") ? image : `${siteConfig.url}${image}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      {jsonLd ? <script type="application/ld+json">{JSON.stringify(jsonLd)}</script> : null}
    </Helmet>
  );
}
