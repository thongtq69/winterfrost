export type Service = {
  id: string;
  title: string;
  description: string;
  bullets: string[];
  href: string;
};

export const services: Service[] = [
  {
    id: '01',
    title: 'Thiết kế website bán hàng',
    description: 'Chuẩn UX, tối ưu chuyển đổi và tích hợp thanh toán nhanh.',
    bullets: ['Cấu trúc landing bán hàng', 'Tích hợp cổng thanh toán', 'Tối ưu tốc độ & bảo mật'],
    href: '/dich-vu/thiet-ke-website-ban-hang',
  },
  {
    id: '02',
    title: 'Thiết kế website doanh nghiệp',
    description: 'Thể hiện uy tín thương hiệu, chuẩn SEO và dễ mở rộng.',
    bullets: ['Thiết kế nhận diện đồng bộ', 'Chuẩn SEO technical', 'Trang giới thiệu dịch vụ rõ ràng'],
    href: '/dich-vu/thiet-ke-website-doanh-nghiep',
  },
  {
    id: '03',
    title: 'Thiết kế Landing Page chuyên nghiệp',
    description: 'Trang đích tối ưu chuyển đổi cho chiến dịch quảng cáo.',
    bullets: ['Storytelling theo hành trình', 'CTA rõ ràng', 'Form lead & automation'],
    href: '/dich-vu/thiet-ke-landing-page-chuyen-nghiep',
  },
  {
    id: '04',
    title: 'Thiết kế website theo yêu cầu',
    description: 'Thiết kế và phát triển tính năng riêng, tích hợp hệ thống.',
    bullets: ['Phát triển tính năng custom', 'Thiết kế độc quyền', 'Quy trình bàn giao - đào tạo'],
    href: '/dich-vu/thiet-ke-website-theo-yeu-cau',
  },
];

