import { knowledgeTracks, type KnowledgeTrackStatus } from './knowledgeTracks';

export type DropdownItem = {
  label: string;
  href: string;
  description?: string;
  status?: KnowledgeTrackStatus;
};

export type NavItem = {
  label: string;
  href: string;
  dropdown?: DropdownItem[];
};

export const navItems: NavItem[] = [
  {
    label: 'Khóa Học',
    href: '/khoa-hoc/thiet-ke-website-wordpress-elementor',
    dropdown: [
      {
        label: 'Thiết kế Website WordPress Elementor',
        href: '/khoa-hoc/thiet-ke-website-wordpress-elementor',
        description: 'Khóa học online, tự triển khai website bán hàng.',
      },
      {
        label: 'WordPress chuẩn SEO 2026',
        href: '/khoa-hoc/wordpress-chuan-seo-2026',
        description: 'Tối ưu SEO onpage + kỹ thuật vận hành.',
      },
      {
        label: 'Kèm 1-1 WordPress',
        href: '/khoa-hoc/khoa-hoc-thiet-ke-website-wordpress',
        description: 'Huấn luyện riêng, hoàn thiện website trong 4 tuần.',
      },
    ],
  },
  {
    label: 'Dịch vụ',
    href: '/dich-vu',
    dropdown: [
      { label: 'Thiết kế website bán hàng', href: '/dich-vu/thiet-ke-website-ban-hang' },
      { label: 'Thiết kế website doanh nghiệp', href: '/dich-vu/thiet-ke-website-doanh-nghiep' },
      { label: 'Thiết kế landing page', href: '/dich-vu/thiet-ke-landing-page-chuyen-nghiep' },
      { label: 'Thiết kế website theo yêu cầu', href: '/dich-vu/thiet-ke-website-theo-yeu-cau' },
    ],
  },
  { label: 'Dự án', href: '/du-an' },
  {
    label: 'Kiến thức',
    href: '/kien-thuc',
    dropdown: knowledgeTracks.map((track) => ({
      label: track.label,
      href: track.href,
      description: track.navDescription,
      status: track.status,
    })),
  },
  { label: 'Liên hệ', href: '/lien-he' },
];
