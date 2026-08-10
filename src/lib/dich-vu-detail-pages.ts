import thietKeWebsiteContent from "@/_content/thiet-ke-website.json";
import phatTrienDevopsContent from "@/_content/phat-trien-devops.json";
import phatTrienIotContent from "@/_content/phat-trien-iot.json";
import phatTrienBlockchainContent from "@/_content/phat-trien-blockchain.json";
import phatTrienAiContent from "@/_content/phat-trien-ai.json";
import phatTrienUngDungSaasContent from "@/_content/phat-trien-ung-dung-saas.json";
import thietKeAppContent from "@/_content/thiet-ke-app.json";
import vanHanhVaBaoTriContent from "@/_content/van-hanh-va-bao-tri.json";
import phatTrienPhanMemDoanhNghiepContent from "@/_content/phat-trien-phan-mem-doanh-nghiep.json";
import phatTrienPhanMemMvpContent from "@/_content/phat-trien-phan-mem-mvp.json";

export type ServiceHeroPhones = { left: string; center: string; right: string };
export type ServiceHeroCarousel = { images: string[]; arcText?: string };
export type ServiceHero = {
  titleDark: string;
  titleLight: string;
  description: string;
  bgImage: string;
  dashboardImage: string;
  phones?: ServiceHeroPhones;
  carousel?: ServiceHeroCarousel;
  chips?: string[];
  lightFirst?: boolean;
};

export type ServiceSolutionItem = {
  title: string;
  desc: string;
  image?: string;
  descLinks?: Array<{ phrase: string; href: string }>;
};
export type ServiceSolution = {
  label?: string;
  headlineLight: string;
  headlineDark: string;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
  items: ServiceSolutionItem[];
};

export type ServiceFeatureItem = { title: string; desc: string; image: string; iconPath?: string; num?: string };
export type ServiceFeatures = {
  label?: string;
  headlineLight: string;
  headlineDark: string;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
  items: ServiceFeatureItem[];
};

export type ServiceHowWeWorkStep = { num: string; badge: string; title: string; desc: string };
export type ServiceHowWeWork = {
  label: string;
  ctaLabel: string;
  ctaHref: string;
  steps: ServiceHowWeWorkStep[];
};

export type ServiceBenefitItem = { num: string; title: string; desc: string };
export type ServiceBenefits = {
  label: string;
  headlineLight: string;
  headlineDark: string;
  items: ServiceBenefitItem[];
};

export type ServiceCtaBanner = {
  badge: string;
  headline: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  image: string;
};

export type ServiceCounterItem = { index: string; value: string; desc: string };
export type ServiceCounter = { badgeText: string; items: ServiceCounterItem[] };

export type ServiceIndustryItem = { slug: string; title: string; icon: string };
export type ServiceIndustries = {
  label: string;
  headlineLight: string;
  headlineDark: string;
  items: ServiceIndustryItem[];
};

export type ServicePricePackage = {
  name: string;
  price: string;
  currency: string;
  period: string;
  description: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
  highlight: boolean;
  labelText?: string;
  iconPath?: string;
};
export type ServicePrice = {
  label: string;
  headlineLight: string;
  headlineDark: string;
  description: string;
  packages: ServicePricePackage[];
};

export type ServiceTechItem = { name: string; category: string };
export type ServiceTechStack = {
  headlineLight: string;
  headlineDark: string;
  filters: string[];
  items: ServiceTechItem[];
};

export type ServiceComprehensiveItem = {
  slug: string;
  title: string;
  desc: string;
  image: string;
  href: string;
};
export type ServiceComprehensive = {
  headlineLight: string;
  headlineDark: string;
  items: ServiceComprehensiveItem[];
};

export type ServiceFaqItem = { q: string; a: string };
export type ServiceFaq = {
  label: string;
  headlineParts: string[];
  description: string;
  items: ServiceFaqItem[];
};

export type ServicePageContent = {
  slug: string;
  metaTitle: string;
  hero?: ServiceHero;
  solution?: ServiceSolution;
  features?: ServiceFeatures;
  howWeWork?: ServiceHowWeWork;
  benefits?: ServiceBenefits;
  ctaBanner?: ServiceCtaBanner;
  counter?: ServiceCounter;
  industries?: ServiceIndustries;
  price?: ServicePrice;
  techStack?: ServiceTechStack;
  comprehensiveServices?: ServiceComprehensive;
  faq?: ServiceFaq;
  ctaBannerAfterIndustries?: boolean;
};

export const dichVuDetailPages: Record<string, ServicePageContent> = {
  "thiet-ke-website": thietKeWebsiteContent as ServicePageContent,
  "phat-trien-devops": phatTrienDevopsContent as ServicePageContent,
  "phat-trien-iot": phatTrienIotContent as ServicePageContent,
  "phat-trien-blockchain": phatTrienBlockchainContent as ServicePageContent,
  "phat-trien-ai": phatTrienAiContent as ServicePageContent,
  "phat-trien-ung-dung-saas": phatTrienUngDungSaasContent as ServicePageContent,
  "thiet-ke-app": thietKeAppContent as ServicePageContent,
  "van-hanh-va-bao-tri": vanHanhVaBaoTriContent as ServicePageContent,
  "phat-trien-phan-mem-doanh-nghiep": phatTrienPhanMemDoanhNghiepContent as ServicePageContent,
  "phat-trien-phan-mem-mvp": phatTrienPhanMemMvpContent as ServicePageContent,
};

