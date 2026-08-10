import { WikiIndex } from "@/components/sections/wiki/WikiIndex";
import { winterfrostWiki } from "@/lib/wiki-content";
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
    title: tr("Wiki & Kiến thức công nghệ"),
    description: tr("Góc nhìn của Winterfrost về những xu hướng công nghệ và giải pháp chuyển đổi số."),
  };
}

export default async function WikiPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: candidate } = await params;
  const locale = isSupportedLocale(candidate) ? candidate : routing.defaultLocale;
  const tr = await getAutoText(locale);
  const items = localizeValue(
    winterfrostWiki.map((item) => ({
      ...item,
      contentHtml: "",
      contentText: "",
    })),
    tr,
  );
  return <WikiIndex items={items} />;
}
