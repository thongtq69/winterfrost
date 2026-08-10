import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const SRC_ROOT = path.join(ROOT, "src");
const PUBLIC_ROOT = path.join(ROOT, "public");
const BRAND_WORDMARK = path.join(
  PUBLIC_ROOT,
  "images/brand/winterfrost/winterfrost-wordmark.png",
);
const BRAND_SYMBOL = path.join(
  PUBLIC_ROOT,
  "images/brand/winterfrost/winterfrost-symbol-transparent.png",
);

const projectBrands = [
  ["website-pixelnova-media", "PixelNova Media"],
  ["website-mocvan-tea", "Mocvan Tea"],
  ["aeromint-cleanroom", "Aeromint"],
  ["nivora-connect", "Nivora Connect"],
  ["app-grevia-lawn", "Grevia Lawn"],
  ["website-loomora-rugs", "Loomora Rugs"],
  ["website-chromiva-coatings", "Chromiva Coatings"],
  ["website-verdora-property", "Verdora Property"],
  ["website-candella-works", "Candella Works"],
  ["website-flexora-packaging", "Flexora Packaging"],
  ["website-polyvera", "Polyvera"],
  ["website-mirava", "Mirava"],
  ["website-bytevera", "Bytevera"],
  ["website-motoria-link", "Motoria Link"],
  ["website-dentavera", "Dentavera"],
  ["website-lumera-living", "Lumera Living"],
  ["website-auriva-land", "Auriva Land"],
  ["website-rovena-mobility", "Rovena Mobility"],
  ["website-brewvia", "Brewvia"],
  ["website-arcvera-construction", "Arcvera Construction"],
  ["website-edunora", "Edunora"],
  ["website-virela-interior", "Virela Interior"],
  ["website-ceranova", "Ceranova"],
  ["website-rovena-travel", "Rovena Travel"],
  ["website-zenovia-retail", "Zenovia Retail"],
  ["website-veloura-nails", "Veloura Nails"],
];

const serviceSourceDirectory = path.join(
  PUBLIC_ROOT,
  "images/migrated/homenest-software/wp-content/uploads/2026/04",
);
const serviceOutputDirectory = path.join(PUBLIC_ROOT, "images/services/winterfrost");

const industryIcons = [
  ["L%C4%A9nh-v%E1%BB%B1c-D%E1%BA%A7u-kh%C3%AD-HomeNest-Vi%E1%BB%87t-Nam.png", "dau-khi.png"],
  ["L%C4%A9nh-v%E1%BB%B1c-Du-l%E1%BB%8Bch-HomeNest-Vi%E1%BB%87t-Nam.png", "du-lich.png"],
  ["L%C4%A9nh-v%E1%BB%B1c-K%E1%BA%BF-to%C3%A1n-HomeNest-Vi%E1%BB%87t-Nam.png", "ke-toan.png"],
  ["L%C4%A9nh-v%E1%BB%B1c-N%C3%B4ng-nghi%E1%BB%87p-HomeNest-Vi%E1%BB%87t-Nam.png", "nong-nghiep.png"],
  ["L%C4%A9nh-v%E1%BB%B1c-Ng%C3%A2n-h%C3%A0ng-HomeNest-Vi%E1%BB%87t-Nam.png", "ngan-hang.png"],
  [
    "L%C4%A9nh-v%E1%BB%B1c-Ph%C3%A1t-tri%E1%BB%83n-%E1%BB%A9ng-d%E1%BB%A5ng-theo-y%C3%AAu-c%E1%BA%A7u-HomeNest-Vi%E1%BB%87t-Nam.png",
    "ung-dung-theo-yeu-cau.png",
  ],
  [
    "L%C4%A9nh-v%E1%BB%B1c-Ph%C3%A1t-tri%E1%BB%83n-chu%E1%BB%97i-cung-%E1%BB%A9ng-HomeNest-Vi%E1%BB%87t-Nam.png",
    "chuoi-cung-ung.png",
  ],
  [
    "L%C4%A9nh-v%E1%BB%B1c-Ph%C3%A1t-tri%E1%BB%83n-ph%E1%BA%A7n-m%E1%BB%81m-ti%E1%BB%87n-%C3%ADch-HomeNest-Vi%E1%BB%87t-Nam.png",
    "phan-mem-tien-ich.png",
  ],
  ["L%C4%A9nh-v%E1%BB%B1c-X%C3%A2y-d%E1%BB%B1ng-HomeNest-Vi%E1%BB%87t-Nam.png", "xay-dung.png"],
];

