"use client";

import { useEffect, useRef, useState } from "react";
import { Logo } from "./Logo";
import { WhatsAppIcon } from "./Icons";
import { waLink } from "@/lib/site";

const LINKS = [
  { href: "#rubros", label: "Qué hay" },
  { href: "#local", label: "El local" },
  { href: "#horarios", label: "Horarios" },
  { href: "#contacto", label: "Contacto" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="site-header on-field">
      <div className="site-header__bar wrap">
        <a href="#inicio" className="site-header__logo" aria-label="El Prado, volver al inicio">
          <Logo className="h-11 w-auto" title="El Prado" />
        </a>

        <nav aria-label="Principal" className="site-header__nav">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="text-link-quiet">
              {l.label}
            </a>
          ))}
        </nav>

        <a href={waLink()} className="btn btn-accent site-header__cta" target="_blank" rel="noopener">
          <WhatsAppIcon />
          WhatsApp
        </a>

        <button
          ref={toggleRef}
          type="button"
          className="site-header__toggle"
          aria-expanded={open}
          aria-controls="menu-mobile"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Cerrar" : "Menú"}
        </button>
      </div>

      <div
        id="menu-mobile"
        ref={panelRef}
        className="menu-panel"
        data-open={open}
        inert={!open}
      >
        <nav aria-label="Menú" className="wrap menu-panel__nav">
          {LINKS.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{ "--i": i } as React.CSSProperties}
            >
              {l.label}
            </a>
          ))}
          <a
            href={waLink()}
            className="btn btn-accent menu-panel__cta"
            target="_blank"
            rel="noopener"
            onClick={() => setOpen(false)}
          >
            <WhatsAppIcon />
            Escribinos por WhatsApp
          </a>
        </nav>
      </div>
    </header>
  );
}
