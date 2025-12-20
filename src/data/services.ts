export type PricingPlan = {
  name: string;
  price: string;
  description?: string;
  features: string[];
  popular?: boolean;
};

export type ServiceFeature = {
  title: string;
  description: string;
  icon?: string;
};

export type ServiceProject = {
  title: string;
  description: string;
  year: string;
  href: string;
};

export type ServiceFAQ = {
  question: string;
  answer: string;
};

export type ServiceDetail = {
  slug: string;
  title: string;
  subtitle: string;
  bullets: string[];
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  pricingPlans: PricingPlan[];
  features: ServiceFeature[];
  projects: ServiceProject[];
  faqs: ServiceFAQ[];
};

export const services: ServiceDetail[] = [
  {
    slug: 'thiet-ke-website-doanh-nghiep',
    title: 'Thiết kế website doanh nghiệp chuẩn nhận diện & tối ưu chuyển đổi',
    subtitle:
      'Website doanh nghiệp được xây dựng theo hành trình khách hàng, tối ưu tốc độ, bảo mật và SEO để hỗ trợ tăng trưởng bền vững.',
    bullets: [
      'Tư vấn cấu trúc nội dung bám sát hành trình khách hàng',
      'Thiết kế UI theo nhận diện thương hiệu, hiện đại và rõ ràng',
      'Chuẩn SEO onpage, tốc độ tải nhanh, tối ưu thiết bị di động',
      'Tích hợp biểu mẫu, CRM hoặc automation theo nhu cầu',
      'Bảo mật, backup định kỳ và hướng dẫn quản trị',
      'Đo lường hành vi, thiết lập tracking sự kiện quan trọng',
    ],
    primaryCta: { label: 'Nhận tư vấn', href: '/lien-he' },
    secondaryCta: { label: 'Xem bảng giá', href: '#pricing' },
    pricingPlans: [
      {
        name: 'Gói theo mẫu chuẩn',
        price: '9.900.000đ',
        description: 'Triển khai nhanh với layout chuẩn chuyển đổi, tùy chỉnh màu sắc & nội dung.',
        features: [
          '03-05 trang nội dung cơ bản',
          'Tùy chỉnh nhận diện: màu sắc, font',
          'Chuẩn SEO onpage, tốc độ tối ưu',
          'Tích hợp form liên hệ, chat',
          'Bàn giao và hướng dẫn quản trị',
        ],
      },
      {
        name: 'Thiết kế độc quyền',
        price: '16.900.000đ',
        popular: true,
        description: 'Thiết kế UI/UX theo yêu cầu riêng, tối ưu hành trình khách hàng và chuyển đổi.',
        features: [
          'UI/UX độc quyền theo brand guideline',
          '06-10 trang nội dung, section tùy biến',
          'Tối ưu chuyển đổi với CTA & A/B gợi ý',
          'Tích hợp CRM/Automation nếu cần',
          'Bảo hành & hỗ trợ 60 ngày sau bàn giao',
        ],
      },
    ],
    features: [
      {
        title: 'Chuẩn SEO & tốc độ',
        description: 'Cấu trúc nội dung rõ ràng, tối ưu onpage, điểm tốc độ cao trên mobile & desktop.',
      },
      {
        title: 'Responsive đa thiết bị',
        description: 'Hiển thị đẹp trên mobile, tablet, desktop; giữ trải nghiệm nhất quán.',
      },
      {
        title: 'Bảo mật & ổn định',
        description: 'Cấu hình bảo mật, backup định kỳ, kiểm thử trước khi bàn giao.',
      },
      {
        title: 'Dễ quản trị nội dung',
        description: 'Trang quản trị đơn giản, hướng dẫn chi tiết, dễ chỉnh sửa và thêm mới.',
      },
      {
        title: 'Theo dõi hành vi người dùng',
        description: 'Thiết lập tracking sự kiện, heatmap/analytics để ra quyết định tối ưu.',
      },
      {
        title: 'Tùy chỉnh tính năng',
        description: 'Mở rộng tính năng theo nhu cầu: blog, landing, form nhiều bước, tích hợp CRM.',
      },
    ],
    projects: [
      {
        title: 'Doanh nghiệp dịch vụ A',
        description: 'Website giới thiệu dịch vụ, tối ưu form liên hệ và lịch hẹn.',
        year: '2025',
        href: '/du-an',
      },
      {
        title: 'Công ty công nghệ B',
        description: 'Trang sản phẩm & tài liệu kỹ thuật, tập trung SEO và tốc độ.',
        year: '2024',
        href: '/du-an',
      },
      {
        title: 'Tập đoàn tư vấn C',
        description: 'Giải pháp website đa trang, dẫn dắt CTA theo hành trình khách hàng.',
        year: '2024',
        href: '/du-an',
      },
      {
        title: 'Doanh nghiệp giáo dục D',
        description: 'Trang chương trình đào tạo, form đăng ký và automation email.',
        year: '2023',
        href: '/du-an',
      },
      {
        title: 'Doanh nghiệp bất động sản E',
        description: 'Landing giới thiệu dự án, gallery, CTA tư vấn nhanh.',
        year: '2025',
        href: '/du-an',
      },
      {
        title: 'Công ty sản xuất F',
        description: 'Website sản phẩm, danh mục và tài liệu kỹ thuật, chuẩn SEO.',
        year: '2023',
        href: '/du-an',
      },
    ],
    faqs: [
      {
        question: 'Thời gian triển khai bao lâu?',
        answer: 'Tùy phạm vi, thường 2-4 tuần với gói theo mẫu, 4-6 tuần cho thiết kế độc quyền.',
      },
      {
        question: 'Bạn hỗ trợ nội dung/ảnh không?',
        answer: 'Chúng tôi hỗ trợ dàn layout, hướng dẫn nhập nội dung và cung cấp checklist SEO.',
      },
      {
        question: 'Có bảo hành sau bàn giao?',
        answer: 'Có, hỗ trợ lỗi phát sinh và tối ưu nhỏ trong 60 ngày sau bàn giao.',
      },
      {
        question: 'Có tích hợp CRM/Marketing automation?',
        answer: 'Có, tích hợp form, webhook hoặc các nền tảng CRM/Email theo nhu cầu.',
      },
      {
        question: 'Website có chuẩn SEO không?',
        answer: 'Chúng tôi thiết lập cấu trúc, thẻ meta, tốc độ và schema cơ bản theo best-practice.',
      },
      {
        question: 'Bạn có hỗ trợ hosting/domain?',
        answer: 'Có thể tư vấn chọn gói hosting/domain và hỗ trợ cấu hình ban đầu nếu cần.',
      },
    ],
  },
];

export const getServiceBySlug = (slug: string) => services.find((s) => s.slug === slug);
