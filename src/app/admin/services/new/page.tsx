import { ServiceForm } from "@/components/admin/service-form";

export const metadata = { title: "إضافة خدمة - لوحة التحكم" };

export default function NewServicePage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="font-display text-2xl lg:text-3xl font-extrabold">إضافة خدمة جديدة</h1>
        <p className="text-muted-foreground mt-1">أدخل تفاصيل الخدمة الجديدة</p>
      </div>
      <div className="rounded-2xl border border-border bg-card p-6 lg:p-8">
        <ServiceForm />
      </div>
    </div>
  );
}
