import Image, { type StaticImageData } from "next/image";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { OpenSign } from "./OpenSign";
import { LazyVideo } from "./LazyVideo";
import { WaFloat } from "./WaFloat";
import { Logo } from "./Logo";
import { CardIcon, HangerIcon, InstagramIcon, PhoneIcon, PinIcon, SwapIcon, WhatsAppIcon } from "./Icons";
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
import type { Content, Rubro } from "@/lib/content";

import cartel from "@/assets/6.jpeg";
import frente from "@/assets/5.jpeg";
import salon from "@/assets/12.jpeg";
import mostrador from "@/assets/13.jpeg";
import probador from "@/assets/17.jpeg";
import lampara from "@/assets/23.jpeg";
import lamparaCerca from "@/assets/24.jpeg";
import poster from "@/media/recorrido-poster.jpg";

// Rubros que van como fotos grandes; el resto va en la fila de tarjetas.
const FEATURED = ["mujer", "hombre", "campo"];
const REASON_ICONS = [HangerIcon, SwapIcon, CardIcon, WhatsAppIcon];

type TileProps = {
  href: string;
  img: StaticImageData;
  alt: string;
  title: string;
  cta: string;
  sizes: string;
  pos?: string;
  external?: boolean;
  id?: string;
};

/** Foto grande con el título encima; toda la foto es el link. */
function Tile({ href, img, alt, title, cta, sizes, pos, external = true, id }: TileProps) {
  return (
    <a
      id={id}
      href={href}
      className="tile"
      {...(external ? { target: "_blank", rel: "noopener" } : {})}
    >
      <Image src={img} alt={alt} fill sizes={sizes} quality={70} className="tile__img" style={{ objectPosition: pos }} />
      <span className="tile__copy">
        <span className="tile__title display">{title}</span>
        <span className="btn btn-accent btn-sm tile__btn">
          <WhatsAppIcon />
          {cta}
        </span>
      </span>
    </a>
  );
}

function RubroCard({ r }: { r: Rubro }) {
  return (
    <li className="card" id={`rubro-${r.id}`}>
      <div className="card__photo">
        <Image src={r.img} alt={r.alt} fill sizes="(min-width: 1024px) 19vw, 72vw" quality={65} className="object-cover" style={{ objectPosition: r.pos }} />
      </div>
      <div className="card__body">
        <h3 className="card__title display">{r.title}</h3>
        <p className="card__text">{r.text}</p>
        <a href={waLink(r.topic)} className="btn btn-ink btn-block" target="_blank" rel="noopener">
          <WhatsAppIcon />
          Consultar
          <span className="sr-only"> por {r.topic}</span>
        </a>
      </div>
    </li>
  );
}

