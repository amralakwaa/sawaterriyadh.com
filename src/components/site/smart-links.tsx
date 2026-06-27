import Link from "next/link";
import { ArrowLeft, FileText, MapPin, FolderGit2 } from "lucide-react";
import { getProjectsByService, getBlogPosts } from "@/lib/data";
import type { ServiceData } from "@/lib/content";

// Smart internal linking: related projects + blog posts for a service
export async function SmartLinks({ service }: { service: ServiceData }) {
  const [projects, posts] = await Promise.all([
    getProjectsByService(service.slug),
    (await getBlogPosts()).filter((p) => p.serviceSlug === service.slug),
  ]);

  if (projects.length === 0 && posts.length === 0) return null;

  return (
    <section className="py-12 lg:py-16 bg-secondary/40">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Related projects */}
          {projects.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <FolderGit2 className="h-5 w-5 text-primary" />
                <h2 className="font-display font-bold text-lg">مشاريع ذات صلة</h2>
              </div>
              <div className="space-y-2">
                {projects.slice(0, 4).map((p) => (
                  <Link
                    key={p.slug}
                    href={`/projects/${p.slug}`}
                    className="group flex items-center justify-between gap-3 rounded-xl border border-border bg-card p-3 hover:border-primary hover:shadow-sm transition-all"
                  >
                    <div className="min-w-0">
                      <p className="font-bold text-sm text-foreground truncate group-hover:text-primary">
                        {p.title}
                      </p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                        <MapPin className="h-3 w-3" />
                        {p.location}
                      </p>
                    </div>
                    <ArrowLeft className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:-translate-x-1 transition-all shrink-0" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Related blog posts */}
          {posts.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <FileText className="h-5 w-5 text-accent" />
                <h2 className="font-display font-bold text-lg">مقالات ذات صلة</h2>
              </div>
              <div className="space-y-2">
                {posts.slice(0, 4).map((p) => (
                  <Link
                    key={p.slug}
                    href={`/blog/${p.slug}`}
                    className="group flex items-center justify-between gap-3 rounded-xl border border-border bg-card p-3 hover:border-accent hover:shadow-sm transition-all"
                  >
                    <div className="min-w-0">
                      <p className="font-bold text-sm text-foreground truncate group-hover:text-accent">
                        {p.title}
                      </p>
                      <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                        {p.excerpt}
                      </p>
                    </div>
                    <ArrowLeft className="h-4 w-4 text-muted-foreground group-hover:text-accent group-hover:-translate-x-1 transition-all shrink-0" />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
