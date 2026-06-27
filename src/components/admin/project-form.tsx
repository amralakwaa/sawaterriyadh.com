"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Save, ArrowRight, Plus, X } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
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

interface Props {
  services: { id: string; title: string }[];
  areas: { id: string; name: string }[];
}

export function ProjectForm({ services, areas }: Props) {
  const [gallery, setGallery] = useState<string[]>([""]);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [location, setLocation] = useState("");
  const [area, setArea] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [completedAt, setCompletedAt] = useState("");
  const [busy, setBusy] = useState(false);
  const router = useRouter();

  const autoSlug = (t: string) => {
    setTitle(t);
    if (!slug || slug === slugify(title)) {
      setSlug(slugify(t));
    }
  };

  const slugify = (s: string) =>
    s.trim().toLowerCase().replace(/[^\w\u0600-\u06FF\s-]/g, "").replace(/\s+/g, "-").slice(0, 60);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !slug || !description || !image) {
      toast.error("الحقول المطلوبة: العنوان، المعرّف، الوصف، الصورة");
      return;
    }
    setBusy(true);
    try {
      const cleanGallery = gallery.filter((g) => g.trim());
      const res = await fetch("/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title, slug, description, image,
          gallery: cleanGallery,
          location, area, serviceId: serviceId || null,
          completedAt: completedAt || null,
        }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "فشل");
      }
      toast.success("تم إنشاء المشروع بنجاح");
      router.push("/admin/projects");
      router.refresh();
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-5 max-w-3xl">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label>عنوان المشروع *</Label>
          <Input value={title} onChange={(e) => autoSlug(e.target.value)} placeholder="مثال: مظلة سيارات فيلا" />
        </div>
        <div className="space-y-1.5">
          <Label>المعرّف (slug) *</Label>
          <Input value={slug} onChange={(e) => setSlug(e.target.value)} dir="ltr" />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label>وصف المشروع *</Label>
        <Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} />
      </div>

      <div className="space-y-1.5">
        <Label>الصورة الرئيسية *</Label>
        <Input value={image} onChange={(e) => setImage(e.target.value)} dir="ltr" placeholder="https://..." />
      </div>

      <div className="space-y-2">
        <Label>معرض الصور (روابط)</Label>
        {gallery.map((g, i) => (
          <div key={i} className="flex gap-2">
            <Input
              value={g}
              onChange={(e) => {
                const next = [...gallery];
                next[i] = e.target.value;
                setGallery(next);
              }}
              dir="ltr"
              placeholder={`https://... صورة ${i + 1}`}
            />
            {gallery.length > 1 && (
              <Button type="button" variant="outline" size="icon" onClick={() => setGallery(gallery.filter((_, idx) => idx !== i))}>
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
        <Button type="button" variant="outline" size="sm" onClick={() => setGallery([...gallery, ""])} className="gap-1.5">
          <Plus className="h-4 w-4" />
          إضافة صورة
        </Button>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label>الموقع</Label>
          <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="حي النرجس - الرياض" />
        </div>
        <div className="space-y-1.5">
          <Label>تاريخ الإنجاز</Label>
          <Input type="date" value={completedAt} onChange={(e) => setCompletedAt(e.target.value)} />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label>الخدمة المرتبطة</Label>
          <Select value={serviceId} onValueChange={setServiceId}>
            <SelectTrigger><SelectValue placeholder="اختر الخدمة" /></SelectTrigger>
            <SelectContent>
              {services.map((s) => (
                <SelectItem key={s.id} value={s.id}>{s.title}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label>المنطقة</Label>
          <Select value={area} onValueChange={setArea}>
            <SelectTrigger><SelectValue placeholder="اختر المنطقة" /></SelectTrigger>
            <SelectContent>
              {areas.map((a) => (
                <SelectItem key={a.id} value={a.id}>{a.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex gap-3 pt-4 border-t border-border">
        <Button type="submit" disabled={busy} className="gap-2">
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          حفظ المشروع
        </Button>
        <Link href="/admin/projects">
          <Button type="button" variant="outline" className="gap-2">
            <ArrowRight className="h-4 w-4" />
            إلغاء
          </Button>
        </Link>
      </div>
    </form>
  );
}
