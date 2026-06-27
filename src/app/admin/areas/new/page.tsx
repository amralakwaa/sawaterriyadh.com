import { AreaForm } from "@/components/admin/area-form";

export const metadata = { title: "إضافة منطقة - لوحة التحكم" };

export default function NewAreaPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="font-display text-2xl lg:text-3xl font-extrabold">إضافة منطقة خدمة</h1>
        <p className="text-muted-foreground mt-1">أضف منطقة جديدة نخدمها</p>
      </div>
      <div className="rounded-2xl border border-border bg-card p-6 lg:p-8">
        <AreaForm />
      </div>
    </div>
  );
}
