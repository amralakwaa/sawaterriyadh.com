import type { Metadata } from "next";
import Link from "next/link";
import { Check, X, Minus, ArrowLeft, Phone, Award, TrendingUp, Shield } from "lucide-react";
import { getSettings } from "@/lib/data";
import { PageHeader } from "@/components/site/page-header";
import { CtaQuoteSection } from "@/components/sections/cta-quote";

export const metadata: Metadata = {
  title: "مقارنة أنواع المظلات | أيهما الأنسب لك؟ - الرياض",
  description:
    "دليل شامل لمقارنة أنواع مظلات السيارات والحدائق في الرياض: معدنية، قماش PVC، خشبية، شرائح ألمونيوم. قارن الأسعار والمميزات والعمر الافتراضي لاختيار الأنسب.",
  alternates: { canonical: "/compare" },
};

interface ShadeType {
  id: string;
  name: string;
  icon: string;
  image: string;
  priceRange: string;
  pricePerM2: number;
  lifespan: string;
  heatReduction: string;
  maintenance: string;
  best: string;
  pros: string[];
  cons: string[];
  recommended: boolean;
}

const SHADE_TYPES: ShadeType[] = [
  {
    id: "metal",
    name: "مظلات معدنية (شرائح ألمونيوم)",
    icon: "shield",
    image: "https://sfile.chatglm.cn/images-ppt/304f69241716.jpg",
    priceRange: "150 - 250 ريال/م²",
    pricePerM2: 200,
    lifespan: "20+ سنة",
    heatReduction: "85%",
    maintenance: "منخفضة",
    best: "المواقف المكشوفة والفلل",
    pros: [
      "عمر افتراضي طويل جداً (20+ سنة)",
      "مقاومة عالية للرياح حتى 120 كم/س",
      "عزل حراري ممتاز (يخفض 15°م)",
      "لا تتأثر بالأشعة فوق البنفسجية",
      "صيانة قليلة جداً",
      "متوفرة بألوان متعددة",
    ],
    cons: [
      "تكلفة أولية أعلى من القماش",
      "أثقل وزناً يتطلب هيكل قوي",
      "تصميم أقل مرونة من القماش",
    ],
    recommended: true,
  },
  {
    id: "pvc",
    name: "مظلات قماش PVC",
    icon: "waves",
    image: "https://sfile.chatglm.cn/images-ppt/bb3a11d7cd43.jpg",
    priceRange: "120 - 180 ريال/م²",
    pricePerM2: 150,
    lifespan: "8 - 12 سنة",
    heatReduction: "70%",
    maintenance: "متوسطة",
    best: "الميزانية المحدودة والاستخدام المؤقت",
    pros: [
      "أسعار اقتصادية",
      "خفيفة الوزن لا تتطلب هيكل ثقيل",
      "تنوع كبير في الألوان والتصاميم",
      "تركيب سريع (يوم واحد)",
      "قابلة للفك وإعادة التركيب",
    ],
    cons: [
      "عمر افتراضي أقصر (8-12 سنة)",
      "تتأثر بالأشعة فوق البنفسجية مع الوقت",
      "تحتاج صيانة دورية",
      "أقل عزلاً حرارياً من المعدن",
    ],
    recommended: false,
  },
  {
    id: "wood",
    name: "مظلات خشبية",
    icon: "trees",
    image: "https://sfile.chatglm.cn/images-ppt/e70dcab5e59b.jpg",
    priceRange: "200 - 350 ريال/م²",
    pricePerM2: 275,
    lifespan: "12 - 18 سنة",
    heatReduction: "75%",
    maintenance: "عالية",
    best: "الحدائق والاستراحات",
    pros: [
      "مظهر جمالي طبيعي ودافئ",
      "مناسبة للحدائق والاستراحات",
      "قابلة للطلب بأي لون",
      "إضافة قيمة جمالية للمكان",
    ],
    cons: [
      "تحتاج صيانة دورية (دهان، حماية)",
      "قابلية للحشرات والرطوبة إن لم يُعالج",
      "أثقل وأغلى من البدائل",
      "ليست مناسبة للمواقف المكشوفة",
    ],
    recommended: false,
  },
  {
    id: "smart",
    name: "مظلات شرائح متحركة (سمارت)",
    icon: "settings",
    image: "https://sfile.chatglm.cn/images-ppt/9a2a1e0c0302.png",
    priceRange: "300 - 500 ريال/م²",
    pricePerM2: 400,
    lifespan: "25+ سنة",
    heatReduction: "95%",
    maintenance: "منخفضة",
    best: "الفلل الفاخرة والقصور",
    pros: [
      "تحكم كامل في الإضاءة والتهوية",
      "أحدث تقنية في عالم المظلات",
      "عمر افتراضي ممتاز (25+ سنة)",
      "مظهر معماري فاخر",
      "يمكن تشغيلها بالريموت أو تطبيق",
    ],
    cons: [
      "الأغلى ثمناً",
      "تحتاج مصدر طاقة (كهرباء)",
      "صيانة متخصصة عند الأعطال",
    ],
    recommended: true,
  },
];

