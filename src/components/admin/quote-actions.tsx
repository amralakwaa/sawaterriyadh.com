"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Loader2, Phone, MessageCircle, Mail } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const STATUSES = [
  { value: "new", label: "جديد" },
  { value: "contacted", label: "تم التواصل" },
  { value: "quoted", label: "تم التسعير" },
  { value: "won", label: "مكتسب" },
  { value: "lost", label: "مفقود" },
];

export function QuoteActions({
  id,
  status,
  phone,
  whatsapp,
  email,
}: {
  id: string;
  status: string;
  phone: string;
  whatsapp?: string;
  email?: string | null;
}) {
  const [current, setCurrent] = useState(status);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  const updateStatus = async (newStatus: string) => {
    setUpdating(true);
    try {
      const res = await fetch(`/api/admin/quotes/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error();
      setCurrent(newStatus);
      toast.success("تم تحديث الحالة");
      router.refresh();
    } catch {
      toast.error("فشل التحديث");
    } finally {
      setUpdating(false);
    }
  };

  const deleteQuote = async () => {
    if (!confirm("هل أنت متأكد من حذف هذا الطلب؟")) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/quotes/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      toast.success("تم حذف الطلب");
      router.push("/admin/quotes");
      router.refresh();
    } catch {
      toast.error("فشل الحذف");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Quick contact */}
      <div className="flex flex-wrap gap-2">
        <a href={`tel:${phone}`}>
          <Button variant="outline" size="sm" className="gap-2">
            <Phone className="h-4 w-4" />
            اتصال
          </Button>
        </a>
        {whatsapp && (
          <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm" className="gap-2 text-[#25D366] border-[#25D366]/30">
              <MessageCircle className="h-4 w-4" />
              واتساب
            </Button>
          </a>
        )}
        {email && (
          <a href={`mailto:${email}`}>
            <Button variant="outline" size="sm" className="gap-2">
              <Mail className="h-4 w-4" />
              بريد
            </Button>
          </a>
        )}
      </div>

      {/* Status update */}
      <div>
        <p className="text-sm font-semibold mb-2">تحديث الحالة</p>
        <div className="flex flex-wrap gap-2">
          {STATUSES.map((s) => (
            <button
              key={s.value}
              onClick={() => updateStatus(s.value)}
              disabled={updating}
              className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition ${
                current === s.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary hover:bg-secondary/70"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
        {updating && (
          <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
            <Loader2 className="h-3 w-3 animate-spin" />
            جاري التحديث...
          </p>
        )}
      </div>

      {/* Delete */}
      <div className="pt-4 border-t border-border">
        <Button
          variant="outline"
          size="sm"
          onClick={deleteQuote}
          disabled={deleting}
          className="gap-2 text-destructive border-destructive/30 hover:bg-destructive/10"
        >
          {deleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
          حذف الطلب
        </Button>
      </div>
    </div>
  );
}
