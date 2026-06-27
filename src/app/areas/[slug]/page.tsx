import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MapPin, Phone, Check, ArrowLeft } from "lucide-react";
import { getAreaBySlug, getServices, getProjects, getSettings } from "@/lib/data";
import { PageHeader } from "@/components/site/page-header";
import { CtaQuoteSection } from "@/components/sections/cta-quote";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const { getAreas } = await import("@/lib/data");
  const areas = await getAreas();
  return areas.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const area = await getAreaBySlug(slug);
  if (!area) return { title: "المنطقة غير موجودة" };
  const title = `${area.name} | مظلات وسواتر وحدادة - شركة الظلال الملكية`;
  const desc = `خدمات المظلات والسواتر وأعمال الحدادة في ${area.name}. تركيب مظلات سيارات، مظلات حدائق، سواتر، حدادة فنية. معاينة مجانية وضمان حتى 15 سنة. اتصل الآن.`;
  return {
    title,
    description: desc,
    alternates: { canonical: `/areas/${area.slug}` },
    openGraph: { title, description: desc },
  };
}

export default async function AreaPage({ params }: PageProps) {
  const { slug } = await params;
  const area = await getAreaBySlug(slug);
  if (!area) notFound();

  const [services, allProjects, settings] = await Promise.all([
    getServices(),
    getProjects(),
    getSettings(),
  ]);
  const areaProjects = allProjects.filter((p) => p.area === area.slug);

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `${settings.name} - ${area.name}`,
    description: `خدمات المظلات والسواتر والحدادة في ${area.name}`,
    areaServed: { "@type": "Place", name: area.name },
    address: {
      "@type": "PostalAddress",
      addressLocality: area.name,
      addressRegion: area.governorate,
      addressCountry: "SA",
    },
    telephone: `+${settings.whatsapp}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      <PageHeader
        title={`مظلات وسواتر وحدادة في ${area.name}`}
        subtitle={`نقدم خدماتنا المتكاملة في ${area.name} - ${area.description}`}
        crumbs={[{ name: "مناطق الخدمة", href: "/areas" }, { name: area.name }]}
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Intro */}
          <div className="max-w-3xl mb-12">
            <p className="text-lg text-muted-foreground leading-relaxed">
              شركة الظلال الملكية تخدم عملاءها في <strong className="text-foreground">{area.name}</strong> ضمن{" "}
              <strong className="text-foreground">{area.governorate}</strong> منذ أكثر من 15 عاماً.
              نقدم خدمات تركيب المظلات والسواتر وأعمال الحدادة الفنية بأعلى معايير الجودة وأفضل الأسعار،
              مع ضمان موثّق يصل إلى 15 سنة على جميع أعمالنا.
            </p>
          </div>

          {/* Services in this area */}
          <h2 className="font-display text-2xl font-bold mb-6">خدماتنا في {area.name}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {services.slice(0, 4).map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group rounded-2xl overflow-hidden border border-border bg-card shadow-sm hover:shadow-lg transition"
              >
                <div className="relative h-40 overflow-hidden">
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <h3 className="absolute bottom-3 right-3 font-bold text-sm text-background">{s.title}</h3>
                </div>
              </Link>
            ))}
          </div>

          {/* Projects in this area */}
          {areaProjects.length > 0 && (
            <>
              <h2 className="font-display text-2xl font-bold mb-6">مشاريعنا في {area.name}</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {areaProjects.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/projects/${p.slug}`}
                    className="group rounded-2xl overflow-hidden border border-border bg-card shadow-sm hover:shadow-lg transition"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-sm group-hover:text-primary line-clamp-1">{p.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {p.location}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}

          {/* Why us in this area */}
          <div className="rounded-2xl border border-border bg-secondary/40 p-6 lg:p-8 mb-8">
            <h2 className="font-display text-2xl font-bold mb-4">لماذا تختارنا في {area.name}؟</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                "فريق محترف يصل إلى موقعك في الوقت المحدد",
                "معاينة مجانية وتقدير دقيق للتكلفة",
                "مواد عالية الجودة معتمدة من SASO",
                "ضمان موثّق حتى 15 سنة",
                "أسعار تنافسية بدون رسوم خفية",
                "خدمة ما بعد البيع والصيانة الدورية",
              ].map((b, i) => (
                <div key={i} className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground/90">{b}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact CTA */}
          <div className="rounded-2xl bg-gradient-to-l from-primary to-accent text-background p-8 text-center">
            <h2 className="font-display text-2xl font-bold mb-2">تحتاج خدمة في {area.name}؟</h2>
            <p className="text-background/90 mb-5">تواصل معنا الآن للحصول على معاينة وتسعير مجاني</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/quote"
                className="inline-flex items-center gap-2 rounded-xl bg-background px-6 py-3 text-sm font-bold text-primary hover:scale-105 transition"
              >
                اطلب تسعير مجاني
                <ArrowLeft className="h-4 w-4" />
              </Link>
              <a
                href={`tel:${settings.phone}`}
                className="inline-flex items-center gap-2 rounded-xl bg-foreground px-6 py-3 text-sm font-bold text-background hover:scale-105 transition"
              >
                <Phone className="h-4 w-4" />
                <span dir="ltr">{settings.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <CtaQuoteSection />
    </>
  );
}