const legacyBrandNames = [
  ["Thiết kế website bất động sản Song Quân Land", "Website Auriva Land"],
  ["Website dịch vụ cho thuê xe Bontravel", "Website Rovena Mobility"],
  ["Đơn vị thiết kế, thi công xây dựng MCS", "Website Arcvera Construction"],
  ["Dự án website Chủ Quán Cà Phê", "Website Brewvia"],
  ["Website Trà Nuage Sauvage", "Website Mocvan Tea"],
  ["Website Nội Thất Thanh Tùng", "Website Lumera Living"],
  ["Website Nội thất Văn Quyết", "Website Virela Interior"],
  ["Website Candygogo Factory", "Website Candella Works"],
  ["Website Destiny Nail Bar", "Website Veloura Nails"],
  ["Destiny Nail Bar", "Veloura Nails"],
  ["Website Song Quân Ads", "Website PixelNova Media"],
  ["Website Paint and More", "Website Chromiva Coatings"],
  ["Website Kim Cương Xanh", "Website Verdora Property"],
  ["Website Bảo Vy Pottery", "Website Ceranova"],
  ["Website SingapoDent", "Website Dentavera"],
  ["Website Dava Edu", "Website Edunora"],
  ["Website Bontravel", "Website Rovena Travel"],
  ["Website HANG KENH", "Website Loomora Rugs"],
  ["App Lover’s Lawn", "App Grevia Lawn"],
  ["App Lovers Lawn", "App Grevia Lawn"],
  ["App VietPlus", "App Nivora Connect"],
  ["Peace Việt Nam", "Aeromint Cleanroom"],
  ["Bao Bì Tấn Phong", "Website Flexora Packaging"],
  ["Nhựa Khánh Phong", "Website Polyvera"],
  ["Laptop Alltech", "Website Bytevera"],
  ["AUTOLINK Vietnam", "Website Motoria Link"],
  ["Leveltrip", "Rovena Travel"],
  ["Onehouse", "Lumera Living"],
  ["Lover’s Lawn", "Grevia Lawn"],
  ["Lovers Lawn", "Grevia Lawn"],
  ["HANG KÊNH", "Loomora Rugs"],
  ["Hang Kenh", "Loomora Rugs"],
  ["Viet Plus", "Nivora Connect"],
  ["VietPlus", "Nivora Connect"],
  ["Son & Co", "Chromiva Coatings"],
  ["Khanh Phong", "Polyvera"],
  ["GolfChamp", "Grevia Lawn"],
  ["Peace Vietnam", "Aeromint"],
  ["Autolink Vietnam", "Motoria Link"],
  ["Dako Farm", "Mocvan Tea"],
  ["Green Nutri", "Mocvan Tea"],
  ["Song Quan Land", "Auriva Land"],
  ["La Cerise Dalat Villas", "Rovena Travel"],
  ["Mont Pine Realty", "Verdora Property"],
  ["SingapoDent", "Dentavera"],
  ["Gleam Haven", "Lumera Living"],
  ["Lai Thieu", "Ceranova"],
  ["Alltech Store", "Bytevera"],
  ["Mida Nail", "Veloura Nails"],
  ["Dragon Pickleball", "Grevia Lawn"],
  ["Chu Quan Ca Phe", "Brewvia"],
  ["Noi that Thanh Tung", "Lumera Living"],
  ["Xay Dung Hai Minh", "Arcvera Construction"],
  ["Phuc Thanh Phat", "Arcvera Construction"],
  ["Xuan Hoang Auto", "Rovena Mobility"],
  ["Grace Beaut Lab", "Veloura Nails"],
  ["The Sun Cosmetics", "Zenovia Retail"],
  ["The Gioi Nuoc Hoa", "Zenovia Retail"],
  ["Niziko Group", "Polyvera"],
  ["Niziko", "Polyvera"],
  ["Maico", "Mirava"],
  ["Winwin", "Flexora Packaging"],
  ["Van Phuc", "Virela Interior"],
  ["Spack", "Flexora Packaging"],
  ["Dava", "Edunora"],
  ["Mida", "Mirava"],
  ["Mira", "Mirava"],
  ["Zappa", "Zenovia Retail"],
  ["Go QuestX", "FrostMind AI"],
  ["GoQuestX", "FrostMind AI"],
  ["QuestX", "Winterfrost"],
];

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function replaceVisibleText(input) {
  const protectedValues = [];
  let text = input.replace(
    /(?:https?:\/\/|\/images\/|\/fonts\/)[^"'<>\\\s)]+/gi,
    (match) => {
      const token = `__WF_PROTECTED_${protectedValues.length}__`;
      protectedValues.push(match);
      return token;
    },
  );

  for (const [from, to] of [...legacyBrandNames].sort((a, b) => b[0].length - a[0].length)) {
    text = text.replace(new RegExp(`\\b${escapeRegExp(from)}\\b`, "giu"), to);
  }

  text = text
    .replace(/HOMENEST_/g, "WINTERFROST_")
    .replace(/\bHomeNest\.Software\b/giu, "Winterfrost")
    .replace(/\bHomeNest Software\b/giu, "Winterfrost")
    .replace(/\bHomeNest Việt Nam\b/giu, "Winterfrost")
    .replace(/\bHomeNest Viet Nam\b/giu, "Winterfrost")
    .replace(/\bHomeNestVietNam\b/giu, "Winterfrost")
    .replace(/\bHome Nest\b/giu, "Winterfrost")
    .replace(/\bHomenest\b/giu, "Winterfrost")
    .replace(/\bHomeNest\b/giu, "Winterfrost")
    .replace(/\bHOMENEST\b/gu, "WINTERFROST")
    .replaceAll("info@questx.com.vn", "info@winterfrost.tech")
    .replaceAll("Info@questx.com.vn", "info@winterfrost.tech")
    .replaceAll("tuyendung@questx.com.vn", "careers@winterfrost.tech")
    .replaceAll("info@Winterfrost.com.vn", "info@winterfrost.tech")
    .replaceAll("Info@Winterfrost.com.vn", "info@winterfrost.tech")
    .replaceAll("info@winterfrost.com.vn", "info@winterfrost.tech")
    .replaceAll("homenest_software", "winterfrost_digital")
    .replaceAll("homenest_tech", "winterfrost_labs")
    .replaceAll("homenest_media", "winterfrost_media")
    .replaceAll("HN-010", "WF-010")
    .replace(
      /Copyright © 2026 Winterfrost, A Member of Winterfrost\./g,
      "Copyright © 2026 Winterfrost. All rights reserved.",
    )
    .replace(/Copyright © 2026 Winterfrost\. A member of QuestX\. All rights reserved\./g, "Copyright © 2026 Winterfrost. All rights reserved.")
    .replace(/A member of QuestX\.\s*/g, "");

  protectedValues.forEach((value, index) => {
    text = text.replaceAll(`__WF_PROTECTED_${index}__`, value);
  });
  return text;
}

function replaceLegacyImages(input, partnerCounter) {
  let text = input
    .replaceAll(
      "/images/migrated/homenest-com-vn/wp-content/uploads/2026/04/Khoi-banner-trang-chu-HomeNest-Viet-Nam.png",
      "/images/brand/winterfrost/hero/winterfrost-platform.png",
    )
    .replaceAll(
      "/images/migrated/homenest-com-vn/wp-content/uploads/2026/04/Cot-banner-trang-chu-HomeNest-Viet-Nam.png",
      "/images/brand/winterfrost/hero/winterfrost-pillar.png",
    )
    .replaceAll(
      "/images/migrated/homenest-software/wp-content/uploads/2026/03/homenest-logo-icon.png",
      "/images/brand/winterfrost/winterfrost-symbol-transparent.png",
    )
    .replaceAll(
      "/images/migrated/homenest-software/wp-content/uploads/2026/03/web-app-development-partner-logo.webp",
      "/images/services/winterfrost/web-application-development.webp",
    )
    .replaceAll(
      "/images/migrated/homenest-software/wp-content/uploads/2026/03/Data-Dashboards.jpg",
      "/images/services/winterfrost/enterprise-software-development.webp",
    )
    .replaceAll(
      "/images/migrated/homenest-software/wp-content/uploads/2026/03/AI-Powered-Platforms.jpg",
      "/images/services/winterfrost/ai-development.webp",
    )
    .replaceAll(
      "/images/migrated/homenest-software/wp-content/uploads/2026/03/Advanced-Data-Dashboards.jpg",
      "/images/services/winterfrost/devops-development.webp",
    )
    .replaceAll(
      "/images/migrated/homenest-software/wp-content/uploads/2026/03/Scalable-E-commerce.jpg",
      "/images/services/winterfrost/saas-application-development.webp",
    )
    .replaceAll(
      "/images/migrated/homenest-software/wp-content/uploads/2026/03/Custom-API-Ecosystems.jpg",
      "/images/services/winterfrost/custom-software-solutions.webp",
    )
    .replaceAll(
      "/images/migrated/homenest-com-vn/wp-content/uploads/2026/04/boldcraft-brand-logo.jpg",
      "/images/people/van-phong/van-phong-winterfrost.webp",
    )
    .replaceAll(
      "/images/migrated/homenest-com-vn/wp-content/uploads/2026/04/Dich-vu-Thiet-ke-Website-main-image-HomeNestVietNam.jpg",
      "/images/services/winterfrost/web-application-development.webp",
    )
    .replaceAll(
      "/images/migrated/homenest-com-vn/wp-content/uploads/2026/04/Dich-vu-Phat-trien-Tri-tue-nhan-tao-AI-main-image-HomeNestVietNam.jpg",
      "/images/services/winterfrost/ai-development.webp",
    )
    .replaceAll(
      "/images/migrated/homenest-com-vn/wp-content/uploads/2026/04/Dich-vu-Phat-trien-Nen-tang-SaaS-main-image-HomeNestVietNam.jpg",
      "/images/services/winterfrost/saas-application-development.webp",
    )
    .replaceAll(
      "/images/migrated/homenest-com-vn/wp-content/uploads/2026/04/Dich-vu-Phat-trien-Ung-dung-Di-dong-main-image-HomeNestVietNam.jpg",
      "/images/services/winterfrost/mobile-app-development.webp",
    )
    .replaceAll(
      "/images/migrated/homenest-com-vn/wp-content/uploads/2026/04/Dich-vu-Van-hanh-Bao-tri-He-thong-main-image-HomeNestVietNam.jpg",
      "/images/services/winterfrost/software-maintenance-and-support.webp",
    )
    .replaceAll(
      "/images/migrated/homenest-com-vn/wp-content/uploads/2026/04/Dich-vu-Phan-mem-Quan-tri-Doanh-nghiep-main-image-HomeNestVietNam.jpg",
      "/images/services/winterfrost/enterprise-software-development.webp",
    )
    .replaceAll(
      "/images/migrated/homenest-com-vn/wp-content/uploads/2026/04/Dich-vu-phat-trien-phan-mem-MVP-HomeNest-Viet-Nam.jpg",
      "/images/services/winterfrost/mvp-software-development.webp",
    )
    .replaceAll(
      "/images/migrated/homenest-com-vn/wp-content/uploads/2026/04/Dich-vu-Phat-trien-DevOps-main-image-HomeNestVietNam.jpg",
      "/images/services/winterfrost/devops-development.webp",
    )
    .replaceAll(
      "/images/migrated/homenest-com-vn/wp-content/uploads/2026/04/Dich-vu-Phat-trien-IoT-main-image-HomeNestVietNam.jpg",
      "/images/services/winterfrost/iot-development.webp",
    )
    .replaceAll(
      "/images/migrated/homenest-com-vn/wp-content/uploads/2026/04/Dich-vu-Phat-trien-Blockchain-main-image-HomeNestVietNam.jpg",
      "/images/services/winterfrost/blockchain-development.webp",
    )
    .replaceAll(
      "/images/migrated/homenest-com-vn/wp-content/uploads/2026/05/Dich-vu-IT-main-image-HomeNestVietNam.jpg",
      "/images/services/winterfrost/custom-software-solutions.webp",
    )
    .replaceAll(
      "/images/migrated/homenest-com-vn/wp-content/uploads/2026/05/Dich-vu-Tu-van-chuyen-doi-so-main-image-HomeNestVietNam.jpg",
      "/images/services/winterfrost/generative-ai-integration.webp",
    )
    .replaceAll(
      "/images/migrated/homenest-software/wp-content/uploads/2026/04/Motoria Link-Vietnam-Partner-logo-Winterfrost.png",
      "/images/projects/website-motoria-link/brand/wordmark.png",
    )
    .replaceAll(
      "/images/migrated/homenest-software/wp-content/uploads/2026/04/Zenovia Retail-Partner-logo-Winterfrost.png",
      "/images/projects/website-zenovia-retail/brand/wordmark.png",
    )
    .replaceAll(
      "/images/migrated/homenest-com-vn/wp-content/uploads/2026/05/Du-an-website-Leveltrip.jpg",
      "/images/projects/website-rovena-travel/01-anh-bia-du-an.webp",
    )
    .replaceAll(
      "https://clutch.co/profile/homenest-software",
      "https://winterfrost.tech",
    )
    .replaceAll(
      "gioi-thieu-ai-chatbot-tai-homenest-viet-nam",
      "gioi-thieu-ai-chatbot-tai-winterfrost-viet-nam",
    )
    .replaceAll(
      "gioi-thieu-ai-chatbot-tai-Winterfrost-viet-nam",
      "gioi-thieu-ai-chatbot-tai-winterfrost-viet-nam",
    )
    .replaceAll(
      "mot-ngay-lam-viec-cua-mot-backend-engineer-tai-homenest",
      "mot-ngay-lam-viec-cua-mot-backend-engineer-tai-winterfrost",
    )
    .replaceAll(
      "mot-ngay-lam-viec-cua-mot-backend-engineer-tai-Winterfrost",
      "mot-ngay-lam-viec-cua-mot-backend-engineer-tai-winterfrost",
    )
    .replaceAll(
      "cong-viec-cua-tester-tai-Winterfrost-viet-nam-se-lam-nhung-gi",
      "cong-viec-cua-tester-tai-winterfrost-viet-nam-se-lam-nhung-gi",
    )
    .replaceAll(
      "mot-ngay-lam-viec-cua-ba-tai-Winterfrost-viet-nam",
      "mot-ngay-lam-viec-cua-ba-tai-winterfrost-viet-nam",
    )
    .replaceAll(
      "quy-trinh-thiet-ke-app-chuan-ux-ui-tai-Winterfrost",
      "quy-trinh-thiet-ke-app-chuan-ux-ui-tai-winterfrost",
    )
    .replaceAll(
      "java-developer-tai-Winterfrost-software-lam-gi-goc-nhin-tu-ben-trong",
      "java-developer-tai-winterfrost-software-lam-gi-goc-nhin-tu-ben-trong",
    )
    .replaceAll("tuyendung@Winterfrost.com.vn", "careers@winterfrost.tech")
    .replaceAll("tuyendung@winterfrost.com.vn", "careers@winterfrost.tech")
    .replaceAll(
      "/images/migrated/homenest-com-vn/wp-content/uploads/2026/04/Logo-HomeNest-Viet-Nam.png",
      "/images/brand/winterfrost/winterfrost-wordmark.png",
    )
    .replaceAll(
      "/images/migrated/homenest-com-vn/wp-content/uploads/2026/04/Logo-HomeNest-Software.png",
      "/images/brand/winterfrost/winterfrost-wordmark.png",
    )
    .replaceAll(
      "/images/migrated/homenest-com-vn/wp-content/uploads/2026/04/Logo-HomeNest-Tech.png",
      "/images/brand/winterfrost/winterfrost-wordmark.png",
    )
    .replaceAll(
      "/images/migrated/homenest-com-vn/wp-content/uploads/2026/04/Logo-HomeNest-Media.png",
      "/images/brand/winterfrost/winterfrost-wordmark.png",
    )
    .replaceAll(
      "/images/migrated/homenest-com-vn/wp-content/uploads/2026/04/ICON-ZALO-CALL-BUTTON-HOMENEST.png",
      "/images/brand/winterfrost/contact/zalo.png",
    )
    .replaceAll(
      "/images/migrated/homenest-software/wp-content/uploads/2026/03/Banner-HomeNest.Software.jpg",
      "/images/brand/winterfrost/winterfrost-banner.jpg",
    )
    .replaceAll(
      "https://www.facebook.com/homenestsoftware",
      "https://www.facebook.com/profile.php?id=61585603883149",
    )
    .replaceAll(
      "https://www.youtube.com/@homenest.official",
      "https://www.youtube.com/@winterfrost.tech",
    )
    .replaceAll(
      "https://www.linkedin.com/company/homenestsoftware/",
      "https://www.linkedin.com/company/winterfrost-tech/",
    )
    .replaceAll("https://questx.com.vn/#organization", "https://winterfrost.tech/#organization")
    .replaceAll("https://questx.com.vn/wp-content/uploads/2026/04/Questx-logo.jpg", "https://winterfrost.tech/images/brand/winterfrost/winterfrost-wordmark.png")
    .replaceAll("https://questx.com.vn", "https://winterfrost.tech")
    .replaceAll("https://api.goquestx.com/widget/widget.js", "https://winterfrost.tech/api/assistant/widget.js")
    .replaceAll("https://api.goquestx.com", "https://winterfrost.tech/api/assistant");

  text = text
    .replace(
      /\/images\/migrated\/homenest-com-vn\/wp-content\/uploads\/2025\/07\/22122544\/logo-HN-final-04-1(?:-\d+x\d+)?\.webp/giu,
      "/images/brand/winterfrost/winterfrost-wordmark.png",
    )
    .replace(
      /\/images\/migrated\/homenest-com-vn\/wp-content\/uploads\/2026\/07\/destiny-nail-bar-logo(?:-\d+x\d+)?\.jpg/giu,
      "/images/projects/website-veloura-nails/brand/wordmark.png",
    );

  text = text.replace(
    /<img\b[^>]*?src="\/images\/migrated\/homenest-software\/[^"]*Partner-logo-HomeNest\.Software\.png"[^>]*?>/giu,
    () => {
      const [directory, name] = projectBrands[partnerCounter.value % projectBrands.length];
      partnerCounter.value += 1;
      return `<img src="/images/projects/${directory}/brand/wordmark.png" alt="${name}" title="${name}" width="120"/>`;
    },
  );
  return text;
}

