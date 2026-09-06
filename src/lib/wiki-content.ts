import type { ContentPage } from "@/lib/site";
import generatedWiki from "@/_content/softbuild-wiki.generated.json";

type WikiSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

type WikiArticleInput = Omit<ContentPage, "contentHtml" | "contentText"> & {
  intro: string[];
  sections: WikiSection[];
  closing: string;
};

const IMAGE_ROOT = "/images/wiki/softbuild";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderArticle(input: WikiArticleInput): ContentPage {
  const intro = input.intro.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("");
  const sections = input.sections.map((section) => {
    const paragraphs = section.paragraphs
      .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
      .join("");
    const bullets = section.bullets?.length
      ? `<ul>${section.bullets.map((bullet) => `<li>${escapeHtml(bullet)}</li>`).join("")}</ul>`
      : "";
    return `<h2>${escapeHtml(section.heading)}</h2>${paragraphs}${bullets}`;
  }).join("");

  return {
    slug: input.slug,
    title: input.title,
    metaTitle: input.metaTitle,
    metaDescription: input.metaDescription,
    image: input.image,
    ogImage: input.image,
    category: input.category,
    author: input.author,
    year: input.year,
    contentText: input.metaDescription,
    contentHtml: `${intro}${sections}<h2>SoftBuild đồng hành cùng doanh nghiệp</h2><p>${escapeHtml(input.closing)}</p>`,
  };
}

