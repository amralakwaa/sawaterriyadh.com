"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronRight, ChevronLeft, ZoomIn } from "lucide-react";

interface GalleryProps {
  images: string[];
  alt: string;
}

export function GalleryLightbox({ images, alt }: GalleryProps) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  const next = useCallback(() => {
    setActive((p) => (p + 1) % images.length);
  }, [images.length]);

  const prev = useCallback(() => {
    setActive((p) => (p - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowLeft") next();
      if (e.key === "ArrowRight") prev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, next, prev]);

  if (images.length === 0) return null;

  return (
    <>
      <div>
        <h3 className="font-display font-bold text-lg mb-3 flex items-center gap-2">
          صور إضافية
          <span className="text-xs font-normal text-muted-foreground">({images.length})</span>
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => {
                setActive(i);
                setOpen(true);
              }}
              className="group relative aspect-square rounded-xl overflow-hidden border border-border hover:border-primary transition-colors"
              aria-label={`عرض الصورة ${i + 1}`}
            >
              <Image
                src={img}
                alt={`${alt} - صورة ${i + 1}`}
                fill
                sizes="33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                <ZoomIn className="h-7 w-7 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox modal */}
      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-sm animate-fade-up"
          onClick={() => setOpen(false)}
        >
          {/* Close */}
          <button
            onClick={() => setOpen(false)}
            className="absolute top-4 left-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="إغلاق"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Counter */}
          <div className="absolute top-6 right-1/2 translate-x-1/2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-bold text-white">
            {active + 1} / {images.length}
          </div>

          {/* Prev (RTL: right arrow) */}
          {images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="السابق"
            >
              <ChevronRight className="h-7 w-7" />
            </button>
          )}

          {/* Image */}
          <div
            className="relative w-full h-full max-w-5xl max-h-[85vh] flex items-center justify-center p-4 sm:p-12"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[active]}
              alt={`${alt} - صورة ${active + 1}`}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>

          {/* Next (RTL: left arrow) */}
          {images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="التالي"
            >
              <ChevronLeft className="h-7 w-7" />
            </button>
          )}

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 max-w-[90vw] overflow-x-auto p-2">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setActive(i); }}
                  className={`relative h-14 w-14 shrink-0 rounded-lg overflow-hidden border-2 transition ${
                    i === active ? "border-accent" : "border-transparent opacity-50 hover:opacity-80"
                  }`}
                >
                  <Image src={img} alt={`مصغر ${i + 1}`} fill sizes="56px" className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
