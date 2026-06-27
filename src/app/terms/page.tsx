import type { Metadata } from "next";
import Link from "next/link";
import { FileText, CheckCircle2, AlertTriangle, Scale, ArrowLeft } from "lucide-react";
import { getSettings } from "@/lib/data";
import { PageHeader } from "@/components/site/page-header";

export const metadata: Metadata = {
  title: "شروط الاستخدام | شركة الظلال الملكية - الرياض",
  description:
    "شروط وأحكام استخدام موقع وخدمات شركة الظلال الملكية للمظلات والسواتر وأعمال الحدادة في الرياض.",
  alternates: { canonical: "/terms" },
};

const SECTIONS = [
  {
    title: "قبول الشروط",
    content: `باستخدامك لموقع شركة الظلال الملكية وخدماتنا، فإنك توافق على الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق على أي جزء من هذه الشروط، يرجى عدم استخدام موقعنا أو خدماتنا.

تخضع جميع المعاملات والاتفاقيات للأنظمة المعمول بها في المملكة العربية السعودية.`,
  },
  {
    title: "الخدمات المقدمة",
    content: `نقدم خدمات تصميم وتركيب المظلات والسواتر وأعمال الحدادة في الرياض والمناطق المحيطة، تشمل:

- مظلات السيارات والحدائق والمسابح
- السواتر المنزلية والتجارية
- أعمال الحدادة الفنية (بوابات، دراج، مشرفات)
- مظلات المداخل والواجهات
- الهياكل الحديدية والمستودعات
- المشربيات والأساور

جميع خدماتنا تخضع لمعاينة ميدانية وتسعير تفصيلي قبل التنفيذ.`,
  },
  {
    title: "التسعير والدفع",
    content: `الأسعار المعروضة على الموقع تقديرية وقد تختلف حسب المعاينة الميدانية والمواد المختارة.

شروط الدفع:
- دفعة أولى 30% عند توقيع العقد
- دفعة ثانية 40% عند بدء التنفيذ
- الدفعة النهائية 30% عند التسليم

طرق الدفع المتاحة: نقداً، تحويل بنكي، شبكة، تقسيط عبر تابي وتمارا.

جميع الأسعار شاملة ضريبة القيمة المضافة (15%) ما لم يُذكر خلاف ذلك.`,
  },
  {
    title: "الضمان والصيانة",
    content: `نقدم ضماناً على جميع أعمالنا كما يلي:

- الهياكل الحديدية: 15 سنة
- القماش والمواد: 10 سنوات
- أعمال الحدادة: 12 سنة
- التركيب والعمل: 5 سنوات

الضمان يشمل:
- إصلاح أو استبدال الأجزاء المعيبة
- الصيانة الدورية للسنة الأولى

لا يشمل الضمان:
- الأضرار الناتجة عن سوء الاستخدام
- الكوارث الطبيعية والحوادث
- التعديلات غير المعتمدة من الشركة`,
  },
  {
    title: "مسؤوليات العميل",
    content: `يلتزم العميل بـ:

- توفير موقع آمن ومناسب للعمل
- الحصول على التراخيص اللازمة (إذا لزم)
- سداد الدفعات في مواعيدها
- توفير مصدر للكهرباء والماء (عند الحاجة)
- عدم التدخل في سير العمل

في حال تأخر العميل في سداد الدفعات، نحتفظ بالحق في إيقاف العمل حتى السداد.`,
  },
  {
    title: "إلغاء الطلبات",
    content: `يمكنك إلغاء طلبك وفقاً للشروط التالية:

- قبل بدء التصنيع: استرداد كامل المبلغ
- بعد بدء التصنيع: خصم 20% من المبلغ
- بعد بدء التركيب: لا يمكن الإلغاء

لإلغاء طلب، تواصل معنا كتابياً عبر البريد الإلكتروني أو الواتساب.`,
  },
  {
    title: "الملكية الفكرية",
    content: `جميع المحتويات على هذا الموقع (النصوص، الصور، التصاميم، الشعارات) هي ملك لشركة الظلال الملكية ومحمية بقوانين الملكية الفكرية.

لا يجوز:
- نسخ أو إعادة استخدام المحتوى دون إذن
- استخدام شعار الشركة أو علامتها التجارية
- نشر صور مشاريعنا دون موافقة

يُسمح بمشاركة روابط موقعنا لأغراض غير تجارية.`,
  },
  {
    title: "حدود المسؤولية",
    content: `ن strive لتقديم معلومات دقيقة على موقعنا، لكننا لا نضمن خلوها من الأخطاء. نحن غير مسؤولين عن:

- أضرار غير مباشرة أو تبعية
- خسائر ناتجة عن عدم استخدام الموقع
- محتوى مواقع خارجية مرتبطة

مسؤوليتنا القصوى محدودة بقيمة المشروع المنفذ.`,
  },
  {
    title: "تعديل الشروط",
    content: `نحتفظ بالحق في تعديل هذه الشروط في أي وقت. سيتم نشر التغييرات على هذه الصفحة مع تحديث تاريخ "آخر تحديث".

استمرارك في استخدام الموقع بعد التعديلات يعني موافقتك على الشروط المعدلة.`,
  },
];

