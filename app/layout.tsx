import type { Metadata, Viewport } from "next";
import { Source_Sans_3, Zilla_Slab } from "next/font/google";
import "./globals.css";
import {
  ADDRESS_STREET,
  BRANDS,
  INSTAGRAM_URL,
  MAPS_URL,
  PHONE_TEL,
  SITE_URL,
} from "@/lib/site";

const display = Zilla_Slab({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-display",
  display: "swap",
});
const sans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const TITLE = "El Prado – Tienda de ropa en Ranchos";
const DESCRIPTION =
  "El Prado – Tienda de ropa en Ranchos desde 1999. Ropa de mujer y de hombre, de campo y de ciudad, calzado, sombreros, mates y platería criolla. Consultá por WhatsApp.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: "El Prado",
    title: TITLE,
    description: DESCRIPTION,
    url: "/",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#141210" },
  ],
};

const hours = (days: string[], ranges: [string, string][]) =>
  ranges.map(([opens, closes]) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: days,
    opens,
    closes,
  }));

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ClothingStore",
  name: "El Prado",
  description: DESCRIPTION,
  url: SITE_URL,
  image: `${SITE_URL}/opengraph-image.jpg`,
  telephone: PHONE_TEL,
  foundingDate: "1999",
  address: {
    "@type": "PostalAddress",
    streetAddress: ADDRESS_STREET,
    addressLocality: "Ranchos",
    addressRegion: "Buenos Aires",
    addressCountry: "AR",
  },
  hasMap: MAPS_URL,
  openingHoursSpecification: [
    ...hours(
      ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      [["08:30", "12:30"], ["16:30", "20:30"]],
    ),
    ...hours(["Saturday"], [["09:00", "13:00"], ["16:30", "20:30"]]),
  ],
  brand: BRANDS.map((name) => ({ "@type": "Brand", name })),
  paymentAccepted: "Efectivo, tarjeta de débito, tarjeta de crédito, transferencia",
  sameAs: [INSTAGRAM_URL],
};

// Marca la página como "con JS" antes de pintar y revela cada bloque al entrar en pantalla.
// Si el script no corre, todo queda visible.
const revealScript = `(function(){var d=document.documentElement;d.classList.add('js');
if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){d.classList.add('motion');}
if(!('IntersectionObserver' in window)){d.classList.remove('js');return;}
function go(){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('is-in');io.unobserve(e.target);}});},{rootMargin:'0px 0px -8% 0px'});
document.querySelectorAll('[data-reveal]').forEach(function(el){io.observe(el);});}
if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',go);}else{go();}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-AR" className={`${display.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: revealScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
