import Link from "next/link";
import Image from "next/image";
import { MapPin, Calendar, ArrowLeft } from "lucide-react";
import { getProjects } from "@/lib/data";
import { SectionHeading } from "./section-heading";

export async function ProjectsSection() {
  const projects = await getProjects(6);

  return (
    <section className="py-16 lg:py-24 bg-secondary/40" id="projects">
      <div className="container mx-auto px-4">
        <SectionHeading
          eyebrow="أعمالنا"
          title="مشاريع نفخر بإنجازها في الرياض"
          subtitle="نماذج من المشاريع التي قمنا بتنفيذها لعملائنا الكرام، تعكس جودة عملنا واحترافيتنا"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group relative overflow-hidden rounded-2xl bg-card shadow-sm border border-border transition-all hover:shadow-xl hover:shadow-primary/10"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Location badge */}
                <div className="absolute top-4 right-4 flex items-center gap-1 rounded-lg bg-background/90 backdrop-blur-sm px-3 py-1.5 text-xs font-semibold text-foreground">
                  <MapPin className="h-3 w-3 text-accent" />
                  {project.location}
                </div>

                {/* Title overlay */}
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

        <div className="mt-10 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-xl border-2 border-primary px-6 py-3 text-sm font-bold text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            استعرض جميع المشاريع
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