const curatedSoftBuildWiki: ContentPage[] = [
  renderArticle({
    slug: "phat-trien-ai-chatbot-huong-dan-toan-dien-tu-a-z",
    title: "AI Chatbot Cho Doanh Nghiệp: Lộ Trình Từ Dữ Liệu Đến Vận Hành",
    metaTitle: "AI Chatbot cho doanh nghiệp: Lộ trình triển khai | SoftBuild",
    metaDescription: "Hướng dẫn xây dựng AI chatbot dựa trên mục tiêu kinh doanh, dữ liệu đáng tin cậy, cơ chế kiểm soát và quy trình cải tiến liên tục.",
    image: `${IMAGE_ROOT}/ai-chatbot-enterprise.png`,
    category: "AI",
    author: "SoftBuild Editorial",
    year: "2026",
    intro: [
      "AI chatbot chỉ tạo ra giá trị khi được đặt đúng vào hành trình khách hàng và kết nối với dữ liệu doanh nghiệp. Một giao diện trò chuyện đẹp nhưng thiếu thông tin chính xác, không có quy trình chuyển tiếp cho nhân viên hoặc không đo được hiệu quả sẽ nhanh chóng trở thành một kênh hỗ trợ tốn chi phí.",
      "Cách tiếp cận của SoftBuild bắt đầu từ bài toán vận hành, sau đó mới lựa chọn mô hình AI, kiến trúc dữ liệu và trải nghiệm hội thoại phù hợp. Nhờ vậy, chatbot có thể hỗ trợ khách hàng nhanh hơn mà vẫn giữ được tính nhất quán của thương hiệu.",
    ],
    sections: [
      {
        heading: "Bắt đầu từ mục tiêu có thể đo lường",
        paragraphs: [
          "Doanh nghiệp nên chọn một nhóm nhu cầu cụ thể như tra cứu chính sách, tư vấn sản phẩm, đặt lịch hoặc kiểm tra trạng thái đơn hàng. Phạm vi rõ ràng giúp đội dự án xác định dữ liệu cần thiết và đánh giá chất lượng bằng kết quả thực tế thay vì cảm giác.",
        ],
        bullets: ["Tỷ lệ câu hỏi được giải quyết ngay lần đầu", "Thời gian phản hồi trung bình", "Tỷ lệ chuyển tiếp đúng bộ phận", "Mức độ hài lòng sau hội thoại"],
      },
      {
        heading: "Chuẩn hóa dữ liệu trước khi đưa vào AI",
        paragraphs: [
          "Nguồn dữ liệu cần có chủ sở hữu, ngày cập nhật và phạm vi áp dụng. Tài liệu trùng lặp hoặc mâu thuẫn phải được xử lý trước khi lập chỉ mục để chatbot không đưa ra nhiều câu trả lời khác nhau cho cùng một vấn đề.",
          "Với dữ liệu nhạy cảm, hệ thống cần phân quyền theo vai trò, ghi nhật ký truy cập và chỉ cung cấp phần thông tin mà người dùng được phép xem.",
        ],
      },
      {
        heading: "Thiết kế luồng hội thoại có điểm kiểm soát",
        paragraphs: [
          "Chatbot cần biết khi nào nên hỏi thêm, khi nào nên từ chối và khi nào phải chuyển cho con người. Các chủ đề rủi ro cao như pháp lý, tài chính, y tế hoặc khiếu nại nên có quy tắc rõ ràng thay vì để mô hình tự quyết định hoàn toàn.",
        ],
        bullets: ["Thông báo rõ chatbot là hệ thống tự động", "Cho phép người dùng yêu cầu gặp nhân viên", "Không suy đoán khi thiếu dữ liệu", "Lưu phản hồi để cải tiến có kiểm soát"],
      },
      {
        heading: "Triển khai theo từng vòng nhỏ",
        paragraphs: [
          "Một bản thử nghiệm nội bộ giúp phát hiện câu hỏi khó, lỗ hổng dữ liệu và lỗi tích hợp trước khi mở rộng. Sau mỗi vòng, đội ngũ nên xem lại các cuộc hội thoại thất bại, bổ sung tài liệu và tinh chỉnh cách trả lời thay vì chỉ thay đổi prompt.",
        ],
      },
    ],
    closing: "SoftBuild xây dựng chatbot theo hướng tích hợp được với website, CRM, hệ thống nội bộ và quy trình chăm sóc khách hàng. Mỗi dự án đều có lớp kiểm soát dữ liệu, tiêu chí đánh giá và lộ trình mở rộng rõ ràng.",
  }),
  renderArticle({
    slug: "ui-ux-tam-quan-trong-cua-ui-ux-doi-voi-website",
    title: "UI/UX Website: Thiết Kế Trải Nghiệm Tạo Chuyển Đổi",
    metaTitle: "UI/UX website và hiệu quả chuyển đổi | SoftBuild",
    metaDescription: "Phân tích vai trò của UI, UX và quy trình thiết kế website dựa trên hành vi người dùng, mục tiêu kinh doanh và dữ liệu thực tế.",
    image: `${IMAGE_ROOT}/ui-ux-conversion.png`,
    category: "UIUX Design",
    author: "SoftBuild Design Team",
    year: "2026",
    intro: [
      "UI là phần người dùng nhìn thấy; UX là toàn bộ cảm nhận khi họ tìm kiếm thông tin, hoàn thành tác vụ và nhận phản hồi từ hệ thống. Hai phần này phải được thiết kế cùng nhau để website vừa đẹp, vừa dễ hiểu và phục vụ mục tiêu kinh doanh.",
      "Một website có hiệu ứng bắt mắt nhưng khiến người dùng mất nhiều bước để liên hệ vẫn là một trải nghiệm chưa tốt. Ngược lại, một luồng rất ngắn nhưng thiếu niềm tin và nhận diện thương hiệu cũng khó tạo chuyển đổi.",
    ],
    sections: [
      {
        heading: "Thiết kế bắt đầu từ hành trình người dùng",
        paragraphs: ["Trước khi dựng giao diện, đội ngũ cần xác định ai đang truy cập, họ muốn giải quyết việc gì và thông tin nào giúp họ ra quyết định. Bản đồ hành trình cho thấy điểm chạm quan trọng, câu hỏi thường gặp và các trở ngại cần loại bỏ."],
        bullets: ["Tìm dịch vụ phù hợp", "So sánh năng lực và bằng chứng", "Nhận báo giá hoặc đặt lịch", "Quay lại theo dõi thông tin đã gửi"],
      },
      {
        heading: "Xây dựng hệ thống giao diện nhất quán",
        paragraphs: ["Design system giúp màu sắc, khoảng cách, typography và trạng thái tương tác được sử dụng nhất quán. Điều này rút ngắn thời gian phát triển, giảm lỗi và tạo cảm giác chuyên nghiệp trên mọi trang."],
      },
      {
        heading: "Tối ưu hiệu suất là một phần của UX",
        paragraphs: ["Tốc độ tải, độ ổn định khi cuộn và khả năng hiển thị trên thiết bị nhỏ ảnh hưởng trực tiếp đến trải nghiệm. Ảnh cần được tối ưu, font được tải hợp lý và các hiệu ứng phải có phương án giảm chuyển động cho người dùng cần hỗ trợ."],
        bullets: ["Ưu tiên nội dung xuất hiện đầu tiên", "Hạn chế tài nguyên chặn hiển thị", "Kiểm tra bàn phím và trình đọc màn hình", "Theo dõi chỉ số trải nghiệm thực tế"],
      },
      {
        heading: "Đo lường và cải tiến sau khi ra mắt",
        paragraphs: ["Thiết kế không kết thúc ở thời điểm bàn giao. Dữ liệu tìm kiếm, tỷ lệ hoàn thành biểu mẫu, điểm rời trang và phản hồi trực tiếp cho biết phần nào đang gây khó khăn. Mỗi thay đổi nên gắn với một giả thuyết và chỉ số đánh giá."],
      },
    ],
    closing: "SoftBuild kết hợp nghiên cứu người dùng, thiết kế hệ thống và phát triển frontend để biến giao diện thành công cụ kinh doanh có thể đo lường, duy trì và mở rộng.",
  }),
  renderArticle({
    slug: "cam-nang-trien-khai-crm-hieu-qua-nhung-luu-y-khong-the-bo-qua",
    title: "Triển Khai CRM Hiệu Quả: Từ Quy Trình Đến Dữ Liệu",
    metaTitle: "Cẩm nang triển khai CRM hiệu quả | SoftBuild",
    metaDescription: "Cẩm nang giúp doanh nghiệp triển khai CRM theo quy trình thực tế, chuẩn hóa dữ liệu, thúc đẩy người dùng nội bộ và đo lường hiệu quả.",
    image: `${IMAGE_ROOT}/crm-implementation.png`,
    category: "Phần mềm",
    author: "SoftBuild Solution Team",
    year: "2026",
    intro: [
      "CRM không phải là nơi nhập càng nhiều dữ liệu càng tốt. Giá trị của hệ thống nằm ở khả năng giúp đội bán hàng nhìn thấy cơ hội, phối hợp chăm sóc và ra quyết định dựa trên lịch sử tương tác đầy đủ.",
      "Nhiều dự án CRM thất bại vì số hóa nguyên trạng một quy trình chưa hợp lý. Trước khi cấu hình phần mềm, doanh nghiệp cần thống nhất cách vận hành và trách nhiệm của từng vai trò.",
    ],
    sections: [
      {
        heading: "Vẽ lại quy trình trước khi cấu hình",
        paragraphs: ["Hãy mô tả cách khách hàng đi từ nguồn tiếp cận đến cơ hội, báo giá, hợp đồng và chăm sóc sau bán. Mỗi giai đoạn cần tiêu chí bắt đầu, tiêu chí hoàn thành và người chịu trách nhiệm."],
        bullets: ["Nguồn tạo khách hàng tiềm năng", "Quy tắc phân công", "Mốc chăm sóc bắt buộc", "Điều kiện chuyển trạng thái", "Cơ chế xử lý dữ liệu trùng"],
      },
      {
        heading: "Thiết kế mô hình dữ liệu vừa đủ",
        paragraphs: ["Chỉ nên thu thập trường dữ liệu phục vụ quyết định hoặc tự động hóa. Danh mục quá dài làm giảm chất lượng nhập liệu, trong khi dữ liệu quan trọng bị bỏ trống. Các trường cần có định nghĩa và chuẩn định dạng rõ ràng."],
      },
      {
        heading: "Tích hợp theo luồng công việc thực",
        paragraphs: ["CRM thường cần kết nối website, tổng đài, email, kế toán hoặc hệ thống đơn hàng. Thay vì tích hợp mọi thứ cùng lúc, nên ưu tiên các kết nối loại bỏ thao tác lặp và giúp dữ liệu khách hàng liền mạch nhất."],
      },
      {
        heading: "Quản trị thay đổi và đo mức sử dụng",
        paragraphs: ["Đào tạo phải bám vào tình huống hàng ngày của từng nhóm. Sau khi vận hành, quản lý nên theo dõi độ đầy đủ dữ liệu, thời gian xử lý cơ hội và tỷ lệ sử dụng tính năng để điều chỉnh quy trình."],
        bullets: ["Thí điểm với một nhóm nhỏ", "Cử người phụ trách dữ liệu", "Tạo tài liệu thao tác ngắn", "Họp cải tiến định kỳ"],
      },
    ],
    closing: "SoftBuild tư vấn và phát triển CRM theo quy trình riêng của doanh nghiệp, từ khảo sát nghiệp vụ, kiến trúc dữ liệu đến tích hợp và hỗ trợ sau triển khai.",
  }),
  renderArticle({
    slug: "wordpress-la-gi-uu-nhuoc-diem-tai-sao-nen-dung-de-thiet-ke-web",
    title: "WordPress Có Phù Hợp Với Website Doanh Nghiệp?",
    metaTitle: "Khi nào nên dùng WordPress cho website doanh nghiệp? | SoftBuild",
    metaDescription: "Đánh giá WordPress theo nhu cầu nội dung, hiệu suất, bảo mật, khả năng mở rộng và tổng chi phí sở hữu của website doanh nghiệp.",
    image: `${IMAGE_ROOT}/wordpress-enterprise.png`,
    category: "Website",
    author: "SoftBuild Web Team",
    year: "2026",
    intro: [
      "WordPress là một hệ quản trị nội dung linh hoạt, phù hợp với nhiều website giới thiệu, tin tức, landing page và thương mại điện tử quy mô vừa. Tuy nhiên, lựa chọn nền tảng nên dựa trên cách doanh nghiệp vận hành nội dung chứ không chỉ dựa vào độ phổ biến.",
      "Một hệ thống được cấu hình gọn, cập nhật đều và có quy trình quản trị tốt có thể hoạt động ổn định lâu dài. Ngược lại, việc cài quá nhiều plugin và thiếu kiểm soát thay đổi sẽ tạo ra rủi ro hiệu suất lẫn bảo mật.",
    ],
    sections: [
      {
        heading: "Trường hợp WordPress phát huy tốt",
        paragraphs: ["Nền tảng phù hợp khi đội nội dung cần tự chủ cập nhật bài viết, trang dịch vụ và chiến dịch marketing. Hệ sinh thái phong phú giúp rút ngắn thời gian triển khai những chức năng phổ biến."],
        bullets: ["Website doanh nghiệp nhiều nội dung", "Blog và trung tâm kiến thức", "Landing page theo chiến dịch", "Cửa hàng có quy trình tiêu chuẩn"],
      },
      {
        heading: "Những giới hạn cần tính trước",
        paragraphs: ["Các quy trình nghiệp vụ phức tạp, yêu cầu thời gian thực cao hoặc tích hợp sâu có thể phù hợp hơn với kiến trúc tùy chỉnh. Doanh nghiệp cũng cần tính chi phí bảo trì plugin, kiểm thử tương thích và xử lý bảo mật."],
      },
      {
        heading: "Kiến trúc vận hành an toàn",
        paragraphs: ["Môi trường phát triển, thử nghiệm và production nên tách biệt. Bản sao lưu phải được kiểm tra khả năng khôi phục, tài khoản quản trị dùng xác thực đa yếu tố và mọi plugin đều có chủ sở hữu chịu trách nhiệm cập nhật."],
        bullets: ["Giới hạn quyền quản trị", "Bật tường lửa ứng dụng", "Theo dõi thay đổi tệp", "Tối ưu cache và ảnh", "Kiểm tra định kỳ"],
      },
      {
        heading: "Đánh giá bằng tổng chi phí sở hữu",
        paragraphs: ["Chi phí không chỉ gồm thiết kế ban đầu mà còn có hosting, bản quyền, bảo trì, hỗ trợ và thời gian đội nội bộ. So sánh trên vòng đời ba đến năm năm sẽ cho quyết định thực tế hơn."],
      },
    ],
    closing: "SoftBuild đánh giá yêu cầu trước khi đề xuất WordPress, headless CMS hoặc nền tảng tùy chỉnh, giúp doanh nghiệp chọn đúng kiến trúc thay vì chạy theo công nghệ.",
  }),
  renderArticle({
    slug: "phat-trien-mvp-cho-startup-huong-dan-chi-tiet",
    title: "Phát Triển MVP Cho Startup: Kiểm Chứng Nhanh, Mở Rộng Đúng",
    metaTitle: "Phát triển MVP cho startup từ ý tưởng đến thị trường | SoftBuild",
    metaDescription: "Lộ trình xây dựng MVP giúp startup kiểm chứng giả thuyết, ưu tiên tính năng, đo phản hồi và chuẩn bị nền tảng kỹ thuật để mở rộng.",
    image: `${IMAGE_ROOT}/startup-mvp.png`,
    category: "Startups",
    author: "SoftBuild Product Team",
    year: "2026",
    intro: [
      "MVP không phải là phiên bản làm sơ sài của một sản phẩm lớn. Đó là phiên bản nhỏ nhất đủ để kiểm chứng một giả thuyết quan trọng với người dùng thật và tạo dữ liệu cho quyết định tiếp theo.",
      "Một MVP tốt cân bằng giữa tốc độ, độ tin cậy và khả năng học hỏi. Startup cần chủ động cắt bỏ phần chưa cần thiết nhưng không nên hy sinh các yếu tố nền tảng như bảo mật, đo lường và trải nghiệm cốt lõi.",
    ],
    sections: [
      {
        heading: "Chuyển ý tưởng thành giả thuyết",
        paragraphs: ["Hãy mô tả rõ nhóm người dùng, vấn đề họ gặp, hành vi mong muốn và bằng chứng sẽ chứng minh giải pháp có giá trị. Giả thuyết càng cụ thể, phạm vi MVP càng dễ kiểm soát."],
      },
      {
        heading: "Ưu tiên theo hành trình cốt lõi",
        paragraphs: ["Tính năng được giữ lại phải phục vụ trực tiếp hành trình tạo giá trị. Các tiện ích quản trị nâng cao, tùy biến sâu hoặc tự động hóa chưa ảnh hưởng đến phép thử có thể lùi sang giai đoạn sau."],
        bullets: ["Bắt buộc để hoàn thành tác vụ", "Cần để đo kết quả", "Cần để vận hành an toàn", "Có thể làm thủ công trong giai đoạn thử nghiệm"],
      },
      {
        heading: "Đo phản hồi thay vì đếm lượt tải",
        paragraphs: ["Chỉ số tốt phải gắn với hành vi sử dụng lặp lại, thời gian đạt giá trị và mức sẵn sàng trả phí. Phỏng vấn định tính giúp giải thích vì sao người dùng dừng lại hoặc tiếp tục."],
      },
      {
        heading: "Chuẩn bị cho vòng mở rộng",
        paragraphs: ["Ngay từ đầu, đội kỹ thuật cần ghi lại giả định kiến trúc, điểm nợ kỹ thuật và điều kiện phải tái cấu trúc. Điều này giúp startup mở rộng có chủ đích khi tín hiệu thị trường đủ mạnh."],
        bullets: ["Theo dõi hiệu suất", "Thiết lập sao lưu", "Quản lý cấu hình môi trường", "Tách lớp dữ liệu quan trọng", "Duy trì nhật ký quyết định"],
      },
    ],
    closing: "SoftBuild đồng hành từ workshop sản phẩm, prototype, phát triển MVP đến tối ưu sau thử nghiệm, giúp startup sử dụng ngân sách cho những giả thuyết có giá trị nhất.",
  }),
  renderArticle({
    slug: "javascript-la-gi-ly-do-nen-dung-javascript-khi-thiet-ke-website",
    title: "JavaScript Trong Website Hiện Đại: Kiến Trúc Và Hiệu Suất",
    metaTitle: "JavaScript cho website hiện đại: kiến trúc và hiệu suất | SoftBuild",
    metaDescription: "Góc nhìn thực tiễn về JavaScript, kiến trúc frontend, hiệu suất tải trang, bảo mật và cách lựa chọn công nghệ phù hợp cho website.",
    image: `${IMAGE_ROOT}/javascript-modern-web.png`,
    category: "Website",
    author: "SoftBuild Engineering",
    year: "2026",
    intro: [
      "JavaScript cho phép website phản hồi tức thời, xử lý dữ liệu trên trình duyệt và tạo nên các trải nghiệm tương tác phong phú. Nhưng nếu dùng thiếu kiểm soát, lượng mã tải xuống và công việc trên luồng chính có thể làm trang chậm hơn đáng kể.",
      "Câu hỏi quan trọng không phải là có dùng JavaScript hay không, mà là dùng ở đâu, bao nhiêu và theo mô hình kiến trúc nào để phù hợp với mục tiêu của sản phẩm.",
    ],
    sections: [
      {
        heading: "Chọn mức độ tương tác phù hợp",
        paragraphs: ["Trang nội dung nên ưu tiên HTML được dựng sẵn và chỉ kích hoạt JavaScript cho phần cần tương tác. Ứng dụng nghiệp vụ có thể cần trạng thái phía khách nhiều hơn, nhưng vẫn nên tách mã theo từng chức năng."],
      },
      {
        heading: "Quản lý hiệu suất từ kiến trúc",
        paragraphs: ["Hiệu suất tốt đến từ quyết định sớm: chia bundle hợp lý, tải lười thành phần nặng, tối ưu ảnh và hạn chế thư viện trùng chức năng. Kiểm tra trên thiết bị tầm trung và mạng chậm giúp phát hiện vấn đề thực tế."],
        bullets: ["Theo dõi kích thước JavaScript", "Giảm tác vụ dài", "Ưu tiên nội dung quan trọng", "Đo Core Web Vitals từ người dùng thật"],
      },
      {
        heading: "Bảo mật dữ liệu phía trình duyệt",
        paragraphs: ["Mọi dữ liệu gửi đến trình duyệt đều có thể bị người dùng xem. Khóa bí mật phải nằm ở máy chủ, dữ liệu nhập cần được kiểm tra ở cả client và server, đồng thời chính sách nội dung nên hạn chế script không đáng tin cậy."],
      },
      {
        heading: "Duy trì chất lượng khi sản phẩm lớn dần",
        paragraphs: ["TypeScript, kiểm thử tự động, lint và quy ước component giúp giảm lỗi khi nhiều nhóm cùng phát triển. Quan trọng hơn, đội ngũ cần một ranh giới rõ giữa logic giao diện, truy cập dữ liệu và nghiệp vụ."],
      },
    ],
    closing: "SoftBuild thiết kế frontend dựa trên mức độ tương tác thực tế, cân bằng trải nghiệm, khả năng bảo trì, SEO và hiệu suất thay vì phụ thuộc vào một framework duy nhất.",
  }),
  renderArticle({
    slug: "gemini-3-6-flash-va-google-antigravity-giai-phap-toi-uu-cho-lap-trinh",
    title: "AI Agent Trong Phát Triển Phần Mềm: Ứng Dụng An Toàn Và Hiệu Quả",
    metaTitle: "AI Agent trong phát triển phần mềm | SoftBuild",
    metaDescription: "Cách áp dụng AI agent vào phân tích yêu cầu, lập trình, kiểm thử và vận hành mà vẫn duy trì kiểm soát chất lượng, bảo mật và trách nhiệm kỹ thuật.",
    image: `${IMAGE_ROOT}/ai-agent-software.png`,
    category: "AI",
    author: "SoftBuild AI Lab",
    year: "2026",
    intro: [
      "AI agent có thể hỗ trợ đọc tài liệu, đề xuất thay đổi, tạo kiểm thử và tổng hợp kết quả từ nhiều công cụ. Giá trị lớn nhất nằm ở việc rút ngắn vòng phản hồi, không phải thay thế hoàn toàn phán đoán của kỹ sư.",
      "Khi agent được cấp quyền truy cập mã nguồn và môi trường chạy, doanh nghiệp cần coi đây là một thành phần có đặc quyền. Mọi hành động phải có phạm vi, nhật ký và điểm phê duyệt phù hợp với mức rủi ro.",
    ],
    sections: [
      {
        heading: "Chọn tác vụ có đầu vào và đầu ra rõ",
        paragraphs: ["Các tác vụ phù hợp thường có tiêu chí hoàn thành kiểm chứng được: tạo test cho hàm hiện có, phân loại lỗi, cập nhật tài liệu hoặc đề xuất bản vá nhỏ. Tác vụ mơ hồ dễ tạo ra thay đổi rộng và khó đánh giá."],
      },
      {
        heading: "Thiết kế quyền theo nguyên tắc tối thiểu",
        paragraphs: ["Agent chỉ nên đọc và ghi trong phạm vi cần thiết. Quyền triển khai, truy cập production, bí mật và dữ liệu khách hàng phải được tách khỏi môi trường mặc định."],
        bullets: ["Sandbox cho thử nghiệm", "Danh sách công cụ được phép", "Phê duyệt trước thao tác rủi ro", "Nhật ký đầu vào và hành động"],
      },
      {
        heading: "Đánh giá bằng chất lượng vòng đời",
        paragraphs: ["Số dòng mã sinh ra không phản ánh hiệu quả. Hãy đo thời gian hoàn thành, tỷ lệ test đạt, lỗi quay lại, thời gian review và mức độ chấp nhận của kỹ sư."],
      },
      {
        heading: "Xây dựng vòng phản hồi có con người",
        paragraphs: ["Agent nên trình bày giả định, thay đổi và bằng chứng kiểm thử để người review hiểu được quyết định. Các lỗi lặp lại cần được chuyển thành quy tắc hoặc bộ đánh giá thay vì chỉ sửa từng lần."],
      },
    ],
    closing: "SoftBuild xây dựng quy trình AI-assisted development có kiểm soát, tích hợp vào công cụ hiện có và ưu tiên chất lượng phần mềm lâu dài.",
  }),
  renderArticle({
    slug: "cong-nghe-blockchain-trong-y-te-loi-ich-va-ung-dung-thuc-tien",
    title: "Blockchain Trong Y Tế: Khi Nào Thực Sự Nên Dùng?",
    metaTitle: "Blockchain trong y tế: ứng dụng và giới hạn | SoftBuild",
    metaDescription: "Phân tích các trường hợp blockchain có thể tạo giá trị trong y tế, cùng yêu cầu về quyền riêng tư, tích hợp và quản trị dữ liệu.",
    image: `${IMAGE_ROOT}/blockchain-healthcare.png`,
    category: "Blockchain",
    author: "SoftBuild Research",
    year: "2026",
    intro: [
      "Y tế cần chia sẻ thông tin giữa nhiều tổ chức nhưng đồng thời phải bảo vệ dữ liệu cá nhân. Blockchain có thể hỗ trợ truy vết và đồng thuận trong một số mô hình liên tổ chức, nhưng không phải là nơi phù hợp để lưu trực tiếp toàn bộ hồ sơ bệnh án.",
      "Quyết định ứng dụng cần bắt đầu từ vấn đề về niềm tin, kiểm toán hoặc phối hợp dữ liệu. Nếu một cơ sở dữ liệu tập trung có chủ sở hữu rõ ràng đã giải quyết tốt, blockchain có thể chỉ làm tăng độ phức tạp.",
    ],
    sections: [
      {
        heading: "Những trường hợp có thể phù hợp",
        paragraphs: ["Các mạng có nhiều bên độc lập, cần cùng xác nhận sự kiện và không muốn một bên duy nhất kiểm soát toàn bộ lịch sử là ứng viên đáng xem xét."],
        bullets: ["Truy xuất nguồn gốc thuốc", "Quản lý đồng thuận nghiên cứu", "Kiểm toán quyền truy cập", "Đối soát giữa các tổ chức"],
      },
      {
        heading: "Tách dữ liệu nhạy cảm khỏi chuỗi",
        paragraphs: ["Thông tin nhận dạng và dữ liệu lâm sàng nên được lưu trong hệ thống đáp ứng yêu cầu bảo mật. Blockchain chỉ nên giữ bằng chứng, mã tham chiếu hoặc dấu vân tay dữ liệu để kiểm chứng tính toàn vẹn."],
      },
      {
        heading: "Khả năng tích hợp quyết định thành công",
        paragraphs: ["Giải pháp phải làm việc được với hệ thống bệnh viện, tiêu chuẩn trao đổi dữ liệu và quy trình hiện có. Một lớp blockchain đứng riêng không giúp nhân viên y tế giảm thao tác hoặc cải thiện chất lượng chăm sóc."],
      },
      {
        heading: "Đánh giá rủi ro quản trị",
        paragraphs: ["Cần xác định ai vận hành nút mạng, ai có quyền thay đổi quy tắc, cách xử lý dữ liệu sai và phương án khi một thành viên rời mạng. Đây là bài toán tổ chức quan trọng không kém công nghệ."],
      },
    ],
    closing: "SoftBuild thực hiện đánh giá tính phù hợp trước khi đề xuất blockchain, đảm bảo giải pháp tập trung vào hiệu quả phối hợp, bảo mật và khả năng vận hành thực tế.",
  }),
  renderArticle({
    slug: "top-10-phan-mem-crm-y-te-tot-nhat-cho-benh-vien-va-phong-kham",
    title: "Chọn CRM Y Tế: Bộ Tiêu Chí Cho Bệnh Viện Và Phòng Khám",
    metaTitle: "Cách chọn CRM y tế cho bệnh viện và phòng khám | SoftBuild",
    metaDescription: "Bộ tiêu chí đánh giá CRM y tế dựa trên hành trình bệnh nhân, tích hợp hệ thống, bảo mật, tự động hóa và khả năng vận hành lâu dài.",
    image: `${IMAGE_ROOT}/healthcare-crm.png`,
    category: "Giải pháp Doanh nghiệp",
    author: "SoftBuild Solution Team",
    year: "2026",
    intro: [
      "CRM y tế cần hỗ trợ mối quan hệ với bệnh nhân trước, trong và sau quá trình sử dụng dịch vụ. Hệ thống không thay thế phần mềm quản lý bệnh viện mà bổ sung lớp giao tiếp, chăm sóc, phân nhóm và đo lường trải nghiệm.",
      "Thay vì chọn theo danh sách tính năng dài, cơ sở y tế nên đánh giá khả năng phù hợp với hành trình bệnh nhân, yêu cầu bảo mật và nguồn lực vận hành nội bộ.",
    ],
    sections: [
      {
        heading: "Bám sát hành trình bệnh nhân",
        paragraphs: ["CRM cần ghi nhận nguồn tiếp cận, nhu cầu, lịch hẹn, nhắc tái khám và phản hồi sau dịch vụ mà không tạo thêm thao tác trùng cho nhân viên."],
        bullets: ["Đặt và đổi lịch", "Nhắc hẹn đa kênh", "Phân nhóm chăm sóc", "Theo dõi phản hồi", "Quản lý chiến dịch phù hợp"],
      },
      {
        heading: "Tích hợp thay vì tạo kho dữ liệu mới",
        paragraphs: ["Dữ liệu định danh, lịch sử dịch vụ và trạng thái thanh toán thường nằm ở nhiều hệ thống. CRM cần có API và cơ chế đồng bộ rõ ràng để tránh bản ghi mâu thuẫn."],
      },
      {
        heading: "Bảo mật và quyền riêng tư theo vai trò",
        paragraphs: ["Nhân viên chăm sóc, bác sĩ và quản lý có nhu cầu truy cập khác nhau. Hệ thống phải hỗ trợ phân quyền chi tiết, nhật ký truy cập, mã hóa và chính sách lưu trữ phù hợp."],
      },
      {
        heading: "Đánh giá khả năng vận hành dài hạn",
        paragraphs: ["Hãy xem xét khả năng tùy biến quy trình, chất lượng hỗ trợ, phương án sao lưu, thời gian khôi phục và chi phí khi số lượng người dùng tăng. Một bản thử nghiệm với dữ liệu giả giúp kiểm chứng trước khi ký hợp đồng dài hạn."],
      },
    ],
    closing: "SoftBuild thiết kế CRM y tế theo luồng vận hành thực tế, ưu tiên tích hợp an toàn và trải nghiệm liền mạch cho cả bệnh nhân lẫn đội ngũ chăm sóc.",
  }),
  renderArticle({
    slug: "co-che-hoat-dong-cua-chatbot-dinh-huong-tac-vu",
    title: "Chatbot Định Hướng Tác Vụ: Kiến Trúc Và Cách Triển Khai",
    metaTitle: "Chatbot định hướng tác vụ: kiến trúc triển khai | SoftBuild",
    metaDescription: "Giải thích cách chatbot định hướng tác vụ nhận diện ý định, thu thập dữ liệu, gọi hệ thống nghiệp vụ và xử lý ngoại lệ an toàn.",
    image: `${IMAGE_ROOT}/task-oriented-chatbot.png`,
    category: "AI",
    author: "SoftBuild AI Lab",
    year: "2026",
    intro: [
      "Chatbot định hướng tác vụ được thiết kế để giúp người dùng hoàn thành một việc cụ thể như đặt lịch, tra cứu đơn hàng hoặc gửi yêu cầu hỗ trợ. Khác với trò chuyện mở, hệ thống cần quản lý trạng thái và đảm bảo đủ dữ liệu trước khi thực hiện hành động.",
      "Độ tin cậy của chatbot phụ thuộc nhiều vào thiết kế luồng và tích hợp backend hơn là khả năng tạo câu văn tự nhiên.",
    ],
    sections: [
      {
        heading: "Bốn lớp chính của hệ thống",
        paragraphs: ["Một kiến trúc thực tế thường gồm lớp kênh giao tiếp, hiểu ý định, quản lý hội thoại và tích hợp nghiệp vụ. Mỗi lớp có thể thay đổi độc lập khi doanh nghiệp mở thêm kênh hoặc quy trình."],
        bullets: ["Kênh web, app hoặc mạng xã hội", "Nhận diện ý định và thực thể", "Trạng thái hội thoại", "API nghiệp vụ và thông báo kết quả"],
      },
      {
        heading: "Quản lý dữ liệu đầu vào",
        paragraphs: ["Chatbot cần xác thực định dạng, hỏi lại khi thông tin mơ hồ và tránh ghi dữ liệu khi người dùng chưa xác nhận. Những trường quan trọng nên được hiển thị lại trước bước gửi cuối cùng."],
      },
      {
        heading: "Thiết kế ngoại lệ và chuyển tiếp",
        paragraphs: ["Không phải mọi cuộc hội thoại đều đi theo luồng chuẩn. Hệ thống phải xử lý người dùng đổi ý, cung cấp thông tin sai, mất kết nối hoặc yêu cầu ngoài phạm vi."],
        bullets: ["Cho phép quay lại bước trước", "Không lặp câu hỏi đã có dữ liệu", "Giải thích lỗi bằng ngôn ngữ dễ hiểu", "Chuyển lịch sử cho nhân viên hỗ trợ"],
      },
      {
        heading: "Kiểm thử bằng hội thoại thật",
        paragraphs: ["Bộ test nên bao gồm nhiều cách diễn đạt, lỗi chính tả, câu hỏi xen ngang và tình huống bỏ dở. Sau khi ra mắt, các điểm rơi phổ biến cần được phân tích để tinh chỉnh luồng."],
      },
    ],
    closing: "SoftBuild phát triển chatbot tác vụ gắn với hệ thống nghiệp vụ, có kiểm soát dữ liệu và cơ chế chuyển tiếp để doanh nghiệp tự động hóa mà không làm giảm chất lượng phục vụ.",
  }),
  renderArticle({
    slug: "loi-ich-cua-app-y-te-doi-voi-benh-nhan-va-bac-si",
    title: "Ứng Dụng Y Tế: Giá Trị Cho Bệnh Nhân, Bác Sĩ Và Vận Hành",
    metaTitle: "Lợi ích và nguyên tắc phát triển ứng dụng y tế | SoftBuild",
    metaDescription: "Phân tích giá trị của ứng dụng y tế đối với bệnh nhân, bác sĩ và cơ sở vận hành, cùng các yêu cầu về bảo mật và trải nghiệm.",
    image: `${IMAGE_ROOT}/healthcare-mobile-app.png`,
    category: "Mobile App",
    author: "SoftBuild Product Team",
    year: "2026",
    intro: [
      "Ứng dụng y tế có thể rút ngắn nhiều bước trong hành trình chăm sóc: tìm dịch vụ, đặt lịch, nhận hướng dẫn, theo dõi hồ sơ và trao đổi sau khám. Giá trị chỉ xuất hiện khi ứng dụng kết nối trơn tru với quy trình tại cơ sở y tế.",
      "Thiết kế phải ưu tiên sự rõ ràng, khả năng tiếp cận và quyền riêng tư. Người dùng có thể ở nhiều độ tuổi, trạng thái sức khỏe và mức độ thành thạo công nghệ khác nhau.",
    ],
    sections: [
      {
        heading: "Giá trị đối với bệnh nhân",
        paragraphs: ["Thông tin minh bạch và thao tác đơn giản giúp người dùng chủ động hơn. Các chức năng nhắc lịch, hướng dẫn chuẩn bị và kết quả theo dõi cần được trình bày đúng thời điểm."],
        bullets: ["Đặt lịch thuận tiện", "Nhận thông báo cần thiết", "Theo dõi hồ sơ được phép", "Tiếp cận hỗ trợ sau dịch vụ"],
      },
      {
        heading: "Giá trị đối với bác sĩ và nhân viên",
        paragraphs: ["Ứng dụng nên giảm cuộc gọi lặp, hạn chế nhập lại dữ liệu và cung cấp thông tin có cấu trúc trước buổi khám. Mọi dữ liệu người dùng gửi cần được phân loại và đưa đúng vào quy trình chuyên môn."],
      },
      {
        heading: "Bảo mật theo thiết kế",
        paragraphs: ["Dữ liệu y tế cần được mã hóa, phân quyền và ghi nhận truy cập. Ứng dụng không nên hiển thị thông tin nhạy cảm trên màn hình khóa hoặc lưu trữ cục bộ lâu hơn cần thiết."],
        bullets: ["Xác thực phù hợp mức rủi ro", "Quản lý phiên đăng nhập", "Thu hồi quyền truy cập", "Cơ chế báo sự cố", "Kiểm thử bảo mật định kỳ"],
      },
      {
        heading: "Đo hiệu quả vận hành",
        paragraphs: ["Các chỉ số nên phản ánh kết quả như tỷ lệ đặt lịch thành công, số cuộc hẹn bị bỏ, thời gian xử lý yêu cầu và mức hài lòng. Lượt tải ứng dụng chỉ là chỉ số khởi đầu."],
      },
    ],
    closing: "SoftBuild phát triển ứng dụng y tế theo hướng lấy người dùng làm trung tâm, tích hợp với hệ thống hiện có và đặt bảo mật dữ liệu vào ngay từ kiến trúc.",
  }),
  renderArticle({
    slug: "chatbot-truy-xuat-dua-tren-du-lieu-la-gi-huong-dan-tu-a-z",
    title: "Chatbot RAG: Kết Nối AI Với Dữ Liệu Doanh Nghiệp",
    metaTitle: "Chatbot RAG và dữ liệu doanh nghiệp | SoftBuild",
    metaDescription: "Hướng dẫn kiến trúc chatbot RAG từ chuẩn hóa tài liệu, tìm kiếm ngữ nghĩa, tạo câu trả lời có nguồn đến đánh giá chất lượng.",
    image: `${IMAGE_ROOT}/rag-enterprise-data.png`,
    category: "AI",
    author: "SoftBuild AI Lab",
    year: "2026",
    intro: [
      "RAG kết hợp mô hình ngôn ngữ với khả năng truy xuất tài liệu doanh nghiệp. Thay vì trả lời chỉ từ kiến thức đã học, hệ thống tìm những đoạn liên quan và dùng chúng làm ngữ cảnh để tạo phản hồi.",
      "Cách tiếp cận này giúp cập nhật kiến thức nhanh hơn và có thể hiển thị nguồn tham khảo. Tuy nhiên, RAG không tự động bảo đảm câu trả lời đúng nếu dữ liệu hoặc cơ chế tìm kiếm chưa tốt.",
    ],
    sections: [
      {
        heading: "Chuẩn bị kho tri thức có quản trị",
        paragraphs: ["Mỗi tài liệu cần phiên bản, chủ sở hữu, phạm vi quyền và trạng thái hiệu lực. Việc chia đoạn phải giữ được ngữ cảnh thay vì cắt máy móc theo số ký tự."],
      },
      {
        heading: "Truy xuất đúng trước khi tạo câu trả lời",
        paragraphs: ["Hệ thống có thể kết hợp tìm kiếm từ khóa, vector và bộ lọc metadata. Kết quả nên được xếp hạng lại, loại nội dung trùng và chỉ gửi đủ ngữ cảnh cần thiết cho mô hình."],
        bullets: ["Lọc theo sản phẩm hoặc phòng ban", "Ưu tiên tài liệu còn hiệu lực", "Giữ liên kết nguồn", "Từ chối khi bằng chứng không đủ"],
      },
      {
        heading: "Bảo vệ dữ liệu theo người dùng",
        paragraphs: ["Quyền truy cập phải được áp dụng trước bước truy xuất, không chỉ sau khi mô hình đã nhận dữ liệu. Nhật ký cần cho biết tài liệu nào được dùng để tạo câu trả lời."],
      },
      {
        heading: "Đánh giá bằng bộ câu hỏi thực tế",
        paragraphs: ["Bộ đánh giá nên bao gồm câu hỏi đúng, câu hỏi mơ hồ, câu hỏi không có dữ liệu và các tình huống có tài liệu mâu thuẫn. Chất lượng cần được đo ở cả bước truy xuất lẫn câu trả lời cuối."],
      },
    ],
    closing: "SoftBuild xây dựng chatbot RAG từ nền tảng dữ liệu và quyền truy cập, giúp doanh nghiệp khai thác tri thức nội bộ an toàn, có căn cứ và dễ cải tiến.",
  }),
  renderArticle({
    slug: "blockchain-va-iot-toan-bo-kien-thuc-quan-trong-danh-cho-tech-leaders",
    title: "Blockchain Và IoT Cho Tech Leaders: Mô Hình Kết Hợp Và Rủi Ro",
    metaTitle: "Blockchain và IoT cho lãnh đạo công nghệ | SoftBuild",
    metaDescription: "Góc nhìn kiến trúc về cách kết hợp blockchain và IoT, từ danh tính thiết bị, tính toàn vẹn dữ liệu đến chi phí vận hành và quản trị mạng.",
    image: `${IMAGE_ROOT}/blockchain-iot.png`,
    category: "IoT",
    author: "SoftBuild Research",
    year: "2026",
    intro: [
      "IoT đưa dữ liệu từ thế giới vật lý vào hệ thống số, còn blockchain có thể cung cấp lớp bằng chứng và đồng thuận giữa nhiều bên. Sự kết hợp này phù hợp nhất khi các tổ chức cần chia sẻ lịch sử sự kiện nhưng không muốn phụ thuộc hoàn toàn vào một bên trung tâm.",
      "Blockchain không xác minh cảm biến có đo đúng hay không. Chất lượng thiết bị, danh tính, firmware và đường truyền vẫn là nền tảng của mọi giải pháp IoT đáng tin cậy.",
    ],
    sections: [
      {
        heading: "Kiến trúc phân lớp thực tế",
        paragraphs: ["Thiết bị gửi dữ liệu qua gateway hoặc nền tảng IoT. Chỉ các sự kiện hoặc bằng chứng cần kiểm toán mới được ghi lên sổ cái, trong khi dữ liệu chi tiết nằm ở kho lưu trữ phù hợp hơn."],
        bullets: ["Danh tính và chứng thư thiết bị", "Kênh truyền an toàn", "Kho dữ liệu vận hành", "Lớp bằng chứng bất biến", "Ứng dụng và báo cáo"],
      },
      {
        heading: "Trường hợp sử dụng có giá trị",
        paragraphs: ["Chuỗi cung ứng, bảo trì tài sản, chứng nhận nguồn gốc và chia sẻ dữ liệu giữa đối tác là những mô hình đáng xem xét. Điều kiện quan trọng là có nhiều bên cùng cần kiểm chứng lịch sử."],
      },
      {
        heading: "Rủi ro cần quản lý",
        paragraphs: ["Chi phí giao dịch, độ trễ, khóa thiết bị bị lộ và dữ liệu đầu vào sai có thể làm hệ thống mất giá trị. Cơ chế nâng cấp firmware và thu hồi danh tính phải được thiết kế ngay từ đầu."],
      },
      {
        heading: "Bắt đầu bằng thử nghiệm nhỏ",
        paragraphs: ["Một proof of concept nên kiểm tra toàn bộ hành trình từ thiết bị đến báo cáo, bao gồm tình huống mất mạng, dữ liệu trùng và thay đổi thành viên. Kết quả phải được so sánh với giải pháp tập trung đơn giản hơn."],
      },
    ],
    closing: "SoftBuild giúp doanh nghiệp đánh giá tính cần thiết của blockchain trong hệ thống IoT và xây dựng kiến trúc cân bằng giữa tính minh bạch, chi phí và khả năng vận hành.",
  }),
  renderArticle({
    slug: "flutter-so-voi-react-native-va-xamarin",
    title: "Flutter, React Native Hay Native: Chọn Nền Tảng Mobile Phù Hợp",
    metaTitle: "So sánh Flutter, React Native và Native | SoftBuild",
    metaDescription: "Khung đánh giá nền tảng phát triển mobile dựa trên trải nghiệm, tích hợp thiết bị, năng lực đội ngũ, vòng đời và chi phí sản phẩm.",
    image: `${IMAGE_ROOT}/cross-platform-mobile.png`,
    category: "Mobile App",
    author: "SoftBuild Mobile Team",
    year: "2026",
    intro: [
      "Không có framework mobile tốt nhất cho mọi dự án. Lựa chọn phụ thuộc vào trải nghiệm cần đạt, mức độ sử dụng tính năng thiết bị, năng lực đội ngũ và kế hoạch phát triển dài hạn.",
      "So sánh chỉ dựa trên tốc độ viết mã ban đầu dễ bỏ qua chi phí nâng cấp hệ điều hành, tích hợp SDK và xử lý vấn đề hiệu suất sau khi sản phẩm mở rộng.",
    ],
    sections: [
      {
        heading: "Đánh giá từ trải nghiệm sản phẩm",
        paragraphs: ["Ứng dụng có giao diện tiêu chuẩn và luồng dữ liệu phổ biến thường phù hợp với giải pháp đa nền tảng. Sản phẩm cần đồ họa nặng, tương tác đặc thù hoặc tích hợp sâu có thể hưởng lợi từ native."],
      },
      {
        heading: "So sánh theo năng lực vận hành",
        paragraphs: ["Đội ngũ cần xem xét khả năng tuyển dụng, kinh nghiệm hiện có, chất lượng thư viện và tốc độ phản hồi khi hệ điều hành thay đổi."],
        bullets: ["Khả năng chia sẻ mã", "Độ trưởng thành của plugin", "Công cụ kiểm thử", "Hiệu suất và kích thước ứng dụng", "Khả năng debug native"],
      },
      {
        heading: "Thiết kế biên tích hợp rõ ràng",
        paragraphs: ["Dù chọn framework nào, các tính năng như thanh toán, camera, định vị và thông báo cần được đóng gói sau lớp giao tiếp ổn định. Điều này giảm ảnh hưởng khi thay SDK hoặc nâng phiên bản."],
      },
      {
        heading: "Thử nghiệm phần khó trước",
        paragraphs: ["Prototype nên tập trung vào tác vụ có rủi ro cao nhất thay vì màn hình đơn giản. Một thử nghiệm nhỏ với thiết bị thật cho biết sớm framework có đáp ứng trải nghiệm mục tiêu hay không."],
      },
    ],
    closing: "SoftBuild lựa chọn kiến trúc mobile từ yêu cầu sản phẩm và vòng đời vận hành, giúp doanh nghiệp tránh quyết định theo xu hướng ngắn hạn.",
  }),
  renderArticle({
    slug: "lo-trinh-nghe-nghiep-software-engineer-cach-chon-huong-di-phu-hop-voi-ban",
    title: "Lộ Trình Software Engineer: Phát Triển Năng Lực Theo Sản Phẩm",
    metaTitle: "Lộ trình nghề nghiệp Software Engineer | SoftBuild",
    metaDescription: "Gợi ý xây dựng lộ trình Software Engineer dựa trên nền tảng kỹ thuật, năng lực giao tiếp, tư duy sản phẩm và khả năng chịu trách nhiệm.",
    image: `${IMAGE_ROOT}/software-engineer-career.png`,
    category: "Work Life",
    author: "SoftBuild Engineering",
    year: "2026",
    intro: [
      "Lộ trình nghề nghiệp của kỹ sư phần mềm không chỉ là danh sách ngôn ngữ cần học. Năng lực tăng trưởng khi bạn giải quyết được vấn đề lớn hơn, ra quyết định tốt hơn và giúp cả đội giao sản phẩm ổn định.",
      "Một hướng đi phù hợp nên kết hợp điểm mạnh cá nhân với loại vấn đề bạn muốn theo đuổi: trải nghiệm người dùng, hệ thống phân tán, dữ liệu, nền tảng hoặc quản lý kỹ thuật.",
    ],
    sections: [
      {
        heading: "Xây nền tảng trước khi chạy theo công cụ",
        paragraphs: ["Cấu trúc dữ liệu, mạng, cơ sở dữ liệu, kiểm thử và cách đọc lỗi là nền tảng chuyển được giữa nhiều công nghệ. Hiểu nguyên lý giúp kỹ sư thích nghi khi framework thay đổi."],
      },
      {
        heading: "Phát triển qua phạm vi trách nhiệm",
        paragraphs: ["Junior tập trung hoàn thành tác vụ có hướng dẫn. Mid-level tự làm rõ yêu cầu và chịu trách nhiệm một phần sản phẩm. Senior nhìn thấy rủi ro hệ thống, dẫn dắt quyết định và nâng năng lực người khác."],
        bullets: ["Chất lượng đầu ra", "Khả năng phân rã vấn đề", "Giao tiếp với bên liên quan", "Tác động đến đội ngũ", "Tư duy dài hạn"],
      },
      {
        heading: "Tạo vòng học tập từ công việc thật",
        paragraphs: ["Sau mỗi dự án, hãy ghi lại quyết định, lỗi khó và điều có thể làm khác. Code review, tài liệu kỹ thuật và chia sẻ nội bộ biến kinh nghiệm cá nhân thành năng lực chung."],
      },
      {
        heading: "Chọn chuyên sâu hay quản lý",
        paragraphs: ["Cả hai hướng đều cần kỹ năng lãnh đạo, nhưng cách tạo tác động khác nhau. Chuyên gia kỹ thuật dẫn dắt kiến trúc và tiêu chuẩn; quản lý tạo môi trường, ưu tiên và phối hợp để đội ngũ thành công."],
      },
    ],
    closing: "Tại SoftBuild, lộ trình phát triển gắn với dự án thực, phản hồi thường xuyên và mức độ sở hữu sản phẩm, giúp kỹ sư tiến bộ bằng giá trị tạo ra chứ không chỉ bằng thâm niên.",
  }),
  renderArticle({
    slug: "mot-ngay-lam-viec-cua-mot-backend-engineer-tai-softbuild",
    title: "Một Ngày Của Backend Engineer Tại SoftBuild",
    metaTitle: "Một ngày làm việc của Backend Engineer tại SoftBuild",
    metaDescription: "Khám phá cách Backend Engineer tại SoftBuild phân tích nghiệp vụ, thiết kế API, bảo vệ dữ liệu, review mã và phối hợp đưa sản phẩm vào vận hành.",
    image: `${IMAGE_ROOT}/backend-engineer-workday.png`,
    category: "Work Life",
    author: "SoftBuild People",
    year: "2026",
    intro: [
      "Một ngày của Backend Engineer không chỉ xoay quanh việc viết API. Công việc bắt đầu từ hiểu nhu cầu nghiệp vụ, đánh giá ảnh hưởng đến dữ liệu và phối hợp với frontend, QA, DevOps để thay đổi hoạt động ổn định.",
      "Nhịp làm việc tại SoftBuild ưu tiên trao đổi ngắn, thời gian tập trung sâu và bằng chứng kỹ thuật rõ ràng qua test, log và tài liệu quyết định.",
    ],
    sections: [
      {
        heading: "Buổi sáng: đồng bộ và xác định rủi ro",
        paragraphs: ["Đội ngũ cập nhật ngắn về tiến độ, trở ngại và thay đổi ưu tiên. Backend Engineer kiểm tra dashboard vận hành, pull request cần review và những phụ thuộc có thể ảnh hưởng đến công việc trong ngày."],
      },
      {
        heading: "Thời gian tập trung: thiết kế và hiện thực",
        paragraphs: ["Trước khi code, kỹ sư làm rõ hợp đồng API, luồng dữ liệu, quyền truy cập và tình huống lỗi. Thay đổi được chia nhỏ để dễ review và có thể triển khai an toàn."],
        bullets: ["Migration có phương án quay lui", "API có validation", "Log không chứa dữ liệu nhạy cảm", "Test bao phủ hành vi quan trọng"],
      },
      {
        heading: "Buổi chiều: review và phối hợp",
        paragraphs: ["Code review tập trung vào tính đúng, khả năng đọc và tác động vận hành. Kỹ sư phối hợp với QA tái hiện lỗi, với frontend thống nhất trạng thái và với DevOps kiểm tra cấu hình môi trường."],
      },
      {
        heading: "Kết thúc ngày bằng tri thức dùng lại được",
        paragraphs: ["Những quyết định khó được ghi vào tài liệu ngắn. Nếu phát hiện lỗi mang tính hệ thống, đội ngũ bổ sung test hoặc cảnh báo để ngăn vấn đề lặp lại."],
      },
    ],
    closing: "SoftBuild xây dựng môi trường kỹ thuật nơi mỗi thay đổi đều gắn với mục tiêu sản phẩm, trách nhiệm vận hành và cơ hội học hỏi của cả đội.",
  }),
  renderArticle({
    slug: "top-23-cong-ty-tu-van-cong-nghe-va-phan-mem-uy-tin-nhat",
    title: "Cách Chọn Đối Tác Tư Vấn Công Nghệ Và Phát Triển Phần Mềm",
    metaTitle: "Tiêu chí chọn đối tác tư vấn công nghệ | SoftBuild",
    metaDescription: "Bộ tiêu chí thực tế để đánh giá đối tác công nghệ qua năng lực khám phá bài toán, kiến trúc, bảo mật, quản trị dự án và hỗ trợ dài hạn.",
    image: `${IMAGE_ROOT}/technology-partner-selection.png`,
    category: "Giải pháp Doanh nghiệp",
    author: "SoftBuild Advisory",
    year: "2026",
    intro: [
      "Chọn đối tác công nghệ là quyết định ảnh hưởng đến dữ liệu, quy trình và tốc độ tăng trưởng trong nhiều năm. Danh mục công nghệ dài hoặc báo giá thấp chưa đủ chứng minh khả năng đưa sản phẩm vào vận hành.",
      "Một đối tác tốt cần hiểu bài toán kinh doanh, minh bạch rủi ro và giúp doanh nghiệp đưa ra quyết định có cơ sở ngay cả khi điều đó làm giảm phạm vi dự án ban đầu.",
    ],
    sections: [
      {
        heading: "Đánh giá năng lực khám phá bài toán",
        paragraphs: ["Trong giai đoạn đầu, đối tác nên đặt câu hỏi về người dùng, quy trình, dữ liệu và tiêu chí thành công. Đề xuất giải pháp quá nhanh khi chưa hiểu bối cảnh thường dẫn đến phạm vi thiếu chính xác."],
      },
      {
        heading: "Yêu cầu bằng chứng kỹ thuật",
        paragraphs: ["Case study cần cho thấy vấn đề, vai trò của đội ngũ, quyết định kiến trúc và kết quả. Với phần quan trọng, doanh nghiệp có thể yêu cầu workshop hoặc prototype nhỏ để đánh giá cách làm việc."],
        bullets: ["Tiêu chuẩn code review", "Chiến lược kiểm thử", "Cách quản lý bảo mật", "Quy trình triển khai", "Kế hoạch bàn giao"],
      },
      {
        heading: "So sánh phạm vi thay vì chỉ so giá",
        paragraphs: ["Hai báo giá có thể khác nhau vì giả định, chất lượng thiết kế, mức kiểm thử và hỗ trợ sau triển khai. Bảng so sánh nên chỉ rõ phần bao gồm, phần loại trừ và trách nhiệm của mỗi bên."],
      },
      {
        heading: "Kiểm tra khả năng đồng hành lâu dài",
        paragraphs: ["Hãy làm rõ quyền sở hữu mã nguồn, tài liệu, dữ liệu, thời gian phản hồi và phương án thay đổi đội ngũ. Một hệ thống tốt cần tiếp tục vận hành được khi dự án kết thúc."],
      },
    ],
    closing: "SoftBuild làm việc theo mô hình tư vấn minh bạch, xây dựng lộ trình theo giá trị và chuyển giao đầy đủ để doanh nghiệp luôn chủ động với tài sản số của mình.",
  }),
  renderArticle({
    slug: "work-life",
    title: "Work Life Tại SoftBuild: Nhịp Làm Việc Của Đội Ngũ Sản Phẩm",
    metaTitle: "Work Life và văn hóa sản phẩm tại SoftBuild",
    metaDescription: "Cách đội ngũ SoftBuild tổ chức công việc, phản hồi, học tập và phối hợp để duy trì chất lượng sản phẩm trong một môi trường bền vững.",
    image: `${IMAGE_ROOT}/softbuild-work-life.png`,
    category: "Work Life",
    author: "SoftBuild People",
    year: "2026",
    intro: [
      "Văn hóa làm việc của đội ngũ sản phẩm được thể hiện qua cách ra quyết định mỗi ngày: ưu tiên rõ ràng, giao tiếp thẳng thắn và tôn trọng thời gian tập trung. SoftBuild hướng đến nhịp làm việc bền vững thay vì phụ thuộc vào những giai đoạn quá tải kéo dài.",
      "Mỗi thành viên được khuyến khích hiểu tác động của công việc đến khách hàng, chủ động nêu rủi ro và chia sẻ kiến thức để cả đội tiến bộ cùng nhau.",
    ],
    sections: [
      {
        heading: "Mục tiêu rõ trước khi bắt đầu",
        paragraphs: ["Công việc được ưu tiên theo giá trị và rủi ro. Mỗi nhiệm vụ cần có bối cảnh, tiêu chí hoàn thành và người chịu trách nhiệm, giúp giảm thời gian chờ và hạn chế trao đổi vòng vo."],
      },
      {
        heading: "Không gian cho tập trung sâu",
        paragraphs: ["Các cuộc họp được gom và có mục tiêu cụ thể. Khung thời gian tập trung giúp kỹ sư, nhà thiết kế và người làm nội dung xử lý vấn đề phức tạp mà không bị gián đoạn liên tục."],
        bullets: ["Cập nhật bất đồng bộ", "Họp ngắn có quyết định", "Tài liệu hóa bối cảnh", "Tôn trọng giờ nghỉ"],
      },
      {
        heading: "Phản hồi dựa trên sản phẩm",
        paragraphs: ["Phản hồi tập trung vào tác động, bằng chứng và phương án cải thiện, không gắn lỗi với cá nhân. Review thiết kế và code là hoạt động học tập hai chiều."],
      },
      {
        heading: "Học tập trở thành một phần công việc",
        paragraphs: ["Sau mỗi cột mốc, đội ngũ nhìn lại điều hiệu quả và điều cần thay đổi. Những bài học quan trọng được chuyển thành checklist, template hoặc công cụ để dự án sau bắt đầu tốt hơn."],
      },
    ],
    closing: "SoftBuild xây dựng môi trường nơi chất lượng sản phẩm và sự phát triển của con người hỗ trợ lẫn nhau, tạo nền tảng cho những quan hệ hợp tác dài hạn.",
  }),
];

const curatedSlugs = new Set(curatedSoftBuildWiki.map((item) => item.slug));

export const softbuildWiki: ContentPage[] = [
  ...curatedSoftBuildWiki,
  ...(generatedWiki as ContentPage[]).filter((item) => !curatedSlugs.has(item.slug)),
];
