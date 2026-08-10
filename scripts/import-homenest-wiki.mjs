import { mkdir, writeFile } from "node:fs/promises";

const SOURCE_URL = "https://homenest.com.vn/wiki";
const OUTPUT_PATH = new URL("../src/_content/wiki-catalog.json", import.meta.url);
const CONCURRENCY = 12;

const CATEGORY_IMAGES = {
  AI: "ai-agent-software.png",
  "Bản tin Winterfrost": "winterfrost-news.png",
  Blockchain: "blockchain-healthcare.png",
  "Công nghệ": "technology-trends.png",
  "Giải pháp Doanh nghiệp": "crm-implementation.png",
  IoT: "blockchain-iot.png",
  "Lĩnh vực": "industry-digital-transformation.png",
  "Mobile App": "cross-platform-mobile.png",
  "Phần mềm": "javascript-modern-web.png",
  "Phương pháp phát triển": "startup-mvp.png",
  Startups: "startup-mvp.png",
  "Top List": "technology-partner-selection.png",
  "UIUX Design": "ui-ux-conversion.png",
  Website: "wordpress-enterprise.png",
  "Work Life": "winterfrost-work-life.png",
};

const AUTHOR_BY_CATEGORY = {
  AI: "Winterfrost AI Lab",
  Blockchain: "Winterfrost Research",
  "Bản tin Winterfrost": "Winterfrost Editorial",
  "Công nghệ": "Winterfrost Research",
  "Giải pháp Doanh nghiệp": "Winterfrost Solution Team",
  IoT: "Winterfrost Engineering",
  "Lĩnh vực": "Winterfrost Advisory",
  "Mobile App": "Winterfrost Product Team",
  "Phần mềm": "Winterfrost Engineering",
  "Phương pháp phát triển": "Winterfrost Engineering",
  Startups: "Winterfrost Product Team",
  "Top List": "Winterfrost Editorial",
  "UIUX Design": "Winterfrost Design Team",
  Website: "Winterfrost Web Team",
  "Work Life": "Winterfrost People",
};

function replaceBrand(value = "") {
  return value
    .replace(/HomeNest(?:\s+Việt Nam|\s+Vietnam|\.com\.vn)?/gi, "Winterfrost")
    .replace(/Go Office/gi, "Winterfrost Suite")
    .replace(/QuestX/gi, "Winterfrost");
}

function normalizeCategory(value = "Công nghệ") {
  const category = replaceBrand(value).trim();
  if (/bản tin/i.test(category)) return "Bản tin Winterfrost";
  if (/work\s*life/i.test(category)) return "Work Life";
  return CATEGORY_IMAGES[category] ? category : "Công nghệ";
}

function remakeTitle(sourceTitle) {
  let title = replaceBrand(sourceTitle)
    .replace(/Hướng Dẫn Toàn Diện Từ A[–-]Z/gi, "Lộ Trình Triển Khai Thực Tế")
    .replace(/Hướng Dẫn Chi Tiết Từng Bước Từ A[–-]Z/gi, "Lộ Trình Từ Ý Tưởng Đến Vận Hành")
    .replace(/Hướng Dẫn Chi Tiết/gi, "Cẩm Nang Thực Tiễn")
    .replace(/^Top\s+(\d+\+?)\s+/i, "Đánh Giá $1 ")
    .replace(/^Top\s+/i, "Danh Sách Đáng Chú Ý: ")
    .replace(/\s+/g, " ")
    .trim();

  if (!/^Góc Nhìn Winterfrost:/i.test(title)) title = `Góc Nhìn Winterfrost: ${title}`;
  return title;
}

function makeDescription(title, category) {
  const subject = title.replace(/^Góc Nhìn Winterfrost:\s*/i, "");
  return `Winterfrost phân tích ${subject} dưới góc nhìn ${category.toLocaleLowerCase("vi")}, tập trung vào giá trị thực tế, lựa chọn triển khai, rủi ro cần kiểm soát và khả năng mở rộng lâu dài.`;
}

async function fetchPage(page, attempt = 1) {
  const response = await fetch(`${SOURCE_URL.replace("/wiki", "/api/wiki/search")}?page=${page}&perPage=6`, {
    headers: { "user-agent": "Winterfrost-Wiki-Importer/1.0" },
  });
  if (!response.ok) {
    if (attempt < 4) return fetchPage(page, attempt + 1);
    throw new Error(`Page ${page} returned HTTP ${response.status}`);
  }
  const payload = await response.json();
  const posts = payload.nodes;
  if (!Array.isArray(posts)) {
    if (attempt < 4) return fetchPage(page, attempt + 1);
    throw new Error(`Could not decode page ${page}`);
  }
  return { posts, totalPages: Number(payload.totalPages) || 1 };
}

function toCatalogItem(post) {
  const category = normalizeCategory(post.categories?.nodes?.[0]?.name);
  const title = remakeTitle(post.title || post.slug.replaceAll("-", " "));
  return {
    slug: replaceBrand(post.slug)
      .replace(/homenest/gi, "winterfrost")
      .replace(/go-office/gi, "winterfrost-suite"),
    title,
    metaTitle: `${title} | Winterfrost`,
    metaDescription: makeDescription(title, category),
    image: `/images/wiki/winterfrost/${CATEGORY_IMAGES[category]}`,
    category,
    author: AUTHOR_BY_CATEGORY[category] || "Winterfrost Editorial",
    year: String(post.date || "2026").slice(0, 4),
  };
}

const firstPage = await fetchPage(1);
const totalPages = firstPage.totalPages;
const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
const pageResults = new Array(totalPages);
pageResults[0] = firstPage;

let cursor = 1;
async function worker() {
  while (cursor < pages.length) {
    const index = cursor;
    cursor += 1;
    pageResults[index] = await fetchPage(pages[index]);
    if ((index + 1) % 25 === 0 || index + 1 === pages.length) {
      process.stdout.write(`Imported ${index + 1}/${pages.length} pages\n`);
    }
  }
}

await Promise.all(Array.from({ length: Math.min(CONCURRENCY, totalPages) }, () => worker()));

const deduplicated = new Map();
for (const result of pageResults) {
  for (const post of result.posts) {
    const item = toCatalogItem(post);
    if (item.slug && !deduplicated.has(item.slug)) deduplicated.set(item.slug, item);
  }
}

const catalog = [...deduplicated.values()];
await mkdir(new URL("../src/_content/", import.meta.url), { recursive: true });
await writeFile(OUTPUT_PATH, `${JSON.stringify(catalog, null, 2)}\n`);
process.stdout.write(`Saved ${catalog.length} unique Wiki articles from ${totalPages} pages.\n`);
