import { writeFile } from "node:fs/promises";
import path from "node:path";

const ENDPOINT = "https://homenest.com.vn/api/graphql";
const OUTPUT = path.resolve("src/_content/winterfrost-wiki.generated.json");
const PAGE_SIZE = 100;

const QUERY = `
  query WinterfrostWikiSource($first: Int!, $after: String) {
    posts(first: $first, after: $after) {
      nodes {
        title
        slug
        date
        categories { nodes { name slug } }
      }
      pageInfo { hasNextPage endCursor }
    }
  }
`;

const IMAGE_ROOT = "/images/wiki/winterfrost";
const categoryImages = {
  AI: ["ai-agent-software.png", "ai-chatbot-enterprise.png", "rag-enterprise-data.png", "task-oriented-chatbot.png"],
  Blockchain: ["blockchain-iot.png", "blockchain-healthcare.png"],
  "Bản tin Winterfrost": ["wiki-knowledge-network.png", "winterfrost-work-life.png", "technology-partner-selection.png"],
  "Công nghệ": ["wiki-knowledge-network.png", "javascript-modern-web.png", "ai-agent-software.png"],
  "Giải pháp Doanh nghiệp": ["wiki-knowledge-network.png", "technology-partner-selection.png", "crm-implementation.png"],
  IoT: ["blockchain-iot.png"],
  "Lĩnh vực": ["technology-partner-selection.png", "crm-implementation.png", "healthcare-crm.png"],
  "Mobile App": ["cross-platform-mobile.png", "healthcare-mobile-app.png"],
  "Phần mềm": ["crm-implementation.png", "javascript-modern-web.png"],
  "Phương pháp phát triển": ["javascript-modern-web.png", "startup-mvp.png", "backend-engineer-workday.png"],
  Startups: ["startup-mvp.png"],
  "Top List": ["wiki-knowledge-network.png", "technology-partner-selection.png", "ai-agent-software.png"],
  "UIUX Design": ["ui-ux-conversion.png"],
  Website: ["wordpress-enterprise.png", "javascript-modern-web.png", "ui-ux-conversion.png"],
  "Work Life": ["winterfrost-work-life.png", "software-engineer-career.png", "backend-engineer-workday.png"],
};

