"use client";

import { useState, useMemo } from "react";
import { Search, X, ChevronDown, HelpCircle } from "lucide-react";

interface FAQ {
  question: string;
  answer: string;
}

const CATEGORIES = [
  { id: "all", label: "الكل", keywords: [] },
  { id: "price", label: "الأسعار", keywords: ["سعر", "تكلفة", "ميزانية", "ريال", "دفع", "تقسيط"] },
  { id: "warranty", label: "الضمان", keywords: ["ضمان", "صيانة", "عمر"] },
  { id: "installation", label: "التركيب", keywords: ["تركيب", "مدة", "تنفيذ", "وقت"] },
  { id: "areas", label: "المناطق", keywords: ["منطقة", "مناطق", "حي", "رياض"] },
  { id: "quality", label: "الجودة", keywords: ["جودة", "مواد", "معتمد", "مواصفات"] },
];

export function FAQExplorer({ faqs }: { faqs: FAQ[] }) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filtered = useMemo(() => {
    let result = faqs;
    const category = CATEGORIES.find((c) => c.id === activeCategory);
    if (category && category.keywords.length > 0) {
      result = result.filter((f) =>
        category.keywords.some((kw) => f.question.includes(kw) || f.answer.includes(kw))
      );
    }
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      result = result.filter(
        (f) => f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q)
      );
    }
    return result;
  }, [faqs, query, activeCategory]);

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="ابحث في الأسئلة..."
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

      {/* Categories */}
      <div className="flex items-center gap-2 flex-wrap">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition ${
              activeCategory === cat.id
                ? "bg-primary text-primary-foreground"
                : "bg-card border border-border hover:bg-secondary"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Count */}
      <p className="text-sm text-muted-foreground">
        {filtered.length > 0 ? `${filtered.length} سؤال` : "لا توجد نتائج"}
      </p>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="rounded-2xl border border-dashed border-border bg-card p-12 text-center">
          <HelpCircle className="h-12 w-12 mx-auto text-muted-foreground/40 mb-3" />
          <p className="font-bold text-foreground mb-1">لا توجد أسئلة مطابقة</p>
          <p className="text-sm text-muted-foreground">جرّب تغيير كلمة البحث أو الفئة</p>
        </div>
      )}

      {/* FAQ list */}
      <div className="space-y-3">
        {filtered.map((faq, i) => (
          <div
            key={i}
            className={`rounded-2xl border bg-card overflow-hidden transition-all ${
              openIndex === i ? "border-primary shadow-md" : "border-border"
            }`}
          >
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between gap-3 p-5 text-right hover:bg-secondary/50 transition-colors"
            >
              <span className="font-bold text-sm text-foreground flex-1">{faq.question}</span>
              <ChevronDown
                className={`h-5 w-5 text-primary shrink-0 transition-transform ${
                  openIndex === i ? "rotate-180" : ""
                }`}
              />
            </button>
            {openIndex === i && (
              <div className="px-5 pb-5 pt-1 text-sm text-muted-foreground leading-relaxed border-t border-border">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
