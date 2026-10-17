// Datos de prueba para /dev/peor-caso (solo en desarrollo). No se usan en la página publicada.
import type { Content, Rubro } from "./content";
import { DEMO, RUBROS } from "./content";

const [mujer, hombre, campo, calzado, sombreros, carteras, mates, plateria] = RUBROS;

// Peor caso con los nombres reales de los rubros: textos largos o de una palabra y temas largos
// para el mensaje de WhatsApp.
const WORST_RUBROS: Rubro[] = [
  {
    ...mujer,
    text: "Jeans, camisas, pulóveres y camperas para todos los días, para salir y para el campo. Preguntanos por talles especiales y colores que no veas en la vidriera.",
    topic: "ropa de mujer, en talles especiales y colores que no están en la vidriera",
  },
  { ...hombre, text: "Camisas." },
  campo,
  calzado,
  { ...sombreros, text: "Sombreros de ala ancha y angosta, boinas vascas, cinturones de cuero crudo y trenzado, en todos los talles." },
  carteras,
  mates,
  plateria,
];

export const FIXTURES: Record<string, Content & { label: string }> = {
  demo: { label: "Demo", ...DEMO },
  peor: {
    label: "Peor caso",
    rubros: WORST_RUBROS,
    reasons: [
      { ...DEMO.reasons[0], title: "Te asesoramos para encontrar tu talle justo, sin apuro" },
      ...DEMO.reasons.slice(1),
    ],
    brands: ["Pampero", "La Martina", "Cardón", "Wrangler", "Mujercitas Sport", "Raiders"],
  },
  uno: { label: "Uno", rubros: [RUBROS[3]], reasons: DEMO.reasons.slice(0, 1), brands: ["Tiza"] },
  vacio: { label: "Vacío", rubros: [], reasons: DEMO.reasons, brands: [] },
};

// Horas de prueba para el cartel (hora de Argentina, UTC-3).
export const TIMES: Record<string, { label: string; iso?: string }> = {
  ahora: { label: "Ahora" },
  "cierra-1": { label: "Mié 12:29", iso: "2026-10-14T12:29:00-03:00" },
  siesta: { label: "Mié 14:00", iso: "2026-10-14T14:00:00-03:00" },
  "sab-noche": { label: "Sáb 21:00", iso: "2026-10-17T21:00:00-03:00" },
  domingo: { label: "Dom 11:00", iso: "2026-10-18T11:00:00-03:00" },
};
