"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { ArrowUpRight } from "lucide-react";
import styles from "./CaseStudiesAbout.module.css";
import { useAutoText } from "@/i18n/auto-text-client";

const IMG_BASE =
  "/images/migrated/homenest-software/wp-content/uploads/2026/03";
const COLLAGE = [
  { src: `${IMG_BASE}/6.png`, alt: "Power of Open template", cls: "topLeft" },
  { src: `${IMG_BASE}/2.png`, alt: "Article details blog tile", cls: "topCenter" },
  { src: `${IMG_BASE}/7.png`, alt: "Solar energy article card", cls: "topRight" },
  { src: `${IMG_BASE}/4.png`, alt: "Explore latest blog posts", cls: "leftMid" },
  { src: `${IMG_BASE}/1.jpg`, alt: "AI solutions for your business", cls: "center" },
  { src: `${IMG_BASE}/5.png`, alt: "RECRO portfolio template", cls: "rightMid" },
  { src: `${IMG_BASE}/8.png`, alt: "Building experts trust card", cls: "bottomLeft" },
  { src: `${IMG_BASE}/3.png`, alt: "Workflow automation phone", cls: "bottomCenter" },
  { src: `${IMG_BASE}/9.png`, alt: "Yellow building cards", cls: "bottomRight" },
] as const;

export function CaseStudiesAbout() {
  const tr = useAutoText();
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.header}>
            <span className={styles.eyebrow}>{tr("Tổng quan về các dự án của chúng tôi")}</span>
            <h2 className={styles.headline}>
              {tr("Dự án tiêu biểu và giải pháp triển khai thực tế")}
            </h2>
          </div>
          <div className={styles.aboutBody}>
            <div className={styles.body}>
              <p>
                {tr("Winterfrost chúng tôi tạo ra các giải pháp số giúp cho các công ty phát triển và mở rộng hoạt động. Chúng tôi thường xuyên gặp gỡ với khách hàng để nắm rõ về quy trình làm việc của họ và tạo ra những sản phẩm phần mềm phù hợp với các mục tiêu thực tế. Mỗi dự án được thực hiện thông qua việc nghiên cứu cẩn thận để đảm bảo hiệu quả cho đối tác của doanh nghiệp.")}
              </p>
              <p>
                {tr("Chúng tôi chuyên")} <strong>{tr("thiết kế và xây dựng website")}</strong>, {tr("ứng dụng trên")}{" "}
                <strong>{tr("điện thoại di động")}</strong>, {tr("phát triển AI, cùng với các")}{" "}
                <strong>{tr("hệ thống quản lý doanh nghiệp chuyên biệt")}</strong>. {tr("Đội ngũ kỹ sư tại Winterfrost Việt Nam sử dụng các nền tảng công nghệ ổn định để đảm bảo hiệu suất tốt và dễ dàng nâng cấp trong tương lai.")}
              </p>
              <p>
                {tr("Winterfrost chú trọng đến việc tối ưu hóa giao diện và trải nghiệm người dùng nhằm nâng cao sự tương tác của người dùng. Chúng tôi đã thành công với nhiều dự án trong các lĩnh vực như tài chính, thương mại điện tử, giáo dục và vận tải. Những dự án nổi bật dưới đây thể hiện khả năng của chúng tôi trong việc cung cấp những dịch vụ chuyên nghiệp, đem đến những kết quả tốt và lợi nhuận cao cho doanh nghiệp.")}
              </p>
            </div>
          </div>
          <div className={styles.ctaSlot}>
            <Link href="/lien-he" className={styles.cta}>
              {tr("Bắt đầu dự án ngay!")} <ArrowUpRight size={16} strokeWidth={2.4} />
            </Link>
          </div>
        </div>

        <div className={styles.collage} aria-hidden>
          <div className={styles.collageCanvas}>
            {COLLAGE.map((c) => (
              <div key={c.cls} className={`${styles.tile} ${styles[c.cls as keyof typeof styles]}`}>
                <Image src={c.src} alt={c.alt} width={600} height={600} unoptimized />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
