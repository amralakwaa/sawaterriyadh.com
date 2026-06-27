import { db } from "./db";
import {
  SERVICES,
  AREAS,
  PROJECTS,
  BLOG_POSTS,
  TESTIMONIALS,
  FEATURES,
  STATS,
  PROCESS_STEPS,
  FAQS,
  SITE,
  type ServiceData,
  type ProjectData,
  type BlogPostData,
} from "./content";

// Fallback-first data accessors: try DB, fall back to static content.

function parseJSON<T>(str: string | null, fallback: T): T {
  if (!str) return fallback;
  try {
    return JSON.parse(str) as T;
  } catch {
    return fallback;
  }
}

export async function getServices(): Promise<ServiceData[]> {
  try {
    const rows = await db.service.findMany({ orderBy: { order: "asc" } });
    if (rows.length === 0) return SERVICES;
    return rows.map((r) => ({
      slug: r.slug,
      title: r.title,
      shortDesc: r.shortDesc,
      description: r.description,
      icon: r.icon,
      image: r.image,
      features: parseJSON<string[]>(r.features, []),
      priceFrom: r.priceFrom ?? "",
      featured: r.featured,
      order: r.order,
      longContent: "",
      metaTitle: "",
      metaDescription: "",
    }));
  } catch {
    return SERVICES;
  }
}

export async function getServiceBySlug(slug: string): Promise<ServiceData | null> {
  // Always merge with static longContent/meta for richness
  const staticService = SERVICES.find((s) => s.slug === slug);
  try {
    const row = await db.service.findUnique({ where: { slug } });
    if (!row) return staticService ?? null;
    return {
      slug: row.slug,
      title: row.title,
      shortDesc: row.shortDesc,
      description: row.description,
      icon: row.icon,
      image: row.image,
      features: parseJSON<string[]>(row.features, []),
      priceFrom: row.priceFrom ?? "",
      featured: row.featured,
      order: row.order,
      longContent: staticService?.longContent ?? "",
      metaTitle: staticService?.metaTitle ?? "",
      metaDescription: staticService?.metaDescription ?? "",
    };
  } catch {
    return staticService ?? null;
  }
}

export async function getFeaturedServices(): Promise<ServiceData[]> {
  const all = await getServices();
  return all.filter((s) => s.featured);
}

export interface ProjectRecord extends ProjectData {
  id: string;
}

export async function getProjects(limit?: number): Promise<ProjectRecord[]> {
  try {
    const rows = await db.project.findMany({
      orderBy: { createdAt: "desc" },
      take: limit,
      include: { service: true },
    });
    if (rows.length === 0) {
      return PROJECTS.slice(0, limit).map((p) => ({ ...p, id: p.slug }));
    }
    return rows.map((r) => ({
      id: r.id,
      slug: r.slug,
      title: r.title,
      description: r.description,
      image: r.image,
      gallery: parseJSON<string[]>(r.gallery, [r.image]),
      location: r.location,
      area: r.area ?? "",
      serviceSlug: r.service?.slug ?? "",
      completedAt: r.completedAt ?? "",
    }));
  } catch {
    return PROJECTS.slice(0, limit).map((p) => ({ ...p, id: p.slug }));
  }
}

export async function getProjectBySlug(slug: string): Promise<ProjectRecord | null> {
  try {
    const r = await db.project.findUnique({
      where: { slug },
      include: { service: true },
    });
    if (!r) {
      const p = PROJECTS.find((x) => x.slug === slug);
      return p ? { ...p, id: p.slug } : null;
    }
    return {
      id: r.id,
      slug: r.slug,
      title: r.title,
      description: r.description,
      image: r.image,
      gallery: parseJSON<string[]>(r.gallery, [r.image]),
      location: r.location,
      area: r.area ?? "",
      serviceSlug: r.service?.slug ?? "",
      completedAt: r.completedAt ?? "",
    };
  } catch {
    const p = PROJECTS.find((x) => x.slug === slug);
    return p ? { ...p, id: p.slug } : null;
  }
}

export async function getProjectsByService(serviceSlug: string): Promise<ProjectRecord[]> {
  const all = await getProjects();
  return all.filter((p) => p.serviceSlug === serviceSlug);
}

export interface BlogRecord extends BlogPostData {
  id: string;
  createdAt: Date;
}

