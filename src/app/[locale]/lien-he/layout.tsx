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
    title: tr("Liên hệ SoftBuild"),
    description: tr("Liên hệ đội ngũ SoftBuild để nhận tư vấn miễn phí về website, ứng dụng, AI và giải pháp chuyển đổi số."),
  };
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
