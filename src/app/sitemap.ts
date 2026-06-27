import type { MetadataRoute } from "next";
import { getServices, getAreas, getProjects, getBlogPosts } from "@/lib/data";
import { SITE } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, areas, projects, blogPosts] = await Promise.all([
    getServices(),
    getAreas(),
    getProjects(),
    getBlogPosts(),
  ]);

  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE.url, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE.url}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE.url}/projects`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE.url}/areas`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE.url}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE.url}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE.url}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE.url}/quote`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE.url}/offers`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${SITE.url}/compare`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE.url}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${SITE.url}/team`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE.url}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${SITE.url}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${SITE.url}/loyalty`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${SITE.url}/certifications`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE.url}/pricing`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
  ];

  const servicePages: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${SITE.url}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  const areaPages: MetadataRoute.Sitemap = areas.map((a) => ({
    url: `${SITE.url}/areas/${a.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  const projectPages: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${SITE.url}/projects/${p.slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  const blogPages: MetadataRoute.Sitemap = blogPosts.map((b) => ({
    url: `${SITE.url}/blog/${b.slug}`,
    lastModified: b.createdAt,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...servicePages, ...areaPages, ...projectPages, ...blogPages];
}
