import type { Metadata } from "next";
import { getProjects, getServices } from "@/lib/data";
import { PageHeader } from "@/components/site/page-header";
import { CtaQuoteSection } from "@/components/sections/cta-quote";
import { ProjectsExplorer } from "@/components/site/projects-explorer";

export const metadata: Metadata = {
  title: "معرض أعمالنا | مشاريع المظلات والحدادة في الرياض",
  description:
    "استعرض معرض أعمال شركة الظلال الملكية: مظلات سيارات، مظلات حدائق، مظلات مسابح، سواتر، أعمال حدادة فنية في جميع أحياء الرياض. +3500 مشروع منجز.",
  alternates: { canonical: "/projects" },
};

export default async function ProjectsPage() {
  const [projects, services] = await Promise.all([getProjects(), getServices()]);

  return (
    <>
      <PageHeader
        title="معرض أعمالنا"
        subtitle="نماذج من المشاريع التي نفخر بإنجازها لعملائنا في الرياض - أكثر من 3500 مشروع منجز بجودة عالية"
        crumbs={[{ name: "أعمالنا" }]}
      />

      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <ProjectsExplorer
            projects={projects.map((p) => ({
              slug: p.slug,
              title: p.title,
              description: p.description,
              image: p.image,
              location: p.location,
              serviceSlug: p.serviceSlug,
              completedAt: p.completedAt,
            }))}
            services={services.map((s) => ({ slug: s.slug, title: s.title, icon: s.icon }))}
          />
        </div>
      </section>

      <CtaQuoteSection />
    </>
  );
}