const categoryGuidance = {
  AI: {
    value: "khả năng tự động hóa, hỗ trợ quyết định và khai thác dữ liệu có kiểm soát",
    focus: ["Chất lượng và quyền sở hữu dữ liệu", "Tiêu chí đánh giá đầu ra", "Cơ chế giám sát của con người", "Chi phí vận hành mô hình"],
    risk: "ảo giác mô hình, rò rỉ dữ liệu, sai lệch đầu ra và chi phí tăng ngoài dự kiến",
  },
  Blockchain: {
    value: "khả năng chia sẻ dữ liệu có thể kiểm chứng giữa nhiều bên không hoàn toàn tin cậy lẫn nhau",
    focus: ["Mô hình quản trị mạng lưới", "Quyền riêng tư dữ liệu", "Hiệu suất giao dịch", "Khả năng tích hợp hệ thống"],
    risk: "đưa blockchain vào bài toán không cần sổ cái phân tán, làm tăng độ phức tạp và chi phí",
  },
  Website: {
    value: "khả năng biến website thành điểm chạm kinh doanh nhanh, dễ sử dụng và có thể đo lường",
    focus: ["Hành trình người dùng", "Hiệu suất tải trang", "Khả năng quản trị nội dung", "Bảo mật và SEO kỹ thuật"],
    risk: "ưu tiên hiệu ứng hơn trải nghiệm, phụ thuộc plugin và thiếu quy trình bảo trì",
  },
  "Mobile App": {
    value: "khả năng cung cấp trải nghiệm liền mạch trên thiết bị di động và duy trì tương tác dài hạn",
    focus: ["Tác vụ cốt lõi trên di động", "Hiệu suất và khả năng ngoại tuyến", "Bảo vệ dữ liệu cá nhân", "Theo dõi chất lượng phát hành"],
    risk: "phạm vi tính năng quá lớn, trải nghiệm thiếu nhất quán và chi phí duy trì nhiều nền tảng",
  },
  "UIUX Design": {
    value: "khả năng giảm ma sát, tăng mức độ tin cậy và giúp người dùng hoàn thành mục tiêu nhanh hơn",
    focus: ["Nghiên cứu người dùng", "Kiến trúc thông tin", "Design system", "Kiểm thử khả dụng"],
    risk: "ra quyết định theo cảm tính, thiếu dữ liệu hành vi và bỏ qua khả năng tiếp cận",
  },
  "Phần mềm": {
    value: "khả năng chuẩn hóa quy trình, kết nối dữ liệu và giảm thao tác thủ công trong vận hành",
    focus: ["Quy trình nghiệp vụ", "Mô hình dữ liệu", "Tích hợp hệ thống", "Kế hoạch vận hành và hỗ trợ"],
    risk: "số hóa một quy trình chưa hợp lý, thiếu chủ sở hữu dữ liệu và phụ thuộc nhà cung cấp",
  },
  "Phương pháp phát triển": {
    value: "khả năng đưa sản phẩm ra thị trường có kiểm soát và cải tiến dựa trên phản hồi thực tế",
    focus: ["Giả thuyết sản phẩm", "Phạm vi ưu tiên", "Tiêu chuẩn kỹ thuật", "Đo lường sau phát hành"],
    risk: "phạm vi liên tục mở rộng, thiếu tiêu chí hoàn thành và tích lũy nợ kỹ thuật không kiểm soát",
  },
  Startups: {
    value: "khả năng kiểm chứng nhu cầu thị trường nhanh trước khi mở rộng đầu tư",
    focus: ["Vấn đề cần kiểm chứng", "Hành trình tạo giá trị", "Chỉ số sản phẩm", "Nền tảng để mở rộng"],
    risk: "xây quá nhiều tính năng trước khi có tín hiệu thị trường và đo sai chỉ số thành công",
  },
  IoT: {
    value: "khả năng thu thập tín hiệu từ thế giới vật lý và chuyển chúng thành hành động vận hành kịp thời",
    focus: ["Độ tin cậy của thiết bị", "Kết nối và xử lý biên", "Bảo mật firmware", "Quản trị vòng đời thiết bị"],
    risk: "thiết bị khó cập nhật, dữ liệu thiếu chuẩn và điểm yếu bảo mật phân tán",
  },
  "Work Life": {
    value: "khả năng phát triển năng lực đội ngũ trong một nhịp làm việc bền vững",
    focus: ["Mục tiêu và trách nhiệm rõ ràng", "Không gian tập trung sâu", "Phản hồi dựa trên bằng chứng", "Chia sẻ tri thức"],
    risk: "phụ thuộc vào làm thêm kéo dài, họp thiếu mục tiêu và kiến thức nằm ở từng cá nhân",
  },
};

const defaultGuidance = {
  value: "khả năng gắn công nghệ với mục tiêu kinh doanh, dữ liệu và trải nghiệm người dùng",
  focus: ["Bài toán cần giải quyết", "Dữ liệu và tích hợp", "Rủi ro vận hành", "Chỉ số đánh giá hiệu quả"],
  risk: "chọn giải pháp theo xu hướng, thiếu tiêu chí đo lường và không chuẩn bị nguồn lực vận hành",
};

function hash(value) {
  let result = 2166136261;
  for (const char of value) {
    result ^= char.codePointAt(0);
    result = Math.imul(result, 16777619);
  }
  return result >>> 0;
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function normalizeCategory(nodes = []) {
  const raw = nodes[0]?.name || "Công nghệ";
  if (/bản tin/i.test(raw)) return "Bản tin Winterfrost";
  if (/work\s*life/i.test(raw)) return "Work Life";
  return raw.replaceAll("HomeNest", "Winterfrost").replaceAll("Homenest", "Winterfrost");
}

function cleanTopic(title) {
  return title
    .replaceAll(/HomeNest/gi, "Winterfrost")
    .replaceAll(/Go Office/gi, "Winterfrost Business Suite")
    .replace(/^top\s+\d+\+?\s*/i, "")
    .replace(/^top\s+\d+\s*/i, "")
    .replace(/\s+(mới nhất|hàng đầu hiện nay|hiện nay|năm 20\d{2})\b/gi, "")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/[.?!:–-]+$/g, "")
    .trim();
}

