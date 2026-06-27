import Link from "next/link";
import { db } from "@/lib/db";
import { ArrowLeft, Phone, Mail, MapPin } from "lucide-react";

export const metadata = { title: "طلبات التسعير - لوحة التحكم" };

const statusFilters = [
  { value: "all", label: "الكل" },
  { value: "new", label: "جديد" },
  { value: "contacted", label: "تم التواصل" },
  { value: "quoted", label: "تم التسعير" },
  { value: "won", label: "مكتسب" },
  { value: "lost", label: "مفقود" },
];

export default async function AdminQuotesPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const activeFilter = status || "all";

  let quotes: any[] = [];
  try {
    quotes = await db.quoteRequest.findMany({
      where: activeFilter !== "all" ? { status: activeFilter } : undefined,
      orderBy: { createdAt: "desc" },
      include: { service: true },
    });
  } catch (e) {
    console.error(e);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display text-2xl lg:text-3xl font-extrabold">طلبات التسعير</h1>
          <p className="text-muted-foreground mt-1">{quotes.length} طلب</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {statusFilters.map((f) => (
          <Link
            key={f.value}
            href={`/admin/quotes?status=${f.value}`}
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

      <div className="space-y-3">
        {quotes.length === 0 && (
          <div className="rounded-2xl border border-border bg-card p-12 text-center text-muted-foreground">
            لا توجد طلبات في هذه الفئة
          </div>
        )}
        {quotes.map((q) => (
          <Link
            key={q.id}
            href={`/admin/quotes/${q.id}`}
            className="block rounded-2xl border border-border bg-card p-5 hover:border-primary hover:shadow-md transition"
          >
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap mb-2">
                  <h3 className="font-bold text-foreground">{q.name}</h3>
                  <StatusBadge status={q.status} />
                  {q.service && (
                    <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold">
                      {q.service.title}
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1" dir="ltr">
                    <Phone className="h-3.5 w-3.5" />
                    {q.phone}
                  </span>
                  {q.email && (
                    <span className="flex items-center gap-1" dir="ltr">
                      <Mail className="h-3.5 w-3.5" />
                      {q.email}
                    </span>
                  )}
                  {q.area && (
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {q.area}
                    </span>
                  )}
                  <span>
                    {new Intl.DateTimeFormat("ar-SA", { dateStyle: "medium", timeStyle: "short" }).format(q.createdAt)}
                  </span>
                </div>
                <p className="mt-2 text-sm text-foreground/80 line-clamp-2">{q.message}</p>
              </div>
              <ArrowLeft className="h-5 w-5 text-muted-foreground shrink-0" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; class: string }> = {
    new: { label: "جديد", class: "bg-accent/15 text-accent" },
    contacted: { label: "تم التواصل", class: "bg-primary/10 text-primary" },
    quoted: { label: "تم التسعير", class: "bg-primary/15 text-primary" },
    won: { label: "مكتسب", class: "bg-green-100 text-green-700" },
    lost: { label: "مفقود", class: "bg-destructive/10 text-destructive" },
  };
  const s = map[status] ?? { label: status, class: "bg-secondary" };
  return <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${s.class}`}>{s.label}</span>;
}
