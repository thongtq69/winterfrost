"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { Phone, Rocket } from "lucide-react";
import { Reveal } from "@/components/primitives/Reveal";
import { SectionLabel } from "@/components/primitives/SectionLabel";
import { IndustriesCounters } from "@/components/sections/IndustriesCounters";
import { CTABanner } from "@/components/sections/CTABanner";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { WikiRelated } from "@/components/sections/WikiRelated";
import { IndustriesGrid9 } from "@/components/sections/dichvu/IndustriesGrid9";
import { dichVuPage } from "@/lib/dich-vu-page";
import type { ServiceIndustries } from "@/lib/dich-vu-detail-pages";
import shared from "@/components/sections/IndustriesIndex.module.css";
import s from "./TechnologiesPage.module.css";
import { LocalizedTree } from "@/components/i18n/LocalizedTree";
import { useAutoText, useLocalizedValue } from "@/i18n/auto-text-client";

type Technology = {
  name: string;
  image: string;
  href?: string;
};

type TechnologyGroup = {
  title: string;
  tone: "white" | "muted";
  items: Technology[];
};

const SOFTWARE_IMAGE_BASE =
  "/images/migrated/homenest-software/wp-content/uploads/2026/04";

const technologyGroups: TechnologyGroup[] = [
  {
    title: "Các công nghệ Back-end chính",
    tone: "muted",
    items: [
      { name: "Ruby on Rails", image: `${SOFTWARE_IMAGE_BASE}/ruby-on-rails.png` },
      { name: "RabbitMQ", image: `${SOFTWARE_IMAGE_BASE}/rabbit-mq.png` },
      {
        name: "Python",
        image: `${SOFTWARE_IMAGE_BASE}/python.png`,
        href: "/python-la-gi-tat-tan-tat-ve-ngon-ngu-lap-trinh-python",
      },
      { name: "Node.js", image: `${SOFTWARE_IMAGE_BASE}/node-js.png` },
      {
        name: "Java",
        image: `${SOFTWARE_IMAGE_BASE}/java.png`,
        href: "/java-la-gi-kien-thuc-co-ban-ve-ngon-ngu-lap-trinh-java-cho-nguoi-moi-bat-dau",
      },
      { name: ".NET", image: `${SOFTWARE_IMAGE_BASE}/dot-net.png` },
      { name: "Apache Kafka", image: `${SOFTWARE_IMAGE_BASE}/apache-kafka.png` },
    ],
  },
  {
    title: "Các công nghệ Front-end chính",
    tone: "white",
    items: [
      { name: "Vue.js", image: `${SOFTWARE_IMAGE_BASE}/vue-js.png` },
      { name: "TypeScript", image: `${SOFTWARE_IMAGE_BASE}/typescript.png` },
      { name: "React", image: `${SOFTWARE_IMAGE_BASE}/react.png` },
      {
        name: "Angular",
        image: `${SOFTWARE_IMAGE_BASE}/angular.png`,
        href: "/angularjs-la-gi-tim-hieu-dac-diem-noi-bat-va-tinh-nang-chinh",
      },
    ],
  },
  {
    title: "Các công nghệ thiết kế App",
    tone: "muted",
    items: [
      {
        name: "iOS",
        image: `${SOFTWARE_IMAGE_BASE}/IOS.png`,
        href: "/app-ios-la-gi-tim-hieu-ve-ung-dung-tren-dien-thoai-iphone",
      },
      {
        name: "Flutter",
        image: `${SOFTWARE_IMAGE_BASE}/flutter.png`,
        href: "/flutter-la-gi-loi-the-noi-bat-va-tiem-nang-nghe-nghiep-day-trien-vong",
      },
      {
        name: "Android",
        image: `${SOFTWARE_IMAGE_BASE}/android.png`,
        href: "/phat-trien-app-android-tuy-chinh",
      },
      { name: "Xamarin", image: `${SOFTWARE_IMAGE_BASE}/xamarin.png` },
      {
        name: "React Native",
        image: `${SOFTWARE_IMAGE_BASE}/react-native.png`,
        href: "/react-native-la-gi",
      },
    ],
  },
  {
    title: "Các công nghệ phát triển AI",
    tone: "white",
    items: [
      { name: "Scikit-Learn", image: `${SOFTWARE_IMAGE_BASE}/scikitLearn.png` },
      { name: "XGBoost", image: `${SOFTWARE_IMAGE_BASE}/XGBoost.png` },
      { name: "spaCy", image: `${SOFTWARE_IMAGE_BASE}/spaCy.png` },
      { name: "LightGBM", image: `${SOFTWARE_IMAGE_BASE}/LightGBM.png` },
      { name: "Lightning AI", image: `${SOFTWARE_IMAGE_BASE}/Lightning-AI.png` },
      { name: "LLaMA by Meta", image: `${SOFTWARE_IMAGE_BASE}/LLaMA-by-Meta.png` },
      { name: "Keras", image: `${SOFTWARE_IMAGE_BASE}/Keras.png` },
      {
        name: "ChatGPT",
        image: `${SOFTWARE_IMAGE_BASE}/ChatGPT.png`,
        href: "/chatgpt-la-gi-buoc-tien-trong-giao-tiep-giua-con-nguoi-va-tri-tue-nhan-tao",
      },
      { name: "ONNX", image: `${SOFTWARE_IMAGE_BASE}/ONNX.png` },
      { name: "Apache Airflow", image: `${SOFTWARE_IMAGE_BASE}/Apache-Airflow.png` },
      { name: "OpenCV", image: `${SOFTWARE_IMAGE_BASE}/OpenCV.png` },
      { name: "Apache Spark", image: `${SOFTWARE_IMAGE_BASE}/Apache-Spark.png` },
      { name: "PyTorch", image: `${SOFTWARE_IMAGE_BASE}/PyTorch.png` },
      { name: "TensorFlow", image: `${SOFTWARE_IMAGE_BASE}/TensorFlow.png` },
      {
        name: "Python",
        image: `${SOFTWARE_IMAGE_BASE}/python.png`,
        href: "/python-la-gi-tat-tan-tat-ve-ngon-ngu-lap-trinh-python",
      },
      { name: "CatBoost", image: `${SOFTWARE_IMAGE_BASE}/CatBoost.png` },
      { name: "YOLO", image: `${SOFTWARE_IMAGE_BASE}/YOLO.png` },
      { name: "MLflow", image: `${SOFTWARE_IMAGE_BASE}/MLflow.png` },
      { name: "Kubeflow", image: `${SOFTWARE_IMAGE_BASE}/Kubeflow.png` },
      { name: "NLTK", image: `${SOFTWARE_IMAGE_BASE}/NLTK.png` },
    ],
  },
  {
    title: "Điện toán đám mây",
    tone: "muted",
    items: [
      { name: "AWS", image: `${SOFTWARE_IMAGE_BASE}/aws.png` },
      { name: "Azure", image: `${SOFTWARE_IMAGE_BASE}/azure.png` },
      { name: "Google Cloud", image: `${SOFTWARE_IMAGE_BASE}/google-cloud.png` },
    ],
  },
];

