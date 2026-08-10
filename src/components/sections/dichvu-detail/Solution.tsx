import { Link } from "@/i18n/routing";
import type { ServiceSolution, ServiceSolutionItem } from "@/lib/dich-vu-detail-pages";
import { Reveal } from "@/components/primitives/Reveal";
import styles from "./Solution.module.css";

function renderDesc(item: ServiceSolutionItem) {
  if (!item.descLinks || item.descLinks.length === 0) return item.desc;
  let remaining = item.desc;
  const parts: Array<string | { phrase: string; href: string }> = [];
  for (const { phrase, href } of item.descLinks) {
    const idx = remaining.indexOf(phrase);
    if (idx === -1) continue;
    if (idx > 0) parts.push(remaining.slice(0, idx));
    parts.push({ phrase, href });
    remaining = remaining.slice(idx + phrase.length);
  }
  if (remaining) parts.push(remaining);
  return parts.map((p, i) =>
    typeof p === "string" ? (
      <span key={i}>{p}</span>
    ) : (
      <Link key={i} href={p.href} className={styles.cardDescLink}>
        {p.phrase}
      </Link>
    )
  );
}

export function Solution({ data, hideToggles = false }: { data: ServiceSolution; hideToggles?: boolean }) {
  const hasImageVariant = data.items.some((it) => it.image);

  if (hasImageVariant) {
    const row1 = data.items.slice(0, 3);
    const row2 = data.items.slice(3);
    return (
      <section className={`${styles.section} ${styles.imageVariant}`}>
        <div className={styles.bgGradients} aria-hidden>
          <div className={`${styles.bgRadial} ${styles.bgRadial1}`} />
          <div className={`${styles.bgRadial} ${styles.bgRadial2}`} />
          <div className={`${styles.bgRadial} ${styles.bgRadial3}`} />
          <div className={`${styles.bgRadial} ${styles.bgRadial4}`} />
        </div>
        <header className={styles.header}>
          <Reveal direction="left" className={styles.headingWrapper}>
            <h2 className={styles.heading}>
              <span className={styles.light}>{data.headlineLight}</span>
              <br />
              <span className={styles.dark}>{data.headlineDark}</span>
            </h2>
          </Reveal>
          <Reveal direction="right" className={styles.descriptionWrapper}>
            <p className={styles.description}>{data.description}</p>
          </Reveal>
        </header>
        <div className={styles.container}>
          {row1.length > 0 && (
            <div className={styles.row1}>
              {row1.map((item, i) => (
                <Reveal
                  key={i}
                  direction="up"
                  delay={i * 80}
                  className={`${styles.card} ${styles.cardVertical}`}
                >
                  <div className={styles.cardContent}>
                    <h3 className={styles.cardTitle}>{item.title}</h3>
                    <p className={styles.cardDesc}>{renderDesc(item)}</p>
                  </div>
                  {item.image && (
                    <div className={styles.cardImageWrapper}>
                      <img
                        className={styles.cardImage}
                        src={item.image}
                        alt={item.title}
                        width={309}
                        height={180}
                      />
                    </div>
                  )}
                </Reveal>
              ))}
            </div>
          )}
          {row2.length > 0 && (
            <div className={styles.row2}>
              {row2.map((item, i) => (
                <Reveal
                  key={i}
                  direction="up"
                  delay={i * 80}
                  className={`${styles.card} ${styles.cardHorizontal}`}
                >
                  <div className={styles.cardContent}>
                    <h3 className={styles.cardTitle}>{item.title}</h3>
                    <p className={styles.cardDesc}>{renderDesc(item)}</p>
                  </div>
                  {item.image && (
                    <div className={styles.cardImageWrapper}>
                      <img
                        className={styles.cardImage}
                        src={item.image}
                        alt={item.title}
                        width={309}
                        height={180}
                      />
                    </div>
                  )}
                </Reveal>
              ))}
            </div>
          )}
        </div>
        {data.ctaLabel && data.ctaHref && (
          <div className={styles.ctaWrapperImage}>
            <Link href={data.ctaHref} className={styles.ctaButtonImage}>
              {data.ctaLabel}
            </Link>
          </div>
        )}
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <div className={styles.outerContainer}>
        <div className={styles.backgroundGradients}>
          <div className={`${styles.bgRadialLegacy} ${styles.bgRadial2Top}`} />
          <div className={`${styles.bgRadialLegacy} ${styles.bgRadial2Bottom}`} />
          <div className={`${styles.bgRadialLegacy} ${styles.bgRadial1Top}`} />
          <div className={`${styles.bgRadialLegacy} ${styles.bgRadial1Bottom}`} />
        </div>
        <header className={styles.headerRow}>
          <Reveal direction="left" className={styles.headingWrapperLegacy}>
            {data.label && (
              <div className={styles.label}>
                <span className={styles.labelDot} />
                <span>{data.label}</span>
              </div>
            )}
            <h2 className={styles.headingLegacy}>
              <span className={styles.lightLegacy}>{data.headlineLight}</span>
              <span className={styles.darkLegacy}>{data.headlineDark}</span>
            </h2>
          </Reveal>
          <Reveal direction="right" className={styles.descriptionWrapperLegacy}>
            <p className={styles.descriptionLegacy}>{data.description}</p>
          </Reveal>
        </header>
        <div className={styles.cardListLegacy}>
          {data.items.map((item, i) => (
            <Reveal key={i} direction="up" delay={i * 80} className={styles.cardLegacy}>
              <div className={styles.iconWrapper} data-border="true">
                <svg className={styles.icon} viewBox="0 0 16 16">
                  <path
                    style={{ ["--path-length" as never]: "12.4" }}
                    d="M 3.949 1.974 C 3.949 3.065 3.065 3.949 1.974 3.949 C 0.884 3.949 0 3.065 0 1.974 C 0 0.884 0.884 0 1.974 0 C 3.065 0 3.949 0.884 3.949 1.974 Z"
                    fill="transparent"
                    stroke="currentColor"
                    strokeWidth="0.99"
                    transform="translate(1.974 1.316)"
                  />
                  <path
                    style={{ ["--path-length" as never]: "12.4" }}
                    d="M 3.949 1.974 C 3.949 3.065 3.065 3.949 1.974 3.949 C 0.884 3.949 0 3.065 0 1.974 C 0 0.884 0.884 0 1.974 0 C 3.065 0 3.949 0.884 3.949 1.974 Z"
                    fill="transparent"
                    stroke="currentColor"
                    strokeWidth="0.99"
                    transform="translate(9.873 7.239)"
                  />
                  <path
                    style={{ ["--path-length" as never]: "12.4" }}
                    d="M 3.949 1.974 C 3.949 3.065 3.065 3.949 1.974 3.949 C 0.884 3.949 0 3.065 0 1.974 C 0 0.884 0.884 0 1.974 0 C 3.065 0 3.949 0.884 3.949 1.974 Z"
                    fill="transparent"
                    stroke="currentColor"
                    strokeWidth="0.99"
                    transform="translate(1.974 10.53)"
                  />
                  <path
                    style={{ ["--path-length" as never]: "5.26" }}
                    d="M 0 0 L 0 5.265"
                    fill="transparent"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="0.99"
                    transform="translate(3.95 5.264)"
                  />
                  <path
                    style={{ ["--path-length" as never]: "8.17" }}
                    d="M 5.923 3.949 L 3.949 3.949 C 1.768 3.949 0 2.181 0 0"
                    fill="transparent"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="0.99"
                    transform="translate(3.95 5.264)"
                  />
                </svg>
              </div>
              <div className={styles.cardContentLegacy}>
                <h3 className={styles.cardTitleLegacy}>{item.title}</h3>
                <p className={styles.cardDescLegacy}>{item.desc}</p>
                {!hideToggles && (
                  <button className={styles.toggleBtn} type="button" aria-label="Toggle details">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <polyline points="19 12 12 19 5 12" />
                    </svg>
                  </button>
                )}
              </div>
            </Reveal>
          ))}
        </div>
        {data.ctaLabel && data.ctaHref && (
          <div className={styles.ctaWrapper}>
            <Link href={data.ctaHref} target="_blank" className={styles.ctaButton}>
              {data.ctaLabel}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