export function Landing({ rubros, reasons, brands, fixedNow }: Content & { fixedNow?: string }) {
  const byId = (id: string) => rubros.find((r) => r.id === id);
  const mujer = byId("mujer");
  const hombre = byId("hombre");
  const campo = byId("campo");
  const cards = rubros.filter((r) => !FEATURED.includes(r.id));

  return (
    <>
      <a href="#contenido" className="skip-link">
        Ir al contenido
      </a>
      <Header />

      <main id="contenido">
        <Hero />

        {/* Mujer y Hombre */}
        {(mujer || hombre) && (
          <section className="duo" aria-label="Mujer y hombre">
            {[mujer, hombre].filter(Boolean).map((r) => (
              <Tile
                key={r!.id}
                id={r!.id}
                href={waLink(r!.topic)}
                img={r!.img}
                alt={r!.alt}
                title={r!.title}
                cta="Consultar"
                sizes="(min-width: 768px) 50vw, 100vw"
                pos={r!.pos}
              />
            ))}
          </section>
        )}

        {/* Qué vas a encontrar */}
        <section id="rubros" className="section" aria-labelledby="rubros-title">
          <div className="wrap">
            <div className="section__head">
              <h2 id="rubros-title" className="section__title display" data-reveal>
                Qué vas a encontrar
              </h2>
              <p className="section__lead" data-reveal>
                No vendemos online: preguntanos por WhatsApp si tenemos tu talle o el color que buscás, y pasá a probártelo.
              </p>
            </div>
          </div>
          {cards.length > 0 && (
            <ul className="cards" data-reveal>
              {cards.map((r) => (
                <RubroCard key={r.id} r={r} />
              ))}
            </ul>
          )}
        </section>

        {/* Tres fotos */}
        <section className="trio" aria-label="Campo, probador y local">
          {campo && (
            <Tile
              id="campo"
              href={waLink(campo.topic)}
              img={campo.img}
              alt={campo.alt}
              title="Ropa de campo"
              cta="Consultar"
              sizes="(min-width: 768px) 33vw, 100vw"
              pos={campo.pos}
            />
          )}
          <Tile
            href={waLink("un talle")}
            img={probador}
            alt="Probador del local con cortina bordó, espejo con marco de madera y alfombra roja."
            title="Probátelo acá"
            cta="Consultar talles"
            sizes="(min-width: 768px) 33vw, 100vw"
          />
          <Tile
            href={waLink()}
            img={lamparaCerca}
            alt="Lámpara de mesa con pantalla verde y un caballo criollo de adorno, sobre el mostrador tallado con el nombre El Prado."
            title="Atención de familia"
            cta="Escribinos"
            sizes="(min-width: 768px) 33vw, 100vw"
          />
        </section>

        {/* Por qué comprar en El Prado */}
        <section className="section why" aria-labelledby="why-title">
          <div className="wrap">
            <div className="section__head section__head--center">
              <h2 id="why-title" className="section__title display" data-reveal>
                Por qué comprar en El Prado
              </h2>
              <p className="section__lead" data-reveal>
                Sin viajar a La Plata ni a Capital, y sin esperar un envío.
              </p>
            </div>
            <ul className="why__list">
              {reasons.map((r, i) => {
                const Icon = REASON_ICONS[i % REASON_ICONS.length];
                return (
                  <li key={r.title} className="why__item" data-reveal style={{ "--i": i } as React.CSSProperties}>
                    <Icon className="why__icon" />
                    <h3 className="why__title display">{r.title}</h3>
                    <p>{r.text}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* Marcas */}
        {brands.length > 0 && (
          <section className="brands" aria-labelledby="brands-title">
            <div className="wrap">
              <h2 id="brands-title" className="brands__title">
                Marcas que vas a encontrar
              </h2>
              <ul className="brands__list">
                {brands.map((name) => (
                  <li key={name} className="brands__name display">
                    {name}
                  </li>
                ))}
              </ul>
              <p className="brands__more">Y otras marcas que te mostramos en el local.</p>
            </div>
          </section>
        )}

        {/* Quiénes somos */}
        <section id="nosotros" className="about" aria-labelledby="about-title">
          <div className="about__photo">
            <Image
              src={cartel}
              alt="Cartel de madera de El Prado, 1999, sobre la pared de ladrillo del local."
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              quality={70}
              className="object-cover"
              style={{ objectPosition: "50% 40%" }}
            />
          </div>
          <div className="about__body">
            <h2 id="about-title" className="section__title display" data-reveal>
              Un local de familia, desde 1999
            </h2>
            <p data-reveal>
              Abrimos en 1999 en la esquina de San Martín y Alem, y desde entonces atendemos a la gente de Ranchos y
              de los campos de la zona.
            </p>
            <p data-reveal>
              Te atendemos en persona: te mostramos, te probás y te ayudamos a encontrar tu talle. Ropa de campo y de
              ciudad, para mujer y para hombre, y todo lo que la acompaña.
            </p>
            <a href={waLink()} className="btn btn-accent" target="_blank" rel="noopener" data-reveal>
              <WhatsAppIcon />
              Consultá por WhatsApp
            </a>
          </div>
        </section>

        {/* Galería del local */}
        <section id="local" className="section" aria-labelledby="gallery-title">
          <div className="wrap">
            <div className="section__head">
              <h2 id="gallery-title" className="section__title display" data-reveal>
                Así es el local
              </h2>
              <p className="section__lead" data-reveal>
                Muebles de madera, cuadros de caballos y la lámpara del mostrador. Mirá el recorrido: arranca sin
                sonido y lo podés activar desde los controles.
              </p>
            </div>
            <div className="gallery">
              <div className="gallery__video" data-reveal>
                <LazyVideo
                  src="/video/recorrido.mp4"
                  poster={poster.src}
                  width={464}
                  height={832}
                  label="Recorrido en video por el interior de El Prado"
                />
              </div>
              {[
                { img: salon, alt: "Vista del salón desde la entrada: piso claro, araña de hierro, mostradores de madera y estanterías con ropa.", pos: "50% 40%" },
                { img: mostrador, alt: "Mostrador de madera con el nombre tallado, la lámpara verde y cuadros de caballos en la pared." },
                { img: lampara, alt: "Mostrador con la lámpara del caballo y, detrás, estanterías con mates, termos y ropa." },
                { img: frente, alt: "Frente del local: pared de ladrillo con borde mostaza y el cartel de madera de El Prado.", pos: "50% 35%" },
              ].map((g, i) => (
                <figure key={i} className="gallery__item" data-reveal style={{ "--i": i + 1 } as React.CSSProperties}>
                  <Image src={g.img} alt={g.alt} fill sizes="(min-width: 1024px) 24vw, 46vw" quality={60} className="object-cover" style={{ objectPosition: g.pos }} />
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* Horarios y ubicación */}
        <section id="horarios" className="section hours" aria-labelledby="hours-title">
          <div className="wrap hours__grid">
            <div>
              <div className="hours__head">
                <h2 id="hours-title" className="section__title display" data-reveal>
                  Horarios y ubicación
                </h2>
                <OpenSign fixedNow={fixedNow} />
              </div>
              <dl className="hours__table" data-reveal>
                {SCHEDULE_ROWS.map((row) => (
                  <div key={row.days} className="hours__row" data-days={row.match.join(",")}>
                    <dt>{row.days}</dt>
                    <dd>{row.hours}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="hours__place" data-reveal>
              <address className="hours__address">
                <strong className="display">{ADDRESS_STREET}</strong>
                <span>{ADDRESS_CORNER}, Buenos Aires</span>
                <a href={`tel:${PHONE_TEL}`} className="text-link">
                  Tel. {PHONE_DISPLAY}
                </a>
              </address>
              <div className="hours__actions">
                <a href={MAPS_URL} className="btn btn-ink" target="_blank" rel="noopener">
                  <PinIcon />
                  Cómo llegar
                </a>
                <a href={`tel:${PHONE_TEL}`} className="btn btn-outline">
                  <PhoneIcon />
                  Llamar
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Contacto final */}
        <section id="contacto" className="cta" aria-labelledby="cta-title">
          <div className="wrap cta__inner">
            <h2 id="cta-title" className="cta__title display">
              ¿Tenés una consulta?
            </h2>
            <p className="cta__text">
              Escribinos por talles, colores o para reservar una prenda. Te respondemos desde el local.
            </p>
            <div className="cta__actions">
              <a href={waLink()} className="btn btn-light btn-lg" target="_blank" rel="noopener">
                <WhatsAppIcon />
                Escribinos por WhatsApp
              </a>
              <a href={INSTAGRAM_URL} className="cta__ig" target="_blank" rel="noopener">
                <InstagramIcon />
                {INSTAGRAM_HANDLE}
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="wrap footer__grid">
          <div>
            <Logo className="footer__logo" title="El Prado, 1999" />
            <p className="footer__tag">Tienda de ropa en Ranchos desde 1999.</p>
          </div>
          <ul className="footer__list">
            <li className="footer__label">Dónde estamos</li>
            <li>
              <a href={MAPS_URL} target="_blank" rel="noopener">
                {ADDRESS_STREET}, {ADDRESS_CORNER}
              </a>
            </li>
            <li>
              <a href={`tel:${PHONE_TEL}`}>Tel. {PHONE_DISPLAY}</a>
            </li>
          </ul>
          <ul className="footer__list">
            <li className="footer__label">Horarios</li>
            <li>Lunes a viernes: 8:30 a 12:30 y 16:30 a 20:30</li>
            <li>Sábados: 9:00 a 13:00 y 16:30 a 20:30</li>
            <li>Domingos: cerrado</li>
          </ul>
          <ul className="footer__list">
            <li className="footer__label">Seguinos</li>
            <li>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener">
                Instagram {INSTAGRAM_HANDLE}
              </a>
            </li>
            <li>
              <a href={waLink()} target="_blank" rel="noopener">
                WhatsApp {PHONE_DISPLAY}
              </a>
            </li>
          </ul>
        </div>
        <div className="wrap footer__legal">
          <p>© El Prado · Ranchos, Buenos Aires</p>
          <a href="#inicio">Volver arriba</a>
        </div>
      </footer>

      <WaFloat />
    </>
  );
}
