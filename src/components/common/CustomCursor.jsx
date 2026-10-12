import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dot = useRef(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(pointer: fine)");
    const sync = () => {
      const on = media.matches;
      setEnabled(on);
      document.body.classList.toggle("custom-cursor", on);
    };
    sync();
    media.addEventListener("change", sync);
    return () => {
      media.removeEventListener("change", sync);
      document.body.classList.remove("custom-cursor");
    };
  }, []);

  useEffect(() => {
    if (!enabled || !dot.current) return undefined;
    const node = dot.current;
    const move = (event) => {
      node.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
    };
    const over = (event) => {
      const hot = event.target instanceof Element && event.target.closest("a, button, [data-grow]");
      node.classList.toggle("is-hot", Boolean(hot));
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [enabled]);

  if (!enabled) return null;
  return <div ref={dot} className="cursor-dot" aria-hidden="true" />;
}
