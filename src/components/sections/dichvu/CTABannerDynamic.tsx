import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useLocalizedServicesPage } from "@/i18n/content";
import { Reveal } from "@/components/primitives/Reveal";
import s from "./CTABannerDynamic.module.css";

const CONSULTANT_IMAGE =
  "/images/people/cta/winterfrost/chuyen-vien-nu.png";

export function CTABannerDynamic() {
  const dichVuPage = useLocalizedServicesPage();
  const c = dichVuPage.ctaBanner;

  return (
    <section className={s.wrapper}>
      <Reveal direction="up" distance={32} className={s.card}>
        <div className={s.content}>
          <div className={s.header}>
            <div className={s.badge}>
              <span className={s.badgeDot} />
              <span className={s.badgeText}>{c.badge}</span>
            </div>
            <h2 className={s.heading}>{c.headline}</h2>
            <p className={s.description}>{c.description}</p>
          </div>
          <Link href={c.ctaHref} className={s.ctaButton}>
            {c.ctaLabel}
          </Link>
        </div>
        <div className={s.imageWrapper}>
          <Image
            className={s.image}
            src={CONSULTANT_IMAGE}
            alt="Expert consultant"
            title="Expert consultant"
            width={540}
            height={660}
            sizes="270px"
          />
        </div>
      </Reveal>
    </section>
  );
}
