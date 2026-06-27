import { db } from "@/lib/db";
import { Star } from "lucide-react";
import { DeleteButton } from "@/components/admin/delete-button";

export const metadata = { title: "آراء العملاء - لوحة التحكم" };

export default async function AdminTestimonialsPage() {
  let testimonials: any[] = [];
  try {
    testimonials = await db.testimonial.findMany({ orderBy: { createdAt: "desc" } });
  } catch (e) {
    console.error(e);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl lg:text-3xl font-extrabold">آراء العملاء</h1>
        <p className="text-muted-foreground mt-1">{testimonials.length} رأي</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {testimonials.map((t) => (
          <div key={t.id} className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground font-bold">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold">{t.name}</h3>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
              <DeleteButton id={t.id} endpoint="testimonials" label={t.name} />
            </div>
            <div className="flex items-center gap-0.5 mb-2">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 text-accent fill-accent" />
              ))}
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{t.content}</p>
            {t.area && <p className="text-xs text-muted-foreground mt-2">{t.area}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
