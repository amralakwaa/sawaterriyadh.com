import { getFeatures } from "@/lib/data";
import { Icon } from "@/components/site/icon";
import { SectionHeading } from "./section-heading";

export async function FeaturesSection() {
  const features = await getFeatures();

  return (
    <section className="py-16 lg:py-24 bg-secondary/40">
      <div className="container mx-auto px-4">
        <SectionHeading
          eyebrow="لماذا نحن"
          title="ما الذي يميز شركة الظلال الملكية؟"
          subtitle="نلتزم بأعلى معايير الجودة والاحترافية في كل مشروع ننفذه، ونضع رضا العميل في مقدمة أولوياتنا"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
          {features.map((f, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30"
            >
              {/* Number watermark */}
              <span className="absolute -top-4 -left-2 text-8xl font-display font-extrabold text-primary/5 select-none">
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="relative">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 text-primary mb-4 transition-transform group-hover:scale-110">
                  <Icon name={f.icon} className="h-7 w-7" />
                </div>
                <h3 className="font-display font-bold text-lg text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
