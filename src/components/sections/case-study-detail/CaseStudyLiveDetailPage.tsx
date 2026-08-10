"use client";

import { Link } from "@/i18n/routing";
import { CTABanner } from "@/components/sections/CTABanner";
import { CaseStudyHeader } from "@/components/sections/CaseStudyHeader";
import { CaseStudyShowcase } from "@/components/sections/CaseStudyShowcase";
import { CaseStudyUIDesign } from "@/components/sections/CaseStudyUIDesign";
import { LatestProjects, type LatestProject } from "@/components/sections/LatestProjects";
import { CaseStudyArticleReveal } from "./CaseStudyArticleReveal";
import styles from "./CaseStudyLiveDetailPage.module.css";
import { useAutoText } from "@/i18n/auto-text-client";

type ArticleMedia =
  | {
      kind: "brandMockup";
      beforeHeading: string;
      backgroundSrc: string;
      logoSrc: string;
      screenSrc: string;
      alt: string;
    }
  | {
      kind: "project";
      beforeHeading: string;
      src: string;
      width: number;
      height: number;
      alt: string;
    };

export type LiveCaseDetail = {
  title: string;
  date: string;
  author: string;
  description: string;
  scope: Array<{ label: string; href?: string }>;
  liveUrl: string | null;
  desktop: string[];
  mobile: string[];
  ui: string[];
  contentHtml: string;
  articleMedia?: ArticleMedia[];
  heights: {
    cta: number;
    header: number;
    latest: number;
    root: number;
    showcase: number;
    ui: number;
    wp: number;
  };
};

type Props = {
  data: LiveCaseDetail;
  related: LatestProject[];
};

function articleMediaMarkup(media: ArticleMedia) {
  if (media.kind === "brandMockup") {
    return `
      <div class="${styles.brandMockup}" role="img" aria-label="${media.alt}">
        <div class="${styles.brandMockupCanvas}">
          <img class="${styles.brandMockupBackground}" src="${media.backgroundSrc}" alt="" loading="lazy" decoding="async">
          <span class="${styles.brandBadge}" aria-hidden="true">
            <img class="${styles.brandBadgeLogo}" src="${media.logoSrc}" alt="">
          </span>
          <span class="${styles.laptopScreen}" aria-hidden="true">
            <img src="${media.screenSrc}" alt="">
          </span>
        </div>
      </div>
    `;
  }

  return `
    <div
      class="${styles.projectMedia}"
      style="--project-media-width:${media.width}px;--project-media-ratio:${media.width}/${media.height}"
    >
      <img src="${media.src}" alt="${media.alt}" loading="lazy" decoding="async">
    </div>
  `;
}

function withArticleMedia(html: string, mediaItems: ArticleMedia[] = []) {
  return mediaItems.reduce((result, media) => {
    const marker = `<h2>${media.beforeHeading}</h2>`;
    return result.includes(marker)
      ? result.replace(marker, `${articleMediaMarkup(media)}${marker}`)
      : result;
  }, html);
}

export function CaseStudyLiveDetailPage({ data, related }: Props) {
  const tr = useAutoText();
  const articleHtml = withArticleMedia(data.contentHtml, data.articleMedia);
  const hasArticle = articleHtml.trim().length > 0;

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/">{tr("Home")}</Link>
          <span>/</span>
          <Link href="/case-studies">{tr("Case-studies")}</Link>
          <span>/</span>
          <strong>{data.title}</strong>
        </nav>

        <CaseStudyShowcase
          centerImages={data.desktop}
          marqueeImages={data.desktop}
          mobileImages={data.mobile}
        />

        <div className={styles.articleColumn}>
          <div
            className={styles.headerSlot}
            style={hasArticle ? { height: data.heights.header } : undefined}
          >
            <CaseStudyHeader
              title={data.title}
              date={data.date}
              author={data.author}
              description={data.description}
              scopeTags={data.scope}
              viewLiveUrl={data.liveUrl ?? undefined}
            />
          </div>
          {hasArticle && (
            <>
              <CaseStudyArticleReveal
                className={`${styles.wpContent} ${data.articleMedia?.length ? styles.wpContentMatched : ""}`}
                html={articleHtml}
                style={data.articleMedia?.length ? undefined : { height: data.heights.wp }}
              />
              <div
                className={`${styles.articleSpacer} ${data.articleMedia?.length ? styles.articleSpacerMatched : ""}`}
                aria-hidden
              />
            </>
          )}
        </div>

        <div className={styles.uiHeading}>
          <span>UI Design</span>
        </div>
        <CaseStudyUIDesign
          images={data.desktop.length ? data.desktop : data.ui}
          mobileImages={data.mobile}
          tabletImages={data.desktop}
          heading=""
        />

        <CTABanner
          label={tr("Liên hệ ngay!")}
          headline={tr("Bạn muốn doanh nghiệp thành công như vậy?")}
          description={tr("Hãy chia sẻ bài toán kinh doanh của bạn, Winterfrost Việt Nam sẽ cùng bạn xây dựng giải pháp công nghệ hiệu quả và phù hợp nhất.")}
          ctaLabel={tr("Nhận tư vấn giải pháp ngay")}
          ctaHref="/lien-he#contact-form"
        />

        <LatestProjects
          items={related}
          headingLight={tr("Các dự án nổi bật khác")}
          headingDark=""
        />
      </div>
    </div>
  );
}
