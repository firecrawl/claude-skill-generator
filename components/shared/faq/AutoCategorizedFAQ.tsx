"use client";

import CategorizedFAQ from "./CategorizedFAQ";
import { whyFirecrawlData as whyFirecrawl } from "@/marketing-global/shared/why-firecrawl";
import { FAQ } from "@/marketing-global/types";

interface AutoCategorizedFAQProps {
  faqs: FAQ[];
  categorySize?: number; // How many FAQs per category
}

export default function AutoCategorizedFAQ({
  faqs,
  categorySize = 3,
}: AutoCategorizedFAQProps) {
  if (!faqs || faqs.length === 0) return null;

  // Split FAQs into categories
  const categories: Array<{ label: string; items: FAQ[] }> = [];
  const labels = ["General", "Technical", "Integration", "Advanced"];

  for (let i = 0; i < faqs.length; i += categorySize) {
    const categoryIndex = Math.floor(i / categorySize);
    const label =
      labels[categoryIndex] ||
      `More Questions ${categoryIndex - labels.length + 1}`;

    categories.push({
      label,
      items: faqs.slice(i, i + categorySize),
    });
  }

  // Add "Why Firecrawl?" category at the end
  categories.push({
    label: "Why Firecrawl?",
    items: whyFirecrawl.benefits.map((benefit, index) => ({
      id: benefit.id,
      question: benefit.title,
      answer: benefit.description,
    })),
  });

  return <CategorizedFAQ categories={categories} />;
}
