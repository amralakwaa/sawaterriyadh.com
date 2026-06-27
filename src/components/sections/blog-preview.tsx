import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { getBlogPosts } from "@/lib/data";
import { SectionHeading } from "./section-heading";

export async function BlogPreviewSection() {
  const posts = await getBlogPosts(3);

  return (
    <section className="py-16 lg:py-24 bg-background" id="blog">
      <div className="container mx-auto px-4">
        <SectionHeading
          eyebrow="المدونة"
          title="أحدث المقالات والأدلة"
          subtitle="مقالات إرشادية ونصائح مفيدة لمساعدتك في اتخاذ القرار الأمثل لمشروعك"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {posts.map((post) => (
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
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
                    {new Intl.DateTimeFormat("ar-SA", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    }).format(post.createdAt)}
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
                <div className="mt-4 flex items-center gap-1 text-sm font-bold text-primary">
                  اقرأ المزيد
                  <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-xl border-2 border-primary px-6 py-3 text-sm font-bold text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            تصفح جميع المقالات
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
