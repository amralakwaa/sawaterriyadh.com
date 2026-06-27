import { Star, Quote } from "lucide-react";
import { getTestimonials } from "@/lib/data";
import { SectionHeading } from "./section-heading";

export async function TestimonialsSection() {
  const testimonials = await getTestimonials();

  return (
    <section className="py-16 lg:py-24 bg-background" id="testimonials">
      <div className="container mx-auto px-4">
        <SectionHeading
          eyebrow="آراء عملائنا"
          title="ماذا يقول عملاؤنا عنا؟"
          subtitle="ثقة عملائنا هي أغلى ما نملك، وآراؤهم تعكس التزامنا بالجودة والاحترافية"
        />

        {/* Rating summary */}
        <div className="mt-8 flex flex-col items-center gap-2">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="h-7 w-7 text-accent fill-accent" />
            ))}
          </div>
          <p className="text-2xl font-display font-extrabold text-foreground">4.9 / 5</p>
          <p className="text-sm text-muted-foreground">بناءً على تقييمات أكثر من 3400 عميل</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {testimonials.slice(0, 6).map((t, i) => (
            <div
              key={i}
              className="relative rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <Quote className="absolute top-5 left-5 h-10 w-10 text-primary/10" />

              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, idx) => (
                  <Star key={idx} className="h-4 w-4 text-accent fill-accent" />
                ))}
              </div>

              <p className="text-sm text-foreground/80 leading-relaxed mb-5">
                &ldquo;{t.content}&rdquo;
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground font-bold">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-sm text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
