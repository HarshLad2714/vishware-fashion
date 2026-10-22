import { useEffect, useRef } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, MotionConfig, motion, useReducedMotion, useScroll } from "framer-motion";
import Lenis from "lenis";
import { UiProvider } from "./context/UiContext";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import SearchModal from "./components/layout/SearchModal";
import Loader from "./components/common/Loader";
import CustomCursor from "./components/common/CustomCursor";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import Category from "./pages/Category";
import ProductDetail from "./pages/ProductDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Wishlist from "./pages/Wishlist";
import Bag from "./pages/Bag";
import NotFound from "./pages/NotFound";

function SmoothScroll() {
  const { pathname } = useLocation();
  const reduce = useReducedMotion();
  const lenisRef = useRef(null);

  useEffect(() => {
    if (reduce) return undefined;
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    lenisRef.current = lenis;
    window.__lenis = lenis;
    let frame;
    const raf = (time) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      lenisRef.current = null;
      delete window.__lenis;
    };
  }, [reduce]);

  useEffect(() => {
    if (lenisRef.current) lenisRef.current.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      style={{ scaleX: scrollYProgress }}
      className="pointer-events-none fixed inset-x-0 top-0 z-[65] h-px origin-left bg-gold"
      aria-hidden="true"
    />
  );
}

export default function App() {
  const location = useLocation();

  return (
    <MotionConfig reducedMotion="user">
      <UiProvider>
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-ivory focus:px-3 focus:py-2">
          Skip to content
        </a>
        <Loader />
        <CustomCursor />
        <ScrollProgress />
        <SmoothScroll />
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <SearchModal />
          <main id="main" className="flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
              >
                <Routes location={location}>
                  <Route path="/" element={<Home />} />
                  <Route path="/collection" element={<Collection />} />
                  <Route path="/category/:slug" element={<Category />} />
                  <Route path="/product/:slug" element={<ProductDetail />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="/bag" element={<Bag />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </motion.div>
            </AnimatePresence>
          </main>
          <Footer />
        </div>
      </UiProvider>
    </MotionConfig>
  );
}
