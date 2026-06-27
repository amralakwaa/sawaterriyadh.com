"use client";

import { useState, useEffect } from "react";
import { PhoneCall, X, Loader2, CheckCircle2, Clock } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TIME_SLOTS = [
  { value: "now", label: "في أقرب وقت ممكن" },
  { value: "morning", label: "صباحاً (8 - 12)" },
  { value: "noon", label: "ظهراً (12 - 4)" },
  { value: "evening", label: "مساءً (4 - 8)" },
  { value: "night", label: "ليلاً (8 - 10)" },
];

export function CallbackWidget() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [busy, setBusy] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [time, setTime] = useState("now");
  const [showHint, setShowHint] = useState(false);

  // Show hint pulse after 8 seconds if not opened
  useEffect(() => {
    if (open) return;
    const t = setTimeout(() => setShowHint(true), 8000);
    return () => clearTimeout(t);
  }, [open]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      toast.error("الاسم ورقم الجوال مطلوبان");
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          message: `طلب اتصال فوري - الوقت المفضل: ${TIME_SLOTS.find((s) => s.value === time)?.label}`,
          serviceId: "callback",
        }),
      });
      if (!res.ok) throw new Error("failed");
      setSubmitted(true);
      toast.success("تم استلام طلبك! سنتصل بك في الوقت المحدد");
    } catch {
      toast.error("حدث خطأ، حاول مرة أخرى");
    } finally {
      setBusy(false);
    }
  };

  const reset = () => {
    setOpen(false);
    setSubmitted(false);
    setName("");
    setPhone("");
    setTime("now");
    setShowHint(false);
  };

  return (
    <>
      {/* Floating button */}
      {!open && (
        <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2">
          {showHint && (
            <div className="animate-fade-up rounded-2xl bg-card border border-border shadow-xl p-3 max-w-[220px] relative">
              <button
                onClick={() => setShowHint(false)}
                className="absolute top-1.5 left-1.5 text-muted-foreground hover:text-foreground"
                aria-label="إغلاق"
              >
                <X className="h-3.5 w-3.5" />
              </button>
              <p className="text-xs font-bold text-foreground mb-1">📞 اتصل بك مجاناً!</p>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                اترك رقمك ونتصل بك في الوقت المناسب لك
              </p>
            </div>
          )}
          <button
            onClick={() => setOpen(true)}
            className="group relative flex items-center gap-2 rounded-full bg-primary text-primary-foreground pl-4 pr-2 py-2 shadow-xl hover:scale-105 transition-transform"
            aria-label="طلب اتصال فوري"
          >
            <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20 group-hover:opacity-0" />
            <PhoneCall className="h-5 w-5" />
            <span className="text-sm font-bold hidden sm:inline">اتصل بي</span>
          </button>
        </div>
      )}

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-sm animate-fade-up" onClick={reset}>
          <div
            className="w-full sm:max-w-md bg-card rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative bg-gradient-to-br from-primary to-accent p-5 text-primary-foreground">
              <button
                onClick={reset}
                className="absolute top-3 left-3 rounded-lg p-1.5 hover:bg-background/20 transition-colors"
                aria-label="إغلاق"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-background/20 backdrop-blur-sm">
                  <PhoneCall className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold">طلب اتصال مجاني</h3>
                  <p className="text-xs opacity-90 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    نرد خلال 5 دقائق
                  </p>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="p-5">
              {submitted ? (
                <div className="text-center py-6">
                  <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-full bg-primary/10 mb-4">
                    <CheckCircle2 className="h-9 w-9 text-primary" />
                  </div>
                  <h3 className="font-display text-lg font-bold mb-2">تم استلام طلبك!</h3>
                  <p className="text-sm text-muted-foreground mb-5">
                    سيتصل بك فريقنا في الوقت المحدد. شكراً لثقتك بنا.
                  </p>
                  <Button onClick={reset} className="w-full">تم</Button>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="cb-name">الاسم *</Label>
                    <Input
                      id="cb-name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="اكتب اسمك"
                      autoFocus
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="cb-phone">رقم الجوال *</Label>
                    <Input
                      id="cb-phone"
                      type="tel"
                      dir="ltr"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="05xxxxxxxx"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label>الوقت المفضل للاتصال</Label>
                    <Select value={time} onValueChange={setTime}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {TIME_SLOTS.map((s) => (
                          <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button
                    type="submit"
                    disabled={busy}
                    className="w-full bg-accent text-accent-foreground hover:brightness-110 py-6 text-base font-bold"
                  >
                    {busy ? (
                      <><Loader2 className="h-5 w-5 animate-spin" /> جاري الإرسال...</>
                    ) : (
                      <><PhoneCall className="h-5 w-5" /> اطلب الاتصال الآن</>
                    )}
                  </Button>
                  <p className="text-center text-xs text-muted-foreground">
                    🔒 معلوماتك آمنة • بدون رسوم • رد سريع
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
