import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Landing } from "@/components/Landing";
import { FIXTURES, TIMES } from "@/lib/fixtures";

// Ruta de prueba de break-ui: solo existe con `next dev`. En producción responde 404.
export const metadata: Metadata = { robots: { index: false, follow: false } };

type Props = { searchParams: Promise<{ datos?: string; hora?: string }> };

export default async function WorstCasePage({ searchParams }: Props) {
  if (process.env.NODE_ENV === "production") notFound();
  const { datos = "peor", hora = "ahora" } = await searchParams;
  const content = FIXTURES[datos] ?? FIXTURES.peor;
  const time = TIMES[hora] ?? TIMES.ahora;

  const link = (d: string, h: string) => `?datos=${d}&hora=${h}`;
  const bar: React.CSSProperties = {
    position: "fixed", left: "50%", bottom: 12, transform: "translateX(-50%)", zIndex: 1000,
    display: "flex", flexWrap: "wrap", gap: 2, padding: 3, maxWidth: "calc(100vw - 24px)",
    background: "#d4d4d4", borderRadius: 12, font: "13px/1 system-ui, sans-serif",
  };
  const seg = (active: boolean): React.CSSProperties => ({
    padding: "8px 10px", borderRadius: 9, color: "#111", textDecoration: "none",
    background: active ? "#fff" : "transparent",
  });

  return (
    <>
      <Landing {...content} fixedNow={time.iso} />
      <nav aria-label="Datos de prueba" style={bar}>
        {Object.entries(FIXTURES).map(([k, f]) => (
          <a key={k} href={link(k, hora)} style={seg(k === datos)}>{f.label}</a>
        ))}
        <span style={{ width: 8 }} />
        {Object.entries(TIMES).map(([k, t]) => (
          <a key={k} href={link(datos, k)} style={seg(k === hora)}>{t.label}</a>
        ))}
      </nav>
    </>
  );
}
