import type { Metadata } from "next";
import Link from "next/link";
import { Gift, Star, Award, TrendingUp, Users, ChevronLeft, Check, Crown, Medal, Bronze, Phone } from "lucide-react";
import { getSettings } from "@/lib/data";
import { PageHeader } from "@/components/site/page-header";
import { CtaQuoteSection } from "@/components/sections/cta-quote";

export const metadata: Metadata = {
  title: "برنامج الولاء والمكافآت | الظلال الملكية - الرياض",
  description:
    "انضم لبرنامج ولاء الظلال الملكية: اكسب نقاط مع كل مشروع، استبدلها بخصومات وخدمات مجانية. كلما زاد تعاملك معنا، زادت مكافآتك.",
  alternates: { canonical: "/loyalty" },
};

const TIERS = [
  {
    name: "العضو البرونزي",
    icon: Medal,
    color: "from-amber-700 to-yellow-700",
    bgColor: "bg-amber-50",
    minPoints: 0,
    perks: [
      "نقطة لكل 10 ريال",
      "معاينة مجانية للمشاريع",
      "أولوية في الرد على الاستفسارات",
      "نشرة العروض الحصرية",
    ],
  },
  {
    name: "العضو الفضي",
    icon: Award,
    color: "from-slate-400 to-slate-600",
    bgColor: "bg-slate-50",
    minPoints: 500,
    perks: [
      "1.5 نقطة لكل 10 ريال",
      "خصم 5% على جميع الخدمات",
      "صيانة مجانية لمدة سنتين",
      "أولوية في جدولة المشاريع",
      "استشارة هندسية مجانية",
    ],
    popular: true,
  },
  {
    name: "العضو الذهبي",
    icon: Crown,
    color: "from-amber-500 to-yellow-500",
    bgColor: "bg-amber-50",
    minPoints: 1500,
    perks: [
      "2 نقطة لكل 10 ريال",
      "خصم 10% على جميع الخدمات",
      "صيانة مجانية مدى الحياة",
      "أولوية قصوى + خدمة طوارئ 24/7",
      "تصميم 3D مجاني للمشروع",
      "ضمان موسّع +50%",
    ],
  },
];

const WAYS_TO_EARN = [
  { icon: TrendingUp, title: "إكمال مشروع", points: "10 نقاط / 100 ريال", desc: "مع كل مشروع تنفذه معنا" },
  { icon: Users, title: "إحالة صديق", points: "100 نقطة", desc: "عند طلب صديق مشروع بقيمة 5000+ ريال" },
  { icon: Star, title: "كتابة تقييم", points: "50 نقطة", desc: "عند تقييم مشروع منجز" },
  { icon: Gift, title: "عreload الميلاد", points: "200 نقطة", desc: "هدية سنوية بمناسبة ميلادك" },
];

const REWARDS = [
  { points: 100, reward: "خصم 50 ريال", desc: "على مشروعك القادم", icon: "💰" },
  { points: 300, reward: "صيانة مجانية", desc: "صيانة شاملة للمظلة", icon: "🔧" },
  { points: 500, reward: "خصم 250 ريال", desc: "على أي خدمة", icon: "💵" },
  { points: 1000, reward: "إضاءة LED مجانية", desc: "تركيب إضاءة لمشروعك", icon: "💡" },
  { points: 1500, reward: "خصم 1000 ريال", desc: "على المشاريع الكبيرة", icon: "🎁" },
  { points: 2500, reward: "مشروع صغير مجاني", desc: "حتى قيمة 3000 ريال", icon: "🏆" },
];

