import type { Metadata } from "next";
import { Link } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { Container } from "@/components/primitives/Container";
import { CTABanner } from "@/components/sections/CTABanner";
import { CaseStudyShowcase } from "@/components/sections/CaseStudyShowcase";
import { CaseStudyHeader } from "@/components/sections/CaseStudyHeader";
import { CaseStudyUIDesign } from "@/components/sections/CaseStudyUIDesign";
import { LatestProjects } from "@/components/sections/LatestProjects";
import {
  CaseStudyLiveDetailPage,
  type LiveCaseDetail,
} from "@/components/sections/case-study-detail/CaseStudyLiveDetailPage";
import { LegacyCaseStudyRawPage } from "@/components/sections/case-study-detail/LegacyCaseStudyRawPage";
import { liveCaseStudies } from "@/lib/case-studies-live";
import { caseStudies, type ContentPage } from "@/lib/site";
import {
  extractBodyHtml,
  extractCenterImages,
  extractHeaderDescription,
  extractMarqueeImages,
  extractUIDesignImages,
} from "@/lib/case-study-utils";
import {
  getCaseDetails,
  getLegacyCaseStudies,
} from "@/i18n/localized-details";
import { getAutoText } from "@/i18n/auto-text-server";
import { localizeValue } from "@/i18n/auto-text";
import { isSupportedLocale, routing, type Locale } from "@/i18n/routing";

type Params = { locale: string; slug: string };
const allCaseStudies = [...liveCaseStudies, ...caseStudies];

export function generateStaticParams() {
  return allCaseStudies
    .filter(
      (s, index) =>
        s.slug !== "case-studies" &&
        allCaseStudies.findIndex((x) => x.slug === s.slug) === index,
    )
    .map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale: candidate, slug } = await params;
  const locale: Locale = isSupportedLocale(candidate) ? candidate : routing.defaultLocale;
  const tr = await getAutoText(locale);
  const localizedLegacy = await getLegacyCaseStudies(locale);
  const localizedCases = localizeValue(
    [...liveCaseStudies, ...localizedLegacy],
    tr,
  );
  const s = localizedCases.find((x) => x.slug === slug);
  if (!s) return {};
  return { title: s.metaTitle ?? s.title, description: s.metaDescription };
}

const SERVICE_HREF: Record<string, string> = {
  "Thiết kế Website": "/dich-vu/thiet-ke-website",
  "Thiết kế App": "/dich-vu/phat-trien-ung-dung-theo-yeu-cau",
};

const CATEGORY_HREF: Record<string, string> = {
  "Bất động sản": "/linh-vuc/bat-dong-san",
  "Bán lẻ": "/linh-vuc/ban-le",
  "Y tế": "/linh-vuc/y-te",
  "Truyền thông": "/linh-vuc/truyen-thong",
  "Du lịch": "/linh-vuc/du-lich",
  "Sản xuất": "/linh-vuc/san-xuat",
};

const LIVE_CASE_TAGS: Record<string, string[]> = {
  "website-edunora": ["Y tế"],
  "website-virela-interior": ["Kiến trúc & xây dựng", "Thương mại điện tử"],
  "website-ceranova": ["Kiến trúc & xây dựng", "Thương mại điện tử"],
  "website-rovena-travel": ["Du lịch"],
  "website-zenovia-retail": ["Bán lẻ", "Chuỗi cung ứng"],
  "website-veloura-nails": ["Bán lẻ"],
};

const SHARED_FALLBACK_SLUGS = new Set([
  "website-candella-works",
  "website-mirava",
  "website-bytevera",
  "website-motoria-link",
  "website-auriva-land",
  "website-rovena-mobility",
  "website-brewvia",
  "website-arcvera-construction",
]);

function createFallbackLiveDetail(
  cs: ContentPage,
  source: ContentPage,
): LiveCaseDetail {
  const projectRoot = `/images/projects/${cs.slug}`;
  const gallery = [
    cs.image,
    `${projectRoot}/01-anh-bia-du-an-master-v2.png`,
  ].filter((src): src is string => Boolean(src));

  const scope: LiveCaseDetail["scope"] = [];
  if (cs.service) {
    scope.push({ label: cs.service, href: source.service ? SERVICE_HREF[source.service] : undefined });
  }
  if (cs.category) {
    scope.push({ label: cs.category, href: source.category ? CATEGORY_HREF[source.category] : undefined });
  }

  return {
    title: cs.title,
    date: cs.year || "2026/04/25",
    author: cs.author || "Anh Thư",
    description: cs.metaDescription || cs.desc || "",
    scope,
    liveUrl: cs.url ?? null,
    desktop: gallery,
    mobile: [],
    ui: gallery,
    contentHtml: "",
    heights: {
      cta: 0,
      header: 0,
      latest: 0,
      root: 0,
      showcase: 0,
      ui: 0,
      wp: 0,
    },
  };
}

