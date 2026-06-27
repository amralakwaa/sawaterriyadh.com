import { TestimonialForm } from "@/components/admin/testimonial-form";

export const metadata = { title: "إضافة رأي - لوحة التحكم" };

export default function NewTestimonialPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="font-display text-2xl lg:text-3xl font-extrabold">إضافة رأي عميل</h1>
        <p className="text-muted-foreground mt-1">أضف رأياً جديداً لعملائنا</p>
      </div>
      <div className="rounded-2xl border border-border bg-card p-6 lg:p-8">
        <TestimonialForm />
      </div>
    </div>
  );
}
