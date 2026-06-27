import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Check } from "lucide-react";
import { getServices, getFAQs } from "@/lib/data";
import { PageHeader } from "@/components/site/page-header";
import { Icon } from "@/components/site/icon";
import { CtaQuoteSection } from "@/components/sections/cta-quote";
import { FaqSection } from "@/components/sections/faq";

export const metadata: Metadata = {
  title: "خدماتنا | مظلات وسواتر وحدادة في الرياض",
  description:
    "جميع خدمات المظلات والسواتر وأعمال الحدادة في الرياض: مظلات سيارات، مظلات حدائق، مظلات مسابح، سواتر، حدادة فنية، مظلات مداخل، هياكل حديدية، مشربيات. ضمان حتى 15 سنة.",
  alternates: { canonical: "/services" },
};

export default async function ServicesPage() {
  const [services, faqs] = await Promise.all([getServices(), getFAQs()]);

  return (
    <>
      <PageHeader
        title="خدماتنا المتكاملة في الرياض"
        subtitle="نقدم باقة شاملة من الخدمات الاحترافية في مجال المظلات والسواتر وأعمال الحدادة، بأعلى معايير الجودة وأفضل الأسعار"
        crumbs={[{ name: "خدماتنا" }]}
      />

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute top-4 right-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-accent-foreground shadow-lg">
                    <Icon name={service.icon} className="h-6 w-6" />
                  </div>
                  {service.priceFrom && (
                    <div className="absolute bottom-4 left-4 rounded-lg bg-background/90 px-3 py-1.5 text-xs font-bold text-primary">
                      من {service.priceFrom}
                    </div>
                  )}
                  <h3 className="absolute bottom-4 right-4 font-display font-bold text-lg text-background">
                    {service.title}
                  </h3>
                </div>
                <div className="p-5">
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {service.shortDesc}
                  </p>
                  <ul className="mt-4 space-y-1.5">
                    {service.features.slice(0, 3).map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <Check className="h-3.5 w-3.5 text-accent shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 flex items-center gap-1 text-sm font-bold text-primary group-hover:text-accent">
                    تفاصيل الخدمة
                    <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaQuoteSection />
      <FaqSection faqs={faqs} />
    </>
  );
}
