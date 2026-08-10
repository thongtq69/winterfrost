import {
  Rocket,
} from "lucide-react";
import { useLocalizedServicesPage } from "@/i18n/content";
import { Reveal } from "@/components/primitives/Reveal";
import s from "./BenefitsGrid9.module.css";

export function BenefitsGrid9() {
  const dichVuPage = useLocalizedServicesPage();
  const data = dichVuPage.benefits;

  return (
    <section className={s.benefitsSection} id="benefits">
      <div className={s.content}>
        <div className={s.hero}>
          <div className={s.insideContainer}>
            <h2 className={s.label}>
              <span className={s.labelDot} />
              <span>{data.label}</span>
            </h2>
            <Reveal as="p" direction="up" distance={20} className={s.sectionHeading}>
              <span className={s.headingLight}>{data.headline}</span>
              <span className={s.headingDark} />
            </Reveal>
          </div>
        </div>

        <div className={s.benefitsGrid}>
          {data.items.map((it, index) => (
              <Reveal
                key={it.num}
                direction="up"
                distance={24}
                delay={index * 45}
                amount={0.12}
                className={s.card}
              >
                <span className={s.cardNumber}>{it.num}</span>
                <div className={s.cardIcon}>
                  <Rocket strokeWidth={1.5} />
                </div>
                <div className={s.cardText}>
                  <h3 className={s.cardTitle}>{it.title}</h3>
                  <p className={s.cardDesc}>{it.desc}</p>
                </div>
              </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
