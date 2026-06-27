"use client";

import { useEffect, useState, useCallback } from "react";
import { Star, Quote, ChevronRight, ChevronLeft } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  content: string;
  rating: number;
  area: string;
}

export function TestimonialSlider({ testimonials }: { testimonials: Testimonial[] }) {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const count = testimonials.length;

  const next = useCallback(() => {
    setActive((prev) => (prev + 1) % count);
  }, [count]);

  const prev = useCallback(() => {
    setActive((prev) => (prev - 1 + count) % count);
  }, [count]);

  useEffect(() => {
    if (isPaused || count <= 1) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [next, isPaused, count]);

  if (count === 0) return null;

  const current = testimonials[active];

  return (
    <div
      className="relative max-w-4xl mx-auto"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Main card */}
      <div className="relative rounded-3xl bg-card border border-border p-8 lg:p-12 shadow-xl overflow-hidden">
        <Quote className="absolute top-6 left-6 h-20 w-20 text-primary/5" />

        {/* Rating stars */}
        <div className="flex items-center gap-1 mb-5">
          {Array.from({ length: current.rating }).map((_, i) => (
            <Star key={i} className="h-6 w-6 text-accent fill-accent" />
          ))}
        </div>

        {/* Content */}
        <blockquote className="text-lg lg:text-xl text-foreground leading-relaxed font-medium mb-8 relative">
          &ldquo;{current.content}&rdquo;
        </blockquote>

        {/* Author */}
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground font-display font-bold text-xl shrink-0">
            {current.name.charAt(0)}
          </div>
          <div>
            <p className="font-bold text-foreground text-lg">{current.name}</p>
            <p className="text-sm text-muted-foreground">{current.role}</p>
            {current.area && (
              <p className="text-xs text-primary mt-0.5">📍 {current.area}</p>
            )}
          </div>
        </div>
      </div>

      {/* Navigation arrows */}
      {count > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="السابق"
            className="absolute top-1/2 -translate-y-1/2 right-0 lg:-right-5 flex h-11 w-11 items-center justify-center rounded-full bg-background border border-border shadow-lg hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <button
            onClick={next}
            aria-label="التالي"
            className="absolute top-1/2 -translate-y-1/2 left-0 lg:-left-5 flex h-11 w-11 items-center justify-center rounded-full bg-background border border-border shadow-lg hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        </>
      )}

      {/* Dots */}
      {count > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`الرأي ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                i === active
                  ? "w-8 bg-accent"
                  : "w-2 bg-border hover:bg-muted-foreground"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
