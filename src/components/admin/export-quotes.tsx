"use client";

import { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface Quote {
  id: string;
  name: string;
  phone: string;
  email?: string | null;
  message: string;
  status: string;
  area?: string | null;
  budget?: string | null;
  service?: { title: string } | null;
  createdAt: string;
}

function escapeCSV(value: string): string {
  if (!value) return "";
  if (value.includes(",") || value.includes('"') || value.includes("\n")) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export function ExportQuotes({ quotes }: { quotes: Quote[] }) {
  const [busy, setBusy] = useState(false);

  const exportCSV = async () => {
    if (quotes.length === 0) {
      toast.error("لا توجد طلبات للتصدير");
      return;
    }
    setBusy(true);
    try {
      const headers = ["الاسم", "الهاتف", "البريد", "الخدمة", "المنطقة", "الميزانية", "الحالة", "الرسالة", "التاريخ"];
      const statusMap: Record<string, string> = {
        new: "جديد",
        contacted: "تم التواصل",
        quoted: "تم التسعير",
        won: "مكتسب",
        lost: "مفقود",
      };
      const rows = quotes.map((q) => [
        escapeCSV(q.name),
        escapeCSV(q.phone),
        escapeCSV(q.email || ""),
        escapeCSV(q.service?.title || ""),
        escapeCSV(q.area || ""),
        escapeCSV(q.budget || ""),
        escapeCSV(statusMap[q.status] || q.status),
        escapeCSV(q.message),
        escapeCSV(new Intl.DateTimeFormat("ar-SA", { dateStyle: "medium", timeStyle: "short" }).format(new Date(q.createdAt))),
      ]);

      // BOM for Arabic UTF-8 support in Excel
      const csv = "\uFEFF" + [headers.map(escapeCSV).join(","), ...rows.map((r) => r.join(","))].join("\n");
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `طلبات-التسعير-${new Date().toISOString().slice(0, 10)}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success(`تم تصدير ${quotes.length} طلب بنجاح`);
    } catch {
      toast.error("فشل التصدير");
    } finally {
      setBusy(false);
    }
  };

  return (
    <Button
      onClick={exportCSV}
      disabled={busy || quotes.length === 0}
      variant="outline"
      size="sm"
      className="gap-2"
    >
      {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
      تصدير CSV ({quotes.length})
    </Button>
  );
}
