import { projectCategories } from './projectCategories';
import { projectsRealUrls } from './projects.realurls';

export type Project = {
  slug: string;
  title: string;
  description: string;
  client: string;
  year: string;
  categories: string[];
  cover: null;
  externalUrl: string;
  detailUrl: string;
};

const assignableCats = projectCategories.filter((cat) => cat !== 'All');
const descriptions = [
  'Website giới thiệu thương hiệu và dịch vụ, tối ưu chuyển đổi liên hệ.',
  'Landing page chiến dịch với form đăng ký và thông tin nổi bật.',
  'Giải pháp website đa trang, chuẩn SEO và tốc độ tải.',
  'Trang giới thiệu sản phẩm/dịch vụ cùng thư viện nội dung.',
];

const slugToTitle = (slug: string) =>
  slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

export const projects: Project[] = projectsRealUrls.map((item, index) => {
  const secondCat = assignableCats[index % assignableCats.length];
  const title = item.title && item.title !== item.slug ? item.title : slugToTitle(item.slug);
  return {
    slug: item.slug,
    title,
    description: descriptions[index % descriptions.length],
    client: `Client ${index + 1}`,
    year: `${2022 + (index % 4)}`,
    categories: ['Bán hàng', secondCat],
    cover: null,
    externalUrl: item.realUrl ?? item.detailUrl,
    detailUrl: item.detailUrl,
  };
});

export const getProjectBySlug = (slug: string) => projects.find((p) => p.slug === slug);
