"use client";

import { useState } from "react";
import { Link } from "@/i18n/routing";
import { useAutoText, useLocalizedValue } from "@/i18n/auto-text-client";

const STYLESHEETS = [
  "https://softbuildvn.vercel.app/_next/static/chunks/419f318b2056e9cc.css",
  "https://softbuildvn.vercel.app/_next/static/chunks/f6a48a8a59bef51b.css",
  "https://softbuildvn.vercel.app/_next/static/chunks/591312935a8a436b.css",
  "https://softbuildvn.vercel.app/_next/static/chunks/6732512e87e8f355.css",
  "https://softbuildvn.vercel.app/_next/static/chunks/356b7c84cad65aa0.css",
];

type Card = {
  slug: string;
  title: string;
  image: string;
  imageAlt: string;
  author: string;
  date: string;
  views: string;
  description?: string;
};

const tester: Card = {
  slug: "cong-viec-cua-tester-tai-softbuild-viet-nam-se-lam-nhung-gi",
  title: "Công việc của Tester tại SoftBuild sẽ làm những gì?",
  image: "/images/people/work-life/mot-ngay-kiem-thu-softbuild.webp",
  imageAlt: "Một ngày là tester tại SoftBuild",
  author: "Hữu Trí",
  date: "Jul 13, 2026",
  views: "3",
  description: "Bài viết mang đến góc nhìn chân thực và chuyên sâu về công việc của một Software Tester thông qua nhật ký một ngày làm việc của Nguyễn Quốc Huy và Thục Quyên tại SoftBuild. Vượt ra khỏi định kiến “chỉ dùng thử rồi báo lỗi”, quy trình kiểm thử đòi hỏi sự phân tích kỹ lưỡng từ khâu đọc tài liệu đặc tả, lên kịch bản, đến việc đánh giá hiệu năng và giao diện trên các nền tảng công nghệ đa dạng. Bên cạnh việc phác họa chi tiết cách Tester phối hợp nhịp nhàng cùng Developer và BA để giải quyết bài toán trải nghiệm người dùng, bài viết còn đúc kết những lời khuyên thực tế cho người mới vào nghề và giới thiệu các cơ hội phát triển sự nghiệp hấp dẫn tại SoftBuild.",
};

const popular: Card[] = [
  { slug: "ui-ux-designer-la-gi-hanh-trang-can-co-de-buoc-vao-nghe-thiet-ke-ui-ux", title: "UI/UX Designer Là Gì? Hành Trang Cần Có Để Bước Vào Nghề Thiết Kế UI/UX", image: "/images/migrated/homenest-com-vn/wp-content/uploads/2026/03/22120006/ui-ux-la-gi.jpg", imageAlt: "ui-ux-la-gi", author: "Phương Ly", date: "Mar 12, 2026", views: "129" },
  { slug: "flutter-so-voi-react-native-va-xamarin", title: "Flutter so với React Native và Xamarin: Nên chọn framework nào cho phát triển Mobile?", image: "/images/migrated/homenest-com-vn/wp-content/uploads/2026/03/22115935/Flutter-so-voi-React-Native-va-Xamarin-Nen-chon-framework-nao-cho-phat-trien-Mobile.webp", imageAlt: "Flutter so với React Native và Xamarin Nên chọn framework nào cho phát triển Mobile", author: "Phương Ly", date: "Mar 14, 2026", views: "87" },
  { slug: "top-10-khoa-hoc-back-end-developer-tot-nhat", title: "Top 10 Khóa Học Back-End Developer Tốt Nhất", image: "/images/migrated/homenest-com-vn/wp-content/uploads/2026/03/22115940/Top-10-Khoa-Hoc-Back-End-Developer-Tot-Nhat.png", imageAlt: "Top 10 Khóa Học Back-End Developer Tốt Nhất", author: "Phương Ly", date: "Mar 14, 2026", views: "50" },
  { slug: "mot-ngay-lam-viec-cua-mot-backend-engineer-tai-softbuild", title: "Một ngày làm việc của một Backend Engineer tại SoftBuild", image: "/images/migrated/homenest-com-vn/wp-content/uploads/2026/03/22115915/Ngay-lam-viec-cua-mot-Backend.jpg", imageAlt: "Ngày làm việc của một Backend", author: "Lê Chân", date: "Mar 17, 2026", views: "31" },
  { slug: "react-native-developer-la-gi-ky-nang-va-mo-ta-cong-viec-react-native", title: "React Native Developer là gì? Kỹ năng và mô tả công việc React Native", image: "/images/migrated/homenest-com-vn/wp-content/uploads/2026/03/22115956/React-Native-Developer-la-gi.png", imageAlt: "React Native Developer là gì", author: "Phương Ly", date: "Mar 12, 2026", views: "25" },
];