const dichVuItPage: ServicePageContent = {
  ...dichVuDetailPages["phat-trien-devops"],
  slug: "dich-vu-it",
  metaTitle: "Dịch vụ IT toàn diện - Winterfrost",
  industries: dichVuDetailPages["thiet-ke-website"].industries,
  hero: {
    ...dichVuDetailPages["phat-trien-devops"].hero!,
    titleDark: "Dịch vụ IT toàn diện",
    titleLight: "",
    description:
      "Winterfrost cung cấp các giải pháp quản trị hệ thống IT, bảo trì phần mềm và thiết lập hạ tầng công nghệ chuyên sâu. Chúng tôi tập trung vào việc duy trì tính ổn định của hệ thống, bảo mật dữ liệu và hỗ trợ doanh nghiệp làm chủ hoàn toàn các công cụ kỹ thuật để tập trung vào các hoạt động kinh doanh cốt lõi.",
    dashboardImage:
      "/images/migrated/homenest-software/wp-content/uploads/2026/04/Web-Application-Development-banner.jpg",
  },
  solution: {
    ...dichVuDetailPages["phat-trien-devops"].solution!,
    headlineLight: "Lợi ích của dịch vụ IT",
    headlineDark: "mang lại cho doanh nghiệp",
    description:
      "Số hóa và quản trị IT giúp tối ưu hóa chi phí vận hành, loại bỏ rủi ro gián đoạn kỹ thuật và đảm bảo tính liên tục của dữ liệu doanh nghiệp.",
    ctaLabel: "Thảo luận với Winterfrost ngay!",
    ctaHref: "tel:+84971450454",
    items: [
      {
        title: "Giảm thiểu rủi ro gián đoạn",
        desc: "Hệ thống được giám sát 24/7 để phát hiện và xử lý sớm các sự cố kỹ thuật, đảm bảo hoạt động kinh doanh không bị ngưng trệ.",
      },
      {
        title: "Tối ưu hóa chi phí nhân sự",
        desc: "Doanh nghiệp tiếp cận với đội ngũ chuyên gia giàu kinh nghiệm mà không cần duy trì một phòng IT nội bộ cồng kềnh.",
      },
      {
        title: "Bảo mật hạ tầng đa lớp",
        desc: "Triển khai các giao thức an ninh nghiêm ngặt để bảo vệ dữ liệu doanh nghiệp trước các rủi ro xâm nhập trái phép.",
      },
      {
        title: "Chuyên môn hóa kỹ thuật",
        desc: "Ứng dụng các công nghệ tiên tiến như IoT, Cloud và Blockchain vào quy trình vận hành thực tế của doanh nghiệp.",
      },
      {
        title: "Làm chủ tài sản công nghệ",
        desc: "Cam kết bàn giao 100% mã nguồn và tài liệu cấu trúc hệ thống, giúp doanh nghiệp hoàn toàn tự chủ.",
      },
      {
        title: "Linh hoạt mở rộng quy mô",
        desc: "Hạ tầng IT được thiết kế theo kiến trúc module, dễ dàng tích hợp thêm tính năng khi doanh nghiệp tăng trưởng.",
      },
    ],
  },
  features: {
    ...dichVuDetailPages["phat-trien-devops"].features!,
    headlineLight: "Các dịch vụ IT chuyên sâu",
    headlineDark: "tại Winterfrost",
    description:
      "Chúng tôi cung cấp giải pháp từ quản trị hệ thống hàng ngày đến triển khai các dự án công nghệ phức tạp, đảm bảo tính khớp nối hoàn toàn với nghiệp vụ đặc thù.",
    ctaLabel: "Nhận tư vấn ngay",
    ctaHref: "tel:+84971450454",
    items: [
      {
        title: "Dịch vụ IT Managed Services",
        desc: "Quản trị và vận hành toàn bộ hạ tầng IT, từ máy chủ, mạng nội bộ đến các thiết bị đầu cuối của nhân sự.",
        image: "/images/services/winterfrost/enterprise-software-development.webp",
      },
      {
        title: "Bảo trì và nâng cấp phần mềm",
        desc: "Đảm bảo các hệ thống phần mềm nghiệp vụ ERP, CRM, LMS luôn hoạt động ổn định, cập nhật tính năng và vá lỗi an ninh định kỳ.",
        image: "/images/services/winterfrost/ai-development.webp",
      },
      {
        title: "Thiết kế và tích hợp hạ tầng Cloud",
        desc: "Di chuyển và quản trị dữ liệu trên các nền tảng điện toán đám mây với kiến trúc chịu tải cao và tối ưu chi phí lưu trữ.",
        image: "/images/services/winterfrost/devops-development.webp",
      },
      {
        title: "Triển khai công nghệ chuyên biệt",
        desc: "Tích hợp cảm biến thu thập dữ liệu cho nông nghiệp hoặc hệ thống truy xuất nguồn gốc minh bạch cho sản xuất.",
        image: "/images/services/winterfrost/saas-application-development.webp",
      },
      {
        title: "Bảo mật và kiểm định hệ thống",
        desc: "Đánh giá lỗ hổng an ninh mạng và thiết lập quy trình kiểm định kỹ thuật theo các tiêu chuẩn chuyên ngành như CO/CQ cho nội thất.",
        image: "/images/services/winterfrost/custom-software-solutions.webp",
      },
    ],
  },
  howWeWork: {
    ...dichVuDetailPages["phat-trien-devops"].howWeWork!,
    label: "Quy trình thực hiện dịch vụ IT của Winterfrost",
    ctaLabel: "",
    steps: [
      {
        num: "01",
        badge: "Kiểm tra",
        title: "Kiểm tra sức khỏe hệ thống",
        desc: "Thực hiện rà soát toàn bộ hệ thống mạng, máy chủ, phần mềm nghiệp vụ và đánh giá các lỗ hổng bảo mật hiện có.",
      },
      {
        num: "02",
        badge: "Thảo luận",
        title: "Thống nhất cách làm",
        desc: "Thống nhất các cam kết về thời gian phản hồi sự cố, thời gian khôi phục hệ thống và phân định trách nhiệm quản trị kỹ thuật.",
      },
      {
        num: "03",
        badge: "Xử lý",
        title: "Dọn dẹp và tối ưu",
        desc: "Ưu tiên xử lý các lỗi tồn đọng, vá các lỗ hổng an ninh nguy hiểm và dọn dẹp dữ liệu để hệ thống đạt trạng thái ổn định nhất.",
      },
      {
        num: "04",
        badge: "Triển khai",
        title: "Cài đặt và nâng cấp",
        desc: "Cấu hình lại các thiết bị mạng, tối ưu máy chủ Cloud và thiết lập các vòng lặp sao lưu dữ liệu tự động.",
      },
      {
        num: "05",
        badge: "Bàn giao và hướng dẫn",
        title: "Hướng dẫn nhân sự",
        desc: "Hướng dẫn nhân sự doanh nghiệp cách sử dụng các công cụ IT an toàn, bàn giao hồ sơ quản trị hệ thống và các thông tin truy cập mật mã.",
      },
      {
        num: "06",
        badge: "Hỗ trợ",
        title: "Chăm sóc hàng ngày",
        desc: "Theo dõi hiệu suất hệ thống liên tục, thực hiện các bản cập nhật an ninh định kỳ và hỗ trợ kỹ thuật theo yêu cầu phát sinh.",
      },
    ],
  },
  benefits: {
    ...dichVuDetailPages["phat-trien-devops"].benefits!,
    label: "Tại sao nên chọn Winterfrost ?",
    headlineLight: "Vì sao doanh nghiệp nên chọn dịch vụ IT",
    headlineDark: "tại Winterfrost ?",
    items: [
      {
        num: "1",
        title: "Vận hành hệ thống chịu tải cao",
        desc: "Chúng tôi xây dựng và quản trị các nền tảng phục vụ hàng ngàn người dùng truy cập cùng lúc với độ trễ thấp, đảm bảo sự ổn định trong các giai đoạn cao điểm.",
      },
      {
        num: "2",
        title: "Bàn giao 100% mã nguồn",
        desc: "Winterfrost cam kết chuyển giao toàn bộ mã nguồn ngay sau khi nghiệm thu, giúp doanh nghiệp hoàn toàn tự chủ công nghệ và không phụ thuộc vào phí bản quyền hàng tháng.",
      },
      {
        num: "3",
        title: "Làm chủ giải pháp công nghệ",
        desc: "Đội ngũ kỹ sư trực tiếp phát triển các giải pháp AI, IoT và Blockchain mà không qua trung gian, giúp tối ưu hóa hiệu suất kỹ thuật và rút ngắn thời gian xử lý sự cố.",
      },
      {
        num: "4",
        title: "Tư vấn dựa trên năng lực kỹ thuật",
        desc: "Mọi giải pháp IT được thiết kế dựa trên bài toán tài chính và khả năng vận hành thực tế của doanh nghiệp, loại bỏ các kế hoạch công nghệ không có tính ứng dụng cao.",
      },
      {
        num: "5",
        title: "Am hiểu tiêu chuẩn kỹ thuật đa ngành",
        desc: "Chúng tôi có kinh nghiệm thực tiễn trong việc tích hợp các tiêu chuẩn kiểm định kỹ thuật và quy trình chuyển đổi số trong nông nghiệp và giáo dục.",
      },
      {
        num: "6",
        title: "Giám sát tiến độ hàng ngày",
        desc: "Khách hàng trực tiếp theo dõi quá trình phát triển và kiểm tra chất lượng phần mềm thông qua các công cụ quản lý dự án chuyên dụng.",
      },
      {
        num: "7",
        title: "Xử lý hạ tầng dữ liệu quy mô lớn",
        desc: "Với hơn 10 năm kinh nghiệm, chúng tôi có năng lực triển khai các hệ thống quản trị dữ liệu phức tạp, đảm bảo tính toàn vẹn và bảo mật thông tin.",
      },
      {
        num: "8",
        title: "Hỗ trợ kỹ thuật trực tiếp",
        desc: "Đội ngũ chuyên gia tại TP. Hồ Chí Minh sẵn sàng có mặt để xử lý trực tiếp các vấn đề phát sinh về phần cứng, hạ tầng mạng hoặc máy chủ tại trụ sở doanh nghiệp.",
      },
      {
        num: "9",
        title: "Chính sách bảo trì minh bạch",
        desc: "Các cam kết về cập nhật bản vá bảo mật và bảo trì hệ thống được quy định cụ thể trong hợp đồng, đảm bảo hạ tầng CNTT luôn vận hành ổn định.",
      },
    ],
  },
  ctaBanner: {
    ...dichVuDetailPages["phat-trien-devops"].ctaBanner!,
    headline: "Dẫn đầu kỷ nguyên số với hệ thống AI độc quyền",
    description:
      "Đừng chỉ dừng lại ở tự động hóa thông thường. Hãy cùng Winterfrost khai phá sức mạnh dữ liệu để xây dựng những mô hình AI riêng biệt, giúp doanh nghiệp của bạn sở hữu lợi thế cạnh tranh tuyệt đối trên thị trường.",
    ctaLabel: "Xây dựng lộ trình AI ngay",
    image: "/images/people/cta/winterfrost/chuyen-vien-tu-van-viet-nam.png",
  },
  counter: {
    badgeText: "Thành tựu của chúng tôi",
    items: [
      { index: "/01", value: "10+", desc: "Năm kinh nghiệm" },
      { index: "/02", value: "250+", desc: "Khách hàng" },
      { index: "/03", value: "15+", desc: "Quốc gia" },
      { index: "/04", value: "98%", desc: "Khách hàng hài lòng" },
    ],
  },
  price: {
    ...dichVuDetailPages["phat-trien-devops"].price!,
    headlineLight: "Bảng giá",
    headlineDark: "dịch vụ IT",
    description:
      "Chi phí được thiết kế dựa trên quy mô hạ tầng và nhu cầu vận hành thực tế, đảm bảo doanh nghiệp chỉ chi trả cho những giải pháp thực sự cần thiết.",
    packages: [
      {
        name: "Giá dịch vụ IT tại Winterfrost",
        price: "Chi phí linh hoạt theo nhu cầu",
        currency: "",
        period: "",
        description:
          "Lựa chọn lý tưởng cho các đơn vị cần quản trị hạ tầng IT chuyên nghiệp và hiện đại nhất để vận hành ổn định với những giải pháp bảo mật nâng cao.",
        features: [
          "Đảm bảo hệ thống vận hành liên tục và ổn định.",
          "Thiết kế hạ tầng CNTT tối ưu theo nghiệp vụ đặc thù.",
          "Tích hợp không giới hạn các phần mềm và công cụ quản trị.",
          "Đảm bảo tính toàn vẹn và tính xuyên suốt của dòng thông tin.",
          "Giám sát hiệu suất hệ thống thông qua các chỉ số trực quan.",
          "Thiết lập rào cản bảo mật đa tầng cho tài sản số.",
          "Xử lý sự cố tại chỗ nhanh chóng tại khu vực TP.HCM.",
        ],
        ctaLabel: "Bắt đầu ngay",
        ctaHref: "tel:+84971450454",
        highlight: true,
        labelText: "Gói dịch vụ IT",
        iconPath:
          "M234.29,114.85l-45,38.83L203,211.75a16.4,16.4,0,0,1-24.5,17.82L128,198.49,77.47,229.57A16.4,16.4,0,0,1,53,211.75l13.76-58.07-45-38.83A16.46,16.46,0,0,1,31.08,86l59-4.76,22.76-55.08a16.36,16.36,0,0,1,30.27,0l22.75,55.08,59,4.76a16.46,16.46,0,0,1,9.37,28.86Z",
      },
    ],
  },
  techStack: {
    ...dichVuDetailPages["phat-trien-devops"].techStack!,
    headlineLight: "Các công nghệ sử dụng cho dịch vụ IT",
    headlineDark: "",
  },
  comprehensiveServices: {
    ...dichVuDetailPages["phat-trien-devops"].comprehensiveServices!,
    headlineLight: "Các giải pháp liên quan",
    headlineDark: "đến dịch vụ IT",
    items: [
      {
        slug: "phat-trien-phan-mem-doanh-nghiep",
        title: "PHÁT TRIỂN PHẦN MỀM DOANH NGHIỆP",
        desc: "Lập trình các hệ thống ERP, CRM hoặc EdTech chuyên biệt, đảm bảo các ứng dụng nghiệp vụ này vận hành ổn định và đồng bộ dữ liệu xuyên suốt trên hạ tầng IT của doanh nghiệp.",
        image: "/images/services/winterfrost/enterprise-software-development.webp",
        href: "/dich-vu/phat-trien-phan-mem-doanh-nghiep",
      },
      {
        slug: "phat-trien-iot",
        title: "PHÁT TRIỂN IOT",
        desc: "Kết nối hệ thống cảm biến và thiết bị phần cứng vào mạng lưới IT trung tâm để thu thập dữ liệu tự động, hỗ trợ giám sát quy trình sản xuất và nông nghiệp theo thời gian thực.",
        image: "/images/services/winterfrost/iot-development.webp",
        href: "/dich-vu/phat-trien-iot",
      },
      {
        slug: "phat-trien-blockchain",
        title: "PHÁT TRIỂN BLOCKCHAIN",
        desc: "Triển khai các giải pháp truy xuất nguồn gốc và xác thực tiêu chuẩn kỹ thuật CO/CQ, xây dựng lớp dữ liệu minh bạch và tăng cường bảo mật cho hệ thống IT của doanh nghiệp.",
        image: "/images/services/winterfrost/blockchain-development.webp",
        href: "/dich-vu/phat-trien-blockchain",
      },
    ],
  },
  faq: {
    label: "Các câu hỏi thường gặp",
    headlineParts: ["Giải Đáp", "Mọi", "Thắc Mắc"],
    description:
      "Giải đáp trực diện các vấn đề kỹ thuật, bảo mật và quyền sở hữu khi triển khai hạ tầng tại Winterfrost.",
    items: [
      {
        q: "Chi phí dịch vụ IT tại Winterfrost được tính toán như thế nào?",
        a: "Chi phí không cố định mà được thiết kế linh hoạt dựa trên quy mô hạ tầng và nhu cầu vận hành thực tế của từng doanh nghiệp. Điều này đảm bảo khách hàng chỉ chi trả cho những giải pháp và tài nguyên thực sự cần thiết cho hệ thống của mình.",
      },
      {
        q: "Doanh nghiệp có được sở hữu mã nguồn sau khi bàn giao không?",
        a: "Có. Winterfrost cam kết bàn giao 100% mã nguồn và tài liệu cấu trúc hệ thống ngay sau khi nghiệm thu. Điều này giúp doanh nghiệp hoàn toàn tự chủ về công nghệ, có thể tự vận hành và không bị phụ thuộc vào phí bản quyền hàng tháng.",
      },
      {
        q: "Làm sao để tôi giám sát được tiến độ và chất lượng công việc hàng ngày?",
        a: "Khách hàng có thể trực tiếp theo dõi quá trình phát triển và kiểm tra chất lượng thông qua các công cụ quản lý dự án chuyên dụng. Winterfrost thực hiện việc giám sát tiến độ hàng ngày để đảm bảo tính minh bạch và khớp nối hoàn toàn với nghiệp vụ của khách hàng.",
      },
      {
        q: "Dữ liệu của doanh nghiệp được bảo mật ra sao?",
        a: "Chúng tôi triển khai bảo mật hạ tầng đa lớp với các giao thức an ninh nghiêm ngặt để ngăn chặn rủi ro xâm nhập trái phép. Quy trình bao gồm đánh giá lỗ hổng an ninh mạng, thiết lập các vòng lặp sao lưu dữ liệu tự động và cập nhật bản vá bảo mật định kỳ theo cam kết trong hợp đồng.",
      },
      {
        q: "Winterfrost có hỗ trợ xử lý sự cố trực tiếp tại trụ sở doanh nghiệp không?",
        a: "Có. Đội ngũ chuyên gia của chúng tôi sẵn sàng có mặt trực tiếp để xử lý các vấn đề phát sinh về phần cứng, hạ tầng mạng hoặc máy chủ tại trụ sở doanh nghiệp. Chúng tôi cam kết xử lý sự cố tại chỗ nhanh chóng trong 2 đến 4 tiếng.",
      },
      {
        q: "Hệ thống của Winterfrost có khả năng chịu tải như thế nào?",
        a: "Chúng tôi có năng lực xây dựng và quản trị các nền tảng phục vụ hàng ngàn người dùng truy cập cùng lúc với độ trễ thấp. Hệ thống đảm bảo sự ổn định và tính liên tục của dữ liệu ngay cả trong các giai đoạn cao điểm.",
      },
      {
        q: "Dịch vụ IT của Winterfrost am hiểu những tiêu chuẩn ngành đặc thù nào?",
        a: "Chúng tôi có kinh nghiệm thực tế trong việc tích hợp các tiêu chuẩn kiểm định kỹ thuật cho nhiều lĩnh vực:\n• Nông nghiệp: Tích hợp cảm biến IoT và hệ thống truy xuất nguồn gốc.\n• Giáo dục: Quản trị các hệ thống phần mềm nghiệp vụ như LMS.\n• Sản xuất & nội thất: Kiểm định kỹ thuật theo tiêu chuẩn chuyên ngành như CO/CQ.",
      },
      {
        q: "Quy trình triển khai dịch vụ IT diễn ra trong bao lâu?",
        a: "Thời gian triển khai phụ thuộc vào kết quả của giai đoạn \"Kiểm tra sức khỏe hệ thống\" và \"Thống nhất cách làm\". Quy trình được thực hiện bài bản qua 6 bước từ rà soát lỗ hổng, tối ưu hóa dữ liệu, cài đặt nâng cấp cho đến khi đào tạo nhân sự và hỗ trợ chăm sóc hàng ngày.",
      },
    ],
  },
};

