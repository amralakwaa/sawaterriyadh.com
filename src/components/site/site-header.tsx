import Link from "next/link";
import { Phone, MessageCircle, ChevronLeft } from "lucide-react";
import { getSettings, getServices } from "@/lib/data";
import { MainNav, MobileNav } from "./main-nav";
import { GlobalSearch } from "./global-search";

export async function SiteHeader() {
  const [settings, services] = await Promise.all([getSettings(), getServices()]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/85 backdrop-blur-lg supports-[backdrop-filter]:bg-background/75">
      {/* Top bar */}
      <div className="hidden md:block bg-primary text-primary-foreground">
        <div className="container mx-auto flex h-9 items-center justify-between px-4 text-xs">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5" />
              <a href={`tel:${settings.phone}`} className="hover:text-accent transition-colors" dir="ltr">
                {settings.phoneDisplay}
              </a>
            </span>
            <span className="text-primary-foreground/70">|</span>
            <span className="flex items-center gap-1.5">
              <MessageCircle className="h-3.5 w-3.5" />
              واتساب: {settings.workingHours}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-primary-foreground/90">{settings.city}</span>
            <span className="text-primary-foreground/70">•</span>
            <span className="text-primary-foreground/90">ضمان حتى 15 سنة</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4">
        <div className="flex h-16 lg:h-20 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <div className="relative">
              <div className="flex h-11 w-11 lg:h-12 lg:w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-lg shadow-primary/20">
                <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 13L12 4l9 9" />
                  <path d="M5 13v8h14v-8" />
                  <path d="M9 21v-5h6v5" />
                </svg>
              </div>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-display font-extrabold text-base lg:text-xl text-foreground">
                الظلال الملكية
              </span>
              <span className="text-[10px] lg:text-xs text-muted-foreground">
                مظلات • سواتر • حدادة
              </span>
            </div>
          </Link>

          <MainNav services={services} />

          <div className="flex items-center gap-2">
            <GlobalSearch />
            <div className="hidden lg:flex items-center gap-2">
              <Link
                href="/quote"
                className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2.5 text-sm font-bold text-accent-foreground shadow-md shadow-accent/20 transition-all hover:brightness-110 hover:shadow-lg hover:shadow-accent/30"
              >
                اطلب تسعير مجاني
                <ChevronLeft className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <MobileNav services={services} />
        </div>
      </div>
    </header>
  );
}
