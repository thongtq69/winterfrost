"use client";

import { Link } from "@/i18n/routing";
import { aboutDetail } from "@/lib/site";
import { useAutoText, useLocalizedValue } from "@/i18n/auto-text-client";
import styles from "./WhoWeAre.module.css";

export function WhoWeAre() {
  const tr = useAutoText();
  const content = useLocalizedValue(aboutDetail.whoWeAre);

  return (
    <section className={styles.section} id="about">
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.leftColumn}>
            <div className={styles.label}>
              <span className={styles.labelIcon} aria-hidden />
              <h2>{content.label}</h2>
            </div>
          </div>

          <div className={styles.rightColumn}>
            <div className={styles.mainText}>
              <p>
                {tr("Tại Winterfrost, chúng tôi không chỉ xây dựng phần mềm, chúng tôi tháo gỡ những rào cản kỹ thuật để doanh nghiệp bạn vận hành trơn tru.")}
                <br />
                {tr("Từ")} <Link href="/dich-vu/thiet-ke-website">{tr("thiết kế website")}</Link>, <Link href="/dich-vu/thiet-ke-app">{tr("thiết kế app")}</Link> {tr("đến")} <Link href="/dich-vu/phat-trien-ai">{tr("phát triển AI")}</Link>, {tr("mọi dòng code đều được viết ra để tối ưu hóa chi phí và tạo đà tăng trưởng doanh thu thực tế cho doanh nghiệp.")}
              </p>
            </div>

            <div className={styles.quoteCard}>
              <div className={styles.noise} />
              <p className={styles.quoteText}>“{content.quote}”</p>
              <div className={styles.profileBox}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={content.quoteImage} alt={`${content.quoteAuthor} - Winterfrost`} className={styles.avatar} />
                <div className={styles.profileInfo}>
                  <span className={styles.name}>{content.quoteAuthor}</span>
                  <span className={styles.role}>{content.quoteRole}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
