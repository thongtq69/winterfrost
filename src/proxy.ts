import createMiddleware from 'next-intl/middleware';
import type {NextRequest} from 'next/server';
import {NextResponse} from 'next/server';
import {
  isSupportedLocale,
  LOCALE_COOKIE_NAME,
  routing,
  type Locale,
} from './i18n/routing';

const handleI18nRouting = createMiddleware(routing);

const COUNTRY_LOCALES: Record<string, Locale> = {
  AT: 'de',
  CH: 'de',
  CN: 'zh',
  DE: 'de',
  HK: 'zh',
  IN: 'hi',
  JP: 'ja',
  KR: 'ko',
  MO: 'zh',
  TW: 'zh',
  VN: 'vi',
};

function pathnameHasLocale(pathname: string) {
  return routing.locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
}

function getCountryLocale(request: NextRequest): Locale | undefined {
  const country = (
    request.headers.get('x-vercel-ip-country') ??
    request.headers.get('cf-ipcountry')
  )?.toUpperCase();

  if (!country) return;
  return COUNTRY_LOCALES[country] ?? 'en';
}

export default function proxy(request: NextRequest) {
  const {pathname} = request.nextUrl;

  if (
    pathnameHasLocale(pathname) ||
    isSupportedLocale(request.cookies.get(LOCALE_COOKIE_NAME)?.value ?? '')
  ) {
    return handleI18nRouting(request);
  }

  const countryLocale = getCountryLocale(request);
  if (!countryLocale) return handleI18nRouting(request);

  const url = request.nextUrl.clone();
  url.pathname = `/${countryLocale}${pathname === '/' ? '' : pathname}`;

  const response = NextResponse.redirect(url);
  response.headers.set(
    'Vary',
    'Cookie, Accept-Language, X-Vercel-IP-Country, CF-IPCountry',
  );
  response.headers.set('Cache-Control', 'private, no-store');
  return response;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
