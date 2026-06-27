"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

export function ThemeToggle() {
  const { theme, toggle, mounted } = useTheme();

  if (!mounted) {
    // Placeholder to avoid hydration mismatch
    return (
      <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border opacity-0">
        <Sun className="h-4 w-4" />
      </div>
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={toggle}
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card hover:bg-secondary hover:border-primary/40 transition-colors group"
      aria-label={isDark ? "تفعيل الوضع النهاري" : "تفعيل الوضع الليلي"}
      title={isDark ? "الوضع النهاري" : "الوضع الليلي"}
    >
      <div className="relative h-4 w-4">
        <Sun
          className={`absolute inset-0 transition-all duration-300 ${
            isDark ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100"
          }`}
        />
        <Moon
          className={`absolute inset-0 transition-all duration-300 ${
            isDark ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-0"
          }`}
        />
      </div>
    </button>
  );
}
