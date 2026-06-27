import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, User, ArrowLeft, Tag, ArrowRight } from "lucide-react";
import { getBlogPostBySlug, getBlogPosts, getServiceBySlug, getRelatedPosts } from "@/lib/data";
import { PageHeader } from "@/components/site/page-header";
import { CtaQuoteSection } from "@/components/sections/cta-quote";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return { title: "المقال غير موجود" };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.image, alt: post.title }],
      publishedTime: post.createdAt.toISOString(),
      authors: [post.author],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  const [relatedPosts, service] = await Promise.all([
    getRelatedPosts(slug, 3),
    post.serviceSlug ? getServiceBySlug(post.serviceSlug) : null,
  ]);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    author: { "@type": "Person", name: post.author },
    publisher: { "@type": "Organization", name: "شركة الظلال الملكية" },
    datePublished: post.createdAt.toISOString(),
    keywords: post.tags.join(", "),
  };

  // Render simple markdown-like content
  const renderContent = (content: string) => {
    return content.split("\n").map((line, i) => {
      if (line.startsWith("## ")) {
        return <h2 key={i} className="font-display text-2xl font-bold mt-8 mb-4 text-foreground">{line.replace("## ", "")}</h2>;
      }
      if (line.startsWith("### ")) {
        return <h3 key={i} className="font-display text-xl font-bold mt-6 mb-3 text-foreground">{line.replace("### ", "")}</h3>;
      }
      if (line.startsWith("- ")) {
        return <li key={i} className="text-muted-foreground leading-relaxed mr-4 list-disc">{line.replace("- ", "")}</li>;
      }
      if (line.startsWith("| ")) {
        return null; // skip table for simplicity
      }
      if (line.trim() === "") return <div key={i} className="h-3" />;
      return <p key={i} className="text-muted-foreground leading-relaxed mb-3">{line}</p>;
    });
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <article>
        <PageHeader
          title={post.title}
          subtitle={post.excerpt}
          crumbs={[{ name: "المدونة", href: "/blog" }, { name: post.title.slice(0, 30) + "..." }]}
        >
          <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <User className="h-4 w-4 text-primary" />
              {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-primary" />
              {new Intl.DateTimeFormat("ar-SA", { year: "numeric", month: "long", day: "numeric" }).format(post.createdAt)}
            </span>
            {post.tags.map((t, i) => (
              <span key={i} className="flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-xs">
                <Tag className="h-3 w-3" />
                {t}
              </span>
            ))}
          </div>
        </PageHeader>

        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2">
                <div className="relative rounded-2xl overflow-hidden h-72 lg:h-96 mb-8 shadow-lg">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    className="object-cover"
                    priority
                  />
                </div>

                <div className="prose prose-lg max-w-none">
                  {renderContent(post.content)}
                </div>

                {/* Service CTA */}
                {service && (
                  <div className="mt-10 rounded-2xl border-2 border-dashed border-primary/30 bg-primary/5 p-6 text-center">
                    <p className="text-sm text-muted-foreground mb-3">هل تحتاج هذه الخدمة؟</p>
                    <h3 className="font-display text-xl font-bold mb-3">{service.title}</h3>
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground hover:brightness-110 transition"
                    >
                      تعرف على الخدمة
                      <ArrowLeft className="h-4 w-4" />
                    </Link>
                  </div>
                  )}
              </div>

              {/* Sidebar */}
              <aside className="space-y-6">
                {/* Related posts */}
                {relatedPosts.length > 0 && (
                  <div className="rounded-2xl border border-border bg-card p-6 sticky top-24">
                    <h3 className="font-display font-bold text-lg mb-4">مقالات ذات صلة</h3>
                    <div className="space-y-3">
                      {relatedPosts.map((p) => (
                        <Link
                          key={p.slug}
                          href={`/blog/${p.slug}`}
                          className="group flex gap-3 items-start hover:bg-secondary -mx-2 p-2 rounded-lg transition"
                        >
                          <div className="relative h-16 w-16 shrink-0 rounded-lg overflow-hidden">
                            <Image src={p.image} alt={p.title} fill sizes="64px" className="object-cover" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-bold text-foreground line-clamp-2 group-hover:text-primary transition">
                              {p.title}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {new Intl.DateTimeFormat("ar-SA", { month: "short", day: "numeric" }).format(p.createdAt)}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </aside>
            </div>

            {/* Navigation */}
            <div className="mt-12 flex justify-between border-t border-border pt-6">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-accent transition"
              >
                <ArrowRight className="h-4 w-4" />
                العودة للمدونة
              </Link>
            </div>
          </div>
        </section>
      </article>

      <CtaQuoteSection />
    </>
  );
}
