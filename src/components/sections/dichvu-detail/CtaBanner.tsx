import { Link } from "@/i18n/routing";
import type { ServiceCtaBanner } from "@/lib/dich-vu-detail-pages";
import { Reveal } from "@/components/primitives/Reveal";
import styles from "./CtaBanner.module.css";

export function CtaBanner({ data }: { data: ServiceCtaBanner }) {
  return (
    <section className={styles.wrapper}>
      <Reveal direction="up" className={styles.card}>
        <div className={styles.content}>
          <div className={styles.header}>
            <div className={styles.badge}>
              <span className={styles.badgeDot} />
              <span className={styles.badgeText}>{data.badge}</span>
            </div>
            <h2 className={styles.heading}>{data.headline}</h2>
            <p className={styles.description}>{data.description}</p>
          </div>
          <Link className={styles.ctaButton} href={data.ctaHref}>
            {data.ctaLabel}
          </Link>
        </div>
        <div className={styles.imageWrapper}>
          <img src={data.image} alt="" className={styles.image} loading="lazy" />
        </div>
      </Reveal>
    </section>
  );
}
