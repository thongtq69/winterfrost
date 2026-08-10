import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export const LOCALE_COOKIE_NAME = "NEXT_LOCALE";

export const routing = defineRouting({
  locales: ["vi", "en", "ja", "zh", "de", "ko", "hi"],
  defaultLocale: "vi",
  localePrefix: "always",
  localeDetection: true,
  localeCookie: {
    name: LOCALE_COOKIE_NAME,
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
    sameSite: "lax",
  },
});

export type Locale = (typeof routing.locales)[number];

export function isSupportedLocale(locale: string): locale is Locale {
  return routing.locales.some((supportedLocale) => supportedLocale === locale);
}

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
