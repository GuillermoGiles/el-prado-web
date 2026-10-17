# El Prado – landing

Landing de El Prado, tienda de ropa en Ranchos (San Martín 3091). Next.js (App Router) + TypeScript + Tailwind.

## Correrlo

```bash
cd landings/el-prado
npm install
npm run dev        # http://localhost:3000
```

Versión de producción local:

```bash
npm run build
npm start
```

Prueba de peor caso (solo con `npm run dev`): http://localhost:3000/dev/peor-caso.
Tiene una barra abajo para cambiar los datos (demo, peor caso, uno, vacío) y la hora del cartel
de abierto/cerrado. En producción esa ruta responde 404.

## Subir a Vercel

1. Importar el repo en Vercel y poner **Root Directory** en `landings/el-prado`.
2. Agregar el dominio propio en *Settings → Domains*.
3. Definir la variable `NEXT_PUBLIC_SITE_URL` con el dominio final (por ejemplo `https://elprado.com.ar`).
   Se usa para las URLs absolutas de Open Graph, el canonical y el JSON-LD. Si no está, se usa la URL de producción de Vercel.

## Dónde cambiar cada cosa

| Qué | Archivo |
| --- | --- |
| WhatsApp, teléfono, Instagram, dirección, marcas | `lib/site.ts` |
| Horarios (y el cartel "Abierto ahora") | `lib/hours.ts` |
| Rubros y "Por qué comprar acá" | `lib/content.ts` |
| Textos de las secciones | `components/Landing.tsx` |
| Colores y tipografía | `app/globals.css` (tokens en `:root`) |
| Title, description, JSON-LD | `app/layout.tsx` |

## Archivos

- `assets/`: fotos originales, el video y el logo (sin tocar).
- `media/`: derivados: la fachada recortada sin las personas y el póster del video.
- `public/video/recorrido.mp4`: el video comprimido (3,5 MB → 1 MB).
- `app/opengraph-image.jpg`: imagen para compartir, de la fachada.
- `capturas/`: capturas finales a 390×844 y 1440×900, en claro y oscuro.
