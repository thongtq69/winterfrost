import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  IndustryDetailPage,
  type IndustryDetailData,
} from "@/components/sections/industry-detail/IndustryDetailPage";
import industryDetailData from "@/lib/industry-detail-data.json";
import { getIndustryDetails } from "@/i18n/localized-details";
import { isSupportedLocale, routing, type Locale } from "@/i18n/routing";

type Params = { locale: string; slug: string };

const details = industryDetailData as Record<string, IndustryDetailData>;

export function generateStaticParams() {
  return Object.keys(details).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale: candidate, slug } = await params;
  const locale: Locale = isSupportedLocale(candidate)
    ? candidate
    : routing.defaultLocale;
  const localizedDetails = (await getIndustryDetails(locale)) as Record<
    string,
    IndustryDetailData
  >;
  const detail = localizedDetails[slug];
  if (!detail) return {};

  return {
    title: `${detail.title} - SoftBuild`,
    description: detail.hero.description,
  };
}

export default async function IndustryDetail({
  params,
}: {
  params: Promise<Params>;
}) {
  const { locale: candidate, slug } = await params;
  const locale: Locale = isSupportedLocale(candidate)
    ? candidate
    : routing.defaultLocale;
  const localizedDetails = (await getIndustryDetails(locale)) as Record<
    string,
    IndustryDetailData
  >;
  const detail = localizedDetails[slug];
  if (!detail) notFound();

  return <IndustryDetailPage data={detail} />;
}
