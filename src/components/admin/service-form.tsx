"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Save, ArrowRight, Plus, X } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const schema = z.object({
  title: z.string().min(3, "العنوان مطلوب"),
  slug: z.string().min(3, "الـ slug مطلوب").regex(/^[a-z0-9-]+$/, "أحرف صغيرة وأرقام وشرطات فقط"),
  shortDesc: z.string().min(10, "وصف مختصر مطلوب"),
  description: z.string().min(20, "وصف تفصيلي مطلوب"),
  icon: z.string(),
  image: z.string().url("رابط صورة صحيح مطلوب"),
  priceFrom: z.string().optional(),
  featured: z.boolean(),
  order: z.number().optional(),
});

type FormValues = z.infer<typeof schema>;

const ICONS = [
  { value: "car", label: "سيارة" },
  { value: "trees", label: "أشجار" },
  { value: "waves", label: "أمواج" },
  { value: "shield", label: "درع" },
  { value: "hammer", label: "مطرقة" },
  { value: "door", label: "باب" },
  { value: "factory", label: "مصنع" },
  { value: "grid", label: "شبكة" },
];

export function ServiceForm() {
  const [features, setFeatures] = useState<string[]>([""]);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { icon: "car", featured: false, order: 0 },
  });

  const featured = watch("featured");

  const onSubmit = async (data: FormValues) => {
    const cleanFeatures = features.filter((f) => f.trim().length > 0);
    try {
      const res = await fetch("/api/admin/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, features: cleanFeatures }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "فشل الإنشاء");
      }
      toast.success("تم إنشاء الخدمة بنجاح");
      router.push("/admin/services");
      router.refresh();
    } catch (e: any) {
      toast.error(e.message || "فشل الإنشاء");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 max-w-3xl">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label>عنوان الخدمة *</Label>
          <Input {...register("title")} placeholder="مثال: مظلات السيارات" />
          {errors.title && <p className="text-xs text-destructive">{errors.title.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label>المعرّف (slug) *</Label>
          <Input {...register("slug")} dir="ltr" placeholder="mawllat-siyarat" />
          {errors.slug && <p className="text-xs text-destructive">{errors.slug.message}</p>}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label>الوصف المختصر *</Label>
        <Textarea {...register("shortDesc")} rows={2} placeholder="وصف قصير يظهر في بطاقة الخدمة" />
        {errors.shortDesc && <p className="text-xs text-destructive">{errors.shortDesc.message}</p>}
      </div>

      <div className="space-y-1.5">
        <Label>الوصف التفصيلي *</Label>
        <Textarea {...register("description")} rows={4} placeholder="وصف تفصيلي للخدمة" />
        {errors.description && <p className="text-xs text-destructive">{errors.description.message}</p>}
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <div className="space-y-1.5">
          <Label>الأيقونة</Label>
          <Select onValueChange={(v) => setValue("icon", v)} defaultValue="car">
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {ICONS.map((i) => (
                <SelectItem key={i.value} value={i.value}>{i.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label>السعر يبدأ من</Label>
          <Input {...register("priceFrom")} placeholder="150 ريال/م2" />
        </div>
        <div className="space-y-1.5">
          <Label>الترتيب</Label>
          <Input type="number" {...register("order", { valueAsNumber: true })} placeholder="0" />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label>رابط الصورة *</Label>
        <Input {...register("image")} dir="ltr" placeholder="https://..." />
        {errors.image && <p className="text-xs text-destructive">{errors.image.message}</p>}
      </div>

      {/* Features */}
      <div className="space-y-2">
        <Label>مميزات الخدمة</Label>
        {features.map((f, i) => (
          <div key={i} className="flex gap-2">
            <Input
              value={f}
              onChange={(e) => {
                const next = [...features];
                next[i] = e.target.value;
                setFeatures(next);
              }}
              placeholder={`الميزة ${i + 1}`}
            />
            {features.length > 1 && (
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => setFeatures(features.filter((_, idx) => idx !== i))}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setFeatures([...features, ""])}
          className="gap-1.5"
        >
          <Plus className="h-4 w-4" />
          إضافة ميزة
        </Button>
      </div>

      <div className="flex items-center gap-3 rounded-lg border border-border p-4">
        <Switch checked={featured} onCheckedChange={(c) => setValue("featured", c)} id="featured" />
        <Label htmlFor="featured" className="cursor-pointer">
          خدمة مميزة (تظهر في الصفحة الرئيسية)
        </Label>
      </div>

      <div className="flex gap-3 pt-4 border-t border-border">
        <Button type="submit" disabled={isSubmitting} className="gap-2">
          {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          حفظ الخدمة
        </Button>
        <Link href="/admin/services">
          <Button type="button" variant="outline" className="gap-2">
            <ArrowRight className="h-4 w-4" />
            إلغاء
          </Button>
        </Link>
      </div>
    </form>
  );
}
