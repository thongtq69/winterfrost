"use client";

import { aboutDetail } from "@/lib/site";
import styles from "./AboutCounters.module.css";
import { useAutoText, useLocalizedValue } from "@/i18n/auto-text-client";

export function AboutCounters() {
  const tr = useAutoText();
  const content = useLocalizedValue(aboutDetail.counterSection);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.titleSide}>
            <div className={styles.label}><span aria-hidden /><h2>{content.label}</h2></div>
            <p className={styles.heading}>{tr("Những con số")} <em>{tr("minh chứng")}</em> <span>{tr("cho giá trị")}</span></p>
          </div>
          <div className={styles.listSide}>
            {content.items.map((item) => {
              const match = item.value.match(/^(\d+)(.*)$/);
              return (
                <div className={styles.row} key={item.value}>
                  <div className={styles.numberBox}>
                    <strong>{match?.[1] ?? item.value}</strong>
                    <span>{match?.[2] ?? ""}</span>
                  </div>
                  <div className={styles.descBox}><p>{item.desc}</p></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
