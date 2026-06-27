import { Star } from "lucide-react";
import { getTestimonials } from "@/lib/data";
import { SectionHeading } from "./section-heading";
import { TestimonialSlider } from "@/components/site/testimonial-slider";

export async function TestimonialsSection() {
  const testimonials = await getTestimonials();

  return (
    <section className="py-16 lg:py-24 bg-background relative overflow-hidden" id="testimonials">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 h-72 w-72 rounded-full bg-accent/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative container mx-auto px-4">
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

        {/* Slider */}
        <div className="mt-12">
          <TestimonialSlider testimonials={testimonials} />
        </div>

        {/* Trust badges */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {[
            { value: "+3400", label: "عميل سعيد" },
            { value: "4.9/5", label: "متوسط التقييم" },
            { value: "98%", label: "نسبة الرضا" },
            { value: "+15", label: "سنة خبرة" },
          ].map((b, i) => (
            <div key={i} className="text-center rounded-2xl bg-secondary/40 p-4">
              <p className="font-display text-2xl font-extrabold text-primary">{b.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{b.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
