import { useState } from "react";

export default function SmartImage({ src, alt, className = "", imgClassName = "", priority = false }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-goldsoft/40 ${className}`}>
      {!loaded ? <div className="absolute inset-0 animate-pulse bg-goldsoft/60" aria-hidden="true" /> : null}
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`h-full w-full object-cover transition duration-700 ${loaded ? "opacity-100" : "opacity-0"} ${imgClassName}`}
      />
    </div>
  );
}
