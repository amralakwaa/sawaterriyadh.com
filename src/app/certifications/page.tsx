import type { Metadata } from "next";
import Link from "next/link";
import { Award, BadgeCheck, ShieldCheck, Building2, FileCheck, Star, Trophy, ChevronLeft, Phone, Download } from "lucide-react";
import { getSettings } from "@/lib/data";
import { PageHeader } from "@/components/site/page-header";
import { CtaQuoteSection } from "@/components/sections/cta-quote";

export const metadata: Metadata = {
  title: "الشهادات والاعتمادات | شركة الظلال الملكية - الرياض",
  description:
    "شهادات واعتمادات شركة الظلال الملكية: معتمدون من الدفاع المدني، الهيئة السعودية للمواصفات (SASO)، غرفة الرياض. جودة موثّقة وضمان معتمد.",
  alternates: { canonical: "/certifications" },
};

interface Cert {
  name: string;
  issuer: string;
  number: string;
  desc: string;
  icon: React.ElementType;
  color: string;
}

const CERTIFICATIONS: Cert[] = [
  {
    name: "اعتماد الدفاع المدني",
    issuer: "المديرية العامة للدفاع المدني",
    number: "DC-RIY-2024-1234",
    desc: "معتمدون لتوريد وتركيب المنشآت المعدنية والمظلات وفق اشتراطات السلامة المعتمدة في المملكة.",
    icon: ShieldCheck,
    color: "from-red-600 to-rose-600",
  },
  {
    name: "شهادة SASO",
    issuer: "الهيئة السعودية للمواصفات",
    number: "SASO-2024-5678",
    desc: "موادنا ومنتجاتنا مطابقة للمواصفات السعودية القياسية وجودة المنتج.",
    icon: BadgeCheck,
    color: "from-emerald-600 to-teal-600",
  },
  {
    name: "عضوية غرفة الرياض",
    issuer: "غرفة الرياض",
    number: "RC-7890",
    desc: "عضو معتمد في غرفة الرياض، مسجل تجارياً وملتزم بالأنظمة التجارية.",
    icon: Building2,
    color: "from-blue-600 to-cyan-600",
  },
  {
    name: "شهادة الجودة ISO 9001",
    issuer: "منظمة ISO العالمية",
    number: "ISO-9001-2024",
    desc: "نظام إدارة جودة معتمد دولياً، يضمن تقديم خدمات بأعلى معايير الجودة.",
    icon: Award,
    color: "from-violet-600 to-purple-600",
  },
  {
    name: "سجل منشآت",
    issuer: "وزارة الإسكان",
    number: "MOMRAH-4567",
    desc: "مسجلون في منصة إعداد لمنشآت المملكة، تصنيف مقاولين معتمد.",
    icon: FileCheck,
    color: "from-amber-600 to-orange-600",
  },
  {
    name: "اعتماد الزكاة والضريبة",
    issuer: "هيئة الزكاة والضريبة",
    number: "VAT-300123456700003",
    desc: "مسجلون في ضريبة القيمة المضافة، فواتير ضريبية معتمدة.",
    icon: FileCheck,
    color: "from-slate-600 to-gray-600",
  },
];

const AWARDS = [
  { year: "2024", title: "أفضل شركة مظلات في الرياض", org: "جائزة التميز السعودي", icon: Trophy },
  { year: "2023", title: "الوصول لـ 3000 مشروع منجز", org: "إنجاز داخلي", icon: Star },
  { year: "2022", title: "شهادة تقدير من غرفة الرياض", org: "غرفة الرياض", icon: Award },
  { year: "2021", title: "أفضل خدمة عملاء في القطاع", org: "استبيان العملاء", icon: Star },
  { year: "2020", title: "تخطي 2000 مشروع منجز", org: "إنجاز داخلي", icon: Star },
  { year: "2019", title: "اعتماد الدفاع المدني للمرة الأولى", org: "الدفاع المدني", icon: ShieldCheck },
];

const COMPLIANCE = [
  { title: "أنظمة السلامة", desc: "نلتزم بجميع اشتراطات السلامة في مواقع العمل", icon: ShieldCheck },
  { title: "بيئة العمل", desc: "بيئة عمل آمنة وصحية لجميع موظفينا", icon: BadgeCheck },
  { title: "حماية البيئة", desc: "نستخدم مواد صديقة للبيئة ونلتزم بمعايير النفايات", icon: Award },
  { title: "حقوق العمال", desc: "نحترم حقوق عمالنا ونلتزم بأنظمة العمل السعودي", icon: FileCheck },
];

