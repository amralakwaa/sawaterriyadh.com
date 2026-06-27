import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Phone, Mail, MapPin, Calendar, User, FileText } from "lucide-react";
import { db } from "@/lib/db";
import { QuoteActions } from "@/components/admin/quote-actions";

export const metadata = { title: "تفاصيل طلب التسعير" };

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminQuoteDetail({ params }: PageProps) {
  const { id } = await params;
  let quote: any = null;
  try {
    quote = await db.quoteRequest.findUnique({
      where: { id },
      include: { service: true },
    });
  } catch (e) {
    console.error(e);
  }

  if (!quote) notFound();

  // Auto-mark as read if new
  if (quote.status === "new") {
    try {
      await db.quoteRequest.update({ where: { id }, data: { status: "contacted" } });
    } catch {}
  }

  const details = [
    { icon: User, label: "الاسم", value: quote.name },
    { icon: Phone, label: "الهاتف", value: quote.phone, ltr: true },
    { icon: Mail, label: "البريد", value: quote.email || "—", ltr: true },
    { icon: MapPin, label: "المنطقة", value: quote.area || "—" },
    { icon: FileText, label: "الخدمة", value: quote.service?.title || "—" },
    { icon: Calendar, label: "التاريخ", value: new Intl.DateTimeFormat("ar-SA", { dateStyle: "full", timeStyle: "short" }).format(quote.createdAt) },
  ];

  return (
    <div className="space-y-6 max-w-4xl">
      <Link href="/admin/quotes" className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-accent">
        <ArrowRight className="h-4 w-4" />
        العودة للطلبات
      </Link>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6">
            <h1 className="font-display text-2xl font-extrabold mb-1">{quote.name}</h1>
            <p className="text-sm text-muted-foreground mb-5" dir="ltr">{quote.phone}</p>

            <div className="grid sm:grid-cols-2 gap-4">
              {details.map((d, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                    <d.icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">{d.label}</p>
                    <p className="font-semibold text-sm truncate" dir={d.ltr ? "ltr" : "rtl"}>{d.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Message */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="font-display font-bold text-lg mb-3">نص الطلب</h2>
            <p className="text-foreground/90 leading-relaxed whitespace-pre-wrap">{quote.message}</p>
            {quote.budget && (
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground">الميزانية التقريبية</p>
                <p className="font-bold text-primary mt-1">{quote.budget}</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <aside>
          <div className="rounded-2xl border border-border bg-card p-6 sticky top-6">
            <h3 className="font-display font-bold mb-4">إجراءات</h3>
            <QuoteActions
              id={quote.id}
              status={quote.status === "new" ? "contacted" : quote.status}
              phone={quote.phone}
              whatsapp={quote.phone.replace(/^0/, "966")}
              email={quote.email}
            />
          </div>
        </aside>
      </div>
    </div>
  );
}
