"use client";

import { useEffect, useRef, useState } from "react";
import { Logo } from "./Logo";
import { CloseIcon, InstagramIcon, MenuIcon, PinIcon, WhatsAppIcon } from "./Icons";
import { INSTAGRAM_URL, MAPS_URL, waLink } from "@/lib/site";

const LINKS = [
  { href: "#mujer", label: "Mujer" },
  { href: "#hombre", label: "Hombre" },
  { href: "#rubros", label: "Accesorios" },
  { href: "#local", label: "El local" },
  { href: "#horarios", label: "Horarios" },
];

// Solo datos reales del local; se repite para que la cinta corra sin cortes.
const ANNOUNCEMENTS = [
  "Consultas y reservas por WhatsApp",
  "Efectivo con descuento",
  "Débito, crédito en cuotas y transferencia",
  "Cambios fáciles en el local",
  "San Martín 3091, Ranchos",
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
    <>
      <div className="announce" role="region" aria-label="Novedades">
        <p className="sr-only">{ANNOUNCEMENTS.join(". ")}.</p>
        <div className="announce__track" aria-hidden="true">
          {[0, 1].map((copy) => (
            <ul key={copy} className="announce__list">
              {ANNOUNCEMENTS.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      <header className="site-header">
        <div className="site-header__bar">
          <button
            ref={toggleRef}
            type="button"
            className="icon-btn site-header__toggle"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>

          <nav aria-label="Principal" className="site-header__nav">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ))}
          </nav>

          <a href="#inicio" className="site-header__logo" aria-label="El Prado, volver al inicio">
            <Logo className="site-header__logo-svg" title="El Prado" />
          </a>

          <div className="site-header__tools">
            <a href={MAPS_URL} className="icon-btn hide-mobile" target="_blank" rel="noopener" aria-label="Cómo llegar">
              <PinIcon />
            </a>
            <a href={INSTAGRAM_URL} className="icon-btn hide-mobile" target="_blank" rel="noopener" aria-label="Instagram de El Prado">
              <InstagramIcon />
            </a>
            <a href={waLink()} className="icon-btn" target="_blank" rel="noopener" aria-label="Escribinos por WhatsApp">
              <WhatsAppIcon />
            </a>
          </div>
        </div>

        <div id="menu-mobile" ref={panelRef} className="menu-panel" data-open={open} inert={!open}>
          <nav aria-label="Menú" className="menu-panel__nav">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </a>
            ))}
            <a href={waLink()} className="btn btn-accent menu-panel__cta" target="_blank" rel="noopener" onClick={() => setOpen(false)}>
              <WhatsAppIcon />
              Consultá por WhatsApp
            </a>
            <a href={MAPS_URL} className="btn btn-outline" target="_blank" rel="noopener" onClick={() => setOpen(false)}>
              <PinIcon />
              Cómo llegar
            </a>
          </nav>
        </div>
      </header>
    </>
  );
}
