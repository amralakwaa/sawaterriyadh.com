"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/site/icon";

interface Stat {
  icon: string;
  label: string;
  value: string;
}

function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    let rafId: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) rafId = requestAnimationFrame(step);
      else setCount(target);
    };
    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [target, duration, start]);
  return count;
}

function StatCard({ stat, start }: { stat: Stat; start: boolean }) {
  // Parse numeric value with suffix (e.g. "+15", "+3500", "4.9")
  const numericMatch = stat.value.match(/[\d.]+/);
  const numeric = numericMatch ? parseFloat(numericMatch[0]) : 0;
  const prefix = stat.value.match(/^[^\d.]*/)?.[0] || "";
  const suffix = stat.value.match(/[^\d.]*$/)?.[0] || "";
  const hasDecimal = stat.value.includes(".");

  const count = useCountUp(numeric, 2000, start);
  const display = hasDecimal ? count.toFixed(1) : count.toLocaleString("ar-SA");

  return (
    <div className="relative rounded-2xl bg-card border border-border p-6 text-center overflow-hidden group hover:border-primary/40 hover:shadow-lg transition-all hover:-translate-y-1">
      <div className="absolute -top-8 -right-8 h-24 w-24 rounded-full bg-primary/5 group-hover:bg-accent/10 transition-colors" />
      <div className="relative">
        <div className="flex h-14 w-14 mx-auto items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 text-primary mb-3">
          <Icon name={stat.icon} className="h-7 w-7" />
        </div>
        <p className="font-display text-3xl lg:text-4xl font-extrabold text-primary">
          {prefix}{display}{suffix}
        </p>
        <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
      </div>
    </div>
  );
}

export function AnimatedStats({ stats }: { stats: Stat[] }) {
  const [start, setStart] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStart(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((s, i) => (
        <StatCard key={i} stat={s} start={start} />
      ))}
    </div>
  );
}
