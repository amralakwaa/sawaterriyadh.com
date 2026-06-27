"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Save, ArrowRight, Star } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function TestimonialForm() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [content, setContent] = useState("");
  const [area, setArea] = useState("");
  const [rating, setRating] = useState(5);
  const [busy, setBusy] = useState(false);
  const router = useRouter();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !content) {
      toast.error("الاسم والمحتوى مطلوبان");
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/admin/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, role, content, rating, area }),
      });
      if (!res.ok) throw new Error("فشل");
      toast.success("تم إضافة الرأي بنجاح");
      router.push("/admin/testimonials");
      router.refresh();
    } catch {
      toast.error("فشل الإضافة");
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-5 max-w-2xl">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label>اسم العميل *</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="أبو عبدالله الشمري" />
        </div>
        <div className="space-y-1.5">
          <Label>الصفة / المنصب</Label>
          <Input value={role} onChange={(e) => setRole(e.target.value)} placeholder="مالك فيلا - حي النرجس" />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label>المنطقة</Label>
        <Input value={area} onChange={(e) => setArea(e.target.value)} placeholder="شمال الرياض" />
      </div>

      <div className="space-y-1.5">
        <Label>نص الرأي *</Label>
        <Textarea value={content} onChange={(e) => setContent(e.target.value)} rows={4} placeholder="ركبوا لي مظلة سيارات ممتازة، الشغل احترافي..." />
      </div>

      <div className="space-y-1.5">
        <Label>التقييم</Label>
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setRating(n)}
              className="p-1"
              aria-label={`${n} نجوم`}
            >
              <Star className={`h-8 w-8 transition ${n <= rating ? "text-accent fill-accent" : "text-muted-foreground/30"}`} />
            </button>
          ))}
          <span className="text-sm font-bold text-muted-foreground mr-2">{rating} / 5</span>
        </div>
      </div>

      <div className="flex gap-3 pt-4 border-t border-border">
        <Button type="submit" disabled={busy} className="gap-2">
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          حفظ الرأي
        </Button>
        <Link href="/admin/testimonials">
          <Button type="button" variant="outline" className="gap-2">
            <ArrowRight className="h-4 w-4" />
            إلغاء
          </Button>
        </Link>
      </div>
    </form>
  );
}
