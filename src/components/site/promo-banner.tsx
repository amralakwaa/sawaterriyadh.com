"use client";

import { useState } from "react";
import { X, Sparkles, Phone } from "lucide-react";
import Link from "next/link";

const STORAGE_KEY = "promo-banner-dismissed";

function getInitialVisible(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const dismissed = localStorage.getItem(STORAGE_KEY);
    const dismissedTime = dismissed ? parseInt(dismissed, 10) : 0;
    return !dismissedTime || Date.now() - dismissedTime > 24 * 60 * 60 * 1000;
  } catch {
    return true;
  }
}

export function PromoBanner() {
  // Lazy initializer runs only on client during first render
  const [visible, setVisible] = useState(() => getInitialVisible());

  const dismiss = () => {
    setVisible(false);
    try {
      localStorage.setItem(STORAGE_KEY, String(Date.now()));
    } catch {}
  };

  if (!visible) return null;

  return (
    <div className="relative bg-gradient-to-l from-accent via-accent to-primary text-accent-foreground">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-3 py-2.5 text-center">
          <Sparkles className="hidden sm:block h-4 w-4 shrink-0 animate-pulse" />
          <p className="text-xs sm:text-sm font-bold flex-1">
            🎉 عرض خاص لفصل الصيف: خصم 15% على جميع مظلات السيارات + معاينة مجانية!
          </p>
          <Link
            href="/quote"
            className="hidden sm:inline-flex items-center gap-1 rounded-md bg-background/20 hover:bg-background/30 px-3 py-1 text-xs font-bold transition-colors"
          >
            <Phone className="h-3 w-3" />
            اطلب الآن
          </Link>
          <button
            onClick={dismiss}
            aria-label="إغلاق"
            className="shrink-0 rounded-md hover:bg-background/20 p-1 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
