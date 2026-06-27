"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Loader2, Phone, MessageCircle, Check, CheckCheck, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  id: string;
  status: string;
  priority: string;
  phone: string;
  response?: string | null;
}

export function TicketActions({ id, status, priority, phone, response }: Props) {
  const [currentStatus, setCurrentStatus] = useState(status);
  const [currentPriority, setCurrentPriority] = useState(priority);
  const [responseText, setResponseText] = useState(response || "");
  const [busy, setBusy] = useState(false);
  const router = useRouter();

  const update = async (data: any) => {
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/tickets/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      if (data.status) setCurrentStatus(data.status);
      if (data.priority) setCurrentPriority(data.priority);
      if (data.response !== undefined) setResponseText(data.response);
      toast.success("تم التحديث");
      router.refresh();
    } catch {
      toast.error("فشل التحديث");
    } finally {
      setBusy(false);
    }
  };

  const del = async () => {
    if (!confirm("حذف هذه التذكرة؟")) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/tickets/${id}`, { method: "DELETE" });
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
    <div className="space-y-3">
      {/* Quick actions */}
      <div className="flex flex-wrap items-center gap-2">
        <a href={`tel:${phone}`}><Button variant="outline" size="sm" className="gap-1.5"><Phone className="h-3.5 w-3.5" />اتصال</Button></a>
        <a href={`https://wa.me/${phone.replace(/^0/, "966")}`} target="_blank" rel="noopener noreferrer"><Button variant="outline" size="sm" className="gap-1.5 text-[#25D366] border-[#25D366]/30"><MessageCircle className="h-3.5 w-3.5" />واتساب</Button></a>
        <Button variant="outline" size="sm" onClick={() => update({ status: "in_progress" })} disabled={busy || currentStatus === "in_progress"} className="gap-1.5"><Check className="h-3.5 w-3.5" />قيد المعالجة</Button>
        <Button variant="outline" size="sm" onClick={() => update({ status: "resolved" })} disabled={busy || currentStatus === "resolved"} className="gap-1.5"><CheckCheck className="h-3.5 w-3.5" />تم الحل</Button>
        <Button variant="outline" size="sm" onClick={() => update({ status: "closed" })} disabled={busy || currentStatus === "closed"} className="gap-1.5">إغلاق</Button>
        <Button variant="outline" size="sm" onClick={del} disabled={busy} className="gap-1.5 text-destructive border-destructive/30 hover:bg-destructive/10">
          {busy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
        </Button>
      </div>

      {/* Priority + Response */}
      <div className="grid sm:grid-cols-3 gap-3">
        <div className="space-y-1.5">
          <Label className="text-xs">الأولوية</Label>
          <Select value={currentPriority} onValueChange={(v) => update({ priority: v })}>
            <SelectTrigger className="h-9 text-xs"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="low">منخفضة</SelectItem>
              <SelectItem value="normal">عادية</SelectItem>
              <SelectItem value="high">عالية</SelectItem>
              <SelectItem value="urgent">عاجلة</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="sm:col-span-2 space-y-1.5">
          <Label className="text-xs">ملاحظات الرد</Label>
          <div className="flex gap-2">
            <Textarea
              value={responseText}
              onChange={(e) => setResponseText(e.target.value)}
              rows={2}
              placeholder="ملاحظات داخلية أو ملخص الرد..."
              className="text-xs"
            />
            <Button size="sm" onClick={() => update({ response: responseText })} disabled={busy} className="shrink-0">حفظ</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
