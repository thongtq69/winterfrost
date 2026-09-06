"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { CTAButton } from "@/components/primitives/CTAButton";
import styles from "./FooterCTA.module.css";

type Props = {
  preTitle?: string;
  headingPre?: string;
  headingHighlight?: string;
  headingMid?: string;
  headingPost?: string;
  email?: string;
  features?: string[];
  image?: string;
  ctaLabel?: string;
  ctaHref?: string;
  phone?: string;
};

const StarIcon = () => (
  <svg overflow="visible" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor">
    <path strokeLinejoin="round" d="m1 32 25 6 6 25 6-25 25-6-25-6-6-25-6 25z" />
  </svg>
);

export function FooterCTA({
  preTitle,
  headingPre,
  headingHighlight,
  headingMid,
  headingPost,
  email = "contact@softbuild.vn",
  features,
  image = "/images/people/van-phong/van-phong-softbuild.webp",
  ctaLabel,
  ctaHref = "https://zalo.me/0971450454",
  phone = "097 145 04 54",
}: Props) {
  const t = useTranslations("FooterCTA");
  const [copied, setCopied] = useState(false);
  const resolvedPreTitle = preTitle ?? t("preTitle");
  const resolvedHeadingPre = headingPre ?? t("headingPre");
  const resolvedHeadingHighlight = headingHighlight ?? t("headingHighlight");
  const resolvedHeadingMid = headingMid ?? t("headingMid");
  const resolvedHeadingPost = headingPost ?? t("headingPost");
  const resolvedFeatures = features ?? [
    t("featureFastResponse"),
    t("featureExpert"),
    t("featureStrategy"),
  ];
  const resolvedCtaLabel = ctaLabel ?? t("consult");

  const onCopy = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(email).then(() => {
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1500);
      });
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <section className={styles.section} aria-labelledby="footer-cta-heading">
      <div className={styles.contentWrapper}>
        <div className={styles.header}>
          <div className={styles.preTitle}>
            <div className={styles.label}>
              <span className={styles.labelIcon} role="img" aria-label="Star">
                <StarIcon />
              </span>
              <p className={styles.labelText}>{resolvedPreTitle}</p>
            </div>
          </div>
          <h2 id="footer-cta-heading" className={styles.heading}>
            <span className={styles.normalText}>{resolvedHeadingPre} </span>
            <span className={styles.highlightText}>{resolvedHeadingHighlight}</span>
            {" "}
            <span className={styles.normalText}>{resolvedHeadingMid}</span>
            <span className={`${styles.normalText} ${styles.nextLine}`}>{resolvedHeadingPost}</span>
          </h2>
        </div>

        <div className={styles.mainContent}>
          <div className={styles.formBox}>
            <p className={styles.formTitle}>{t("formTitle")}</p>
            <form className={styles.form} onSubmit={onSubmit}>
              <div className={styles.inputGroup}>
                <label htmlFor="cta-name">{t("nameLabel")}</label>
                <input id="cta-name" type="text" placeholder={t("namePlaceholder")} required />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="cta-email">{t("emailLabel")}</label>
                <input id="cta-email" type="email" placeholder="example@gmail.com" required />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="cta-phone">{t("phoneLabel")}</label>
                <input id="cta-phone" type="tel" placeholder={phone} required />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="cta-message">{t("messageLabel")}</label>
                <textarea id="cta-message" placeholder={t("messagePlaceholder")} rows={3} required />
              </div>
              <div className={styles.formFooter}>
                <div className={styles.contactInfo}>
                  <p>{t("directEmail")}</p>
                  <button type="button" className={styles.copyEmail} onClick={onCopy}>
                    <span>{email}</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                    {copied && <span style={{ fontSize: 12, marginLeft: 6, color: "#16a34a" }}>{t("copied")}</span>}
                  </button>
                </div>
                <button type="submit" className={styles.submitBtn}>
                  {t("submit")}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              </div>
            </form>
          </div>

          <div className={styles.infoBox}>
            <ul className={styles.featureList}>
              {resolvedFeatures.map((f) => (
                <li key={f}>
                  <div className={`${styles.label} ${styles.labelFeature}`}>
                    <span className={styles.labelIcon} role="img" aria-label="Star">
                      <StarIcon />
                    </span>
                    <p className={styles.labelText}>{f}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className={styles.imageCard}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image}
                alt={t("imageAlt")}
                loading="lazy"
              />
            </div>
            <div className={styles.actions}>
              <CTAButton className={styles.directButton} href="tel:+84971450454" variant="light">{t("directContact")}</CTAButton>
              <CTAButton className={styles.consultButton} href={ctaHref} target="_blank">{resolvedCtaLabel}</CTAButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