function shortSubject(topic) {
  const subject = topic
    .replace(/hướng dẫn( chi tiết| toàn diện)?/gi, "")
    .replace(/quy trình/gi, "")
    .replace(/\s+/g, " ")
    .split(/\s*[:–]\s*/)[0]
    .trim();
  if (subject.length <= 78) return subject;
  return `${subject.slice(0, 75).replace(/\s+\S*$/, "")}…`;
}

function remakeTitle(sourceTitle) {
  const topic = cleanTopic(sourceTitle);
  const source = sourceTitle.toLowerCase();
  if (source.includes("go office pos")) return "Winterfrost Business Suite POS: Nền Tảng Quản Lý Bán Hàng";
  if (source.includes("go office erp")) return "Winterfrost Business Suite ERP: Nền Tảng Quản Trị Nguồn Lực";
  if (/^top\s+\d+/i.test(sourceTitle)) return `${shortSubject(topic)}: Tiêu Chí Lựa Chọn Từ Winterfrost`;
  if (source.includes("là gì")) {
    const subject = shortSubject(topic.replace(/\s+là gì[?]?/i, ""));
    return `${subject}: Khái Niệm, Giá Trị Và Cách Ứng Dụng`;
  }
  if (source.includes("so sánh") || source.includes(" vs ") || source.includes("khác biệt")) {
    return `${shortSubject(topic)}: Khung So Sánh Và Lựa Chọn Phù Hợp`;
  }
  if (source.includes("hướng dẫn") || source.includes("quy trình") || source.includes("cách ")) {
    return `${shortSubject(topic)}: Lộ Trình Triển Khai Thực Tế`;
  }
  const subject = shortSubject(topic);
  return `${subject}: Góc Nhìn Ứng Dụng Từ Winterfrost`;
}

function imageFor(category, slug) {
  const pool = categoryImages[category] || categoryImages["Công nghệ"];
  return `${IMAGE_ROOT}/${pool[hash(slug) % pool.length]}`;
}

function normalizeSlug(slug) {
  return slug
    .replaceAll(/homenest/gi, "winterfrost")
    .replaceAll(/go-office/gi, "winterfrost-business-suite")
    .replaceAll(/goquestx/gi, "winterfrost-ai");
}

function authorFor(category) {
  if (category === "AI") return "Winterfrost AI Lab";
  if (category === "UIUX Design") return "Winterfrost Design Team";
  if (category === "Work Life" || category === "Bản tin Winterfrost") return "Winterfrost People";
  if (category === "Startups" || category === "Mobile App") return "Winterfrost Product Team";
  if (category === "Website") return "Winterfrost Web Team";
  return "Winterfrost Editorial";
}

