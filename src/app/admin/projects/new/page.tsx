import { db } from "@/lib/db";
import { ProjectForm } from "@/components/admin/project-form";

export const metadata = { title: "إضافة مشروع - لوحة التحكم" };

export default async function NewProjectPage() {
  let services: any[] = [];
  let areas: any[] = [];
  try {
    [services, areas] = await Promise.all([
      db.service.findMany({ orderBy: { order: "asc" } }),
      db.serviceArea.findMany({ orderBy: { name: "asc" } }),
    ]);
  } catch (e) {
    console.error(e);
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="font-display text-2xl lg:text-3xl font-extrabold">إضافة مشروع جديد</h1>
        <p className="text-muted-foreground mt-1">أدخل تفاصيل المشروع المنجز</p>
      </div>
      <div className="rounded-2xl border border-border bg-card p-6 lg:p-8">
        <ProjectForm services={services} areas={areas} />
      </div>
    </div>
  );
}
