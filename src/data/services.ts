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
  cover?: string;
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
        title: 'Website chuẩn SEO',
        description:
          'Đảm bảo website thân thiện với Google, cấu trúc HTML chuẩn, cập nhật tiêu chí đánh giá mới giúp site đạt thứ hạng tốt ngay sau khi hoàn thành.',
        icon: 'https://xuanhieuit.com/wp-content/uploads/2024/08/Chuan-SEO-1.jpeg',
      },
      {
        title: 'Giao diện độc quyền',
        description:
          'Thiết kế dựa trên bộ nhận diện thương hiệu để tạo sản phẩm mới, độc quyền cho khách hàng muốn website chuyên nghiệp.',
        icon: 'https://xuanhieuit.com/wp-content/uploads/2024/08/6868-logistics.jpeg',
      },
      {
        title: 'Web chuẩn Responsive',
        description:
          'Tối ưu trải nghiệm trên mọi thiết bị (desktop, tablet, mobile) với hơn 80% người dùng truy cập qua di động.',
        icon: 'https://xuanhieuit.com/wp-content/uploads/2024/08/reponsive.jpeg',
      },
      {
        title: 'Code thêm tính năng',
        description:
          'Sẵn sàng phát triển tính năng tùy chỉnh theo yêu cầu kinh doanh, tư vấn giải pháp cho đặc thù ngành.',
        icon: 'https://xuanhieuit.com/wp-content/uploads/2024/08/duction-code.jpeg',
      },
      {
        title: 'Gói Domain, Hosting',
        description:
          'Có thể hỗ trợ đăng ký domain/hosting hoặc tư vấn chọn gói phù hợp, mang đến giải pháp trọn gói.',
        icon: 'https://xuanhieuit.com/wp-content/uploads/2024/08/domain.jpeg',
      },
      {
        title: 'SEO lên TOP',
        description:
          'Hỗ trợ khai báo website, đăng ký Google Maps để thông tin doanh nghiệp dễ được tìm thấy trên Google.',
        icon: 'https://xuanhieuit.com/wp-content/uploads/2024/08/SEO-top.jpg',
      },
    ],
    projects: [
      {
        title: 'Công ty cổ phần Maison Online',
        description: 'Website bán lẻ thời trang, đồng bộ thương hiệu và tối ưu chuyển đổi.',
        year: '2025',
        href: 'https://maisonrmi.com/',
        cover: 'https://images.careerviet.vn/employer_photo/314449/z5736216863100_1b0c576f3e744c4069c132c31a579a6c_1723781501.jpg',
      },
      {
        title: 'Sở Y Tế – Bệnh Viện Mắt Hà Nội',
        description: 'Cổng thông tin chuyên khoa, đặt lịch khám và tra cứu dịch vụ.',
        year: '2025',
        href: 'https://benhvienmathanoi.gov.vn/',
        cover: 'https://xuanhieuit.com/wp-content/uploads/2024/08/benh-vien-mat-ha-noi.jpeg',
      },
      {
        title: 'Công ty TNHH DVTM TH Xuân Nghiêm Gas',
        description: 'Giới thiệu sản phẩm LPG, quy trình an toàn và tư vấn nhanh.',
        year: '2024',
        href: 'https://www.xuannghiemgas.vn/',
        cover: 'https://xuanhieuit.com/wp-content/uploads/2024/08/6868-logistics.jpeg',
      },
      {
        title: 'Khu công nghiệp Lương Điền – Ngọc Liên',
        description: 'Trang dự án khu công nghiệp, bản đồ, tiến độ và form liên hệ.',
        year: '2024',
        href: 'https://luongdienngoclien.com/',
        cover: 'https://xuanhieuit.com/wp-content/uploads/2024/08/luong-dien.jpeg',
      },
      {
        title: 'Công ty TNHH My Candy Việt Nam – Bánh kẹo',
        description: 'Catalogue sản phẩm, chương trình khuyến mãi và đặt hàng.',
        year: '2025',
        href: 'https://mycandyvn.com/',
        cover: 'https://xuanhieuit.com/wp-content/uploads/2024/08/my-candy-vietnam.jpeg',
      },
      {
        title: 'H3 Group',
        description: 'Thiết kế thi công nội thất F&B, nhà ở, Spa & Shop,… hàng đầu tại Hà Nội.',
        year: '2024',
        href: 'https://h3group.com.vn/',
        cover: 'https://xuanhieuit.com/wp-content/uploads/2025/07/353shots_so.jpeg',
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
