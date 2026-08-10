"use client";

import { Link } from "@/i18n/routing";
import { CalendarDays, Eye, PenLine } from "lucide-react";
import styles from "./WorkLifeArticles.module.css";
import { useLocalizedValue } from "@/i18n/auto-text-client";

const ARTICLES = [
  {
    slug: "cong-viec-cua-tester-tai-winterfrost-viet-nam-se-lam-nhung-gi",
    title: "Công việc của Tester tại Winterfrost sẽ làm những gì?",
    description: "Bài viết mang đến góc nhìn chân thực và chuyên sâu về công việc của một Software Tester thông qua nhật ký một ngày làm việc của Nguyễn Quốc Huy và Thục Quyên tại Winterfrost. Vượt ra khỏi định kiến “chỉ dùng thử rồi báo lỗi”, quy trình kiểm thử đòi hỏi sự phân tích kỹ lưỡng từ khâu đọc tài liệu đặc tả, lên kịch bản, đến việc đánh giá hiệu năng và giao diện trên các nền tảng công nghệ đa dạng.",
    image: "/images/people/work-life/mot-ngay-kiem-thu-winterfrost.webp",
    author: "Hữu Trí", date: "Jul 13, 2026", views: 3,
  },
  {
    slug: "mot-ngay-lam-viec-cua-ba-tai-winterfrost-viet-nam",
    title: "Một ngày làm việc của Business Analytics (BA) tại Winterfrost sẽ như thế nào?",
    description: "Tìm hiểu xem vai trò của BA tại Winterfrost. Khám phá quy trình làm việc, cách giải quyết vấn đề, kinh nghiệm thực chiến và lời khuyên cho người mới.",
    image: "/images/people/work-life/mot-ngay-business-analyst-winterfrost.webp",
    author: "Hữu Trí", date: "Jul 4, 2026", views: 8,
  },
  {
    slug: "mot-ngay-lam-viec-cua-flutter-developer-se-nhu-the-nao",
    title: "Một ngày làm việc của Flutter Developer sẽ như thế nào?",
    description: "Khám phá một ngày làm việc thực tế của Flutter Developer tại Winterfrost. Đọc ngay để nắm bắt quy trình làm việc, cách giải quyết bài toán kinh doanh và những lời khuyên đắt giá cho lĩnh vực IT.",
    image: "/images/people/work-life/mot-ngay-flutter-developer-winterfrost.webp",
    author: "Lê Chân", date: "Jun 30, 2026", views: 8,
  },
];

export function WorkLifeArticles() {
  const articles = useLocalizedValue(ARTICLES);
  return (
    <section className={styles.section}>
      <div className={styles.header}><h2>Work Life</h2></div>
      <div className={styles.grid}>
        {articles.map((article) => (
          <Link href={`/wiki/${article.slug}`} className={styles.card} key={article.slug}>
            <div className={styles.imageWrapper}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={article.image} alt={article.title} loading="lazy" />
            </div>
            <div className={styles.tagRow}><span>WORK LIFE</span></div>
            <div className={styles.content}>
              <h3>{article.title}</h3>
              <p>{article.description}</p>
            </div>
            <div className={styles.meta}>
              <span><PenLine />{article.author}</span>
              <div><span><CalendarDays />{article.date}</span><span><Eye />{article.views}</span></div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
