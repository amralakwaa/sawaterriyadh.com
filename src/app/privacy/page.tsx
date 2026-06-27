import type { Metadata } from "next";
import Link from "next/link";
import { Shield, Lock, Eye, Database, Mail, Phone, ArrowLeft, CheckCircle2 } from "lucide-react";
import { getSettings } from "@/lib/data";
import { PageHeader } from "@/components/site/page-header";

export const metadata: Metadata = {
  title: "سياسة الخصوصية | شركة الظلال الملكية - الرياض",
  description:
    "سياسة الخصوصية لشركة الظلال الملكية - كيف نجمع ونستخدم ونحمي بياناتك الشخصية عند استخدامك موقعنا وخدماتنا في الرياض.",
  alternates: { canonical: "/privacy" },
};

const SECTIONS = [
  {
    id: "collection",
    icon: Database,
    title: "البيانات التي نجمعها",
    content: `نجمع نوعين من البيانات عند تفاعلك مع موقعنا:

**البيانات التي تقدمها مباشرة:**
- الاسم ورقم الهاتف عند طلب التسعير أو التواصل
- البريد الإلكتروني (اختياري)
- تفاصيل المشروع والموقع
- أي معلومات إضافية تختار مشاركتها

**البيانات المجمعة تلقائياً:**
- عنوان IP ونوع المتصفح
- الصفحات التي تزورها ومدة الزيارة
- بيانات تحليلية لتحسين تجربة المستخدم`,
  },
  {
    id: "usage",
    icon: Eye,
    title: "كيف نستخدم بياناتك",
    content: `نستخدم بياناتك للأغراض التالية:

- **الرد على استفساراتك:** التواصل معك بخصوص طلبات التسعير والاستفسارات
- **تقديم الخدمات:** تنفيذ المشاريع ومتابعتها
- **تحسين خدماتنا:** فهم احتياجات العملاء وتطوير خدماتنا
- **التواصل التسويقي:** إرسال عروض وتحديثات (فقط بموافقتك)
- **الامتثال القانوني:** الالتزام بالمتطلبات النظامية في المملكة العربية السعودية`,
  },
  {
    id: "protection",
    icon: Lock,
    title: "حماية بياناتك",
    content: `نلتزم بحماية بياناتك الشخصية من خلال:

- **تشفير البيانات:** استخدام بروتوكولات HTTPS و SSL لتشفير البيانات أثناء النقل
- **تخزين آمن:** قواعد بيانات محمية بكلمات مرور قوية وجدران حماية
- **وصول محدود:** فقط الموظفون المصرح لهم يمكنهم الوصول لبياناتك
- **نسخ احتياطية:** نسخ احتياطية منتظمة لمنع فقدان البيانات
- **مراجعة دورية:** مراجعة سياسات الأمان بشكل منتظم

ضمن نظام حماية البيانات الشخصية في المملكة (PDPL)، نحافظ على سرية معلوماتك.`,
  },
  {
    id: "sharing",
    icon: Shield,
    title: "مشاركة البيانات",
    content: `لا نبيع بياناتك الشخصية لأي طرف ثالث. قد نشاركها فقط في الحالات التالية:

- **مع مقاولي الباطن:** شركاء موثوقون يساعدوننا في تقديم الخدمة (مع التزامهم بسرية البيانات)
- **لأسباب قانونية:** عند الطلب من الجهات القانونية المختصة
- **حماية الحقوق:** لحماية حقوقنا أو سلامة عملائنا

نضمن أن جميع الأطراف التي نتعامل معها تلتزم بمعايير الخصوصية نفسها.`,
  },
  {
    id: "rights",
    icon: CheckCircle2,
    title: "حقوقك",
    content: `لديك الحقوق التالية بخصوص بياناتك:

- **الوصول:** طلب نسخة من بياناتك الشخصية
- **التصحيح:** طلب تصحيح أي بيانات غير دقيقة
- **الحذف:** طلب حذف بياناتك (مع مراعاة الالتزامات القانونية)
- **الاعتراض:** الاعتراض على استخدام بياناتك لأغراض التسويق
- **سحب الموافقة:** سحب موافقتك على معالجة البيانات في أي وقت

لممارسة أي من هذه الحقوق، تواصل معنا عبر القنوات المذكورة أدناه.`,
  },
  {
    id: "retention",
    icon: Database,
    title: "مدة الاحتفاظ بالبيانات",
    content: `نحتفظ ببياناتك الشخصية للمدة اللازمة للأغراض التالية:

- **بيانات الطلبات:** طوال مدة تقديم الخدمة + سنة بعد انتهائها
- **بيانات الفوترة:** 6 سنوات (وفق المتطلبات الضريبية)
- **بيانات التسويق:** حتى سحب موافقتك
- **سجلات النظام:** 90 يوماً لأغراض الأمان

بعد انتهاء فترة الاحتفاظ، نحذف البيانات بشكل آمن أو نجعلها مجهولة الهوية.`,
  },
];