const tuVanChuyenDoiSoPage: ServicePageContent = {
  ...dichVuDetailPages["phat-trien-iot"],
  slug: "tu-van-chuyen-doi-so",
  metaTitle: "Dịch vụ tư vấn chuyển đổi số - Winterfrost",
  industries: dichVuDetailPages["thiet-ke-website"].industries,
  hero: {
    ...dichVuDetailPages["phat-trien-iot"].hero!,
    titleDark: "Dịch vụ tư vấn chuyển đổi số",
    titleLight: "",
    description:
      "Winterfrost cung cấp dịch vụ số hóa dữ liệu, tái cấu trúc quy trình làm việc và tích hợp các công nghệ như điện toán đám mây Cloud, IoT và trí tuệ nhân tạo AI vào hệ thống vận hành. Chúng tôi hỗ trợ doanh nghiệp xây dựng lộ trình CNTT chi tiết để nâng cao hiệu suất và tối ưu hóa chi phí quản lý.",
    dashboardImage:
      "/images/migrated/homenest-software/wp-content/uploads/2026/04/Web-Application-Development-banner.jpg",
  },
  solution: {
    ...dichVuDetailPages["phat-trien-iot"].solution!,
    headlineLight: "Lợi ích trực tiếp khi",
    headlineDark: "doanh nghiệp chuyển đổi số",
    description:
      "Số hóa quy trình giúp tối ưu chi phí, đồng bộ dữ liệu và loại bỏ sai sót vận hành thủ công. Giải pháp của Winterfrost đảm bảo tính ổn định kỹ thuật, bảo mật thông tin và quyền sở hữu mã nguồn tuyệt đối cho doanh nghiệp.",
    ctaLabel: "Thảo luận dự án",
    ctaHref: "tel:+84971450454",
    items: [
      {
        title: "Tự động hóa tác vụ lặp lại",
        desc: "Loại bỏ các bước nhập liệu thủ công bằng cách sử dụng phần mềm và thuật toán. Điều này giúp giảm sai sót do con người và rút ngắn thời gian xử lý quy trình nội bộ.",
      },
      {
        title: "Quản trị bằng số liệu thời gian thực",
        desc: "Dữ liệu từ các bộ phận như kho, nhân sự, kinh doanh được cập nhật ngay lập tức lên hệ thống chung. Ban lãnh đạo có thể truy xuất báo cáo chính xác tại mọi thời điểm mà không cần đợi tổng hợp thủ công.",
      },
      {
        title: "Tối ưu hóa chi phí vận hành",
        desc: "Việc số hóa giúp giảm thiểu chi phí in ấn, lưu trữ hồ sơ vật lý và cắt giảm các vị trí nhân sự chỉ làm nhiệm vụ luân chuyển giấy tờ giữa các phòng ban.",
      },
      {
        title: "Bảo mật dữ liệu đa tầng",
        desc: "Thay thế việc lưu trữ thông tin rời rạc bằng cơ sở dữ liệu có phân quyền truy cập. Hệ thống áp dụng các giao thức mã hóa để ngăn chặn việc rò rỉ hoặc mất mát thông tin quan trọng của doanh nghiệp.",
      },
      {
        title: "Tăng khả năng mở rộng hệ thống",
        desc: "Kiến trúc phần mềm hiện đại cho phép doanh nghiệp tích hợp thêm các module chức năng mới như quản lý bán hàng, CRM khi quy mô công ty tăng trưởng mà không cần thay đổi hạ tầng cốt lõi.",
      },
      {
        title: "Làm chủ tài sản số",
        desc: "Doanh nghiệp sở hữu hoàn toàn mã nguồn và cơ sở dữ liệu. Điều này loại bỏ rủi ro bị lệ thuộc vào nhà cung cấp phần mềm bên thứ ba hoặc phải trả phí duy trì tài khoản hàng tháng.",
      },
    ],
  },
  features: {
    ...dichVuDetailPages["phat-trien-iot"].features!,
    headlineLight: "Các dịch vụ tư vấn",
    headlineDark: "chuyển đổi số chuyên sâu",
    description:
      "Chúng tôi cung cấp giải pháp từ lập lộ trình chiến lược đến trực tiếp triển khai các công nghệ chuyên sâu. Dịch vụ tập trung vào việc chuẩn hóa quy trình nghiệp vụ đặc thù và bàn giao toàn bộ mã nguồn để doanh nghiệp tự chủ vận hành.",
    ctaLabel: "Nhận tư vấn ngay",
    ctaHref: "tel:+84971450454",
    items: [
      {
        title: "Chiến lược và lộ trình số hóa",
        desc: "Đánh giá hiện trạng hạ tầng CNTT và khảo sát thực tế quy trình vận hành. Thiết lập danh mục các hạng mục cần ưu tiên chuyển đổi để tối ưu ngân sách và đảm bảo khả năng thực thi kỹ thuật.",
        image: "/images/services/winterfrost/enterprise-software-development.webp",
      },
      {
        title: "Hiện đại hóa & tích hợp hệ thống cũ",
        desc: "Nâng cấp các phần mềm lạc hậu và xây dựng hệ thống cổng kết nối API. Dịch vụ này giúp đồng bộ dữ liệu giữa các nền tảng cũ và công nghệ mới, đảm bảo luồng thông tin xuyên suốt, không bị gián đoạn.",
        image: "/images/services/winterfrost/ai-development.webp",
      },
      {
        title: "Phát triển phần mềm riêng biệt",
        desc: "Lập trình các hệ thống quản trị chuyên biệt ERP, CRM, LMS theo đúng quy trình nghiệp vụ thực tế của doanh nghiệp. Chúng tôi xây dựng giải pháp riêng để khớp hoàn toàn với nhu cầu thực tế thay vì dùng phần mềm đóng gói sẵn.",
        image: "/images/services/winterfrost/devops-development.webp",
      },
      {
        title: "Tích hợp công nghệ cao",
        desc: "Lắp đặt cảm biến IoT để thu thập dữ liệu sản xuất tự động, ứng dụng AI trong phân tích báo cáo dự báo và sử dụng Blockchain để xác thực tính minh bạch của dữ liệu chuỗi cung ứng.",
        image: "/images/services/winterfrost/saas-application-development.webp",
      },
      {
        title: "Chuyển đổi và quản trị",
        desc: "Thực hiện di chuyển toàn bộ dữ liệu lên các nền tảng đám mây. Thiết lập kiến trúc máy chủ tự động cân bằng tải, đảm bảo hệ thống vận hành liên tục 24/7 và bảo mật tuyệt đối.",
        image: "/images/services/winterfrost/custom-software-solutions.webp",
      },
    ],
  },
  howWeWork: {
    ...dichVuDetailPages["phat-trien-iot"].howWeWork!,
    label: "Quy trình tư vấn chuyển đổi số của chúng tôi",
    ctaLabel: "Bắt đầu hành trình của bạn",
    ctaHref: "tel:+84971450454",
    steps: [
      {
        num: "01",
        badge: "Tiếp nhận",
        title: "Khảo sát và đánh giá kỹ thuật",
        desc: "Chúng tôi thực hiện kiểm toán hạ tầng CNTT hiện có, bao gồm: phần cứng, phần mềm, cơ sở dữ liệu và cách thức luân chuyển thông tin giữa các phòng ban. Việc đánh giá này giúp xác định các điểm nghẽn kỹ thuật và mức độ sẵn sàng của nhân sự trong việc tiếp nhận công nghệ mới.",
      },
      {
        num: "02",
        badge: "Lập kế hoạch",
        title: "Thiết lập lộ trình và chỉ số KPI",
        desc: "Dựa trên dữ liệu khảo sát, Winterfrost xây dựng chiến lược số hóa với các mục tiêu định lượng rõ ràng. Lộ trình được chia thành từng giai đoạn cụ thể kèm theo bảng dự toán ngân sách và các chỉ số đo lường hiệu quả như thời gian xử lý quy trình, tỷ lệ giảm sai sót và mức độ tiết kiệm nhân lực.",
      },
      {
        num: "03",
        badge: "Thống nhất",
        title: "Tái cấu trúc và tối ưu hóa quy trình",
        desc: "Trước khi lập trình, chúng tôi phối hợp cùng doanh nghiệp để thiết kế lại các luồng công việc. Các bước thủ công dư thừa sẽ được loại bỏ hoặc thay thế bằng luồng xử lý tự động. Giai đoạn này đảm bảo hệ thống phần mềm sau khi hoàn thiện sẽ vận hành tinh gọn và logic.",
      },
      {
        num: "04",
        badge: "Triển khai",
        title: "Lập trình và tích hợp hệ thống",
        desc: "Đội ngũ kỹ sư phát triển phần mềm theo mô hình Agile, cho phép khách hàng theo dõi và phản hồi theo từng module hoàn thiện. Chúng tôi xây dựng các cổng API để kết nối đồng bộ hệ thống mới với các phần mềm hiện có như kế toán, bán hàng, kho và tích hợp các công nghệ chuyên sâu như AI hay IoT.",
      },
      {
        num: "05",
        badge: "Chuyển giao",
        title: "Đào tạo và bàn giao mã nguồn",
        desc: "Winterfrost tổ chức các buổi đào tạo kỹ thuật trực tiếp cho nhân sự vận hành. Sau khi hệ thống chạy ổn định trên môi trường thực tế, chúng tôi thực hiện bàn giao 100% mã nguồn dự án, tài liệu cấu trúc dữ liệu và hướng dẫn quản trị để doanh nghiệp hoàn toàn làm chủ tài sản số.",
      },
      {
        num: "06",
        badge: "Hỗ trợ",
        title: "Giám sát vận hành và cập nhật định kỳ",
        desc: "Hệ thống được theo dõi liên tục thông qua các thông số về hiệu suất và mức độ tương tác của người dùng. Chúng tôi cam kết đồng hành cùng doanh nghiệp trong việc xử lý các vấn đề phát sinh, cập nhật các bản vá bảo mật và tư vấn mở rộng tính năng khi quy mô doanh nghiệp tăng trưởng.",
      },
    ],
  },
  benefits: {
    ...dichVuDetailPages["phat-trien-iot"].benefits!,
    label: "Tại sao nên chọn Winterfrost?",
    headlineLight: "Chi phí minh bạch",
    headlineDark: "cùng giải pháp chuyển đổi số bền vững",
    items: [
      {
        num: "1",
        title: "10+ năm kinh nghiệm",
        desc: "Chúng tôi đã vận hành thành công nhiều hệ thống dữ liệu lớn, giúp hơn 250 doanh nghiệp tránh được các sai sót kỹ thuật phổ biến và đảm bảo tính khả thi ngay từ giai đoạn thiết kế.",
      },
      {
        num: "2",
        title: "Bàn giao 100% mã nguồn",
        desc: "Việc bàn giao toàn bộ mã nguồn giúp doanh nghiệp nắm quyền tự chủ tuyệt đối. Bạn không phải trả phí duy trì tài khoản hàng tháng và có thể tự nâng cấp hệ thống bất kỳ lúc nào.",
      },
      {
        num: "3",
        title: "Làm chủ công nghệ lõi",
        desc: "Winterfrost trực tiếp phát triển AI, IoT và Blockchain. Việc không qua trung gian giúp rút ngắn thời gian triển khai, tối ưu chi phí và hỗ trợ kỹ thuật chuyên sâu nhất cho khách hàng.",
      },
      {
        num: "4",
        title: "Tính thực tế cao",
        desc: "Chúng tôi chỉ tư vấn những gì doanh nghiệp thực sự cần. Mọi lộ trình đều được tính toán dựa trên năng lực tài chính và khả năng vận hành thực tế của nhân sự khách hàng.",
      },
      {
        num: "5",
        title: "Chuyên môn đa ngành",
        desc: "Với kinh nghiệm trong nông nghiệp, giáo dục và chuỗi cung ứng, chúng tôi hiểu rõ các tiêu chuẩn ngành như CO/CQ, VietGAP để đưa vào phần mềm một cách chuẩn xác.",
      },
      {
        num: "6",
        title: "Quy trình minh bạch",
        desc: "Khách hàng tham gia giám sát dự án hàng ngày qua công cụ quản lý chuyên dụng. Điều này đảm bảo dự án luôn đi đúng hướng và bàn giao đúng thời hạn cam kết.",
      },
      {
        num: "7",
        title: "Hệ thống chịu tải lớn",
        desc: "Chúng tôi có năng lực xử lý hạ tầng cho hàng ngàn người dùng cùng lúc, đảm bảo hệ thống không bị chậm trễ hay gián đoạn trong các giai đoạn cao điểm.",
      },
      {
        num: "8",
        title: "Hỗ trợ kỹ thuật tại chỗ",
        desc: "Đội ngũ của Winterfrost sẵn sàng có mặt để xử lý trực tiếp các vấn đề phát sinh, đảm bảo hoạt động kinh doanh của doanh nghiệp không bị ngưng trệ lâu.",
      },
      {
        num: "9",
        title: "Bảo trì định kỳ rõ ràng",
        desc: "Chính sách bảo trì và cập nhật an ninh được quy định chặt chẽ trong hợp đồng. Doanh nghiệp luôn được tiếp cận với các bản vá bảo mật mới nhất để bảo vệ tài sản dữ liệu.",
      },
    ],
  },
  ctaBanner: {
    ...dichVuDetailPages["phat-trien-iot"].ctaBanner!,
    headline: "Dẫn đầu kỷ nguyên số với hệ thống AI độc quyền",
    description:
      "Đừng chỉ dừng lại ở tự động hóa thông thường. Hãy cùng Winterfrost khai phá sức mạnh dữ liệu để xây dựng những mô hình AI riêng biệt, giúp doanh nghiệp của bạn sở hữu lợi thế cạnh tranh tuyệt đối trên thị trường.",
    ctaLabel: "Xây dựng lộ trình AI ngay",
    image: "/images/people/cta/winterfrost/chuyen-vien-tu-van-viet-nam.png",
  },
  counter: {
    badgeText: "Thành tựu của chúng tôi",
    items: [
      { index: "/01", value: "10+", desc: "Kinh nghiệm" },
      { index: "/02", value: "250+", desc: "Khách hàng" },
      { index: "/03", value: "15+", desc: "Quốc gia" },
      { index: "/04", value: "98%", desc: "Khách hàng hài lòng" },
    ],
  },
  price: {
    ...dichVuDetailPages["phat-trien-iot"].price!,
    headlineLight: "Chi phí",
    headlineDark: "tư vấn chuyển đổi số",
    description:
      "Chúng tôi cung cấp dịch vụ tư vấn chuyển đổi số với múc giá linh hoạt theo nhu cầu và quy mô, đảm bảo giúp doanh nghiệp chuyển đổi hiệu quả và tiết kiệm chi phí.",
    packages: [
      {
        name: "Gói tư vấn chuyển đổi số",
        price: "Chi phí linh hoạt theo quy mô",
        currency: "",
        period: "",
        description:
          "Lựa chọn tối ưu cho các doanh nghiệp cần một lộ trình chuyển đổi số riêng biệt, tập trung vào việc giải quyết các bài toán vận hành cụ thể và tối ưu hóa ngân sách đầu tư theo từng giai đoạn thực tế.",
        features: [
          "Tư vấn dựa trên hiện trạng thực tế của doanh nghiệp.",
          "Thiết kế sơ đồ luồng dữ liệu minh bạch, phù hợp với quy trình nội bộ.",
          "Triển khai linh hoạt AI, IoT hoặc Blockchain tùy theo nhu cầu thực tế.",
          "Doanh nghiệp sở hữu vĩnh viễn tài sản số, không lệ thuộc vào nhà cung cấp.",
          "Kết nối các phần mềm cũ và mới thông qua hệ thống API trung gian.",
          "Áp dụng các giao thức bảo mật đa tầng cho toàn bộ hạ tầng.",
          "Cam kết đồng hành xử lý sự cố và cập nhật an ninh định kỳ.",
        ],
        ctaLabel: "Bắt đầu ngay",
        ctaHref: "tel:+84971450454",
        highlight: true,
        labelText: "Gói tư vấn",
        iconPath:
          "M234.29,114.85l-45,38.83L203,211.75a16.4,16.4,0,0,1-24.5,17.82L128,198.49,77.47,229.57A16.4,16.4,0,0,1,53,211.75l13.76-58.07-45-38.83A16.46,16.46,0,0,1,31.08,86l59-4.76,22.76-55.08a16.36,16.36,0,0,1,30.27,0l22.75,55.08,59,4.76a16.46,16.46,0,0,1,9.37,28.86Z",
      },
    ],
  },
  techStack: {
    ...dichVuDetailPages["phat-trien-iot"].techStack!,
    headlineLight: "Các công nghệ được sử dụng để chuyển đổi số",
    headlineDark: "",
  },
  comprehensiveServices: {
    ...dichVuDetailPages["phat-trien-iot"].comprehensiveServices!,
    headlineLight: "Khám phá các dịch vụ",
    headlineDark: "liên quan",
    items: [
      {
        slug: "phat-trien-phan-mem-doanh-nghiep",
        title: "PHÁT TRIỂN PHẦN MỀM DOANH NGHIỆP",
        desc: "Thiết kế và lập trình các hệ thống quản trị nội bộ chuyên biệt, giúp cụ thể hóa lộ trình chuyển đổi số cho các nghiệp vụ như quản lý quan hệ khách hàng, quản trị nguồn lực và điều hành nhân sự trên một nền tảng duy nhất.",
        image: "/images/services/winterfrost/enterprise-software-development.webp",
        href: "/dich-vu/phat-trien-phan-mem-doanh-nghiep",
      },
      {
        slug: "phat-trien-iot",
        title: "PHÁT TRIỂN IOT",
        desc: "Dành cho các doanh nghiệp sản xuất hoặc nông nghiệp muốn số hóa dữ liệu từ hiện trường. Chúng tôi kết nối các thiết bị phần cứng, cảm biến vào hệ thống quản lý trung tâm để thu thập dữ liệu vận hành tự động theo thời gian thực.",
        image: "/images/services/winterfrost/iot-development.webp",
        href: "/dich-vu/phat-trien-iot",
      },
      {
        slug: "phat-trien-blockchain",
        title: "PHÁT TRIỂN BLOCKCHAIN",
        desc: "Số hóa việc truy xuất nguồn gốc và minh bạch hóa dữ liệu giao dịch. Dịch vụ này đặc biệt phù hợp cho các doanh nghiệp cần xác thực tiêu chuẩn chất lượng hàng hóa (CO/CQ) hoặc quy trình sản xuất khép kín.",
        image: "/images/services/winterfrost/blockchain-development.webp",
        href: "/dich-vu/phat-trien-blockchain",
      },
    ],
  },
  faq: {
    label: "Các câu hỏi thường gặp",
    headlineParts: ["Giải Đáp", "Mọi", "Thắc Mắc"],
    description:
      "Giải đáp trực diện các thắc mắc về chi phí, bảo mật và lộ trình triển khai, giúp doanh nghiệp nắm rõ các cam kết về tính tự chủ công nghệ tại Winterfrost.",
    items: [
      {
        q: "Chi phí dịch vụ tư vấn và triển khai được tính như thế nào?",
        a: "Chi phí không cố định mà được xác định dựa trên quy mô hạ tầng hiện tại, số lượng quy trình cần số hóa và độ phức tạp khi tích hợp các công nghệ chuyên sâu như AI, IoT, Blockchain. Winterfrost sẽ cung cấp báo giá chi tiết từng hạng mục sau bước khảo sát thực tế.",
      },
      {
        q: "Quá trình chuyển đổi số có làm gián đoạn hoạt động kinh doanh hiện tại không?",
        a: "Chúng tôi áp dụng mô hình triển khai cuốn chiếu (từng phần). Hệ thống mới sẽ chạy song song và đồng bộ dữ liệu với hệ thống cũ. Việc chuyển đổi hoàn toàn chỉ được thực hiện khi hệ thống mới đã vượt qua các bài kiểm thử vận hành (UAT), đảm bảo không gây ngưng trệ kinh doanh.",
      },
      {
        q: "Doanh nghiệp có thực sự sở hữu 100% mã nguồn sau khi bàn giao?",
        a: "Có. Đây là cam kết cốt lõi của Winterfrost. Khách hàng nhận toàn bộ mã nguồn dự án, tài liệu kiến trúc hệ thống và quyền quản trị máy chủ. Doanh nghiệp hoàn toàn tự chủ, không phải trả phí duy trì tài khoản cho bên thứ ba và có quyền nâng cấp hệ thống bất kỳ lúc nào.",
      },
      {
        q: "Thời gian triển khai một dự án chuyển đổi số thường kéo dài bao lâu?",
        a: "Tùy vào quy mô doanh nghiệp:\n• Giai đoạn khảo sát và lập lộ trình: 2 đến 4 tuần.\n• Phát triển các module nghiệp vụ cơ bản: 3 đến 5 tháng.\n• Hệ thống quản trị toàn diện tích hợp công nghệ cao: 6 đến 12 tháng.",
      },
      {
        q: "Hệ thống mới có kết nối được với các phần mềm cũ không?",
        a: "Có. Đội ngũ kỹ sư của chúng tôi xây dựng các cổng API trung gian để trích xuất và đồng bộ dữ liệu giữa phần mềm cũ và hệ thống mới. Điều này giúp đảm bảo tính kế thừa dữ liệu và sự xuyên suốt của luồng thông tin.",
      },
      {
        q: "Sau khi bàn giao, nhân sự không rành công nghệ có sử dụng được hệ thống không?",
        a: "Chúng tôi ưu tiên tối ưu hóa giao diện UI/UX theo thói quen vận hành thực tế của nhân viên doanh nghiệp. Đi kèm với đó là chương trình đào tạo trực tiếp và tài liệu hướng dẫn sử dụng chi tiết cho từng bộ phận, giúp nhân sự làm quen với hệ thống trong thời gian ngắn nhất.",
      },
      {
        q: "Dữ liệu của doanh nghiệp được bảo mật như thế nào?",
        a: "Hệ thống được bảo vệ qua nhiều lớp mã hóa dữ liệu tại chỗ, thiết lập tường lửa cho máy chủ Cloud và phân quyền truy cập chi tiết đến từng cấp bậc nhân sự. Trước khi bàn giao, chúng tôi thực hiện kiểm tra lỗ hổng bảo mật để đảm bảo an toàn tuyệt đối cho tài sản số của doanh nghiệp.",
      },
      {
        q: "Winterfrost có hỗ trợ sau khi kết thúc dự án không?",
        a: "Có. Chúng tôi thực hiện chính sách bảo hành kỹ thuật và cập nhật an ninh định kỳ theo hợp đồng. Ngoài ra, đội ngũ kỹ thuật tại Winterfrost luôn sẵn sàng hỗ trợ xử lý các vấn đề phát sinh hoặc tư vấn mở rộng tính năng khi doanh nghiệp có nhu cầu tăng trưởng.",
      },
    ],
  },
};

export function getDichVuDetailPage(slug: string): ServicePageContent | undefined {
  if (slug === "dich-vu-it") return dichVuItPage;
  if (slug === "tu-van-chuyen-doi-so") return tuVanChuyenDoiSoPage;
  return dichVuDetailPages[slug];
}

export const dichVuDetailSlugs = [...Object.keys(dichVuDetailPages), "dich-vu-it", "tu-van-chuyen-doi-so"];
