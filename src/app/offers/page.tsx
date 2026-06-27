import type { Metadata } from "next";
import Link from "next/link";
import { Clock, ArrowLeft, Phone, Flame, Gift, Percent } from "lucide-react";
import { getSettings } from "@/lib/data";
import { PageHeader } from "@/components/site/page-header";
import { CopyCoupon } from "@/components/site/copy-coupon";
import { CtaQuoteSection } from "@/components/sections/cta-quote";

export const metadata: Metadata = {
  title: "العروض والكوبونات | خصومات على المظلات والحدادة - الرياض",
  description:
    "أحدث العروض والخصومات على مظلات السيارات والحدائق والسواتر وأعمال الحدادة في الرياض. كوبونات خصم حصرية، عروض موسمية، وباقات خاصة.",
  alternates: { canonical: "/offers" },
};

interface Offer {
  id: string;
  title: string;
  description: string;
  discount: string;
  code: string;
  validUntil: string;
  icon: "flame" | "gift" | "percent";
  color: string;
  services: string[];
  highlight?: boolean;
}

const OFFERS: Offer[] = [
  {
    id: "summer-15",
    title: "عرض الصيف الحارق",
    description: "خصم 15% على جميع مظلات السيارات المعدنية والقماشية + معاينة وتركيب مجاني",
    discount: "15%",
    code: "SUMMER15",
    validUntil: "2025-09-30",
    icon: "flame",
    color: "from-orange-500 to-red-500",
    services: ["مظلات سيارات", "مظلات حدائق"],
    highlight: true,
  },
  {
    id: "bundle-3in1",
    title: "باقة 3 في 1",
    description: "اطلب 3 خدمات معاً (مظلة + ساتر + حدادة) واحصل على خصم 20% على الإجمالي",
    discount: "20%",
    code: "BUNDLE20",
    validUntil: "2025-12-31",
    icon: "gift",
    color: "from-primary to-accent",
    services: ["مظلات", "سواتر", "حدادة"],
  },
  {
    id: "ramadan-special",
    title: "عرض الموسم الكريم",
    description: "خصم 10% على جميع أعمال الحدادة الفنية + تركيب مجاني للبوابات الأوتوماتيكية",
    discount: "10%",
    code: "SEASON10",
    validUntil: "2025-12-31",
    icon: "percent",
    color: "from-emerald-600 to-teal-600",
    services: ["حدادة فنية", "بوابات"],
  },
  {
    id: "referral-500",
    title: "عميل يجلب عميل",
    description: "احصل على 500 ريال نقداً عند إحالة عميل جديد يطلب خدمة بقيمة 5000+ ريال",
    discount: "500 ريال",
    code: "REFER500",
    validUntil: "2025-12-31",
    icon: "gift",
    color: "from-violet-600 to-purple-600",
    services: ["جميع الخدمات"],
  },
  {
    id: "early-bird",
    title: "الحجز المبكر",
    description: "احجز مشروعك قبل 30 يوماً واحصل على خصم 12% إضافي على عرض السعر",
    discount: "12%",
    code: "EARLY12",
    validUntil: "2025-12-31",
    icon: "percent",
    color: "from-blue-600 to-cyan-600",
    services: ["جميع الخدمات"],
  },
  {
    id: "maintenance-free",
    title: "صيانة مجانية سنتين",
    description: "احصل على صيانة دورية مجانية لمدة سنتين عند طلب أي مشروع بقيمة 10,000+ ريال",
    discount: "مجاناً",
    code: "CARE24",
    validUntil: "2025-12-31",
    icon: "gift",
    color: "from-amber-600 to-yellow-600",
    services: ["جميع الخدمات"],
  },
];

const iconMap = {
  flame: Flame,
  gift: Gift,
  percent: Percent,
};