export default async function CertificationsPage() {
  const settings = await getSettings();

  return (
    <>
      <PageHeader
        title="الشهادات والاعتمادات"
        subtitle="نفتخر باعتماداتنا الرسمية وشهادات الجودة التي نلتزم بها لضمان أعلى معايير الخدمة"
        crumbs={[{ name: "الشهادات" }]}
      />

      {/* Trust stats */}
      <section className="py-8 bg-gradient-to-l from-primary/10 to-accent/10 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { value: "6+", label: "شهادات معتمدة", icon: Award },
              { value: "15+", label: "سنة خبرة", icon: Star },
              { value: "3500+", label: "مشروع منجز", icon: Trophy },
              { value: "100%", label: "مطابقة المواصفات", icon: BadgeCheck },
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

      {/* Certifications grid */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="font-display text-2xl lg:text-3xl font-bold">شهاداتنا الرسمية</h2>
            <p className="text-muted-foreground mt-2">اعتمادات معترف بها من الجهات الرسمية في المملكة</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CERTIFICATIONS.map((cert, i) => (
              <div
                key={i}
                className="group rounded-2xl border border-border bg-card overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                {/* Top color band */}
                <div className={`h-2 bg-gradient-to-l ${cert.color}`} />
                <div className="p-6">
                  {/* Icon + name */}
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${cert.color} text-white shadow-lg shrink-0`}>
                      <cert.icon className="h-6 w-6" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-display font-bold text-base leading-tight">{cert.name}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">{cert.issuer}</p>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{cert.desc}</p>

                  {/* Certificate number */}
                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <span className="text-xs text-muted-foreground">رقم الشهادة:</span>
                    <span className="text-xs font-mono font-bold text-foreground" dir="ltr">{cert.number}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Note */}
          <div className="mt-8 max-w-3xl mx-auto rounded-xl border border-dashed border-border p-4 flex items-start gap-3">
            <BadgeCheck className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              جميع شهاداتنا حديثة ومحدّثة. يمكن التحقق من صحتها عبر التواصل المباشر مع الجهات المُصدِرة أو طلب نسخ أصلية من فريقنا.
            </p>
          </div>
        </div>
      </section>

      {/* Awards timeline */}
      <section className="py-12 lg:py-16 bg-secondary/40">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="font-display text-2xl lg:text-3xl font-bold">إنجازاتنا وجوائزنا</h2>
            <p className="text-muted-foreground mt-2">رحلة من النجاحات على مدار سنوات</p>
          </div>

          <div className="max-w-3xl mx-auto relative">
            {/* Timeline line */}
            <div className="absolute top-0 bottom-0 right-6 w-0.5 bg-border hidden sm:block" />

            <div className="space-y-6">
              {AWARDS.map((award, i) => (
                <div key={i} className="relative sm:pr-16">
                  {/* Dot */}
                  <div className="absolute right-0 top-2 hidden sm:flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-background shadow-lg z-10">
                    <award.icon className="h-5 w-5" />
                  </div>

                  <div className="rounded-2xl border border-border bg-card p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <div className="min-w-0">
                        <h3 className="font-bold text-base">{award.title}</h3>
                        <p className="text-sm text-muted-foreground mt-0.5">{award.org}</p>
                      </div>
                      <span className="rounded-full bg-accent/15 px-3 py-1 text-xs font-bold text-accent shrink-0">
                        {award.year}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Compliance section */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="font-display text-2xl lg:text-3xl font-bold">التزاماتنا</h2>
            <p className="text-muted-foreground mt-2">نلتزم بأعلى معايير المسؤولية المؤسسية</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {COMPLIANCE.map((item, i) => (
              <div key={i} className="rounded-2xl border border-border bg-card p-5 text-center hover:border-primary/40 hover:shadow-md transition-all">
                <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-xl bg-primary/10 text-primary mb-3">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-sm mb-1">{item.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="rounded-2xl bg-gradient-to-br from-primary to-accent text-background p-8 lg:p-12 text-center max-w-3xl mx-auto">
            <ShieldCheck className="h-12 w-12 mx-auto mb-4" />
            <h2 className="font-display text-2xl lg:text-3xl font-bold mb-3">
              اطلب نسخ من شهاداتنا
            </h2>
            <p className="text-background/80 text-sm mb-6 max-w-xl mx-auto">
              نوفّر نسخاً من جميع شهاداتنا واعتماداتنا لعملائنا الكرام عند الطلب.
              تواصل معنا للحصول على الوثائق الرسمية.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href={`tel:${settings.phone}`}
                className="inline-flex items-center gap-2 rounded-xl bg-background px-6 py-3 text-sm font-bold text-primary hover:scale-105 transition"
              >
                <Phone className="h-4 w-4" />
                <span dir="ltr">{settings.phoneDisplay}</span>
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-foreground px-6 py-3 text-sm font-bold text-background hover:scale-105 transition"
              >
                <Download className="h-4 w-4" />
                طلب الوثائق
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaQuoteSection />
    </>
  );
}
