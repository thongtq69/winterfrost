import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputDir = path.join(root, "docs", "hinh-anh");
const imagePattern =
  /https?:\/\/[^\s"'<>\\)]+?\.(?:png|jpe?g|webp|avif|gif|svg)(?:\?[^\s"'<>\\)]*)?/gi;
const mediaExtensions = /\.(?:png|jpe?g|webp|avif|gif|svg|ico)$/i;

function walk(directory) {
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name === ".git") continue;
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...walk(fullPath));
    else files.push(fullPath);
  }
  return files;
}

function relative(filePath) {
  return path.relative(root, filePath).split(path.sep).join("/");
}

function expandUrlBases(source) {
  const bases = new Map();
  const basePattern =
    /const\s+([A-Z][A-Z0-9_]*)\s*=\s*["'](https?:\/\/[^"']+)["']/g;
  let match;
  while ((match = basePattern.exec(source))) bases.set(match[1], match[2]);
  return source.replace(/\$\{([A-Z][A-Z0-9_]*)\}/g, (token, name) =>
    bases.has(name) ? bases.get(name) : token,
  );
}

function extractUrls(source) {
  return [...source.matchAll(imagePattern)].map((match) => match[0]);
}

function filenameFromUrl(url) {
  try {
    return decodeURIComponent(path.basename(new URL(url).pathname));
  } catch {
    return path.basename(url.split("?")[0]);
  }
}

