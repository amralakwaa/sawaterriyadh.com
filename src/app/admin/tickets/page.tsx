import Link from "next/link";
import { db } from "@/lib/db";
import { Ticket, Phone, Mail, Clock, MessageSquare } from "lucide-react";
import { TicketActions } from "@/components/admin/ticket-actions";

export const metadata = { title: "تذاكر الدعم - لوحة التحكم" };

const statusFilters = [
  { value: "all", label: "الكل" },
  { value: "open", label: "مفتوحة" },
  { value: "in_progress", label: "قيد المعالجة" },
  { value: "resolved", label: "تم حلها" },
  { value: "closed", label: "مغلقة" },
];

const categoryLabels: Record<string, string> = {
  general: "استفسار عام",
  quote: "استفسار عن تسعير",
  complaint: "شكوى",
  maintenance: "طلب صيانة",
  other: "أخرى",
};

export default async function AdminTicketsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const activeFilter = status || "all";

  let tickets: any[] = [];
  try {
    tickets = await db.supportTicket.findMany({
      where: activeFilter !== "all" ? { status: activeFilter } : undefined,
      orderBy: { createdAt: "desc" },
    });
  } catch (e) {
    console.error(e);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display text-2xl lg:text-3xl font-extrabold flex items-center gap-2">
            <Ticket className="h-7 w-7 text-primary" />
            تذاكر الدعم
          </h1>
          <p className="text-muted-foreground mt-1">{tickets.length} تذكرة</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {statusFilters.map((f) => (
          <Link
            key={f.value}
            href={`/admin/tickets?status=${f.value}`}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
              activeFilter === f.value
                ? "bg-primary text-primary-foreground"
                : "bg-card border border-border hover:bg-secondary"
            }`}
          >
            {f.label}
          </Link>
        ))}
      </div>

      {/* Tickets list */}
      <div className="space-y-3">
        {tickets.length === 0 && (
          <div className="rounded-2xl border border-border bg-card p-12 text-center text-muted-foreground">
            <Ticket className="h-12 w-12 mx-auto mb-3 text-muted-foreground/40" />
            <p className="font-bold text-foreground mb-1">لا توجد تذاكر</p>
            <p className="text-sm">ستظهر التذاكر الجديدة هنا</p>
          </div>
        )}
        {tickets.map((t) => (
          <div key={t.id} className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap mb-2">
                  <span className="font-mono font-bold text-primary text-sm" dir="ltr">{t.ticketId}</span>
                  <StatusBadge status={t.status} />
                  <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold">
                    {categoryLabels[t.category] || t.category}
                  </span>
                  {t.priority === "urgent" && (
                    <span className="rounded-full bg-destructive/15 px-2.5 py-0.5 text-xs font-bold text-destructive">
                      عاجل
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-foreground mb-1">{t.subject}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{t.message}</p>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">{t.name}</span>
                  <span className="flex items-center gap-1" dir="ltr"><Phone className="h-3 w-3" />{t.phone}</span>
                  {t.email && <span className="flex items-center gap-1" dir="ltr"><Mail className="h-3 w-3" />{t.email}</span>}
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{new Intl.DateTimeFormat("ar-SA", { dateStyle: "medium", timeStyle: "short" }).format(t.createdAt)}</span>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-border">
              <TicketActions id={t.id} status={t.status} priority={t.priority} phone={t.phone} response={t.response} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; class: string }> = {
    open: { label: "مفتوحة", class: "bg-accent/15 text-accent" },
    in_progress: { label: "قيد المعالجة", class: "bg-blue-100 text-blue-700" },
    resolved: { label: "تم حلها", class: "bg-green-100 text-green-700" },
    closed: { label: "مغلقة", class: "bg-secondary text-muted-foreground" },
  };
  const s = map[status] || { label: status, class: "bg-secondary" };
  return <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${s.class}`}>{s.label}</span>;
}
