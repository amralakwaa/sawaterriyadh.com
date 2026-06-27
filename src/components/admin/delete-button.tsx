"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function DeleteButton({
  id,
  endpoint,
  label,
}: {
  id: string;
  endpoint: "services" | "projects" | "blog" | "areas" | "testimonials";
  label?: string;
}) {
  const [busy, setBusy] = useState(false);
  const router = useRouter();

  const del = async () => {
    const msg = label ? `حذف "${label}"؟` : "هل أنت متأكد من الحذف؟";
    if (!confirm(msg)) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/${endpoint}/${id}`, { method: "DELETE" });
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
    <Button
      variant="outline"
      size="sm"
      onClick={del}
      disabled={busy}
      className="gap-1.5 text-destructive border-destructive/30 hover:bg-destructive/10 px-2"
    >
      {busy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
    </Button>
  );
}
