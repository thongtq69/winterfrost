"use client";

import { Link } from "@/i18n/routing";
import Image from "next/image";
import { Phone } from "lucide-react";
import { industriesPage } from "@/lib/site";
import { useAutoText, useLocalizedValue } from "@/i18n/auto-text-client";
import styles from "./IndustriesIndex.module.css";

export function IndustriesPageHero() {
  const tr = useAutoText();
  const h = useLocalizedValue(industriesPage.hero);
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroContainer}>
          <div className={styles.heroText}>
            <h1 className={styles.heroTitle}>
              <span className={styles.heroTitleMain}>
                {h.headlineMain}
              </span>{" "}
              <span className={styles.heroTitleSub}>
                {h.headlineSub}
              </span>
            </h1>
            <div className={styles.heroDescription}>
              <p>{h.paragraphs[0]}</p><br />
              <p>
                {tr("Chúng tôi thực hiện điều này bằng việc đặt bản thân vào vấn đề mà doanh nghiệp đối mặt, từ đó chúng tôi hiểu rõ hơn và đưa ra giải pháp tối ưu nhất. Với dịch vụ")}{" "}
                <Link href="/dich-vu/thiet-ke-website">{tr("thiết kế website")}</Link>{", "}
                <Link href="/dich-vu/thiet-ke-app">{tr("phát triển ứng dụng di động")}</Link>{", "}
                {tr("đặc biệt là")}{" "}
                <Link href="/dich-vu/phat-trien-ai">{tr("phát triển AI")}</Link>{", "}
                {tr("chúng tôi cung cấp mọi dịch vụ cần thiết để giúp doanh nghiệp bứt phá trên thị trường.")}
              </p><br />
              <p>{h.paragraphs[2]}</p>
            </div>
            <div className={styles.heroButtons}>
              <Link href="tel:+84971450454" className={`${styles.heroButton} ${styles.heroButtonPrimary}`}>
                {tr("Liên hệ trực tiếp")}
                <Phone size={18} aria-hidden />
              </Link>
              <Link href="https://zalo.me/0971450454" className={styles.heroButton}>
                {tr("Nhắn tin nhận tư vấn")}
              </Link>
            </div>
          </div>
          <div className={styles.heroImage}>
            <Image
              src={h.image}
              alt={h.imageAlt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              priority
            />
          </div>
      </div>
    </section>
  );
}
