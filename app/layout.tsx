import type { Metadata, Viewport } from "next";
import { Source_Sans_3, Zilla_Slab } from "next/font/google";
import "lenis/dist/lenis.css";
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
  // La pestaña usa el .ico chico (16/32 px). Google usa el de 192 px: fondo marrón hasta el borde,
  // con el logo achicado para que entre entero en el círculo y no aparezca blanco alrededor.
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "16x16 32x32", type: "image/x-icon" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#ffffff",
  colorScheme: "light",
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
  logo: `${SITE_URL}/icon-192.png`,
  telephone: PHONE_TEL,
  foundingDate: "1999",
  address: {
    "@type": "PostalAddress",
    streetAddress: ADDRESS_STREET,
    addressLocality: "Ranchos",
    addressRegion: "Buenos Aires",
    postalCode: "B1987BQI",
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

// Le dice a Google cómo se llama el sitio, para que muestre "El Prado" en vez del dominio.
const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "El Prado",
  alternateName: ["El Prado Ranchos", "elpradoranchos.com"],
  url: "https://elpradoranchos.com/",
};

// Marca la página como "con JS" antes de pintar y revela cada bloque al entrar en pantalla.
// Si el script no corre, todo queda visible.
const revealScript = `(function(){var d=document.documentElement;d.classList.add('js');
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
