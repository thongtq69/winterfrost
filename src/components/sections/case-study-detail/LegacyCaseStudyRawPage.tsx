"use client";

import {
  forwardRef,
  memo,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { CaseStudyUIDesign } from "@/components/sections/CaseStudyUIDesign";
import { useAutoText } from "@/i18n/auto-text-client";
import "./legacy-case-study.css";

const APP_SIDE_CLASS = "showcase-module__TljteG__sideImg";
const APP_FAR_CLASS = "showcase-module__TljteG__farImg";
const APP_SCREEN_SELECTOR = [
  `img.${APP_SIDE_CLASS}`,
  "img.showcase-module__TljteG__screenInside",
].join(", ");
const LEGACY_WEB_FRAME =
  "/images/migrated/homenest-software/wp-content/uploads/2026/04/SCREEN-e1775468629485.png";
const WEB_FRAME =
  "/images/migrated/homenest-com-vn/wp-content/uploads/2026/06/Man-hinh-IMAC.png";
const WEB_SHOWCASE_PATTERN =
  /(<section class="webShowcase-module__j9OAiq__webShowcaseSection">[\s\S]*?)(<\/section>)/g;
const WEB_SHOWCASE_CONTROLS = [
  '<button class="webShowcase-module__j9OAiq__navPrev" aria-label="Previous image">',
  '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m12 19-7-7 7-7"></path><path d="M19 12H5"></path></svg>',
  "</button>",
  '<button class="webShowcase-module__j9OAiq__navNext" aria-label="Next image">',
  '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>',
  "</button>",
].join("");
const UI_DESIGN_TEXT = ">UI Design</span>";
const CTA_SECTION = '<section class="CTABannerDynamic-module__UTmUdW__wrapper">';
const UI_DESIGN_MOUNT = '<div data-legacy-ui-design-root="true"></div>';
const CTA_HEADING = "Bạn muốn doanh nghiệp thành công như vậy?";
const CTA_DESCRIPTION =
  "Hãy chia sẻ bài toán kinh doanh của bạn, Winterfrost Việt Nam sẽ cùng bạn xây dựng giải pháp công nghệ hiệu quả và phù hợp nhất.";
const CTA_LABEL = "Nhận tư vấn giải pháp ngay";

type PreparedLegacyHtml = {
  html: string;
  uiImages: string[];
  uiMode: "app" | "web";
};

function replaceUIDesign(html: string) {
  const labelIndex = html.indexOf(UI_DESIGN_TEXT);
  const ctaIndex = html.indexOf(CTA_SECTION, labelIndex);
  if (labelIndex < 0 || ctaIndex < 0) {
    return { html, images: [] };
  }

  const headingEnd = html.indexOf("</div>", labelIndex);
  if (headingEnd < 0 || headingEnd >= ctaIndex) {
    return { html, images: [] };
  }

  const designStart = headingEnd + "</div>".length;
  const designHtml = html.slice(designStart, ctaIndex);
  const images = [
    ...new Set(
      [...designHtml.matchAll(/<img\b[^>]*\bsrc="([^"]+)"/g)].map(
        (match) => match[1],
      ),
    ),
  ];

  return {
    html: `${html.slice(0, designStart)}${UI_DESIGN_MOUNT}${html.slice(ctaIndex)}`,
    images,
  };
}

function normalizeCaseStudyTemplate(
  html: string,
  translate: (source: string) => string,
) {
  return html
    .replace(
      /(<h2 class="CTABannerDynamic-module__UTmUdW__heading">)[\s\S]*?(<\/h2>)/,
      `$1${translate(CTA_HEADING)}$2`,
    )
    .replace(
      /(<p class="CTABannerDynamic-module__UTmUdW__description">)[\s\S]*?(<\/p>)/,
      `$1${translate(CTA_DESCRIPTION)}$2`,
    )
    .replace(
      /(<a class="CTABannerDynamic-module__UTmUdW__ctaButton" href=")\/lien-he(?:#contact-form)?("[^>]*>)[\s\S]*?(<\/a>)/,
      `$1/lien-he#contact-form$2${translate(CTA_LABEL)}$3`,
    )
    .replace(
      /(<h2 class="content-module__ZwfD0a__latestProjectsHeading">)[\s\S]*?(<\/h2>)/,
      `$1<span class="content-module__ZwfD0a__headingLight">${translate("Các dự án nổi bật khác")}</span>$2`,
    );
}

