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
import { getFAQs } from "@/lib/data";

export default async function HomePage() {
  const faqs = await getFAQs();

  return (
    <>
      <HeroSection />
      <ServicesSection />
      <FeaturesSection />
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
