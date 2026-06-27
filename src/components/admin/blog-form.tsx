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
}

export function BlogForm({ services }: Props) {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [author, setAuthor] = useState("فريق التحرير");
  const [serviceId, setServiceId] = useState("");
  const [tags, setTags] = useState<string[]>([""]);
  const [busy, setBusy] = useState(false);
  const router = useRouter();

  const slugify = (s: string) =>
    s.trim().toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").slice(0, 80);

  const autoSlug = (t: string) => {
    setTitle(t);
    setSlug(slugify(t));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !slug || !content || !excerpt || !image) {
      toast.error("جميع الحقول الأساسية مطلوبة");
      return;
    }
    setBusy(true);
    try {
      const cleanTags = tags.filter((t) => t.trim());
      const res = await fetch("/api/admin/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title, slug, excerpt, content, image, author,
          serviceId: serviceId || null,
          tags: cleanTags,
        }),
      });
      if (!res.ok) throw new Error("فشل");
      toast.success("تم نشر المقال بنجاح");
      router.push("/admin/blog");
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
          <Label>عنوان المقال *</Label>
          <Input value={title} onChange={(e) => autoSlug(e.target.value)} placeholder="عنوان جذاب ومحسّن لـ SEO" />
        </div>
        <div className="space-y-1.5">
          <Label>المعرّف (slug) *</Label>
          <Input value={slug} onChange={(e) => setSlug(e.target.value)} dir="ltr" />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label>المقتطف (excerpt) *</Label>
        <Textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={2} placeholder="ملخص قصير يظهر في قائمة المقالات" />
      </div>

      <div className="space-y-1.5">
        <Label>المحتوى الكامل * (يدعم Markdown: ## للعناوين، - للنقاط)</Label>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={14}
          dir="rtl"
          className="font-mono text-sm"
          placeholder={"## عنوان رئيسي\n\nفقرة مقدمة...\n\n### عنوان فرعي\n\n- نقطة 1\n- نقطة 2"}
        />
        <p className="text-xs text-muted-foreground">💡 استخدم ## للعناوين الرئيسية و ### للفرعية و - للنقاط</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label>الصورة الرئيسية *</Label>
          <Input value={image} onChange={(e) => setImage(e.target.value)} dir="ltr" placeholder="https://..." />
        </div>
        <div className="space-y-1.5">
          <Label>الكاتب</Label>
          <Input value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label>الخدمة المرتبطة</Label>
        <Select value={serviceId} onValueChange={setServiceId}>
          <SelectTrigger><SelectValue placeholder="اختر الخدمة (اختياري)" /></SelectTrigger>
          <SelectContent>
            {services.map((s) => (
              <SelectItem key={s.id} value={s.id}>{s.title}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>الوسوم (tags)</Label>
        {tags.map((t, i) => (
          <div key={i} className="flex gap-2">
            <Input
              value={t}
              onChange={(e) => {
                const next = [...tags];
                next[i] = e.target.value;
                setTags(next);
              }}
              placeholder={`وسم ${i + 1}`}
            />
            {tags.length > 1 && (
              <Button type="button" variant="outline" size="icon" onClick={() => setTags(tags.filter((_, idx) => idx !== i))}>
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
        <Button type="button" variant="outline" size="sm" onClick={() => setTags([...tags, ""])} className="gap-1.5">
          <Plus className="h-4 w-4" />
          إضافة وسم
        </Button>
      </div>

      <div className="flex gap-3 pt-4 border-t border-border">
        <Button type="submit" disabled={busy} className="gap-2">
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          نشر المقال
        </Button>
        <Link href="/admin/blog">
          <Button type="button" variant="outline" className="gap-2">
            <ArrowRight className="h-4 w-4" />
            إلغاء
          </Button>
        </Link>
      </div>
    </form>
  );
}
