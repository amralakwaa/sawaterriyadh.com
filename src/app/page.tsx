import { HeroSection } from "@/components/sections/hero";
import { ServicesSection } from "@/components/sections/services-section";
import { FeaturesSection } from "@/components/sections/features";
import { ProcessSection } from "@/components/sections/process";
import { ProjectsSection } from "@/components/sections/projects";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { FaqSection } from "@/components/sections/faq";
import { CtaQuoteSection } from "@/components/sections/cta-quote";
import { BlogPreviewSection } from "@/components/sections/blog-preview";
import { AreasSection } from "@/components/sections/areas";
import { CalculatorSection } from "@/components/sections/calculator";
import { StatsSection } from "@/components/sections/stats";
import { TrustBar } from "@/components/sections/trust-bar";
import { ShowCaseSection } from "@/components/sections/showcase";
import { getFAQs, getStats } from "@/lib/data";

export default async function HomePage() {
  const [faqs, stats] = await Promise.all([getFAQs(), getStats()]);

  return (
    <>
      <HeroSection />
      <TrustBar />
      <ServicesSection />
      <StatsSection stats={stats} />
      <ShowCaseSection />
      <FeaturesSection />
      <CalculatorSection />
      <ProcessSection />
      <ProjectsSection />
      <CtaQuoteSection />
      <TestimonialsSection />
      <AreasSection />
      <BlogPreviewSection />
      <FaqSection faqs={faqs} />
    </>
  );
}
