import Link from "next/link";
import { db } from "@/lib/db";
import { Plus, MapPin } from "lucide-react";
import { DeleteButton } from "@/components/admin/delete-button";

export const metadata = { title: "المناطق - لوحة التحكم" };

export default async function AdminAreasPage() {
  let areas: any[] = [];
  try {
    areas = await db.serviceArea.findMany({ orderBy: { name: "asc" } });
  } catch (e) {
    console.error(e);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display text-2xl lg:text-3xl font-extrabold">مناطق الخدمة</h1>
          <p className="text-muted-foreground mt-1">{areas.length} منطقة</p>
        </div>
        <Link href="/admin/areas/new" className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground hover:brightness-110">
          <Plus className="h-4 w-4" />
          إضافة منطقة
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {areas.map((a) => (
          <div key={a.id} className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold">{a.name}</h3>
                  <p className="text-xs text-muted-foreground">{a.governorate}</p>
                </div>
              </div>
              <DeleteButton id={a.id} endpoint="areas" label={a.name} />
            </div>
            <p className="text-xs text-muted-foreground mt-3 line-clamp-2">{a.description}</p>
            <Link href={`/areas/${a.slug}`} target="_blank" className="text-xs font-bold text-primary hover:text-accent mt-3 inline-block">
              عرض الصفحة →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
