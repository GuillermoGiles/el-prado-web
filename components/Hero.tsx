import { getImageProps } from "next/image";
import fachadaMobile from "@/media/hd/1.jpg";
import fachadaDesktop from "@/media/hd/fachada-esquina.jpg";
import { PinIcon, WhatsAppIcon } from "./Icons";
import { MAPS_URL, waLink } from "@/lib/site";

const DESKTOP_MQ = "(min-width: 1024px)";
const FACHADA_ALT =
  "Fachada de El Prado: edificio de esquina color mostaza con ladrillo a la vista, carteles de madera con el nombre y la puerta de madera en la ochava.";

/** Hero con la fachada a su tamaño real: arriba en el celular, a la derecha del texto en desktop. */
export function Hero() {
  const common = { alt: FACHADA_ALT, sizes: "(min-width: 1024px) 55vw, 100vw", quality: 85 };
  const { props: { srcSet: desktopSet } } = getImageProps({ ...common, src: fachadaDesktop });
  const { props: { srcSet: mobileSet, ...imgProps } } = getImageProps({ ...common, src: fachadaMobile });

  return (
    <section id="inicio" className="hero" aria-labelledby="hero-title">
      <div className="hero__stage">
        <div className="hero__photo">
          <picture>
            <source media={DESKTOP_MQ} srcSet={desktopSet} sizes="55vw" />
            <img {...imgProps} srcSet={mobileSet} fetchPriority="high" loading="eager" decoding="async" alt={FACHADA_ALT} />
          </picture>
        </div>

        <div className="hero__copy">
          <p className="hero__kicker">El Prado · Ranchos</p>
          <h1 id="hero-title" className="hero__title display">
            <span className="sr-only">El Prado, tienda de ropa. </span>
            Desde 1999
            <br />
            en Ranchos
          </h1>
          <p className="hero__lead">
            Ropa de mujer y de hombre, de campo y de ciudad. Calzado, sombreros, mates y platería criolla.
          </p>
          <div className="hero__actions">
            <a href={waLink()} className="btn btn-accent" target="_blank" rel="noopener">
              <WhatsAppIcon />
              Consultá por WhatsApp
            </a>
            <a href={MAPS_URL} className="btn btn-light" target="_blank" rel="noopener">
              <PinIcon />
              Cómo llegar
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
