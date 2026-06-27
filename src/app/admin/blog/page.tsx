import Link from "next/link";
import Image from "next/image";
import { db } from "@/lib/db";
import { Plus, ArrowLeft } from "lucide-react";
import { DeleteButton } from "@/components/admin/delete-button";

export const metadata = { title: "المدونة - لوحة التحكم" };

export default async function AdminBlogPage() {
  let posts: any[] = [];
  try {
    posts = await db.blogPost.findMany({ orderBy: { createdAt: "desc" } });
  } catch (e) {
    console.error(e);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display text-2xl lg:text-3xl font-extrabold">المدونة</h1>
          <p className="text-muted-foreground mt-1">{posts.length} مقال</p>
        </div>
        <Link href="/admin/blog/new" className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground hover:brightness-110">
          <Plus className="h-4 w-4" />
          كتابة مقال
        </Link>
      </div>

      <div className="space-y-3">
        {posts.map((p) => (
          <div key={p.id} className="rounded-2xl border border-border bg-card p-4 flex items-center gap-4">
            <div className="relative h-16 w-16 shrink-0 rounded-lg overflow-hidden">
              {p.image && <Image src={p.image} alt={p.title} fill sizes="64px" className="object-cover" />}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-bold line-clamp-1">{p.title}</h3>
              <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{p.excerpt}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {new Intl.DateTimeFormat("ar-SA", { dateStyle: "medium" }).format(p.createdAt)} • {p.author}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Link href={`/blog/${p.slug}`} target="_blank" className="text-xs font-bold text-primary hover:text-accent flex items-center gap-1">
                عرض <ArrowLeft className="h-3 w-3" />
              </Link>
              <DeleteButton id={p.id} endpoint="blog" label={p.title} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
