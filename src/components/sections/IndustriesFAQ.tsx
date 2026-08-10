"use client";

import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { industriesPage } from "@/lib/site";
import { useLocalizedValue } from "@/i18n/auto-text-client";

export function IndustriesFAQ() {
  const f = useLocalizedValue(industriesPage.faq);
  return (
    <FAQAccordion
      label={f.label}
      headline={f.headline}
      intro={f.intro}
      items={f.items}
    />
  );
}
