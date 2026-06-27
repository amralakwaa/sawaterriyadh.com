import { AnimatedStats } from "@/components/site/animated-stats";

export function StatsSection({ stats }: { stats: { icon: string; label: string; value: string }[] }) {
  return (
    <section className="py-16 lg:py-20 bg-gradient-to-br from-primary to-foreground text-background relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />

      <div className="relative container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block rounded-full bg-accent/15 border border-accent/30 px-4 py-1.5 text-xs font-bold text-accent mb-3">
            أرقام تتحدث عنّا
          </span>
          <h2 className="font-display text-3xl lg:text-4xl font-extrabold text-balance">
            إنجازات نفخر بها في الرياض
          </h2>
          <p className="mt-3 text-background/70">
            أرقام حقيقية تعكس ثقة عملائنا ومدى التزامنا بالجودة
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <AnimatedStats stats={stats} />
        </div>
      </div>
    </section>
  );
}