async function createServiceImages(replacements) {
  fs.mkdirSync(serviceOutputDirectory, { recursive: true });
  const files = fs
    .readdirSync(serviceSourceDirectory)
    .filter((file) => /SERVICES-AT-HOMENEST\.SOFTWARE\.jpg$/i.test(file))
    .sort();

  for (const file of files) {
    const source = path.join(serviceSourceDirectory, file);
    const metadata = await sharp(source).metadata();
    const width = metadata.width;
    const height = metadata.height;
    const plateWidth = Math.round(width * 0.35);
    const plateHeight = Math.round(height * 0.19);
    const left = Math.round(width * 0.025);
    const top = Math.round(height * 0.035);
    const corner = Math.max(12, Math.round(height * 0.018));
    const plate = Buffer.from(`
      <svg width="${plateWidth}" height="${plateHeight}" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="0" width="${plateWidth}" height="${plateHeight}" rx="${corner}" fill="#FFFFFF" fill-opacity=".96"/>
      </svg>
    `);
    const wordmark = await sharp(BRAND_WORDMARK)
      .resize({
        width: Math.round(plateWidth * 0.82),
        height: Math.round(plateHeight * 0.62),
        fit: "inside",
      })
      .png()
      .toBuffer();
    const wordmarkMeta = await sharp(wordmark).metadata();
    const outputName = file
      .replace(/-SERVICES-AT-HOMENEST\.SOFTWARE\.jpg$/i, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    const destination = path.join(serviceOutputDirectory, `${outputName}.webp`);
    await sharp(source)
      .composite([
        { input: plate, left, top },
        {
          input: wordmark,
          left: left + Math.round((plateWidth - wordmarkMeta.width) / 2),
          top: top + Math.round((plateHeight - wordmarkMeta.height) / 2),
        },
      ])
      .webp({ quality: 89, effort: 5 })
      .toFile(destination);

    replacements.set(
      `/images/migrated/homenest-software/wp-content/uploads/2026/04/${file}`,
      `/images/services/winterfrost/${outputName}.webp`,
    );
  }
  return files.length;
}

async function createWinterfrostBanner() {
  const destination = path.join(
    PUBLIC_ROOT,
    "images/brand/winterfrost/winterfrost-banner.jpg",
  );
  const background = Buffer.from(`
    <svg width="1508" height="1196" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#143A91"/>
          <stop offset=".58" stop-color="#247BDD"/>
          <stop offset="1" stop-color="#64C9ED"/>
        </linearGradient>
        <radialGradient id="r" cx=".82" cy=".15" r=".7">
          <stop offset="0" stop-color="#FFFFFF" stop-opacity=".22"/>
          <stop offset="1" stop-color="#FFFFFF" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="1508" height="1196" fill="url(#g)"/>
      <rect width="1508" height="1196" fill="url(#r)"/>
      <path d="M0 870 C340 660 520 1050 850 870 C1120 725 1260 760 1508 620 L1508 1196 L0 1196Z" fill="#8EDCF2" opacity=".24"/>
      <circle cx="130" cy="130" r="6" fill="#FFFFFF" opacity=".35"/>
      <circle cx="1375" cy="1020" r="7" fill="#FFFFFF" opacity=".35"/>
    </svg>
  `);
  const symbol = await sharp(BRAND_SYMBOL)
    .resize(520, 520, { fit: "contain" })
    .png()
    .toBuffer();
  await sharp(background)
    .composite([{ input: symbol, left: 494, top: 268 }])
    .jpeg({ quality: 92, mozjpeg: true })
    .toFile(destination);
}

async function createWinterfrostHeroAssets() {
  const directory = path.join(PUBLIC_ROOT, "images/brand/winterfrost/hero");
  fs.mkdirSync(directory, { recursive: true });
  const background = Buffer.from(`
    <svg width="400" height="280" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="glow" cx=".48" cy=".48" r=".52">
          <stop offset="0" stop-color="#EFFFFF" stop-opacity=".98"/>
          <stop offset=".34" stop-color="#42DBFA" stop-opacity=".92"/>
          <stop offset=".7" stop-color="#149EE8" stop-opacity=".45"/>
          <stop offset="1" stop-color="#149EE8" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="400" height="280" fill="url(#glow)"/>
      <path d="M15 155C76 82 137 76 194 112C252 149 316 125 390 54" fill="none" stroke="#B6F7FF" stroke-opacity=".7" stroke-width="5"/>
      <path d="M3 204C91 157 170 178 225 206C284 236 338 208 399 161" fill="none" stroke="#27CFFC" stroke-opacity=".55" stroke-width="4"/>
    </svg>
  `);
  const symbol = await sharp(BRAND_SYMBOL)
    .resize(126, 126, { fit: "contain" })
    .png()
    .toBuffer();
  await sharp(background)
    .composite([{ input: symbol, left: 137, top: 64 }])
    .png()
    .toFile(path.join(directory, "winterfrost-platform.png"));

  const pillarSource = path.join(
    PUBLIC_ROOT,
    "images/migrated/homenest-com-vn/wp-content/uploads/2026/04/Cot-banner-trang-chu-HomeNest-Viet-Nam.png",
  );
  await sharp(pillarSource)
    .png()
    .toFile(path.join(directory, "winterfrost-pillar.png"));
}

async function downloadIndustryIcons(replacements) {
  const directory = path.join(PUBLIC_ROOT, "images/industries/winterfrost");
  fs.mkdirSync(directory, { recursive: true });
  for (const [encodedName, localName] of industryIcons) {
    const originalUrl = `https://homenest.com.vn/assets/linh-vuc/${encodedName}`;
    const currentUrl = `https://winterfrost.tech/assets/linh-vuc/${encodedName}`;
    const response = await fetch(originalUrl);
    if (!response.ok) throw new Error(`Cannot download ${originalUrl}: ${response.status}`);
    const buffer = Buffer.from(await response.arrayBuffer());
    await sharp(buffer).png().toFile(path.join(directory, localName));
    replacements.set(currentUrl, `/images/industries/winterfrost/${localName}`);
    replacements.set(originalUrl, `/images/industries/winterfrost/${localName}`);
  }
}

function collectSourceFiles(directory, output = []) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) collectSourceFiles(fullPath, output);
    else if (/\.(?:ts|tsx|json|css)$/i.test(entry.name)) output.push(fullPath);
  }
  return output;
}

