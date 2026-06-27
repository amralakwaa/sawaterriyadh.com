import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, Award, Users, Briefcase, ArrowLeft, Linkedin } from "lucide-react";
import { getSettings } from "@/lib/data";
import { PageHeader } from "@/components/site/page-header";
import { CtaQuoteSection } from "@/components/sections/cta-quote";

export const metadata: Metadata = {
  title: "فريق العمل | خبراء المظلات والحدادة - الرياض",
  description:
    "تعرف على فريق شركة الظلال الملكية من المهندسين والفنيين المتخصصين في المظلات والسواتر وأعمال الحدادة في الرياض. خبرة وكفاءة في خدمتك.",
  alternates: { canonical: "/team" },
};

interface Member {
  name: string;
  role: string;
  bio: string;
  experience: string;
  specialties: string[];
  initials: string;
  color: string;
}

const TEAM: Member[] = [
  {
    name: "م. عبدالله الشمري",
    role: "المدير العام والمؤسس",
    bio: "مهندس مدني بخبرة 20+ سنة في صناعة المظلات والمنشآت المعدنية. مؤسس الشركة وموجه جميع المشاريع.",
    experience: "+20 سنة",
    specialties: ["إدارة المشاريع", "تصميم إنشائي", "استشارات هندسية"],
    initials: "ع",
    color: "from-emerald-600 to-teal-600",
  },
  {
    name: "م. سعد القحطاني",
    role: "مدير العمليات",
    bio: "يشرف على جميع فرق التركيب والتنفيذ. يضمن جودة العمل والالتزام بالمواعيد في كل مشروع.",
    experience: "+15 سنة",
    specialties: ["إدارة مواقع", "مراقبة جودة", "تخطيط"],
    initials: "س",
    color: "from-amber-600 to-orange-600",
  },
  {
    name: "م. نورة الدوسري",
    role: "كبيرة المصممين",
    bio: "مهندسة معمارية متخصصة في تصميم المظلات والواجهات. تحوّل أفكار العملاء إلى تصاميم مذهلة.",
    experience: "+12 سنة",
    specialties: ["تصميم معماري", "3D modeling", "واجهات"],
    initials: "ن",
    color: "from-violet-600 to-purple-600",
  },
  {
    name: "م. فهد العتيبي",
    role: "خبير الحدادة الفنية",
    bio: "حرفي ماهر في أعمال الحدادة الفنية والديكورية. خبرة واسعة في البوابات والدراج والمشربيات.",
    experience: "+18 سنة",
    specialties: ["حدادة فنية", "بوابات أوتوماتيكية", "دراج"],
    initials: "ف",
    color: "from-blue-600 to-cyan-600",
  },
  {
    name: "م. خالد المطيري",
    role: "مدير الجودة والضمان",
    bio: "مسؤول عن فحص جميع المشاريع قبل التسليم وضمان مطابقتها للمعايير. يدير برنامج الضمان.",
    experience: "+10 سنوات",
    specialties: ["مراقبة جودة", "اختبارات", "إدارة ضمان"],
    initials: "خ",
    color: "from-rose-600 to-pink-600",
  },
  {
    name: "أ. مها السبيعي",
    role: "مديرة خدمة العملاء",
    bio: "تقود فريق خدمة العملاء لضمان رضا تام لكل عميل. نقطتك الأولى للتواصل والاستفسار.",
    experience: "+8 سنوات",
    specialties: ["خدمة عملاء", "إدارة علاقات", "متابعة"],
    initials: "م",
    color: "from-indigo-600 to-blue-600",
  },
];

const VALUES = [
  { icon: Award, title: "الخبرة", desc: "فريق بخبرة تزيد عن 15 سنة" },
  { icon: Users, title: "التعاون", desc: "عمل جماعي لتحقيق أفضل النتائج" },
  { icon: Briefcase, title: "الاحترافية", desc: "التزام كامل بالمعايير" },
];

export default async function TeamPage() {
  const settings = await getSettings();

  return (
    <>
      <PageHeader
        title="فريق العمل"
        subtitle="نخبة من المهندسين والفنيين المتخصصين، يجمعهم شغف تقديم أفضل خدمة لعملائنا في الرياض"
        crumbs={[{ name: "فريق العمل" }]}
      />

      {/* Values strip */}
      <section className="py-8 bg-secondary/40 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {VALUES.map((v, i) => (
              <div key={i} className="flex items-center gap-3 justify-center sm:justify-start">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
                  <v.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-bold text-sm">{v.title}</p>
                  <p className="text-xs text-muted-foreground">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team grid */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEAM.map((member, i) => (
              <div
                key={i}
                className="group rounded-2xl border border-border bg-card overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                {/* Header with gradient */}
                <div className={`relative h-24 bg-gradient-to-br ${member.color}`}>
                  <div className="absolute inset-0 bg-grid-pattern opacity-20" />
                </div>

                {/* Avatar */}
                <div className="px-6 -mt-12">
                  <div className={`flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br ${member.color} text-white font-display text-4xl font-extrabold shadow-lg border-4 border-card`}>
                    {member.initials}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 pt-4">
                  <h3 className="font-display font-bold text-lg">{member.name}</h3>
                  <p className="text-sm text-primary font-semibold mt-0.5">{member.role}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Award className="h-3.5 w-3.5 text-accent" />
                    <span className="text-xs text-muted-foreground">خبرة {member.experience}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{member.bio}</p>

                  {/* Specialties */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {member.specialties.map((sp, j) => (
                      <span key={j} className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold text-muted-foreground">
                        {sp}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Join us CTA */}
          <div className="mt-16 max-w-3xl mx-auto rounded-2xl bg-gradient-to-br from-primary to-accent text-background p-8 text-center">
            <h2 className="font-display text-2xl font-bold mb-3">هل تريد الانضمام لفريقنا؟</h2>
            <p className="text-background/80 text-sm mb-6 max-w-xl mx-auto">
              نبحث دائماً عن المواهب الجديدة من المهندسين والفنيين للانضمام لفريقنا المتنامي. أرسل سيرتك الذاتية.
            </p>
            <a
              href={`mailto:${settings.email}?subject=طلب انضمام للفريق`}
              className="inline-flex items-center gap-2 rounded-xl bg-background px-6 py-3 text-sm font-bold text-primary hover:scale-105 transition"
            >
              <Mail className="h-4 w-4" />
              أرسل سيرتك الذاتية
            </a>
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { value: "+50", label: "عضو في الفريق" },
              { value: "+15", label: "سنة خبرة" },
              { value: "+3500", label: "مشروع منجز" },
              { value: "98%", label: "نسبة رضا الموظفين" },
            ].map((s, i) => (
              <div key={i} className="text-center rounded-2xl bg-secondary/40 p-5">
                <p className="font-display text-3xl font-extrabold text-primary">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaQuoteSection />
    </>
  );
}
