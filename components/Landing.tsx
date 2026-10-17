import Image from "next/image";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { OpenSign } from "./OpenSign";
import { BrandCycle } from "./BrandCycle";
import { LazyVideo } from "./LazyVideo";
import { WaFloat } from "./WaFloat";
import { ArrowIcon, InstagramIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "./Icons";
import { SCHEDULE_ROWS } from "@/lib/hours";
import {
  ADDRESS_CORNER,
  ADDRESS_STREET,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  MAPS_URL,
  PHONE_DISPLAY,
  PHONE_TEL,
  waLink,
} from "@/lib/site";

import cartel from "@/assets/6.jpeg";
import frente from "@/assets/5.jpeg";
import salon from "@/assets/12.jpeg";
import mostrador from "@/assets/13.jpeg";
import probador from "@/assets/17.jpeg";
import lampara from "@/assets/23.jpeg";
import lamparaCerca from "@/assets/24.jpeg";
import poster from "@/media/recorrido-poster.jpg";
import type { Content } from "@/lib/content";

export function Landing({ rubros, reasons, brands, fixedNow }: Content & { fixedNow?: string }) {
  return (
    <>
      <a href="#contenido" className="skip-link">
        Ir al contenido
      </a>
      <Header />

      <main id="contenido">
        <Hero />

        {/* Quiénes somos */}
        <section id="nosotros" className="about" aria-labelledby="about-title">
          <div className="wrap">
            <p className="about__year serif" aria-hidden="true" data-reveal>
              <span>19</span>
              <span className="about__inset">
                <Image
                  src={cartel}
                  alt=""
                  sizes="(min-width: 1024px) 15vw, 22vw"
                  quality={75}
                  className="object-cover"
                  fill
                />
              </span>
              <span>99</span>
            </p>
            <div className="about__body">
              <h2 id="about-title" className="t-h2" data-reveal>
                Un local de familia, desde 1999
              </h2>
              <div className="about__text">
                <p data-reveal style={{ "--i": 1 } as React.CSSProperties}>
                  Abrimos en 1999 en la esquina de San Martín y Alem, y desde entonces atendemos a la gente
                  de Ranchos y de los campos de la zona.
                </p>
                <p data-reveal style={{ "--i": 2 } as React.CSSProperties}>
                  Te atendemos en persona: te mostramos, te probás y te ayudamos a encontrar tu talle.
                  Tenemos ropa de campo y de ciudad, para mujer y para hombre, y todo lo que la acompaña.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Qué vas a encontrar */}
        <section id="rubros" className="rubros" aria-labelledby="rubros-title">
          <div className="wrap">
            <div className="rubros__head">
              <h2 id="rubros-title" className="t-h2" data-reveal>
                Qué vas a encontrar
              </h2>
              <p className="rubros__lead" data-reveal style={{ "--i": 1 } as React.CSSProperties}>
                Vení a verlo todo, o preguntanos antes por WhatsApp si tenemos tu talle o el color que buscás.
              </p>
            </div>
            {rubros.length > 0 && (
            <ul className="rubros__grid">
              {rubros.map((r) => (
                <li key={r.id} className="rubro" id={`rubro-${r.id}`}>
                  <div className="rubro__photo" data-reveal>
                    <Image
                      src={r.img}
                      alt={r.alt}
                      fill
                      sizes="(min-width: 1024px) 40vw, 90vw"
                      quality={60}
                      className="object-cover"
                      style={{ objectPosition: r.pos }}
                    />
                  </div>
                  <div className="rubro__text">
                    <h3 className="t-h3" data-reveal style={{ "--i": 1 } as React.CSSProperties}>
                      {r.title}
                    </h3>
                    <p data-reveal style={{ "--i": 2 } as React.CSSProperties}>
                      {r.text}
                    </p>
                    <a
                      href={waLink(r.topic)}
                      className="btn btn-ink rubro__cta"
                      target="_blank"
                      rel="noopener"
                      data-reveal
                      style={{ "--i": 3 } as React.CSSProperties}
                    >
                      <WhatsAppIcon />
                      Consultar
                      <span className="sr-only"> por {r.topic}</span>
                    </a>
                  </div>
                </li>
              ))}
            </ul>
            )}
          </div>
        </section>

        {/* Marcas */}
        {brands.length > 0 && (
        <section className="brands" aria-labelledby="brands-title">
          <div className="wrap">
            <h2 id="brands-title" className="t-h3" data-reveal>
              Marcas que vas a encontrar
            </h2>
            <BrandCycle brands={brands} />
            <p className="brands__more" data-reveal>
              Y otras marcas que te mostramos en el local.
            </p>
          </div>
        </section>
        )}

        {/* Por qué comprar en El Prado */}
        <section className="why on-field" aria-labelledby="why-title">
          <div className="wrap why__grid">
            <div className="why__photo" data-reveal>
              <Image
                src={probador}
                alt="Probador del local con cortina bordó, espejo con marco de madera y alfombra roja."
                fill
                sizes="(min-width: 1024px) 34vw, 90vw"
                quality={60}
                className="object-cover"
              />
            </div>
            <div>
              <h2 id="why-title" className="t-h2" data-reveal>
                Por qué comprar acá
              </h2>
              <p className="why__lead" data-reveal style={{ "--i": 1 } as React.CSSProperties}>
                Sin viajar a La Plata ni a Capital, y sin esperar un envío.
              </p>
              <dl className="why__list">
                {reasons.map((r, i) => (
                  <div key={r.title} data-reveal style={{ "--i": i + 1 } as React.CSSProperties}>
                    <dt className="t-h3 serif">{r.title}</dt>
                    <dd>{r.text}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* Galería del local */}
        <section id="local" className="gallery" aria-labelledby="gallery-title">
          <div className="gallery__field on-field">
            <h2 id="gallery-title" className="gallery__title">
              <span>Así es</span> <span>el local</span>
            </h2>
            <figure className="print print--a" data-reveal>
              <Image
                src={mostrador}
                alt="Salón de El Prado: mostrador de madera con el nombre tallado, lámpara verde y cuadros de caballos en la pared."
                fill
                sizes="(min-width: 1024px) 24vw, 50vw"
                quality={60}
                className="object-cover"
              />
            </figure>
            <figure className="print print--b" data-reveal style={{ "--i": 2 } as React.CSSProperties}>
              <Image
                src={lamparaCerca}
                alt="Lámpara de mesa con pantalla verde y un caballo criollo de adorno, sobre el mostrador tallado."
                fill
                sizes="(min-width: 1024px) 22vw, 46vw"
                quality={60}
                className="object-cover"
              />
            </figure>
            <p className="gallery__caption">
              Muebles de madera, cuadros de caballos y la lámpara del mostrador.
            </p>
          </div>

          <div className="wrap gallery__tour">
            <div className="gallery__video" data-reveal>
              <LazyVideo
                src="/video/recorrido.mp4"
                poster={poster.src}
                width={464}
                height={832}
                label="Recorrido en video por el interior de El Prado"
              />
            </div>
            <div className="gallery__tour-text">
              <h3 className="t-h3" data-reveal>
                Recorré el local
              </h3>
              <p data-reveal style={{ "--i": 1 } as React.CSSProperties}>
                Veinte segundos por adentro: el salón, las estanterías y el mostrador. El video arranca sin
                sonido; lo podés activar desde los controles.
              </p>
            </div>
            <figure className="gallery__wide" data-reveal>
              <Image
                src={salon}
                alt="Vista del salón desde la entrada: piso claro, araña de hierro, mostradores de madera y estanterías con ropa."
                fill
                sizes="(min-width: 1024px) 34vw, 90vw"
                quality={60}
                className="object-cover"
                style={{ objectPosition: "50% 40%" }}
              />
            </figure>
            <figure className="gallery__small" data-reveal style={{ "--i": 1 } as React.CSSProperties}>
              <Image
                src={lampara}
                alt="Mostrador con la lámpara del caballo y, detrás, estanterías con mates, termos y ropa."
                fill
                sizes="(min-width: 1024px) 22vw, 60vw"
                quality={60}
                className="object-cover"
              />
            </figure>
          </div>
        </section>

        {/* Horarios y ubicación */}
        <section id="horarios" className="hours" aria-labelledby="hours-title">
          <div className="wrap hours__grid">
            <div className="hours__main">
              <div className="hours__head">
                <h2 id="hours-title" className="t-h2" data-reveal>
                  Horarios y cómo llegar
                </h2>
                <OpenSign fixedNow={fixedNow} />
              </div>

              <dl className="hours__table" data-reveal style={{ "--i": 1 } as React.CSSProperties}>
                {SCHEDULE_ROWS.map((row) => (
                  <div key={row.days} className="hours__row" data-days={row.match.join(",")}>
                    <dt>{row.days}</dt>
                    <dd>{row.hours}</dd>
                  </div>
                ))}
              </dl>

              <address className="hours__address">
                <a href={MAPS_URL} target="_blank" rel="noopener" className="hours__line serif">
                  {ADDRESS_STREET}
                </a>
                <span className="hours__line hours__line--soft serif">{ADDRESS_CORNER}</span>
                <a href={`tel:${PHONE_TEL}`} className="hours__line serif">
                  {PHONE_DISPLAY}
                </a>
              </address>

              <div className="hours__actions">
                <a href={MAPS_URL} className="btn btn-ink" target="_blank" rel="noopener">
                  <PinIcon />
                  Cómo llegar
                </a>
                <a href={`tel:${PHONE_TEL}`} className="btn btn-ink">
                  <PhoneIcon />
                  Llamar
                </a>
              </div>
            </div>
            <figure className="hours__photo" data-reveal>
              <Image
                src={frente}
                alt="Frente del local sobre la calle: pared de ladrillo con borde mostaza y el cartel de madera de El Prado, 1999."
                fill
                sizes="(min-width: 1024px) 34vw, 90vw"
                quality={60}
                className="object-cover"
                style={{ objectPosition: "50% 35%" }}
              />
            </figure>
          </div>
        </section>

        {/* Contacto final */}
        <section id="contacto" aria-labelledby="cta-title">
          <a href={waLink()} className="cta on-accent" target="_blank" rel="noopener">
            <span className="cta__top">
              <span className="cta__note">
                Consultá por talles, colores o reservá una prenda. Te respondemos desde el local.
              </span>
              <ArrowIcon className="cta__arrow" />
            </span>
            <span id="cta-title" className="cta__word serif">
              Escribinos
            </span>
            <span className="sr-only"> por WhatsApp</span>
          </a>
          <div className="wrap social">
            <p className="social__text">Novedades y prendas nuevas, en Instagram.</p>
            <a href={INSTAGRAM_URL} className="social__link serif" target="_blank" rel="noopener">
              <InstagramIcon className="social__icon" />
              {INSTAGRAM_HANDLE}
            </a>
          </div>
        </section>
      </main>

      <footer className="footer on-field">
        <div className="wrap footer__grid">
          <ul className="footer__places">
            <li>
              <a href={MAPS_URL} target="_blank" rel="noopener">
                {ADDRESS_STREET}, Ranchos
              </a>
            </li>
            <li>
              <a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a>
            </li>
            <li>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener">
                Instagram
              </a>
            </li>
          </ul>
          <nav aria-label="Pie de página" className="footer__links">
            <a href="#rubros">Qué vas a encontrar</a>
            <a href="#local">El local</a>
            <a href="#horarios">Horarios</a>
            <a href={waLink()} target="_blank" rel="noopener">
              WhatsApp
            </a>
          </nav>
        </div>
        <div className="wrap footer__legal">
          <p>El Prado · San Martín 3091, Ranchos, Buenos Aires · Desde 1999</p>
          <a href="#inicio">Volver arriba</a>
        </div>
        <p className="footer__name serif" aria-hidden="true">
          El Prado
        </p>
      </footer>

      <WaFloat />
    </>
  );
}
