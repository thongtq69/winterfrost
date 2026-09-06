"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Bug,
  Expand,
  Gauge,
  Headphones,
  MessageCircle,
  Phone,
  Rocket,
  ShieldCheck,
} from "lucide-react";
import { AnimatedNetworkIcon } from "@/components/primitives/AnimatedNetworkIcon";
import { Reveal } from "@/components/primitives/Reveal";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { IndustriesTech } from "@/components/sections/IndustriesTech";
import {
  useAutoText,
  useLocalizedValue,
} from "@/i18n/auto-text-client";
import shared from "@/components/sections/IndustriesIndex.module.css";
import styles from "./IndustryDetailPage.module.css";
import { useLocale } from "next-intl";

export type IndustryDetailData = {
  slug: string;
  title: string;
  hero: {
    title: string;
    description: string;
    image: string;
    imageAlt: string;
    primaryLabel: string;
    secondaryLabel: string;
  };
  overview: {
    label: string;
    title: string;
    paragraphs: string[];
    image: string;
    imageAlt: string;
  };
  counters: Array<{ index: string; value: string; label: string }>;
  values: {
    title: string;
    intro: string;
    items: Array<{ title: string; description: string }>;
    cta: string;
  };
  why: {
    label: string;
    title: string;
    items: Array<{ number: string; title: string; description: string }>;
  };
  cta: {
    label: string;
    title: string;
    description: string;
    buttonLabel: string;
    image: string;
    imageAlt: string;
  };
  cases: {
    title: string;
    links: Array<{ text: string; href: string }>;
    images: Array<{ src: string; alt: string }>;
  } | null;
  services: {
    title: string;
    intro: string;
    items: Array<{
      title: string;
      description: string;
      image: string;
      imageAlt: string;
    }>;
    cta: string;
  };
  process: {
    label: string;
    items: Array<{
      number: string;
      tag: string;
      title: string;
      description: string;
    }>;
    cta: string;
  };
  faq: {
    label: string;
    title: string;
    intro: string;
    items: Array<{ q: string; a: string }>;
  };
};

const phoneHref = "tel:+84971450454";
const zaloHref = "https://zalo.me/0971450454";
const whyIcons = [Rocket, Gauge, ShieldCheck, Expand, Bug, Headphones];

function splitLastPhrase(value: string, phrase: string) {
  const index = value.toLocaleLowerCase("vi").lastIndexOf(phrase.toLocaleLowerCase("vi"));
  if (index < 1) return [value, ""] as const;
  return [value.slice(0, index).trim(), value.slice(index).trim()] as const;
}

