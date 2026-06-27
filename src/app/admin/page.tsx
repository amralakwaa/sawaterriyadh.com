import Link from "next/link";
import { FileText, Mail, Wrench, FolderGit2, Newspaper, TrendingUp, Clock, Phone, ArrowLeft } from "lucide-react";
import { db } from "@/lib/db";
import { getSettings } from "@/lib/data";

export const metadata = { title: "لوحة التحكم" };

function StatCard({
  icon: Icon,
  label,
  value,
  hint,
  color = "primary",
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  hint?: string;
  color?: "primary" | "accent" | "destructive";
}) {
  const colors = {
    primary: "bg-primary/10 text-primary",
    accent: "bg-accent/15 text-accent",
    destructive: "bg-destructive/10 text-destructive",
  };
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${colors[color]}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
      <p className="text-3xl font-display font-extrabold text-foreground">{value}</p>
      <p className="text-sm text-muted-foreground mt-1">{label}</p>
      {hint && <p className="text-xs text-muted-foreground/70 mt-1">{hint}</p>}
    </div>
  );
}

export default async function AdminDashboard() {
  const settings = await getSettings();
  let stats = {
    quotes: 0,
    newQuotes: 0,
    messages: 0,
    newMessages: 0,
    services: 0,
    projects: 0,
    blogPosts: 0,
    contactedQuotes: 0,
    wonQuotes: 0,
  };
  let recentQuotes: any[] = [];
  let recentMessages: any[] = [];

  try {
    const [quotes, newQuotes, messages, newMessages, services, projects, blogPosts, contactedQuotes, wonQuotes] =
      await Promise.all([
        db.quoteRequest.count(),
        db.quoteRequest.count({ where: { status: "new" } }),
        db.contactMessage.count(),
        db.contactMessage.count({ where: { status: "new" } }),
        db.service.count(),
        db.project.count(),
        db.blogPost.count(),
        db.quoteRequest.count({ where: { status: "contacted" } }),
        db.quoteRequest.count({ where: { status: "won" } }),
      ]);
    stats = { quotes, newQuotes, messages, newMessages, services, projects, blogPosts, contactedQuotes, wonQuotes };
    recentQuotes = await db.quoteRequest.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      include: { service: true },
    });
    recentMessages = await db.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    });
  } catch (e) {
    console.error("Dashboard error:", e);
  }

  const conversionRate = stats.quotes > 0 ? Math.round((stats.wonQuotes / stats.quotes) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl lg:text-3xl font-extrabold">مرحباً بك في لوحة التحكم</h1>
          <p className="text-muted-foreground mt-1">{settings.name} - نظرة عامة على الأداء</p>
        </div>
        <Link
          href="/"
          target="_blank"
          className="hidden sm:inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-semibold hover:bg-secondary"
        >
          عرض الموقع
          <ArrowLeft className="h-4 w-4" />
        </Link>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={FileText} label="إجمالي طلبات التسعير" value={stats.quotes} hint={`${stats.newQuotes} جديد`} color="primary" />
        <StatCard icon={Mail} label="إجمالي الرسائل" value={stats.messages} hint={`${stats.newMessages} جديد`} color="accent" />
        <StatCard icon={TrendingUp} label="معدل التحويل" value={`${conversionRate}%`} hint={`${stats.wonQuotes} مشروع ناجح`} color="accent" />
        <StatCard icon={Phone} label="طلبات تم التواصل" value={stats.contactedQuotes} hint="بانتظار الرد" color="primary" />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Wrench} label="الخدمات" value={stats.services} color="primary" />
        <StatCard icon={FolderGit2} label="المشاريع" value={stats.projects} color="primary" />
        <StatCard icon={Newspaper} label="مقالات المدونة" value={stats.blogPosts} color="primary" />
        <StatCard icon={Clock} label="طلبات جديدة" value={stats.newQuotes} hint="تحتاج متابعة" color="destructive" />
      </div>

      {/* Recent activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent quotes */}
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-bold text-lg">أحدث طلبات التسعير</h2>
            <Link href="/admin/quotes" className="text-sm font-bold text-primary hover:text-accent">
              عرض الكل
            </Link>
          </div>
          <div className="space-y-3">
            {recentQuotes.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-6">لا توجد طلبات بعد</p>
            )}
            {recentQuotes.map((q) => (
              <Link
                key={q.id}
                href={`/admin/quotes/${q.id}`}
                className="flex items-center justify-between gap-3 rounded-lg border border-border p-3 hover:bg-secondary transition"
              >
                <div className="min-w-0">
                  <p className="font-bold text-sm truncate">{q.name}</p>
                  <p className="text-xs text-muted-foreground" dir="ltr">{q.phone}</p>
                </div>
                <div className="flex items-center gap-2">
                  {q.service && (
                    <span className="hidden sm:inline text-xs text-muted-foreground truncate max-w-32">
                      {q.service.title}
                    </span>
                  )}
                  <StatusBadge status={q.status} />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent messages */}
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-bold text-lg">أحدث الرسائل</h2>
            <Link href="/admin/messages" className="text-sm font-bold text-primary hover:text-accent">
              عرض الكل
            </Link>
          </div>
          <div className="space-y-3">
            {recentMessages.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-6">لا توجد رسائل بعد</p>
            )}
            {recentMessages.map((m) => (
              <div
                key={m.id}
                className="flex items-center justify-between gap-3 rounded-lg border border-border p-3"
              >
                <div className="min-w-0">
                  <p className="font-bold text-sm truncate">{m.name}</p>
                  <p className="text-xs text-muted-foreground line-clamp-1">{m.message}</p>
                </div>
                <StatusBadge status={m.status} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
        <h2 className="font-display font-bold text-lg mb-4">إجراءات سريعة</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Link href="/admin/services/new" className="flex flex-col items-center gap-2 rounded-xl border border-border p-4 hover:border-primary hover:bg-secondary transition">
            <Wrench className="h-6 w-6 text-primary" />
            <span className="text-sm font-semibold">إضافة خدمة</span>
          </Link>
          <Link href="/admin/projects/new" className="flex flex-col items-center gap-2 rounded-xl border border-border p-4 hover:border-primary hover:bg-secondary transition">
            <FolderGit2 className="h-6 w-6 text-primary" />
            <span className="text-sm font-semibold">إضافة مشروع</span>
          </Link>
          <Link href="/admin/blog/new" className="flex flex-col items-center gap-2 rounded-xl border border-border p-4 hover:border-primary hover:bg-secondary transition">
            <Newspaper className="h-6 w-6 text-primary" />
            <span className="text-sm font-semibold">كتابة مقال</span>
          </Link>
          <Link href="/admin/quotes" className="flex flex-col items-center gap-2 rounded-xl border border-border p-4 hover:border-primary hover:bg-secondary transition">
            <FileText className="h-6 w-6 text-primary" />
            <span className="text-sm font-semibold">مراجعة الطلبات</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; class: string }> = {
    new: { label: "جديد", class: "bg-accent/15 text-accent" },
    contacted: { label: "تم التواصل", class: "bg-primary/10 text-primary" },
    quoted: { label: "تم التسعير", class: "bg-primary/15 text-primary" },
    won: { label: "تم الإغلاق", class: "bg-green-100 text-green-700" },
    lost: { label: "مرفوض", class: "bg-destructive/10 text-destructive" },
    read: { label: "مقروء", class: "bg-secondary text-muted-foreground" },
    replied: { label: "تم الرد", class: "bg-primary/10 text-primary" },
  };
  const s = map[status] ?? { label: status, class: "bg-secondary text-muted-foreground" };
  return <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-bold ${s.class}`}>{s.label}</span>;
}