const solutionCards = [
  {
    title: "Thiết Kế Website Chuyên Nghiệp",
    desc: "Chúng tôi phát triển website tối ưu từ trang giới thiệu đến nền tảng thương mại điện tử. Hệ thống đảm bảo tốc độ tải trang cực nhanh, hiển thị hoàn hảo trên mọi thiết bị và tích hợp trình quản trị đơn giản, giúp bạn tối ưu trải nghiệm người dùng và thúc đẩy doanh thu trực tuyến hiệu quả.",
    image:
      "/images/services/softbuild/web-application-development.webp",
    href: "/dich-vu/thiet-ke-website",
  },
  {
    title: "Thiết Kế App Chuyên Sâu",
    desc: "SoftBuild lập trình ứng dụng di động mượt mà cho cả IOS và Android với giao diện trực quan. Chúng tôi chú trọng bảo mật dữ liệu tuyệt đối và tích hợp các công cụ thông báo tự động, giúp doanh nghiệp kết nối, tương tác và chăm sóc khách hàng liên tục mọi lúc, mọi nơi.",
    image:
      "/images/services/softbuild/mobile-app-development.webp",
    href: "/dich-vu/thiet-ke-app",
  },
  {
    title: "Phát Triển Trí Tuệ Nhân Tạo AI",
    desc: "Chúng tôi tích hợp AI và các mô hình ngôn ngữ lớn (LLM) để tự động hóa quy trình vận hành và thiết lập trợ lý ảo 24/7. Giải pháp này giúp doanh nghiệp phân tích dữ liệu khổng lồ trong tích tắc, cắt giảm chi phí nhân sự và đưa ra các quyết định kinh doanh chính xác hơn.",
    image:
      "/images/services/softbuild/ai-development.webp",
    href: "/dich-vu/phat-trien-ai",
  },
  {
    title: "Phát Triển Phần Mềm Doanh Nghiệp",
    desc: "Chúng tôi thiết kế phần mềm quản trị nội bộ bám sát quy trình thực tế của bạn, giúp số hóa thao tác thủ công và đồng bộ dữ liệu tức thời. Hệ thống dễ dàng mở rộng khi công ty phát triển, đi kèm cam kết bàn giao 100% mã nguồn để bạn có toàn quyền sở hữu tài sản số.",
    image:
      "/images/services/softbuild/enterprise-software-development.webp",
    href: "/dich-vu/phat-trien-phan-mem-doanh-nghiep",
  },
];

