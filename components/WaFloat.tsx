"use client";

import { useEffect, useState } from "react";
import { WhatsAppIcon } from "./Icons";
import { waLink } from "@/lib/site";

/**
 * Botón flotante de WhatsApp (solo mobile). Mientras los botones del hero están en pantalla
 * se oculta para no taparlos: el WhatsApp sigue a un toque en todo momento.
 */
export function WaFloat() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const target = document.querySelector(".hero__actions");
    if (!target) return;
    const io = new IntersectionObserver(([entry]) => setHidden(entry.isIntersecting));
    io.observe(target);
    return () => io.disconnect();
  }, []);

  return (
    <a
      href={waLink()}
      className="wa-float"
      target="_blank"
      rel="noopener"
      aria-label="Escribinos por WhatsApp"
      data-hidden={hidden}
      tabIndex={hidden ? -1 : undefined}
    >
      <WhatsAppIcon />
    </a>
  );
}
