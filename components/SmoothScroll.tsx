"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Scroll suave con inercia para la rueda del mouse y el trackpad (Lenis).
 * En el celular el deslizamiento táctil sigue siendo el nativo. Con "reducir movimiento"
 * activado en el sistema, Lenis vuelve al scroll normal.
 */
export function SmoothScroll() {
  useEffect(() => {
    const root = document.documentElement;
    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.1,
      smoothWheel: true,
      syncTouch: false,
      allowNestedScroll: true,
    });

    // Links internos (#rubros, #horarios…): se calcula el destino en el momento del clic,
    // descontando el header fijo, y Lenis se desliza hasta ese número exacto.
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
      const id = link?.getAttribute("href")?.slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const header = parseFloat(getComputedStyle(root).getPropertyValue("--header-h")) || 64;
      const top = target.getBoundingClientRect().top + window.scrollY - header - 8;
      lenis.scrollTo(Math.max(0, top), { duration: 1.1 });
      history.replaceState(null, "", `#${id}`);
      // Como el navegador ya no salta solo, se lleva el foco a la sección (teclado y lectores de pantalla).
      if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, []);

  return null;
}
