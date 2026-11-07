import { useEffect, useState } from "react";
import { Star } from "lucide-react";

function Stars({ value, size = 14 }) {
  return (
    <span className="inline-flex gap-0.5" aria-label={`${value} out of 5`}>
      {[1, 2, 3, 4, 5].map((mark) => (
        <Star key={mark} size={size} className={mark <= value ? "fill-burgundy text-burgundy" : "text-goldsoft"} aria-hidden="true" />
      ))}
    </span>
  );
}

function when(iso) {
  return new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Kolkata" }).format(new Date(iso));
}

export default function ProductReviews({ productId }) {
  const [reviews, setReviews] = useState([]);
  const [status, setStatus] = useState("loading");
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    let ignore = false;
    setStatus("loading");
    fetch(`/api/reviews?product=${encodeURIComponent(productId)}`)
      .then((response) => response.json().then((body) => ({ ok: response.ok, body })))
      .then(({ ok, body }) => {
        if (ignore) return;
        if (!ok) {
          setStatus("error");
          return;
        }
        setReviews(body.reviews || []);
        setStatus("ready");
      })
      .catch(() => {
        if (!ignore) setStatus("error");
      });
    return () => {
      ignore = true;
    };
  }, [productId]);

  const average = reviews.length ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length : 0;

  async function submit(event) {
    event.preventDefault();
    if (!name.trim() || !text.trim()) {
      setError("Name and a review are needed.");
      return;
    }
    setSending(true);
    setError("");
    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ productId, name: name.trim(), text: text.trim(), rating }),
      });
      const body = await response.json().catch(() => ({}));
      if (!response.ok) {
        setError(body.error || "The review could not be saved.");
        return;
      }
      setReviews((current) => [body.review, ...current.filter((review) => review.id !== body.review.id)]);
      setName("");
      setText("");
      setRating(5);
      setStatus("ready");
    } catch {
      setError("The review could not be saved.");
    } finally {
      setSending(false);
    }
  }

  return (
    <section className="mt-16 border-t border-goldsoft pt-12" aria-labelledby="reviews-title">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.28em] text-burgundy">From customers</p>
          <h2 id="reviews-title" className="mt-2 font-serif text-4xl text-wine">Reviews</h2>
        </div>
        {reviews.length > 0 ? (
          <p className="flex items-center gap-2 text-sm text-charcoal/70">
            <Stars value={Math.round(average)} />
            <span>{average.toFixed(1)} · {reviews.length}</span>
          </p>
        ) : null}
      </div>

      {status === "loading" ? <p className="mt-6 text-sm text-charcoal/60">Loading reviews…</p> : null}
      {status === "error" ? <p className="mt-6 text-sm text-burgundy">Reviews could not be loaded.</p> : null}
      {status === "ready" && reviews.length === 0 ? (
        <p className="mt-6 text-sm text-charcoal/70">No reviews yet. Be the first to write about this tee.</p>
      ) : null}

      {reviews.length > 0 ? (
        <ul className="mt-6 divide-y divide-goldsoft border-y border-goldsoft">
          {reviews.map((review) => (
            <li key={review.id} className="py-5">
              <div className="flex flex-wrap items-center gap-3">
                <Stars value={review.rating} />
                <p className="text-sm font-medium text-wine">{review.name}</p>
                <p className="text-xs text-charcoal/50">{when(review.createdAt)}</p>
              </div>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-charcoal/80">{review.text}</p>
            </li>
          ))}
        </ul>
      ) : null}

      <form onSubmit={submit} className="mt-8 max-w-xl" noValidate>
        <p className="text-[11px] uppercase tracking-[0.2em] text-charcoal/60">Write a review</p>
        <div className="mt-3 flex gap-1" role="group" aria-label="Rating">
          {[1, 2, 3, 4, 5].map((mark) => (
            <button
              key={mark}
              type="button"
              aria-label={`${mark} star${mark > 1 ? "s" : ""}`}
              aria-pressed={rating === mark}
              onClick={() => setRating(mark)}
              className="p-1"
            >
              <Star size={18} className={mark <= rating ? "fill-burgundy text-burgundy" : "text-goldsoft"} />
            </button>
          ))}
        </div>
        <label className="mt-4 block text-[11px] uppercase tracking-[0.18em] text-charcoal/60" htmlFor="review-name">Name</label>
        <input id="review-name" value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" className="mt-2 w-full border-b border-goldsoft bg-transparent py-3 outline-none focus:border-burgundy" />
        <label className="mt-4 block text-[11px] uppercase tracking-[0.18em] text-charcoal/60" htmlFor="review-text">Review</label>
        <textarea id="review-text" rows={3} value={text} onChange={(event) => setText(event.target.value)} className="mt-2 w-full resize-none border-b border-goldsoft bg-transparent py-3 outline-none focus:border-burgundy" />
        {error ? <p className="mt-3 text-sm text-burgundy">{error}</p> : null}
        <button type="submit" disabled={sending} className="btn-shimmer mt-5 bg-burgundy px-6 py-3 text-[11px] uppercase tracking-[0.2em] text-ivory hover:bg-wine disabled:opacity-60">
          {sending ? "Saving…" : "Publish review"}
        </button>
      </form>
    </section>
  );
}
