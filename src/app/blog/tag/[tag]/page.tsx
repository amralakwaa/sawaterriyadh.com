import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Calendar, User, ArrowLeft, Tag, ArrowRight } from "lucide-react";
import { getBlogPosts } from "@/lib/data";
import { PageHeader } from "@/components/site/page-header";
import { CtaQuoteSection } from "@/components/sections/cta-quote";

interface PageProps {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  const tags = new Set<string>();
  posts.forEach((p) => p.tags.forEach((t) => tags.add(t)));
  return Array.from(tags).map((tag) => ({ tag: encodeURIComponent(tag) }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { tag: encodedTag } = await params;
  const tag = decodeURIComponent(encodedTag);
  return {
    title: `مقالات عن ${tag} | مدونة الظلال الملكية`,
    description: `استعرض جميع المقالات والنصائح tagged بـ "${tag}" - مدونة شركة الظلال الملكية للمظلات والسواتر والحدادة في الرياض.`,
    alternates: { canonical: `/blog/tag/${encodedTag}` },
    openGraph: {
      title: `مقالات عن ${tag} | مدونة الظلال الملكية`,
      description: `جميع المقالات tagged بـ "${tag}"`,
    },
  };
}

export default async function BlogTagPage({ params }: PageProps) {
  const { tag: encodedTag } = await params;
  const tag = decodeURIComponent(encodedTag);
  const allPosts = await getBlogPosts();
  const filtered = allPosts.filter((p) => p.tags.includes(tag));

  if (filtered.length === 0) {
    notFound();
  }

  // Get related tags
  const allTags = new Set<string>();
  allPosts.forEach((p) => p.tags.forEach((t) => allTags.add(t)));
  const otherTags = Array.from(allTags).filter((t) => t !== tag).slice(0, 8);

  return (
    <>
      <PageHeader
        title={`مقالات عن ${tag}`}
        subtitle={`${filtered.length} مقال tagged بـ "${tag}" في مدونتنا`}
        crumbs={[
          { name: "المدونة", href: "/blog" },
          { name: tag },
        ]}
      />

      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          {/* Tag badge */}
          <div className="flex items-center justify-center mb-8">
            <span className="inline-flex items-center gap-2 rounded-full bg-accent/15 border border-accent/30 px-5 py-2 text-sm font-bold text-accent">
              <Tag className="h-4 w-4" />
              {tag}
            </span>
          </div>

          {/* Posts grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filtered.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group rounded-2xl overflow-hidden border border-border bg-card shadow-sm transition-all hover:shadow-lg hover:-translate-y-1"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {post.tags[0] && (
                    <span className="absolute top-3 right-3 rounded-lg bg-accent px-2.5 py-1 text-xs font-bold text-accent-foreground">
                      {post.tags[0]}
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Intl.DateTimeFormat("ar-SA", { month: "short", day: "numeric" }).format(post.createdAt)}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {post.author}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-base text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="mt-3 flex items-center gap-1 text-sm font-bold text-primary">
                    اقرأ المزيد
                    <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Other tags */}
          {otherTags.length > 0 && (
            <div className="rounded-2xl border border-border bg-secondary/40 p-6">
              <h2 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
                <Tag className="h-5 w-5 text-primary" />
                وسوم أخرى
              </h2>
              <div className="flex flex-wrap gap-2">
                {otherTags.map((t) => (
                  <Link
                    key={t}
                    href={`/blog/tag/${encodeURIComponent(t)}`}
                    className="rounded-full bg-card border border-border hover:bg-primary hover:text-primary-foreground hover:border-primary px-3.5 py-1.5 text-xs font-bold transition-colors"
                  >
                    {t}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Back to blog */}
          <div className="mt-8 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-primary px-6 py-3 text-sm font-bold text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <ArrowRight className="h-4 w-4" />
              العودة لجميع المقالات
            </Link>
          </div>
        </div>
      </section>

      <CtaQuoteSection />
    </>
  );
}