function transformJsonValue(value, replacements, partnerCounter) {
  if (typeof value === "string") {
    let text = replaceLegacyImages(value, partnerCounter);
    for (const [from, to] of replacements) text = text.replaceAll(from, to);
    return replaceVisibleText(text);
  }
  if (Array.isArray(value)) {
    return value.map((item) => transformJsonValue(item, replacements, partnerCounter));
  }
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [
        key,
        transformJsonValue(item, replacements, partnerCounter),
      ]),
    );
  }
  return value;
}

async function main() {
  const replacements = new Map();
  await createWinterfrostBanner();
  await createWinterfrostHeroAssets();
  const serviceCount = await createServiceImages(replacements);
  await downloadIndustryIcons(replacements);

  const partnerCounter = { value: 0 };
  const files = collectSourceFiles(SRC_ROOT);
  for (const file of files) {
    if (file.endsWith(".json")) {
      const data = JSON.parse(fs.readFileSync(file, "utf8"));
      const transformed = transformJsonValue(data, replacements, partnerCounter);
      fs.writeFileSync(file, `${JSON.stringify(transformed, null, 2)}\n`);
      continue;
    }
    let source = fs.readFileSync(file, "utf8");
    const before = source;
    source = replaceLegacyImages(source, partnerCounter);
    for (const [from, to] of replacements) source = source.replaceAll(from, to);
    source = replaceVisibleText(source);
    source = source
      .replaceAll('font-family: "HomeNest"', 'font-family: "Winterfrost"')
      .replaceAll("font-family: HomeNest", "font-family: Winterfrost")
      .replaceAll('--font-homenest: "HomeNest"', '--font-homenest: "Winterfrost"');
    if (source !== before) fs.writeFileSync(file, source);
  }

  console.log(`Created and integrated ${serviceCount} Winterfrost service images.`);
  console.log(`Localized ${industryIcons.length} industry icons.`);
  console.log(`Updated ${files.length} source files for visible brand text and legacy logos.`);
  console.log(`Replaced ${partnerCounter.value} legacy partner-logo tags.`);
}

await main();
