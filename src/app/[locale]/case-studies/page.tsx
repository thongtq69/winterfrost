import { CaseStudiesHero } from "@/components/sections/CaseStudiesHero";
import { CaseStudiesAbout } from "@/components/sections/CaseStudiesAbout";
import { CaseStudiesGrid } from "@/components/sections/CaseStudiesGrid";
import { liveCaseStudies } from "@/lib/case-studies-live";
import { caseStudies } from "@/lib/site";
import { getAutoText } from "@/i18n/auto-text-server";
import { localizeValue } from "@/i18n/auto-text";
import { isSupportedLocale, routing } from "@/i18n/routing";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: candidate } = await params;
  const locale = isSupportedLocale(candidate) ? candidate : routing.defaultLocale;
  const tr = await getAutoText(locale);
  return {
    title: tr("Case study - Winterfrost"),
    description: tr("Các dự án tiêu biểu Winterfrost đã đồng hành: thiết kế website, mobile app, AI và giải pháp số cho doanh nghiệp."),
  };
}

export default async function CaseStudiesIndex({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: candidate } = await params;
  const locale = isSupportedLocale(candidate) ? candidate : routing.defaultLocale;
  const tr = await getAutoText(locale);
  const items = localizeValue(
    [...liveCaseStudies, ...caseStudies].map((item) => ({
      ...item,
      contentHtml: "",
      contentText: "",
    })),
    tr,
  );
  return (
    <>
      <CaseStudiesHero />
      <CaseStudiesAbout />
      <CaseStudiesGrid items={items} />
    </>
  );
}