export default async function CaseStudyDetail({ params }: { params: Promise<Params> }) {
  const { locale: candidate, slug } = await params;
  const locale: Locale = isSupportedLocale(candidate) ? candidate : routing.defaultLocale;
  const tr = await getAutoText(locale);
  const localizedLegacy = await getLegacyCaseStudies(locale);
  const localizedCases = localizeValue(
    [...liveCaseStudies, ...localizedLegacy],
    tr,
  );
  const cs = localizedCases.find((x) => x.slug === slug);
  const sourceCase = allCaseStudies.find((item) => item.slug === slug);
  if (!cs || cs.slug === "case-studies") notFound();
  if (!sourceCase) notFound();
  const liveCaseTags = localizeValue(LIVE_CASE_TAGS, tr);

  const localizedLiveDetails = (await getCaseDetails(locale)) as Record<
    string,
    LiveCaseDetail
  >;
  const liveDetail = localizedLiveDetails[slug];
  if (liveDetail) {
    const related = localizeValue(liveCaseStudies, tr)
      .filter((item) => item.slug !== slug)
      .slice(0, 4)
      .map((item) => ({
        slug: item.slug,
        name: item.title,
        type: item.service ?? tr("Thiết kế Website"),
        tags: liveCaseTags[item.slug] ?? (item.category ? [item.category] : []),
        image: item.image ?? "",
      }));

    return <CaseStudyLiveDetailPage data={liveDetail} related={related} />;
  }

  if (SHARED_FALLBACK_SLUGS.has(slug)) {
    const related = localizedCases
      .filter((item) => item.slug !== slug && item.slug !== "case-studies")
      .slice(0, 4)
      .map((item) => ({
        slug: item.slug,
        name: item.title,
        type: item.service ?? tr("Thiết kế Website"),
        tags: liveCaseTags[item.slug] ?? (item.category ? [item.category] : []),
        image: item.image ?? "",
      }));

    return (
      <CaseStudyLiveDetailPage
        data={createFallbackLiveDetail(cs, sourceCase)}
        related={related}
      />
    );
  }

  /*
   * The archived HTML in site-data is the canonical legacy snapshot. Fetching
   * this same production route caused each deploy to wrap the previous page
   * again and also discarded local image/content migrations.
   */
  if (cs.contentHtml) return <LegacyCaseStudyRawPage html={cs.contentHtml} />;

  const fallbackImg = cs.image ? [cs.image] : [];
  const centerImages = extractCenterImages(cs.contentHtml, fallbackImg);
  const marqueeImages = extractMarqueeImages(cs.contentHtml, centerImages);
  const uiImages = extractUIDesignImages(cs.contentHtml, marqueeImages);
  const body = extractBodyHtml(cs.contentHtml);
  const heroDescription = extractHeaderDescription(cs.contentHtml) || cs.metaDescription || "";

  const scopeTags: { label: string; href?: string }[] = [];
  if (cs.service) scopeTags.push({ label: cs.service, href: sourceCase.service ? SERVICE_HREF[sourceCase.service] : undefined });
  if (cs.category) scopeTags.push({ label: cs.category, href: sourceCase.category ? CATEGORY_HREF[sourceCase.category] : undefined });

  const related = localizedCases
    .filter((x) => x.slug !== slug && x.slug !== "case-studies")
    .slice(0, 4)
    .map((r) => ({
      slug: r.slug,
      name: r.title,
      type: r.service ?? tr("Thiết kế Website"),
      tags: r.category ? [r.category] : [],
      image: r.image ?? "",
    }));

  return (
    <>
      <section className="bg-bg-alt pt-[120px] pb-4">
        <Container>
          <nav className="flex items-center gap-2 text-sm text-text-muted">
            <Link href="/" className="hover:text-brand-link">{tr("Home")}</Link>
            <span>/</span>
            <Link href="/case-studies" className="hover:text-brand-link">{tr("Case-studies")}</Link>
            <span>/</span>
            <span className="font-medium text-text-navy-deep">{cs.title}</span>
          </nav>
        </Container>
      </section>

      <CaseStudyShowcase centerImages={centerImages} marqueeImages={marqueeImages} />

      <Container>
        <CaseStudyHeader
          title={cs.title}
          date="2026/04/25"
          author="Anh Thư"
          description={heroDescription}
          scopeTags={scopeTags}
          viewLiveUrl={cs.url ?? undefined}
        />

        {body ? (
          <article
            className="hn-content mx-auto max-w-[1180px] pb-12 px-6"
            dangerouslySetInnerHTML={{ __html: body }}
          />
        ) : null}

        <div className="mx-auto max-w-[1180px] px-6">
          <CaseStudyUIDesign images={uiImages} />
        </div>
      </Container>

      <CTABanner
        label={tr("Liên hệ ngay!")}
        headline={tr("Dẫn đầu kỷ nguyên số với hệ thống AI độc quyền")}
        description={tr("Đừng chỉ dừng lại ở tự động hóa thông thường. Hãy cùng SoftBuild khai phá sức mạnh dữ liệu để xây dựng những mô hình AI riêng biệt, giúp doanh nghiệp của bạn sở hữu lợi thế cạnh tranh tuyệt đối trên thị trường.")}
        ctaLabel={tr("Xây dựng lộ trình AI ngay")}
        ctaHref="/lien-he"
      />

      <LatestProjects items={related} />
    </>
  );
}
