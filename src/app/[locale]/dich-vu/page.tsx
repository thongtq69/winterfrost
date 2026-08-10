import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ServicesHero } from "@/components/sections/dichvu/ServicesHero";
import { ServicesListSticky } from "@/components/sections/dichvu/ServicesListSticky";
import { HowWeWorkProcess } from "@/components/sections/dichvu/HowWeWorkProcess";
import { BenefitsGrid9 } from "@/components/sections/dichvu/BenefitsGrid9";
import { CTABannerDynamic } from "@/components/sections/dichvu/CTABannerDynamic";
import { IndustriesGrid9 } from "@/components/sections/dichvu/IndustriesGrid9";
import { CaseStudyDuo } from "@/components/sections/dichvu/CaseStudyDuo";
import { TechStackTabs } from "@/components/sections/TechStackTabs";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { WikiRelated } from "@/components/sections/WikiRelated";
import { useLocalizedServicesPage } from "@/i18n/content";
import { routing } from "@/i18n/routing";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ServicesPage.meta" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}/dich-vu`,
      languages: Object.fromEntries(
        routing.locales.map((supportedLocale) => [
          supportedLocale,
          `/${supportedLocale}/dich-vu`,
        ]),
      ),
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `/${locale}/dich-vu`,
    },
  };
}

export default function DichVuPage() {
  const dichVuPage = useLocalizedServicesPage();

  return (
    <>
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          display: "flex",
          width: "100%",
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <ServicesHero />
      </div>
      <div style={{ position: "relative", zIndex: 2, background: "#fff" }}>
        <ServicesListSticky />
        <HowWeWorkProcess />
        <BenefitsGrid9 />
        <CTABannerDynamic />
        <IndustriesGrid9 />
        <TechStackTabs
          label={dichVuPage.technology.label}
          headline={dichVuPage.technology.headline}
          detail
        />
        <CaseStudyDuo />
        <FAQAccordion
          label={dichVuPage.faq.label}
          headline={dichVuPage.faq.headline}
          intro={dichVuPage.faq.intro}
          items={[...dichVuPage.faq.items]}
        />
        <WikiRelated />
      </div>
    </>
  );
}