function slugify(value) {
  return value
    .replaceAll("Đ", "D")
    .replaceAll("đ", "d")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\.[^.]+$/, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

function csvEscape(value) {
  const text = String(value ?? "");
  return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function writeCsv(fileName, columns, rows) {
  const lines = [
    columns.join(","),
    ...rows.map((row) => columns.map((column) => csvEscape(row[column])).join(",")),
  ];
  fs.writeFileSync(path.join(outputDir, fileName), `${lines.join("\n")}\n`);
}

const sourceFiles = [
  ...walk(path.join(root, "src")),
  ...walk(path.join(root, "public")),
].filter((filePath) => !filePath.includes(`${path.sep}docs${path.sep}`));

const inventory = new Map();
for (const filePath of sourceFiles) {
  if (mediaExtensions.test(filePath)) {
    const localPath = `/${relative(filePath).replace(/^public\//, "")}`;
    inventory.set(localPath, {
      url: localPath,
      occurrences: 1,
      references: new Map([[relative(filePath), new Set([1])]]),
      local: true,
    });
    continue;
  }

  let source;
  try {
    source = fs.readFileSync(filePath, "utf8");
  } catch {
    continue;
  }
  const expanded = expandUrlBases(source);
  const lines = expanded.split("\n");
  for (let index = 0; index < lines.length; index += 1) {
    imagePattern.lastIndex = 0;
    for (const match of lines[index].matchAll(imagePattern)) {
      const url = match[0];
      const item = inventory.get(url) ?? {
        url,
        occurrences: 0,
        references: new Map(),
        local: false,
      };
      item.occurrences += 1;
      const file = relative(filePath);
      if (!item.references.has(file)) item.references.set(file, new Set());
      item.references.get(file).add(index + 1);
      inventory.set(url, item);
    }
  }
}

const siteData = JSON.parse(
  fs.readFileSync(path.join(root, "src/lib/site-data.json"), "utf8"),
);
const liveCaseDetails = JSON.parse(
  fs.readFileSync(
    path.join(root, "src/lib/case-study-live-details.json"),
    "utf8",
  ),
);

const projectRows = [];
const projectUrls = new Map();

function addProject({
  projectSlug,
  projectName,
  role,
  url,
  size,
  notes = "",
}) {
  if (!url || projectUrls.has(url)) return;
  const index =
    projectRows.filter((row) => row.project_slug === projectSlug).length + 1;
  const roleSlug = slugify(role);
  const recommended = `public/images/projects/${projectSlug}/${String(index).padStart(2, "0")}-${roleSlug}.webp`;
  const row = {
    id: "",
    project_slug: projectSlug,
    project_name: projectName,
    role,
    current_filename: filenameFromUrl(url),
    current_url: url,
    recommended_filename: recommended,
    required_size: size,
    required_format: "WebP chất lượng 82–88",
    status: "CHO_ANH_CUNG_CAP",
    notes,
  };
  projectRows.push(row);
  projectUrls.set(url, row);
}

const legacyImageSets = new Map();
const legacyFrequency = new Map();
for (const project of siteData.caseStudies) {
  const urls = [...new Set(extractUrls(project.contentHtml ?? ""))];
  legacyImageSets.set(project.slug, urls);
  for (const url of urls) {
    legacyFrequency.set(url, (legacyFrequency.get(url) ?? 0) + 1);
  }
}

for (const project of siteData.caseStudies) {
  const ownImages = (legacyImageSets.get(project.slug) ?? []).filter(
    (url) =>
      legacyFrequency.get(url) === 1 &&
      !filenameFromUrl(url).toLowerCase().includes("book-a-call"),
  );
  const ordered = [project.image, ...ownImages].filter(
    (url, index, values) => url && values.indexOf(url) === index,
  );
  ordered.forEach((url, index) => {
    const isCover = index === 0;
    const isApp = project.service === "Thiết kế App";
    addProject({
      projectSlug: project.slug,
      projectName: project.title,
      role: isCover
        ? "Ảnh bìa dự án"
        : isApp
          ? "Màn hình ứng dụng"
          : "Màn hình website",
      url,
      size: isCover
        ? "1920 × 1080 px (16:9)"
        : isApp
          ? "Tối thiểu 1080 px chiều rộng, giữ tỷ lệ màn hình gốc"
          : "Tối thiểu 1440 px chiều rộng, giữ chiều cao trang gốc",
      notes: isCover
        ? "Giữ nội dung chính trong vùng an toàn trung tâm để còn cắt 4:3."
        : "",
    });
  });
}

for (const [slug, detail] of Object.entries(liveCaseDetails)) {
  const groups = [
    ["desktop", "Màn hình website"],
    ["mobile", "Màn hình mobile"],
    ["ui", "Ảnh UI bổ sung"],
  ];
  for (const [key, role] of groups) {
    const urls = [...new Set(detail[key] ?? [])];
    urls.forEach((url, index) => {
      addProject({
        projectSlug: slug,
        projectName: detail.title,
        role: key === "desktop" && index === 0 ? "Ảnh bìa dự án" : role,
        url,
        size:
          key === "mobile"
            ? "Tối thiểu 1080 px chiều rộng, giữ tỷ lệ màn hình gốc"
            : key === "desktop" && index === 0
              ? "1920 × 1080 px (16:9)"
              : "Tối thiểu 1440 px chiều rộng, giữ chiều cao trang gốc",
        notes:
          key === "desktop" && index === 0
            ? "Giữ nội dung chính trong vùng an toàn trung tâm để còn cắt 4:3."
            : "",
      });
    });
  }
}

siteData.aboutPageDetail.hero.phoneImages.forEach((url, index) => {
  addProject({
    projectSlug: "gioi-thieu-nang-luc",
    projectName: "Màn hình dự án ở hero Giới thiệu",
    role: `Màn hình mobile ${index + 1}`,
    url,
    size: "Tối thiểu 856 × 1852 px, tỷ lệ 428:926",
    notes: "Ảnh màn hình sạch, không kèm khung điện thoại.",
  });
});

const showcaseSources = [
  "src/components/sections/CaseStudiesAbout.tsx",
  "src/components/sections/BuildingScalable.tsx",
  "src/lib/dich-vu-page.ts",
];
for (const item of inventory.values()) {
  const usedInShowcase = [...item.references.keys()].some((file) =>
    showcaseSources.includes(file),
  );
  if (!usedInShowcase || projectUrls.has(item.url)) continue;
  const name = filenameFromUrl(item.url);
  if (
    !/(case-study|giao-dien|banner-homenest|thiet-ke-app-homenest|phat-trien-phan-mem-homenest|go-questx|^[1-9]\.(?:png|jpg)$)/i.test(
      name,
    )
  ) {
    continue;
  }
  addProject({
    projectSlug: "showcase-tong-hop",
    projectName: "Ảnh trình bày dự án tổng hợp",
    role: "Ảnh collage / showcase",
    url: item.url,
    size: "Tối thiểu 1600 × 1200 px (4:3), vùng an toàn giữa ảnh",
    notes: "Cần xác nhận đây là dự án thật trước khi dùng lại.",
  });
}

projectRows.forEach((row, index) => {
  row.id = `DUAN-${String(index + 1).padStart(3, "0")}`;
});

const peopleRows = [];
const peopleUrls = new Map();

function addPerson({
  group,
  identity,
  url,
  placement,
  size,
  format = "WebP chất lượng 82–88",
  notes = "",
}) {
  if (!url) return;
  const existing = peopleUrls.get(url);
  if (existing) {
    if (!existing.placement.includes(placement)) {
      existing.placement += ` | ${placement}`;
    }
    return;
  }
  const recommended = `public/images/people/${slugify(group)}/${slugify(identity || filenameFromUrl(url))}.webp`;
  const row = {
    id: "",
    group,
    identity,
    current_filename: filenameFromUrl(url),
    current_url: url,
    placement,
    recommended_filename: recommended,
    required_size: size,
    required_format: format,
    status: "CHO_ANH_CUNG_CAP",
    notes,
  };
  peopleRows.push(row);
  peopleUrls.set(url, row);
}

addPerson({
  group: "Founder",
  identity: siteData.home.companyOverview.founder.name,
  url: siteData.home.companyOverview.founder.image,
  placement: "Trang chủ; Giới thiệu; bảng giá/đặt lịch",
  size: "Ảnh master tối thiểu 2000 × 2500 px (4:5)",
  notes: "Giữ khoảng trống trên đầu và hai vai để xuất bản cắt dọc, 6:7 và vuông.",
});

const meetTeamSource = fs.readFileSync(
  path.join(root, "src/components/sections/MeetTeam.tsx"),
  "utf8",
);
const teamPattern =
  /\{\s*type:\s*"photo",\s*src:\s*"([^"]+)",\s*alt:\s*"([^"]+)"\s*\}/g;
for (const match of meetTeamSource.matchAll(teamPattern)) {
  addPerson({
    group: "Đội ngũ",
    identity: match[2].replace(/\s*-\s*HomeNest.*$/i, ""),
    url: match[1],
    placement: "Trang chủ — Đội ngũ của chúng tôi",
    size: "Tối thiểu 1200 × 1500 px (4:5)",
    notes: "Chân dung đồng bộ ánh sáng/phông nền; mặt ở vùng giữa.",
  });
}

for (const item of siteData.home.testimonials.items) {
  addPerson({
    group: "Khách hàng",
    identity: `${item.author} — ${item.role}`,
    url: item.avatar,
    placement: "Trang chủ — Cảm nhận khách hàng",
    size: "Tối thiểu 1000 × 1000 px (1:1)",
    notes: "Cần ảnh thật và xác nhận quyền sử dụng.",
  });
}

const pricingSource = fs.readFileSync(
  path.join(root, "src/components/sections/PricingSection.tsx"),
  "utf8",
);
const pricingPattern =
  /name:\s*"([^"]+)",\s*role:\s*"([^"]+)",\s*avatar:\s*"([^"]+)"/g;
