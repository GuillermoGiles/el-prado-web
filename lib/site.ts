export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const PHONE_DISPLAY = "2241 583515";
export const PHONE_TEL = "+5492241583515";
export const INSTAGRAM_URL = "https://www.instagram.com/elpradoranchos";
export const INSTAGRAM_HANDLE = "@elpradoranchos";
export const ADDRESS_STREET = "San Martín 3091";
export const ADDRESS_CORNER = "Esquina Alem, Ranchos";

// Ficha de El Prado en Google (reseñas, fotos y "Cómo llegar"), la misma que usa el Instagram.
export const MAPS_URL = "https://share.google/28G269y00Sil7HQP4";

const WA_BASE = "https://wa.me/5492241583515";
const WA_INTRO = "Hola! Vi la página de El Prado y quería consultar por";

/** Link de WhatsApp con el mensaje precargado. Sin tema, deja la frase abierta. */
export function waLink(topic?: string) {
  const text = topic ? `${WA_INTRO} ${topic}.` : `${WA_INTRO}...`;
  return `${WA_BASE}?text=${encodeURIComponent(text)}`;
}

export const BRANDS = ["Tiza", "Pampero", "Raiders"] as const;
