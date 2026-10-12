import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export default function Gallery({ images, name }) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const startX = useRef(0);
  const current = images[index] || images[0];

  useEffect(() => {
    setIndex(0);
  }, [name]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key === "ArrowRight") setIndex((value) => (value + 1) % images.length);
      if (event.key === "ArrowLeft") setIndex((value) => (value - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, images.length]);

  function shift(direction) {
    setIndex((value) => (value + direction + images.length) % images.length);
  }

  return (
    <div>
      <div
        className="relative aspect-[3/4] overflow-hidden bg-goldsoft/30"
        onTouchStart={(event) => {
          startX.current = event.touches[0].clientX;
        }}
        onTouchEnd={(event) => {
          const delta = event.changedTouches[0].clientX - startX.current;
          if (delta < -40) shift(1);
          if (delta > 40) shift(-1);
        }}
      >
        <button type="button" className="h-full w-full" onClick={() => setOpen(true)} aria-label={`Enlarge ${name}`}>
          <img src={current} alt={name} className="h-full w-full object-cover" />
        </button>
        {images.length > 1 ? (
          <>
            <button type="button" aria-label="Previous image" onClick={() => shift(-1)} className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center bg-ivory/85 text-burgundy">
              <ChevronLeft size={18} />
            </button>
            <button type="button" aria-label="Next image" onClick={() => shift(1)} className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center bg-ivory/85 text-burgundy">
              <ChevronRight size={18} />
            </button>
          </>
        ) : null}
      </div>
      {images.length > 1 ? (
        <div className="mt-3 flex gap-2">
          {images.map((image, imageIndex) => (
            <button
              key={image}
              type="button"
              aria-label={`View image ${imageIndex + 1}`}
              onClick={() => setIndex(imageIndex)}
              className={`h-20 w-16 overflow-hidden border ${imageIndex === index ? "border-burgundy" : "border-transparent"}`}
            >
              <img src={image} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      ) : null}

      {open ? (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-wine/92 p-4" role="dialog" aria-modal="true" aria-label={`${name} enlarged`}>
          <button type="button" className="absolute right-4 top-4 text-ivory" aria-label="Close image" onClick={() => setOpen(false)}>
            <X />
          </button>
          <img src={current} alt={name} className="max-h-[88vh] max-w-full object-contain" />
        </div>
      ) : null}
    </div>
  );
}
