import type { Metadata, Viewport } from "next";
import { Manrope, Great_Vibes, Plus_Jakarta_Sans } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { notFound } from "next/navigation";
import {
  isSupportedLocale,
  type Locale,
  routing,
} from "@/i18n/routing";
import { FloatingHeader } from "@/components/chrome/FloatingHeader";
import { Footer } from "@/components/chrome/Footer";
import { FloatingButtons } from "@/components/chrome/FloatingButtons";
import { CustomCursor } from "@/components/chrome/CustomCursor";
import { FooterCTA } from "@/components/sections/FooterCTA";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "vietnamese"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const greatVibes = Great_Vibes({
  variable: "--font-script",
  subsets: ["latin", "latin-ext"],
  weight: ["400"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "700"],
  display: "swap",
});

const OPEN_GRAPH_LOCALES: Record<Locale, string> = {
  vi: "vi_VN",
  en: "en_US",
  ja: "ja_JP",
  zh: "zh_CN",
  de: "de_DE",
  ko: "ko_KR",
  hi: "hi_IN",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: candidate } = await params;
  const locale = isSupportedLocale(candidate)
    ? candidate
    : routing.defaultLocale;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const title = t("title");
  const description = t("description");

  return {
    metadataBase: new URL("https://winterfrost.tech"),
    title: {
      default: title,
      template: "%s | Winterfrost",
    },
    description,
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(
        routing.locales.map((supportedLocale) => [
          supportedLocale,
          `/${supportedLocale}`,
        ]),
      ),
    },
    openGraph: {
      title,
      description: t("openGraphDescription"),
      type: "website",
      locale: OPEN_GRAPH_LOCALES[locale],
      alternateLocale: routing.locales
        .filter((supportedLocale) => supportedLocale !== locale)
        .map((supportedLocale) => OPEN_GRAPH_LOCALES[supportedLocale]),
      siteName: "Winterfrost",
      images: ["/og-image.jpg"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: t("openGraphDescription"),
    },
    robots: { index: true, follow: true },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      className={`${manrope.variable} ${greatVibes.variable} ${plusJakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-text">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <FloatingHeader />
          <main className="flex-1">{children}</main>
          <FooterCTA />
          <Footer />
          <FloatingButtons />
          <CustomCursor />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
