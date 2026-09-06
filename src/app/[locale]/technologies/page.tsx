import type { Metadata } from "next";
import { TechnologiesPage } from "@/components/sections/technologies/TechnologiesPage";
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
    title: tr("Công nghệ tại SoftBuild"),
    description: tr("Khám phá nền tảng Back-end, Front-end, App, AI và điện toán đám mây được SoftBuild sử dụng để phát triển các sản phẩm số."),
  };
}

export default function TechnologiesRoute() {
  return <TechnologiesPage />;
}
