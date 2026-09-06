import type { Metadata } from "next";
import { IndustriesPageHero } from "@/components/sections/IndustriesPageHero";
import { IndustriesAbout } from "@/components/sections/IndustriesAbout";
import { IndustriesCounters } from "@/components/sections/IndustriesCounters";
import { IndustriesCardGrid } from "@/components/sections/IndustriesCardGrid";
import { IndustriesSolutions } from "@/components/sections/IndustriesSolutions";
import { IndustriesWhy } from "@/components/sections/IndustriesWhy";
import { IndustriesCTAInline } from "@/components/sections/IndustriesCTAInline";
import { IndustriesCases } from "@/components/sections/IndustriesCases";
import { IndustriesProcess } from "@/components/sections/IndustriesProcess";
import { IndustriesTech } from "@/components/sections/IndustriesTech";
import { IndustriesWiki } from "@/components/sections/IndustriesWiki";
import { IndustriesFAQ } from "@/components/sections/IndustriesFAQ";
import { getAutoText } from "@/i18n/auto-text-server";
import { isSupportedLocale, routing } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: candidate } = await params;
  const locale = isSupportedLocale(candidate) ? candidate : routing.defaultLocale;
  const tr = await getAutoText(locale);
  return {
    title: tr("Lĩnh vực - SoftBuild"),
    description: tr("SoftBuild phát triển giải pháp công nghệ chuyên biệt cho từng ngành — từ tài chính, y tế đến bán lẻ, logistics và bất động sản."),
  };
}

export default function IndustriesIndex() {
  return (
    <>
      <IndustriesPageHero />
      <IndustriesAbout />
      <IndustriesCounters />
      <IndustriesCardGrid />
      <IndustriesSolutions />
      <IndustriesWhy />
      <IndustriesCTAInline />
      <IndustriesCases />
      <IndustriesProcess />
      <IndustriesTech />
      <IndustriesWiki />
      <IndustriesFAQ />
    </>
  );
}
