import { getProcessSteps } from "@/lib/data";
import { Icon } from "@/components/site/icon";
import { SectionHeading } from "./section-heading";

export async function ProcessSection() {
  const steps = await getProcessSteps();

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        <SectionHeading
          eyebrow="آلية العمل"
          title="كيف نعمل؟ خطوات بسيطة نحو مشروعك"
          subtitle="من أول تواصل حتى التسليم النهائي، نضمن لك تجربة سلسة وشفافة في كل خطوة"
        />

        <div className="relative mt-14">
          {/* Connecting line - desktop */}
          <div className="hidden lg:block absolute top-12 right-[10%] left-[10%] h-0.5 bg-gradient-to-l from-primary via-accent to-primary/30" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {steps.map((step, i) => (
              <div key={i} className="relative text-center">
                <div className="relative inline-flex">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-background border-4 border-secondary shadow-lg">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground">
                      <Icon name={step.icon} className="h-8 w-8" />
                    </div>
                  </div>
                  {/* Step number */}
                  <span className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-accent text-accent-foreground text-xs font-bold shadow-md">
                    {i + 1}
                  </span>
                </div>
                <h3 className="mt-4 font-display font-bold text-base text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
