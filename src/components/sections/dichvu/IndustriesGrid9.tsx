import Image from "next/image";
import { Link } from "@/i18n/routing";
import { Reveal } from "@/components/primitives/Reveal";
import { useLocalizedServicesPage } from "@/i18n/content";
import type { ServiceIndustries } from "@/lib/dich-vu-detail-pages";
import s from "./IndustriesGrid9.module.css";

export function IndustriesGrid9({
  data,
  tone = "default",
}: {
  data?: ServiceIndustries;
  tone?: "default" | "muted";
} = {}) {
  const dichVuPage = useLocalizedServicesPage();
  const localizedIndustries = dichVuPage.industries;
  const content = data ?? localizedIndustries;

  return (
    <section
      className={`${s.industriesSection} ${tone === "muted" ? s.muted : ""}`}
      id="industries"
    >
      <div className={s.content}>
        <div className={s.hero}>
          <div className={s.insideContainer}>
            <div className={s.label}>
              <span className={s.labelDot} />
              <span>{content.label}</span>
            </div>
            <Reveal
              as="h2"
              className={s.sectionHeading}
              direction="up"
              distance={20}
              amount={0.01}
              rootMargin="0px"
            >
              <span className={s.headingLight}>{content.headlineLight}</span>
              <br />
              <span className={s.headingDark}>{content.headlineDark}</span>
            </Reveal>
          </div>
        </div>

        <div className={s.gridContainer}>
          <div className={s.grid}>
            {content.items.map((it, index) => (
              <Reveal
                className={s.industryReveal}
                direction="up"
                distance={24}
                delay={index * 70}
                amount={0.01}
                rootMargin="0px"
                key={it.slug}
              >
                <Link href={`/linh-vuc/${it.slug}`} className={s.industryLink}>
                  <div className={s.industryCard}>
                    <div className={s.iconWrap}>
                      <Image src={it.icon} alt={it.title} width={48} height={48} />
                    </div>
                    <div className={s.cardText}>
                      <h3 className={s.industryName}>{it.title}</h3>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
        <div className={s.ctaGroup}>
          <Link href="/linh-vuc" className={s.primaryCta}>
            {localizedIndustries.ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
