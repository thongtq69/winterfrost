import type { Metadata, Viewport } from 'next';
import { siteConfig } from '../config/site.config';

const SITE_URL = `https://${siteConfig.brand.domain}`;
const DEFAULT_OG_IMAGE = siteConfig.assets.ogImagePath ?? '/og-image-home.png';
const titleTemplate = `%s | ${siteConfig.brand.name}`;
const HOME_OG_IMAGE = '/og-image-home.png';
const DEFAULT_KEYWORDS = ['thiết kế website', 'thiết kế web', 'website chuẩn seo', 'tphcm', 'winterfrost'];
const THEME_COLOR = '#0c1626';

const baseRobots: Metadata['robots'] = {
  index: true,
  follow: true,
  googleBot: { index: true, follow: true },
};

const absoluteUrl = (path: string) => new URL(path, SITE_URL).toString();
const pageTitle = (title: string) => ({ default: title, template: titleTemplate });
const ogImageUrl = (path?: string) => absoluteUrl(path ?? DEFAULT_OG_IMAGE);

export const baseMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: siteConfig.brand.name,
  title: pageTitle('Thiết Kế Website Chuẩn SEO & Tối Ưu Chuyển Đổi | WinterFrost TP.HCM'),
  description: siteConfig.brand.description,
  keywords: DEFAULT_KEYWORDS,
  alternates: { canonical: SITE_URL },
  robots: baseRobots,
  openGraph: {
    title: 'Thiết Kế Website Chuẩn SEO & Tối Ưu Chuyển Đổi | WinterFrost TP.HCM',
    description: siteConfig.brand.description,
    url: SITE_URL,
    siteName: siteConfig.brand.name,
    locale: 'vi_VN',
    type: 'website',
    images: [{ url: ogImageUrl(DEFAULT_OG_IMAGE) }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Thiết Kế Website Chuẩn SEO & Tối Ưu Chuyển Đổi | WinterFrost TP.HCM',
    description: siteConfig.brand.description,
    site: '@winterfrost',
    creator: '@winterfrost',
    images: [ogImageUrl(DEFAULT_OG_IMAGE)],
  },
  category: 'technology',
  manifest: '/manifest.json',
  icons: {
    icon: siteConfig.assets.markPath ?? siteConfig.assets.faviconPath ?? '/brand/mark.png',
    apple: siteConfig.assets.markPath ?? '/brand/mark.png',
  },
  other: {
    'format-detection': 'telephone=no',
  },
  verification: {
    other: {
      phone: siteConfig.contact.phoneTel,
    },
  },
};

export const baseViewport: Viewport = {
  themeColor: THEME_COLOR,
  width: 'device-width',
  initialScale: 1,
};

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  ogImage?: string;
  robots?: Metadata['robots'];
};

export const buildPageMetadata = (input: PageMetaInput): Metadata => ({
  ...baseMetadata,
  title: pageTitle(input.title),
  description: input.description,
  keywords: input.keywords ?? DEFAULT_KEYWORDS,
  alternates: { canonical: absoluteUrl(input.path) },
  robots: input.robots ?? baseRobots,
  openGraph: {
    ...(baseMetadata.openGraph ?? {}),
    title: input.title,
    description: input.description,
    url: absoluteUrl(input.path),
    images: [{ url: ogImageUrl(input.ogImage) }],
  },
  twitter: {
    ...(baseMetadata.twitter ?? {}),
    title: input.title,
    description: input.description,
    images: [ogImageUrl(input.ogImage)],
  },
});

export const homePageMetadata = buildPageMetadata({
  title: 'Thiết Kế Website Chuẩn SEO & Tối Ưu Chuyển Đổi | WinterFrost TP.HCM',
  description:
    'WinterFrost chuyên thiết kế website chuẩn SEO, tối ưu chuyển đổi cho doanh nghiệp tại TP.HCM. ✓ 86+ dự án thành công ✓ 10+ năm kinh nghiệm ✓ Tư vấn 1-1 miễn phí. Liên hệ: 0971450454',
  keywords: ['thiết kế website', 'thiết kế web', 'website chuẩn seo', 'tphcm'],
  path: '/',
  ogImage: HOME_OG_IMAGE,
});

