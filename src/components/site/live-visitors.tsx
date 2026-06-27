"use client";

import { useState, useEffect, useRef } from "react";
import { Users, TrendingUp } from "lucide-react";

function getInitialCount() {
  if (typeof window === "undefined") return 12;
  return 12 + Math.floor(Math.random() * 15);
}

function getInitialQuotes() {
  if (typeof window === "undefined") return 7;
  return 7 + Math.floor(Math.random() * 8);
}

export function LiveVisitors() {
  const [count, setCount] = useState(() => getInitialCount());
  const [quotesToday, setQuotesToday] = useState(() => getInitialQuotes());
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCount((prev) => {
        const delta = Math.floor(Math.random() * 5) - 2;
        return Math.max(5, Math.min(40, prev + delta));
      });
    }, 4000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="inline-flex items-center gap-3 rounded-full bg-card border border-border px-4 py-2 shadow-sm">
      <div className="flex items-center gap-1.5">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 animate-ping opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
        </span>
        <Users className="h-4 w-4 text-primary" />
        <span className="text-xs font-bold text-foreground">
          {count} شخص
        </span>
        <span className="text-xs text-muted-foreground">يتصفح الآن</span>
      </div>
      <span className="h-4 w-px bg-border" />
      <div className="flex items-center gap-1.5">
        <TrendingUp className="h-4 w-4 text-accent" />
        <span className="text-xs font-bold text-foreground">
          {quotesToday}
        </span>
        <span className="text-xs text-muted-foreground">طلب تسعير اليوم</span>
      </div>
    </div>
  );
}