for (const match of pricingSource.matchAll(pricingPattern)) {
  addPerson({
    group: "Đối tác",
    identity: `${match[1]} — ${match[2]}`,
    url: match[3],
    placement: "Giới thiệu — Minh chứng từ đối tác",
    size: "Tối thiểu 1000 × 1000 px (1:1)",
    notes: "Cần ảnh thật và xác nhận quyền sử dụng.",
  });
}

siteData.home.whyChooseUs.cardItem2.avatars.forEach((url) => {
  addPerson({
    group: "Đối tác",
    identity: filenameFromUrl(url)
      .replace(/\.[^.]+$/, "")
      .replace(/^Doi-tac-/i, "")
      .replace(/-cua-HomeNest-Viet-Nam$/i, "")
      .replaceAll("-", " "),
    url,
    placement: "Trang chủ — Lý do chọn HomeNest",
    size: "Tối thiểu 1000 × 1000 px (1:1)",
    notes: "Cần ảnh thật và xác nhận quyền sử dụng.",
  });
});

addPerson({
  group: "Ảnh hội thoại",
  identity: "Khách hàng trong thẻ hội thoại",
  url: siteData.home.whyChooseUs.cardItem5.userAvatar,
  placement: "Trang chủ — thẻ tích hợp linh hoạt",
  size: "Tối thiểu 1000 × 1000 px (1:1)",
  notes: "Có thể thay bằng ảnh khách hàng thật đã được cho phép.",
});