const COMPARISON_ROWS = [
  { label: "السعر التقريبي", key: "priceRange", type: "text" },
  { label: "العمر الافتراضي", key: "lifespan", type: "rating" },
  { label: "كفاءة العزل الحراري", key: "heatReduction", type: "rating" },
  { label: "مستوى الصيانة", key: "maintenance", type: "badge" },
  { label: "الأنسب لـ", key: "best", type: "text" },
];

function MaintenanceBadge({ level }: { level: string }) {
  const map: Record<string, { class: string; label: string }> = {
    "منخفضة": { class: "bg-green-100 text-green-700", label: "منخفضة" },
    "متوسطة": { class: "bg-amber-100 text-amber-700", label: "متوسطة" },
    "عالية": { class: "bg-red-100 text-red-700", label: "عالية" },
  };
  const s = map[level] || { class: "bg-secondary", label: level };
  return <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${s.class}`}>{s.label}</span>;
}

function RatingBar({ value }: { value: string }) {
  const num = parseInt(value);
  const percent = isNaN(num) ? 0 : num;
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2 rounded-full bg-secondary overflow-hidden min-w-[60px]">
        <div
          className="h-full bg-gradient-to-l from-primary to-accent rounded-full transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className="text-xs font-bold text-foreground shrink-0">{value}</span>
    </div>
  );
}

export default async function ComparePage() {
  const settings = await getSettings();

  return (
    <>
      <PageHeader
        title="مقارنة أنواع المظلات"
        subtitle="دليلك الشامل لاختيار نوع المظلة الأنسب لاحتياجاتك وميزانيتك - قارن الأسعار والمميزات والعمر الافتراضي"
        crumbs={[{ name: "مقارنة المظلات" }]}
      />

      {/* Quick stats */}
      <section className="py-8 bg-secondary/40 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Award, value: "4", label: "أنواع للمقارنة" },
              { icon: TrendingUp, value: "+3500", label: "مشروع منجز" },
              { icon: Shield, value: "15 سنة", label: "ضمان موثّق" },
              { icon: Phone, value: "0501234567", label: "استشارة مجانية" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <s.icon className="h-7 w-7 mx-auto text-primary mb-2" />
                <p className="font-display text-xl font-extrabold text-primary">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison table - desktop */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-2xl font-bold mb-6 text-center">جدول المقارنة التفصيلي</h2>

          {/* Cards view (mobile + desktop) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {SHADE_TYPES.map((type) => (
              <div
                key={type.id}
                className={`relative rounded-2xl border-2 bg-card overflow-hidden transition-all hover:shadow-xl ${
                  type.recommended ? "border-accent ring-2 ring-accent/20" : "border-border"
                }`}
              >
                {type.recommended && (
                  <div className="absolute top-0 inset-x-0 bg-accent text-accent-foreground text-center py-1.5 text-xs font-bold">
                    ⭐ الأكثر طلباً
                  </div>
                )}
                <div className={`relative h-36 overflow-hidden ${type.recommended ? "mt-7" : ""}`}>
                  <img src={type.image} alt={type.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="p-4">
                  <h3 className="font-display font-bold text-base mb-2">{type.name}</h3>
                  <p className="text-xs text-muted-foreground mb-3">{type.best}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">السعر:</span>
                      <span className="font-bold text-primary">{type.priceRange}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">العمر:</span>
                      <span className="font-bold">{type.lifespan}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">العزل:</span>
                      <span className="font-bold">{type.heatReduction}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Detailed comparison table */}
          <div className="overflow-x-auto rounded-2xl border border-border">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="bg-foreground text-background">
                  <th className="text-right p-4 text-sm font-bold sticky right-0 bg-foreground">المعيار</th>
                  {SHADE_TYPES.map((t) => (
                    <th key={t.id} className={`text-center p-4 text-sm font-bold ${t.recommended ? "bg-accent text-accent-foreground" : ""}`}>
                      {t.name}
                      {t.recommended && <div className="text-[10px] mt-0.5 opacity-90">⭐ موصى به</div>}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row, i) => (
                  <tr key={row.key} className={i % 2 === 0 ? "bg-card" : "bg-secondary/30"}>
                    <td className="p-4 font-bold text-sm sticky right-0 bg-inherit">{row.label}</td>
                    {SHADE_TYPES.map((t) => (
                      <td key={t.id} className="p-4 text-center text-sm">
                        {row.type === "badge" ? (
                          <MaintenanceBadge level={(t as any)[row.key]} />
                        ) : row.type === "rating" ? (
                          <RatingBar value={(t as any)[row.key]} />
                        ) : (
                          <span className="text-foreground/90">{(t as any)[row.key]}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pros & Cons */}
          <div className="mt-12">
            <h2 className="font-display text-2xl font-bold mb-6 text-center">المميزات والعيوب</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {SHADE_TYPES.map((type) => (
                <div key={type.id} className="rounded-2xl border border-border bg-card overflow-hidden">
                  <div className="bg-secondary/50 p-4 border-b border-border">
                    <h3 className="font-display font-bold text-sm">{type.name}</h3>
                  </div>
                  <div className="p-4 space-y-4">
                    <div>
                      <p className="text-xs font-bold text-green-700 mb-2 flex items-center gap-1">
                        <Check className="h-3.5 w-3.5" />
                        المميزات
                      </p>
                      <ul className="space-y-1.5">
                        {type.pros.map((p, i) => (
                          <li key={i} className="text-xs text-muted-foreground flex items-start gap-1.5">
                            <Check className="h-3 w-3 text-green-600 shrink-0 mt-0.5" />
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-red-700 mb-2 flex items-center gap-1">
                        <X className="h-3.5 w-3.5" />
                        العيوب
                      </p>
                      <ul className="space-y-1.5">
                        {type.cons.map((c, i) => (
                          <li key={i} className="text-xs text-muted-foreground flex items-start gap-1.5">
                            <Minus className="h-3 w-3 text-red-500 shrink-0 mt-0.5" />
                            {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendation */}
          <div className="mt-12 rounded-2xl bg-gradient-to-br from-primary to-accent text-background p-8 text-center">
            <h2 className="font-display text-2xl font-bold mb-3">غير متأكد أي نوع يناسبك؟</h2>
            <p className="text-background/80 text-sm mb-6 max-w-2xl mx-auto">
              فريقنا المتخصص جاهز لمساعدتك في اختيار النوع الأنسب لاحتياجاتك وميزانيتك.
              احصل على استشارة مجانية ومعاينة ميدانية من خبرائنا.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/quote"
                className="inline-flex items-center gap-2 rounded-xl bg-background px-6 py-3 text-sm font-bold text-primary hover:scale-105 transition"
              >
                استشارة مجانية
                <ArrowLeft className="h-4 w-4" />
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
