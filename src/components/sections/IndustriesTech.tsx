"use client";

import Image from "next/image";
import { useState } from "react";
import { industriesPage } from "@/lib/site";
import { useAutoText, useLocalizedValue } from "@/i18n/auto-text-client";
import styles from "./IndustriesIndex.module.css";

export function IndustriesTech({ detail = false }: { detail?: boolean }) {
  const tr = useAutoText();
  const t = useLocalizedValue(industriesPage.tech);
  const [active, setActive] = useState(t.tabs[0]);
  const visible = active === t.tabs[0] ? t.items : t.items.filter((it) => it.tab === active);
  const linkedNames = new Set([
    "ChatGPT",
    "Python (AI)",
    "Angular",
    "Python",
    "Java",
    "iOS",
    "Flutter",
    "Android",
    "React Native",
  ]);

  return (
    <section className={styles.techSection}>
      <div className={styles.techContainer}>
        <h2 className={styles.techHeading}>
          {detail ? (
            <span className={styles.techHeadingDark}>{tr("Những công nghệ nổi bật tại Winterfrost")}</span>
          ) : (
            <>
              <span className={styles.techHeadingLight}>{t.headlineLight} </span>
              <span className={styles.techHeadingDark}>{t.headlineDark}</span>
            </>
          )}
        </h2>

        <div className={styles.techBody}>
          <div className={styles.techFilters}>
            {t.tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActive(tab)}
                className={`${styles.techFilter} ${active === tab ? styles.techFilterActive : ""}`}
              >
                {detail && tab === "Front-end" ? "Font-end" : tab}
              </button>
            ))}
          </div>

          <div className={styles.techGrid}>
            {visible.map((item) => (
              <div key={item.name} className={styles.techCard} title={item.name}>
                <div className={styles.techIcon}>
                  <Image
                    src={item.icon}
                    alt={item.name}
                    fill
                    sizes="120px"
                    className="object-contain"
                    style={{ transform: "scale(3)" }}
                  />
                </div>
                {detail && (
                  <span className={styles.techName}>
                    {linkedNames.has(item.name) ? item.name.replace(" (AI)", "") : ""}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
