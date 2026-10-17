"use client";

import { useEffect, useRef, useState } from "react";

/** Las marcas en letras grandes; una por vez se enciende en tinta plena. */
export function BrandCycle({ brands }: { brands: readonly string[] }) {
  const [lit, setLit] = useState(0);
  const ref = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let id = 0;
    const io = new IntersectionObserver(([entry]) => {
      window.clearInterval(id);
      if (entry.isIntersecting) {
        id = window.setInterval(() => setLit((i) => (i + 1) % brands.length), 1800);
      }
    });
    io.observe(ref.current!);
    return () => {
      io.disconnect();
      window.clearInterval(id);
    };
  }, [brands.length]);

  return (
    <ul ref={ref} className="brands__list" aria-label="Marcas" data-many={brands.length > 3}>
      {brands.map((name, i) => (
        <li key={name} className="brands__name serif" data-lit={i === lit} data-reveal style={{ "--i": i } as React.CSSProperties}>
          {name}
        </li>
      ))}
    </ul>
  );
}
