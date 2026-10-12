import { motion } from "framer-motion";

export default function Ribbon() {
  return (
    <div className="px-5 py-2 md:px-12" aria-hidden="true">
      <svg viewBox="0 0 1200 48" className="h-10 w-full text-gold" fill="none">
        <motion.path
          d="M0 28 C 140 28 170 10 320 24 S 520 42 680 22 S 980 8 1200 26"
          stroke="currentColor"
          strokeWidth="1.2"
          initial={{ pathLength: 0, opacity: 0.4 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: 1.3, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}
