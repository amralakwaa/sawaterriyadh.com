"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Send, CheckCircle2 } from "lucide-react";
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
import type { ServiceData } from "@/lib/content";

const quoteSchema = z.object({
  name: z.string().min(3, "الاسم مطلوب (3 أحرف على الأقل)"),
  phone: z.string().min(10, "رقم هاتف صحيح مطلوب").max(15),
  email: z.string().email("بريد إلكتروني غير صحيح").optional().or(z.literal("")),
  serviceId: z.string().optional(),
  area: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().min(10, "الرجاء وصف طلبك بمزيد من التفصيل (10 أحرف على الأقل)"),
});

type QuoteFormValues = z.infer<typeof quoteSchema>;

interface QuoteFormProps {
  services: Pick<ServiceData, "slug" | "title">[];
  areas: { slug: string; name: string }[];
  defaultService?: string;
  compact?: boolean;
}

export function QuoteForm({ services, areas, defaultService, compact }: QuoteFormProps) {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      serviceId: defaultService,
    },
  });

  const onSubmit = async (data: QuoteFormValues) => {
    try {
      const res = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("فشل الإرسال");
      setSubmitted(true);
      toast.success("تم استلام طلبك بنجاح! سنتواصل معك قريباً.");
      reset();
    } catch {
      toast.error("حدث خطأ، الرجاء المحاولة مرة أخرى أو الاتصال بنا");
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-primary/30 bg-primary/5 p-8 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <CheckCircle2 className="h-9 w-9 text-primary" />
        </div>
        <h3 className="text-xl font-bold">تم استلام طلبك بنجاح!</h3>
        <p className="text-muted-foreground max-w-sm">
          شكراً لتواصلك مع شركة الظلال الملكية. سيتواصل معك فريقنا خلال 24 ساعة عمل لتأكيد الطلب وترتيب المعاينة.
        </p>
        <Button variant="outline" onClick={() => setSubmitted(false)} className="mt-2">
          إرسال طلب آخر
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="name">
            الاسم الكامل <span className="text-destructive">*</span>
          </Label>
          <Input
            id="name"
            placeholder="اكتب اسمك"
            {...register("name")}
            aria-invalid={!!errors.name}
          />
          {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="phone">
            رقم الجوال <span className="text-destructive">*</span>
          </Label>
          <Input
            id="phone"
            type="tel"
            dir="ltr"
            placeholder="05xxxxxxxx"
            {...register("phone")}
            aria-invalid={!!errors.phone}
          />
          {errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
        </div>
      </div>

      {!compact && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="email">البريد الإلكتروني (اختياري)</Label>
            <Input
              id="email"
              type="email"
              dir="ltr"
              placeholder="example@email.com"
              {...register("email")}
            />
            {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="budget">الميزانية التقريبية (اختياري)</Label>
            <Select onValueChange={(v) => setValue("budget", v)}>
              <SelectTrigger id="budget">
                <SelectValue placeholder="اختر الميزانية" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="under-5000">أقل من 5,000 ريال</SelectItem>
                <SelectItem value="5000-15000">5,000 - 15,000 ريال</SelectItem>
                <SelectItem value="15000-50000">15,000 - 50,000 ريال</SelectItem>
                <SelectItem value="50000-150000">50,000 - 150,000 ريال</SelectItem>
                <SelectItem value="over-150000">أكثر من 150,000 ريال</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="service">الخدمة المطلوبة</Label>
          <Select
            defaultValue={defaultService}
            onValueChange={(v) => setValue("serviceId", v)}
          >
            <SelectTrigger id="service">
              <SelectValue placeholder="اختر الخدمة" />
            </SelectTrigger>
            <SelectContent>
              {services.map((s) => (
                <SelectItem key={s.slug} value={s.slug}>
                  {s.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="area">المنطقة</Label>
          <Select onValueChange={(v) => setValue("area", v)}>
            <SelectTrigger id="area">
              <SelectValue placeholder="اختر المنطقة" />
            </SelectTrigger>
            <SelectContent>
              {areas.map((a) => (
                <SelectItem key={a.slug} value={a.slug}>
                  {a.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="message">
          تفاصيل الطلب <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="message"
          rows={compact ? 3 : 4}
          placeholder="اكتب تفاصيل المشروع: المساحة، الموقع، المواد المطلوبة، أي متطلبات خاصة..."
          {...register("message")}
          aria-invalid={!!errors.message}
        />
        {errors.message && <p className="text-xs text-destructive">{errors.message.message}</p>}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-accent text-accent-foreground hover:brightness-110 text-base font-bold py-6"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            جاري الإرسال...
          </>
        ) : (
          <>
            <Send className="h-5 w-5" />
            أرسل طلب التسعير المجاني
          </>
        )}
      </Button>
      <p className="text-center text-xs text-muted-foreground">
        🔒 معلوماتك آمنة معنا ولن تشارك مع أي طرف ثالث. الرد خلال 24 ساعة.
      </p>
    </form>
  );
}
