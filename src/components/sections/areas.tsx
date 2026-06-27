import Link from "next/link";
import { MapPin, ArrowLeft } from "lucide-react";
import { getAreas } from "@/lib/data";
import { SectionHeading } from "./section-heading";

export async function AreasSection() {
  const areas = await getAreas();
  const featured = areas.filter((a) => a.featured);

  return (
    <section className="py-16 lg:py-24 bg-secondary/40" id="areas">
      <div className="container mx-auto px-4">
        <SectionHeading
          eyebrow="مناطق الخدمة"
          title="نخدمكم في جميع أحياء الرياض"
          subtitle="فريقنا جاهز للوصول إلى موقعك في أي حي من أحياء الرياض والمناطق المحيطة"
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mt-12">
          {featured.map((area) => (
            <Link
              key={area.slug}
              href={`/areas/${area.slug}`}
              className="group flex items-center gap-2 rounded-xl border border-border bg-card p-4 transition-all hover:border-primary hover:shadow-md hover:-translate-y-0.5"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <MapPin className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="font-bold text-sm text-foreground truncate">{area.name}</p>
                <p className="text-xs text-muted-foreground truncate">{area.governorate}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/areas"
            className="inline-flex items-center gap-2 rounded-xl border-2 border-primary px-6 py-3 text-sm font-bold text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            عرض جميع المناطق
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
