import Link from "next/link";
import { ChevronLeft, Home } from "lucide-react";

export interface Crumb {
  name: string;
  href?: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "الرئيسية", item: "/" },
      ...items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: item.name,
        item: item.href,
      })),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="مسار التنقل" className="flex items-center gap-1 text-sm text-muted-foreground overflow-x-auto">
        <Link href="/" className="flex items-center gap-1 hover:text-primary transition-colors shrink-0">
          <Home className="h-3.5 w-3.5" />
          <span className="sr-only">الرئيسية</span>
        </Link>
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-1 shrink-0">
            <ChevronLeft className="h-3.5 w-3.5 text-muted-foreground/50" />
            {item.href ? (
              <Link href={item.href} className="hover:text-primary transition-colors">
                {item.name}
              </Link>
            ) : (
              <span className="text-foreground font-medium">{item.name}</span>
            )}
          </div>
        ))}
      </nav>
    </>
  );
}