export type ServiceDetail = {
  slug: string;
  title: string;
  intro: string;
  heroBullets: string[];
  packages: {
    name: string;
    priceNote: string;
    items: string[];
  }[];
  features: {
    title: string;
    description: string;
  }[];
  projectsPreview: {
    title: string;
    description: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
};

export const serviceDetails: ServiceDetail[] = [
  {
    slug: 'thiet-ke-website-ban-hang',
    title: 'Thiết kế website bán hàng',
    intro: 'Website bán hàng tối ưu chuyển đổi, tích hợp thanh toán và tracking chiến dịch.',
    heroBullets: [
      'Xây dựng phễu mua hàng rõ ràng',
      'Tích hợp thanh toán online & COD',
      'Chuẩn SEO + tốc độ tối ưu',
      'Kết nối CRM/Automation',
      'Hệ thống báo cáo và tracking',
    ],
    packages: [
      {
        name: 'Theo mẫu có sẵn',
        priceNote: 'Tối ưu theo brand, triển khai nhanh trong 10 ngày.',
        items: ['Chọn mẫu gần nhu cầu', 'Tùy biến màu sắc/typography', 'Tích hợp thanh toán cơ bản', 'Handover hướng dẫn quản trị'],
      },
      {
        name: 'Thiết kế độc quyền',
        priceNote: 'UI/UX riêng theo hành trình khách hàng của bạn.',
        items: ['Nghiên cứu khách hàng', 'Wireframe & UI hệ thống', 'Hiệu ứng & animation tinh gọn', 'QA đa thiết bị, bàn giao tracking'],
      },
    ],
    features: [
      { title: 'Website chuẩn SEO', description: 'Cấu trúc heading, schema và tối ưu tốc độ Core Web Vitals.' },
      { title: 'Giao diện độc quyền', description: 'Thiết kế theo brand guideline, giữ trải nghiệm nhất quán.' },
      { title: 'Web chuẩn Responsive', description: 'Kiểm thử trên mobile, tablet, desktop với layout riêng.' },
      { title: 'Code thêm tính năng', description: 'Phát triển tính năng mua hàng, voucher, upsell nếu cần.' },
      { title: 'Gói Domain, Hosting', description: 'Tư vấn hạ tầng, bảo mật SSL, backup và tối ưu tải trang.' },
      { title: 'SEO lên TOP', description: 'Kế hoạch nội dung, onpage, và checklist kỹ thuật sau bàn giao.' },
    ],
    projectsPreview: [
      { title: 'Ecom Launch', description: 'Tăng 30% CR nhờ tối ưu flow thanh toán.' },
      { title: 'Beauty Shop', description: 'Thiết kế landing và upsell combo dưỡng da.' },
    ],
    faqs: [
      { question: 'Thời gian triển khai bao lâu?', answer: 'Từ 2-4 tuần tùy độ phức tạp và số lượng trang.' },
      { question: 'Có hỗ trợ nhập sản phẩm không?', answer: 'Có, chúng tôi hỗ trợ nhập data mẫu và hướng dẫn quy trình.' },
      { question: 'Sau bàn giao có bảo hành?', answer: 'Bảo hành 60 ngày và hỗ trợ nâng cấp theo nhu cầu.' },
    ],
  },
  {
    slug: 'thiet-ke-website-doanh-nghiep',
    title: 'Thiết kế website doanh nghiệp',
    intro: 'Website thể hiện uy tín thương hiệu, chuẩn SEO, dễ dàng cập nhật.',
    heroBullets: [
      'Tối ưu brand voice & hình ảnh',
      'Cấu trúc dịch vụ/giải pháp rõ ràng',
      'Chuẩn SEO kỹ thuật',
      'Trang tuyển dụng, blog, tài nguyên',
      'Hệ thống form lead và CRM',
    ],
    packages: [
      {
        name: 'Theo mẫu có sẵn',
        priceNote: 'Phù hợp SME, triển khai nhanh, tối ưu chi phí.',
        items: ['Chọn mẫu doanh nghiệp', 'Chỉnh sửa brand assets', 'Setup blog/tuyển dụng', 'Handover quản trị'],
      },
      {
        name: 'Thiết kế độc quyền',
        priceNote: 'UI/UX riêng cho brand, nhấn mạnh giá trị và case study.',
        items: ['Discovery workshop', 'UI kit & design system nhỏ', 'Page chuyển đổi cao', 'QA và hướng dẫn content team'],
      },
    ],
    features: [
      { title: 'Website chuẩn SEO', description: 'Chuẩn cấu trúc URL, sitemap, schema và tốc độ tải.' },
      { title: 'Giao diện độc quyền', description: 'Phong cách riêng phù hợp ngành nghề và brand guideline.' },
      { title: 'Web chuẩn Responsive', description: 'Tối ưu mobile-first, ưu tiên CTA và thông tin quan trọng.' },
      { title: 'Code thêm tính năng', description: 'Tùy chỉnh trang dịch vụ, biểu mẫu nhiều bước, integration.' },
      { title: 'Gói Domain, Hosting', description: 'Đề xuất hạ tầng, CDN, backup định kỳ.' },
      { title: 'SEO lên TOP', description: 'Checklist onpage + kế hoạch nội dung dài hạn.' },
    ],
    projectsPreview: [
      { title: 'Consulting Firm', description: 'Website mới giúp tăng lead B2B 28%.' },
      { title: 'Tech Startup', description: 'Landing giới thiệu sản phẩm, tối ưu tốc độ.' },
    ],
    faqs: [
      { question: 'Có hỗ trợ viết nội dung?', answer: 'Có thể hỗ trợ outline, copy mẫu và training đội content.' },
      { question: 'Có tích hợp CRM?', answer: 'Tích hợp phổ biến như HubSpot, GetResponse, Mailchimp, v.v.' },
    ],
  },
  {
    slug: 'thiet-ke-landing-page-chuyen-nghiep',
    title: 'Thiết kế Landing Page chuyên nghiệp',
    intro: 'Landing Page tập trung mục tiêu chuyển đổi cho chiến dịch quảng cáo.',
    heroBullets: [
      'Storytelling theo pain-point',
      'A/B test section & CTA',
      'Tối ưu form lead',
      'Tích hợp pixel & tracking',
      'Xuất bản nhanh trong 5 ngày',
    ],
    packages: [
      {
        name: 'Theo mẫu có sẵn',
        priceNote: 'Chỉnh sửa nhanh, phù hợp test chiến dịch.',
        items: ['Chọn layout chuẩn', 'Điều chỉnh copy', 'Gắn pixel & event', 'Handover tự chỉnh sửa'],
      },
      {
        name: 'Thiết kế độc quyền',
        priceNote: 'Landing độc quyền, hiệu ứng vừa đủ và tối ưu CR.',
        items: ['Research nhanh', 'Wireframe & UI độc quyền', 'Component tái sử dụng', 'QA đa thiết bị'],
      },
    ],
    features: [
      { title: 'Website chuẩn SEO', description: 'Landing vẫn chuẩn meta và tốc độ tải tối ưu.' },
      { title: 'Giao diện độc quyền', description: 'Thiết kế đúng insight khách hàng mục tiêu.' },
      { title: 'Web chuẩn Responsive', description: 'Ưu tiên mobile-first và CTA sticky.' },
      { title: 'Code thêm tính năng', description: 'Form nhiều bước, countdown, upsell nhẹ.' },
      { title: 'Gói Domain, Hosting', description: 'Tối ưu hosting cho traffic lớn, CDN.' },
      { title: 'SEO lên TOP', description: 'Hỗ trợ triển khai landing dài hơi cho SEO nếu cần.' },
    ],
    projectsPreview: [
      { title: 'Event Landing', description: 'Tăng 2.1x số đăng ký workshop.' },
      { title: 'SaaS Launch', description: 'Thu 1.200 lead trong 1 tháng.' },
    ],
    faqs: [
      { question: 'Có hỗ trợ viết quảng cáo?', answer: 'Cung cấp cấu trúc copy, bạn có thể chỉnh sửa theo kênh.' },
      { question: 'Thời gian triển khai?', answer: 'Từ 5-10 ngày tùy độ phức tạp.' },
    ],
  },
  {
    slug: 'thiet-ke-website-theo-yeu-cau',
    title: 'Thiết kế website theo yêu cầu',
    intro: 'Phát triển website custom và tính năng riêng cho mô hình đặc thù.',
    heroBullets: [
      'Phân tích yêu cầu nghiệp vụ',
      'Thiết kế UI/UX riêng',
      'Tính năng custom & integration',
      'Kế hoạch triển khai & đào tạo',
      'Bảo trì & tối ưu lâu dài',
    ],
    packages: [
      {
        name: 'Theo mẫu nâng cao',
        priceNote: 'Cá nhân hóa dựa trên bộ template nâng cao.',
        items: ['Chọn template nâng cao', 'Tùy biến module', 'Kết nối API sẵn có', 'Handover & hướng dẫn'],
      },
      {
        name: 'Thiết kế độc quyền',
        priceNote: 'Kiến trúc & phát triển theo yêu cầu riêng.',
        items: ['Workshop yêu cầu chi tiết', 'Thiết kế kiến trúc thông tin', 'Phát triển tính năng custom', 'QA và đào tạo vận hành'],
      },
    ],
    features: [
      { title: 'Website chuẩn SEO', description: 'Kiến trúc thông tin và technical SEO đầy đủ.' },
      { title: 'Giao diện độc quyền', description: 'Thiết kế UI/UX theo hành trình người dùng của bạn.' },
      { title: 'Web chuẩn Responsive', description: 'Đảm bảo trải nghiệm trên mọi thiết bị.' },
      { title: 'Code thêm tính năng', description: 'Lập trình theo nghiệp vụ: booking, membership, dashboard...' },
      { title: 'Gói Domain, Hosting', description: 'Tư vấn hạ tầng phù hợp, bảo mật và backup.' },
      { title: 'SEO lên TOP', description: 'Checklist kỹ thuật và hướng dẫn triển khai SEO.' },
    ],
    projectsPreview: [
      { title: 'Booking Travel', description: 'Tối ưu quy trình đặt tour nhiều bước.' },
      { title: 'Healthcare Portal', description: 'Bổ sung module hồ sơ và đặt lịch.' },
    ],
    faqs: [
      { question: 'Có làm đa ngôn ngữ?', answer: 'Có, hỗ trợ i18n và quản trị nội dung đa ngôn ngữ.' },
      { question: 'Có hỗ trợ bảo trì?', answer: 'Có gói bảo trì và tối ưu định kỳ sau khi bàn giao.' },
    ],
  },
];

export const getServiceDetail = (slug: string) => serviceDetails.find((s) => s.slug === slug);