export default async function PrivacyPage() {
  const settings = await getSettings();

  const privacySchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "سياسة الخصوصية",
    description: "سياسة الخصوصية لشركة الظلال الملكية",
    publisher: {
      "@type": "Organization",
      name: settings.name,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(privacySchema) }}
      />

      <PageHeader
        title="سياسة الخصوصية"
        subtitle="نلتزم بحماية خصوصيتك وضمان أمان بياناتك الشخصية"
        crumbs={[{ name: "سياسة الخصوصية" }]}
      />

      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 rounded-2xl border border-border bg-card p-5">
                <p className="text-xs font-bold text-muted-foreground mb-3">المحتويات</p>
                <nav className="space-y-1">
                  {SECTIONS.map((s) => (
                    <a
                      key={s.id}
                      href={`#${s.id}`}
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-muted-foreground hover:text-primary hover:bg-secondary transition-colors"
                    >
                      <s.icon className="h-4 w-4 shrink-0" />
                      {s.title}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Content */}
            <div className="lg:col-span-3 space-y-8">
              {/* Intro */}
              <div className="rounded-2xl border border-border bg-secondary/30 p-6">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  آخر تحديث: {new Intl.DateTimeFormat("ar-SA", { year: "numeric", month: "long", day: "numeric" }).format(new Date())}
                </p>
                <p className="mt-3 text-foreground leading-relaxed">
                  في <strong>{settings.name}</strong>، نحترم خصوصيتك ونلتزم بحماية بياناتك الشخصية.
                  توضح هذه السياسة كيف نجمع ونستخدم ونحمي معلوماتك عند استخدامك موقعنا وخدماتنا.
                </p>
              </div>

              {/* Sections */}
              {SECTIONS.map((section) => (
                <div key={section.id} id={section.id} className="scroll-mt-24">
                  <div className="rounded-2xl border border-border bg-card p-6 lg:p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
                        <section.icon className="h-6 w-6" />
                      </div>
                      <h2 className="font-display text-xl lg:text-2xl font-bold">{section.title}</h2>
                    </div>
                    <div className="prose prose-sm max-w-none">
                      {section.content.split("\n\n").map((para, i) => (
                        <p key={i} className="text-muted-foreground leading-relaxed mb-3 whitespace-pre-line">
                          {para}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              {/* Contact */}
              <div className="rounded-2xl bg-gradient-to-br from-primary to-accent text-background p-6 lg:p-8">
                <h2 className="font-display text-xl font-bold mb-3">أسئلة حول الخصوصية؟</h2>
                <p className="text-background/80 text-sm mb-5">
                  إذا كان لديك أي استفسار حول سياسة الخصوصية أو كيفية تعاملنا مع بياناتك،
                  يسعدنا تواصلك معنا عبر القنوات التالية:
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <a href={`mailto:${settings.email}`} className="flex items-center gap-2 rounded-xl bg-background/10 hover:bg-background/20 px-4 py-3 transition-colors">
                    <Mail className="h-5 w-5 text-accent" />
                    <span className="text-sm font-bold" dir="ltr">{settings.email}</span>
                  </a>
                  <a href={`tel:${settings.phone}`} className="flex items-center gap-2 rounded-xl bg-background/10 hover:bg-background/20 px-4 py-3 transition-colors">
                    <Phone className="h-5 w-5 text-accent" />
                    <span className="text-sm font-bold" dir="ltr">{settings.phoneDisplay}</span>
                  </a>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4">
                <Link href="/terms" className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-accent transition">
                  شروط الاستخدام
                  <ArrowLeft className="h-4 w-4" />
                </Link>
                <Link href="/" className="text-sm font-bold text-muted-foreground hover:text-foreground transition">
                  العودة للرئيسية
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
