import type { Metadata } from "next";
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
    title: tr("Tuyển dụng Winterfrost"),
    description: tr("Khám phá các vị trí tuyển dụng và cơ hội phát triển sự nghiệp cùng đội ngũ Winterfrost."),
  };
}

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
