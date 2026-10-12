import { Link } from "react-router-dom";
import Seo from "../components/common/Seo";
import Button from "../components/common/Button";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[80vh] max-w-3xl flex-col items-start justify-center px-5 py-32 md:px-12">
      <Seo title="Page not found" description="This thread got lost. Return to the Vishwear collection." path="/404" />
      <svg viewBox="0 0 80 150" className="h-28 w-12 text-gold" fill="none" aria-hidden="true">
        <path d="M40 18 V92" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="40" cy="18" r="5.5" stroke="#6B1E2B" strokeWidth="1.2" />
        <path d="M40 104 L36 132 L44 132 Z" fill="#D9B48F" />
      </svg>
      <h1 className="mt-6 font-serif text-5xl text-wine md:text-7xl">This thread got lost.</h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-charcoal/75">
        The page is not in the house. The collection still is.
      </p>
      <div className="mt-8 flex gap-3">
        <Button to="/">Home</Button>
        <Link to="/collection" className="inline-flex items-center px-4 text-[11px] uppercase tracking-[0.2em] text-burgundy">
          Collection
        </Link>
      </div>
    </div>
  );
}
