import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WikiArticle } from "@/components/sections/wiki/WikiArticle";
import { wikiArticles } from "@/lib/wiki-article";
import { getAutoText } from "@/i18n/auto-text-server";
import { localizeValue } from "@/i18n/auto-text";
import { isSupportedLocale, routing, type Locale } from "@/i18n/routing";

export function generateStaticParams() {
  // Prerender the curated lead articles; the full source library renders on demand.
  return wikiArticles.slice(0, 18).map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: candidate, slug } = await params;
  const locale: Locale = isSupportedLocale(candidate) ? candidate : routing.defaultLocale;
  const tr = await getAutoText(locale);
  const source = wikiArticles.find((entry) => entry.slug === slug);
  if (!source) return {};
  const item = localizeValue(source, tr);
  return {
    title: item.title,
    description: item.metaDescription,
    openGraph: {
      title: item.title,
      description: item.metaDescription,
      images: item.ogImage || item.image ? [item.ogImage || item.image || ""] : [],
    },
  };
}

export default async function RootWikiArticle({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: candidate, slug } = await params;
  const locale: Locale = isSupportedLocale(candidate) ? candidate : routing.defaultLocale;
  const tr = await getAutoText(locale);
  const source = wikiArticles.find((entry) => entry.slug === slug);
  if (!source) notFound();

  const item = localizeValue(source, tr);
  const sourceIndex = wikiArticles.findIndex((entry) => entry.slug === slug);
  const related = Array.from({ length: Math.min(6, wikiArticles.length - 1) }, (_, offset) =>
    wikiArticles[(sourceIndex + offset + 1) % wikiArticles.length],
  );

  return <WikiArticle item={item} related={localizeValue(related, tr)} />;
}
