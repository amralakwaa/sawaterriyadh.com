"use client";

import { useState } from "react";
import { QuoteForm } from "./quote-form";
import { MultiStepQuoteForm } from "./multi-step-quote-form";
import { Zap, ListChecks } from "lucide-react";

interface Service { slug: string; title: string; }
interface Area { slug: string; name: string; }

interface Props {
  services: Service[];
  areas: Area[];
  defaultService?: string;
}

export function QuoteFormSwitcher({ services, areas, defaultService }: Props) {
  const [mode, setMode] = useState<"simple" | "multi">("multi");

  return (
    <div>
      {/* Mode toggle */}
      <div className="flex items-center gap-2 mb-5 p-1 rounded-xl bg-secondary w-fit">
        <button
          onClick={() => setMode("multi")}
          className={`flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-bold transition ${
            mode === "multi" ? "bg-background shadow-sm text-primary" : "text-muted-foreground"
          }`}
        >
          <ListChecks className="h-3.5 w-3.5" />
          نموذج تفصيلي
        </button>
        <button
          onClick={() => setMode("simple")}
          className={`flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-bold transition ${
            mode === "simple" ? "bg-background shadow-sm text-primary" : "text-muted-foreground"
          }`}
        >
          <Zap className="h-3.5 w-3.5" />
          نموذج سريع
        </button>
      </div>

      {mode === "multi" ? (
        <MultiStepQuoteForm services={services} areas={areas} defaultService={defaultService} />
      ) : (
        <QuoteForm services={services} areas={areas} defaultService={defaultService} />
      )}
    </div>
  );
}
