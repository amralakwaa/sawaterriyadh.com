import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Check, ShieldCheck, Clock, Phone, ArrowLeft, Star } from "lucide-react";
import { getServiceBySlug, getServices, getFAQs, getSettings } from "@/lib/data";
import { PageHeader } from "@/components/site/page-header";
import { Icon } from "@/components/site/icon";
import { SmartLinks } from "@/components/site/smart-links";
import { FaqSection } from "@/components/sections/faq";
import { CtaQuoteSection } from "@/components/sections/cta-quote";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return { title: "الخدمة غير موجودة" };
  return {
    title: service.metaTitle || service.title,
    description: service.metaDescription || service.shortDesc,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: service.metaTitle || service.title,
      description: service.metaDescription || service.shortDesc,
      images: [{ url: service.image, width: 1200, height: 630, alt: service.title }],
    },
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  const [allServices, faqs, settings] = await Promise.all([
    getServices(),
    getFAQs(slug),
    getSettings(),
  ]);
  const otherServices = allServices.filter((s) => s.slug !== slug).slice(0, 4);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    image: service.image,
    provider: {
      "@type": "GeneralContractor",
      name: settings.name,
      telephone: `+${settings.whatsapp}`,
      areaServed: "الرياض",
    },
    areaServed: "الرياض، منطقة الرياض",
    offers: service.priceFrom
      ? { "@type": "Offer", price: service.priceFrom.replace(/[^\d]/g, ""), priceCurrency: "SAR" }
      : undefined,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <PageHeader
        title={service.title}
        subtitle={service.shortDesc}
        crumbs={[{ name: "خدماتنا", href: "/services" }, { name: service.title }]}
      >
        <div className="mt-5 flex flex-wrap items-center gap-3">
          {service.priceFrom && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-4 py-2 text-sm font-bold text-accent">
              الأسعار تبدأ من {service.priceFrom}
            </span>
          )}
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-4 py-2 text-sm font-bold text-primary">
            <ShieldCheck className="h-4 w-4" />
            ضمان حتى 15 سنة
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-4 py-2 text-sm font-bold text-foreground">
            <Clock className="h-4 w-4" />
            تركيب خلال 24-48 ساعة
          </span>
        </div>
      </PageHeader>

      {/* Main content */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Content */}
            <div className="lg:col-span-2 space-y-8">
              <div className="relative rounded-2xl overflow-hidden h-72 lg:h-96 shadow-lg">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover"
                  priority
                />
              </div>

              <div className="prose prose-lg max-w-none">
                <h2 className="font-display text-2xl font-bold mb-4">عن الخدمة</h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {service.description}
                </p>
                {service.longContent && (
                  <div className="mt-6 text-muted-foreground leading-relaxed space-y-4">
                    {service.longContent.split("\n\n").map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                )}
              </div>

              {/* Features */}
              <div className="rounded-2xl border border-border bg-card p-6 lg:p-8">
                <h2 className="font-display text-2xl font-bold mb-6">مميزات خدمتنا</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {service.features.map((f, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                        <Check className="h-4 w-4" />
                      </div>
                      <span className="text-sm text-foreground/90 leading-relaxed">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Quote CTA */}
              <div className="rounded-2xl bg-gradient-to-br from-primary to-foreground text-background p-6 shadow-xl sticky top-24">
                <h3 className="font-display text-xl font-bold mb-2">اطلب تسعير مجاني</h3>
                <p className="text-sm text-background/80 mb-5">
                  احصل على عرض سعر تفصيلي لهذه الخدمة خلال 24 ساعة
                </p>
                <Link
                  href={`/quote?service=${service.slug}`}
                  className="flex items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3.5 text-sm font-bold text-accent-foreground hover:brightness-110 transition"
                >
                  اطلب الآن
                  <ArrowLeft className="h-4 w-4" />
                </Link>
                <div className="mt-4 pt-4 border-t border-background/20">
                  <a
                    href={`tel:${settings.phone}`}
                    className="flex items-center gap-2 text-sm font-bold hover:text-accent transition"
                  >
                    <Phone className="h-4 w-4 text-accent" />
                    <span dir="ltr">{settings.phoneDisplay}</span>
                  </a>
                </div>
                <div className="mt-3 flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-3.5 w-3.5 text-accent fill-accent" />
                  ))}
                  <span className="text-xs text-background/70 mr-2">4.9 من 5</span>
                </div>
              </div>

              {/* Other services */}
              <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="font-display font-bold mb-4">خدمات أخرى</h3>
                <div className="space-y-2">
                  {otherServices.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/services/${s.slug}`}
                      className="group flex items-center gap-3 rounded-lg p-2.5 hover:bg-secondary transition-colors"
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <Icon name={s.icon} className="h-4 w-4" />
                      </div>
                      <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                        {s.title}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Smart internal linking */}
      <SmartLinks service={service} />

      {/* FAQ */}
      <FaqSection faqs={faqs} />

      {/* CTA */}
      <CtaQuoteSection />
    </>
  );
}
