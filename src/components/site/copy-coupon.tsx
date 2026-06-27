"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";

export function CopyCoupon({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      toast.success("تم نسخ كود الخصم!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("تعذّر النسخ، انسخ الكود يدوياً");
    }
  };

  return (
    <button
      onClick={copy}
      className="group flex w-full items-center justify-between gap-2 rounded-xl border-2 border-dashed border-primary/40 bg-primary/5 px-4 py-3 hover:border-primary hover:bg-primary/10 transition-colors"
      aria-label={`نسخ كود ${code}`}
    >
      <div className="flex items-center gap-2">
        <span className="text-xs font-bold text-muted-foreground">كود الخصم:</span>
        <span className="font-mono font-bold text-primary text-base tracking-wider" dir="ltr">{code}</span>
      </div>
      <div className={`flex h-7 w-7 items-center justify-center rounded-lg transition-colors ${
        copied ? "bg-green-100 text-green-600" : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground"
      }`}>
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </div>
    </button>
  );
}
