import Catalog from "../components/product/Catalog";
import Seo from "../components/common/Seo";

export default function Collection() {
  return (
    <div className="mx-auto max-w-[1440px] px-5 pb-20 pt-28 md:px-12 md:pt-32">
      <Seo
        title="Collection"
        description="Black and white oversized printed tees from Vishwear. Choose a size and send the order on WhatsApp."
        path="/collection"
      />
      <Catalog
        heading="The collection"
        intro="Oversized tees in black and white, ₹599 each. Pick a size, then send the order on WhatsApp."
      />
    </div>
  );
}