function prepareLegacyHtml(
  html: string,
  translate: (source: string) => string,
): PreparedLegacyHtml {
  let sideIndex = 0;

  const preparedHtml = html
    /*
     * These are shared template assets rather than project screenshots. The
     * Winterfrost paths currently return a branded 404 page, while the original
     * HomeNest assets remain available. Project image URLs are left untouched.
     */
    .replaceAll('src="/assets/', 'src="https://homenest.com.vn/assets/')
    .replaceAll('srcset="/assets/', 'srcset="https://homenest.com.vn/assets/')
    /*
     * The rebrand export pointed the website showcase at an older, much taller
     * monitor shell. Restore the original iMac shell so the frame ratio, inner
     * crop and section height match the source template.
     */
    .replaceAll(LEGACY_WEB_FRAME, WEB_FRAME)
    /*
     * The rebrand export dropped farImg from the two outer phone slots. Restore
     * the semantic state in markup so responsive CSS works before hydration.
     */
    .replace(
      /<img\b[^>]*class="([^"]*\bshowcase-module__TljteG__sideImg\b[^"]*)"[^>]*>/g,
      (tag: string, className: string) => {
        const far = sideIndex === 0 || sideIndex === 3;
        sideIndex += 1;
        if (!far || className.includes(APP_FAR_CLASS)) return tag;
        return tag.replace(`class="${className}"`, `class="${className} ${APP_FAR_CLASS}"`);
      },
    )
    /*
     * Rebranded website records also lost the source carousel controls. Add
     * them to the section markup before hydration to avoid a visual flash.
     */
    .replace(
      WEB_SHOWCASE_PATTERN,
      (section: string, content: string, closingTag: string) => (
        content.includes("webShowcase-module__j9OAiq__navPrev")
          ? section
          : `${content}${WEB_SHOWCASE_CONTROLS}${closingTag}`
      ),
    );

  const uiMode = preparedHtml.includes(
    "showcase-module__TljteG__showcaseSection",
  )
    ? "app"
    : "web";
  const uiDesign = replaceUIDesign(preparedHtml);

  return {
    html: normalizeCaseStudyTemplate(uiDesign.html, translate),
    uiImages: uiDesign.images,
    uiMode,
  };
}

