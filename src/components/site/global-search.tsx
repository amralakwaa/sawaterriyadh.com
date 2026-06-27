"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, X, Wrench, FolderGit2, FileText, MapPin, HelpCircle, Loader2, TrendingUp } from "lucide-react";
import Link from "next/link";

interface SearchResult {
  type: string;
  title: string;
  description: string;
  href: string;
  icon: string;
}

const ICONS: Record<string, React.ElementType> = {
  wrench: Wrench,
  folder: FolderGit2,
  file: FileText,
  map: MapPin,
  help: HelpCircle,
};

const TYPE_COLORS: Record<string, string> = {
  "خدمة": "bg-primary/10 text-primary",
  "مشروع": "bg-accent/15 text-accent",
  "مقال": "bg-blue-100 text-blue-700",
  "منطقة": "bg-violet-100 text-violet-700",
  "سؤال": "bg-amber-100 text-amber-700",
};

const POPULAR_SEARCHES = ["مظلات سيارات", "سواتر", "حدادة", "أسعار", "الرياض"];

export function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Open with Cmd/Ctrl + K
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery("");
      setResults([]);
    }
  }, [open]);

  // Debounced search
  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      setTotal(0);
      return;
    }
    setLoading(true);
    const t = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data.results || []);
        setTotal(data.total || 0);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);
    return () => clearTimeout(t);
  }, [query]);

  const goToResult = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(true)}
        className="hidden lg:flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm text-muted-foreground hover:border-primary hover:text-primary transition-colors min-w-[200px]"
        aria-label="بحث"
      >
        <Search className="h-4 w-4" />
        <span className="flex-1 text-right">ابحث في الموقع...</span>
        <kbd className="rounded bg-secondary px-1.5 py-0.5 text-[10px] font-bold text-muted-foreground">⌘K</kbd>
      </button>

      {/* Mobile trigger */}
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden flex items-center justify-center rounded-lg p-2 text-foreground hover:bg-secondary transition-colors"
        aria-label="بحث"
      >
        <Search className="h-5 w-5" />
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-[70] flex items-start justify-center pt-[10vh] px-4 bg-black/60 backdrop-blur-sm animate-fade-up"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-2xl bg-card rounded-2xl shadow-2xl border border-border overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search input */}
            <div className="flex items-center gap-3 p-4 border-b border-border">
              <Search className="h-5 w-5 text-muted-foreground shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="ابحث عن خدمة، مشروع، مقال..."
                className="flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground"
              />
              {loading && <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />}
              <button
                onClick={() => setOpen(false)}
                className="rounded-lg p-1 hover:bg-secondary transition-colors"
                aria-label="إغلاق"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Results */}
            <div className="max-h-[60vh] overflow-y-auto">
              {query.trim().length < 2 ? (
                // Popular searches
                <div className="p-4">
                  <p className="text-xs font-bold text-muted-foreground mb-3 flex items-center gap-1">
                    <TrendingUp className="h-3.5 w-3.5" />
                    عمليات بحث شائعة
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {POPULAR_SEARCHES.map((term) => (
                      <button
                        key={term}
                        onClick={() => setQuery(term)}
                        className="rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground px-3 py-1.5 text-xs font-semibold transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              ) : results.length === 0 && !loading ? (
                <div className="p-12 text-center">
                  <Search className="h-10 w-10 mx-auto text-muted-foreground/40 mb-3" />
                  <p className="font-bold text-foreground mb-1">لا توجد نتائج لـ "{query}"</p>
                  <p className="text-sm text-muted-foreground">جرّب كلمات مختلفة أو تصفح خدماتنا</p>
                  <Link
                    href="/services"
                    onClick={() => setOpen(false)}
                    className="inline-flex items-center gap-1 mt-4 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-primary-foreground"
                  >
                    تصفح جميع الخدمات
                  </Link>
                </div>
              ) : (
                <div className="p-2">
                  {results.length > 0 && (
                    <p className="text-xs font-bold text-muted-foreground px-3 py-2">
                      {total} نتيجة
                    </p>
                  )}
                  {results.map((r, i) => {
                    const Icon = ICONS[r.icon] || FileText;
                    return (
                      <button
                        key={i}
                        onClick={() => goToResult(r.href)}
                        className="w-full flex items-center gap-3 rounded-lg p-3 hover:bg-secondary transition-colors text-right group"
                      >
                        <div className={`flex h-10 w-10 items-center justify-center rounded-lg shrink-0 ${TYPE_COLORS[r.type] || "bg-secondary"}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="font-bold text-sm text-foreground truncate group-hover:text-primary transition-colors">
                              {r.title}
                            </p>
                            <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${TYPE_COLORS[r.type] || "bg-secondary"}`}>
                              {r.type}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground truncate mt-0.5">{r.description}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-4 py-2.5 border-t border-border bg-secondary/30 text-[10px] text-muted-foreground">
              <span>اضغط Enter للفتح • Esc للإغلاق</span>
              <span>مدعوم بالبحث الذكي</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
