import type { Metadata } from "next";
import { getSettings, getServices, getAreas } from "@/lib/data";
import { PageHeader } from "@/components/site/page-header";
import { QuoteForm } from "@/components/site/quote-form";
import { Phone, MessageCircle, ShieldCheck, Clock, CheckCircle2 } from "lucide-react";

interface PageProps {
  searchParams: Promise<{ service?: string; coupon?: string }>;
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "طلب تسعير مجاني | مظلات وسواتر وحدادة - الرياض",
    description:
      "احصل على عرض سعر مجاني وتفصيلي لمظلات السيارات والحدائق والمسابح والسواتر وأعمال الحدادة في الرياض. رد خلال 24 ساعة. معاينة مجانية بدون التزام.",
    alternates: { canonical: "/quote" },
  };
}

export default async function QuotePage({ searchParams }: PageProps) {
  const { service, coupon } = await searchParams;
  const [settings, services, areas] = await Promise.all([
    getSettings(),
    getServices(),
    getAreas(),
  ]);

  return (
    <>
      <PageHeader
        title="طلب تسعير مجاني"
        subtitle="املأ النموذج التالي واحصل على عرض سعر تفصيلي خلال 24 ساعة - بدون أي رسوم أو التزام"
        crumbs={[{ name: "طلب تسعير" }]}
      />

      {coupon && (
        <div className="bg-gradient-to-l from-accent/15 to-primary/10 border-y border-accent/20">
          <div className="container mx-auto px-4 py-3 flex items-center justify-center gap-3 flex-wrap">
            <span className="flex items-center gap-1.5 text-sm font-bold text-accent">
              🎁 كود الخصم المُطبّق:
            </span>
            <span className="font-mono font-bold text-primary text-base tracking-wider px-3 py-1 rounded-lg bg-background border-2 border-dashed border-primary/40" dir="ltr">
              {coupon}
            </span>
            <span className="text-xs text-muted-foreground">سيتم تطبيق الخصم عند تأكيد الطلب</span>
          </div>
        </div>
      )}

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-5 gap-10">
            {/* Form */}
            <div className="lg:col-span-3">
              <div className="rounded-2xl border border-border bg-card p-6 lg:p-8 shadow-sm">
                <div className="mb-6">
                  <h2 className="font-display text-2xl font-bold mb-2">نموذج طلب التسعير</h2>
                  <p className="text-sm text-muted-foreground">
                    الحقول المطلوبة مشار إليها بـ <span className="text-destructive">*</span>
                  </p>
                </div>
                <QuoteForm
                  services={services.map((s) => ({ slug: s.slug, title: s.title }))}
                  areas={areas.map((a) => ({ slug: a.slug, name: a.name }))}
                  defaultService={service}
                />
              </div>
            </div>

            {/* Info sidebar */}
            <div className="lg:col-span-2 space-y-5">
              <div className="rounded-2xl bg-gradient-to-br from-primary to-foreground text-background p-6">
                <h3 className="font-display text-xl font-bold mb-4">لماذا تطلب تسعيراً منا؟</h3>
                <ul className="space-y-3">
                  {[
                    "معاينة مجانية بدون أي التزام",
                    "عرض سعر تفصيلي وشفاف",
                    "استشارة هندسية مجانية",
                    "رد سريع خلال 24 ساعة",
                    "أسعار تنافسية ومناسبة",
                    "ضمان موثّق حتى 15 سنة",
                  ].map((b, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="font-display font-bold mb-4">تواصل سريع</h3>
                <div className="space-y-3">
                  <a href={`tel:${settings.phone}`} className="flex items-center gap-3 rounded-xl p-3 hover:bg-secondary transition">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">اتصل بنا</p>
                      <p className="font-bold" dir="ltr">{settings.phoneDisplay}</p>
                    </div>
                  </a>
                  <a href={`https://wa.me/${settings.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-xl p-3 hover:bg-secondary transition">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#25D366]/10 text-[#25D366]">
                      <MessageCircle className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">واتساب</p>
                      <p className="font-bold">راسلنا مباشرة</p>
                    </div>
                  </a>
                  <div className="flex items-center gap-3 rounded-xl p-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent/10 text-accent">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">ساعات العمل</p>
                      <p className="font-bold text-sm">{settings.workingHours}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border-2 border-dashed border-primary/30 bg-primary/5 p-6 text-center">
                <ShieldCheck className="h-10 w-10 text-primary mx-auto mb-3" />
                <p className="font-bold text-foreground">ضمان الجودة 100%</p>
                <p className="text-xs text-muted-foreground mt-1">
                  نضمن رضاك التام عن خدماتنا، أو نعيد العمل مجاناً
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