const posts: Card[] = [
  { slug: "mot-ngay-lam-viec-cua-ba-tai-softbuild-viet-nam", title: "Một ngày làm việc của Business Analytics (BA) tại SoftBuild sẽ như thế nào?", image: "/images/people/work-life/mot-ngay-business-analyst-softbuild.webp", imageAlt: "Một ngày làm việc của Business Analytics", author: "Hữu Trí", date: "Jul 4, 2026", views: "8", description: "Tìm hiểu xem vai trò của BA tại SoftBuild. Khám phá quy trình làm việc, cách giải quyết vấn đề, kinh nghiệm thực chiến và lời khuyên cho người mới." },
  { slug: "mot-ngay-lam-viec-cua-flutter-developer-se-nhu-the-nao", title: "Một ngày làm việc của Flutter Developer sẽ như thế nào?", image: "/images/people/work-life/mot-ngay-flutter-developer-softbuild.webp", imageAlt: "Một ngày làm việc của Flutter Developer tại SoftBuild", author: "Lê Chân", date: "Jun 30, 2026", views: "8", description: "Khám phá một ngày làm việc thực tế của Flutter Developer tại SoftBuild. Đọc ngay để nắm bắt quy trình làm việc, cách giải quyết bài toán kinh doanh và những lời khuyên đắt giá cho lĩnh vực IT." },
  { slug: "lo-trinh-nghe-nghiep-software-engineer-cach-chon-huong-di-phu-hop-voi-ban", title: "Lộ trình nghề nghiệp Software Engineer: Cách chọn hướng đi phù hợp với bạn", image: "/images/migrated/homenest-com-vn/wp-content/uploads/2026/03/22115909/Lo-trinh-nghe-nghiep-Software-Engineer.jpg", imageAlt: "Lộ trình nghề nghiệp Software Engineer", author: "Phương Ly", date: "Mar 17, 2026", views: "19", description: "Lộ trình sự nghiệp của một Software Engineer không có một công thức cố định cho tất cả mọi người. Điều quan trọng không phải là lựa chọn Front-end, Back-end, Mobile, AI hay DevOps ngay từ đầu, mà là không ngừng học hỏi, tích lũy kinh nghiệm thực tế và xây dựng tư duy giải quyết vấn đề. Khi nền tảng kỹ thuật ngày càng vững chắc, bạn sẽ có nhiều cơ hội phát triển theo hướng chuyên gia (Technical Expert), quản lý (Engineering Manager, CTO) hoặc khởi nghiệp với chính những sản phẩm công nghệ của mình. Trong một ngành luôn thay đổi như CNTT, khả năng thích nghi, tinh thần học tập liên tục và sự chính trực trong công việc sẽ là những yếu tố tạo nên lợi thế cạnh tranh và giúp bạn xây dựng một sự nghiệp bền vững trong dài hạn." },
  popular[3],
  popular[1],
  popular[2],
];

function PenIcon() { return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>; }
function CalendarIcon() { return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>; }
function EyeIcon() { return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>; }

function Badge({ small = false }: { small?: boolean }) {
  const tr = useAutoText();
  return <span className={`CategoryBadge-module__asomNa__badge ${small ? "CategoryBadge-module__asomNa__sm" : ""}`} style={{ backgroundColor: "rgba(217, 132, 22, 0.45)", color: "rgb(26, 59, 145)" }}>{tr("WORK LIFE")}</span>;
}

function HighlightCard({ item, eager = false }: { item: Card; eager?: boolean }) {
  const tr = useAutoText();
  return <Link className="HighlightCard-module__SXaXkW__card" data-cursor-text={tr("Xem bài viết")} href={`/${item.slug}`}>
    <div className="HighlightCard-module__SXaXkW__imageWrapper"><img alt={item.imageAlt} title={item.imageAlt} className="HighlightCard-module__SXaXkW__image" loading={eager ? "eager" : "lazy"} fetchPriority={eager ? "high" : "auto"} src={item.image} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} /></div>
    <div className="HighlightCard-module__SXaXkW__tagRow"><Badge /></div>
    <div className="HighlightCard-module__SXaXkW__content"><h3 className="HighlightCard-module__SXaXkW__title utils-module__nwfdoa__clamp2">{item.title}</h3>{item.description && <p className="HighlightCard-module__SXaXkW__description utils-module__nwfdoa__clamp3">{item.description}</p>}</div>
    <div className="HighlightCard-module__SXaXkW__meta"><span className="HighlightCard-module__SXaXkW__metaItem"><PenIcon />{item.author}</span><div className="HighlightCard-module__SXaXkW__metaRight"><span className="HighlightCard-module__SXaXkW__metaItem"><CalendarIcon />{item.date}</span><span className="HighlightCard-module__SXaXkW__metaItem undefined"><EyeIcon />{item.views}</span></div></div>
  </Link>;
}