export default async function OffersPage() {
  const settings = await getSettings();

  return (
    <>
      <PageHeader
        title="العروض والكوبونات الحصرية"
        subtitle="وفّر أكثر مع عروضنا الموسمية والباقات الخاصة - استخدم كود الخصم عند طلب التسعير"
        crumbs={[{ name: "العروض" }]}
      />

      <section className="py-6 bg-gradient-to-l from-accent/10 to-primary/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
            <Flame className="h-8 w-8 text-accent" />
            <div>
              <p className="font-display font-bold text-lg">عروض لفترة محدودة!</p>
              <p className="text-sm text-muted-foreground">استخدم الكود عند طلب التسعير للاستفادة من الخصم</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {OFFERS.map((offer) => {
              const Icon = iconMap[offer.icon];
              return (
                <div
                  key={offer.id}
                  className={`relative overflow-hidden rounded-2xl border bg-card shadow-sm transition-all hover:shadow-xl ${
                    offer.highlight ? "border-accent ring-2 ring-accent/20 lg:scale-105" : "border-border"
                  }`}
                >
                  <div className={`h-2 bg-gradient-to-l ${offer.color}`} />

                  {offer.highlight && (
                    <div className="absolute top-4 left-4 z-10">
                      <span className="flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground shadow-md">
                        <Flame className="h-3 w-3" />
                        الأكثر طلباً
                      </span>
                    </div>
                  )}

                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${offer.color} text-white shadow-lg`}>
                        <Icon className="h-7 w-7" />
                      </div>
                      <div className="text-left">
                        <p className="text-xs text-muted-foreground">خصم</p>
                        <p className="font-display text-2xl font-extrabold text-primary">{offer.discount}</p>
                      </div>
                    </div>

                    <h3 className="font-display font-bold text-lg mb-2">{offer.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{offer.description}</p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {offer.services.map((s, i) => (
                        <span key={i} className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold text-muted-foreground">
                          {s}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4">
                      <Clock className="h-3.5 w-3.5" />
                      صالح حتى {new Intl.DateTimeFormat("ar-SA", { year: "numeric", month: "long", day: "numeric" }).format(new Date(offer.validUntil))}
                    </div>

                    <CopyCoupon code={offer.code} />

                    <Link
                      href={`/quote?coupon=${offer.code}`}
                      className="mt-4 flex items-center justify-center gap-2 w-full rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground hover:brightness-110 transition"
                    >
                      استخدم هذا العرض
                      <ArrowLeft className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-16 max-w-3xl mx-auto rounded-2xl border border-border bg-secondary/40 p-6 lg:p-8">
            <h2 className="font-display text-xl font-bold mb-6 text-center">كيف تستفيد من العروض؟</h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { step: "1", title: "اختر العرض", desc: "تصفّح العروض واختر الأنسب لك" },
                { step: "2", title: "اطلب التسعير", desc: "املأ النموذج وأدخل كود الخصم" },
                { step: "3", title: "وفّر المال", desc: "استمتع بالخصم على مشروعك" },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-full bg-primary text-primary-foreground font-display font-bold text-lg mb-3">
                    {s.step}
                  </div>
                  <h3 className="font-bold text-sm mb-1">{s.title}</h3>
                  <p className="text-xs text-muted-foreground">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 max-w-3xl mx-auto rounded-xl border border-dashed border-border p-5 text-sm text-muted-foreground">
            <p className="font-bold text-foreground mb-2">📝 شروط الاستخدام:</p>
            <ul className="space-y-1 text-xs">
              <li>• العروض لا يمكن دمجها مع بعضها (عرض واحد لكل مشروع)</li>
              <li>• العروض سارية على المشاريع الجديدة فقط</li>
              <li>• يجب ذكر كود الخصم عند طلب التسعير</li>
              <li>• تحتفظ الشركة بحق تعديل أو إلغاء العروض في أي وقت</li>
            </ul>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground mb-3">هل لديك سؤال عن العروض؟</p>
            <a
              href={`tel:${settings.phone}`}
              className="inline-flex items-center gap-2 rounded-xl border-2 border-primary px-6 py-3 text-sm font-bold text-primary hover:bg-primary hover:text-primary-foreground transition"
            >
              <Phone className="h-4 w-4" />
              <span dir="ltr">{settings.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </section>

      <CtaQuoteSection />
    </>
  );
}
