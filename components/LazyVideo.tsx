"use client";

import { useEffect, useRef } from "react";

type Props = { src: string; poster: string; label: string; width: number; height: number };

/** Video con controles que recién carga cuando se acerca a la pantalla. Arranca sin sonido. */
export function LazyVideo({ src, poster, label, width, height }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current!;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        video.src = src;
        video.load();
      },
      { rootMargin: "400px 0px" },
    );
    io.observe(video);
    return () => io.disconnect();
  }, [src]);

  return (
    <video
      ref={ref}
      className="video"
      poster={poster}
      width={width}
      height={height}
      controls
      muted
      playsInline
      preload="none"
      aria-label={label}
    >
      Tu navegador no puede mostrar el video del recorrido.
    </video>
  );
}
