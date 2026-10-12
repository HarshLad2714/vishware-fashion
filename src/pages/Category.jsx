import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { getCategory } from "../data/categories";
import Catalog from "../components/product/Catalog";
import Seo from "../components/common/Seo";
import NotFound from "./NotFound";

export default function Category() {
  const { slug } = useParams();
  const category = getCategory(slug);
  if (!category) return <NotFound />;

  return (
    <div>
      <Seo
        title={category.name}
        description={category.description}
        path={`/category/${category.slug}`}
        image={category.image}
      />
      <section className="relative mt-20 h-[46vh] min-h-[280px] overflow-hidden md:mt-20">
        <img src={category.image} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-wine/75 via-wine/25 to-wine/10" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-[1440px] px-5 pb-8 md:px-12 md:pb-12">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[11px] uppercase tracking-[0.32em] text-gold"
          >
            Category
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="mt-2 font-serif text-5xl text-ivory md:text-7xl"
          >
            {category.name}
          </motion.h1>
        </div>
      </section>
      <div className="mx-auto max-w-[1440px] px-5 py-12 md:px-12 md:py-16">
        <Catalog forcedCategory={category.slug} intro={category.description} />
      </div>
    </div>
  );
}
