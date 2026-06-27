"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, User, ArrowLeft, Search, X } from "lucide-react";

interface Post {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  tags: string[];
  author: string;
  createdAt: Date;
}

export function BlogExplorer({ posts }: { posts: Post[] }) {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string>("all");

  const allTags = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return Array.from(set);
  }, [posts]);

  const filtered = useMemo(() => {
    let result = posts;
    if (activeTag !== "all") {
      result = result.filter((p) => p.tags.includes(activeTag));
    }
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return result;
  }, [posts, query, activeTag]);

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative max-w-xl mx-auto">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="ابحث في المقالات..."
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

      {/* Tag filters */}
      {allTags.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap justify-center">
          <button
            onClick={() => setActiveTag("all")}
            className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition ${
              activeTag === "all"
                ? "bg-primary text-primary-foreground"
                : "bg-card border border-border hover:bg-secondary"
            }`}
          >
            الكل
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition ${
                activeTag === tag
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border hover:bg-secondary"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {/* Count */}
      <p className="text-center text-sm text-muted-foreground">
        {filtered.length > 0 ? `${filtered.length} مقال` : "لا توجد نتائج"}
      </p>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="rounded-2xl border border-dashed border-border bg-card p-12 text-center">
          <Search className="h-12 w-12 mx-auto text-muted-foreground/40 mb-3" />
          <p className="font-bold text-foreground mb-1">لا توجد مقالات مطابقة</p>
          <p className="text-sm text-muted-foreground">جرّب تغيير كلمة البحث أو الفلتر</p>
        </div>
      )}

      {/* Posts grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
    </div>
  );
}
