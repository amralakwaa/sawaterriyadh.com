import { db } from "@/lib/db";
import { BlogForm } from "@/components/admin/blog-form";

export const metadata = { title: "كتابة مقال - لوحة التحكم" };

export default async function NewBlogPage() {
  let services: any[] = [];
  try {
    services = await db.service.findMany({ orderBy: { order: "asc" } });
  } catch (e) {
    console.error(e);
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="font-display text-2xl lg:text-3xl font-extrabold">كتابة مقال جديد</h1>
        <p className="text-muted-foreground mt-1">أنشئ مقالاً جديداً للمدونة</p>
      </div>
      <div className="rounded-2xl border border-border bg-card p-6 lg:p-8">
        <BlogForm services={services} />
      </div>
    </div>
  );
}
