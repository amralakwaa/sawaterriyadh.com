import { db } from "@/lib/db";
import { Phone, Mail, Trash2 } from "lucide-react";
import { MessageActions } from "@/components/admin/message-actions";

export const metadata = { title: "الرسائل - لوحة التحكم" };

export default async function AdminMessagesPage() {
  let messages: any[] = [];
  try {
    messages = await db.contactMessage.findMany({ orderBy: { createdAt: "desc" } });
  } catch (e) {
    console.error(e);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl lg:text-3xl font-extrabold">الرسائل</h1>
        <p className="text-muted-foreground mt-1">{messages.length} رسالة</p>
      </div>

      <div className="space-y-3">
        {messages.length === 0 && (
          <div className="rounded-2xl border border-border bg-card p-12 text-center text-muted-foreground">
            لا توجد رسائل
          </div>
        )}
        {messages.map((m) => (
          <div key={m.id} className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-bold text-foreground">{m.name}</h3>
                  {m.status === "new" && (
                    <span className="rounded-full bg-accent/15 px-2.5 py-0.5 text-xs font-bold text-accent">جديد</span>
                  )}
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1" dir="ltr"><Phone className="h-3.5 w-3.5" />{m.phone}</span>
                  {m.email && <span className="flex items-center gap-1" dir="ltr"><Mail className="h-3.5 w-3.5" />{m.email}</span>}
                  <span>{new Intl.DateTimeFormat("ar-SA", { dateStyle: "medium", timeStyle: "short" }).format(m.createdAt)}</span>
                </div>
              </div>
            </div>
            {m.subject && <p className="font-semibold text-sm mb-1">{m.subject}</p>}
            <p className="text-sm text-foreground/80 leading-relaxed">{m.message}</p>
            <div className="mt-4 pt-4 border-t border-border">
              <MessageActions id={m.id} status={m.status} phone={m.phone} email={m.email} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
