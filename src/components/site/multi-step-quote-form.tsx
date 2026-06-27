"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Check, ChevronLeft, ChevronRight, User, Phone, Wrench, MessageSquare, CheckCircle2, Sparkles } from "lucide-react";
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

interface Service { slug: string; title: string; }
interface Area { slug: string; name: string; }

interface Props {
  services: Service[];
  areas: Area[];
  defaultService?: string;
}

const STEPS = [
  { id: 1, label: "الخدمة", icon: Wrench },
  { id: 2, label: "بياناتك", icon: User },
  { id: 3, label: "التفاصيل", icon: MessageSquare },
  { id: 4, label: "تأكيد", icon: CheckCircle2 },
];

const BUDGET_OPTIONS = [
  { value: "under-5000", label: "أقل من 5,000 ريال" },
  { value: "5000-15000", label: "5,000 - 15,000 ريال" },
  { value: "15000-50000", label: "15,000 - 50,000 ريال" },
  { value: "50000-150000", label: "50,000 - 150,000 ريال" },
  { value: "over-150000", label: "أكثر من 150,000 ريال" },
];

const TIMEFRAME_OPTIONS = [
  { value: "urgent", label: "عاجل (خلال أسبوع)" },
  { value: "month", label: "خلال شهر" },
  { value: "quarter", label: "خلال 3 أشهر" },
  { value: "planning", label: "أخطط فقط" },
];

