"use client";
import { useState } from "react";
import type { ServiceTechStack } from "@/lib/dich-vu-detail-pages";
import { Reveal } from "@/components/primitives/Reveal";
import { TechIcon } from "./tech-icons";
import styles from "./TechStack.module.css";

export function TechStack({ data }: { data: ServiceTechStack }) {
  const [active, setActive] = useState(data.filters[0] ?? "Tất cả");
  const filtered = active === data.filters[0] ? data.items : data.items.filter((i) => i.category === active);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>
          <span className={styles.headingLight}>{data.headlineLight}</span>{" "}
          <span className={styles.headingDark}>{data.headlineDark}</span>
        </h2>
        <div className={styles.body}>
          <div className={styles.filters}>
            {data.filters.map((f) => (
              <button
                key={f}
                type="button"
                className={`${styles.filterBtn} ${active === f ? styles.filterBtnActive : ""}`}
                onClick={() => setActive(f)}
              >
                {f}
              </button>
            ))}
          </div>
          <Reveal direction="up" className={styles.grid}>
            {filtered.map((item) => (
              <div key={item.name} className={styles.card}>
                <div className={styles.cardIcon}>
                  <TechIcon name={item.name} />
                </div>
                <span className={styles.cardName}>{item.name}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
