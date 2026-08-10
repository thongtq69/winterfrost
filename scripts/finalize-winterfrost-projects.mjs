import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const PROJECTS_ROOT = path.join(ROOT, "public/images/projects");
const ABOUT_ROOT = path.join(PROJECTS_ROOT, "gioi-thieu-nang-luc");

const brands = [
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

function escapeXml(value) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

async function ensureNivoraWordmark() {
  const destination = path.join(PROJECTS_ROOT, "nivora-connect/brand/wordmark.png");
  const symbol = await sharp(path.join(PROJECTS_ROOT, "nivora-connect/brand/nivora-symbol.png"))
    .resize(150, 150, { fit: "contain" })
    .png()
    .toBuffer();
  const label = Buffer.from(`
    <svg width="720" height="160" xmlns="http://www.w3.org/2000/svg">
      <rect width="720" height="160" fill="none"/>
      <text x="178" y="104" font-family="Arial, Helvetica, sans-serif" font-size="70" font-weight="700" fill="#102B5F">Nivora Connect</text>
    </svg>
  `);
  await sharp(label)
    .composite([{ input: symbol, left: 8, top: 5 }])
    .png()
    .toFile(destination);
}

function roundedCard(x, y, width, height, fill = "#ffffff") {
  return `<rect x="${x}" y="${y}" width="${width}" height="${height}" rx="30" fill="${fill}"/>`;
}

async function makeMobileScreen({
  destination,
  brandDirectory,
  brandName,
  eyebrow,
  title,
  subtitle,
  primary,
  secondary,
  cover,
  variant,
}) {
  const width = 856;
  const height = 1852;
  const wordmarkPath = path.join(PROJECTS_ROOT, brandDirectory, "brand/wordmark.png");
  const wordmark = await sharp(wordmarkPath)
    .resize({ width: 520, height: 136, fit: "inside" })
    .png()
    .toBuffer();
  const coverImage = await sharp(path.join(PROJECTS_ROOT, cover))
    .resize(744, 430, { fit: "cover", position: "attention" })
    .webp({ quality: 88 })
    .toBuffer();

  const content =
    variant === 1
      ? `
        ${roundedCard(56, 1030, 744, 238)}
        <circle cx="138" cy="1110" r="42" fill="${secondary}"/>
        <text x="205" y="1100" font-family="Arial" font-size="30" font-weight="700" fill="#13294B">Cộng đồng của bạn</text>
        <text x="205" y="1144" font-family="Arial" font-size="24" fill="#64748B">Kết nối, trò chuyện và sẻ chia</text>
        <rect x="205" y="1185" width="310" height="18" rx="9" fill="#DCE8F8"/>
        ${roundedCard(56, 1300, 358, 330, "#FFFFFF")}
        ${roundedCard(442, 1300, 358, 330, "#FFFFFF")}
        <circle cx="126" cy="1380" r="38" fill="${primary}"/>
        <circle cx="512" cy="1380" r="38" fill="${secondary}"/>
        <text x="92" y="1490" font-family="Arial" font-size="28" font-weight="700" fill="#13294B">Nhà ở</text>
        <text x="478" y="1490" font-family="Arial" font-size="28" font-weight="700" fill="#13294B">Dịch vụ</text>
      `
      : variant === 2
        ? `
          <text x="56" y="1050" font-family="Arial" font-size="32" font-weight="700" fill="#13294B">Khám phá hôm nay</text>
          ${roundedCard(56, 1090, 232, 360)}
          ${roundedCard(312, 1090, 232, 360)}
          ${roundedCard(568, 1090, 232, 360)}
          <rect x="76" y="1114" width="192" height="190" rx="22" fill="#F2EDE7"/>
          <rect x="332" y="1114" width="192" height="190" rx="22" fill="#E5EEF7"/>
          <rect x="588" y="1114" width="192" height="190" rx="22" fill="#F4E7EE"/>
          <circle cx="172" cy="1208" r="54" fill="${primary}" opacity=".88"/>
          <circle cx="428" cy="1208" r="54" fill="${secondary}" opacity=".88"/>
          <circle cx="684" cy="1208" r="54" fill="${primary}" opacity=".65"/>
          <text x="82" y="1360" font-family="Arial" font-size="24" font-weight="700" fill="#13294B">Bộ sưu tập mới</text>
          <text x="338" y="1360" font-family="Arial" font-size="24" font-weight="700" fill="#13294B">Ưu đãi nổi bật</text>
          <text x="594" y="1360" font-family="Arial" font-size="24" font-weight="700" fill="#13294B">Gợi ý cho bạn</text>
          ${roundedCard(56, 1490, 744, 160, primary)}
          <text x="100" y="1560" font-family="Arial" font-size="28" font-weight="700" fill="#FFFFFF">Trải nghiệm mua sắm tinh gọn</text>
          <text x="100" y="1604" font-family="Arial" font-size="22" fill="#FFFFFF" opacity=".85">Sản phẩm được tuyển chọn mỗi ngày</text>
        `
        : `
          ${roundedCard(56, 1030, 744, 150, "#FFFFFF")}
          <circle cx="126" cy="1105" r="42" fill="${primary}"/>
          <text x="194" y="1092" font-family="Arial" font-size="28" font-weight="700" fill="#13294B">Thiết bị công nghệ chính hãng</text>
          <text x="194" y="1132" font-family="Arial" font-size="22" fill="#64748B">Bảo hành minh bạch, giao hàng nhanh</text>
          <text x="56" y="1260" font-family="Arial" font-size="32" font-weight="700" fill="#13294B">Sản phẩm nổi bật</text>
          ${roundedCard(56, 1300, 358, 330, "#FFFFFF")}
          ${roundedCard(442, 1300, 358, 330, "#FFFFFF")}
          <rect x="90" y="1340" width="290" height="150" rx="24" fill="#E8F0FF"/>
          <rect x="476" y="1340" width="290" height="150" rx="24" fill="#EEF2F7"/>
          <path d="M150 1415h170" stroke="${primary}" stroke-width="26" stroke-linecap="round"/>
          <rect x="548" y="1380" width="146" height="84" rx="12" fill="${secondary}"/>
          <text x="90" y="1544" font-family="Arial" font-size="25" font-weight="700" fill="#13294B">Laptop hiệu năng cao</text>
          <text x="476" y="1544" font-family="Arial" font-size="25" font-weight="700" fill="#13294B">Phụ kiện thông minh</text>
        `;

  const svg = Buffer.from(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="hero" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="${primary}"/>
          <stop offset="1" stop-color="${secondary}"/>
        </linearGradient>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="18" stdDeviation="28" flood-color="#102B5F" flood-opacity=".12"/>
        </filter>
      </defs>
      <rect width="${width}" height="${height}" fill="#F4F7FB"/>
      <rect width="${width}" height="560" fill="url(#hero)"/>
      <circle cx="760" cy="110" r="180" fill="#FFFFFF" opacity=".08"/>
      <circle cx="100" cy="450" r="140" fill="#FFFFFF" opacity=".08"/>
      <text x="56" y="238" font-family="Arial" font-size="25" font-weight="700" letter-spacing="3" fill="#FFFFFF" opacity=".82">${escapeXml(eyebrow)}</text>
      <text x="56" y="318" font-family="Arial" font-size="52" font-weight="700" fill="#FFFFFF">${escapeXml(title)}</text>
      <text x="56" y="370" font-family="Arial" font-size="25" fill="#FFFFFF" opacity=".85">${escapeXml(subtitle)}</text>
      <rect x="56" y="435" width="264" height="70" rx="35" fill="#FFFFFF"/>
      <text x="95" y="480" font-family="Arial" font-size="25" font-weight="700" fill="${primary}">Khám phá ngay</text>
      <g filter="url(#shadow)">
        <rect x="56" y="620" width="744" height="430" rx="38" fill="#FFFFFF"/>
      </g>
      ${content}
      <rect x="178" y="1752" width="500" height="8" rx="4" fill="#CDD7E5"/>
      <text x="56" y="1730" font-family="Arial" font-size="20" fill="#64748B">${escapeXml(brandName)} · Sản phẩm số được phát triển cùng Winterfrost</text>
    </svg>
  `);

  await sharp(svg)
    .composite([
      { input: wordmark, left: 56, top: 54 },
      { input: coverImage, left: 56, top: 620 },
    ])
    .webp({ quality: 89, effort: 5 })
    .toFile(destination);
}

function localMigratedUrl(original) {
  const url = new URL(original);
  return `/images/migrated/homenest-com-vn${url.pathname}`;
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let quote = false;
  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    if (quote) {
      if (char === '"' && text[index + 1] === '"') {
        field += '"';
        index += 1;
      } else if (char === '"') quote = false;
      else field += char;
    } else if (char === '"') quote = true;
    else if (char === ",") {
      row.push(field);
      field = "";
    } else if (char === "\n") {
      row.push(field.replace(/\r$/, ""));
      rows.push(row);
      row = [];
      field = "";
    } else field += char;
  }
  if (field || row.length) {
    row.push(field.replace(/\r$/, ""));
    rows.push(row);
  }
  const headers = rows.shift();
  return {
    headers,
    rows: rows.filter((values) => values.some(Boolean)).map((values) =>
      Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ""])),
    ),
  };
}

function csvCell(value) {
  const string = String(value ?? "");
  return /[",\n]/.test(string) ? `"${string.replaceAll('"', '""')}"` : string;
}

async function main() {
  fs.mkdirSync(ABOUT_ROOT, { recursive: true });
  await ensureNivoraWordmark();
  await makeMobileScreen({
    destination: path.join(ABOUT_ROOT, "01-man-hinh-mobile-1.webp"),
    brandDirectory: "nivora-connect",
    brandName: "Nivora Connect",
    eyebrow: "KẾT NỐI CỘNG ĐỒNG",
    title: "Gần nhau hơn mỗi ngày",
    subtitle: "Một không gian số dành cho cộng đồng người Việt.",
    primary: "#102B5F",
    secondary: "#35BCEB",
    cover: "nivora-connect/05-home.webp",
    variant: 1,
  });
  await makeMobileScreen({
    destination: path.join(ABOUT_ROOT, "02-man-hinh-mobile-2.webp"),
    brandDirectory: "website-zenovia-retail",
    brandName: "Zenovia Retail",
    eyebrow: "TRẢI NGHIỆM BÁN LẺ",
    title: "Mua sắm theo cách riêng",
    subtitle: "Tinh gọn hành trình từ khám phá đến thanh toán.",
    primary: "#151515",
    secondary: "#A6D64A",
    cover: "website-zenovia-retail/01-anh-bia-du-an.webp",
    variant: 2,
  });
  await makeMobileScreen({
    destination: path.join(ABOUT_ROOT, "03-man-hinh-mobile-3.webp"),
    brandDirectory: "website-bytevera",
    brandName: "Bytevera",
    eyebrow: "CÔNG NGHỆ THÔNG MINH",
    title: "Thiết bị đúng nhu cầu",
    subtitle: "Khám phá sản phẩm công nghệ đáng tin cậy.",
    primary: "#111827",
    secondary: "#2176FF",
    cover: "website-bytevera/01-anh-bia-du-an.webp",
    variant: 3,
  });

  const siteDataPath = path.join(ROOT, "src/lib/site-data.json");
  const siteData = JSON.parse(fs.readFileSync(siteDataPath, "utf8"));
  const partnerLogos = Array.from({ length: 32 }, (_, index) => {
    const [directory, name] = brands[index % brands.length];
    return {
      src: `/images/projects/${directory}/brand/wordmark.png`,
      alt: name,
    };
  });
  siteData.home.partnersMarquee.logos = partnerLogos;
  siteData.home.partnersMarquee.avatars = partnerLogos.slice(0, 5).map((logo) => logo.src);
  fs.writeFileSync(siteDataPath, `${JSON.stringify(siteData, null, 2)}\n`);

  const csvPath = path.join(ROOT, "docs/hinh-anh/02-danh-muc-anh-du-an.csv");
  const parsed = parseCsv(fs.readFileSync(csvPath, "utf8"));
  const aboutRows = parsed.rows.filter((row) => ["DUAN-129", "DUAN-130", "DUAN-131"].includes(row.id));
  const replacements = new Map();
  aboutRows.forEach((row, index) => {
    const target = `/images/projects/gioi-thieu-nang-luc/0${index + 1}-man-hinh-mobile-${index + 1}.webp`;
    replacements.set(localMigratedUrl(row.current_url), target);
    replacements.set(row.current_url, target);
    row.recommended_filename = `public${target}`;
    row.status = "DA_TAO_VA_TICH_HOP";
    row.notes = "Màn hình mobile thương hiệu mới đã tạo đúng tỷ lệ 428:926 và tích hợp.";
  });

  const nivoraRows = parsed.rows.filter((row) => row.id >= "DUAN-022" && row.id <= "DUAN-027");
  const nivoraFiles = [
    "01-cover.webp",
    "02-messaging.webp",
    "03-housing.webp",
    "04-login.webp",
    "05-home.webp",
    "06-community.webp",
  ];
  nivoraRows.forEach((row, index) => {
    row.project_slug = "app-nivora-connect";
    row.project_name = "App Nivora Connect";
    row.recommended_filename = `public/images/projects/nivora-connect/${nivoraFiles[index]}`;
    row.status = "DA_TAO_VA_TICH_HOP";
    row.notes = "Đã tạo bộ giao diện Nivora Connect mới và tích hợp.";
  });
  const nivoraShowcase = parsed.rows.find((row) => row.id === "DUAN-147");
  if (nivoraShowcase) {
    nivoraShowcase.recommended_filename =
      "public/images/projects/showcase-tong-hop/16-anh-collage-showcase.webp";
    nivoraShowcase.status = "DA_TAO_VA_TICH_HOP";
    nivoraShowcase.notes =
      "Đã thay bằng ảnh dự án Nivora Connect, không còn nhận diện dự án cũ.";
  }

  const lines = [parsed.headers.join(",")];
  for (const row of parsed.rows) lines.push(parsed.headers.map((header) => csvCell(row[header])).join(","));
  fs.writeFileSync(csvPath, `${lines.join("\n")}\n`);

  const textFiles = [];
  function collect(directory) {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      const fullPath = path.join(directory, entry.name);
      if (entry.isDirectory()) collect(fullPath);
      else if (/\.(?:ts|tsx|json|css)$/i.test(entry.name)) textFiles.push(fullPath);
    }
  }
  collect(path.join(ROOT, "src"));
  for (const file of textFiles) {
    let text = fs.readFileSync(file, "utf8");
    const before = text;
    for (const [from, to] of replacements) text = text.replaceAll(from, to);
    if (text !== before) fs.writeFileSync(file, text);
  }

  const brandMapPath = path.join(ROOT, "docs/hinh-anh/04-winterfrost-ban-do-thuong-hieu-du-an.csv");
  const brandMap = fs
    .readFileSync(brandMapPath, "utf8")
    .replaceAll("CHO_TAO_LOGO_VA_ANH", "HOAN_THANH_VA_DA_TICH_HOP");
  fs.writeFileSync(brandMapPath, brandMap);

  console.log("Created 3 mobile capability screens.");
  console.log("Replaced partner ticker with 32 Winterfrost project wordmarks.");
  console.log("Marked all project brand mappings as integrated.");
}

await main();