const ctaPages = new Map();
for (const filePath of walk(path.join(root, "src/_content"))) {
  if (!filePath.endsWith(".json")) continue;
  const content = JSON.parse(fs.readFileSync(filePath, "utf8"));
  if (!content.ctaBanner?.image) continue;
  const pages = ctaPages.get(content.ctaBanner.image) ?? [];
  pages.push(`/dich-vu/${content.slug}`);
  ctaPages.set(content.ctaBanner.image, pages);
}
for (const [url, pages] of ctaPages) {
  addPerson({
    group: "CTA",
    identity: filenameFromUrl(url).replace(/\.[^.]+$/, "").replaceAll("-", " "),
    url,
    placement: pages.join("; "),
    size: "Tối thiểu 1080 × 1320 px, tỷ lệ 9:11",
    format: "PNG hoặc WebP nền trong suốt",
    notes: "Chụp/cắt người toàn thân hoặc 3/4 người; mép dưới chạm đáy ảnh.",
  });
}

addPerson({
  group: "CTA",
  identity: "Chuyên viên tư vấn chung",
  url: "https://image.homenest.software/wp-content/uploads/2026/03/Book-a-call-now.avif",
  placement: "CTA dùng chung trên trang chủ, dự án, tuyển dụng và nhiều trang khác",
  size: "Tối thiểu 1080 × 1320 px, tỷ lệ 9:11",
  format: "PNG hoặc WebP nền trong suốt",
  notes: "Đây là ảnh trong ví dụ “Bắt đầu hành trình chuyển đổi số”.",
});

addPerson({
  group: "Tuyển dụng",
  identity: "Ảnh tập thể đội ngũ tuyển dụng",
  url: "https://homenest.com.vn/assets/tuyen-dung/hero-banner.webp",
  placement: "/tuyen-dung và banner đầu trang chi tiết tuyển dụng",
  size: "Tối thiểu 2560 × 1440 px (16:9)",
  notes: "Người chính nằm giữa; vẫn an toàn khi cắt 16:10 trên mobile.",
});

const workLifeSource = fs.readFileSync(
  path.join(root, "src/app/tuyen-dung/page.tsx"),
  "utf8",
);
for (const url of [...new Set(extractUrls(workLifeSource))]) {
  if (!/Mot-ngay/i.test(filenameFromUrl(url))) continue;
  addPerson({
    group: "Work Life",
    identity: filenameFromUrl(url).replace(/\.[^.]+$/, "").replaceAll("-", " "),
    url,
    placement: "/tuyen-dung; /ve-chung-toi; bài viết Work Life",
    size: "Tối thiểu 1920 × 1080 px (16:9)",
    notes: "Ưu tiên ảnh hoạt động thật của nhân sự HomeNest.",
  });
}

