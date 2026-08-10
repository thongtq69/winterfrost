"use client";

import { useMemo, useState } from "react";
import { Link } from "@/i18n/routing";
import { ArrowUpRight, CalendarDays, Eye, Pencil, Search } from "lucide-react";
import { jobContents } from "@/lib/job-data";
import s from "./page.module.css";
import { useAutoText, useLocalizedValue } from "@/i18n/auto-text-client";

const HERO_IMAGE = "/images/people/tuyen-dung/doi-ngu-winterfrost.webp";

const filterGroups = [
  { title: "Vị trí ứng tuyển", values: ["Tất cả", "Brand Strategy", "Business Analyst", "Data Analyst", "Graphic Design", "Hành chánh nhân sự", "Kế toán - Kiểm toán", "Kinh doanh", "Marketing", "Pháp chế", "Quản trị rủi ro", "Software Development", "Software Tester", "UI/UX Design", "Vận hành", "Văn phòng"] },
  { title: "Nơi làm việc", values: ["Tất cả", "Cần Thơ", "Đà Nẵng", "Hà Nội", "Hồ Chí Minh"] },
  { title: "Loại tuyển dụng", values: ["Tất cả", "Full-time", "Intern", "Part-time"] },
  { title: "Hình thức làm việc", values: ["Tất cả", "Cộng tác viên", "Intern", "Nhân viên", "Quản lý"] },
];

const workLife = [
  { href: "/wiki/cong-viec-cua-tester-tai-winterfrost-viet-nam-se-lam-nhung-gi", title: "Công việc của Tester tại Winterfrost sẽ làm những gì?", description: "Bài viết mang đến góc nhìn chân thực và chuyên sâu về công việc của một Software Tester thông qua nhật ký một ngày làm việc của Nguyễn Quốc Huy và Thục Quyên tại Winterfrost. Vượt ra khỏi định kiến “chỉ dùng thử rồi báo lỗi”, quy trình kiểm thử đòi hỏi sự phân tích kỹ lưỡng từ khâu đọc tài liệu đặc tả, lên kịch bản, đến việc đánh giá hiệu năng và giao diện trên các nền tảng công nghệ đa dạng. Bên cạnh việc phác họa chi tiết cách Tester phối hợp nhịp nhàng cùng Developer và BA để giải quyết bài toán trải nghiệm người dùng, bài viết còn đúc kết những lời khuyên thực tế cho người mới vào nghề và giới thiệu các cơ hội phát triển sự nghiệp hấp dẫn tại Winterfrost.", image: "/images/people/work-life/mot-ngay-kiem-thu-winterfrost.webp", author: "Hữu Trí", date: "Jul 13, 2026", views: "3" },
  { href: "/wiki/mot-ngay-lam-viec-cua-ba-tai-winterfrost-viet-nam", title: "Một ngày làm việc của Business Analytics (BA) tại Winterfrost sẽ như thế nào?", description: "Tìm hiểu xem vai trò của BA tại Winterfrost. Khám phá quy trình làm việc, cách giải quyết vấn đề, kinh nghiệm thực chiến và lời khuyên cho người mới.", image: "/images/people/work-life/mot-ngay-business-analyst-winterfrost.webp", author: "Hữu Trí", date: "Jul 4, 2026", views: "8" },
  { href: "/wiki/mot-ngay-lam-viec-cua-flutter-developer-se-nhu-the-nao", title: "Một ngày làm việc của Flutter Developer sẽ như thế nào?", description: "Khám phá một ngày làm việc thực tế của Flutter Developer tại Winterfrost. Đọc ngay để nắm bắt quy trình làm việc, cách giải quyết bài toán kinh doanh và những lời khuyên đắt giá cho lĩnh vực IT.", image: "/images/people/work-life/mot-ngay-flutter-developer-winterfrost.webp", author: "Lê Chân", date: "Jun 30, 2026", views: "8" },
];

