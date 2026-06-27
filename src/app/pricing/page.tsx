import type { Metadata } from "next";
import Link from "next/link";
import { Check, X, ChevronLeft, Phone, Calculator, Info, TrendingDown, Award } from "lucide-react";
import { getSettings, getServices } from "@/lib/data";
import { PageHeader } from "@/components/site/page-header";
import { CtaQuoteSection } from "@/components/sections/cta-quote";

export const metadata: Metadata = {
  title: "جدول الأسعار الشامل | مظلات وسواتر وحدادة - الرياض",
  description:
    "جدول أسعار شامل لجميع خدمات المظلات والسواتر والحدادة في الرياض 2025. مقارنة الأسعار، العوامل المؤثرة، نصائح لتوفير التكلفة. أسعار شفافة بدون رسوم خفية.",
  alternates: { canonical: "/pricing" },
};

interface PriceTier {
  service: string;
  category: string;
  economy: { price: string; features: string[] };
  standard: { price: string; features: string[]; popular?: boolean };
  premium: { price: string; features: string[] };
}

const PRICE_TIERS: PriceTier[] = [
  {
    service: "مظلات السيارات",
    category: "مظلات",
    economy: {
      price: "150 ريال/م²",
      features: ["قماش PVC أساسي", "هيكل حديد مجلفن", "ضمان 5 سنوات", "لون واحد"],
    },
    standard: {
      price: "200 ريال/م²",
      features: ["شرائح ألمونيوم", "هيكل معالج حرارياً", "ضمان 10 سنوات", "ألوان متعددة", "تركيب احترافي"],
      popular: true,
    },
    premium: {
      price: "300 ريال/م²",
      features: ["شرائح متحركة سمارت", "هيكل ستانلس ستيل", "ضمان 15 سنة", "إضاءة LED", "تحكم عن بُعد"],
    },
  },
  {
    service: "مظلات الحدائق",
    category: "مظلات",
    economy: {
      price: "200 ريال/م²",
      features: ["خشب محلي", "معالج أساسي", "ضمان 5 سنوات"],
    },
    standard: {
      price: "275 ريال/م²",
      features: ["خشب مستورد", "معالج ضد الحشرات", "ضمان 8 سنوات", "تشطيب لامع"],
      popular: true,
    },
    premium: {
      price: "350 ريال/م²",
      features: ["خشب فاخر", "معالج شامل", "ضمان 12 سنة", "إضاءة مدمجة", "تصميم مخصص"],
    },
  },
  {
    service: "السواتر",
    category: "سواتر",
    economy: {
      price: "120 ريال/م²",
      features: ["قماش PVC أساسي", "هيكل بسيط", "ضمان 3 سنوات"],
    },
    standard: {
      price: "180 ريال/م²",
      features: ["قماش PVC مزدوج", "هيكل مجلفن", "ضمان 7 سنوات", "ألوان متعددة"],
      popular: true,
    },
    premium: {
      price: "280 ريال/م²",
      features: ["قماش PVC فاخر", "هيكل ستانلس ستيل", "ضمان 10 سنوات", "عزل حراري", "تصميم مخصص"],
    },
  },
  {
    service: "أعمال الحدادة",
    category: "حدادة",
    economy: {
      price: "350 ريال/م²",
      features: ["حديد عادي", "دهان أساسي", "ضمان 5 سنوات"],
    },
    standard: {
      price: "450 ريال/م²",
      features: ["حديد مجلفن", "دهان إلكتروستاتيك", "ضمان 10 سنوات", "تصميم احترافي"],
      popular: true,
    },
    premium: {
      price: "600 ريال/م²",
      features: ["حديد فاخر", "دهان فرن متقدم", "ضمان 12 سنة", "تصميم مخصص", "إكسسوارات نحاسية"],
    },
  },
];

const FACTORS = [
  { icon: TrendingDown, title: "المساحة", desc: "كلما زادت المساحة، قل سعر المتر الواحد" },
  { icon: Award, title: "نوع المادة", desc: "الألمونيوم أغلى من القماش، الستانلس أغلى من الحديد" },
  { icon: Info, title: "التصميم", desc: "التصاميم المخصصة تكلف أكثر من الجاهزة" },
  { icon: Calculator, title: "الموقع", desc: "المواقع الصعبة أو البعيدة قد تزيد التكلفة" },
];

const TIPS = [
  "اطلب عروض أسعار من عدة شركات للمقارنة",
  "تأكد من أن السعر يشمل التركيب والضمان",
  "اسأل عن الخصومات للمشاريع الكبيرة",
  "تحقق من شهادات الجودة والاعتمادات",
  "تجنب الأسعار المنخفضة جداً (قد تكون جودة رديئة)",
  "اطلب عقداً واضحاً بجميع التفاصيل",
];

