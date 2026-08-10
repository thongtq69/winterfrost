"use client";

import { CTABanner } from "@/components/sections/CTABanner";
import { industriesPage } from "@/lib/site";
import { useLocalizedValue } from "@/i18n/auto-text-client";

export function IndustriesCTAInline() {
  const c = useLocalizedValue(industriesPage.ctaInline);
  return (
    <CTABanner
      label={c.label}
      headline={c.headline}
      description={c.description}
      ctaLabel={c.ctaLabel}
      ctaHref={c.ctaHref}
    />
  );
}
