import { useEffect, useState } from "react";

export function useScrollDirection(paused = false) {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      if (paused) {
        setHidden(false);
      } else if (y > last && y > 90) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [paused]);

  return { hidden: paused ? false : hidden, scrolled };
}