function PopularCard({ item }: { item: Card }) {
  const tr = useAutoText();
  return <Link className="PopularCard-module__fxapAq__card" data-cursor-text={tr("Xem bài viết")} href={`/${item.slug}`}>
    <div className="PopularCard-module__fxapAq__imageWrapper"><img alt={item.imageAlt} title={item.imageAlt} className="PopularCard-module__fxapAq__image" loading="lazy" decoding="async" src={item.image} /></div>
    <div className="PopularCard-module__fxapAq__content"><div className="PopularCard-module__fxapAq__tagRow"><Badge small /></div><h3 className="PopularCard-module__fxapAq__title utils-module__nwfdoa__clamp1">{item.title}</h3><div className="PopularCard-module__fxapAq__meta"><span className="PopularCard-module__fxapAq__metaItem"><PenIcon />{item.author}</span><div className="PopularCard-module__fxapAq__metaRight"><span className="PopularCard-module__fxapAq__metaItem PopularCard-module__fxapAq__date"><CalendarIcon />{item.date}</span><span className="PopularCard-module__fxapAq__metaItem"><EyeIcon />{item.views}</span></div></div></div>
  </Link>;
}

export function WorkLifeRawPage() {
  const tr = useAutoText();
  const localizedTester = useLocalizedValue(tester);
  const localizedPopular = useLocalizedValue(popular);
  const localizedPosts = useLocalizedValue(posts);
  const [search, setSearch] = useState("");
  const visible = localizedPosts.filter((post) => `${post.title} ${post.description ?? ""}`.toLowerCase().includes(search.toLowerCase()));
  return <>
    {STYLESHEETS.map((href) => <link key={href} rel="stylesheet" href={href} />)}
    <style>{`.FooterCTA-module__3cCD7a__labelText { line-height: inherit; }`}</style>
    <main className="Wiki-module__LA0TFa__pageWrapper" style={{ lineHeight: "normal" }}>
      <section className="Wiki-module__LA0TFa__hero" style={{ paddingBottom: 0 }}><div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, width: "100%" }}><nav className="Wiki-module__LA0TFa__breadcrumbNav" aria-label="Breadcrumb"><Link className="Wiki-module__LA0TFa__breadcrumbLink" href="/">{tr("Home")}</Link><span className="Wiki-module__LA0TFa__breadcrumbSep">/</span><Link className="Wiki-module__LA0TFa__breadcrumbLink" href="/wiki">{tr("Wiki")}</Link><span className="Wiki-module__LA0TFa__breadcrumbSep">/</span><span className="Wiki-module__LA0TFa__breadcrumbCurrent">{tr("Work life")}</span></nav><h1 style={{ fontSize: 36, fontWeight: 600, color: "rgb(24, 62, 159)", margin: "16px 0 0", textAlign: "center" }}>{tr("Chủ đề: Work life")}</h1></div></section>
      <section className="Wiki-module__LA0TFa__mainSection"><div><div className="WikiContent-module__620pDG__section1"><div className="WikiContent-module__620pDG__highlightSide"><HighlightCard item={localizedTester} eager /></div><div className="WikiContent-module__620pDG__popularSide"><div className="WikiContent-module__620pDG__popularList">{localizedPopular.map((item) => <PopularCard key={item.slug} item={item} />)}</div></div></div><div className="WikiContent-module__620pDG__section2"><div className="WikiContent-module__620pDG__filterBar"><div className="WikiContent-module__620pDG__searchWrapper"><svg className="WikiContent-module__620pDG__searchIcon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg><input placeholder={tr("Tìm kiếm danh mục...")} className="WikiContent-module__620pDG__searchInput" type="text" value={search} onChange={(event) => setSearch(event.target.value)} /></div></div><div className="WikiContent-module__620pDG__divider" /><div className=""><div className="WikiContent-module__620pDG__postGrid">{visible.map((item) => <HighlightCard key={item.slug} item={item} />)}</div></div><div className="WikiContent-module__620pDG__pagination"><Link className="WikiContent-module__620pDG__pageNum WikiContent-module__620pDG__pageNumActive" href="/work-life?page=1&category=work-life">1</Link><Link className="WikiContent-module__620pDG__pageNum " href="/work-life?page=2&category=work-life">2</Link><Link className="WikiContent-module__620pDG__pageNum " href="/work-life?page=3&category=work-life">3</Link><span className="WikiContent-module__620pDG__pageDots">...</span><Link className="WikiContent-module__620pDG__pageNum " href="/work-life?page=13&category=work-life">13</Link><Link className="WikiContent-module__620pDG__nextBtn" href="/work-life?page=2&category=work-life">{tr("NEXT")}<svg width="14" height="10" viewBox="0 0 14 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 1L13 5L9 9" /><line x1="1" y1="5" x2="13" y2="5" /></svg></Link></div></div></div></section>
    </main>
  </>;
}
