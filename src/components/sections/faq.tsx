"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeading } from "./section-heading";

export function FaqSection({
  faqs,
}: {
  faqs: { question: string; answer: string }[];
}) {
  return (
    <section className="py-16 lg:py-24 bg-secondary/40" id="faq">
      <div className="container mx-auto px-4">
        <SectionHeading
          eyebrow="الأسئلة الشائعة"
          title="إجابات لأكثر الأسئلة شيوعاً"
          subtitle="جمعنا لك إجابات على الأسئلة التي يطرحها عملاؤنا بشكل متكرر"
        />

        <div className="max-w-3xl mx-auto mt-10">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="rounded-xl border border-border bg-card px-5 shadow-sm overflow-hidden"
              >
                <AccordionTrigger className="text-right font-bold text-foreground hover:no-underline py-5 text-base">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
