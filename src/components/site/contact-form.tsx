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

const schema = z.object({
  name: z.string().min(3, "الاسم مطلوب"),
  phone: z.string().min(10, "رقم هاتف صحيح مطلوب"),
  email: z.string().email("بريد غير صحيح").optional().or(z.literal("")),
  subject: z.string().optional(),
  message: z.string().min(10, "الرسالة قصيرة جداً"),
});

type FormValues = z.infer<typeof schema>;

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("failed");
      setSubmitted(true);
      toast.success("تم إرسال رسالتك بنجاح!");
      reset();
    } catch {
      toast.error("حدث خطأ، حاول مرة أخرى");
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-primary/30 bg-primary/5 p-8 text-center">
        <CheckCircle2 className="h-12 w-12 text-primary" />
        <h3 className="text-lg font-bold">تم الإرسال بنجاح!</h3>
        <p className="text-sm text-muted-foreground">سنتواصل معك في أقرب وقت ممكن</p>
        <Button variant="outline" onClick={() => setSubmitted(false)}>إرسال رسالة أخرى</Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="c-name">الاسم <span className="text-destructive">*</span></Label>
          <Input id="c-name" placeholder="اسمك الكامل" {...register("name")} />
          {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="c-phone">الجوال <span className="text-destructive">*</span></Label>
          <Input id="c-phone" type="tel" dir="ltr" placeholder="05xxxxxxxx" {...register("phone")} />
          {errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="c-email">البريد الإلكتروني</Label>
          <Input id="c-email" type="email" dir="ltr" placeholder="example@email.com" {...register("email")} />
          {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="c-subject">الموضوع</Label>
          <Input id="c-subject" placeholder="موضوع الرسالة" {...register("subject")} />
        </div>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="c-message">الرسالة <span className="text-destructive">*</span></Label>
        <Textarea id="c-message" rows={5} placeholder="اكتب رسالتك هنا..." {...register("message")} />
        {errors.message && <p className="text-xs text-destructive">{errors.message.message}</p>}
      </div>
      <Button type="submit" disabled={isSubmitting} className="w-full bg-primary py-6 text-base font-bold">
        {isSubmitting ? (
          <><Loader2 className="h-5 w-5 animate-spin" /> جاري الإرسال...</>
        ) : (
          <><Send className="h-5 w-5" /> إرسال الرسالة</>
        )}
      </Button>
    </form>
  );
}
