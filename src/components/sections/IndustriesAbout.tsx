"use client";

import Image from "next/image";
import { SectionLabel } from "@/components/primitives/SectionLabel";
import { industriesPage } from "@/lib/site";
import { useLocalizedValue } from "@/i18n/auto-text-client";
import styles from "./IndustriesIndex.module.css";

export function IndustriesAbout() {
  const a = useLocalizedValue(industriesPage.about);
  return (
    <section className={styles.aboutSection}>
      <div className={styles.aboutContainer}>
          <div className={styles.aboutHeader}>
            <SectionLabel>{a.label}</SectionLabel>
            <h2 className={styles.aboutTitle}>
              <span className={styles.aboutNormal}>{a.headlinePre} </span>
              <span className={styles.aboutAccent}>{a.headlineScript}</span>
              <span className={styles.aboutNext}> {a.headlinePost}</span>
            </h2>
          </div>
          <div className={styles.aboutBody}>
            <div className={styles.aboutText}>
              {a.paragraphs.map((p, i) => (
                <p key={i}>
                  {p}
                </p>
              ))}
            </div>
            <div className={styles.aboutImage}>
              <Image
                src={a.image}
                alt={a.imageAlt}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            </div>
          </div>
      </div>
    </section>
  );
}
