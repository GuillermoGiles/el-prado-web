import type { MetadataRoute } from "next";

// Dominio fijo: el sitemap tiene que apuntar siempre al dominio público, no a una URL de Vercel.
const BASE = "https://elpradoranchos.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${BASE}/`, changeFrequency: "monthly", priority: 1 }];
}
