import "server-only";

import industryDetailsVi from "@/lib/industry-detail-data.json";
import caseDetailsVi from "@/lib/case-study-live-details.json";
import wikiDetailsVi from "@/_content/wiki-live-details.json";
import { jobContents as jobDetailsVi } from "@/lib/job-data";
import { caseStudies, services, wiki } from "@/lib/site";
import type { Locale } from "./routing";

async function loadLocalizedJson<T>(
  locale: Locale,
  name:
    | "industry-details"
    | "case-details"
    | "wiki-details"
    | "job-details"
    | "legacy-case-studies"
    | "legacy-services"
    | "remote-wiki"
    | "legacy-wiki",
  fallback: T,
): Promise<T> {
  try {
    return (
      await import(`../_content/i18n/${locale}.${name}.json`)
    ).default as T;
  } catch (error) {
    const code = (error as { code?: unknown }).code;
    if (code === "MODULE_NOT_FOUND" || code === "ERR_MODULE_NOT_FOUND") {
      return fallback;
    }
    throw error;
  }
}

export async function getIndustryDetails(locale: Locale) {
  if (locale === "vi") return industryDetailsVi;
  return loadLocalizedJson<typeof industryDetailsVi>(
    locale,
    "industry-details",
    industryDetailsVi,
  );
}

export async function getCaseDetails(locale: Locale) {
  if (locale === "vi") return caseDetailsVi;
  return loadLocalizedJson<typeof caseDetailsVi>(
    locale,
    "case-details",
    caseDetailsVi,
  );
}

export async function getWikiDetails(locale: Locale) {
  if (locale === "vi") return wikiDetailsVi;
  return loadLocalizedJson<typeof wikiDetailsVi>(
    locale,
    "wiki-details",
    wikiDetailsVi,
  );
}

export async function getJobDetails(locale: Locale) {
  if (locale === "vi") return jobDetailsVi;
  return loadLocalizedJson<typeof jobDetailsVi>(
    locale,
    "job-details",
    jobDetailsVi,
  );
}

export async function getLegacyCaseStudies(locale: Locale) {
  if (locale === "vi") return caseStudies;
  return loadLocalizedJson<typeof caseStudies>(
    locale,
    "legacy-case-studies",
    caseStudies,
  );
}

export async function getLegacyWiki(locale: Locale) {
  if (locale === "vi") return wiki;
  return loadLocalizedJson<typeof wiki>(locale, "legacy-wiki", wiki);
}

export async function getLegacyServices(locale: Locale) {
  if (locale === "vi") return services;
  return loadLocalizedJson<typeof services>(
    locale,
    "legacy-services",
    services,
  );
}

export async function getRemoteWiki(locale: Locale) {
  if (locale === "vi") return {} as Record<string, string>;
  return loadLocalizedJson<Record<string, string>>(locale, "remote-wiki", {});
}
