"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, ArrowLeft, Search, Filter, X, LayoutGrid, Rows3 } from "lucide-react";

interface Project {
  slug: string;
  title: string;
  description: string;
  image: string;
  location: string;
  serviceSlug: string;
  completedAt: string;
}

interface Service {
  slug: string;
  title: string;
  icon: string;
}

interface Props {
  projects: Project[];
  services: Service[];
}

export function ProjectsExplorer({ projects, services }: Props) {
  const [activeService, setActiveService] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [layout, setLayout] = useState<"grid" | "list">("grid");

  const filtered = useMemo(() => {
    let result = projects;
    if (activeService !== "all") {
      result = result.filter((p) => p.serviceSlug === activeService);
    }
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q)
      );
    }
    return result;
  }, [projects, activeService, query]);

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: projects.length };
    for (const s of services) {
      map[s.slug] = projects.filter((p) => p.serviceSlug === s.slug).length;
    }
    return map;
  }, [projects, services]);

  return (
    <div className="space-y-6">
      {/* Search & layout toggle */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ابحث في المشاريع..."
            className="w-full rounded-xl border border-border bg-card pr-10 pl-10 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label="مسح البحث"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <div className="flex rounded-xl border border-border overflow-hidden">
          <button
            onClick={() => setLayout("grid")}
            className={`flex items-center gap-1.5 px-4 py-3 text-sm font-semibold transition ${
              layout === "grid" ? "bg-primary text-primary-foreground" : "bg-card hover:bg-secondary"
            }`}
            aria-label="عرض شبكي"
          >
            <LayoutGrid className="h-4 w-4" />
          </button>
          <button
            onClick={() => setLayout("list")}
            className={`flex items-center gap-1.5 px-4 py-3 text-sm font-semibold transition ${
              layout === "list" ? "bg-primary text-primary-foreground" : "bg-card hover:bg-secondary"
            }`}
            aria-label="عرض قائمة"
          >
            <Rows3 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Filter chips */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="flex items-center gap-1 text-xs font-bold text-muted-foreground shrink-0">
          <Filter className="h-3.5 w-3.5" />
          فلترة:
        </span>
        <button
          onClick={() => setActiveService("all")}
          className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition ${
            activeService === "all"
              ? "bg-primary text-primary-foreground"
              : "bg-card border border-border hover:bg-secondary"
          }`}
        >
          الكل ({counts.all})
        </button>
        {services.map((s) => (
          <button
            key={s.slug}
            onClick={() => setActiveService(s.slug)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition ${
              activeService === s.slug
                ? "bg-primary text-primary-foreground"
                : "bg-card border border-border hover:bg-secondary"
            }`}
          >
            {s.title} ({counts[s.slug] || 0})
          </button>
        ))}
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {filtered.length > 0 ? `${filtered.length} مشروع` : "لا توجد نتائج"}
        </p>
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="rounded-2xl border border-dashed border-border bg-card p-12 text-center">
          <Search className="h-12 w-12 mx-auto text-muted-foreground/40 mb-3" />
          <p className="font-bold text-foreground mb-1">لا توجد مشاريع مطابقة</p>
          <p className="text-sm text-muted-foreground">جرّب تغيير الفلاتر أو كلمة البحث</p>
          <button
            onClick={() => { setQuery(""); setActiveService("all"); }}
            className="mt-4 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-primary-foreground"
          >
            إعادة ضبط الفلاتر
          </button>
        </div>
      )}

      {/* Projects */}
      {layout === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group relative overflow-hidden rounded-2xl bg-card shadow-sm border border-border transition-all hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1"
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
                  <h3 className="font-display font-bold text-lg leading-tight">{project.title}</h3>
                  <p className="mt-2 text-sm text-background/80 line-clamp-2">{project.description}</p>
                  <div className="mt-3 flex items-center gap-1 text-sm font-bold text-accent">
                    عرض التفاصيل
                    <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group flex flex-col sm:flex-row gap-4 rounded-2xl bg-card border border-border overflow-hidden transition-all hover:shadow-lg hover:border-primary/30"
            >
              <div className="relative h-48 sm:h-32 sm:w-48 shrink-0 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 192px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex-1 p-5 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-1">
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3 text-accent" />
                    {project.location}
                  </span>
                </div>
                <h3 className="font-display font-bold text-lg group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{project.description}</p>
                <div className="mt-2 flex items-center gap-1 text-sm font-bold text-primary">
                  عرض التفاصيل
                  <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
