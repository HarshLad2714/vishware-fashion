/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        burgundy: "#6B1E2B",
        wine: "#4A111C",
        gold: "#D9B48F",
        goldsoft: "#EBD5BC",
        ivory: "#FFFBF7",
        charcoal: "#2B2B2B",
      },
      fontFamily: {
        serif: ["Cormorant Garamond", "Georgia", "serif"],
        sans: ["Jost", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        brand: "0.28em",
      },
      boxShadow: {
        soft: "0 20px 50px rgba(74, 17, 28, 0.08)",
      },
    },
  },
  plugins: [],
};
