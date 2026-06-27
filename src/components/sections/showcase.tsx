import Link from "next/link";
import { Play, Wrench, ShieldCheck, Truck, Award } from "lucide-react";
import { SectionHeading } from "./section-heading";

const STEPS = [
  {
    icon: Truck,
    title: "المعاينة والقياس",
    desc: "نأتي إلى موقعك مجاناً، نأخذ القياسات الدقيقة ونناقش احتياجاتك",
    duration: "يوم 1",
  },
  {
    icon: Wrench,
    title: "التصنيع والتحضير",
    desc: "نصنع المظلة في مصنعنا بأحدث المعدات وفق المواصفات المعتمدة",
    duration: "2-5 أيام",
  },
  {
    icon: Play,
    title: "التركيب والتنفيذ",
    desc: "فريقنا المحترف يركّب المظلة بدقة وسرعة مع الالتزام بالمعايير",
    duration: "1-2 يوم",
  },
  {
    icon: ShieldCheck,
    title: "الفحص والضمان",
    desc: "نفحص العمل النهائي ونسلّم شهادة الضمان مع شرح الصيانة",
    duration: "يوم التسليم",
  },
];

export function ShowCaseSection() {
  return (
    <section className="py-16 lg:py-24 bg-foreground text-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
      <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />

      <div className="relative container mx-auto px-4">
        <SectionHeading
          eyebrow="شاهد كيف نعمل"
          title="من الفكرة إلى التنفيذ في 4 خطوات"
          subtitle="عملية واضحة وشفافة من أول تواصل حتى التسليم النهائي - نضمن لك تجربة سلسة واحترافية"
        />

        {/* Video showcase mock */}
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="relative aspect-video rounded-2xl overflow-hidden border border-background/20 shadow-2xl group">
            {/* Background image */}
            <img
              src="https://sfile.chatglm.cn/images-ppt/304f69241716.jpg"
              alt="شاهد كيف نعمل - شركة الظلال الملكية"
              className="w-full h-full object-cover"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            {/* Play button */}
            <button
              className="absolute inset-0 flex items-center justify-center"
              aria-label="شاهد الفيديو"
            >
              <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-2xl hover:scale-110 transition-transform">
                <span className="absolute inset-0 rounded-full bg-accent animate-ping opacity-30" />
                <Play className="h-9 w-9 fill-current" />
              </span>
            </button>

            {/* Caption */}
            <div className="absolute bottom-0 right-0 left-0 p-6 text-background">
              <p className="font-display font-bold text-lg">رحلة إنجاز مشروع مظلة سيارات</p>
              <p className="text-sm text-background/80 mt-1">
                شاهد كيف نحوّل فكرتك إلى واقع - من المعاينة إلى التسليم
              </p>
            </div>
          </div>
        </div>

        {/* Steps timeline */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, i) => (
            <div key={i} className="relative">
              {/* Connecting line */}
              {i < STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-8 -left-6 w-12 h-0.5 bg-gradient-to-l from-accent/50 to-transparent" />
              )}
              <div className="text-center">
                <div className="relative inline-flex">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-background shadow-lg">
                    <step.icon className="h-8 w-8" />
                  </div>
                  <span className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-accent text-accent-foreground text-xs font-bold shadow-md border-2 border-foreground">
                    {i + 1}
                  </span>
                </div>
                <p className="text-xs text-accent font-bold mt-3">{step.duration}</p>
                <h3 className="font-display font-bold text-base mt-1">{step.title}</h3>
                <p className="text-sm text-background/70 mt-2 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/quote"
            className="inline-flex items-center gap-2 rounded-xl bg-accent text-accent-foreground px-8 py-4 text-base font-bold shadow-xl hover:scale-105 transition-transform"
          >
            <Award className="h-5 w-5" />
            ابدأ مشروعك معنا الآن
          </Link>
          <p className="text-xs text-background/60 mt-3">
            💡 معاينة مجانية • عرض سعر خلال 24 ساعة • ضمان حتى 15 سنة
          </p>
        </div>
      </div>
    </section>
  );
}
