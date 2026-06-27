"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Loader2, Phone, MessageCircle, Mail, Check, CheckCheck } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function MessageActions({
  id,
  status,
  phone,
  email,
}: {
  id: string;
  status: string;
  phone: string;
  email?: string | null;
}) {
  const [current, setCurrent] = useState(status);
  const [busy, setBusy] = useState(false);
  const router = useRouter();

  const update = async (newStatus: string) => {
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/messages/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error();
      setCurrent(newStatus);
      toast.success("تم التحديث");
      router.refresh();
    } catch {
      toast.error("فشل التحديث");
    } finally {
      setBusy(false);
    }
  };

  const del = async () => {
    if (!confirm("حذف هذه الرسالة؟")) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/messages/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      toast.success("تم الحذف");
      router.refresh();
    } catch {
      toast.error("فشل الحذف");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <a href={`tel:${phone}`}><Button variant="outline" size="sm" className="gap-1.5"><Phone className="h-3.5 w-3.5" />اتصال</Button></a>
      <a href={`https://wa.me/${phone.replace(/^0/, "966")}`} target="_blank" rel="noopener noreferrer"><Button variant="outline" size="sm" className="gap-1.5 text-[#25D366] border-[#25D366]/30"><MessageCircle className="h-3.5 w-3.5" />واتساب</Button></a>
      {email && <a href={`mailto:${email}`}><Button variant="outline" size="sm" className="gap-1.5"><Mail className="h-3.5 w-3.5" />بريد</Button></a>}
      <Button variant="outline" size="sm" onClick={() => update("read")} disabled={busy || current === "read"} className="gap-1.5"><Check className="h-3.5 w-3.5" />مقروء</Button>
      <Button variant="outline" size="sm" onClick={() => update("replied")} disabled={busy || current === "replied"} className="gap-1.5"><CheckCheck className="h-3.5 w-3.5" />تم الرد</Button>
      <Button variant="outline" size="sm" onClick={del} disabled={busy} className="gap-1.5 text-destructive border-destructive/30 hover:bg-destructive/10">
        {busy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
      </Button>
    </div>
  );
}
