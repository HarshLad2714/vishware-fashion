import { products } from "../data/products";
import { useUi } from "../context/UiContext";
import Seo from "../components/common/Seo";
import ProductGrid from "../components/product/ProductGrid";
import Button from "../components/common/Button";

export default function Wishlist() {
  const { wishlist } = useUi();
  const saved = wishlist.map((id) => products.find((product) => product.id === id)).filter(Boolean);

  return (
    <div className="mx-auto max-w-[1440px] px-5 pb-20 pt-28 md:px-12 md:pt-32">
      <Seo title="Wishlist" description="Pieces you saved at Vishwear, kept on this device." path="/wishlist" />
      <p className="text-[11px] uppercase tracking-[0.32em] text-burgundy">Saved</p>
      <h1 className="mt-3 font-serif text-5xl text-wine md:text-7xl">Wishlist</h1>
      <p className="mt-4 max-w-lg text-sm text-charcoal/70">Kept on this phone or computer. It does not create an order — open a piece to enquire.</p>
      <div className="mt-10">
        {saved.length === 0 ? (
          <div className="border border-goldsoft px-6 py-16">
            <p className="font-serif text-4xl text-wine">Nothing saved yet.</p>
            <div className="mt-6">
              <Button to="/collection">Browse the collection</Button>
            </div>
          </div>
        ) : (
          <ProductGrid products={saved} />
        )}
      </div>
    </div>
  );
}
