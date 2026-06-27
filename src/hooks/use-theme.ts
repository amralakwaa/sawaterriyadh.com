"use client";

import { useEffect, useState, useCallback } from "react";

type Theme = "light" | "dark";

const STORAGE_KEY = "theme-preference";

function applyThemeClass(t: Theme) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  if (t === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
}

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";
  try {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
    return stored === "dark" || stored === "light" ? stored : "light";
  } catch {
    return "light";
  }
}

export function useTheme() {
  // Lazy initializer runs on client only during hydration
  const [theme, setTheme] = useState<Theme>(() => getInitialTheme());
  const [mounted, setMounted] = useState<boolean>(() => typeof window !== "undefined");

  // Sync the class with the theme state
  useEffect(() => {
    applyThemeClass(theme);
  }, [theme]);

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === "light" ? "dark" : "light";
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {}
      return next;
    });
  }, []);

  return { theme, toggle, mounted };
}
