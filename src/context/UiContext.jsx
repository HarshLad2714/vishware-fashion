import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const UiContext = createContext(null);
const WISH_KEY = "vishwear-wishlist";
const RECENT_KEY = "vishwear-recent";

function readList(key) {
  try {
    const parsed = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function UiProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => readList(WISH_KEY));
  const [recent, setRecent] = useState(() => readList(RECENT_KEY));
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(WISH_KEY, JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem(RECENT_KEY, JSON.stringify(recent));
  }, [recent]);

  useEffect(() => {
    const locked = searchOpen || menuOpen;
    document.body.style.overflow = locked ? "hidden" : "";
    if (locked) window.__lenis?.stop();
    else window.__lenis?.start();
    return () => {
      document.body.style.overflow = "";
    };
  }, [searchOpen, menuOpen]);

  const toggleWish = useCallback((id) => {
    setWishlist((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  }, []);

  const viewProduct = useCallback((id) => {
    setRecent((current) => {
      if (current[0] === id) return current;
      return [id, ...current.filter((item) => item !== id)].slice(0, 8);
    });
  }, []);

  const value = useMemo(
    () => ({
      wishlist,
      recent,
      searchOpen,
      setSearchOpen,
      menuOpen,
      setMenuOpen,
      toggleWish,
      wished: (id) => wishlist.includes(id),
      viewProduct,
    }),
    [wishlist, recent, searchOpen, menuOpen, toggleWish, viewProduct]
  );

  return <UiContext.Provider value={value}>{children}</UiContext.Provider>;
}

export function useUi() {
  const context = useContext(UiContext);
  if (!context) throw new Error("useUi must be used within UiProvider");
  return context;
}