export async function getBlogPosts(limit?: number): Promise<BlogRecord[]> {
  try {
    const rows = await db.blogPost.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      take: limit,
      include: { service: true },
    });
    if (rows.length === 0) {
      return BLOG_POSTS.slice(0, limit).map((b, i) => ({
        ...b,
        id: b.slug,
        createdAt: new Date(Date.now() - i * 86400000 * 3),
      }));
    }
    return rows.map((r) => ({
      id: r.id,
      slug: r.slug,
      title: r.title,
      excerpt: r.excerpt,
      content: r.content,
      image: r.image,
      tags: parseJSON<string[]>(r.tags, []),
      serviceSlug: r.service?.slug,
      author: r.author,
      createdAt: r.createdAt,
    }));
  } catch {
    return BLOG_POSTS.slice(0, limit).map((b, i) => ({
      ...b,
      id: b.slug,
      createdAt: new Date(Date.now() - i * 86400000 * 3),
    }));
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogRecord | null> {
  try {
    const r = await db.blogPost.findUnique({
      where: { slug },
      include: { service: true },
    });
    if (!r) {
      const b = BLOG_POSTS.find((x) => x.slug === slug);
      return b ? { ...b, id: b.slug, createdAt: new Date() } : null;
    }
    return {
      id: r.id,
      slug: r.slug,
      title: r.title,
      excerpt: r.excerpt,
      content: r.content,
      image: r.image,
      tags: parseJSON<string[]>(r.tags, []),
      serviceSlug: r.service?.slug,
      author: r.author,
      createdAt: r.createdAt,
    };
  } catch {
    const b = BLOG_POSTS.find((x) => x.slug === slug);
    return b ? { ...b, id: b.slug, createdAt: new Date() } : null;
  }
}

export async function getRelatedPosts(currentSlug: string, limit = 3): Promise<BlogRecord[]> {
  const posts = await getBlogPosts();
  return posts.filter((p) => p.slug !== currentSlug).slice(0, limit);
}

export async function getAreas() {
  try {
    const rows = await db.serviceArea.findMany({ orderBy: { name: "asc" } });
    if (rows.length === 0) return AREAS;
    return rows.map((r) => ({
      slug: r.slug,
      name: r.name,
      governorate: r.governorate,
      description: r.description,
      featured: r.featured,
    }));
  } catch {
    return AREAS;
  }
}

export async function getAreaBySlug(slug: string) {
  try {
    const r = await db.serviceArea.findUnique({ where: { slug } });
    if (!r) return AREAS.find((a) => a.slug === slug) ?? null;
    return {
      slug: r.slug,
      name: r.name,
      governorate: r.governorate,
      description: r.description,
      featured: r.featured,
    };
  } catch {
    return AREAS.find((a) => a.slug === slug) ?? null;
  }
}

export async function getTestimonials() {
  try {
    const rows = await db.testimonial.findMany({
      where: { active: true },
      orderBy: { createdAt: "desc" },
    });
    if (rows.length === 0) return TESTIMONIALS;
    return rows.map((r) => ({
      name: r.name,
      role: r.role,
      content: r.content,
      rating: r.rating,
      area: r.area ?? "",
    }));
  } catch {
    return TESTIMONIALS;
  }
}

export async function getFeatures() {
  try {
    const rows = await db.feature.findMany({ orderBy: { order: "asc" } });
    if (rows.length === 0) return FEATURES;
    return rows.map((r) => ({
      icon: r.icon,
      title: r.title,
      description: r.description,
    }));
  } catch {
    return FEATURES;
  }
}

export async function getStats() {
  try {
    const rows = await db.stat.findMany({ orderBy: { order: "asc" } });
    if (rows.length === 0) return STATS;
    return rows.map((r) => ({ icon: r.icon, label: r.label, value: r.value }));
  } catch {
    return STATS;
  }
}

export async function getProcessSteps() {
  try {
    const rows = await db.processStep.findMany({ orderBy: { order: "asc" } });
    if (rows.length === 0) return PROCESS_STEPS;
    return rows.map((r) => ({
      icon: r.icon,
      title: r.title,
      description: r.description,
    }));
  } catch {
    return PROCESS_STEPS;
  }
}

export async function getFAQs(serviceSlug?: string) {
  try {
    if (serviceSlug) {
      const service = await db.service.findUnique({ where: { slug: serviceSlug } });
      const rows = await db.fAQ.findMany({
        where: { OR: [{ serviceId: service?.id }, { serviceId: null }] },
        orderBy: { order: "asc" },
      });
      if (rows.length === 0) return FAQS;
      return rows.map((r) => ({ question: r.question, answer: r.answer }));
    }
    const rows = await db.fAQ.findMany({ orderBy: { order: "asc" } });
    if (rows.length === 0) return FAQS;
    return rows.map((r) => ({ question: r.question, answer: r.answer }));
  } catch {
    return FAQS;
  }
}

export async function getSettings() {
  try {
    const rows = await db.siteSetting.findMany();
    const map: Record<string, string> = {};
    for (const r of rows) map[r.key] = r.value;
    return { ...SITE, ...map };
  } catch {
    return SITE;
  }
}