function LegacyAppUIDesign({ images }: { images: string[] }) {
  if (!images.length) return null;

  const marqueeImages = [...images, ...images, ...images, ...images];

  return (
    <section className="legacy-app-ui-design" aria-label="UI Design">
      <div className="legacy-app-ui-design__track">
        {marqueeImages.map((src, index) => (
          <div className="legacy-app-ui-design__card" key={`${src}-${index}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt=""
              aria-hidden="true"
              draggable={false}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

const LegacyHtmlRoot = memo(
  forwardRef<HTMLDivElement, { html: string }>(function LegacyHtmlRoot(
    { html },
    ref,
  ) {
    return (
      <div
        ref={ref}
        style={{ display: "contents", lineHeight: "normal" }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }),
);

export function LegacyCaseStudyRawPage({ html }: { html: string }) {
  const tr = useAutoText();
  const rootRef = useRef<HTMLDivElement>(null);
  const page = useMemo(() => prepareLegacyHtml(html, tr), [html, tr]);
  const [uiDesignTarget, setUiDesignTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    setUiDesignTarget(
      root.querySelector<HTMLElement>("[data-legacy-ui-design-root]"),
    );

    const runningAnimations = new Set<Animation>();
    const animate = (
      element: HTMLElement,
      keyframes: Keyframe[],
      options: KeyframeAnimationOptions,
    ) => {
      const animation = element.animate(keyframes, options);
      runningAnimations.add(animation);
      animation.addEventListener(
        "finish",
        () => {
          runningAnimations.delete(animation);
          animation.cancel();
        },
        { once: true },
      );
      return animation;
    };

    /*
     * Only these wrappers reveal on scroll in the original template. A broad
     * [style*="opacity:0"] selector also reveals inactive carousel slides and
     * destroys their state.
     */
    const revealItems = [
      ...root.querySelectorAll<HTMLElement>(
        [
          ".content-module__ZwfD0a__wpContentContainer",
          ".CTABannerDynamic-module__UTmUdW__card",
        ].join(", "),
      ),
    ];

    const reveal = (element: HTMLElement) => {
      const duration = element.classList.contains("content-module__ZwfD0a__wpContentContainer")
        ? 720
        : 650;
      element.style.transition = [
        `opacity ${duration}ms cubic-bezier(.22,1,.36,1)`,
        `transform ${duration}ms cubic-bezier(.22,1,.36,1)`,
      ].join(", ");
      element.style.opacity = "1";
      element.style.transform = "none";
    };

    const observer = typeof IntersectionObserver === "undefined"
      ? null
      : new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            const element = entry.target as HTMLElement;
            reveal(element);
            observer?.unobserve(element);
          }
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.04 },
      );

    if (observer) {
      revealItems.forEach((element) => observer.observe(element));
    } else {
      revealItems.forEach(reveal);
    }

    const appScreens = [...root.querySelectorAll<HTMLImageElement>(APP_SCREEN_SELECTOR)];
    const appDisposers: Array<() => void> = [];
    let appTimer = 0;

    if (appScreens.length === 5) {
      appScreens[0].classList.add(APP_FAR_CLASS);
      appScreens[4].classList.add(APP_FAR_CLASS);

      const sources = appScreens.map((image) => image.src);
      const scales = [0.75, 0.9, 1, 0.9, 0.75] as const;
      let active = 2;

      const sourceAt = (index: number) => sources[(index + sources.length) % sources.length];
      const isMobile = () => window.matchMedia("(max-width: 768px)").matches;
      const restingOpacity = (index: number) => {
        if (index === 2 || !isMobile()) return 1;
        return index === 0 || index === 4 ? 0 : 0.5;
      };
      const restingFilter = (index: number) => (
        index === 0 || index === 4 ? "blur(0.9px)" : "blur(0px)"
      );

      const setRestingState = (image: HTMLImageElement, index: number) => {
        image.style.opacity = "";
        image.style.transform = index === 2 ? "" : `scale(${scales[index]})`;
        image.style.transformOrigin = "50% 50%";
        image.style.filter = restingFilter(index);
        image.style.willChange = "opacity, transform, filter";
      };

      const render = (
        next: number,
        direction: 1 | -1,
        mode: "entrance" | "slide",
      ) => {
        active = (next + sources.length) % sources.length;
        const indexes = [active - 2, active - 1, active, active + 1, active + 2];
        const nearWidth = appScreens[1].getBoundingClientRect().width;
        const distance = nearWidth + (isMobile() ? 20 : 24);

        appScreens.forEach((image, index) => {
          image.src = sourceAt(indexes[index]);
          setRestingState(image, index);

          const opacity = restingOpacity(index);
          const filter = restingFilter(index);
          const scale = scales[index];
          const fromTransform = mode === "entrance"
            ? "scale(0.5)"
            : `translateX(${direction * distance}px) scale(${Math.max(0.5, scale * 0.92)})`;

          animate(
            image,
            [
              { opacity: 0, transform: fromTransform, filter: "blur(0px)" },
              {
                opacity,
                transform: `translateX(0) scale(${scale})`,
                filter,
              },
            ],
            {
              duration: mode === "entrance" ? 520 : 540,
              easing: "cubic-bezier(.22,1,.36,1)",
            },
          );
        });
      };

      const resetTimer = () => {
        window.clearInterval(appTimer);
        appTimer = window.setInterval(() => render(active + 1, 1, "slide"), 3000);
      };
      const go = (direction: 1 | -1) => {
        render(active + direction, direction, "slide");
        resetTimer();
      };

      render(active, 1, "entrance");

      const previous = root.querySelector<HTMLButtonElement>(
        'button[aria-label="Previous image"]',
      );
      const next = root.querySelector<HTMLButtonElement>('button[aria-label="Next image"]');
      const onPrevious = () => go(-1);
      const onNext = () => go(1);

      previous?.addEventListener("click", onPrevious);
      next?.addEventListener("click", onNext);
      appScreens[1].addEventListener("click", onPrevious);
      appScreens[3].addEventListener("click", onNext);
      appScreens[1].style.cursor = "pointer";
      appScreens[3].style.cursor = "pointer";

      appDisposers.push(
        () => previous?.removeEventListener("click", onPrevious),
        () => next?.removeEventListener("click", onNext),
        () => appScreens[1].removeEventListener("click", onPrevious),
        () => appScreens[3].removeEventListener("click", onNext),
      );
      resetTimer();
    }

    /*
     * Older snapshots used sliderTrack; current rebranded snapshots contain
     * individually positioned marqueeCard elements. Support both shapes.
     */
    const webTrack = root.querySelector<HTMLElement>(
      ".webShowcase-module__j9OAiq__sliderTrack",
    );
    const webCards = [
      ...root.querySelectorAll<HTMLElement>(".webShowcase-module__j9OAiq__marqueeCard"),
    ];
    const webCenterImages = [
      ...root.querySelectorAll<HTMLElement>(".webShowcase-module__j9OAiq__centerImg"),
    ];
    const webSection = root.querySelector<HTMLElement>(
      ".webShowcase-module__j9OAiq__webShowcaseSection",
    );
    let webTimer = 0;
    let webIndex = 0;
    const webAnimations = new Set<Animation>();
    const webDisposers: Array<() => void> = [];

    if (webTrack) {
      const firstCard = webTrack.firstElementChild as HTMLElement | null;
      const computed = getComputedStyle(webTrack);
      const gap = Number.parseFloat(computed.columnGap || computed.gap) || 16;
      const stride = (firstCard?.getBoundingClientRect().width || 400) + gap;
      let index = 40;
      webTrack.style.transform = `translateX(${-index * stride}px)`;
      webTimer = window.setInterval(() => {
        const from = -index * stride;
        index += 1;
        const to = -index * stride;
        webAnimations.forEach((animation) => animation.cancel());
        webAnimations.clear();
        const animation = webTrack.animate(
          [{ transform: `translateX(${from}px)` }, { transform: `translateX(${to}px)` }],
          {
            duration: 650,
            easing: "cubic-bezier(.22,1,.36,1)",
            fill: "forwards",
          },
        );
        webAnimations.add(animation);
        webTrack.style.transform = `translateX(${to}px)`;
      }, 3000);
    } else if (webCards.length > 1) {
      const sourceStride = 416;
      const halfSpan = webCards.length / 2;
      let slots = webCards.map((card, index) => {
        const match = card.style.transform.match(/translateX\((-?[\d.]+)px\)/);
        return match ? Number.parseFloat(match[1]) / sourceStride : index;
      });
      const getStride = () => webCards[0].getBoundingClientRect().width + 16;
      const placeWebCards = () => {
        webAnimations.forEach((animation) => animation.cancel());
        webAnimations.clear();
        const stride = getStride();
        webCards.forEach((card, index) => {
          card.style.transform = `translateX(${slots[index] * stride}px)`;
        });
      };

      const moveWeb = (direction: 1 | -1) => {
        const stride = getStride();
        slots = slots.map((slot, index) => {
          let nextSlot = slot - direction;
          if (nextSlot < -halfSpan) nextSlot += webCards.length;
          if (nextSlot >= halfSpan) nextSlot -= webCards.length;
          const card = webCards[index];
          const position = slot * stride;
          const nextPosition = nextSlot * stride;
          const animation = card.animate(
            [
              { transform: `translateX(${position}px)` },
              { transform: `translateX(${nextPosition}px)` },
            ],
            {
              duration: 650,
              easing: "cubic-bezier(.22,1,.36,1)",
            },
          );
          webAnimations.add(animation);
          animation.addEventListener(
            "finish",
            () => {
              webAnimations.delete(animation);
              animation.cancel();
            },
            { once: true },
          );
          card.style.transform = `translateX(${nextPosition}px)`;
          return nextSlot;
        });

        webIndex = (
          webIndex + direction + Math.max(1, webCenterImages.length)
        ) % Math.max(1, webCenterImages.length);
        webCenterImages.forEach((image, index) => {
          const visible = index === webIndex;
          image.style.opacity = visible ? "1" : "0";
          image.style.transition = "opacity 450ms cubic-bezier(.22,1,.36,1)";
        });
      };

      const resetWebTimer = () => {
        window.clearInterval(webTimer);
        webTimer = window.setInterval(() => moveWeb(1), 3000);
      };
      const previous = webSection?.querySelector<HTMLButtonElement>(
        'button[aria-label="Previous image"]',
      );
      const next = webSection?.querySelector<HTMLButtonElement>(
        'button[aria-label="Next image"]',
      );
      const onPrevious = () => {
        moveWeb(-1);
        resetWebTimer();
      };
      const onNext = () => {
        moveWeb(1);
        resetWebTimer();
      };

      previous?.addEventListener("click", onPrevious);
      next?.addEventListener("click", onNext);
      window.addEventListener("resize", placeWebCards);
      webDisposers.push(
        () => previous?.removeEventListener("click", onPrevious),
        () => next?.removeEventListener("click", onNext),
        () => window.removeEventListener("resize", placeWebCards),
      );
      placeWebCards();
      resetWebTimer();
    }

    return () => {
      observer?.disconnect();
      window.clearInterval(appTimer);
      window.clearInterval(webTimer);
      runningAnimations.forEach((animation) => animation.cancel());
      webAnimations.forEach((animation) => animation.cancel());
      appDisposers.forEach((dispose) => dispose());
      webDisposers.forEach((dispose) => dispose());
    };
  }, [page.html]);

  return (
    <>
      <style>{`
        main:has(.base-module__OZd6jq__container) {
          background: #f8f8fc;
          min-height: 100vh;
          padding: 120px 0 100px;
        }
        .header-module__Dea5oa__scopeLabel { line-height: 1.6; }

        /* Some legacy records accidentally contain a pasted ChatGPT response shell.
           Keep those wrappers layout-neutral rather than allowing this app's
           utility classes to turn them into a narrow flex column. */
        [class*="header-module__Dea5oa__description"] > section,
        [class*="header-module__Dea5oa__description"] > section div,
        .content-module__ZwfD0a__wpContent > section[data-testid^="conversation-turn-"],
        .content-module__ZwfD0a__wpContent > section[data-testid^="conversation-turn-"] div {
          display: block;
          position: static;
          width: auto;
          max-width: none;
          height: auto;
          min-height: 0;
          margin: 0;
          padding: 0;
          gap: 0;
          transform: none;
          content-visibility: visible;
        }
        [class*="header-module__Dea5oa__description"] > section div:empty {
          display: none;
        }
      `}</style>
      <span
        aria-hidden="true"
        style={{ display: "block", height: 1, marginBottom: -1 }}
      />
      <LegacyHtmlRoot ref={rootRef} html={page.html} />
      {uiDesignTarget &&
        createPortal(
          page.uiMode === "app" ? (
            <LegacyAppUIDesign images={page.uiImages} />
          ) : (
            <CaseStudyUIDesign
              images={page.uiImages}
              mobileImages={[]}
              tabletImages={page.uiImages}
              heading=""
            />
          ),
          uiDesignTarget,
        )}
    </>
  );
}
