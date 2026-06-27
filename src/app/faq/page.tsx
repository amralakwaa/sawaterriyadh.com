import type { Metadata } from "next";
import { getFAQs } from "@/lib/data";
import { PageHeader } from "@/components/site/page-header";
import { FAQExplorer } from "@/components/site/faq-explorer";
import { CtaQuoteSection } from "@/components/sections/cta-quote";

export const metadata: Metadata = {
  title: "الأسئلة الشائعة | مظلات وسواتر وحدادة - الرياض",
  description:
    "إجابات شاملة على أكثر الأسئلة شيوعاً حول المظلات والسواتر وأعمال الحدادة في الرياض: الأسعار، الضمان، التركيب، الصيانة، المناطق المغطاة، طرق الدفع.",
  alternates: { canonical: "/faq" },
};

export default async function FAQPage() {
  const faqs = await getFAQs();

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <PageHeader
        title="الأسئلة الشائعة"
        subtitle="إجابات على أكثر الأسئلة التي يطرحها عملاؤنا - استخدم البحث للوصول السريع لإجابتك"
        crumbs={[{ name: "الأسئلة الشائعة" }]}
      />

      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <FAQExplorer faqs={faqs} />
          </div>
        </div>
      </section>

      <CtaQuoteSection />
    </>
  );
}
