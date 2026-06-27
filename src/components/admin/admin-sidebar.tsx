import Link from "next/link";
import { LayoutDashboard, FileText, Mail, Wrench, FolderGit2, Newspaper, MapPin, Star, Ticket, LogOut, ExternalLink } from "lucide-react";
import { db } from "@/lib/db";

const navItems = [
  { href: "/admin", label: "لوحة التحكم", icon: LayoutDashboard },
  { href: "/admin/quotes", label: "طلبات التسعير", icon: FileText },
  { href: "/admin/messages", label: "الرسائل", icon: Mail },
  { href: "/admin/tickets", label: "تذاكر الدعم", icon: Ticket },
  { href: "/admin/services", label: "الخدمات", icon: Wrench },
  { href: "/admin/projects", label: "المشاريع", icon: FolderGit2 },
  { href: "/admin/blog", label: "المدونة", icon: Newspaper },
  { href: "/admin/areas", label: "المناطق", icon: MapPin },
  { href: "/admin/testimonials", label: "آراء العملاء", icon: Star },
];

export async function AdminSidebar() {
  let newQuotes = 0;
  let newMessages = 0;
  try {
    newQuotes = await db.quoteRequest.count({ where: { status: "new" } });
    newMessages = await db.contactMessage.count({ where: { status: "new" } });
  } catch {}

  const badges: Record<string, number> = {
    "/admin/quotes": newQuotes,
    "/admin/messages": newMessages,
  };

  return (
    <aside className="fixed inset-y-0 right-0 z-40 w-64 bg-foreground text-background flex flex-col border-l border-background/10">
      {/* Logo */}
      <div className="flex items-center gap-3 p-5 border-b border-background/10">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-primary-foreground">
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 13L12 4l9 9" />
            <path d="M5 13v8h14v-8" />
          </svg>
        </div>
        <div>
          <p className="font-display font-bold text-sm">لوحة التحكم</p>
          <p className="text-xs text-background/50">الظلال الملكية</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {navItems.map((item) => {
          const badge = badges[item.href];
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-background/80 hover:bg-background/10 hover:text-background transition-colors"
            >
              <span className="flex items-center gap-3">
                <item.icon className="h-4 w-4" />
                {item.label}
              </span>
              {badge > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1.5 text-xs font-bold text-accent-foreground">
                  {badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-background/10 space-y-1">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-background/80 hover:bg-background/10 transition-colors"
        >
          <ExternalLink className="h-4 w-4" />
          عرض الموقع
        </Link>
        <Link
          href="/"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-background/60 hover:bg-destructive/20 hover:text-destructive transition-colors"
        >
          <LogOut className="h-4 w-4" />
          تسجيل الخروج
        </Link>
      </div>
    </aside>
  );
}
