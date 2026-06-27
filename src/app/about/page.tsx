import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Target, Eye, Heart, Award, Users, ShieldCheck, Phone, ArrowLeft } from "lucide-react";
import { getSettings, getStats, getFeatures } from "@/lib/data";
import { PageHeader } from "@/components/site/page-header";
import { Icon } from "@/components/site/icon";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { CtaQuoteSection } from "@/components/sections/cta-quote";

export const metadata: Metadata = {
  title: "من نحن | شركة الظلال الملكية - الرياض",
  description:
    "تعرف على شركة الظلال الملكية، الرائدة في المظلات والسواتر وأعمال الحدادة في الرياض منذ 2009. خبرة 15+ سنة، +3500 مشروع منجز، ضمان حتى 15 سنة.",
  alternates: { canonical: "/about" },
};

export default async function AboutPage() {
  const [settings, stats, features] = await Promise.all([getSettings(), getStats(), getFeatures()]);

  const values = [
    { icon: Target, title: "رسالتنا", text: "تقديم حلول ظل وحماية عالية الجودة تلبي احتياجات عملائنا في الرياض، مع الالتزام بأعلى معايير الجودة والاحترافية." },
    { icon: Eye, title: "رؤيتنا", text: "أن نكون الشركة الأولى والمرجع الأول في مجال المظلات والسواتر وأعمال الحدادة في المملكة العربية السعودية." },
    { icon: Heart, title: "قيمنا", text: "الجودة، الصدق، الالتزام، الاحترافية، ورضا العميل. هذه القيم تقود كل قرار نتخذه وكل مشروع ننفذه." },
  ];

  return (
    <>
      <PageHeader
        title="من نحن"
        subtitle="شركة الظلال الملكية - رواد المظلات والسواتر وأعمال الحدادة في الرياض منذ 2009"
        crumbs={[{ name: "من نحن" }]}
      />

      {/* Intro */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block rounded-full bg-accent/15 px-4 py-1.5 text-xs font-bold text-accent mb-4">
                قصتنا
              </span>
              <h2 className="font-display text-3xl font-extrabold mb-5 text-foreground">
                15 سنة من التميز في الرياض
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  تأسست شركة الظلال الملكية في عام {settings.established} كشركة متخصصة في تصميم وتركيب المظلات والسواتر في الرياض.
                  ومنذ ذلك الحين، نمت الشركة لتصبح إحدى الشركات الرائدة في مجالها، مع سجل حافل بأكثر من 3500 مشروع منجز.
                </p>
                <p>
                  نقدم خدماتنا لعملائنا في جميع أحياء الرياض والمناطق المحيطة، بفريق من المهندسين والفنيين المحترفين،
                  وباستخدام أحدث التقنيات وأجود المواد المعتمدة من الهيئة السعودية للمواصفات.
                </p>
                <p>
                  التزامنا بالجودة والاحترافية جعلنا الخيار الأول لآلاف العملاء في الرياض، من أصحاب المنازل إلى كبرى الشركات والمؤسسات.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/quote"
                  className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-bold text-accent-foreground hover:brightness-110 transition"
                >
                  ابدأ مشروعك معنا
                  <ArrowLeft className="h-4 w-4" />
                </Link>
                <a
                  href={`tel:${settings.phone}`}
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-primary px-6 py-3 text-sm font-bold text-primary hover:bg-primary hover:text-primary-foreground transition"
                >
                  <Phone className="h-4 w-4" />
                  <span dir="ltr">{settings.phoneDisplay}</span>
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden h-96 shadow-xl">
                <Image
                  src="https://sfile.chatglm.cn/images-ppt/b8141c3a4f04.jpg"
                  alt="شركة الظلال الملكية - الرياض"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 rounded-2xl bg-primary text-primary-foreground p-6 shadow-xl">
                <p className="text-4xl font-display font-extrabold">{settings.yearsExperience}+</p>
                <p className="text-sm mt-1">سنة من الخبرة</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-secondary/40">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <div key={i} className="text-center rounded-2xl bg-card p-6 border border-border">
                <div className="flex h-14 w-14 mx-auto items-center justify-center rounded-2xl bg-primary/10 text-primary mb-3">
                  <Icon name={s.icon} className="h-7 w-7" />
                </div>
                <p className="text-3xl font-display font-extrabold text-primary">{s.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block rounded-full bg-accent/15 px-4 py-1.5 text-xs font-bold text-accent mb-3">
              قيمنا
            </span>
            <h2 className="font-display text-3xl font-extrabold text-foreground">ما الذي نؤمن به؟</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <div key={i} className="rounded-2xl border border-border bg-card p-8 text-center">
                <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 text-primary mb-4">
                  <v.icon className="h-8 w-8" />
                </div>
                <h3 className="font-display font-bold text-xl mb-3">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-secondary/40">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block rounded-full bg-accent/15 px-4 py-1.5 text-xs font-bold text-accent mb-3">
              لماذا نحن
            </span>
            <h2 className="font-display text-3xl font-extrabold text-foreground">مميزات تجعلنا الخيار الأول</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <div key={i} className="rounded-2xl border border-border bg-card p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
                  <Icon name={f.icon} className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection />
      <CtaQuoteSection />
    </>
  );
}
