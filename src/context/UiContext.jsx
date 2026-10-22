import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const UiContext = createContext(null);
const WISH_KEY = "vishwear-wishlist";
const RECENT_KEY = "vishwear-recent";
const BAG_KEY = "vishwear-bag";

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
  const [bag, setBag] = useState(() => readList(BAG_KEY));
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(WISH_KEY, JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem(RECENT_KEY, JSON.stringify(recent));
  }, [recent]);

  useEffect(() => {
    localStorage.setItem(BAG_KEY, JSON.stringify(bag));
  }, [bag]);

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

  const addToBag = useCallback((id, options = {}) => {
    const size = options.size || "";
    const color = options.color || "";
    setBag((current) => {
      const index = current.findIndex((item) => item.id === id && (item.size || "") === size && (item.color || "") === color);
      if (index === -1) return [...current, { id, qty: 1, size, color }];
      return current.map((item, itemIndex) => (itemIndex === index ? { ...item, qty: item.qty + 1 } : item));
    });
  }, []);

  const setBagQty = useCallback((index, qty) => {
    setBag((current) => {
      if (qty < 1) return current.filter((_, itemIndex) => itemIndex !== index);
      return current.map((item, itemIndex) => (itemIndex === index ? { ...item, qty } : item));
    });
  }, []);

  const removeFromBag = useCallback((index) => {
    setBag((current) => current.filter((_, itemIndex) => itemIndex !== index));
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
      bag,
      bagCount: bag.reduce((sum, item) => sum + item.qty, 0),
      bagQty: (id) => bag.filter((item) => item.id === id).reduce((sum, item) => sum + item.qty, 0),
      addToBag,
      setBagQty,
      removeFromBag,
      searchOpen,
      setSearchOpen,
      menuOpen,
      setMenuOpen,
      toggleWish,
      wished: (id) => wishlist.includes(id),
      viewProduct,
    }),
    [wishlist, recent, bag, searchOpen, menuOpen, toggleWish, viewProduct, addToBag, setBagQty, removeFromBag]
  );

  return <UiContext.Provider value={value}>{children}</UiContext.Provider>;
}

export function useUi() {
  const context = useContext(UiContext);
  if (!context) throw new Error("useUi must be used within UiProvider");
  return context;
}