addPerson({
  group: "Văn phòng",
  identity: "Ảnh văn phòng / trụ sở HomeNest",
  url: "https://image.homenest.com.vn/wp-content/uploads/2026/04/CTA-Footer-HomeNest-Viet-Nam.jpg",
  placement: "Footer CTA và các khối liên hệ",
  size: "Ảnh master tối thiểu 2400 × 1600 px (3:2)",
  notes: "Ảnh hiện tại là mockup biển hiệu; nên thay bằng ảnh địa điểm thật.",
});

const runtimeWorkLifePhotos = [
  {
    page: "/mot-ngay-lam-viec-cua-mot-backend-engineer-tai-homenest",
    identity: "Gia Bảo — Backend Engineer",
    url: "https://image.homenest.com.vn/wp-content/uploads/2026/03/22115917/Gia-Bao-Backend-Engineer-1024x1024.jpg",
    size: "Tối thiểu 1600 × 1600 px (1:1)",
  },
  {
    page: "/mot-ngay-lam-viec-cua-mot-backend-engineer-tai-homenest",
    identity: "Bắt đầu ngày làm việc của Backend Engineer",
    url: "https://image.homenest.com.vn/wp-content/uploads/2026/03/22115918/Bat-dau-ngay-lam-viec-cua-Backend-Engieer-768x1024.jpg",
    size: "Tối thiểu 1200 × 1600 px (3:4)",
  },
  {
    page: "/mot-ngay-lam-viec-cua-mot-backend-engineer-tai-homenest",
    identity: "Quá trình làm việc của Backend Developer",
    url: "https://image.homenest.com.vn/wp-content/uploads/2026/03/22115916/Qua-trinh-lam-viec-cua-mot-Backend-Developer-768x1024.jpg",
    size: "Tối thiểu 1200 × 1600 px (3:4)",
  },
  {
    page: "/mot-ngay-lam-viec-cua-mot-backend-engineer-tai-homenest",
    identity: "Trao đổi trong quá trình làm việc Backend",
    url: "https://image.homenest.com.vn/wp-content/uploads/2026/03/22115916/Trao-doi-trong-qua-trinh-lam-viec-cua-mot-Backend-1024x768.jpg",
    size: "Tối thiểu 1600 × 1200 px (4:3)",
  },
  {
    page: "/mot-ngay-lam-viec-cua-mot-backend-engineer-tai-homenest",
    identity: "Đội ngũ Software Engineer",
    url: "https://image.homenest.com.vn/wp-content/uploads/2026/03/22115911/Homenest-Software-Engineer-scaled-e1773732164739-2048x1396.jpg",
    size: "Tối thiểu 2400 × 1600 px (3:2)",
  },
  {
    page: "/cong-viec-cua-tester-tai-homenest-viet-nam-se-lam-nhung-gi",
    identity: "Tester Anh Quân và Thục Quyên",
    url: "https://image.homenest.com.vn/wp-content/uploads/2026/07/Tester-Anh-Quan-ben-trai-va-Tester-Thuc-Quyen-ben-phai-scaled.jpg",
    size: "Tối thiểu 1920 × 1080 px (16:9)",
  },
  {
    page: "/cong-viec-cua-tester-tai-homenest-viet-nam-se-lam-nhung-gi",
    identity: "Họp nhóm đầu ngày — Tester",
    url: "https://image.homenest.com.vn/wp-content/uploads/2026/07/Hop-nhom-dau-ngay.jpg",
    size: "Tối thiểu 1600 × 1600 px (1:1)",
  },
  {
    page: "/cong-viec-cua-tester-tai-homenest-viet-nam-se-lam-nhung-gi",
    identity: "Lời khuyên cho Tester mới",
    url: "https://image.homenest.com.vn/wp-content/uploads/2026/07/Loi-khuyen-cho-cac-Tester-moi-scaled.jpg",
    size: "Tối thiểu 1600 × 1200 px (4:3)",
  },
  {
    page: "/cong-viec-cua-tester-tai-homenest-viet-nam-se-lam-nhung-gi",
    identity: "Chân dung Tester Anh Quân",
    url: "https://image.homenest.com.vn/wp-content/uploads/2026/07/Loi-nhan-tu-Anh-Quan.jpg",
    size: "Tối thiểu 1600 × 1600 px (1:1)",
  },
  {
    page: "/cong-viec-cua-tester-tai-homenest-viet-nam-se-lam-nhung-gi",
    identity: "Chân dung Tester Thục Quyên",
    url: "https://image.homenest.com.vn/wp-content/uploads/2026/07/Loi-nhan-tu-Thuc-Quyen.jpg",
    size: "Tối thiểu 1600 × 1600 px (1:1)",
  },
  {
    page: "/mot-ngay-lam-viec-cua-ba-tai-homenest-viet-nam",
    identity: "Võ Văn Tư Tài và Hứa Minh Khương",
    url: "https://image.homenest.com.vn/wp-content/uploads/2026/07/Vo-Van-Tu-Tai-ben-trai-va-Hua-Minh-Khuong-ben-phai.jpg",
    size: "Tối thiểu 1600 × 1600 px (1:1)",
  },
  {
    page: "/mot-ngay-lam-viec-cua-ba-tai-homenest-viet-nam",
    identity: "BA đang họp dự án",
    url: "https://image.homenest.com.vn/wp-content/uploads/2026/07/BA-dang-hop-du-an.jpg",
    size: "Tối thiểu 1600 × 1600 px (1:1)",
  },
  {
    page: "/mot-ngay-lam-viec-cua-ba-tai-homenest-viet-nam",
    identity: "Công việc BA của Hứa Minh Khương",
    url: "https://image.homenest.com.vn/wp-content/uploads/2026/07/Cong-viec-BA-cua-Hua-Minh-Khuong.jpg",
    size: "Tối thiểu 1600 × 1600 px (1:1)",
  },
  {
    page: "/mot-ngay-lam-viec-cua-ba-tai-homenest-viet-nam",
    identity: "Công việc BA của Võ Văn Tư Tài",
    url: "https://image.homenest.com.vn/wp-content/uploads/2026/07/Cong-viec-BA-cua-Vo-Van-Tu-Tai.jpg",
    size: "Tối thiểu 1600 × 1600 px (1:1)",
  },
  {
    page: "/mot-ngay-lam-viec-cua-ba-tai-homenest-viet-nam",
    identity: "Lời khuyên dành cho BA mới",
    url: "https://image.homenest.com.vn/wp-content/uploads/2026/07/Loi-khuyen-danh-cho-cac-ban-moi.jpg",
    size: "Tối thiểu 1600 × 1600 px (1:1)",
  },
  {
    page: "/mot-ngay-lam-viec-cua-flutter-developer-se-nhu-the-nao",
    identity: "Võ Ngọc Gia Bảo — Flutter Developer",
    url: "https://image.homenest.com.vn/wp-content/uploads/2026/06/Vo-Ngoc-Gia-Bao-Flutter-Developer-tai-HomeNest-Viet-Nam.jpg",
    size: "Tối thiểu 1600 × 1600 px (1:1)",
  },
  {
    page: "/mot-ngay-lam-viec-cua-flutter-developer-se-nhu-the-nao",
    identity: "Một ngày làm việc của Flutter Developer",
    url: "https://image.homenest.com.vn/wp-content/uploads/2026/06/Mot-ngay-lam-viec-cua-Flutter-Developer-tai-HomeNest-Viet-Nam.jpg",
    size: "Tối thiểu 1600 × 1600 px (1:1)",
  },
];

