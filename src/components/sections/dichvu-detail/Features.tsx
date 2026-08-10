import { Link } from "@/i18n/routing";
import type { ServiceFeatures } from "@/lib/dich-vu-detail-pages";
import { Reveal } from "@/components/primitives/Reveal";
import { StickyFade } from "@/components/primitives/StickyFade";
import styles from "./Features.module.css";

export function Features({
  data,
  compactBottom = false,
  ctaOutside = false,
  ctaOutsideSpaced = false,
  flushCta = false,
}: {
  data: ServiceFeatures;
  compactBottom?: boolean;
  ctaOutside?: boolean;
  ctaOutsideSpaced?: boolean;
  flushCta?: boolean;
}) {
  const isStickyStack = data.items.some((it) => it.iconPath);

  if (isStickyStack) {
    return (
      <section className={`${styles.section} ${styles.stickyVariant}`}>
        <div className={styles.bgContainer} aria-hidden>
          <div className={`${styles.bgRadialSticky} ${styles.bgRadialSticky1}`} />
          <div className={`${styles.bgRadialSticky} ${styles.bgRadialSticky2}`} />
        </div>
        <div className={styles.contentWrapper}>
          <StickyFade direction="left" travel={30} className={styles.leftHeader}>
            <h2 className={styles.headingSticky}>
              <span className={styles.lightSticky}>{data.headlineLight}</span>
              <br />
              <span className={styles.darkSticky}>{data.headlineDark}</span>
            </h2>
          </StickyFade>
          <div className={styles.rightCards}>
            {data.items.map((item, i) => (
              <StickyFade
                key={i}
                className={styles.cardContainerSticky}
                style={{ zIndex: i + 1 }}
              >
                <div className={styles.cardSticky}>
                  <div className={styles.stepNumberWrapper}>
                    <p className={styles.stepNumber}>
                      {item.num || String(i + 1).padStart(2, "0")}
                    </p>
                  </div>
                  <div className={styles.cardContentRow}>
                    <div className={styles.iconWrapperSticky}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor">
                        <path d={item.iconPath} />
                      </svg>
                    </div>
                    <div className={styles.textWrapper}>
                      <h3 className={styles.cardTitleSticky}>{item.title}</h3>
                      <p className={styles.cardDescSticky}>{item.desc}</p>
                    </div>
                  </div>
                  {item.image && (
                    <div className={styles.cardImageWrapperSticky}>
                      <img
                        className={styles.cardImageSticky}
                        src={item.image}
                        alt={item.title}
                      />
                    </div>
                  )}
                </div>
              </StickyFade>
            ))}
          </div>
        </div>
        {data.ctaLabel && data.ctaHref && (
          <div className={styles.ctaWrapperSticky}>
            <Link href={data.ctaHref} className={styles.ctaButtonSticky}>
              {data.ctaLabel}
            </Link>
          </div>
        )}
      </section>
    );
  }

  return (
    <section className={`${styles.section} ${compactBottom ? styles.compactBottom : ""}`}>
      <div className={styles.bgWrapper}>
        <div className={`${styles.bgRadial} ${styles.bgRadial1}`} />
        <div className={`${styles.bgRadial} ${styles.bgRadial2}`} />
      </div>
      <div className={styles.container}>
        <header className={styles.titleWrapper}>
          {data.label && (
            <div className={styles.label}>
              <span className={styles.labelDot} />
              <span>{data.label}</span>
            </div>
          )}
          <Reveal as="h2" direction="up" className={styles.heading}>
            <span className={styles.light}>{data.headlineLight}</span>{"\u00a0"}
            <span className={styles.dark}>{data.headlineDark}</span>
          </Reveal>
          <Reveal as="p" direction="up" delay={120} className={styles.description}>
            {data.description}
          </Reveal>
        </header>
        <div className={styles.cardGrid}>
          {data.items.map((item, i) => (
            <Reveal key={i} direction="up" delay={i * 80} className={styles.cardContainer}>
              <div className={styles.card}>
                <div className={styles.imageWrapper}>
                  <img className={styles.cardImage} src={item.image} alt={item.title} />
                </div>
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.cardDesc}>{item.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        {!ctaOutside && data.ctaLabel && data.ctaHref && (
          <div className={`${styles.ctaWrapper} ${flushCta ? styles.ctaFlush : ""}`}>
          <Link href={data.ctaHref} target="_blank" className={styles.ctaButton}>
              {data.ctaLabel}
            </Link>
          </div>
        )}
      </div>
      {ctaOutside && data.ctaLabel && data.ctaHref && (
        <div className={`${styles.ctaWrapper} ${styles.ctaOutside} ${ctaOutsideSpaced ? styles.ctaOutsideSpaced : ""}`}>
          <Link href={data.ctaHref} target="_blank" className={styles.ctaButton}>
            {data.ctaLabel}
          </Link>
        </div>
      )}
    </section>
  );
}
