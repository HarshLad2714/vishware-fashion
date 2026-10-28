import Seo from "../components/common/Seo";
import Hero from "../components/home/Hero";
import Marquee from "../components/home/Marquee";
import NewArrivals from "../components/home/NewArrivals";
import Ribbon from "../components/common/Ribbon";
import BrandStory from "../components/home/BrandStory";
import LookbookMarquee from "../components/home/LookbookMarquee";
import VisitCta from "../components/home/VisitCta";
import { siteConfig } from "../data/siteConfig";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ClothingStore",
    name: siteConfig.name,
    description: siteConfig.description,
    slogan: siteConfig.tagline,
    url: siteConfig.url,
    image: `${siteConfig.url}/images/products/vw-017-1.webp`,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Surat",
      addressRegion: "Gujarat",
      addressCountry: "IN",
    },
  };

  return (
    <>
      <Seo path="/" image="/images/products/vw-017-1.webp" jsonLd={jsonLd} />
      <Hero />
      <Marquee />
      <NewArrivals />
      <Ribbon />
      <BrandStory />
      <LookbookMarquee />
      <VisitCta />
    </>
  );
}