const benefits = [
  {
    title: "Tối ưu trải nghiệm người dùng",
    desc: "Chúng tôi chọn các công nghệ Front-end mới nhất để xây dựng giao diện trực quan, mượt mà và tương thích hoàn hảo trên mọi thiết bị của khách hàng.",
  },
  {
    title: "Đảm bảo tốc độ phản hồi",
    desc: "Sử dụng kiến trúc Microservices giúp hệ thống xử lý dữ liệu tức thì và luôn giữ được sự ổn định dưới áp lực của hàng ngàn lượt truy cập cùng lúc.",
  },
  {
    title: "Bảo vệ dữ liệu tuyệt đối",
    desc: "SoftBuild tin dùng các thuật toán mã hóa đa lớp tiên tiến nhất để ngăn chặn rủi ro an ninh mạng, bảo vệ an toàn cho dữ liệu nội bộ và thông tin người dùng.",
  },
  {
    title: "Nâng cấp không gián đoạn",
    desc: "Ứng dụng điện toán đám mây Cloud để quá trình cập nhật và bảo trì hệ thống diễn ra ngầm, hoàn toàn không làm gián đoạn trải nghiệm của khách hàng.",
  },
  {
    title: "Tự động hóa thông minh",
    desc: "Lựa chọn tích hợp AI nhằm tự động hóa việc phân tích hành vi người dùng, gợi ý cá nhân hóa và cung cấp hỗ trợ trực tuyến 24/7.",
  },
  {
    title: "Dễ dàng mở rộng quy mô",
    desc: "Ưu tiên sử dụng nền tảng mã nguồn sạch và kiến trúc mở, giúp hệ thống luôn sẵn sàng tích hợp thêm các tính năng mới khi doanh nghiệp của bạn phát triển.",
  },
];

const technologiesIndustries: ServiceIndustries = {
  label: "Lĩnh vực",
  headlineLight: "Các lĩnh vực chuyên môn",
  headlineDark: "của SoftBuild",
  items: [...dichVuPage.industries.items],
};

