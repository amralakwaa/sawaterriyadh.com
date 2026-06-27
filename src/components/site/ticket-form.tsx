"use client";

import { useState } from "react";
import { Loader2, Send, CheckCircle2, Ticket } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Category {
  value: string;
  label: string;
}

interface Props {
  categories: Category[];
}

export function TicketForm({ categories }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState("");
  const [busy, setBusy] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState("general");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !subject || !message) {
      toast.error("جميع الحقول المطلوبة يجب إكمالها");
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email, subject, message, category }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "فشل");
      setTicketId(data.ticketId);
      setSubmitted(true);
      toast.success("تم إنشاء تذكرة الدعم بنجاح!");
    } catch (e: any) {
      toast.error(e.message || "فشل الإرسال");
    } finally {
      setBusy(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-primary/30 bg-primary/5 p-8 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <CheckCircle2 className="h-9 w-9 text-primary" />
        </div>
        <h3 className="font-display text-xl font-bold">تم استلام تذكرتك! 🎉</h3>
        <p className="text-muted-foreground max-w-md text-sm">
          شكراً لك {name}. رقم تذكرتك هو:
        </p>
        <div className="flex items-center gap-2 rounded-xl bg-background border-2 border-dashed border-primary/40 px-5 py-3">
          <Ticket className="h-5 w-5 text-primary" />
          <span className="font-mono font-bold text-primary text-xl tracking-wider" dir="ltr">{ticketId}</span>
        </div>
        <p className="text-xs text-muted-foreground max-w-sm">
          احتفظ بهذا الرقم لتتبع حالة تذكرتك. سيتواصل معك فريقنا خلال 24 ساعة عمل.
        </p>
        <Button variant="outline" onClick={() => { setSubmitted(false); setName(""); setPhone(""); setSubject(""); setMessage(""); }}>
          إرسال تذكرة أخرى
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="t-name">الاسم الكامل *</Label>
          <Input id="t-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="اكتب اسمك" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="t-phone">رقم الجوال *</Label>
          <Input id="t-phone" type="tel" dir="ltr" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="05xxxxxxxx" />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="t-email">البريد الإلكتروني (اختياري)</Label>
          <Input id="t-email" type="email" dir="ltr" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="example@email.com" />
        </div>
        <div className="space-y-1.5">
          <Label>نوع الطلب</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {categories.map((c) => (
                <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="t-subject">الموضوع *</Label>
        <Input id="t-subject" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="عنوان مختصر لمشكلتك" />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="t-message">الرسالة *</Label>
        <Textarea
          id="t-message"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="اشرح مشكلتك أو استفسارك بالتفصيل..."
        />
      </div>

      <Button type="submit" disabled={busy} className="w-full bg-primary py-6 text-base font-bold">
        {busy ? (
          <><Loader2 className="h-5 w-5 animate-spin" /> جاري الإرسال...</>
        ) : (
          <><Send className="h-5 w-5" /> إرسال التذكرة</>
        )}
      </Button>
      <p className="text-center text-xs text-muted-foreground">
        🔒 ستحصل على رقم تذكرة فور الإرسال • رد خلال 24 ساعة
      </p>
    </form>
  );
}
