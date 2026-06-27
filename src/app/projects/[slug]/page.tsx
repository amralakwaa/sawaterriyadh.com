import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MapPin, Calendar, Check, ArrowRight, Phone } from "lucide-react";
import Link from "next/link";
import { getProjectBySlug, getProjects, getServiceBySlug, getSettings, getAreas } from "@/lib/data";
import { PageHeader } from "@/components/site/page-header";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { GalleryLightbox } from "@/components/site/gallery-lightbox";
import { ProjectRatingWidget } from "@/components/site/project-rating";
import { CtaQuoteSection } from "@/components/sections/cta-quote";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "المشروع غير موجود" };
  return {
    title: `${project.title} | مشروع منجز في الرياض`,
    description: project.description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: project.title,
      description: project.description,
      images: [{ url: project.image, alt: project.title }],
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const [service, settings, allProjects, areas] = await Promise.all([
    project.serviceSlug ? getServiceBySlug(project.serviceSlug) : null,
    getSettings(),
    getProjects(),
    getAreas(),
  ]);
  const area = areas.find((a) => a.slug === project.area);
  const relatedProjects = allProjects
    .filter((p) => p.slug !== slug && p.serviceSlug === project.serviceSlug)
    .slice(0, 3);

  return (
    <>
      <PageHeader
        title={project.title}
        subtitle={project.description}
        crumbs={[
          { name: "أعمالنا", href: "/projects" },
          { name: project.title },
        ]}
      >
        <div className="mt-5 flex flex-wrap items-center gap-3 text-sm">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 font-semibold">
            <MapPin className="h-4 w-4 text-accent" />
            {project.location}
          </span>
          {project.completedAt && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 font-semibold">
              <Calendar className="h-4 w-4 text-primary" />
              {new Intl.DateTimeFormat("ar-SA", { year: "numeric", month: "long" }).format(new Date(project.completedAt))}
            </span>
          )}
          {service && (
            <Link
              href={`/services/${service.slug}`}
              className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 font-semibold text-primary hover:bg-primary hover:text-primary-foreground transition"
            >
              {service.title}
            </Link>
          )}
        </div>
      </PageHeader>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="relative rounded-2xl overflow-hidden h-80 lg:h-[500px] shadow-lg">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover"
                  priority
                />
              </div>

              {project.gallery.length > 0 && (
                <GalleryLightbox images={project.gallery} alt={project.title} />
              )}

              <div className="rounded-2xl border border-border bg-card p-6">
                <h2 className="font-display text-xl font-bold mb-3">تفاصيل المشروع</h2>
                <p className="text-muted-foreground leading-relaxed">{project.description}</p>
                {service && (
                  <div className="mt-6 pt-6 border-t border-border">
                    <h3 className="font-bold mb-3">المواصفات التقنية</h3>
                    <ul className="grid sm:grid-cols-2 gap-2">
                      {service.features.slice(0, 6).map((f, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <Check className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Rating widget */}
              <ProjectRatingWidget projectSlug={project.slug} />
            </div>

            <aside className="space-y-6">
              <div className="rounded-2xl bg-gradient-to-br from-primary to-foreground text-background p-6 shadow-xl sticky top-24">
                <h3 className="font-display text-xl font-bold mb-2">مشروع مماثل؟</h3>
                <p className="text-sm text-background/80 mb-5">
                  احصل على تسعير مجاني لمشروع مشابه في موقعك
                </p>
                <Link
                  href={service ? `/quote?service=${service.slug}` : "/quote"}
                  className="flex items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3.5 text-sm font-bold text-accent-foreground hover:brightness-110 transition mb-3"
                >
                  اطلب تسعير مجاني
                </Link>
                <a
                  href={`tel:${settings.phone}`}
                  className="flex items-center justify-center gap-2 rounded-xl bg-background/10 border border-background/20 px-5 py-3.5 text-sm font-bold hover:bg-background/20 transition"
                >
                  <Phone className="h-4 w-4 text-accent" />
                  <span dir="ltr">{settings.phoneDisplay}</span>
                </a>
              </div>

              {area && (
                <Link
                  href={`/areas/${area.slug}`}
                  className="block rounded-2xl border border-border bg-card p-5 hover:border-primary hover:shadow-md transition"
                >
                  <p className="text-xs text-muted-foreground mb-1">منطقة المشروع</p>
                  <p className="font-bold text-foreground">{area.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">{area.governorate}</p>
                </Link>
              )}
            </aside>
          </div>

          {/* Related projects */}
          {relatedProjects.length > 0 && (
            <div className="mt-16">
              <h2 className="font-display text-2xl font-bold mb-6">مشاريع ذات صلة</h2>
              <div className="grid sm:grid-cols-3 gap-6">
                {relatedProjects.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/projects/${p.slug}`}
                    className="group rounded-2xl overflow-hidden border border-border bg-card shadow-sm hover:shadow-lg transition"
                  >
                    <div className="relative h-40 overflow-hidden">
                      <Image src={p.image} alt={p.title} fill sizes="33vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-sm line-clamp-1 group-hover:text-primary">{p.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {p.location}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <CtaQuoteSection />
    </>
  );
}
