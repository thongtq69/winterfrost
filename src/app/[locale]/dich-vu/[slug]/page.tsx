import type { Metadata } from "next";
import Image from "next/image";
import {
  isSupportedLocale,
  Link,
  routing,
  type Locale,
} from "@/i18n/routing";
import { notFound } from "next/navigation";
import { getMessages, getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/primitives/PageHero";
import { Container } from "@/components/primitives/Container";
import { CTABanner } from "@/components/sections/CTABanner";
import { Hero } from "@/components/sections/dichvu-detail/Hero";
import { Solution } from "@/components/sections/dichvu-detail/Solution";
import { Features } from "@/components/sections/dichvu-detail/Features";
import { HowWeWork } from "@/components/sections/dichvu-detail/HowWeWork";
import { Benefits } from "@/components/sections/dichvu-detail/Benefits";
import { Counter } from "@/components/sections/dichvu-detail/Counter";
import { CtaBanner } from "@/components/sections/dichvu-detail/CtaBanner";
import { Price } from "@/components/sections/dichvu-detail/Price";
import { ComprehensiveServices } from "@/components/sections/dichvu-detail/ComprehensiveServices";
import { Faq } from "@/components/sections/dichvu-detail/Faq";
import { CaseStudyDuo } from "@/components/sections/dichvu/CaseStudyDuo";
import { WikiRelated } from "@/components/sections/WikiRelated";
import { IndustriesGrid9 } from "@/components/sections/dichvu/IndustriesGrid9";
import { TechStackTabs } from "@/components/sections/TechStackTabs";
import { CustomSoftwareRawPage } from "@/components/sections/CustomSoftwareRawPage";
import { services } from "@/lib/site";
import { getLocalizedDichVuDetailPage } from "@/lib/dich-vu-detail-i18n";
import { dichVuPage } from "@/lib/dich-vu-page";
import { getLegacyServices } from "@/i18n/localized-details";
import { getAutoText } from "@/i18n/auto-text-server";
import { localizeValue } from "@/i18n/auto-text";

type Params = { locale: string; slug: string };

const extraServices = [
  {
    slug: "dich-vu-it",
    title: "Dịch vụ IT",
    metaDescription:
      "Giải pháp IT toàn diện, quản trị hạ tầng, hỗ trợ kỹ thuật và tối ưu hệ thống cho doanh nghiệp.",
    image:
      "/images/services/winterfrost/custom-software-solutions.webp",
    ogImage:
      "/images/services/winterfrost/custom-software-solutions.webp",
    contentText:
      "Winterfrost cung cấp dịch vụ IT toàn diện từ tư vấn kiến trúc, quản trị hạ tầng đến giám sát và hỗ trợ kỹ thuật. Giải pháp được thiết kế theo nhu cầu thực tế, giúp doanh nghiệp duy trì hệ thống ổn định, bảo mật và sẵn sàng mở rộng.",
  },
  {
    slug: "tu-van-chuyen-doi-so",
    title: "Tư vấn chuyển đổi số",
    metaDescription:
      "Xây dựng lộ trình chuyển đổi số rõ ràng, tối ưu quy trình và lựa chọn công nghệ phù hợp với doanh nghiệp.",
    image:
      "/images/services/winterfrost/generative-ai-integration.webp",
    ogImage:
      "/images/services/winterfrost/generative-ai-integration.webp",
    contentText:
      "Đội ngũ Winterfrost đồng hành cùng doanh nghiệp trong việc đánh giá hiện trạng, xác định mục tiêu và xây dựng lộ trình chuyển đổi số khả thi. Mỗi đề xuất tập trung vào hiệu quả vận hành, khả năng đo lường và tốc độ triển khai.",
  },
] as const;

const allServices = [...services, ...extraServices];

const websiteRelatedCases = [
  {
    slug: "website-edunora",
    category: "Y tế",
    title: "Website Edunora",
    tag: "Thiết kế Website",
    cta: "Xem dự án",
    img: "/images/migrated/homenest-com-vn/wp-content/uploads/2026/06/Man-hinh-IMAC.png",
  },
  {
    slug: "website-virela-interior",
    category: "Kiến trúc & xây dựng · Thương mại điện tử",
    title: "Website Virela Interior",
    tag: "Thiết kế Website",
    cta: "Xem dự án",
    img: "/images/projects/website-virela-interior/01-anh-bia-du-an.webp?v=wf-projects-pro-20260726",
  },
  {
    slug: "website-ceranova",
    category: "Kiến trúc & xây dựng · Thương mại điện tử",
    title: "Website Ceranova",
    tag: "Thiết kế Website",
    cta: "Xem dự án",
    img: "/images/projects/website-ceranova/01-anh-bia-du-an.webp?v=wf-projects-pro-20260726",
  },
] as const;

export function generateStaticParams() {
  return allServices.filter((s) => s.slug !== "dich-vu").map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale: candidate, slug } = await params;
  const locale = isSupportedLocale(candidate)
    ? candidate
    : routing.defaultLocale;
  const detail = getLocalizedDichVuDetailPage(locale, slug);
  const pathname = `/dich-vu/${slug}`;
  const alternates = {
    canonical: `/${locale}${pathname}`,
    languages: Object.fromEntries(
      routing.locales.map((supportedLocale) => [
        supportedLocale,
        `/${supportedLocale}${pathname}`,
      ]),
    ),
  };

  if (detail) {
    return {
      title: { absolute: detail.metaTitle },
      description: detail.hero?.description,
      alternates,
      openGraph: {
        title: detail.metaTitle,
        description: detail.hero?.description,
        url: `/${locale}${pathname}`,
      },
    };
  }

  const tr = await getAutoText(locale);
  const localizedServices = await getLegacyServices(locale);
  const s = localizeValue(
    [...localizedServices, ...extraServices],
    tr,
  ).find((item) => item.slug === slug);
  if (!s) return {};
  return {
    title: s.title,
    description: s.metaDescription,
    alternates,
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<Params> }) {
  const { locale: candidate, slug } = await params;
  const locale: Locale = isSupportedLocale(candidate)
    ? candidate
    : routing.defaultLocale;
  const t = await getTranslations({ locale, namespace: "ServiceDetail" });
  const tr = await getAutoText(locale);
  const localizedServices = await getLegacyServices(locale);
  const localizedAllServices = localizeValue(
    [...localizedServices, ...extraServices],
    tr,
  );
  const messages = await getMessages({ locale });
  const localizedServicesPage =
    (
      messages as unknown as {
        ServicesPage?: typeof dichVuPage;
      }
    ).ServicesPage ?? dichVuPage;

  if (slug === "dich-vu") notFound();

  if (slug === "phat-trien-phan-mem-tuy-chinh") {
    const customSoftware = localizedServices.find((service) => service.slug === slug);
    if (!customSoftware?.contentHtml) notFound();
    return <CustomSoftwareRawPage html={customSoftware.contentHtml} />;
  }

  const detail = getLocalizedDichVuDetailPage(locale, slug);

  if (detail) {
    const ctaAfterIndustries = detail.ctaBannerAfterIndustries === true;
    const compactFeatureBottom = [
      "phat-trien-devops",
      "phat-trien-iot",
      "phat-trien-blockchain",
    ].includes(slug);
    const legacyHowWeWork = [
      "thiet-ke-website",
      "phat-trien-devops",
      "phat-trien-iot",
      "phat-trien-blockchain",
      "phat-trien-phan-mem-mvp",
    ].includes(slug);
    const compactWiki = [
      "thiet-ke-website",
      "phat-trien-devops",
      "phat-trien-iot",
      "phat-trien-blockchain",
      "dich-vu-it",
      "tu-van-chuyen-doi-so",
    ].includes(slug);
    return (
      <>
        {detail.hero && <Hero data={detail.hero} />}
        {detail.solution && (
          <Solution
            data={detail.solution}
            hideToggles={slug === "phat-trien-devops" || slug === "phat-trien-iot"}
          />
        )}
        {detail.features && (
          <Features
            data={detail.features}
            compactBottom={compactFeatureBottom}
            ctaOutside={slug === "phat-trien-phan-mem-doanh-nghiep" || slug === "phat-trien-phan-mem-mvp"}
            ctaOutsideSpaced={slug === "phat-trien-phan-mem-mvp"}
            flushCta={slug === "van-hanh-va-bao-tri"}
          />
        )}
        {detail.howWeWork && (
          <HowWeWork
            data={detail.howWeWork}
            legacy={legacyHowWeWork}
            flushExternal={slug === "van-hanh-va-bao-tri"}
            externalCta={slug === "tu-van-chuyen-doi-so"}
          />
        )}
        {detail.benefits && (
          <Benefits
            data={detail.benefits}
            legacyLabel={detail.features?.items.some((item) => Boolean(item.iconPath))}
          />
        )}
        {!ctaAfterIndustries && detail.ctaBanner && <CtaBanner data={detail.ctaBanner} />}
        {detail.counter && <Counter data={detail.counter} legacy={slug !== "dich-vu-it" && slug !== "tu-van-chuyen-doi-so"} />}
        {detail.industries && <IndustriesGrid9 data={detail.industries} />}
        {slug === "thiet-ke-website" ? (
          <CaseStudyDuo heading={t("relatedProjects")} items={localizeValue(websiteRelatedCases, tr)} detail />
        ) : slug === "thiet-ke-app" ? (
          <CaseStudyDuo
            heading={t("relatedProjects")}
            items={localizedServicesPage.caseStudies.items.slice(0, 2)}
          />
        ) : (
          <CaseStudyDuo
            heading={t("featuredProjects")}
          />
        )}
        {ctaAfterIndustries && detail.ctaBanner && <CtaBanner data={detail.ctaBanner} />}
        {detail.price && (
          <Price
            data={detail.price}
            modern={
              detail.features?.items.some((item) => Boolean(item.iconPath)) ||
              slug === "dich-vu-it" ||
              slug === "tu-van-chuyen-doi-so"
            }
            useLabelHeadline={slug === "thiet-ke-app"}
            narrowHeader={slug === "dich-vu-it" || slug === "tu-van-chuyen-doi-so"}
          />
        )}
        {detail.techStack && (
          <TechStackTabs
            detail
            headline={[
              detail.techStack.headlineLight.trim(),
              "",
              detail.techStack.headlineDark.trim(),
            ]}
          />
        )}
        {detail.comprehensiveServices && <ComprehensiveServices data={detail.comprehensiveServices} />}
        {detail.faq && <Faq data={detail.faq} />}
        <WikiRelated compact={compactWiki} />
      </>
    );
  }

  const svc = localizedAllServices.find((s) => s.slug === slug);
  if (!svc) notFound();
  const related = localizedAllServices.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <>
      <PageHero
        title={svc.title}
        description={svc.metaDescription}
        breadcrumbs={[{ label: t("services"), href: "/dich-vu" }, { label: svc.title }]}
      />
      {(svc.image || svc.ogImage) && (
        <Container className="-mt-10">
          <div className="relative aspect-[16/8] overflow-hidden rounded-3xl ring-1 ring-border/60">
            <Image
              src={svc.ogImage || svc.image || ""}
              alt={svc.title}
              fill
              priority
              sizes="(max-width:1024px) 100vw, 1200px"
              className="object-cover"
            />
          </div>
        </Container>
      )}
      <section className="mx-auto max-w-3xl px-6 py-12">
        <article className="hn-content prose">
          {(svc.contentText || "")
            .split(/\n{2,}|\r\n{2,}/)
            .filter((p) => p.trim().length > 0)
            .map((para, i) => (
              <p key={i} className="mb-4 text-base leading-relaxed text-text/85">
                {para.trim()}
              </p>
            ))}
        </article>
      </section>
      {related.length > 0 && (
        <section className="bg-bg-alt py-16">
          <Container>
            <h2 className="mb-6 font-display text-2xl font-medium tracking-tight text-text-navy-alt">
              {t("relatedServices")}
            </h2>
            <div className="grid gap-5 md:grid-cols-3">
              {related.map((s) => (
                <Link
                  key={s.slug}
                  href={`/dich-vu/${s.slug}`}
                  className="group block overflow-hidden rounded-3xl bg-white ring-1 ring-border/60 transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="p-6">
                    <h3 className="font-display text-base font-semibold text-text-navy-alt group-hover:text-brand-link">
                      {s.title}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-sm text-text-muted">{s.metaDescription}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-brand-link">
                      {t("viewMore")}
                      <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}
      <CTABanner />
    </>
  );
}