export function IndustryDetailPage({ data }: { data: IndustryDetailData }) {
  const tr = useAutoText();
  const locale = useLocale();
  const arcTextRef = useRef<SVGTextPathElement | null>(null);
  const [openSolution, setOpenSolution] = useState<number | null>(null);
  const [heroLead, heroAccent] = splitLastPhrase(data.hero.title, data.title);
  const [overviewLead, overviewAccent] = splitLastPhrase(
    data.overview.title,
    "SoftBuild",
  );
  const whyHeadingLead = useLocalizedValue<Record<string, string>>({
    "ban-le": "Lý do chọn SoftBuild",
    "bat-dong-san": "Lý do chọn SoftBuild",
    "chuoi-cung-ung": "Vì sao nên chọn SoftBuild",
    "cong-nghe-tai-chinh": "Vì sao nên sử dụng dịch vụ",
    "dau-khi": "Tại sao các doanh nghiệp năng lượng",
    "giao-duc": "Lý do chọn năng lực công nghệ",
    "ke-toan": "Lý do chọn SoftBuild",
    "ngan-hang": "Lý do ngân hàng nên chọn dịch vụ",
    "phan-mem-doanh-nghiep": "Lợi thế cạnh tranh",
    "phan-mem-tien-ich": "Lý do doanh nghiệp nên chọn giải pháp",
    "phat-trien-ung-dung-theo-yeu-cau": "Vì sao doanh nghiệp nên tin tưởng",
    "tai-chinh-doanh-nghiep": "Vì sao nên chọn giả pháp tài chính",
    "thuong-mai-dien-tu": "Tại sao doanh nghiệp",
    "van-tai-va-logistics": "Lý do doanh nghệ nên chọn",
    "y-te": "Tại sao chọn phát triển phần mềm y tế",
  });
  const whyLead = locale === "vi"
    ? (whyHeadingLead[data.slug] ?? data.why.title)
    : data.why.title;
  const whyTail = whyLead === data.why.title || locale !== "vi"
    ? ""
    : data.why.title.slice(whyLead.length).trim();
  const compactSolutionDescription = data.slug === "giao-duc" || data.slug === "ngan-hang";

  useEffect(() => {
    const path = arcTextRef.current;
    if (!path) return;
    const copies = Array.from(path.querySelectorAll<SVGTSpanElement>("[data-arc-copy]"));
    let frame = 0;
    let last = performance.now();
    let offset = 0;
    const loop = (now: number) => {
      offset -= ((now - last) / 1000) * 34;
      last = now;
      if (offset <= -1632) offset += 1632;
      copies.forEach((copy, index) => copy.setAttribute("x", String(-1632 + index * 1632 + offset)));
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <>
      <section className={`${shared.heroSection} ${styles.hero}`}>
        <div className={shared.heroContainer}>
          <Reveal className={shared.heroText} direction="left">
            <h1 className={shared.heroTitle}>
              <span className={shared.heroTitleMain}>{heroLead}</span>{" "}
              {heroAccent && (
                <span className={shared.heroTitleSub}>{heroAccent}</span>
              )}
            </h1>
            <div className={shared.heroDescription}>
              <p>{data.hero.description}</p>
            </div>
            <div className={shared.heroButtons}>
              <a
                href={phoneHref}
                className={`${shared.heroButton} ${shared.heroButtonPrimary} ${styles.heroButton}`}
              >
                {data.hero.primaryLabel}
                <Phone aria-hidden />
              </a>
              <a
                href={zaloHref}
                className={`${shared.heroButton} ${styles.heroButton}`}
              >
                {data.hero.secondaryLabel}
                <MessageCircle aria-hidden />
              </a>
            </div>
          </Reveal>
          <Reveal className={shared.heroImage} direction="right" delay={100}>
            <Image
              src={data.hero.image}
              alt={data.hero.imageAlt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </Reveal>
        </div>
      </section>

      <section className={`${shared.aboutSection} ${styles.overview}`}>
        <div className={shared.aboutContainer}>
          <Reveal className={shared.aboutHeader}>
            <p className={styles.sectionLabel}>
              <span aria-hidden />
              {data.overview.label}
            </p>
            <h2 className={`${shared.aboutTitle} ${styles.overviewTitle}`}>
              <span className={styles.overviewTitleLight}>{overviewLead}</span>{" "}
              {overviewAccent && (
                <span className={styles.overviewTitleDark}>{overviewAccent}</span>
              )}
            </h2>
          </Reveal>
          <div className={shared.aboutBody}>
            <Reveal
              className={`${shared.aboutText} ${data.slug === "giao-duc" ? styles.overviewTextMerged : ""}`}
              direction="left"
            >
              {data.overview.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </Reveal>
            <Reveal className={shared.aboutImage} direction="right">
              <Image
                src={data.overview.image}
                alt={data.overview.imageAlt}
                fill
                sizes="(max-width: 996px) 100vw, 50vw"
              />
            </Reveal>
          </div>
        </div>
      </section>

      <section className={shared.counterSection}>
        <div className={shared.counterInner}>
          <p className={`${shared.counterLabel} ${styles.counterLabel}`}>
            <span className={shared.counterDot} aria-hidden />
            {tr("Thành tựu của chúng tôi")}
          </p>
          <div className={shared.counterGrid}>
            {data.counters.map((counter, index) => (
              <Reveal key={counter.index} className={shared.counterCard} delay={index * 70}>
                <span className={shared.counterIndex}>{counter.index}</span>
                <strong className={shared.counterNumber}>{counter.value}</strong>
                <p className={shared.counterDesc}>{counter.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={shared.solutionSection}>
        <div className={shared.solutionOuter}>
          <div className={shared.solutionBackground} aria-hidden>
            <span className={`${shared.solutionRadial} ${shared.solutionRadialPurpleTop}`} />
            <span className={`${shared.solutionRadial} ${shared.solutionRadialPurpleBottom}`} />
            <span className={`${shared.solutionRadial} ${shared.solutionRadialBlueTop}`} />
            <span className={`${shared.solutionRadial} ${shared.solutionRadialBlueBottom}`} />
          </div>
          <header className={shared.solutionHeader}>
            <Reveal className={shared.solutionHeadingWrap} direction="left">
              <h2 className={shared.solutionTitle}>{data.values.title}</h2>
            </Reveal>
            <Reveal className={shared.solutionDescWrap} direction="right">
              <p className={`${shared.solutionDescription} ${compactSolutionDescription ? styles.solutionDescriptionCompact : ""}`}>
                {data.values.intro}
              </p>
            </Reveal>
          </header>
          <div className={`${shared.solutionGrid} ${styles.solutionGrid}`}>
            {data.values.items.map((item, index) => {
              const isOpen = openSolution === index;
              return (
                <Reveal key={`${item.title}-${index}`} delay={(index % 3) * 70}>
                  <article className={`${shared.solutionCard} ${styles.solutionCard}`}>
                    <span className={shared.solutionIcon}>
                      <AnimatedNetworkIcon />
                    </span>
                    <div className={shared.solutionCardContent}>
                      <h3 className={shared.solutionCardTitle}>{item.title}</h3>
                      <p className={`${shared.solutionCardDesc} ${isOpen ? shared.solutionCardDescExpanded : ""}`}>
                        {item.description}
                      </p>
                      <button
                        className={shared.solutionToggle}
                        type="button"
                        aria-label="Toggle details"
                        aria-expanded={isOpen}
                        onClick={() => setOpenSolution(isOpen ? null : index)}
                      >
                        {isOpen ? (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="12" y1="19" x2="12" y2="5" />
                            <polyline points="5 12 12 5 19 12" />
                          </svg>
                        ) : (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <polyline points="19 12 12 19 5 12" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
          <Reveal>
            <Link href="/lien-he" className={shared.solutionCta}>
              {data.values.cta}
              <ArrowUpRight aria-hidden size={18} />
            </Link>
          </Reveal>
        </div>
      </section>

      <div className={styles.arcSection} aria-hidden>
        <div className={styles.arcWrapper}>
          <div className={styles.arcInner}>
            <svg className={styles.arcSvg} viewBox="0 0 1440 800">
              <defs>
                <path
                  id="industry-arc-curve"
                  d="M-100,400 Q720,-170 1540,400"
                  fill="none"
                  stroke="transparent"
                />
              </defs>
              <text fontWeight="500" xmlSpace="preserve">
                <textPath ref={arcTextRef} href="#industry-arc-curve" xmlSpace="preserve">
                  {[0, 1, 2, 3].map((copy) => (
                    <tspan key={copy} data-arc-copy x={-1632 + copy * 1632}>
                      {"Responsive ✦ Accessible ✦ SEO-ready ✦\u00a0\u00a0"}
                    </tspan>
                  ))}
                </textPath>
              </text>
            </svg>
          </div>
        </div>
      </div>

      <section className={shared.whySection}>
        <div className={shared.whyContent}>
          <div className={`${shared.whyHeader} ${styles.whyHeader}`}>
            <p className={`${shared.whyLabel} ${styles.whyLabel}`}>
              <span className={shared.whyDot} aria-hidden />
              {data.why.label}
            </p>
            <Reveal>
              <h2 className={`${shared.whyTitle} ${styles.whyTitle}`}>
                <span className={shared.whyTitleLight}>{whyLead}</span>
                {whyTail && (
                  <span className={`${shared.whyTitleDark} ${styles.whyTitleTail}`}>
                    {whyTail}
                  </span>
                )}
              </h2>
            </Reveal>
          </div>
          <div className={shared.whyGrid}>
            {data.why.items.map((item, index) => {
              const Icon = whyIcons[index % whyIcons.length];
              return (
                <Reveal key={item.number} className={shared.whyCard} delay={(index % 3) * 70}>
                  <span className={shared.whyNumber}>{item.number}</span>
                  <Icon className={shared.whyIcon} aria-hidden />
                  <div className={shared.whyText}>
                    <h3 className={shared.whyCardTitle}>{item.title}</h3>
                    <p className={`${shared.whyCardDesc} ${styles.whyCardDesc}`}>
                      {item.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className={styles.inlineCta}>
        <Reveal className={styles.inlineCtaCard}>
          <div className={styles.inlineCtaContent}>
            <div className={styles.inlineCtaHeader}>
              <div className={styles.inlineCtaBadge}>
                <span aria-hidden />
                {data.cta.label}
              </div>
              <h2>{data.cta.title}</h2>
              <p>{data.cta.description}</p>
            </div>
            <Link href="/lien-he#contact-form" className={styles.inlineCtaButton}>
              {data.cta.buttonLabel}
            </Link>
          </div>
          {data.cta.image && (
            <div className={styles.inlineCtaImage}>
              <Image
                src={data.cta.image}
                alt={data.cta.imageAlt}
                width={270}
                height={330}
                sizes="270px"
              />
            </div>
          )}
        </Reveal>
      </section>

      {data.cases && <IndustryCases data={data.cases} />}

      <section className={styles.services}>
        <div className={styles.servicesInner}>
          <Reveal className={styles.servicesHeader}>
            <h2>{data.services.title}</h2>
            <p>{data.services.intro}</p>
          </Reveal>
          <div className={`${styles.serviceGrid} ${data.slug === "chuoi-cung-ung" ? styles.serviceGridEqualRows : ""}`}>
            {data.services.items.map((item, index) => (
              <Reveal key={`${item.title}-${index}`} className={styles.serviceCard} delay={(index % 3) * 60}>
                <div className={styles.serviceImage}>
                  {item.image && (
                    <Image
                      src={item.image}
                      alt={item.imageAlt || item.title}
                      fill
                      sizes="(max-width: 720px) 100vw, 33vw"
                    />
                  )}
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className={styles.servicesCta}>
            <Link href="/dich-vu" className={shared.solutionCta}>
              {data.services.cta}
              <ArrowUpRight aria-hidden size={18} />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className={shared.processSection}>
        <h2 className={shared.processLabel}>
          <span className={shared.processDot} aria-hidden />
          {data.process.label}
        </h2>
        <div className={`${shared.processContent} ${styles.processContent}`}>
          <div className={shared.processTimeline}>
            {data.process.items.map((item, index) => (
              <Reveal
                key={item.number}
                className={`${shared.processRow} ${styles.processRow}`}
                direction={index % 2 ? "right" : "left"}
              >
                <div className={shared.processRail}>
                  <span className={shared.processNumber}>{item.number}</span>
                  {index < data.process.items.length - 1 && (
                    <span className={shared.processBar} aria-hidden />
                  )}
                </div>
                <div className={shared.processText}>
                  <div className={styles.processHeading}>
                    <div className={`${shared.processBadge} ${styles.processBadge}`}>
                      <span>{item.tag}</span>
                    </div>
                    <h3 className={shared.processTitle}>{item.title}</h3>
                  </div>
                  <p className={`${shared.processDesc} ${styles.processDesc}`}>
                    {item.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <Reveal className={shared.processCtaWrap}>
          <Link href="/lien-he" className={shared.processCta}>
            {data.process.cta}
            <ArrowUpRight aria-hidden size={18} />
          </Link>
        </Reveal>
      </section>

      <IndustriesTech detail />

      <FAQAccordion
        label={data.faq.label}
        headline={[tr("Giải Đáp"), tr("Mọi"), tr("Thắc Mắc")]}
        intro={data.faq.intro}
        items={data.faq.items}
      />
    </>
  );
}

function IndustryCases({ data }: { data: NonNullable<IndustryDetailData["cases"]> }) {
  const tr = useAutoText();
  const imageOffset = Math.max(0, data.links.length - data.images.length);
  const items = data.links.slice(0, 3).map((link, index) => {
    const text = link.text.split(/\n+/).map((line) => line.trim()).filter(Boolean);
    const slug = link.href.split("/").filter(Boolean).at(-1) ?? "";
    const imageIndex = index - imageOffset;
    return {
      slug,
      title: text.at(-2) ?? text.at(-1) ?? slug,
      tags: text.slice(0, -2),
      image: imageIndex >= 0 ? data.images[imageIndex] : undefined,
    };
  });

  if (!items.length) return null;

  return (
    <section className={`${shared.caseSection} ${styles.cases}`}>
      <div className={shared.caseContainer}>
        <div className={shared.caseHeader}>
          <h2 className={shared.caseHeading}>{data.title}</h2>
          <Link href="/case-studies" className={shared.caseViewAll}>
            {tr("Xem thêm")} <ArrowUpRight aria-hidden size={18} />
          </Link>
        </div>
        <div className={shared.caseGrid}>
          {items.map((item, index) => (
            <Reveal key={item.slug} delay={index * 80}>
              <Link href={`/case-studies/${item.slug}`} className={shared.caseCard}>
                <div className={shared.caseImage}>
                  {item.image && (
                    <Image
                      src={item.image.src}
                      alt={item.image.alt || item.title}
                      fill
                      sizes="(max-width: 720px) 100vw, 33vw"
                    />
                  )}
                </div>
                <div className={`${shared.caseFooter} ${styles.caseFooter}`}>
                  <div className={shared.caseTags}>
                    {(item.tags.length ? item.tags : [tr("GIẢI PHÁP DOANH NGHIỆP")]).map((tag) => (
                      <span key={tag} className={shared.caseTag}>{tag}</span>
                    ))}
                  </div>
                  <div className={shared.caseInfo}>
                    <h3 className={shared.caseTitle}>{item.title}</h3>
                    <span className={shared.caseAction}>
                      <ArrowUpRight aria-hidden size={18} />
                      {tr("Xem dự án")}
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
