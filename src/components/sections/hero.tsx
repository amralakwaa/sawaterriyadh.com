import Image from "next/image";
import Link from "next/link";
import { Phone, MessageCircle, Star, ShieldCheck, ChevronLeft } from "lucide-react";
import { getSettings, getStats } from "@/lib/data";
import { Icon } from "@/components/site/icon";
import { HeroCarousel } from "@/components/site/hero-carousel";

export async function HeroSection() {
  const [settings, stats] = await Promise.all([getSettings(), getStats()]);

  return (
    <section className="relative overflow-hidden bg-foreground">
      {/* Background carousel */}
      <HeroCarousel />

      {/* Decorative blobs */}
      <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
      <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-primary/30 blur-3xl" />

      <div className="relative container mx-auto px-4 py-16 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-background">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-accent/15 border border-accent/30 px-4 py-1.5 mb-6 backdrop-blur-sm">
              <Star className="h-3.5 w-3.5 text-accent fill-accent" />
              <span className="text-xs font-bold text-accent">
                الأول في الرياض منذ {settings.yearsExperience} سنة
              </span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight text-balance">
              مظلات وسواتر وأعمال حدادة
              <span className="block gradient-text mt-2">
                في الرياض بضمان يصل إلى 15 سنة
              </span>
            </h1>

            <p className="mt-5 text-base lg:text-lg text-background/80 max-w-xl leading-relaxed text-pretty">
              متخصصون في تصميم وتركيب مظلات السيارات والحدائق والمسابح والسواتر وأعمال الحدادة الفنية.
              أكثر من 3500 مشروع منجز في الرياض بأعلى معايير الجودة وأفضل الأسعار.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/quote"
                className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-4 text-base font-bold text-accent-foreground shadow-xl shadow-accent/30 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-accent/40"
              >
                اطلب تسعير مجاني
                <ChevronLeft className="h-5 w-5" />
              </Link>
              <a
                href={`tel:${settings.phone}`}
                className="inline-flex items-center gap-2 rounded-xl bg-background/10 backdrop-blur-sm border border-background/20 px-6 py-4 text-base font-bold text-background transition-all hover:bg-background/20"
              >
                <Phone className="h-5 w-5" />
                <span dir="ltr">{settings.phoneDisplay}</span>
              </a>
            </div>

            {/* Trust indicators */}
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-background/70">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-accent" />
                ضمان موثّق
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-accent" />
                معاينة مجانية
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-accent" />
                معتمدون من الدفاع المدني
              </span>
            </div>
          </div>

          {/* Stats card */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s, i) => (
                <div
                  key={i}
                  className={`glass rounded-2xl p-5 text-foreground ${i % 2 === 1 ? "translate-y-6" : ""}`}
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary mb-3">
                    <Icon name={s.icon} className="h-6 w-6" />
                  </div>
                  <p className="text-3xl font-display font-extrabold text-primary">{s.value}</p>
                  <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Floating rating card */}
            <div className="glass rounded-2xl p-4 mt-6 flex items-center gap-4 text-foreground max-w-sm">
              <div className="flex -space-x-3 -space-x-reverse">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-10 w-10 rounded-full border-2 border-background bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground text-xs font-bold"
                  >
                    {["أ", "م", "ف", "س"][i - 1]}
                  </div>
                ))}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-3.5 w-3.5 text-accent fill-accent" />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  تقييم 4.9/5 من +3400 عميل
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="relative">
        <svg viewBox="0 0 1440 80" className="w-full h-[40px] lg:h-[60px]" preserveAspectRatio="none">
          <path d="M0,80 L0,40 Q360,0 720,40 T1440,40 L1440,80 Z" fill="var(--background)" />
        </svg>
      </div>
    </section>
  );
}
