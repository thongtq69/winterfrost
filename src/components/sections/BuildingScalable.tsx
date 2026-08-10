"use client";

import { Link } from "@/i18n/routing";
import { CTAButton } from "@/components/primitives/CTAButton";
import styles from "./BuildingScalable.module.css";
import { useAutoText } from "@/i18n/auto-text-client";

const AVATARS = [
  "/images/people/khach-hang/nguyen-quoc-viet.webp",
  "/images/people/khach-hang/tran-minh-chau.webp",
  "/images/people/khach-hang/le-duc-anh.webp",
  "/images/people/khach-hang/vo-thanh-huong.webp",
];

const AUTHOR = "/images/people/founder/winterfrost/le-khai-minh.webp";
const APP_IMAGE = "/images/projects/nivora-connect/01-cover.webp";
const SOFTWARE_IMAGE =
  "/images/migrated/homenest-com-vn/wp-content/uploads/2026/04/Phat-trien-Phan-mem-HomeNest-Viet-Nam.jpg";
const FROSTMIND =
  "/images/migrated/homenest-com-vn/wp-content/uploads/2026/04/Go-QuestX-Chatbot-thong-minh-HomeNest-Viet-Nam.png";

export function BuildingScalable() {
  const tr = useAutoText();
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <div className={styles.label}><span aria-hidden /><h2>{tr("Dự án đã triển khai")}</h2></div>
            <p className={styles.heading}>{tr("Năng lực")} <em>{tr("Phát Triển")}</em><span>{tr("qua từng dự án")}</span></p>
          </div>

          <div className={styles.grid}>
            <article className={styles.cardWhite}>
              <div>
                <h3 className={styles.cardTitle}>{tr("Thiết kế Website")}</h3>
                <p className={styles.cardDescription}>{tr("Kiến tạo nền tảng Web với giao diện UI/UX trực quan, chuẩn SEO và hiệu năng cao, giúp doanh nghiệp bứt phá tỷ lệ chuyển đổi trên nền tảng số.")}</p>
              </div>
              <div className={styles.statsRow}>
                <div><strong>40%</strong><p>{tr("Giảm chi phí vận hành")}</p></div>
                <div><strong>70%</strong><p>{tr("Tăng tốc độ xử lý dữ liệu")}</p></div>
              </div>
              <hr />
              <div className={styles.author}>
                {/* eslint-disable-next-line @next/next/no-img-element */}<img src={AUTHOR} alt="Lê Khải Minh" />
                <div><b>Lê Khải Minh</b><span>Co-Founder</span></div>
              </div>
            </article>

            <article className={styles.cardBlue}>
              <div className={styles.cardBlueInner}>
                <div>
                  <div className={styles.avatarGroup}>
                    {AVATARS.map((src, index) => <span key={src}>{/* eslint-disable-next-line @next/next/no-img-element */}<img src={src} alt={`Khách hàng ${index + 1}`} /></span>)}
                    <span className={styles.avatarMore}>250+</span>
                  </div>
                  <div className={styles.stars}>★★★★★</div>
                  <p className={styles.happy}>{tr("98% khách hàng hài lòng về dịch vụ")}</p>
                </div>
                <div className={styles.appCopy}><h3>{tr("Thiết kế App")}</h3><p>{tr("Tối ưu trải nghiệm người dùng để giữ chân khách hàng và thúc đẩy tăng trưởng.")}</p></div>
                <div className={styles.videoPreview}>{/* eslint-disable-next-line @next/next/no-img-element */}<img src={APP_IMAGE} alt="Ứng dụng Nivora Connect" /></div>
              </div>
            </article>

            <article className={styles.cardImage}>
              {/* eslint-disable-next-line @next/next/no-img-element */}<img src={SOFTWARE_IMAGE} alt="Phát triển Phần mềm" className={styles.cardImageBg} />
              <div className={styles.imageOverlay} />
              <div className={styles.imageContent}>
                <h3>{tr("Phát triển Phần mềm")}</h3>
                <p>{tr("Cung cấp")} <Link href="/dich-vu/phat-trien-phan-mem-doanh-nghiep">{tr("giải pháp phần mềm chuyên sâu")}</Link> {tr("với kiến trúc linh hoạt, giải quyết triệt để bài toán vận hành phức tạp của doanh nghiệp.")}</p>
              </div>
            </article>

            <article className={styles.cardWhite}>
              <div>
                <h3 className={styles.cardTitle}>{tr("Phát triển AI")}</h3>
                <p className={styles.cardDescription}>{tr("Ứng dụng AI/GenAI để")} <Link href="/ai-se-thay-doi-doanh-nghiep-nhu-the-nao">{tr("tự động hóa quy trình")}</Link> {tr("và phân tích dữ liệu chuyên sâu, giúp tối ưu nguồn lực và tạo lợi thế cạnh tranh đột phá.")}</p>
              </div>
              <div className={styles.singleStat}><strong>250+</strong><p>{tr("Khách hàng tin tưởng dịch vụ")}</p></div>
              <hr />
              <div className={styles.brandFooter}>
                <div><b>FrostMind AI</b><span>{tr("AI Chatbot thông minh")}</span></div>
                {/* eslint-disable-next-line @next/next/no-img-element */}<img src={FROSTMIND} alt="FrostMind AI" />
              </div>
            </article>
          </div>

          <div className={styles.ctaWrapper}><CTAButton href="/case-studies">{tr("Xem dự án nổi bật")}</CTAButton></div>
        </div>
      </div>
    </section>
  );
}
