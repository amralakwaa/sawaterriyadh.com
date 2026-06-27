import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Check } from "lucide-react";
import { getServices } from "@/lib/data";
import { Icon } from "@/components/site/icon";
import { SectionHeading } from "./section-heading";

export async function ServicesSection() {
  const services = await getServices();
  const featured = services.filter((s) => s.featured);
  const display = featured.length >= 6 ? featured.slice(0, 6) : services.slice(0, 6);

  return (
    <section className="py-16 lg:py-24 bg-background" id="services">
      <div className="container mx-auto px-4">
        <SectionHeading
          eyebrow="خدماتنا"
          title="حلول متكاملة للمظلات والسواتر والحدادة"
          subtitle="نقدم باقة شاملة من الخدمات الاحترافية التي تلبي جميع احتياجاتك في الرياض والمنطقة الوسطى"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {display.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                {/* Icon badge */}
                <div className="absolute top-4 right-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-accent-foreground shadow-lg">
                  <Icon name={service.icon} className="h-6 w-6" />
                </div>
                {/* Price */}
                {service.priceFrom && (
                  <div className="absolute bottom-4 left-4 rounded-lg bg-background/90 backdrop-blur-sm px-3 py-1.5 text-xs font-bold text-primary">
                    من {service.priceFrom}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-display font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2">
                  {service.shortDesc}
                </p>

                {/* Features preview */}
                <ul className="mt-4 space-y-1.5">
                  {service.features.slice(0, 3).map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <Check className="h-3.5 w-3.5 text-accent shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex items-center justify-between">
                  <span className="text-sm font-bold text-primary group-hover:text-accent transition-colors flex items-center gap-1">
                    تفاصيل الخدمة
                    <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View all */}
        <div className="mt-10 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-xl border-2 border-primary px-6 py-3 text-sm font-bold text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            عرض جميع الخدمات
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
