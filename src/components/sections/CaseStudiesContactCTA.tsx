"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { ArrowRight, ArrowUpRight, Copy } from "lucide-react";
import styles from "./CaseStudiesContactCTA.module.css";

const SIDE_IMAGE = "/images/people/van-phong/van-phong-softbuild.webp";

export function CaseStudiesContactCTA() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.head}>
          <span className={styles.eyebrow}>Kết nối với chúng tôi</span>
          <h2 className={styles.headline}>
            Khởi Tạo <em>Dự Án</em> Của Bạn
            <br />Ngay Hôm Nay
          </h2>
        </div>

        <div className={styles.cards}>
          <form className={styles.cardForm} onSubmit={(e) => e.preventDefault()}>
            <h3>Liên hệ hợp tác</h3>
            <label className={styles.label}>
              Họ và tên*
              <input type="text" name="name" placeholder="Họ và tên của bạn" required />
            </label>
            <label className={styles.label}>
              Email*
              <input type="email" name="email" placeholder="example@gmail.com" required />
            </label>
            <label className={styles.label}>
              <textarea name="message" placeholder="Mô tả ngắn về yêu cầu của bạn" />
            </label>
            <div className={styles.formFooter}>
              <div className={styles.mailHint}>
                <span>Hoặc gửi mail trực tiếp tới:</span>
                <strong>
                  contact@softbuild.vn <Copy size={14} aria-hidden />
                </strong>
              </div>
              <button type="submit" className={styles.submit}>
                Gửi yêu cầu <ArrowRight size={16} />
              </button>
            </div>
          </form>

          <aside className={styles.cardSide}>
            <ul className={styles.checks}>
              <li className={styles.checkItem}>Phản hồi nhanh chóng trong 24h.</li>
              <li className={styles.checkItem}>Làm việc trực tiếp với chuyên gia.</li>
              <li className={styles.checkItem}>Tư vấn chiến lược rõ ràng.</li>
            </ul>
            <div className={styles.sideImage}>
              <Image src={SIDE_IMAGE} alt="SoftBuild — Liên hệ tư vấn" fill sizes="(max-width:1024px) 100vw, 600px" />
            </div>
            <Link href="/lien-he" className={styles.sideCta}>
              Đặt lịch tư vấn
              <span className={styles.sideCtaIcon}><ArrowUpRight size={18} strokeWidth={2.2} /></span>
            </Link>
          </aside>
        </div>
      </div>
    </section>
  );
}