export default async function TermsPage() {
  const settings = await getSettings();

  return (
    <>
      <PageHeader
        title="شروط الاستخدام"
        subtitle="الشروط والأحكام التي تحكم استخدامك لموقع وخدمات شركة الظلال الملكية"
        crumbs={[{ name: "شروط الاستخدام" }]}
      />

      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 rounded-2xl border border-border bg-card p-5">
                <p className="text-xs font-bold text-muted-foreground mb-3">المحتويات</p>
                <nav className="space-y-1 max-h-[60vh] overflow-y-auto">
                  {SECTIONS.map((s, i) => (
                    <a
                      key={i}
                      href={`#section-${i}`}
                      className="block rounded-lg px-3 py-2 text-xs font-semibold text-muted-foreground hover:text-primary hover:bg-secondary transition-colors"
                    >
                      {i + 1}. {s.title}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Content */}
            <div className="lg:col-span-3 space-y-6">
              <div className="rounded-2xl border border-border bg-secondary/30 p-6">
                <p className="text-sm text-muted-foreground">
                  آخر تحديث: {new Intl.DateTimeFormat("ar-SA", { year: "numeric", month: "long", day: "numeric" }).format(new Date())}
                </p>
                <p className="mt-3 text-foreground leading-relaxed">
                  مرحباً بك في <strong>{settings.name}</strong>. يرجى قراءة هذه الشروط بعناية قبل استخدام خدماتنا.
                </p>
              </div>

              {SECTIONS.map((section, i) => (
                <div key={i} id={`section-${i}`} className="scroll-mt-24 rounded-2xl border border-border bg-card p-6 lg:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm shrink-0">
                      {i + 1}
                    </span>
                    <h2 className="font-display text-lg lg:text-xl font-bold">{section.title}</h2>
                  </div>
                  <div className="prose prose-sm max-w-none">
                    {section.content.split("\n\n").map((para, j) => (
                      <p key={j} className="text-muted-foreground leading-relaxed mb-3 whitespace-pre-line">
                        {para}
                      </p>
                    ))}
                  </div>
                </div>
              ))}

              <div className="rounded-2xl bg-gradient-to-br from-primary to-accent text-background p-6 lg:p-8 text-center">
                <Scale className="h-10 w-10 mx-auto mb-3" />
                <h2 className="font-display text-xl font-bold mb-2">لديك سؤال قانوني؟</h2>
                <p className="text-background/80 text-sm mb-5 max-w-xl mx-auto">
                  فريقنا جاهز للإجابة على أي استفسار حول شروط الاستخدام أو اتفاقيات المشاريع.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl bg-background px-6 py-3 text-sm font-bold text-primary hover:scale-105 transition"
                >
                  تواصل معنا
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </div>

              <div className="flex justify-between items-center pt-4">
                <Link href="/privacy" className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-accent transition">
                  سياسة الخصوصية
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
