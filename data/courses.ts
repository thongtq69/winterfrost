export type Course = {
  slug: string;
  title: string;
  label: string;
  summary: string;
  modules: string[];
  outcomes: string[];
  imageSrc?: string;
};

export const courses: Course[] = [
  {
    slug: 'thiet-ke-website-wordpress-elementor',
    title: 'Thiết kế Website WordPress Elementor',
    label: 'KHÓA HỌC ONLINE',
    summary: 'Tự tay dựng website bán hàng với Elementor và tối ưu chuyển đổi.',
    imageSrc: '/videos/pexels-olia-danilevich-4974914.jpg',
    modules: ['Setup hosting, domain', 'Thiết kế landing với Elementor', 'Tối ưu tốc độ & bảo mật', 'Tracking & form automation'],
    outcomes: ['Sở hữu website hoàn chỉnh', 'Biết tối ưu tốc độ và SEO', 'Tự chỉnh sửa và nhân bản trang'],
  },
  {
    slug: 'wordpress-chuan-seo-2026',
    title: 'WordPress chuẩn SEO 2026',
    label: 'KHÓA HỌC ONLINE',
    summary: 'Triển khai WordPress chuẩn SEO, schema và content structure.',
    imageSrc: '/videos/pexels-kindelmedia-7688100.jpg',
    modules: ['Checklist technical SEO', 'Cấu trúc content & category', 'Schema cơ bản', 'Tối ưu hình ảnh & cache'],
    outcomes: ['Hiểu cách audit SEO', 'Tự tối ưu onpage', 'Thiết lập tracking & báo cáo'],
  },
  {
    slug: 'khoa-hoc-thiet-ke-website-wordpress',
    title: 'Kèm 1-1 Thiết kế Website WordPress',
    label: 'COACHING 1-1',
    summary: 'Coaching cá nhân, hoàn thiện website theo yêu cầu trong 4 tuần.',
    imageSrc: '/videos/pexels-dkomov-34803983.jpg',
    modules: ['Discovery 1-1', 'Wireframe & UI cơ bản', 'Build website thực tế', 'QA & bàn giao'],
    outcomes: ['Website hoàn thiện theo yêu cầu', 'Quy trình vận hành rõ ràng', 'Hỗ trợ sau khóa học'],
  },
];

export const getCourseBySlug = (slug: string) => courses.find((c) => c.slug === slug);
