import "server-only";

import deServiceDetails from "@/_content/i18n/de.service-details.json";
import enServiceDetails from "@/_content/i18n/en.service-details.json";
import hiServiceDetails from "@/_content/i18n/hi.service-details.json";
import jaServiceDetails from "@/_content/i18n/ja.service-details.json";
import koServiceDetails from "@/_content/i18n/ko.service-details.json";
import zhServiceDetails from "@/_content/i18n/zh.service-details.json";
import {
  getDichVuDetailPage,
  type ServicePageContent,
} from "@/lib/dich-vu-detail-pages";
import type { Locale } from "@/i18n/routing";

type LocalizedServiceDetails = Record<string, ServicePageContent>;

const localizedServiceDetails: Partial<
  Record<Locale, LocalizedServiceDetails>
> = {
  de: deServiceDetails as LocalizedServiceDetails,
  en: enServiceDetails as LocalizedServiceDetails,
  hi: hiServiceDetails as LocalizedServiceDetails,
  ja: jaServiceDetails as LocalizedServiceDetails,
  ko: koServiceDetails as LocalizedServiceDetails,
  zh: zhServiceDetails as LocalizedServiceDetails,
};

export function getLocalizedDichVuDetailPage(
  locale: Locale,
  slug: string,
): ServicePageContent | undefined {
  return localizedServiceDetails[locale]?.[slug] ?? getDichVuDetailPage(slug);
}
