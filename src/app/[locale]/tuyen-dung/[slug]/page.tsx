import type { Metadata } from "next";
import { Link } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { ArrowUpRight, CalendarDays, Clock3, Eye, Pencil } from "lucide-react";
import { jobContents, type JobContentBlock } from "@/lib/job-data";
import s from "./page.module.css";
import { getJobDetails } from "@/i18n/localized-details";
import { getAutoText } from "@/i18n/auto-text-server";
import { localizeValue } from "@/i18n/auto-text";
import { isSupportedLocale, routing, type Locale } from "@/i18n/routing";

type Params = { locale: string; slug: string };

const HERO_IMAGE = "/images/people/tuyen-dung/doi-ngu-softbuild.webp";
const PROMO_IMAGE = "/images/migrated/homenest-com-vn/wp-content/uploads/2026/04/job-detail-banner.png";
const CONSULTANT_IMAGE = "/images/people/cta/softbuild/chuyen-vien-tu-van-viet-nam.png";

const workLife = [
  {
    href: "/wiki/cong-viec-cua-tester-tai-softbuild-viet-nam-se-lam-nhung-gi",
    title: "Công việc của Tester tại SoftBuild sẽ làm những gì?",
    description: "Bài viết mang đến góc nhìn chân thực và chuyên sâu về công việc của một Software Tester thông qua nhật ký một ngày làm việc của Nguyễn Quốc Huy và Thục Quyên tại SoftBuild. Vượt ra khỏi định kiến “chỉ dùng thử rồi báo lỗi”, quy trình kiểm thử đòi hỏi sự phân tích kỹ lưỡng từ khâu đọc tài liệu đặc tả, lên kịch bản, đến việc đánh giá hiệu năng và giao diện trên các nền tảng công nghệ đa dạng. Bên cạnh việc phác họa chi tiết cách Tester phối hợp nhịp nhàng cùng Developer và BA để giải quyết bài toán trải nghiệm người dùng, bài viết còn đúc kết những lời khuyên thực tế cho người mới vào nghề và giới thiệu các cơ hội phát triển sự nghiệp hấp dẫn tại SoftBuild.",
    image: "/images/people/work-life/mot-ngay-kiem-thu-softbuild.webp",
    author: "Hữu Trí",
    date: "Jul 13, 2026",
    views: "3",
  },
  {
    href: "/wiki/mot-ngay-lam-viec-cua-ba-tai-softbuild-viet-nam",
    title: "Một ngày làm việc của Business Analytics (BA) tại SoftBuild sẽ như thế nào?",
    description: "Tìm hiểu xem vai trò của BA tại SoftBuild. Khám phá quy trình làm việc, cách giải quyết vấn đề, kinh nghiệm thực chiến và lời khuyên cho người mới.",
    image: "/images/people/work-life/mot-ngay-business-analyst-softbuild.webp",
    author: "Hữu Trí",
    date: "Jul 4, 2026",
    views: "8",
  },
  {
    href: "/wiki/mot-ngay-lam-viec-cua-flutter-developer-se-nhu-the-nao",
    title: "Một ngày làm việc của Flutter Developer sẽ như thế nào?",
    description: "Khám phá một ngày làm việc thực tế của Flutter Developer tại SoftBuild. Đọc ngay để nắm bắt quy trình làm việc, cách giải quyết bài toán kinh doanh và những lời khuyên đắt giá cho lĩnh vực IT.",
    image: "/images/people/work-life/mot-ngay-flutter-developer-softbuild.webp",
    author: "Lê Chân",
    date: "Jun 30, 2026",
    views: "8",
  },
];

export function generateStaticParams() {
  return jobContents.map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale: candidate, slug } = await params;
  const locale: Locale = isSupportedLocale(candidate) ? candidate : routing.defaultLocale;
  const tr = await getAutoText(locale);
  const jobs = await getJobDetails(locale);
  const job = jobs.find((entry) => entry.slug === slug);
  if (!job) return {};
  return {
    title: `${job.title} | ${tr("Tuyển dụng SoftBuild")}`,
    description: `${tr("Tuyển dụng")} ${job.title} ${tr("tại SoftBuild. Hạn nộp hồ sơ: 2026-12-31.")}`,
  };
}

function JobBlock({ block }: { block: JobContentBlock }) {
  if (block.type === "list") {
    return <ul>{block.items.map((item) => {
      const [label, ...children] = item.split("\n").filter(Boolean);
      return <li key={item}>{label}{children.length > 0 && <ul>{children.map((child) => <li key={child}>{child}</li>)}</ul>}</li>;
    })}</ul>;
  }
  if (block.type === "h2") return <h2>{block.text}</h2>;
  if (block.type === "h3") return <h3>{block.text}</h3>;
  if (block.type === "p") return <p>{block.text}</p>;
  const groups = block.text.split(/\n{2,}/).filter(Boolean);
  return (
    <div className={s.textBlock}>
      <div>
        {groups.map((group, groupIndex) => {
          const lines = group.split("\n").filter(Boolean);
          if (groups.length > 1 && lines.length === 1) return <p key={`${group}-${groupIndex}`}>{lines[0]}</p>;
          return <ul key={`${group}-${groupIndex}`}>{lines.map((line) => <li key={line}>{line}</li>)}</ul>;
        })}
      </div>
    </div>
  );
}

