import { Link } from "@/i18n/routing";
import type { ServiceIndustries } from "@/lib/dich-vu-detail-pages";
import { Reveal } from "@/components/primitives/Reveal";
import styles from "./Industries.module.css";

export function Industries({ data }: { data: ServiceIndustries }) {
  return (
    <section className={styles.section} id="industries">
      <div className={styles.content}>
        <div className={styles.hero}>
          <div className={styles.insideContainer}>
            <div className={styles.label}>
              <span className={styles.labelDot} />
              <span>{data.label}</span>
            </div>
            <Reveal as="h2" direction="up" className={styles.sectionHeading}>
              <span className={styles.headingLight}>{data.headlineLight}</span>
              <br />
              <span className={styles.headingDark}>{data.headlineDark}</span>
            </Reveal>
          </div>
        </div>
        <div className={styles.gridContainer}>
          <div className={styles.grid}>
            {data.items.map((item, i) => (
              <Reveal key={i} direction="up" delay={i * 60}>
                <Link className={styles.cardLink} href={`/linh-vuc/${item.slug}`}>
                  <div className={styles.card}>
                    <div className={styles.cardIcon}>
                      <img src={item.icon} alt={item.title} />
                    </div>
                    <div className={styles.cardText}>
                      <h3 className={styles.cardTitle}>{item.title}</h3>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
