"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

interface Slide {
  src: string;
  alt: string;
}

const SLIDES: Slide[] = [
  {
    src: "https://sfile.chatglm.cn/images-ppt/304f69241716.jpg",
    alt: "مظلات سيارات حديثة في الرياض",
  },
  {
    src: "https://sfile.chatglm.cn/images-ppt/e70dcab5e59b.jpg",
    alt: "مظلات حدائق واستراحات فاخرة",
  },
  {
    src: "https://sfile.chatglm.cn/images-ppt/507de93b7f7a.jpg",
    alt: "أعمال حدادة فنية وبوابات",
  },
  {
    src: "https://sfile.chatglm.cn/images-ppt/be3065e46d38.jpg",
    alt: "مظلات مسابح مقاومة للماء",
  },
];

export function HeroCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setActive((p) => (p + 1) % SLIDES.length);
  }, []);

  const goTo = useCallback((i: number) => {
    setActive(i);
  }, []);

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [next, paused]);

  return (
    <div
      className="absolute inset-0"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {SLIDES.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover"
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-hero-overlay" />
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />

      {/* Slide indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`الشريحة ${i + 1}`}
            className={`h-2 rounded-full transition-all ${
              i === active
                ? "w-8 bg-accent"
                : "w-2 bg-background/40 hover:bg-background/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