export default async function JobDetailPage({ params }: { params: Promise<Params> }) {
  const { locale: candidate, slug } = await params;
  const locale: Locale = isSupportedLocale(candidate) ? candidate : routing.defaultLocale;
  const tr = await getAutoText(locale);
  const jobs = await getJobDetails(locale);
  const job = jobs.find((entry) => entry.slug === slug);
  if (!job) notFound();

  const related = jobs.filter((item) => item.slug !== slug).slice(0, 4);
  const localizedWorkLife = localizeValue(workLife, tr);
  const side = job.sidebar;

  return (
    <main className={s.main} data-job-slug={slug}>
      <div className={s.container}>
        <div className={s.banner}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={HERO_IMAGE} alt={job.title} />
        </div>

        <div className={s.layout}>
          <aside className={s.sidebar}>
            <div className={s.sidebarCard}>
              <div className={s.deadline}><Clock3 aria-hidden="true" />{side[0]}</div>
              <div className={s.sideItem}><strong>{side[1]}</strong><span>{side[2]}</span></div>
              <div className={s.sideItem}><strong>{side[3]}</strong><span>{side[4]}</span></div>
              <div className={s.sideItem}><strong>{side[5]}</strong><span>{side[6]}</span></div>
              <div className={s.sideItem}><strong>{side[7]}</strong><span>{side[8]}</span></div>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className={s.promoImage} src={PROMO_IMAGE} alt={tr("Khuyến mãi SoftBuild")} />
          </aside>

          <article className={s.article}>
            <nav className={s.breadcrumb} aria-label="Breadcrumb">
              <Link href="/">{tr("Trang chủ")}</Link><span>/</span>
              <Link href="/tuyen-dung">{tr("Tuyển dụng")}</Link><span>/</span>
              <span>{job.title}</span>
            </nav>
            <h1>{job.title}</h1>
            <section className={s.jobContent}>
              <div className={s.wpContent}>{job.blocks.map((block, index) => <JobBlock block={block} key={`${block.type}-${index}`} />)}</div>
              <div className={s.wpContentExtra}>
                {job.extra.map((block, index) => {
                  if (index === 1) return <p key={block.text}>{tr("Nộp CV về mail:")} <a href="mailto:careers@softbuild.vn">careers@softbuild.vn</a></p>;
                  if (index === 2) return <p key={block.text}>{tr("Hoặc Zalo:")} <a href="https://zalo.me/0971450454">097 145 04 54</a></p>;
                  return <p key={block.text}>{block.text}</p>;
                })}
              </div>
            </section>
          </article>
        </div>

        <section className={s.consultWrap}>
          <div className={s.consultCard}>
            <div className={s.consultCopy}>
              <span>{tr("Đặt lịch tư vấn ngay")}</span>
              <h2>{tr("Liên hệ ngay để xây dựng nền tảng công nghệ vững chắc cho doanh nghiệp của bạn")}</h2>
              <p>{tr("Đặt lịch trao đổi cùng đội ngũ kỹ sư để nhận tư vấn chuyên sâu về lộ trình số hóa và phương án tối ưu chi phí triển khai.")}</p>
              <Link href="/lien-he">{tr("Trò chuyện với chuyên gia →")}</Link>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={CONSULTANT_IMAGE} alt="Expert consultant" />
          </div>
        </section>

        <section className={s.relatedJobs}>
          <div className={s.relatedHeader}><span>{tr("Tuyển dụng")}</span><h2>{tr("Tin tuyển dụng khác")}</h2></div>
          <div className={s.relatedList}>
            {related.map((item) => (
              <Link href={`/tuyen-dung/${item.slug}`} key={item.slug}>
                <div><h3>{item.title}</h3><p>{tr("Mức lương: Thỏa thuận")}</p><p>{tr("Hạn nộp hồ sơ: 2026-12-31")}</p></div>
                <ArrowUpRight aria-hidden="true" />
              </Link>
            ))}
          </div>
        </section>

        <section className={s.workLife}>
          <div className={s.workHeader}><h2>{tr("Work-Life")}</h2><Link href="/wiki">{tr("Xem tất cả")} <ArrowUpRight aria-hidden="true" /></Link></div>
          <div className={s.workGrid}>
            {localizedWorkLife.map((item) => (
              <Link href={item.href} className={s.workCard} key={item.title}>
                <div className={s.workImage}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.image} alt={item.title} />
                </div>
                <span className={s.workBadge}>{tr("WORK LIFE")}</span>
                <div className={s.workCopy}><h3>{item.title}</h3><p>{item.description}</p></div>
                <div className={s.workMeta}><span><Pencil />{item.author}</span><span><CalendarDays />{item.date}</span><span><Eye />{item.views}</span></div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
