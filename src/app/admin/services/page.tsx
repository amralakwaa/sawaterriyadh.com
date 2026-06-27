import Link from "next/link";
import Image from "next/image";
import { db } from "@/lib/db";
import { Plus, ArrowLeft, Star } from "lucide-react";
import { DeleteButton } from "@/components/admin/delete-button";

export const metadata = { title: "الخدمات - لوحة التحكم" };

export default async function AdminServicesPage() {
  let services: any[] = [];
  try {
    services = await db.service.findMany({ orderBy: { order: "asc" } });
  } catch (e) {
    console.error(e);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display text-2xl lg:text-3xl font-extrabold">الخدمات</h1>
          <p className="text-muted-foreground mt-1">{services.length} خدمة</p>
        </div>
        <Link href="/admin/services/new" className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground hover:brightness-110">
          <Plus className="h-4 w-4" />
          إضافة خدمة
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((s) => (
          <div key={s.id} className="rounded-2xl border border-border bg-card overflow-hidden">
            <div className="relative h-40">
              {s.image && (
                <Image src={s.image} alt={s.title} fill sizes="33vw" className="object-cover" />
              )}
              {s.featured && (
                <span className="absolute top-2 right-2 flex items-center gap-1 rounded-full bg-accent px-2 py-0.5 text-xs font-bold text-accent-foreground">
                  <Star className="h-3 w-3 fill-accent-foreground" />
                  مميز
                </span>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-bold mb-1">{s.title}</h3>
              <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{s.shortDesc}</p>
              <div className="flex items-center justify-between gap-2">
                <Link href={`/services/${s.slug}`} target="_blank" className="text-xs font-bold text-primary hover:text-accent flex items-center gap-1">
                  عرض <ArrowLeft className="h-3 w-3" />
                </Link>
                <DeleteButton id={s.id} endpoint="services" label={s.title} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
