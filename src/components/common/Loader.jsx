import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export default function Loader() {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (reduce) {
      setVisible(false);
      return undefined;
    }
    const timer = window.setTimeout(() => setVisible(false), 2400);
    return () => window.clearTimeout(timer);
  }, [reduce]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-ivory"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: "easeInOut" }}
          role="status"
          aria-label="Opening Vishwear"
        >
          <svg viewBox="0 0 80 150" className="h-36 w-16 text-gold" fill="none" aria-hidden="true">
            <motion.path
              d="M40 18 V92"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.15, ease: "easeInOut" }}
            />
            <motion.path
              d="M28 28c6 8 18 8 24 0"
              stroke="#6B1E2B"
              strokeWidth="1.2"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.7, delay: 0.85 }}
            />
            <circle cx="40" cy="18" r="5.5" stroke="#6B1E2B" strokeWidth="1.2" />
            <path d="M40 104 L36 132 L44 132 Z" fill="#D9B48F" />
          </svg>
          <motion.img
            src="/images/logo/logo.png"
            alt="Vishwear"
            className="mt-8 h-40 w-auto md:h-52"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.05, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
