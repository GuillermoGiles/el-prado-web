import type { StaticImageData } from "next/image";
import { BRANDS } from "@/lib/site";
import vidrieraMujer from "@/media/hd/7.jpg";
import sombreros from "@/media/hd/14.jpg";
import carteras from "@/media/hd/15.jpg";
import calzado from "@/media/hd/16.jpg";
import vidrieraHombre from "@/media/hd/18.jpg";
import rinconCriollo from "@/media/hd/19.jpg";
import plateria from "@/media/hd/21.jpg";
import mates from "@/media/hd/22.jpg";

export type Rubro = {
  id: string;
  title: string;
  text: string;
  topic: string;
  img: StaticImageData;
  alt: string;
  pos?: string;
};

export const RUBROS: Rubro[] = [
  {
    id: "mujer",
    title: "Mujer",
    text: "Prendas de campo y de ciudad, para el día a día y para salir.",
    topic: "ropa de mujer",
    img: vidrieraMujer,
    alt: "Vidriera de El Prado con ropa de mujer: un pulóver blanco bordado y un pantalón claro en maniquíes.",
    pos: "50% 60%",
  },
  {
    id: "hombre",
    title: "Hombre",
    text: "Camisas, pantalones y abrigos, para el trabajo y para el fin de semana.",
    topic: "ropa de hombre",
    img: vidrieraHombre,
    alt: "Vidriera interior con ropa de hombre: una camisa clara y una camisa oscura con pantalones en maniquíes.",
    pos: "50% 45%",
  },
  {
    id: "campo",
    title: "Campo",
    text: "Ropa de campo para trabajar y para las fiestas criollas.",
    topic: "ropa de campo",
    img: rinconCriollo,
    alt: "Rincón criollo del local con sombreros de ala, boinas, cinturones de cuero y una silla de paja.",
    pos: "40% 40%",
  },
  {
    id: "calzado",
    title: "Calzado",
    text: "Alpargatas, náuticos, mocasines y botas. Probátelos en el local.",
    topic: "calzado",
    img: calzado,
    alt: "Estantería de madera con alpargatas de colores, náuticos, mocasines y botas, y pulóveres doblados arriba.",
    pos: "50% 55%",
  },
  {
    id: "sombreros",
    title: "Sombreros y cinturones",
    text: "Sombreros de ala, boinas y cinturones de cuero en varios colores.",
    topic: "sombreros y cinturones",
    img: sombreros,
    alt: "Exhibidor de madera con el nombre El Prado tallado, dos sombreros de ala, boinas y cinturones colgados.",
    pos: "50% 35%",
  },
  {
    id: "carteras",
    title: "Carteras",
    text: "Carteras, bolsos y mochilas para todos los días.",
    topic: "carteras",
    img: carteras,
    alt: "Estantes con carteras, bolsos y mochilas en negro, blanco, azul y suela.",
    pos: "50% 30%",
  },
  {
    id: "mates",
    title: "Mates y termos",
    text: "Mates de calabaza y de madera, bombillas y termos.",
    topic: "mates y termos",
    img: mates,
    alt: "Esquinero de madera con mates de calabaza y de madera, bombillas y un termo de acero.",
    pos: "50% 40%",
  },
  {
    id: "plateria",
    title: "Platería criolla",
    text: "Cuchillos criollos, llaveros y piezas de platería para regalar.",
    topic: "platería criolla",
    img: plateria,
    alt: "Vitrina de vidrio con cuchillos criollos, llaveros y piezas de platería.",
    pos: "50% 45%",
  },
];

export type Reason = { title: string; text: string };

export const REASONS: Reason[] = [
  {
    title: "Te lo probás en el momento",
    text: "Tenemos probador y te asesoramos para encontrar tu talle, sin esperar un envío.",
  },
  {
    title: "Cambiás sin vueltas",
    text: "Si algo no te queda, lo traés al local. Estamos acá, en el pueblo.",
  },
  {
    title: "Pagás como te quede cómodo",
    text: "Efectivo con descuento, débito, tarjeta de crédito en cuotas y transferencia.",
  },
  {
    title: "Consultás por WhatsApp",
    text: "Preguntá por un talle o un color, reservá la prenda y pasá a buscarla.",
  },
];


export type Content = { rubros: Rubro[]; reasons: Reason[]; brands: readonly string[] };

export const DEMO: Content = { rubros: RUBROS, reasons: REASONS, brands: BRANDS };
