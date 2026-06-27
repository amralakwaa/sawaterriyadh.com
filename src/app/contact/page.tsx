import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, HelpCircle, ChevronLeft } from "lucide-react";
import { getSettings } from "@/lib/data";
import { PageHeader } from "@/components/site/page-header";
import { ContactForm } from "@/components/site/contact-form";

export const metadata: Metadata = {
  title: "تواصل معنا | شركة الظلال الملكية - الرياض",
  description:
    "تواصل مع شركة الظلال الملكية في الرياض. اتصل بنا، راسلنا عبر الواتساب، أو املأ نموذج التواصل. نرد على جميع الاستفسارات خلال 24 ساعة.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage() {
  const settings = await getSettings();

  return (
    <>
      <PageHeader
        title="تواصل معنا"
        subtitle="نحن هنا لمساعدتك. تواصل معنا بالطريقة التي تناسبك وسنرد عليك في أقرب وقت ممكن"
        crumbs={[{ name: "تواصل معنا" }]}
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-10">
            {/* Contact info */}
            <div className="space-y-6">
              <div>
                <h2 className="font-display text-2xl font-bold mb-2">معلومات التواصل</h2>
                <p className="text-muted-foreground">
                  اختر الطريقة الأنسب لك للتواصل معنا. فريقنا جاهز للرد على استفساراتك.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {/* Phone */}
                <a
                  href={`tel:${settings.phone}`}
                  className="group rounded-2xl border border-border bg-card p-5 hover:border-primary hover:shadow-md transition"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors mb-3">
                    <Phone className="h-6 w-6" />
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">اتصل بنا</p>
                  <p className="font-bold text-foreground" dir="ltr">{settings.phoneDisplay}</p>
                </a>

                {/* WhatsApp */}
                <a
                  href={`https://wa.me/${settings.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-2xl border border-border bg-card p-5 hover:border-[#25D366] hover:shadow-md transition"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#25D366]/10 text-[#25D366] mb-3">
                    <MessageCircle className="h-6 w-6" />
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">واتساب</p>
                  <p className="font-bold text-foreground">راسلنا الآن</p>
                </a>

                {/* Email */}
                <a
                  href={`mailto:${settings.email}`}
                  className="group rounded-2xl border border-border bg-card p-5 hover:border-primary hover:shadow-md transition"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors mb-3">
                    <Mail className="h-6 w-6" />
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">البريد الإلكتروني</p>
                  <p className="font-bold text-foreground text-sm" dir="ltr">{settings.email}</p>
                </a>

                {/* Location */}
                <div className="rounded-2xl border border-border bg-card p-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-3">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">العنوان</p>
                  <p className="font-bold text-foreground text-sm">{settings.addressFull}</p>
                </div>
              </div>

              {/* Working hours */}
              <div className="rounded-2xl border border-border bg-secondary/40 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="h-5 w-5 text-primary" />
                  <h3 className="font-display font-bold text-lg">ساعات العمل</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">السبت - الخميس</span>
                    <span className="font-semibold">8 صباحاً - 10 مساءً</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">الجمعة</span>
                    <span className="font-semibold">4 عصراً - 10 مساءً</span>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="rounded-2xl overflow-hidden border border-border h-64">
                <iframe
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${Number(settings.lng) - 0.05}%2C${Number(settings.lat) - 0.05}%2C${Number(settings.lng) + 0.05}%2C${Number(settings.lat) + 0.05}&layer=mapnik&marker=${settings.lat}%2C${settings.lng}`}
                  className="w-full h-full"
                  loading="lazy"
                  title="موقع شركة الظلال الملكية - الرياض"
                />
              </div>
            </div>

            {/* Form */}
            <div>
              <div className="rounded-2xl border border-border bg-card p-6 lg:p-8 shadow-sm">
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Send className="h-5 w-5 text-primary" />
                    <h2 className="font-display text-2xl font-bold">أرسل رسالة</h2>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    املأ النموذج وسنتواصل معك في أقرب وقت ممكن
                  </p>
                </div>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick FAQ */}
      <section className="py-12 bg-secondary/40 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <span className="inline-block rounded-full bg-accent/15 px-4 py-1.5 text-xs font-bold text-accent mb-3">
                أسئلة سريعة
              </span>
              <h2 className="font-display text-2xl lg:text-3xl font-bold">
                قد تجد إجابتك هنا
              </h2>
              <p className="text-muted-foreground mt-2 text-sm">
                الأسئلة الأكثر شيوعاً قبل التواصل معنا
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { q: "كم تستغرق مدة التركيب؟", a: "معظم المشاريع السكنية تنفذ خلال 24-48 ساعة، حسب الحجم." },
                { q: "هل المعاينة مجانية؟", a: "نعم، نقدم معاينة مجانية للموقع وعرض سعر تفصيلي بدون التزام." },
                { q: "ما هي مدة الضمان؟", a: "ضمان حتى 15 سنة على الهياكل الحديدية، و10 سنوات على المواد." },
                { q: "ما هي مناطق الخدمة؟", a: "نخدم جميع أحياء الرياض والمناطق المحيطة بها." },
              ].map((faq, i) => (
                <Link
                  key={i}
                  href="/faq"
                  className="group rounded-2xl border border-border bg-card p-5 hover:border-primary hover:shadow-md transition-all"
                >
                  <h3 className="font-bold text-sm mb-2 group-hover:text-primary transition-colors flex items-start gap-2">
                    <HelpCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    {faq.q}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed pr-6">{faq.a}</p>
                  <span className="text-xs font-bold text-primary mt-2 inline-block group-hover:text-accent transition-colors">
                    المزيد ←
                  </span>
                </Link>
              ))}
            </div>
            <div className="text-center mt-6">
              <Link
                href="/faq"
                className="inline-flex items-center gap-2 rounded-xl border-2 border-primary px-5 py-2.5 text-sm font-bold text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                عرض جميع الأسئلة
                <ChevronLeft className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
