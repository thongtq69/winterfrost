import type { Metadata } from "next";
import { AboutPageHero } from "@/components/sections/AboutPageHero";
import { WhoWeAre } from "@/components/sections/WhoWeAre";
import { BuildingScalable } from "@/components/sections/BuildingScalable";
import { AboutCounters } from "@/components/sections/AboutCounters";
import { ServicesTabs } from "@/components/sections/ServicesTabs";
import { IndustriesGrid } from "@/components/sections/IndustriesGrid";
import { CTABanner } from "@/components/sections/CTABanner";
import { PricingSection } from "@/components/sections/PricingSection";
import { PartnersMarquee } from "@/components/sections/PartnersMarquee";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { WorkLifeArticles } from "@/components/sections/WorkLifeArticles";
import { aboutPage } from "@/lib/site";
import { getAutoText } from "@/i18n/auto-text-server";
import { localizeValue } from "@/i18n/auto-text";
import { isSupportedLocale, routing } from "@/i18n/routing";

const ABOUT_FAQ: { q: string; a: string }[] = [
  {
    q: "Tầm nhìn và định vị thương hiệu của SoftBuild là gì?",
    a: "SoftBuild định vị là đối tác công nghệ chiến lược. Tầm nhìn của chúng tôi là kiến tạo các giải pháp số đột phá, kết hợp hoàn hảo giữa công nghệ lõi (Core Tech) và trải nghiệm người dùng (UX) để giúp doanh nghiệp tự tin dẫn đầu kỷ nguyên số.",
  },
  {
    q: "Bề dày kinh nghiệm và quy mô hoạt động của SoftBuild ra sao?",
    a: "Chúng tôi tự hào sở hữu đội ngũ chuyên gia với hơn 10 năm kinh nghiệm thực chiến. Tính đến nay, SoftBuild đã triển khai thành công các dự án công nghệ tại hơn 15 quốc gia trên toàn cầu, bao gồm các thị trường khó tính như Bắc Mỹ, Châu Âu và Châu Úc.",
  },
  {
    q: "Đối tượng khách hàng chủ yếu của SoftBuild là những ai?",
    a: "Chúng tôi đồng hành cùng đa dạng quy mô doanh nghiệp: từ các Startup cần xây dựng sản phẩm MVP nhanh chóng để gọi vốn, đến các doanh nghiệp vừa và nhỏ muốn chuyển đổi số, và cả những Tập đoàn lớn cần các hệ thống Custom App, SaaS phức tạp.",
  },
  {
    q: "SoftBuild chuyên cung cấp dịch vụ gia công hay tư vấn giải pháp?",
    a: "Chúng tôi không chỉ là đơn vị gia công phần mềm đơn thuần. SoftBuild đóng vai trò là nhà tư vấn giải pháp toàn diện: từ khâu phân tích bài toán kinh doanh, hoạch định kiến trúc hệ thống, cho đến thiết kế UI/UX và phát triển sản phẩm cuối cùng.",
  },
  {
    q: "Năng lực của đội ngũ nhân sự tại SoftBuild như thế nào?",
    a: "Đội ngũ của chúng tôi là sự kết hợp giữa các Kỹ sư phần mềm giàu kinh nghiệm, Chuyên gia phân tích dữ liệu và các Nhà thiết kế UX/UI sáng tạo. Tất cả đều am hiểu sâu sắc về công nghệ hiện đại và luôn lấy hiệu quả kinh doanh của khách hàng làm trung tâm.",
  },
  {
    q: "SoftBuild có ứng dụng các công nghệ tiên tiến không?",
    a: "Chắc chắn. Bên cạnh Web và App, SoftBuild sở hữu năng lực chuyên sâu trong việc tích hợp Trí tuệ nhân tạo, phát triển nền tảng Blockchain bảo mật và kết nối vạn vật, giúp tự động hóa và khai phá tối đa tiềm năng dữ liệu của doanh nghiệp.",
  },
  {
    q: "Những con số minh chứng cho chất lượng dịch vụ của SoftBuild?",
    a: "Chất lượng dịch vụ của SoftBuild được bảo chứng bằng sự tin tưởng của hơn 250+ đối tác toàn cầu. Đặc biệt, chúng tôi luôn duy trì tỷ lệ hài lòng của khách hàng ở mức 98% – thước đo chính xác nhất cho sự tận tâm và hiệu quả dự án.",
  },
  {
    q: "Tôi ở nước ngoài thì việc hợp tác với SoftBuild sẽ diễn ra như thế nào?",
    a: "Khoảng cách địa lý không phải là rào cản. Với kinh nghiệm làm việc với khách hàng tại 15+ quốc gia, chúng tôi áp dụng quy trình làm việc Agile/Scrum linh hoạt, báo cáo tiến độ minh bạch qua các nền tảng trực tuyến, đảm bảo dự án luôn đi đúng hướng dù bạn ở bất kỳ đâu.",
  },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: candidate } = await params;
  const locale = isSupportedLocale(candidate) ? candidate : routing.defaultLocale;
  const tr = await getAutoText(locale);
  return {
    title: tr(aboutPage.title),
    description: tr(aboutPage.metaDescription ?? ""),
  };
}

export default async function VeChungToiPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: candidate } = await params;
  const locale = isSupportedLocale(candidate) ? candidate : routing.defaultLocale;
  const tr = await getAutoText(locale);
  const faq = localizeValue(ABOUT_FAQ, tr);
  return (
    <>
      <AboutPageHero />
      <WhoWeAre />
      <BuildingScalable />
      <AboutCounters />
      <ServicesTabs />
      <IndustriesGrid />
      <CTABanner
        label={tr("Liên hệ ngay!")}
        headline={tr("Hãy trở thành đối tác cùng SoftBuild")}
        description={tr("Chúng tôi không chỉ cung cấp giải pháp kỹ thuật mà còn luôn đồng hành cùng sự phát triển lâu dài của doanh nghiệp. Hãy liên hệ để cùng nhau xây dựng những nền tảng công nghệ hiệu quả.")}
        ctaLabel={tr("Gửi yêu cầu tư vấn")}
        ctaHref="/lien-he"
      />
      <PricingSection />
      <PartnersMarquee />
      <ProcessTimeline />
      <FAQAccordion
        label={tr("Các câu hỏi thường gặp")}
        headline={[tr("Giải Đáp"), tr("Mọi"), tr("Thắc Mắc")]}
        items={faq}
      />
      <WorkLifeArticles />
    </>
  );
}
