export type Post = {
  slug: string[];
  title: string;
  date: string;
  excerpt: string;
};

export const posts: Post[] = [
  {
    slug: ['xu-huong-thiet-ke-website-2026'],
    title: 'Xu hướng thiết kế website 2026',
    date: '12/12/2025',
    excerpt: 'Những điểm nhấn về tốc độ, animation và cấu trúc SEO-first.',
  },
  {
    slug: ['checklist-seo-website-doanh-nghiep'],
    title: 'Checklist SEO cho website doanh nghiệp',
    date: '05/12/2025',
    excerpt: 'Tối ưu technical, schema và nội dung để tăng thứ hạng.',
  },
  {
    slug: ['cai-thien-conversion-landing-page'],
    title: 'Cải thiện conversion cho landing page',
    date: '28/11/2025',
    excerpt: '5 điểm cần kiểm tra trước khi chạy quảng cáo.',
  },
  {
    slug: ['huong-dan-tracking-ga4-cho-website'],
    title: 'Hướng dẫn tracking GA4 cho website',
    date: '20/11/2025',
    excerpt: 'Thiết lập sự kiện, đo lường form và e-commerce.',
  },
  {
    slug: ['toi-uu-toc-do-website'],
    title: 'Tối ưu tốc độ website',
    date: '12/11/2025',
    excerpt: 'Core Web Vitals và các thủ thuật thực thi nhanh.',
  },
  {
    slug: ['kien-tao-thuong-hieu-tren-website'],
    title: 'Kiến tạo thương hiệu trên website',
    date: '02/11/2025',
    excerpt: 'Cách thể hiện brand voice và hình ảnh nhất quán.',
  },
  {
    slug: ['huong-dan-chon-hosting'],
    title: 'Hướng dẫn chọn hosting phù hợp',
    date: '26/10/2025',
    excerpt: 'So sánh thông số và checklist bảo mật cơ bản.',
  },
  {
    slug: ['thiet-ke-landing-page-cho-quang-cao'],
    title: 'Thiết kế landing page cho quảng cáo',
    date: '18/10/2025',
    excerpt: 'Flow nội dung, CTA và tối ưu form lead.',
  },
  {
    slug: ['xu-ly-luu-tru-noi-dung'],
    title: 'Xử lý lưu trữ nội dung',
    date: '12/10/2025',
    excerpt: 'Cách tổ chức media và backup website.',
  },
  {
    slug: ['viet-bai-chuan-seo'],
    title: 'Viết bài chuẩn SEO',
    date: '02/10/2025',
    excerpt: 'Cấu trúc bài viết và tối ưu onpage cho content team.',
  },
];

export const getPostBySlug = (slugParts: string[]) =>
  posts.find((post) => JSON.stringify(post.slug) === JSON.stringify(slugParts));
