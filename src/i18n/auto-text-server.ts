import { getTranslations } from "next-intl/server";
import { autoTextKey, localizeValue } from "./auto-text";
import type { Locale } from "./routing";

export async function getAutoText(locale: Locale) {
  const t = await getTranslations({ locale, namespace: "AutoText" });
  return (source: string) => {
    const key = autoTextKey(source);
    return t.has(key) ? String(t.raw(key)) : source;
  };
}

export async function getLocalizedValue<T>(
  locale: Locale,
  value: T,
): Promise<T> {
  return localizeValue(value, await getAutoText(locale));
}
