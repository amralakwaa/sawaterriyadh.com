import Link from "next/link";
import { Breadcrumbs, type Crumb } from "@/components/site/breadcrumbs";

export function PageHeader({
  title,
  subtitle,
  crumbs,
  children,
}: {
  title: string;
  subtitle?: string;
  crumbs?: Crumb[];
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-secondary/40">
      <div className="absolute inset-0 bg-grid-pattern opacity-40" />
      <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
      <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative container mx-auto px-4 py-10 lg:py-16">
        {crumbs && (
          <div className="mb-4">
            <Breadcrumbs items={crumbs} />
          </div>
        )}
        <div className="max-w-3xl">
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground leading-tight text-balance">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-4 text-base lg:text-lg text-muted-foreground leading-relaxed text-pretty">
              {subtitle}
            </p>
          )}
          {children}
        </div>
      </div>
    </section>
  );
}