const faqItems = [
  {
    q: "Những yếu tố kỹ thuật nào quyết định việc lựa chọn nền tảng công nghệ cho một dự án?",
    a: "Việc chọn nền tảng công nghệ phụ thuộc hoàn toàn vào đặc thù bài toán kỹ thuật của từng dự án thay vì chạy theo xu hướng. Các kiến trúc sư hệ thống sẽ đánh giá dựa trên khối lượng dữ liệu cần xử lý, đồng thời, yêu cầu về độ trễ thời gian thực và khả năng tương thích với các cơ sở hạ tầng có sẵn. Một nền tảng công nghệ tối ưu phải giải quyết được sự cân bằng giữa hiệu năng phần mềm, chi phí vận hành máy chủ hàng tháng và sự thuận tiện cho đội ngũ công nghệ nội bộ của doanh nghiệp tiếp quản mã nguồn về sau.",
  },
  {
    q: "Cấu trúc hệ thống được thiết kế như thế nào để đảm bảo không bị sập khi lượng người dùng tăng đột biến?",
    a: "Để giải quyết bài toán mở rộng quy mô, các phần mềm doanh nghiệp thường được chúng tôi thiết kế theo kiến trúc vi dịch vụ kết hợp với công nghệ điện toán đám mây. Cách tiếp cận này chia nhỏ phần mềm thành nhiều vùng chức năng hoạt động độc lập, cho phép hệ thống tự động bổ sung tài nguyên máy chủ chỉ cho những tính năng đang bị quá tải thay vì phải nâng cấp toàn bộ. Kỹ thuật này giúp ứng dụng luôn duy trì tốc độ phản hồi ổn định và tiết kiệm tối đa chi phí hạ tầng mạng cho doanh nghiệp.",
  },
  {
    q: "Làm thế nào để phần mềm mới có thể kết nối và đồng bộ dữ liệu với các hệ thống quản lý cũ của doanh nghiệp?",
    a: "Việc đồng bộ dữ liệu giữa hệ thống mới và phần mềm cũ được thực hiện thông qua việc xây dựng các giao diện lập trình ứng dụng (API) tùy chỉnh. Lớp trung gian này hoạt động như một cầu nối dịch thuật, giúp hai hệ thống có nền tảng công nghệ khác nhau có thể trao đổi thông tin theo thời gian thực một cách an toàn. Cách làm này giúp doanh nghiệp tận dụng tối đa cơ sở dữ liệu hiện có, không phải nhập liệu lại từ đầu và duy trì tính toàn vẹn của thông tin xuyên suốt quá trình chuyển đổi số.",
  },
  {
    q: "Việc tích hợp trí tuệ nhân tạo AI vào các phần mềm đang hoạt động được thực hiện theo quy trình nào?",
    a: "Quá trình tích hợp AI bắt đầu bằng việc thiết lập các cổng kết nối dữ liệu an toàn để hệ thống có thể giao tiếp với các mô hình ngôn ngữ lớn LLM mà không làm gián đoạn luồng công việc hiện tại. Dữ liệu chuyên ngành của doanh nghiệp sau đó sẽ được chuẩn hóa và đưa vào huấn luyện tinh chỉnh để AI hiểu đúng nghiệp vụ thực tế. Toàn bộ quá trình xử lý thuật toán phức tạp này được phân luồng chạy trên các máy chủ độc lập, đảm bảo phần mềm chính vẫn hoạt động mượt mà khi AI đang thực thi nhiệm vụ.",
  },
  {
    q: "Tiêu chuẩn mã hóa và bảo mật dữ liệu nào được áp dụng để chống lại các lỗ hổng an ninh mạng hiện nay?",
    a: "Để bảo vệ toàn vẹn dữ liệu, cấu trúc phần mềm áp dụng các thuật toán mã hóa đầu cuối tiên tiến nhất cho cả dữ liệu lưu trữ tĩnh và dữ liệu đang truyền tải qua mạng. Hệ thống phân quyền được thiết kế nhiều lớp với các phương thức xác thực đa yếu tố nhằm ngăn chặn triệt để các truy cập trái phép từ bên ngoài. Trước khi đưa vào vận hành chính thức, toàn bộ mã nguồn đều phải vượt qua các công cụ quét lỗ hổng tự động và các kịch bản kiểm tra thâm nhập giả lập để đội ngũ kỹ sư vá lỗi kịp thời.",
  },
  {
    q: "Làm sao để quá trình cập nhật tính năng mới hoặc sửa lỗi phần mềm không làm gián đoạn trải nghiệm của người dùng?",
    a: "Chúng tôi áp dụng quy trình tích hợp và triển khai liên tục để tự động hóa toàn bộ các bước kiểm thử và phát hành mã nguồn. Khi có bản cập nhật mới, hệ thống sẽ tự động tạo ra một môi trường máy chủ song song để chạy thử nghiệm các tính năng trước khi chuyển hướng lưu lượng người dùng sang phiên bản này. Phương pháp kỹ thuật này loại bỏ hoàn toàn thời gian chết của hệ thống, giúp phần mềm luôn được nâng cấp mượt mà mà khách hàng cuối không hề cảm nhận được sự gián đoạn.",
  },
  {
    q: "Quy trình bàn giao mã nguồn bao gồm những tài liệu kỹ thuật chuyên sâu nào để doanh nghiệp tự chủ hoàn toàn?",
    a: "Quy trình bàn giao tiêu chuẩn đòi hỏi sự minh bạch tuyệt đối về toàn bộ cấu trúc lập trình và tài nguyên dự án. Ngoài các tệp mã nguồn sạch và cơ sở dữ liệu gốc, doanh nghiệp sẽ nhận được bộ tài liệu kỹ thuật chi tiết bao gồm sơ đồ luồng dữ liệu, danh sách các thư viện mã nguồn mở đã sử dụng và kịch bản triển khai máy chủ. Bộ tài liệu này đóng vai trò như một bản thiết kế cốt lõi, giúp đội ngũ kỹ thuật của bạn ngay lập tức hiểu rõ hệ thống, tiến hành kiểm tra bảo mật độc lập và tự do phát triển thêm tính năng mới.",
  },
];

