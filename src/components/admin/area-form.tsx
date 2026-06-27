"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Save, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export function AreaForm() {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [governorate, setGovernorate] = useState("الرياض");
  const [description, setDescription] = useState("");
  const [featured, setFeatured] = useState(false);
  const [busy, setBusy] = useState(false);
  const router = useRouter();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !slug) {
      toast.error("الاسم والـ slug مطلوبان");
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/admin/areas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, slug, governorate, description, featured }),
      });
      if (!res.ok) throw new Error("فشل");
      toast.success("تم إضافة المنطقة");
      router.push("/admin/areas");
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
          <Label>اسم المنطقة *</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="شمال الرياض" />
        </div>
        <div className="space-y-1.5">
          <Label>المعرّف (slug) *</Label>
          <Input value={slug} onChange={(e) => setSlug(e.target.value)} dir="ltr" placeholder="riyadh-north" />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label>المحافظة</Label>
        <Input value={governorate} onChange={(e) => setGovernorate(e.target.value)} placeholder="الرياض" />
      </div>

      <div className="space-y-1.5">
        <Label>الوصف</Label>
        <Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} placeholder="وصف المنطقة والخدمات المتوفرة فيها" />
      </div>

      <div className="flex items-center gap-3 rounded-lg border border-border p-4">
        <Switch checked={featured} onCheckedChange={setFeatured} id="area-featured" />
        <Label htmlFor="area-featured" className="cursor-pointer">منطقة مميزة (تظهر في الصفحة الرئيسية)</Label>
      </div>

      <div className="flex gap-3 pt-4 border-t border-border">
        <Button type="submit" disabled={busy} className="gap-2">
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          حفظ المنطقة
        </Button>
        <Link href="/admin/areas">
          <Button type="button" variant="outline" className="gap-2">
            <ArrowRight className="h-4 w-4" />
            إلغاء
          </Button>
        </Link>
      </div>
    </form>
  );
}