for (const photo of runtimeWorkLifePhotos) {
  addPerson({
    group: "Work Life chi tiết",
    identity: photo.identity,
    url: photo.url,
    placement: `${photo.page} — ảnh được lấy động từ website hiện tại`,
    size: photo.size,
    notes:
      "Trang đang tải HTML động; khi thay ảnh cần chuyển URL này sang tài sản cục bộ.",
  });
  if (!inventory.has(photo.url)) {
    inventory.set(photo.url, {
      url: photo.url,
      occurrences: 1,
      references: new Map([[`RUNTIME_PAGE:${photo.page}`, new Set([1])]]),
      local: false,
    });
  }
}

peopleRows.forEach((row, index) => {
  row.id = `NGUOI-${String(index + 1).padStart(3, "0")}`;
});

function referencesText(item) {
  return [...item.references.entries()]
    .map(
      ([file, lines]) =>
        `${file}:${[...lines].sort((a, b) => a - b).join("|")}`,
    )
    .join("; ");
}

function classify(item) {
  if (peopleUrls.has(item.url)) return ["P0", "NGUOI_DOANH_NGHIEP"];
  if (projectUrls.has(item.url)) return ["P0", "DU_AN_CASE_STUDY"];

  const files = [...item.references.keys()].join(" ").toLowerCase();
  const name = filenameFromUrl(item.url).toLowerCase();
  if (files.includes("wiki") || files.includes("workliferaw")) {
    return ["P2", "WIKI_BAI_VIET"];
  }
  if (
    files.includes("_content") ||
    files.includes("industry") ||
    files.includes("dich-vu")
  ) {
    return ["P1", "DICH_VU_LINH_VUC"];
  }
  if (/(logo|icon|favicon|star|react|figma|github|slack|notion|zapier)/.test(name)) {
    return ["P3", "LOGO_ICON"];
  }
  if (/(background|graphic|decoration|pattern|frame|khung|main-background)/.test(name)) {
    return ["P3", "TRANG_TRI_KHUNG"];
  }
  return ["P2", "CAN_XEM_LAI"];
}

