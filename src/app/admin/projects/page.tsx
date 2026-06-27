import Link from "next/link";
import Image from "next/image";
import { db } from "@/lib/db";
import { Plus, ArrowLeft, MapPin } from "lucide-react";
import { DeleteButton } from "@/components/admin/delete-button";

export const metadata = { title: "المشاريع - لوحة التحكم" };

export default async function AdminProjectsPage() {
  let projects: any[] = [];
  try {
    projects = await db.project.findMany({
      orderBy: { createdAt: "desc" },
      include: { service: true },
    });
  } catch (e) {
    console.error(e);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display text-2xl lg:text-3xl font-extrabold">المشاريع</h1>
          <p className="text-muted-foreground mt-1">{projects.length} مشروع</p>
        </div>
        <Link href="/admin/projects/new" className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground hover:brightness-110">
          <Plus className="h-4 w-4" />
          إضافة مشروع
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((p) => (
          <div key={p.id} className="rounded-2xl border border-border bg-card overflow-hidden">
            <div className="relative h-40">
              {p.image && <Image src={p.image} alt={p.title} fill sizes="33vw" className="object-cover" />}
            </div>
            <div className="p-4">
              <h3 className="font-bold mb-1 line-clamp-1">{p.title}</h3>
              <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{p.description}</p>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mb-3">
                <MapPin className="h-3 w-3" />{p.location}
              </p>
              <div className="flex items-center justify-between gap-2">
                <Link href={`/projects/${p.slug}`} target="_blank" className="text-xs font-bold text-primary hover:text-accent flex items-center gap-1">
                  عرض <ArrowLeft className="h-3 w-3" />
                </Link>
                <DeleteButton id={p.id} endpoint="projects" label={p.title} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
