"use client";

import { useEffect, useState } from "react";
import { openStatus, type OpenStatus } from "@/lib/hours";

/**
 * Cartel colgante "Abierto / Cerrado", calculado con la hora de Argentina.
 * Se calcula en el navegador (la página es estática) y se actualiza cada minuto.
 */
export function OpenSign({ fixedNow }: { fixedNow?: string }) {
  const [status, setStatus] = useState<OpenStatus | null>(null);

  useEffect(() => {
    const tick = () => setStatus(openStatus(fixedNow ? new Date(fixedNow) : new Date()));
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, [fixedNow]);

  useEffect(() => {
    if (status === null) return;
    document
      .querySelectorAll<HTMLElement>("[data-days]")
      .forEach((row) => {
        const today = row.dataset.days!.split(",").map(Number).includes(status.day);
        row.toggleAttribute("data-today", today);
      });
  }, [status]);

  return (
    <div className="sign" data-open={status?.open ?? "unknown"}>
      <span className="sign__cord" aria-hidden="true" />
      <div className="sign__board on-field" role="status" aria-live="polite">
        {status ? (
          <>
            <span className="sign__dot" aria-hidden="true" />
            <strong className="sign__title serif">{status.title}</strong>
            {status.detail && <span className="sign__detail">{status.detail}</span>}
          </>
        ) : (
          <strong className="sign__title serif">Horarios</strong>
        )}
      </div>
    </div>
  );
}
