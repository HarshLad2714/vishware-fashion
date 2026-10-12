import Catalog from "../components/product/Catalog";
import Seo from "../components/common/Seo";

export default function Collection() {
  return (
    <div className="mx-auto max-w-[1440px] px-5 pb-20 pt-28 md:px-12 md:pt-32">
      <Seo
        title="Collection"
        description="Browse the Vishwear collection — sarees, lehengas, gowns, sherwanis and occasion wear. Filter by size, colour and price, then enquire on WhatsApp."
        path="/collection"
      />
      <Catalog
        heading="The collection"
        intro="Every piece in the house, in one edit. Filter by size, colour, occasion or price — then send an enquiry. We reply with availability."
      />
    </div>
  );
}
