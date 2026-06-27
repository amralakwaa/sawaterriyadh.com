import { NextRequest, NextResponse } from "next/server";
import { getServices, getProjects, getBlogPosts, getAreas, getFAQs } from "@/lib/data";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q")?.trim().toLowerCase() || "";

    if (q.length < 2) {
      return NextResponse.json({ results: [], total: 0 });
    }

    const [services, projects, blogPosts, areas, faqs] = await Promise.all([
      getServices(),
      getProjects(),
      getBlogPosts(),
      getAreas(),
      getFAQs(),
    ]);

    const results: Array<{
      type: string;
      title: string;
      description: string;
      href: string;
      icon: string;
    }> = [];

    // Search services
    services.forEach((s) => {
      if (
        s.title.toLowerCase().includes(q) ||
        s.shortDesc.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q)
      ) {
        results.push({
          type: "خدمة",
          title: s.title,
          description: s.shortDesc,
          href: `/services/${s.slug}`,
          icon: "wrench",
        });
      }
    });

    // Search projects
    projects.forEach((p) => {
      if (
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q)
      ) {
        results.push({
          type: "مشروع",
          title: p.title,
          description: p.description.slice(0, 100),
          href: `/projects/${p.slug}`,
          icon: "folder",
        });
      }
    });

    // Search blog posts
    blogPosts.forEach((b) => {
      if (
        b.title.toLowerCase().includes(q) ||
        b.excerpt.toLowerCase().includes(q) ||
        b.tags.some((t) => t.toLowerCase().includes(q))
      ) {
        results.push({
          type: "مقال",
          title: b.title,
          description: b.excerpt,
          href: `/blog/${b.slug}`,
          icon: "file",
        });
      }
    });

    // Search areas
    areas.forEach((a) => {
      if (
        a.name.toLowerCase().includes(q) ||
        a.governorate.toLowerCase().includes(q)
      ) {
        results.push({
          type: "منطقة",
          title: a.name,
          description: a.description,
          href: `/areas/${a.slug}`,
          icon: "map",
        });
      }
    });

    // Search FAQs
    faqs.forEach((f) => {
      if (f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q)) {
        results.push({
          type: "سؤال",
          title: f.question,
          description: f.answer.slice(0, 100),
          href: "/faq",
          icon: "help",
        });
      }
    });

    return NextResponse.json({
      results: results.slice(0, 12),
      total: results.length,
    });
  } catch (e) {
    console.error("Search API error:", e);
    return NextResponse.json({ results: [], total: 0 });
  }
}