const serviceMetaMap: Record<string, PageMetaInput> = {
  'thiet-ke-website-ban-hang': {
    title: 'Thiết Kế Website Bán Hàng Online Chuẩn SEO | Tích Hợp Thanh Toán | WinterFrost',
    description:
      'Thiết kế website bán hàng online chuyên nghiệp, chuẩn UX/UI, tối ưu chuyển đổi. Tích hợp cổng thanh toán, bảo mật cao, tốc độ nhanh. Tư vấn miễn phí: 0971450454',
    path: '/dich-vu/thiet-ke-website-ban-hang',
  },
  'thiet-ke-website-doanh-nghiep': {
    title: 'Thiết Kế Website Doanh Nghiệp Chuyên Nghiệp | Chuẩn SEO Technical | WinterFrost',
    description:
      'Thiết kế website doanh nghiệp uy tín, chuẩn SEO technical, dễ quản lý và mở rộng. Thể hiện thương hiệu chuyên nghiệp, tăng độ tin cậy. Báo giá: 0971450454',
    path: '/dich-vu/thiet-ke-website-doanh-nghiep',
  },
  'thiet-ke-landing-page-chuyen-nghiep': {
    title: 'Thiết Kế Landing Page Tối Ưu Chuyển Đổi | CRO Chuyên Nghiệp | WinterFrost',
    description:
      'Thiết kế landing page tối ưu chuyển đổi cho chiến dịch quảng cáo. Storytelling theo hành trình khách hàng, form lead automation. ROI cao. Liên hệ: 0971450454',
    path: '/dich-vu/thiet-ke-landing-page-chuyen-nghiep',
  },
  'thiet-ke-website-theo-yeu-cau': {
    title: 'Thiết Kế Website Theo Yêu Cầu | Phát Triển Tính Năng Riêng | WinterFrost',
    description:
      'Thiết kế website theo yêu cầu, tính năng custom, tích hợp hệ thống và tối ưu hiệu suất cho doanh nghiệp.',
    path: '/dich-vu/thiet-ke-website-theo-yeu-cau',
  },
};

export const getServicePageMetadata = (slug: string): Metadata => {
  const meta = serviceMetaMap[slug];
  if (meta) return buildPageMetadata(meta);
  return buildPageMetadata({
    title: 'Dịch vụ thiết kế website',
    description: 'Thiết kế website theo yêu cầu với UI/UX tối ưu chuyển đổi và chuẩn SEO kỹ thuật.',
    path: `/dich-vu/${slug}`,
  });
};

export const projectsPageMetadata = buildPageMetadata({
  title: 'Dự Án Website Đã Thực Hiện | Portfolio WinterFrost | 86+ Dự Án Thành Công',
  description:
    'Khám phá 86+ dự án website thành công của WinterFrost. Case studies chi tiết với metrics thực tế. Website bán hàng, landing page, doanh nghiệp.',
  path: '/du-an',
});

export const contactPageMetadata = buildPageMetadata({
  title: 'Liên Hệ Tư Vấn Thiết Kế Website | Hotline 0971450454 | WinterFrost TP.HCM',
  description:
    'Liên hệ WinterFrost để được tư vấn thiết kế website miễn phí. Hotline: 0971450454, Email: quocthong0801@gmail.com. Văn phòng tại Vinhomes Grand Park, Quận 9, TP.HCM.',
  path: '/lien-he',
});

export const servicesPageMetadata = buildPageMetadata({
  title: 'Dịch Vụ Thiết Kế Website Chuẩn SEO | Bán Hàng, Doanh Nghiệp, Landing Page',
  description: '4 gói dịch vụ thiết kế website: bán hàng, doanh nghiệp, landing page, theo yêu cầu. Tối ưu tốc độ, chuẩn SEO, sẵn sàng mở rộng.',
  path: '/dich-vu',
});

export const getProjectDetailMetadata = ({
  title,
  description,
  slug,
  cover,
}: {
  title: string;
  description: string;
  slug: string;
  cover?: string | null;
}) =>
  buildPageMetadata({
    title,
    description,
    path: `/du-an/${slug}`,
    ogImage: cover ?? DEFAULT_OG_IMAGE,
  });

// Backward compatible helper
export const buildBaseMetadata = (): Metadata => baseMetadata;
