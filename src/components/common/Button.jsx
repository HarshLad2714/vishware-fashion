import { Link } from "react-router-dom";

const styles = {
  solid: "bg-burgundy text-ivory hover:bg-wine",
  ghost: "border border-burgundy/25 text-burgundy hover:border-burgundy",
  light: "border border-ivory/40 text-ivory hover:bg-ivory hover:text-wine",
  gold: "bg-gold text-wine hover:bg-goldsoft",
};

export default function Button({ to, href, variant = "solid", className = "", children, ...props }) {
  const cls = `btn-shimmer inline-flex items-center justify-center gap-2 px-7 py-3.5 text-center text-[11px] font-medium uppercase tracking-[0.22em] transition-colors ${styles[variant] || styles.solid} ${className}`;
  if (to) {
    return (
      <Link to={to} className={cls}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={cls} {...props}>
        {children}
      </a>
    );
  }
  return (
    <button className={cls} {...props}>
      {children}
    </button>
  );
}
