import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, ArrowLeft } from "lucide-react";
import { getAreas } from "@/lib/data";
import { PageHeader } from "@/components/site/page-header";
import { CtaQuoteSection } from "@/components/sections/cta-quote";

export const metadata: Metadata = {
  title: "مناطق الخدمة | الرياض والمناطق المحيطة",
  description:
    "نخدم جميع أحياء الرياض: شمال، جنوب، شرق، غرب الرياض، بالإضافة إلى الدرعية، الخرج، الدوادمي، المجمعة، القويعية. اطلب خدمتنا في منطقتك.",
  alternates: { canonical: "/areas" },
};

export default async function AreasPage() {
  const areas = await getAreas();

  return (
    <>
      <PageHeader
        title="مناطق خدمتنا"
        subtitle="نصل إلى جميع أحياء الرياض والمناطق المحيطة بها. اختر منطقتك لمعرفة المزيد عن خدماتنا فيها"
        crumbs={[{ name: "مناطق الخدمة" }]}
      />

      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {areas.map((area) => (
              <Link
                key={area.slug}
                href={`/areas/${area.slug}`}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:shadow-lg hover:border-primary hover:-translate-y-1"
              >
                <div className="absolute -top-8 -left-8 h-32 w-32 rounded-full bg-primary/5 group-hover:bg-accent/10 transition-colors" />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                        {area.name}
                      </h3>
                      <p className="text-xs text-muted-foreground">{area.governorate}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{area.description}</p>
                  <div className="mt-4 flex items-center gap-1 text-sm font-bold text-primary group-hover:text-accent">
                    عرض الخدمات في المنطقة
                    <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaQuoteSection />
    </>
  );
}
