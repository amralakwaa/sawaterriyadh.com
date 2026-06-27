import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { MapPin, ArrowLeft } from "lucide-react";
import { getProjects } from "@/lib/data";
import { PageHeader } from "@/components/site/page-header";
import { CtaQuoteSection } from "@/components/sections/cta-quote";

export const metadata: Metadata = {
  title: "معرض أعمالنا | مشاريع المظلات والحدادة في الرياض",
  description:
    "استعرض معرض أعمال شركة الظلال الملكية: مظلات سيارات، مظلات حدائق، مظلات مسابح، سواتر، أعمال حدادة فنية في جميع أحياء الرياض. +3500 مشروع منجز.",
  alternates: { canonical: "/projects" },
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <>
      <PageHeader
        title="معرض أعمالنا"
        subtitle="نماذج من المشاريع التي نفخر بإنجازها لعملائنا في الرياض - أكثر من 3500 مشروع منجز بجودة عالية"
        crumbs={[{ name: "أعمالنا" }]}
      />

      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="group relative overflow-hidden rounded-2xl bg-card shadow-sm border border-border transition-all hover:shadow-xl hover:shadow-primary/10"
              >
                <div className="relative h-72 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  <div className="absolute top-4 right-4 flex items-center gap-1 rounded-lg bg-background/90 backdrop-blur-sm px-3 py-1.5 text-xs font-semibold">
                    <MapPin className="h-3 w-3 text-accent" />
                    {project.location}
                  </div>
                  <div className="absolute bottom-0 right-0 left-0 p-5 text-background">
                    <h3 className="font-display font-bold text-lg leading-tight">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-sm text-background/80 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="mt-3 flex items-center gap-1 text-sm font-bold text-accent">
                      عرض التفاصيل
                      <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                    </div>
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