function renderContent(topic, category) {
  const guide = categoryGuidance[category] || defaultGuidance;
  const safeTopic = escapeHtml(topic);
  const bullets = guide.focus.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  return [
    `<p><strong>${safeTopic}</strong> chỉ tạo ra giá trị khi được đặt trong đúng bối cảnh kinh doanh và gắn với một kết quả có thể đo lường. Winterfrost tiếp cận chủ đề này từ nhu cầu của người dùng, quy trình vận hành và năng lực dữ liệu thay vì bắt đầu bằng danh sách công nghệ.</p>`,
    `<p>Với doanh nghiệp, giá trị quan trọng nằm ở ${escapeHtml(guide.value)}. Phạm vi càng rõ, đội ngũ càng dễ lựa chọn kiến trúc phù hợp, kiểm soát chi phí và cải tiến sau khi đưa giải pháp vào sử dụng.</p>`,
    `<h2>Đặt bài toán trước giải pháp</h2>`,
    `<p>Trước khi đầu tư vào ${safeTopic}, doanh nghiệp cần mô tả nhóm người dùng, trở ngại hiện tại, dữ liệu đầu vào và thay đổi mong muốn. Một mục tiêu tốt phải gắn với chỉ số vận hành hoặc trải nghiệm thay vì chỉ dừng ở việc hoàn thành tính năng.</p>`,
    `<h2>Khung đánh giá của Winterfrost</h2>`,
    `<p>Bốn nhóm tiêu chí dưới đây giúp đội dự án giữ cân bằng giữa giá trị kinh doanh và tính bền vững của hệ thống:</p>`,
    `<ul>${bullets}</ul>`,
    `<h2>Rủi ro cần kiểm soát từ đầu</h2>`,
    `<p>Rủi ro phổ biến của chủ đề này là ${escapeHtml(guide.risk)}. Mỗi rủi ro cần có người chịu trách nhiệm, tín hiệu cảnh báo và phương án xử lý rõ ràng trước khi mở rộng phạm vi.</p>`,
    `<h2>Lộ trình triển khai thực tế</h2>`,
    `<p>Winterfrost khuyến nghị bắt đầu bằng một phạm vi nhỏ đủ để kiểm chứng giả thuyết. Sau vòng thử nghiệm, đội ngũ xem lại dữ liệu sử dụng, phản hồi người dùng, lỗi vận hành và tổng chi phí trước khi quyết định mở rộng.</p>`,
    `<ul><li>Xác định mục tiêu và tiêu chí thành công</li><li>Chuẩn hóa dữ liệu, quyền truy cập và trách nhiệm</li><li>Xây dựng bản thử nghiệm có thể đo lường</li><li>Đánh giá kết quả và mở rộng theo từng giai đoạn</li></ul>`,
    `<h2>Winterfrost đồng hành cùng doanh nghiệp</h2>`,
    `<p>Winterfrost kết hợp tư vấn sản phẩm, thiết kế trải nghiệm và phát triển công nghệ để biến ${safeTopic} thành một giải pháp có thể vận hành, đo lường và cải tiến lâu dài.</p>`,
  ].join("");
}

function remakePost(post) {
  const category = normalizeCategory(post.categories?.nodes);
  const topic = cleanTopic(post.title);
  const title = remakeTitle(post.title);
  const metaDescription = `Winterfrost phân tích ${topic} theo góc nhìn kinh doanh, trải nghiệm, dữ liệu, rủi ro và lộ trình triển khai thực tế cho doanh nghiệp.`;
  return {
    slug: normalizeSlug(post.slug),
    title,
    metaTitle: `${title} | Winterfrost`,
    metaDescription,
    image: imageFor(category, post.slug),
    ogImage: imageFor(category, post.slug),
    category,
    author: authorFor(category),
    year: post.date?.slice(0, 4) || "2026",
    contentText: metaDescription,
    contentHtml: renderContent(topic, category),
  };
}

async function fetchPage(after) {
  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ query: QUERY, variables: { first: PAGE_SIZE, after } }),
  });
  if (!response.ok) throw new Error(`HomeNest GraphQL returned ${response.status}`);
  const payload = await response.json();
  if (payload.errors?.length) throw new Error(payload.errors.map((item) => item.message).join("; "));
  return payload.data.posts;
}

const sourcePosts = [];
let cursor = null;
let hasNextPage = true;
while (hasNextPage) {
  const page = await fetchPage(cursor);
  sourcePosts.push(...page.nodes);
  cursor = page.pageInfo.endCursor;
  hasNextPage = page.pageInfo.hasNextPage;
  process.stdout.write(`\rFetched ${sourcePosts.length} source articles`);
}

const uniquePosts = sourcePosts.filter(
  (post, index, all) => post.slug && all.findIndex((candidate) => candidate.slug === post.slug) === index,
);
const usedSlugs = new Set();
const remadePosts = uniquePosts.map((post) => {
  const remade = remakePost(post);
  const baseSlug = remade.slug;
  let suffix = 2;
  while (usedSlugs.has(remade.slug)) {
    remade.slug = `${baseSlug}-${suffix}`;
    suffix += 1;
  }
  usedSlugs.add(remade.slug);
  return remade;
});
await writeFile(OUTPUT, `${JSON.stringify(remadePosts, null, 2)}\n`, "utf8");
process.stdout.write(`\nSaved ${remadePosts.length} Winterfrost articles to ${OUTPUT}\n`);
