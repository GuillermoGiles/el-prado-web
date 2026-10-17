"use client";

import { useEffect, useRef } from "react";
import Image, { getImageProps } from "next/image";
import fachadaMobile from "@/assets/1.jpeg";
import fachadaDesktop from "@/media/fachada-esquina.jpg";
import salon from "@/assets/12.jpeg";
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

/**
 * Hero a todo el ancho. Al bajar, la foto se acerca a la puerta de la esquina y pasa al salón
 * ("entrar al local"). Sin JS o con movimiento reducido queda como una foto fija.
 */
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const insideRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const welcomeRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains("motion")) return;
    const section = sectionRef.current!;
    const photo = photoRef.current!;
    const inside = insideRef.current!;
    const copy = copyRef.current!;
    const welcome = welcomeRef.current!;
    const img = photo.querySelector("img")!;
    const mq = window.matchMedia(DESKTOP_MQ);

    let start = 0;
    let distance = 1;
    let frame = 0;

    // Ubica el origen del zoom sobre la puerta, teniendo en cuenta el recorte de object-fit: cover.
    const measure = () => {
      const header = parseFloat(getComputedStyle(root).getPropertyValue("--header-h")) || 64;
      start = section.getBoundingClientRect().top + window.scrollY - header;
      distance = Math.max(1, section.offsetHeight - photo.offsetHeight);

      const door = mq.matches ? DOOR.desktop : DOOR.mobile;
      const cw = photo.offsetWidth;
      const ch = photo.offsetHeight;
      const iw = img.naturalWidth || (mq.matches ? 925 : 720);
      const ih = img.naturalHeight || (mq.matches ? 720 : 1280);
      const s = Math.max(cw / iw, ch / ih);
      const ox = (cw - iw * s) * 0.5 + door.x * iw * s;
      const oy = (ch - ih * s) * 0.5 + door.y * ih * s;
      photo.style.transformOrigin = `${ox}px ${oy}px`;
      update();
    };

    const update = () => {
      frame = 0;
      const p = clamp01((window.scrollY - start) / distance);
      const leave = easeOut(clamp01(p / 0.3));
      const zoom = easeInOut(clamp01(p / 0.85));
      const enter = clamp01((p - 0.55) / 0.27);
      const hello = clamp01((p - 0.8) / 0.15);

      copy.style.opacity = String(1 - leave);
      copy.style.transform = `translate3d(0,${-leave * 40}px,0)`;
      copy.style.visibility = leave >= 0.999 ? "hidden" : "";
      photo.style.transform = `scale(${1 + zoom * 1.7})`;
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

  const common = { alt: FACHADA_ALT, sizes: "100vw", quality: 75 };
  const { props: { srcSet: desktopSet } } = getImageProps({ ...common, src: fachadaDesktop });
  const { props: { srcSet: mobileSet, ...imgProps } } = getImageProps({ ...common, src: fachadaMobile });

  return (
    <section id="inicio" ref={sectionRef} className="hero" aria-labelledby="hero-title">
      <div className="hero__stage">
        <div ref={photoRef} className="hero__photo">
          <picture>
            <source media={DESKTOP_MQ} srcSet={desktopSet} sizes="100vw" />
            <img {...imgProps} srcSet={mobileSet} fetchPriority="high" loading="eager" decoding="async" alt={FACHADA_ALT} />
          </picture>
        </div>

        <div ref={insideRef} className="hero__inside" aria-hidden="true">
          <Image src={salon} alt="" fill sizes="100vw" quality={60} className="object-cover" fetchPriority="low" />
        </div>

        <div ref={copyRef} className="hero__copy">
          <p className="hero__kicker">El Prado · Ranchos</p>
          <h1 id="hero-title" className="hero__title display">
            <span className="sr-only">El Prado, tienda de ropa. </span>
            Desde 1999
            <br />
            en Ranchos
          </h1>
          <p className="hero__lead">
            Ropa de mujer y de hombre, de campo y de ciudad. Calzado, sombreros, mates y platería criolla.
          </p>
          <div className="hero__actions">
            <a href={waLink()} className="btn btn-accent" target="_blank" rel="noopener">
              <WhatsAppIcon />
              Consultá por WhatsApp
            </a>
            <a href={MAPS_URL} className="btn btn-light" target="_blank" rel="noopener">
              <PinIcon />
              Cómo llegar
            </a>
          </div>
        </div>

        <p ref={welcomeRef} className="hero__welcome display" aria-hidden="true">
          Pasá, estás en El Prado.
        </p>
      </div>
    </section>
  );
}