export function MultiStepQuoteForm({ services, areas, defaultService }: Props) {
  const [step, setStep] = useState(1);
  const [busy, setBusy] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  // Form data
  const [serviceSlug, setServiceSlug] = useState(defaultService || "");
  const [area, setArea] = useState("");
  const [budget, setBudget] = useState("");
  const [timeframe, setTimeframe] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const canProceed = () => {
    if (step === 1) return !!serviceSlug;
    if (step === 2) return name.length >= 3 && phone.length >= 10;
    if (step === 3) return message.length >= 10;
    return true;
  };

  const next = () => {
    if (!canProceed()) {
      toast.error("يرجى إكمال الحقول المطلوبة");
      return;
    }
    setStep((s) => Math.min(s + 1, 4));
  };

  const back = () => setStep((s) => Math.max(s - 1, 1));

  const submit = async () => {
    setBusy(true);
    try {
      const res = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name, phone, email,
          serviceId: serviceSlug,
          area,
          budget,
          message: `${message}${timeframe ? `\n\nالإطار الزمني: ${TIMEFRAME_OPTIONS.find(t => t.value === timeframe)?.label}` : ""}`,
        }),
      });
      if (!res.ok) throw new Error("failed");
      setSubmitted(true);
      toast.success("تم استلام طلبك بنجاح!");
    } catch {
      toast.error("حدث خطأ، حاول مرة أخرى");
    } finally {
      setBusy(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-primary/30 bg-primary/5 p-8 lg:p-12 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          <CheckCircle2 className="h-11 w-11 text-primary" />
        </div>
        <h3 className="font-display text-2xl font-extrabold">تم استلام طلبك بنجاح! 🎉</h3>
        <p className="text-muted-foreground max-w-md leading-relaxed">
          شكراً لك {name}. سيتواصل معك فريقنا خلال 24 ساعة عمل لتأكيد الطلب وترتيب المعاينة المجانية.
        </p>
        <div className="flex flex-wrap gap-2 justify-center mt-2">
          <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold">
            ✅ الطلب: {services.find(s => s.slug === serviceSlug)?.title}
          </span>
          <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold">
            📞 الرد خلال 24 ساعة
          </span>
          <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold">
            🆓 معاينة مجانية
          </span>
        </div>
        <Button variant="outline" onClick={() => { setSubmitted(false); setStep(1); }} className="mt-3">
          إرسال طلب آخر
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress steps */}
      <div className="flex items-center justify-between relative">
        {/* Progress line */}
        <div className="absolute top-5 right-0 left-0 h-0.5 bg-border" />
        <div
          className="absolute top-5 right-0 h-0.5 bg-primary transition-all duration-500"
          style={{ width: `${((step - 1) / (STEPS.length - 1)) * 100}%` }}
        />
        {STEPS.map((s) => {
          const isActive = step === s.id;
          const isDone = step > s.id;
          return (
            <div key={s.id} className="relative z-10 flex flex-col items-center gap-1.5">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all ${
                  isDone
                    ? "bg-primary border-primary text-primary-foreground"
                    : isActive
                    ? "bg-background border-primary text-primary scale-110 shadow-lg shadow-primary/20"
                    : "bg-background border-border text-muted-foreground"
                }`}
              >
                {isDone ? <Check className="h-5 w-5" /> : <s.icon className="h-4 w-4" />}
              </div>
              <span className={`text-[10px] font-bold ${isActive ? "text-primary" : isDone ? "text-foreground" : "text-muted-foreground"}`}>
                {s.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Step content */}
      <div className="min-h-[280px]">
        {/* Step 1: Service selection */}
        {step === 1 && (
          <div className="space-y-5 animate-fade-up">
            <div>
              <h3 className="font-display text-lg font-bold mb-1">ما هي الخدمة التي تحتاجها؟</h3>
              <p className="text-sm text-muted-foreground">اختر الخدمة المطلوبة للمتابعة</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-2.5">
              {services.map((s) => (
                <button
                  key={s.slug}
                  onClick={() => setServiceSlug(s.slug)}
                  className={`flex items-center justify-between gap-2 rounded-xl border-2 p-3.5 text-right transition-all ${
                    serviceSlug === s.slug
                      ? "border-primary bg-primary/5 shadow-md"
                      : "border-border hover:border-primary/40"
                  }`}
                >
                  <span className="font-bold text-sm">{s.title}</span>
                  <div className={`flex h-5 w-5 items-center justify-center rounded-full border-2 shrink-0 ${
                    serviceSlug === s.slug ? "border-primary bg-primary text-primary-foreground" : "border-border"
                  }`}>
                    {serviceSlug === s.slug && <Check className="h-3 w-3" />}
                  </div>
                </button>
              ))}
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>المنطقة</Label>
                <Select value={area} onValueChange={setArea}>
                  <SelectTrigger><SelectValue placeholder="اختر المنطقة" /></SelectTrigger>
                  <SelectContent>
                    {areas.map((a) => (
                      <SelectItem key={a.slug} value={a.slug}>{a.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>الميزانية التقريبية</Label>
                <Select value={budget} onValueChange={setBudget}>
                  <SelectTrigger><SelectValue placeholder="اختر الميزانية" /></SelectTrigger>
                  <SelectContent>
                    {BUDGET_OPTIONS.map((b) => (
                      <SelectItem key={b.value} value={b.value}>{b.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Contact info */}
        {step === 2 && (
          <div className="space-y-5 animate-fade-up">
            <div>
              <h3 className="font-display text-lg font-bold mb-1">كيف نتواصل معك؟</h3>
              <p className="text-sm text-muted-foreground">أدخل بياناتك للتواصل معك خلال 24 ساعة</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>الاسم الكامل *</Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="اكتب اسمك" className="h-12" />
                {name.length > 0 && name.length < 3 && (
                  <p className="text-xs text-destructive">الاسم قصير جداً</p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label>رقم الجوال *</Label>
                <Input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" dir="ltr" placeholder="05xxxxxxxx" className="h-12" />
                {phone.length > 0 && phone.length < 10 && (
                  <p className="text-xs text-destructive">رقم غير صحيح</p>
                )}
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>البريد الإلكتروني (اختياري)</Label>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" dir="ltr" placeholder="example@email.com" className="h-12" />
            </div>
            <div className="rounded-xl bg-secondary/50 p-4 flex items-start gap-3">
              <Sparkles className="h-5 w-5 text-accent shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground">
                🔒 معلوماتك آمنة معنا ولن تُشارك مع أي طرف ثالث. نلتزم بحماية خصوصيتك.
              </p>
            </div>
          </div>
        )}

        {/* Step 3: Details */}
        {step === 3 && (
          <div className="space-y-5 animate-fade-up">
            <div>
              <h3 className="font-display text-lg font-bold mb-1">أخبرنا عن مشروعك</h3>
              <p className="text-sm text-muted-foreground">كلما زادت التفاصيل، كان تسعيرنا أدق</p>
            </div>
            <div className="space-y-1.5">
              <Label>وصف المشروع *</Label>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                placeholder="مثال: أرغب في تركيب مظلة سيارات بمساحة 50 م² في حي النرجس، مع إضاءة LED وعزل حراري..."
              />
              <div className="flex items-center justify-between text-xs">
                <span className={message.length < 10 ? "text-muted-foreground" : "text-green-600"}>
                  {message.length >= 10 ? "✓ تفاصيل كافية" : `${10 - message.length} حرف على الأقل`}
                </span>
                <span className="text-muted-foreground">{message.length}/500</span>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>الإطار الزمني (اختياري)</Label>
              <Select value={timeframe} onValueChange={setTimeframe}>
                <SelectTrigger><SelectValue placeholder="متى تريد تنفيذ المشروع؟" /></SelectTrigger>
                <SelectContent>
                  {TIMEFRAME_OPTIONS.map((t) => (
                    <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {/* Step 4: Review */}
        {step === 4 && (
          <div className="space-y-5 animate-fade-up">
            <div>
              <h3 className="font-display text-lg font-bold mb-1">راجع طلبك</h3>
              <p className="text-sm text-muted-foreground">تأكد من البيانات قبل الإرسال</p>
            </div>
            <div className="rounded-xl border border-border divide-y">
              <div className="flex items-start justify-between gap-3 p-4">
                <span className="text-sm text-muted-foreground shrink-0">الخدمة</span>
                <span className="text-sm font-bold text-left">
                  {services.find(s => s.slug === serviceSlug)?.title || "—"}
                </span>
              </div>
              <div className="flex items-start justify-between gap-3 p-4">
                <span className="text-sm text-muted-foreground shrink-0">المنطقة</span>
                <span className="text-sm font-bold">{areas.find(a => a.slug === area)?.name || "—"}</span>
              </div>
              <div className="flex items-start justify-between gap-3 p-4">
                <span className="text-sm text-muted-foreground shrink-0">الميزانية</span>
                <span className="text-sm font-bold">{BUDGET_OPTIONS.find(b => b.value === budget)?.label || "—"}</span>
              </div>
              <div className="flex items-start justify-between gap-3 p-4">
                <span className="text-sm text-muted-foreground shrink-0">الاسم</span>
                <span className="text-sm font-bold">{name}</span>
              </div>
              <div className="flex items-start justify-between gap-3 p-4">
                <span className="text-sm text-muted-foreground shrink-0">الجوال</span>
                <span className="text-sm font-bold" dir="ltr">{phone}</span>
              </div>
              {email && (
                <div className="flex items-start justify-between gap-3 p-4">
                  <span className="text-sm text-muted-foreground shrink-0">البريد</span>
                  <span className="text-sm font-bold" dir="ltr">{email}</span>
                </div>
              )}
              {timeframe && (
                <div className="flex items-start justify-between gap-3 p-4">
                  <span className="text-sm text-muted-foreground shrink-0">الإطار الزمني</span>
                  <span className="text-sm font-bold">{TIMEFRAME_OPTIONS.find(t => t.value === timeframe)?.label}</span>
                </div>
              )}
              <div className="p-4">
                <span className="text-sm text-muted-foreground block mb-1">تفاصيل المشروع</span>
                <p className="text-sm font-medium leading-relaxed">{message}</p>
              </div>
            </div>
            <div className="rounded-xl bg-accent/10 border border-accent/20 p-4 flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
              <div className="text-xs">
                <p className="font-bold text-foreground">جاهز للإرسال!</p>
                <p className="text-muted-foreground mt-0.5">سيتواصل معك فريقنا خلال 24 ساعة بعرض سعر تفصيلي</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation buttons */}
      <div className="flex items-center justify-between gap-3 pt-4 border-t border-border">
        {step > 1 ? (
          <Button variant="outline" onClick={back} className="gap-1.5">
            <ChevronRight className="h-4 w-4" />
            السابق
          </Button>
        ) : (
          <span />
        )}
        {step < 4 ? (
          <Button onClick={next} disabled={!canProceed()} className="gap-1.5 bg-accent text-accent-foreground hover:brightness-110">
            التالي
            <ChevronLeft className="h-4 w-4" />
          </Button>
        ) : (
          <Button onClick={submit} disabled={busy} className="gap-2 bg-primary">
            {busy ? <Loader2 className="h-5 w-5 animate-spin" /> : <Check className="h-5 w-5" />}
            إرسال الطلب
          </Button>
        )}
      </div>
    </div>
  );
}
