export type KnowledgeTrackStatus = 'live' | 'coming-soon';

export type KnowledgeTrack = {
  slug: string;
  href: string;
  label: string;
  description: string;
  navDescription: string;
  eyebrow: string;
  heroDescription: string;
  status: KnowledgeTrackStatus;
  statusLabel: string;
  previews: string[];
  formats: Array<{
    title: string;
    description: string;
  }>;
  roadmap: Array<{
    step: string;
    title: string;
    description: string;
  }>;
};

export const knowledgeTracks: KnowledgeTrack[] = [
  {
    slug: 'huong-dan-ky-thuat',
    href: '/kien-thuc/huong-dan-ky-thuat',
    label: 'Hướng dẫn kỹ thuật',
    description: 'WordPress, Elementor, tracking, form và các thao tác vận hành website thực tế.',
    navDescription: 'WordPress, form, tracking và vận hành website thực tế.',
    eyebrow: 'Thư viện đang hoạt động',
    heroDescription:
      'Tổng hợp hướng dẫn kỹ thuật có thể áp dụng ngay cho website doanh nghiệp: từ setup biểu mẫu, chống spam, tracking nguồn lead đến quy trình đăng bài và vận hành sau bàn giao.',
    status: 'live',
    statusLabel: 'Đang cập nhật',
    previews: ['Form & automation', 'Tracking thực chiến', 'WordPress vận hành', 'Elementor tips'],
    formats: [
      {
        title: 'Checklist thao tác',
        description: 'Hướng dẫn từng bước, dễ bàn giao cho đội vận hành nội bộ.',
      },
      {
        title: 'Mẫu code nhanh',
        description: 'Snippet gọn cho các tình huống kỹ thuật phổ biến trên website.',
      },
      {
        title: 'Fix lỗi thường gặp',
        description: 'Tập trung vào lỗi ảnh hưởng lead, form, hiển thị và tracking.',
      },
    ],
    roadmap: [
      {
        step: '01',
        title: 'Thiết lập nền tảng',
        description: 'Các bài viết cho giai đoạn launch website và chuẩn hóa cấu hình ban đầu.',
      },
      {
        step: '02',
        title: 'Vận hành hằng ngày',
        description: 'Quy trình đăng bài, cập nhật sản phẩm và kiểm tra form sau bàn giao.',
      },
      {
        step: '03',
        title: 'Tối ưu sau khi chạy',
        description: 'Tracking, chống spam, tối ưu trải nghiệm và những tinh chỉnh nhỏ nhưng hiệu quả.',
      },
    ],
  },
  {
    slug: 'case-study',
    href: '/kien-thuc/case-study',
    label: 'Case study',
    description: 'Bóc tách dự án thật theo mạch before/after, quyết định UX và bài học sau launch.',
    navDescription: 'Dự án thật, before/after, quyết định UX và bài học sau launch.',
    eyebrow: 'Roadmap nội dung mới',
    heroDescription:
      'Chuyên mục sẽ kể lại quá trình triển khai thật từ brief, wireframe, nội dung, tracking đến tối ưu sau khi website đi vào vận hành. Mục tiêu là cho người xem thấy rõ vì sao một quyết định giao diện hay luồng nội dung lại tác động đến chuyển đổi.',
    status: 'coming-soon',
    statusLabel: 'Sắp mở',
    previews: ['Before / after UI', 'Quyết định chuyển đổi', 'Tracking sau launch', 'Bài học triển khai'],
    formats: [
      {
        title: 'Bóc tách theo hành trình',
        description: 'Đi từ brief ban đầu đến phiên bản đã launch để thấy toàn bộ logic triển khai.',
      },
      {
        title: 'Bảng so sánh trực quan',
        description: 'Đặt before/after, luồng cũ/mới và tác động tới lead trên cùng một màn hình.',
      },
      {
        title: 'Nhật ký quyết định',
        description: 'Ghi lại các lần đổi layout, CTA, content block và lý do đằng sau mỗi thay đổi.',
      },
    ],
    roadmap: [
      {
        step: '01',
        title: 'Landing page từ brief mơ hồ',
        description: 'Biến yêu cầu chung chung thành cấu trúc nội dung rõ ràng và có điểm chốt lead.',
      },
      {
        step: '02',
        title: 'Website doanh nghiệp trước và sau tối ưu',
        description: 'Phân tích vì sao cần làm lại hero, hệ thống bằng chứng và CTA chính.',
      },
      {
        step: '03',
        title: 'Hậu kỳ sau launch',
        description: 'Theo dõi tracking, phản hồi người dùng và các tinh chỉnh nhỏ tạo khác biệt lớn.',
      },
    ],
  },
  {
    slug: 'seo-noi-dung',
    href: '/kien-thuc/seo-noi-dung',
    label: 'SEO & nội dung',
    description: 'Blueprint keyword, content framework và checklist giúp website viết bài có mục tiêu.',
    navDescription: 'Keyword map, content framework và checklist viết bài có mục tiêu.',
    eyebrow: 'Roadmap nội dung mới',
    heroDescription:
      'Đây sẽ là nơi tổng hợp framework nội dung dành cho website doanh nghiệp: từ nghiên cứu chủ đề, tổ chức cụm bài, viết landing chuẩn chuyển đổi đến cách phối hợp giữa SEO, sales và đội vận hành để nội dung không bị bỏ quên sau khi đăng.',
    status: 'coming-soon',
    statusLabel: 'Sắp mở',
    previews: ['Keyword map', 'Pillar content', 'On-page checklist', 'Content workflow'],
    formats: [
      {
        title: 'Content sprint 30/60/90',
        description: 'Lộ trình xây nền nội dung theo từng giai đoạn thay vì viết rải rác thiếu chủ đích.',
      },
      {
        title: 'Template brief bài viết',
        description: 'Mẫu giao việc rõ mục tiêu tìm kiếm, CTA, bằng chứng và internal link.',
      },
      {
        title: 'Playbook SEO + sales',
        description: 'Kết nối câu hỏi của khách hàng với nội dung trên site để tăng tỉ lệ chuyển đổi.',
      },
    ],
    roadmap: [
      {
        step: '01',
        title: 'Bộ khung pillar page cho dịch vụ',
        description: 'Cách gom keyword, chia section và gắn CTA để landing vừa mạnh SEO vừa chốt lead.',
      },
      {
        step: '02',
        title: 'Quy trình viết bài có thể bàn giao',
        description: 'Từ brief, outline, ảnh minh họa đến checklist publish dành cho team nội bộ.',
      },
      {
        step: '03',
        title: 'Nội dung nuôi lead sau khi có traffic',
        description: 'Cách xây cụm bài FAQ, so sánh, case insight và CTA mềm cho khách hàng cân nhắc.',
      },
    ],
  },
];

export const getKnowledgeTrackBySlug = (slug: string) =>
  knowledgeTracks.find((track) => track.slug === slug);
