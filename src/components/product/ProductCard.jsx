import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { categoryName } from "../../data/products";
import { useUi } from "../../context/UiContext";
import { discountPercent, formatPrice } from "../../utils/formatPrice";
import SmartImage from "../common/SmartImage";

export default function ProductCard({ product }) {
  const { toggleWish, wished } = useUi();
  const saved = wished(product.id);
  const off = discountPercent(product.price, product.mrp);
  const second = product.images[1];

  return (
    <motion.article layout className="group" data-grow>
      <div className="relative">
        <Link to={`/product/${product.slug}`} className="block" aria-label={product.name}>
          <div className="relative aspect-[3/4] overflow-hidden bg-goldsoft/30">
            <SmartImage
              src={product.images[0]}
              alt={product.name}
              className="absolute inset-0 h-full w-full"
              imgClassName={`transition duration-700 ${second ? "group-hover:opacity-0" : "group-hover:scale-105"}`}
            />
            {second ? (
              <img
                src={second}
                alt=""
                className="absolute inset-0 h-full w-full object-cover opacity-0 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
              />
            ) : null}
            <span className="absolute inset-x-0 bottom-0 translate-y-full bg-burgundy py-3 text-center text-[11px] uppercase tracking-[0.22em] text-ivory transition duration-300 group-hover:translate-y-0">
              Enquire
            </span>
          </div>
        </Link>
        <button
          type="button"
          aria-label={saved ? `Remove ${product.name} from wishlist` : `Save ${product.name}`}
          aria-pressed={saved}
          onClick={() => toggleWish(product.id)}
          className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-ivory/90 text-burgundy"
        >
          <Heart size={16} fill={saved ? "currentColor" : "none"} />
        </button>
        {product.isNew ? (
          <span className="absolute left-3 top-3 bg-ivory/90 px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-burgundy">
            New
          </span>
        ) : null}
      </div>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-serif text-xl leading-tight text-wine md:text-2xl">
            <Link to={`/product/${product.slug}`}>{product.name}</Link>
          </h3>
          <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-charcoal/55">{categoryName(product.category)}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-charcoal">{formatPrice(product.price)}</p>
          {off > 0 ? (
            <p className="text-xs text-charcoal/45 line-through">{formatPrice(product.mrp)}</p>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}