export default async function PricingPage() {
  const [settings, services] = await Promise.all([getSettings(), getServices()]);

  return (
    <>
      <PageHeader
        title="جدول الأسعار الشامل 2025"
        subtitle="أسعار شفافة لجميع خدماتنا - مقارنة الباقات، العوامل المؤثرة، ونصائح للتوفير"
        crumbs={[{ name: "الأسعار" }]}
      />

      {/* Quick services prices */}
      <section className="py-8 bg-secondary/40 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-4xl mx-auto">
            {services.slice(0, 4).map((s, i) => (
              <div key={i} className="rounded-xl bg-card border border-border p-4 text-center">
                <p className="text-xs text-muted-foreground mb-1">{s.title}</p>
                <p className="font-display text-lg font-extrabold text-primary">
                  {s.priceFrom ? s.priceFrom.split(" ")[0] : "—"}
                </p>
                <p className="text-[10px] text-muted-foreground">ريال/م²</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Price tiers table */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="font-display text-2xl lg:text-3xl font-bold">باقات الأسعار</h2>
            <p className="text-muted-foreground mt-2">ثلاث باقات لكل خدمة - اختر ما يناسب ميزانيتك</p>
          </div>

          <div className="space-y-8">
            {PRICE_TIERS.map((tier, i) => (
              <div key={i} className="rounded-2xl border border-border bg-card overflow-hidden">
                <div className="bg-secondary/50 px-6 py-4 border-b border-border flex items-center justify-between">
                  <div>
                    <h3 className="font-display font-bold text-lg">{tier.service}</h3>
                    <span className="text-xs text-muted-foreground">{tier.category}</span>
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-0">
                  {/* Economy */}
                  <div className="p-6 border-l border-border">
                    <p className="text-xs font-bold text-muted-foreground mb-2">الباقة الاقتصادية</p>
                    <p className="font-display text-2xl font-extrabold text-foreground mb-4">{tier.economy.price}</p>
                    <ul className="space-y-2">
                      {tier.economy.features.map((f, j) => (
                        <li key={j} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <Check className="h-3.5 w-3.5 text-green-600 shrink-0 mt-0.5" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* Standard (popular) */}
                  <div className="p-6 border-l border-border bg-accent/5 relative">
                    {tier.standard.popular && (
                      <span className="absolute top-3 left-3 rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold text-accent-foreground">
                        ⭐ الأكثر طلباً
                      </span>
                    )}
                    <p className="text-xs font-bold text-accent mb-2">الباقة القياسية</p>
                    <p className="font-display text-2xl font-extrabold text-accent mb-4">{tier.standard.price}</p>
                    <ul className="space-y-2">
                      {tier.standard.features.map((f, j) => (
                        <li key={j} className="flex items-start gap-2 text-xs text-foreground">
                          <Check className="h-3.5 w-3.5 text-accent shrink-0 mt-0.5" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* Premium */}
                  <div className="p-6">
                    <p className="text-xs font-bold text-muted-foreground mb-2">الباقة الفاخرة</p>
                    <p className="font-display text-2xl font-extrabold text-foreground mb-4">{tier.premium.price}</p>
                    <ul className="space-y-2">
                      {tier.premium.features.map((f, j) => (
                        <li key={j} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <Check className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Note */}
          <div className="mt-8 max-w-3xl mx-auto rounded-xl border border-dashed border-border p-4 flex items-start gap-3">
            <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              جميع الأسعار تقديرية وقابلة للتفاوض حسب حجم المشروع والموقع. الأسعار شاملة ضريبة القيمة المضافة (15%).
              للحصول على تسعير دقيق لمشروعك، اطلب معاينة مجانية.
            </p>
          </div>
        </div>
      </section>

      {/* Factors affecting pricing */}
      <section className="py-12 lg:py-16 bg-secondary/40">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="font-display text-2xl lg:text-3xl font-bold">عوامل تؤثر على السعر</h2>
            <p className="text-muted-foreground mt-2">افهم ما يحدد تكلفة مشروعك</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {FACTORS.map((f, i) => (
              <div key={i} className="rounded-2xl border border-border bg-card p-5 text-center hover:border-primary/40 hover:shadow-md transition-all">
                <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-xl bg-primary/10 text-primary mb-3">
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-sm mb-1">{f.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="font-display text-2xl lg:text-3xl font-bold">نصائح للحصول على أفضل سعر</h2>
              <p className="text-muted-foreground mt-2">خبرتنا في خدمتك</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6 lg:p-8">
              <ul className="space-y-3">
                {TIPS.map((tip, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground text-xs font-bold mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-sm text-foreground/90">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator CTA */}
      <section className="py-12 lg:py-16 bg-secondary/40">
        <div className="container mx-auto px-4">
          <div className="rounded-2xl bg-gradient-to-br from-primary to-accent text-background p-8 lg:p-12 text-center max-w-3xl mx-auto">
            <Calculator className="h-12 w-12 mx-auto mb-4" />
            <h2 className="font-display text-2xl lg:text-3xl font-bold mb-3">
              احسب تكلفة مشروعك بدقة
            </h2>
            <p className="text-background/80 text-sm mb-6 max-w-xl mx-auto">
              استخدم حاسبتنا التفاعلية للحصول على تقدير فوري لتكلفة مشروعك، أو اطلب تسعيراً مجانياً ودقيقاً.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/quote"
                className="inline-flex items-center gap-2 rounded-xl bg-background px-6 py-3 text-sm font-bold text-primary hover:scale-105 transition"
              >
                اطلب تسعير مجاني
                <ChevronLeft className="h-4 w-4" />
              </Link>
              <a
                href={`tel:${settings.phone}`}
                className="inline-flex items-center gap-2 rounded-xl bg-foreground px-6 py-3 text-sm font-bold text-background hover:scale-105 transition"
              >
                <Phone className="h-4 w-4" />
                <span dir="ltr">{settings.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <CtaQuoteSection />
    </>
  );
}