export default function CareersPage() {
  const tr = useAutoText();
  const localizedWorkLife = useLocalizedValue(workLife);
  const [search, setSearch] = useState("");
  const [active, setActive] = useState<Record<string, string>>({});

  const jobs = useMemo(() => jobContents.filter((job) => {
    const localizedTitle = tr(job.title);
    const queryMatches = `${job.title} ${localizedTitle}`.toLowerCase().includes(search.trim().toLowerCase());
    const position = active["Vị trí ứng tuyển"];
    const type = active["Loại tuyển dụng"];
    const form = active["Hình thức làm việc"];
    const isMarketing = job.title.toLowerCase().includes("marketing");
    const isIntern = job.title.toLowerCase().includes("thực tập");
    const positionMatches = !position || position === "Tất cả" || (position === "Marketing" ? isMarketing : position === "Software Development" ? !isMarketing : false);
    const typeMatches = !type || type === "Tất cả" || (type === "Intern" ? isIntern : type === "Full-time" ? !isIntern : false);
    const formMatches = !form || form === "Tất cả" || (form === "Intern" ? isIntern : form === "Nhân viên" ? !isIntern : false);
    return queryMatches && positionMatches && typeMatches && formMatches;
  }), [active, search, tr]);

  return (
    <main className={s.main}>
      <section className={s.intro}>
        <h1>{tr("Đồng hành cùng Winterfrost")}<br />{tr("trong kỷ nguyên số")}</h1>
        <p>{tr("Chúng tôi không chỉ cung cấp những giải pháp chuyển đổi số hiệu quả mà còn tạo ra một môi trường chuyên nghiệp để các bạn được")} <strong>{tr("phát huy tài năng")}</strong>. {tr("Với mạng lưới")} <strong>{tr("dự án trải dài ở hơn 15 quốc gia")}</strong>, {tr("trở thành một thành viên của Winterfrost là bạn sẽ có cơ hội làm việc trong một môi trường đa văn hóa, trực tiếp giải quyết những")} <strong>{tr("thách thức công nghệ lớn")}</strong>. {tr("Chúng tôi luôn chú trọng vào sự phát triển của nhân viên, vì tin rằng nhân viên thoải mái, vui vẻ làm việc sẽ tạo ra được những sản phẩm chất lượng.")}</p>
      </section>

      <section className={s.heroBanner}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={HERO_IMAGE} alt={tr("Đội ngũ Winterfrost")} />
        <h2>{tr("Vị trí đang tuyển dụng")}</h2>
        <p>{tr("Tìm kiếm công việc phù hợp và gia nhập đội ngũ Winterfrost ngay hôm nay.")}</p>
      </section>

      <div className={s.jobSearch}>
        <div><Search aria-hidden="true" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder={tr("Tìm kiếm vị trí tuyển dụng")} /></div>
        <button type="button">{tr("Tìm kiếm")}</button>
      </div>

      <section className={s.careerContent}>
        <aside className={s.filters}>
          {filterGroups.map((group) => (
            <div className={s.filterGroup} key={group.title}>
              <h3>{tr(group.title)}</h3>
              {group.values.map((value) => {
                const checked = (active[group.title] ?? "Tất cả") === value;
                return <button className={checked ? s.activeFilter : ""} type="button" onClick={() => setActive((state) => ({ ...state, [group.title]: value }))} key={value}><span />{tr(value)}</button>;
              })}
            </div>
          ))}
        </aside>

        <div className={s.listings}>
          {jobs.map((job) => (
            <Link href={`/tuyen-dung/${job.slug}`} key={job.slug}>
              <div><h3>{tr(job.title)}</h3><p>{tr("Mức lương: Thỏa thuận")}</p><p>{tr("Hạn nộp hồ sơ: 2026-12-31")}</p></div>
              <ArrowUpRight aria-hidden="true" />
            </Link>
          ))}
        </div>
        <nav className={s.pagination} aria-label="Phân trang tuyển dụng">
          {[1, 2, 3, 4, 5].map((page) => <Link className={page === 1 ? s.activePage : ""} href={page === 1 ? "/tuyen-dung" : `/tuyen-dung?page=${page}`} key={page}>{page}</Link>)}
        </nav>
      </section>

      <section className={s.workLife}>
        <div className={s.workHeader}><h2>{tr("Work Life")}</h2><Link href="/wiki">{tr("Xem tất cả")} <ArrowUpRight /></Link></div>
        <div className={s.workGrid}>
          {localizedWorkLife.map((item) => (
            <Link href={item.href} className={s.workCard} key={item.title}>
              <div className={s.workImage}>{/* eslint-disable-next-line @next/next/no-img-element */}<img src={item.image} alt={item.title} /></div>
              <span className={s.workBadge}>{tr("WORK LIFE")}</span>
              <div className={s.workCopy}><h3>{item.title}</h3><p>{item.description}</p></div>
              <div className={s.workMeta}><span><Pencil />{item.author}</span><span><CalendarDays />{item.date}</span><span><Eye />{item.views}</span></div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