function TechnologyCard({ technology, muted }: { technology: Technology; muted: boolean }) {
  const tr = useAutoText();
  const content = (
    <span className={`${s.logoCard} ${muted ? s.logoCardMuted : ""}`}>
      {/* The reference site serves these small technology marks as unoptimized images. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={technology.image} alt={technology.name} title={technology.name} loading="lazy" />
    </span>
  );

  return technology.href ? (
    <Link href={technology.href} className={s.logoLink} aria-label={`${tr("Tìm hiểu")} ${technology.name}`}>
      {content}
    </Link>
  ) : (
    <span className={s.logoStatic}>{content}</span>
  );
}

function TechnologySection({ group }: { group: TechnologyGroup }) {
  const muted = group.tone === "muted";
  return (
    <LocalizedTree>
    <section className={`${s.techSection} ${muted ? s.techSectionMuted : ""}`}>
      <div className={s.techContainer}>
        <Reveal amount={0.05} rootMargin="0px 0px -5% 0px">
          <div className={s.techGroup}>
            <h2 className={s.techHeading}>{group.title}</h2>
            <div className={s.logoGrid}>
              {group.items.map((technology, itemIndex) => (
                <Reveal
                  key={technology.name}
                  delay={Math.min(itemIndex, 9) * 45}
                  distance={18}
                  amount={0.01}
                  rootMargin="0px"
                >
                  <TechnologyCard technology={technology} muted={muted} />
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
    </LocalizedTree>
  );
}

function Hero() {
  const tr = useAutoText();
  return (
    <LocalizedTree>
    <section className={shared.heroSection}>
      <div className={shared.heroContainer}>
        <Reveal className={shared.heroText} direction="left" distance={34} amount={0.01}>
          <h1 className={`${shared.heroTitle} ${s.heroTitle}`}>
            <span className={shared.heroTitleMain}>Công nghệ và Ngôn ngữ lập trình</span>{" "}
            <span className={`${shared.heroTitleSub} ${s.heroTitleSub}`}>tại SoftBuild</span>
          </h1>
          <div className={shared.heroDescription}>
            <p>
              {tr("Tại SoftBuild, chúng tôi phát triển các dự án")}{" "}
              <Link href="/dich-vu/phat-trien-phan-mem-doanh-nghiep">{tr("phần mềm")}</Link>,{" "}
              <Link href="/dich-vu/phat-trien-iot">IoT</Link> và{" "}
              <Link href="/dich-vu/phat-trien-blockchain">Blockchain</Link>{" "}
              {tr("bằng những ngôn ngữ lập trình mới nhất. Việc sử dụng công nghệ hiện đại giúp hệ thống hoạt động mượt mà, xử lý dữ liệu nhanh và luôn được bảo vệ an toàn trước các rủi ro mạng.")}
            </p>
            <br />
            <p>
              {tr("Hơn nữa, nền tảng mới giúp bạn rất dễ dàng nâng cấp tính năng hoặc kết nối với các phần mềm khác khi doanh nghiệp lớn mạnh. Đặc biệt, chúng tôi cam kết bàn giao 100% mã nguồn để bạn hoàn toàn sở hữu và kiểm soát phần mềm của mình.")}
            </p>
          </div>
          <div className={shared.heroButtons}>
            <Link
              href="tel:+84971450454"
              className={`${shared.heroButton} ${shared.heroButtonPrimary}`}
            >
              Liên hệ trực tiếp
              <Phone size={18} aria-hidden />
            </Link>
            <Link href="https://zalo.me/0971450454" className={shared.heroButton}>
              Nhắn tin nhận tư vấn
            </Link>
          </div>
        </Reveal>
        <Reveal className={shared.heroImage} direction="right" distance={34} delay={100} amount={0.01}>
          <Image
            src="/images/migrated/homenest-software/wp-content/uploads/2026/04/Industry-Specific-Deevelopment-industries.jpg"
            alt="Nền tảng công nghệ phát triển phần mềm SoftBuild"
            fill
            sizes="(min-width: 1024px) 55vw, 100vw"
            priority
          />
        </Reveal>
      </div>
    </section>
    </LocalizedTree>
  );
}

function About() {
  const tr = useAutoText();
  return (
    <LocalizedTree>
    <section className={`${shared.aboutSection} ${s.aboutSection}`}>
      <div className={shared.aboutContainer}>
        <div className={shared.aboutHeader}>
          <SectionLabel>Tổng quan công nghệ</SectionLabel>
          <h2 className={`${shared.aboutTitle} ${s.aboutTitle}`}>
            Năng lực triển khai và đội ngũ tại SoftBuild
          </h2>
        </div>
        <div className={shared.aboutBody}>
          <Reveal className={shared.aboutText} direction="left" distance={28} amount={0.05}>
            <p>
              {tr("Với hơn 10 năm kinh nghiệm, SoftBuild chúng tôi cung cấp các giải pháp chuyển đổi số toàn diện từ")}{" "}
              <Link href="/dich-vu/thiet-ke-website">{tr("thiết kế website")}</Link>{" "}
              {tr("đến")}{" "}
              <Link href="/dich-vu/phat-trien-ai">{tr("phát triển trí tuệ nhân tạo AI")}</Link>{" "}
              {tr("cho cả startup và các tập đoàn lớn. Đội ngũ chúng tôi làm chủ hệ sinh thái công nghệ đa dạng bao gồm Front-end, Back-end, AI và")}{" "}
              <Link href="/dich-vu/phat-trien-devops">DevOps</Link>{" "}
              {tr("để sẵn sàng tiếp nhận mọi quy mô dự án.")}
            </p>
            <p>
              {tr("Chúng tôi đặc biệt có thế mạnh và không ngại khó khăn trong việc giải quyết các hệ thống phần mềm phức tạp với chi phí tối ưu nhất. Tất cả nhân viên tại SoftBuild đều được đào tạo bài bản và có nhiều năm kinh nghiệm thực chiến, đảm bảo mang đến cho khách hàng")}{" "}
              <Link href="/case-studies">{tr("những sản phẩm chất lượng")}</Link>{" "}
              {tr("cao và vận hành ổn định nhất.")}
            </p>
          </Reveal>
          <Reveal className={shared.aboutImage} direction="right" distance={28} delay={90} amount={0.05}>
            <Image
              src="/images/migrated/homenest-software/wp-content/uploads/2026/04/Every-Industry-Has-Its-Own-Language.jpg"
              alt="Công nghệ phát triển phần mềm SoftBuild"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </Reveal>
        </div>
      </div>
    </section>
    </LocalizedTree>
  );
}

function SolutionStacks() {
  return (
    <LocalizedTree>
    <section className={s.solutionsSection}>
      <div className={s.solutionsGlow} aria-hidden />
      <div className={s.solutionsContainer}>
        <Reveal className={s.solutionsHeader} amount={0.05}>
          <div className={s.pillLabel}>
            <span />
            Ứng dụng công nghệ
          </div>
          <h2 className={s.sectionTitle}>
            <span>Sử dụng công nghệ </span>
            <strong>trong chuyển đổi số</strong>
          </h2>
        </Reveal>

        <div className={s.solutionsGrid}>
          {solutionCards.map((card, index) => (
            <Reveal
              className={s.solutionReveal}
              key={card.title}
              delay={(index % 2) * 90}
              amount={0.04}
            >
              <Link href={card.href} className={s.solutionLink}>
                <div className={s.solutionCard}>
                  <h3>{card.title}</h3>
                  <span className={s.solutionDetail}>Chi tiết <span aria-hidden>→</span></span>
                  <div className={s.solutionImage}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={card.image} alt={card.title} loading="lazy" />
                    <div className={s.solutionDescWrapper}>
                      <p>{card.desc}</p>
                    </div>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
        <Reveal amount={0.01}>
          <Link href="/dich-vu" className={s.solutionsCta}>
            Xem tất cả giải pháp
          </Link>
        </Reveal>
      </div>
    </section>
    </LocalizedTree>
  );
}

function Benefits() {
  return (
    <LocalizedTree>
    <section className={`${shared.whySection} ${s.benefitsSection}`}>
      <div className={shared.whyContent}>
        <Reveal className={shared.whyHeader} amount={0.05}>
          <p className={shared.whyLabel}>
            <span className={shared.whyDot} />
            Giá trị của các công nghệ
          </p>
          <h2 className={shared.whyTitle}>
            <span className={shared.whyTitleLight}>Lý do SoftBuild</span>
            <span className={shared.whyTitleDark}>chọn những công nghệ này</span>
          </h2>
        </Reveal>
        <div className={shared.whyGrid}>
          {benefits.map((benefit, index) => (
            <Reveal
              className={shared.whyCard}
              key={benefit.title}
              delay={(index % 3) * 70}
              distance={20}
              amount={0.04}
            >
              <span className={shared.whyNumber}>{index + 1}</span>
              <Rocket className={shared.whyIcon} strokeWidth={1.5} aria-hidden />
              <div className={shared.whyText}>
                <h3 className={shared.whyCardTitle}>{benefit.title}</h3>
                <p className={shared.whyCardDesc}>{benefit.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
    </LocalizedTree>
  );
}

export function TechnologiesPage() {
  const tr = useAutoText();
  const groups = useLocalizedValue(technologyGroups);
  const localizedIndustries = useLocalizedValue(technologiesIndustries);
  const localizedFaq = useLocalizedValue(faqItems);
  return (
    <>
      <Hero />
      <About />
      <IndustriesCounters />
      {groups.map((group) => (
        <TechnologySection group={group} key={group.title} />
      ))}
      <SolutionStacks />
      <Benefits />
      <CTABanner
        label={tr("Liên hệ ngay!")}
        headline={tr("Chuyển hóa ý tưởng thành sản phẩm thực tế")}
        description={tr("Chia sẻ bài toán vận hành của bạn, đội ngũ SoftBuild sẽ phác thảo ngay nền tảng công nghệ phù hợp nhất. Xây dựng hệ thống nhanh chóng, bảo mật chặt chẽ và cam kết bạn sẽ sở hữu 100% mã nguồn.")}
        ctaLabel={tr("Bắt đầu dự án của bạn ngay!")}
        ctaHref="tel:+84971450454"
        image="/images/people/cta/softbuild/quan-ly-nam.png"
      />
      <IndustriesGrid9 data={localizedIndustries} tone="muted" />
      <section className={s.wikiSection}>
        <WikiRelated plainCta />
      </section>
      <FAQAccordion
        label={tr("Các câu hỏi thường gặp")}
        headline={[tr("Giải Đáp"), tr("Mọi"), tr("Thắc Mắc")]}
        intro={tr("Giải đáp chi tiết về kiến trúc hệ thống, tiêu chuẩn bảo mật và quyền sở hữu mã nguồn trong các dự án công nghệ tại SoftBuild.")}
        items={localizedFaq}
      />
    </>
  );
}
