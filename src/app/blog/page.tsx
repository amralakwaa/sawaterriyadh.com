import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Calendar, User, ArrowLeft } from "lucide-react";
import { getBlogPosts } from "@/lib/data";
import { PageHeader } from "@/components/site/page-header";
import { CtaQuoteSection } from "@/components/sections/cta-quote";
import { BlogExplorer } from "@/components/site/blog-explorer";

export const metadata: Metadata = {
  title: "المدونة | نصائح وأدلة للمظلات والحدادة",
  description:
    "مقالات إرشادية ونصائح مفيدة حول مظلات السيارات والحدائق والسواتر وأعمال الحدادة في الرياض. أدلة شراء، أسعار، نصائح تركيب.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  const posts = await getBlogPosts();
  const [featured, ...rest] = posts;

  return (
    <>
      <PageHeader
        title="مدونة الظلال الملكية"
        subtitle="مقالات إرشادية ونصائح مفيدة لمساعدتك في اتخاذ القرار الأمثل لمشروع المظلات أو السواتر أو الحدادة"
        crumbs={[{ name: "المدونة" }]}
      />

      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          {/* Featured post */}
          {featured && !featured.title.includes("search") && (
            <Link
              href={`/blog/${featured.slug}`}
              className="group grid md:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-border bg-card shadow-sm hover:shadow-xl transition mb-12"
            >
              <div className="relative h-64 md:h-auto overflow-hidden">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  priority
                />
              </div>
              <div className="p-8 flex flex-col justify-center">
                {featured.tags[0] && (
                  <span className="inline-block w-fit rounded-full bg-accent/15 px-3 py-1 text-xs font-bold text-accent mb-3">
                    مقال مميز
                  </span>
                )}
                <h2 className="font-display text-2xl lg:text-3xl font-extrabold text-foreground group-hover:text-primary transition-colors leading-tight">
                  {featured.title}
                </h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">{featured.excerpt}</p>
                <div className="mt-5 flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {new Intl.DateTimeFormat("ar-SA", { year: "numeric", month: "long", day: "numeric" }).format(featured.createdAt)}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="h-3.5 w-3.5" />
                    {featured.author}
                  </span>
                </div>
                <div className="mt-5 flex items-center gap-1 text-sm font-bold text-primary">
                  اقرأ المقال كاملاً
                  <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                </div>
              </div>
            </Link>
          )}

          {/* Explorer with search & filters */}
          <BlogExplorer posts={rest.map((p) => ({ ...p, createdAt: new Date(p.createdAt) }))} />
        </div>
      </section>

      <CtaQuoteSection />
    </>
  );
}
