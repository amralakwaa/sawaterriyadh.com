import type { Metadata } from "next";
import { LifeBuoy, Headset, Clock, CheckCircle2, MessageSquare } from "lucide-react";
import { PageHeader } from "@/components/site/page-header";
import { TicketForm } from "@/components/site/ticket-form";
import { CtaQuoteSection } from "@/components/sections/cta-quote";

export const metadata: Metadata = {
  title: "الدعم والمساندة | شركة الظلال الملكية - الرياض",
  description:
    "افتح تذكرة دعم واحصل على رد سريع من فريقنا. تتبع حالة تذكرتك، أرسل استفساراً، أو اطلب صيانة ل مشروعك.",
  alternates: { canonical: "/support" },
};

const CATEGORIES = [
  { value: "general", label: "استفسار عام" },
  { value: "quote", label: "استفسار عن تسعير" },
  { value: "complaint", label: "شكوى" },
  { value: "maintenance", label: "طلب صيانة" },
  { value: "other", label: "أخرى" },
];

export default function SupportPage() {
  return (
    <>
      <PageHeader
        title="الدعم والمساندة"
        subtitle="نحن هنا لمساعدتك - افتح تذكرة دعم وسيتواصل معك فريقنا في أقرب وقت"
        crumbs={[{ name: "الدعم" }]}
      />

      {/* Info cards */}
      <section className="py-8 bg-secondary/40 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <div className="rounded-2xl bg-card border border-border p-5 text-center">
              <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-xl bg-primary/10 text-primary mb-3">
                <Headset className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-sm mb-1">دعم احترافي</h3>
              <p className="text-xs text-muted-foreground">فريق متخصص للرد على استفساراتك</p>
            </div>
            <div className="rounded-2xl bg-card border border-border p-5 text-center">
              <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-xl bg-accent/15 text-accent mb-3">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-sm mb-1">رد سريع</h3>
              <p className="text-xs text-muted-foreground">خلال 24 ساعة عمل</p>
            </div>
            <div className="rounded-2xl bg-card border border-border p-5 text-center">
              <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-xl bg-primary/10 text-primary mb-3">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-sm mb-1">تتبع الحالة</h3>
              <p className="text-xs text-muted-foreground">رقم تذكرة لتتبع طلبك</p>
            </div>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="rounded-2xl border border-border bg-card p-6 lg:p-8 shadow-sm">
              <div className="mb-6">
                <h2 className="font-display text-2xl font-bold mb-2">افتح تذكرة دعم</h2>
                <p className="text-sm text-muted-foreground">
                  املأ النموذج وسنرسل لك رقم تذكرة لتتبع طلبك
                </p>
              </div>
              <TicketForm categories={CATEGORIES} />
            </div>
          </div>
        </div>
      </section>

      <CtaQuoteSection />
    </>
  );
}