const fullRows = [...inventory.values()]
  .map((item) => {
    const [priority, category] = classify(item);
    const curated = peopleUrls.get(item.url) ?? projectUrls.get(item.url);
    const extension = path.extname(filenameFromUrl(item.url)).replace(".", "");
    return {
      id: "",
      priority,
      category,
      current_filename: filenameFromUrl(item.url),
      extension: extension || "unknown",
      occurrences: item.occurrences,
      used_in: referencesText(item),
      current_url: item.url,
      recommended_filename:
        curated?.recommended_filename ??
        `public/images/${category.toLowerCase()}/${slugify(filenameFromUrl(item.url))}.${extension || "webp"}`,
      status: "CHO_KIEM_TRA",
      notes: item.local
        ? "Tệp đang lưu cục bộ."
        : "URL ảnh từ máy chủ bên ngoài.",
    };
  })
  .sort(
    (a, b) =>
      a.priority.localeCompare(b.priority) ||
      a.category.localeCompare(b.category) ||
      a.current_url.localeCompare(b.current_url),
  );

fullRows.forEach((row, index) => {
  row.id = `ANH-${String(index + 1).padStart(4, "0")}`;
});

fs.mkdirSync(outputDir, { recursive: true });

writeCsv(
  "01-danh-muc-anh-nguoi.csv",
  [
    "id",
    "group",
    "identity",
    "current_filename",
    "current_url",
    "placement",
    "recommended_filename",
    "required_size",
    "required_format",
    "status",
    "notes",
  ],
  peopleRows,
);

writeCsv(
  "02-danh-muc-anh-du-an.csv",
  [
    "id",
    "project_slug",
    "project_name",
    "role",
    "current_filename",
    "current_url",
    "recommended_filename",
    "required_size",
    "required_format",
    "status",
    "notes",
  ],
  projectRows,
);

writeCsv(
  "03-danh-muc-toan-bo-anh.csv",
  [
    "id",
    "priority",
    "category",
    "current_filename",
    "extension",
    "occurrences",
    "used_in",
    "current_url",
    "recommended_filename",
    "status",
    "notes",
  ],
  fullRows,
);

console.log(
  JSON.stringify(
    {
      people: peopleRows.length,
      projects: projectRows.length,
      inventory: fullRows.length,
      outputDir: relative(outputDir),
    },
    null,
    2,
  ),
);