export default async function LoyaltyPage() {
  const settings = await getSettings();

  return (
    <>
      <PageHeader
        title="برنامج الولاء والمكافآت"
        subtitle="كلما تعاملت معنا أكثر، زادت مكافآتك - اكسب نقاط، استبدلها بخصومات وخدمات مجانية"
        crumbs={[{ name: "برنامج الولاء" }]}
      />

      {/* Hero stats */}
      <section className="py-8 bg-gradient-to-l from-primary/10 to-accent/10 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { value: "+3400", label: "عضو نشط", icon: Users },
              { value: "50K+", label: "نقطة موزّعة", icon: Star },
              { value: "+180K", label: "ريال خصومات", icon: TrendingUp },
              { value: "3", label: "مستويات عضوية", icon: Crown },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <s.icon className="h-7 w-7 mx-auto text-primary mb-2" />
                <p className="font-display text-xl lg:text-2xl font-extrabold text-primary">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tiers */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="font-display text-2xl lg:text-3xl font-bold">مستويات العضوية</h2>
            <p className="text-muted-foreground mt-2">ارتقِ في المستويات واكسب مزايا حصرية</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {TIERS.map((tier, i) => (
              <div
                key={i}
                className={`relative rounded-2xl border-2 bg-card overflow-hidden transition-all hover:shadow-xl ${
                  tier.popular ? "border-primary ring-2 ring-primary/20 lg:scale-105" : "border-border"
                }`}
              >
                {tier.popular && (
                  <div className="absolute top-0 inset-x-0 bg-primary text-primary-foreground text-center py-1.5 text-xs font-bold">
                    ⭐ الأكثر شعبية
                  </div>
                )}
                <div className={`p-6 ${tier.popular ? "pt-9" : ""}`}>
                  {/* Icon + name */}
                  <div className={`flex h-16 w-16 mx-auto items-center justify-center rounded-2xl bg-gradient-to-br ${tier.color} text-white shadow-lg mb-4`}>
                    <tier.icon className="h-8 w-8" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-center">{tier.name}</h3>
                  <p className="text-center text-xs text-muted-foreground mt-1">
                    يبدأ من {tier.minPoints} نقطة
                  </p>

                  {/* Perks */}
                  <ul className="mt-5 space-y-2.5">
                    {tier.perks.map((perk, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm">
                        <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 mt-0.5">
                          <Check className="h-3 w-3 text-primary" />
                        </div>
                        <span className="text-muted-foreground">{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ways to earn */}
      <section className="py-12 lg:py-16 bg-secondary/40">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="font-display text-2xl lg:text-3xl font-bold">كيف تكسب النقاط؟</h2>
            <p className="text-muted-foreground mt-2">طرق متعددة لجمع النقاط</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {WAYS_TO_EARN.map((way, i) => (
              <div key={i} className="rounded-2xl border border-border bg-card p-5 text-center">
                <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-xl bg-primary/10 text-primary mb-3">
                  <way.icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-sm mb-1">{way.title}</h3>
                <p className="font-display text-lg font-extrabold text-accent">{way.points}</p>
                <p className="text-xs text-muted-foreground mt-1">{way.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rewards catalog */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="font-display text-2xl lg:text-3xl font-bold">استبدل نقاطك</h2>
            <p className="text-muted-foreground mt-2">مكافآت متنوعة تناسب جميع النقاط</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {REWARDS.map((reward, i) => (
              <div key={i} className="rounded-2xl border border-border bg-card p-5 flex items-center gap-4 hover:shadow-md transition-all hover:-translate-y-0.5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-secondary text-3xl">
                  {reward.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-sm">{reward.reward}</h3>
                  <p className="text-xs text-muted-foreground">{reward.desc}</p>
                </div>
                <div className="shrink-0 text-left">
                  <p className="font-display text-lg font-extrabold text-primary">{reward.points}</p>
                  <p className="text-[10px] text-muted-foreground">نقطة</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-12 lg:py-16 bg-secondary/40">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="font-display text-2xl lg:text-3xl font-bold">كيف يعمل البرنامج؟</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { step: "1", title: "سجّل", desc: "أنشئ حساباً مجانياً عند أول طلب" },
              { step: "2", title: "اكسب", desc: "اجمع النقاط مع كل مشروع وإحالة" },
              { step: "3", title: "استبدل", desc: "حوّل نقاطك لخصومات وخدمات" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="flex h-14 w-14 mx-auto items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-background font-display font-extrabold text-xl mb-3">
                  {s.step}
                </div>
                <h3 className="font-bold text-base mb-1">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="rounded-2xl bg-gradient-to-br from-primary to-accent text-background p-8 lg:p-12 text-center max-w-3xl mx-auto">
            <Gift className="h-12 w-12 mx-auto mb-4" />
            <h2 className="font-display text-2xl lg:text-3xl font-bold mb-3">
              ابدأ بكسب النقاط اليوم!
            </h2>
            <p className="text-background/80 text-sm mb-6 max-w-xl mx-auto">
              انضم لأكثر من 3400 عميل يستمتعون بمكافآت حصرية. اطلب مشروعك الأول وابدأ بكسب النقاط فوراً.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/quote"
                className="inline-flex items-center gap-2 rounded-xl bg-background px-6 py-3 text-sm font-bold text-primary hover:scale-105 transition"
              >
                اطلب مشروعك الآن
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

          {/* Terms note */}
          <div className="mt-8 max-w-3xl mx-auto rounded-xl border border-dashed border-border p-4 text-xs text-muted-foreground text-center">
            📝 البرنامج مجاني للانضمام. النقاط صالحة لمدة سنة من تاريخ كسبها.
            لا يمكن تحويل النقاط لنقد. تحتفظ الشركة بحق تعديل الشروط في أي وقت.
          </div>
        </div>
      </section>
    </>
  );
}
