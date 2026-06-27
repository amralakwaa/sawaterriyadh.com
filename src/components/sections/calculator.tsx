import { Calculator, Info } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { PriceCalculator } from "@/components/site/price-calculator";

export function CalculatorSection() {
  return (
    <section className="py-16 lg:py-24 bg-secondary/40 relative overflow-hidden" id="calculator">
      <div className="absolute top-0 left-0 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative container mx-auto px-4">
        <SectionHeading
          eyebrow="حاسبة الأسعار"
          title="احسب تكلفة مشروعك في دقيقة"
          subtitle="استخدم حاسبتنا التفاعلية للحصول على تقدير فوري لتكلفة مشروع المظلة أو الساتر أو الحدادة قبل التواصل معنا"
        />

        <div className="mt-12 max-w-5xl mx-auto">
          <PriceCalculator />
        </div>

        {/* Info note */}
        <div className="mt-8 max-w-3xl mx-auto rounded-xl border border-primary/20 bg-primary/5 p-4 flex items-start gap-3">
          <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
          <div className="text-sm text-muted-foreground">
            <p className="font-bold text-foreground mb-1">ملاحظة هامة</p>
            الأسعار المعروضة تقديرية لأغراض التوضيح فقط. التسعير النهائي يعتمد على معاينة الموقع الميدانية،
            نوع المواد المختارة، تصميم المشروع، وظروف التركيب. للاطلاع على عروض أسعارنا الحالية،
            {" "}
            <a href="/blog/as3ar-mawllat-2025" className="text-primary font-bold underline hover:text-accent">
              اقرأ دليل الأسعار الشامل 2025
            </a>
            .
          </div>
        </div>
      </div>
    </section>
  );
}
