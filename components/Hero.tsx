"use client";

import { useEffect, useRef } from "react";
import Image, { getImageProps } from "next/image";
import fachadaMobile from "@/assets/1.jpeg";
import fachadaDesktop from "@/media/fachada-esquina.jpg";
import salon from "@/assets/12.jpeg";
import { Logo } from "./Logo";
import { PinIcon, WhatsAppIcon } from "./Icons";
import { MAPS_URL, waLink } from "@/lib/site";

// Dónde está la puerta en cada foto (fracción del ancho y del alto).
const DOOR = {
  mobile: { x: 0.54, y: 0.55 },
  desktop: { x: 0.657, y: 0.61 },
};
const DESKTOP_MQ = "(min-width: 1024px)";

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

const FACHADA_ALT =
  "Fachada de El Prado: edificio de esquina color mostaza con ladrillo a la vista, carteles de madera con el nombre y la puerta de madera en la ochava.";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const insideRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const welcomeRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains("motion")) return;
    const section = sectionRef.current!;
    const photo = photoRef.current!;
    const inside = insideRef.current!;
    const panel = panelRef.current!;
    const welcome = welcomeRef.current!;
    const img = photo.querySelector("img")!;
    const mq = window.matchMedia(DESKTOP_MQ);

    let start = 0;
    let distance = 1;
    let frame = 0;
    // Geometría de la foto: borde izquierdo, ancho y origen del zoom (la puerta).
    let left0 = 0;
    let cw = 0;
    let ox = 0;
    let panelW = 0;

    // Ubica el origen del zoom sobre la puerta, teniendo en cuenta el recorte de object-fit: cover.
    const measure = () => {
      const rect = section.getBoundingClientRect();
      start = rect.top + window.scrollY - (parseFloat(getComputedStyle(root).getPropertyValue("--header-h")) || 64);
      distance = Math.max(1, section.offsetHeight - photo.offsetHeight);

      const desktop = mq.matches;
      const door = desktop ? DOOR.desktop : DOOR.mobile;
      left0 = photo.offsetLeft;
      cw = photo.offsetWidth;
      panelW = panel.offsetWidth;
      const ch = photo.offsetHeight;
      const iw = img.naturalWidth || (desktop ? 925 : 720);
      const ih = img.naturalHeight || (desktop ? 720 : 1280);
      const s = Math.max(cw / iw, ch / ih);
      const w = iw * s;
      const h = ih * s;
      ox = (cw - w) * (desktop ? 0.6 : 0.5) + door.x * w;
      const oy = (ch - h) * 0.5 + door.y * h;
      photo.style.transformOrigin = `${ox}px ${oy}px`;
      update();
    };

    const update = () => {
      frame = 0;
      const desktop = mq.matches;
      const p = clamp01((window.scrollY - start) / distance);
      const leave = desktop ? easeInOut(clamp01((p - 0.12) / 0.43)) : easeOut(clamp01(p / 0.35));
      const zoomT = clamp01(p / 0.85);
      const z = 1 + (desktop ? easeOut(zoomT) : easeInOut(zoomT)) * 1.7;
      const enter = clamp01((p - 0.55) / 0.27);
      const hello = clamp01((p - 0.8) / 0.15);

      // En desktop la foto arranca a la derecha del panel: si al agrandarse todavía no cubre
      // lo que el panel deja libre, se corre a la izquierda lo justo, sin destapar el borde derecho.
      let shift = 0;
      if (desktop) {
        const originX = left0 + ox;
        const leftEdge = originX - ox * z;
        const rightEdge = originX + (cw - ox) * z;
        const need = Math.max(0, leftEdge - panelW * (1 - leave));
        shift = Math.min(need, Math.max(0, rightEdge - window.innerWidth));
      }

      // Cuando el panel salió del todo, deja de ser visible (y de recibir foco).
      panel.style.visibility = leave >= 0.999 ? "hidden" : "";
      panel.style.transform = desktop
        ? `translate3d(${-leave * 100}%,0,0)`
        : `translate3d(0,${leave * 100}%,0)`;
      photo.style.transform = `translate3d(${-shift}px,0,0) scale(${z})`;
      inside.style.opacity = String(enter);
      inside.style.transform = `scale(${1.14 - enter * 0.14})`;
      welcome.style.opacity = String(hello);
      welcome.style.transform = `translate3d(0,${(1 - hello) * 16}px,0)`;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    mq.addEventListener("change", measure);
    if (!img.complete) img.addEventListener("load", measure, { once: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      mq.removeEventListener("change", measure);
    };
  }, []);

  const common = { alt: FACHADA_ALT, sizes: "(min-width: 1024px) 60vw, 100vw", quality: 75 };
  const { props: { srcSet: desktopSet } } = getImageProps({ ...common, src: fachadaDesktop });
  const { props: { srcSet: mobileSet, ...imgProps } } = getImageProps({ ...common, sizes: "100vw", src: fachadaMobile });

  return (
    <section id="inicio" ref={sectionRef} className="hero" aria-labelledby="hero-title">
      <div className="hero__stage">
        <div ref={photoRef} className="hero__photo">
          <picture>
            <source media={DESKTOP_MQ} srcSet={desktopSet} sizes="60vw" />
            <img {...imgProps} srcSet={mobileSet} fetchPriority="high" loading="eager" decoding="async" alt={FACHADA_ALT} />
          </picture>
        </div>

        <div ref={insideRef} className="hero__inside" aria-hidden="true">
          <Image src={salon} alt="" fill sizes="100vw" quality={60} className="object-cover" fetchPriority="low" />
        </div>

        <p ref={welcomeRef} className="hero__welcome serif" aria-hidden="true">
          Pasá, estás en El Prado.
        </p>

        <div ref={panelRef} className="hero__panel on-field">
          <div className="hero__panel-inner">
            <Logo className="hero__logo" title="El Prado, 1999" />
            <h1 id="hero-title" className="hero__title">
              <span className="sr-only">El Prado, tienda de ropa. </span>
              Desde 1999 en Ranchos
            </h1>
            <p className="hero__lead">
              Ropa de mujer y de hombre, de campo y de ciudad, en la esquina de San Martín y Alem.
            </p>
            <div className="hero__actions">
              <a href={waLink()} className="btn btn-accent" target="_blank" rel="noopener">
                <WhatsAppIcon />
                WhatsApp
              </a>
              <a href={MAPS_URL} className="btn btn-cream" target="_blank" rel="noopener">
                <PinIcon />
                Cómo llegar
              </a>
            </div>
            <p className="hero__hint" aria-hidden="true">
              Bajá y entrá al local
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
