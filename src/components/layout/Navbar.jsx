import { useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Heart, Menu, Search, ShoppingBag, X } from "lucide-react";
import { useScrollDirection } from "../../hooks/useScrollDirection";
import { useUi } from "../../context/UiContext";

const links = [
  { to: "/", label: "Home" },
  { to: "/collection", label: "Collection" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const { wishlist, bagCount, searchOpen, setSearchOpen, menuOpen, setMenuOpen } = useUi();
  const { hidden, scrolled } = useScrollDirection(menuOpen || searchOpen);
  const isHome = pathname === "/";
  const solid = !isHome || scrolled || menuOpen;

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname, setMenuOpen, setSearchOpen]);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setMenuOpen, setSearchOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`transition-transform duration-500 ${hidden ? "-translate-y-full" : "translate-y-0"} ${
          solid ? "border-b border-goldsoft/80 bg-ivory/92 backdrop-blur-md" : "bg-gradient-to-b from-ivory/75 to-transparent"
        }`}
      >
        <div className="mx-auto flex h-[4.5rem] max-w-[1440px] items-center justify-between gap-4 px-4 md:h-20 md:px-8">
          <Link to="/" className="flex items-center gap-3" aria-label="Vishwear home">
            <img src="/images/logo/mark.png" alt="" className="h-11 w-auto md:h-14" />
            <span className="hidden flex-col leading-none sm:flex">
              <span className="font-serif text-[1.35rem] tracking-[0.28em] text-burgundy">VISHWEAR</span>
              <span className="mt-1 text-[9px] uppercase tracking-[0.22em] text-charcoal/60">
                Silhouette tera signature hamara
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `relative text-[12px] uppercase tracking-[0.22em] transition-colors ${
                    isActive ? "text-burgundy" : "text-charcoal/80 hover:text-burgundy"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    <span
                      className={`absolute -bottom-2 left-0 h-px bg-gold transition-all duration-300 ${
                        isActive ? "w-full" : "w-0"
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <button
              type="button"
              className="grid h-11 w-11 place-items-center text-burgundy"
              aria-label="Search the collection"
              onClick={() => {
                setMenuOpen(false);
                setSearchOpen(true);
              }}
            >
              <Search size={18} strokeWidth={1.5} />
            </button>
            <Link
              to="/bag"
              className="relative grid h-11 w-11 place-items-center text-burgundy"
              aria-label={`Bag, ${bagCount} pieces`}
            >
              <ShoppingBag size={18} strokeWidth={1.5} />
              {bagCount > 0 ? (
                <span className="absolute right-1 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-burgundy px-1 text-[9px] text-ivory">
                  {bagCount}
                </span>
              ) : null}
            </Link>
            <Link
              to="/wishlist"
              className="relative grid h-11 w-11 place-items-center text-burgundy"
              aria-label={`Wishlist, ${wishlist.length} saved`}
            >
              <Heart size={18} strokeWidth={1.5} fill={wishlist.length ? "currentColor" : "none"} />
              {wishlist.length > 0 ? (
                <span className="absolute right-1 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-burgundy px-1 text-[9px] text-ivory">
                  {wishlist.length}
                </span>
              ) : null}
            </Link>
            <button
              type="button"
              className="grid h-11 w-11 place-items-center text-burgundy lg:hidden"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </div>

      {menuOpen ? (
        <div className="fixed inset-0 top-[4.5rem] z-40 bg-ivory px-6 py-8 lg:hidden">
          <nav className="flex flex-col gap-5" aria-label="Mobile">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className="font-serif text-5xl text-wine"
              >
                {link.label}
              </NavLink>
            ))}
            <NavLink to="/bag" className="font-serif text-5xl text-wine">
              Bag
            </NavLink>
            <NavLink to="/wishlist" className="font-serif text-5xl text-wine">
              Wishlist
            </NavLink>
          </nav>
          <p className="mt-12 text-[11px] uppercase tracking-[0.28em] text-burgundy">Silhouette tera signature hamara</p>
        </div>
      ) : null}
    </header>
  );
}
