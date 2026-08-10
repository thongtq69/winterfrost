"use client";

import { CTAButton } from "@/components/primitives/CTAButton";
import { Reveal } from "@/components/primitives/Reveal";
import styles from "./ProcessTimeline.module.css";
import { useAutoText, useLocalizedValue } from "@/i18n/auto-text-client";

const STEPS = [
  { n: "01", title: "Phân Tích & Thấu hiểu", desc: "Tiếp nhận yêu cầu và nghiên cứu sâu mô hình kinh doanh cũng như hệ thống hiện tại của bạn. Đội ngũ chuyên gia của Winterfrost sẽ bóc tách vấn đề để xác định chính xác mục tiêu cốt lõi trước khi bắt đầu." },
  { n: "02", title: "Tư vấn lộ trình & Giải pháp", desc: "Hoạch định lộ trình triển khai chi tiết và thiết kế kiến trúc hệ thống chuyên biệt. Chúng tôi lựa chọn công nghệ tối ưu nhất để đảm bảo hiệu suất cao và tránh lãng phí ngân sách của doanh nghiệp." },
  { n: "03", title: "Lập trình & Tối ưu", desc: "Hiện thực hóa ý tưởng với giao diện trực quan, lấy người dùng làm trung tâm. Ứng dụng mô hình Agile giúp quá trình lập trình diễn ra nhanh chóng, linh hoạt điều chỉnh và cập nhật tiến độ liên tục." },
  { n: "04", title: "Kiểm thử & Bàn giao", desc: "Tiến hành các quy trình kiểm thử khắt khe để đảm bảo hệ thống vận hành trơn tru 100%. Hỗ trợ đưa ứng dụng lên các nền tảng và chuyển giao toàn bộ quyền sở hữu trí tuệ." },
  { n: "05", title: "Hỗ trợ & Mở rộng", desc: "Trách nhiệm của chúng tôi không dừng lại lúc ra mắt. Winterfrost tiếp tục giám sát hệ thống 24/7, cung cấp hỗ trợ kỹ thuật ưu tiên và sẵn sàng nâng cấp, mở rộng tính năng khi doanh nghiệp tăng trưởng quy mô." },
];

export function ProcessTimeline() {
  const tr = useAutoText();
  const steps = useLocalizedValue(STEPS);
  return (
    <section className={styles.section}>
      <div className={styles.label}><span aria-hidden /><h2>{tr("Quy trình tư vấn tại Winterfrost")}</h2></div>
      <div className={styles.content}>
        <div className={styles.timeline}>
          {steps.map((step, index) => (
            <div className={styles.row} key={step.n}>
              <div className={styles.progressWrapper}>
                <span className={styles.stepNumber}>{step.n}</span>
                {index < steps.length - 1 && <div className={styles.progressBar}><span /></div>}
              </div>
              <Reveal className={styles.textContent} direction="up" delay={index * 70}>
                <div className={styles.stepHeading}>
                  <span className={styles.badge}>{tr("Giai đoạn")} {index + 1}</span>
                  <h3>{step.title}</h3>
                </div>
                <p>{step.desc}</p>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
      <CTAButton href="tel:+84971450454" target="_blank">{tr("Bắt đầu ngay!")}</CTAButton>
    </section>
  );
}
