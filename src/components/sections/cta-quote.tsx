import { Phone, MessageCircle, Clock, ShieldCheck, CheckCircle2 } from "lucide-react";
import { getSettings, getServices, getAreas } from "@/lib/data";
import { QuoteForm } from "@/components/site/quote-form";

export async function CtaQuoteSection() {
  const [settings, services, areas] = await Promise.all([
    getSettings(),
    getServices(),
    getAreas(),
  ]);

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-primary to-foreground text-background relative overflow-hidden" id="quote">
      {/* Decorative pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />

      <div className="relative container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: pitch */}
          <div>
            <span className="inline-block rounded-full bg-accent/15 border border-accent/30 px-4 py-1.5 text-xs font-bold text-accent mb-5">
              اطلب تسعير مجاني الآن
            </span>
            <h2 className="font-display text-3xl lg:text-4xl font-extrabold leading-tight text-balance">
              احصل على عرض سعر تفصيلي
              <span className="block gradient-text mt-2">خلال 24 ساعة فقط</span>
            </h2>
            <p className="mt-5 text-background/80 text-base lg:text-lg leading-relaxed">
              املأ النموذج وسيتواصل معك فريقنا المتخصص لتقديم استشارة مجانية ومعاينة الموقع
              وعرض سعر شفاف بدون أي رسوم خفية أو التزام.
            </p>

            {/* Benefits */}
            <ul className="mt-6 space-y-3">
              {[
                "استشارة هندسية مجانية بدون التزام",
                "معاينة موقع دقيقة بأحدث الأدوات",
                "عرض سعر تفصيلي وشفاف خلال 24 ساعة",
                "ضمان موثّق حتى 15 سنة على الأعمال",
                "تقسيط ميسّر عبر تابي وتمارا",
              ].map((b, i) => (
                <li key={i} className="flex items-start gap-2 text-sm lg:text-base text-background/90">
                  <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  {b}
                </li>
              ))}
            </ul>

            {/* Quick contact */}
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={`tel:${settings.phone}`}
                className="inline-flex items-center gap-2 rounded-xl bg-background/10 backdrop-blur-sm border border-background/20 px-5 py-3 text-sm font-bold hover:bg-background/20 transition-colors"
              >
                <Phone className="h-4 w-4 text-accent" />
                <span dir="ltr">{settings.phoneDisplay}</span>
              </a>
              <a
                href={`https://wa.me/${settings.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-sm font-bold text-white hover:brightness-110 transition"
              >
                <MessageCircle className="h-4 w-4" />
                واتساب مباشر
              </a>
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs text-background/60">
              <Clock className="h-3.5 w-3.5" />
              {settings.workingHours}
            </div>
          </div>

          {/* Right: form */}
          <div className="rounded-2xl bg-background text-foreground p-6 lg:p-8 shadow-2xl">
            <div className="mb-6">
              <h3 className="font-display text-xl font-extrabold">نموذج طلب التسعير</h3>
              <p className="text-sm text-muted-foreground mt-1">
                أدخل بياناتك وسنعاود الاتصال بك خلال 24 ساعة
              </p>
            </div>
            <QuoteForm
              services={services.map((s) => ({ slug: s.slug, title: s.title }))}
              areas={areas.map((a) => ({ slug: a.slug, name: a.name }))}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
