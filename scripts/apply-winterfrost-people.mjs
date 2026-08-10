import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const CSV_PATH = path.join(ROOT, "docs/hinh-anh/01-danh-muc-anh-nguoi.csv");
const PUBLIC = path.join(ROOT, "public");

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    if (quoted) {
      if (char === '"' && text[index + 1] === '"') {
        field += '"';
        index += 1;
      } else if (char === '"') {
        quoted = false;
      } else {
        field += char;
      }
    } else if (char === '"') {
      quoted = true;
    } else if (char === ",") {
      row.push(field);
      field = "";
    } else if (char === "\n") {
      row.push(field.replace(/\r$/, ""));
      rows.push(row);
      row = [];
      field = "";
    } else {
      field += char;
    }
  }

  if (field || row.length) {
    row.push(field.replace(/\r$/, ""));
    rows.push(row);
  }

  const headers = rows.shift();
  return rows
    .filter((values) => values.some(Boolean))
    .map((values) => Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ""])));
}

function csvCell(value) {
  const stringValue = String(value ?? "");
  if (!/[",\n]/.test(stringValue)) return stringValue;
  return `"${stringValue.replaceAll('"', '""')}"`;
}

function writeCsv(rows) {
  const headers = [
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
  ];
  const lines = [headers.join(",")];
  for (const row of rows) lines.push(headers.map((header) => csvCell(row[header])).join(","));
  fs.writeFileSync(CSV_PATH, `${lines.join("\n")}\n`);
}

function localPathFromOriginalUrl(url) {
  if (url.startsWith("https://image.homenest.com.vn")) {
    return `/images/migrated/homenest-com-vn${new URL(url).pathname}`;
  }
  if (url.startsWith("https://image.homenest.software")) {
    return `/images/migrated/homenest-software${new URL(url).pathname}`;
  }
  return url;
}

function slugify(value) {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const teamIdentities = [
  ["Nguyễn Hoàng Nam", "portrait-nam-01.webp"],
  ["Trần Ngọc Anh", "portrait-nu-01.webp"],
  ["Lê Minh Long", "portrait-nam-06.webp"],
  ["Phạm Quốc Huy", "portrait-nam-02.webp"],
  ["Võ Hoàng An", "portrait-nam-03.webp"],
  ["Đặng Gia Duy", "portrait-nam-04.webp"],
  ["Bùi Hải Đăng", "portrait-nam-05.webp"],
  ["Nguyễn Minh Tài", "team-nguyen-minh-tai.webp"],
  ["Trần Đức Hoàng", "team-tran-duc-hoang.webp"],
  ["Lê Thu Hằng", "portrait-nu-03.webp"],
  ["Phạm Khánh Yến", "portrait-nu-02.webp"],
  ["Võ Anh Vũ", "team-vo-anh-vu.webp"],
  ["Đặng Hùng Cường", "team-dang-hung-cuong.webp"],
  ["Nguyễn Minh Thức", "team-nguyen-minh-thuc.webp"],
  ["Trần Gia Tín", "team-tran-gia-tin.webp"],
  ["Lê Thanh Thư", "portrait-nu-05.webp"],
  ["Phạm Anh Tuấn", "team-pham-anh-tuan.webp"],
  ["Võ Minh Trí", "team-vo-minh-tri.webp"],
  ["Nguyễn Chí Nhân", "team-nguyen-chi-nhan.webp"],
  ["Trần Tiến Phát", "team-tran-tien-phat.webp"],
  ["Lê Thu Thảo", "portrait-nu-04.webp"],
  ["Phạm Đức Thắng", "team-pham-duc-thang.webp"],
  ["Võ Tấn Huy", "team-vo-tan-huy.webp"],
  ["Đặng Minh Sang", "team-dang-minh-sang.webp"],
  ["Nguyễn Hồng Nhung", "team-nguyen-hong-nhung.webp"],
  ["Trần Gia Bảo", "team-tran-gia-bao.webp"],
  ["Lê Khải Khang", "team-le-khai-khang.webp"],
  ["Phạm Thanh Phúc", "team-pham-thanh-phuc.webp"],
  ["Võ Thanh Mai", "team-vo-thanh-mai.webp"],
  ["Nguyễn Đức Thành", "team-nguyen-duc-thanh.webp"],
  ["Trần Quỳnh Anh", "team-tran-quynh-anh.webp"],
];

const customerIdentities = [
  ["Nguyễn Quốc Việt — Giám đốc Verdora Property", "portrait-nam-01.webp"],
  ["Trần Minh Châu — Quản lý Loomora Rugs", "portrait-nu-05.webp"],
  ["Lê Đức Anh — Nhà sáng lập Bytevera", "portrait-nam-05.webp"],
  ["Phạm Hải Long — Đồng sáng lập Aeromint", "portrait-nam-03.webp"],
  ["Võ Thanh Hương — Giám đốc Marketing Chromiva Coatings", "portrait-nu-03.webp"],
  ["Đặng Minh Khoa — Quản lý sản phẩm Nivora Connect", "portrait-nam-04.webp"],
];

const partnerIdentities = [
  ["Nguyễn Gia Hân — Marketing Director, Rovena Travel", "portrait-nu-05.webp"],
  ["Trần Bảo Ngọc — Project Manager, Edunora", "portrait-nu-03.webp"],
  ["Lê Quang Huy — CEO, Ceranova", "portrait-nam-01.webp"],
  ["Phạm Thu Hà — Operations Manager, Candella Works", "portrait-nu-06.webp"],
  ["Võ Khánh Linh — Marketing Manager, Veloura Nails", "portrait-nu-02.webp"],
  ["Đặng Quốc Bảo — Co-founder, Auriva Land", "portrait-nam-03.webp"],
  ["Bùi Minh Đức — Đại diện Motoria Link", "portrait-nam-05.webp"],
  ["Nguyễn Thảo Vy — Đại diện Brewvia", "portrait-nu-01.webp"],
  ["Trần Khánh Phong — Đại diện Grevia Lawn", "portrait-nam-02.webp"],
  ["Lê Kiến An — Đại diện Arcvera Construction", "portrait-nam-06.webp"],
  ["Phạm Minh Anh — Đại diện Mirava", "portrait-nu-04.webp"],
  ["Võ Nhật Nam — Đại diện Polyvera", "portrait-nam-04.webp"],
  ["Đặng Hoài Thương — Đại diện Lumera Living", "portrait-nu-06.webp"],
  ["Nguyễn Tuấn Kiệt — Đại diện Mocvan Tea", "portrait-nam-02.webp"],
];

const fixedPeople = {
  "NGUOI-001": {
    identity: "Lê Khải Minh — Co-Founder Winterfrost",
    target: "/images/people/founder/winterfrost/le-khai-minh.webp",
  },
  "NGUOI-053": {
    identity: "Trần Hoài An — Khách hàng Winterfrost",
    portrait: "portrait-nu-01.webp",
    target: "/images/people/anh-hoi-thoai/tran-hoai-an.webp",
    width: 1000,
    height: 1000,
  },
  "NGUOI-054": {
    identity: "Chuyên viên giải pháp công nghệ",
    target: "/images/people/cta/winterfrost/chuyen-vien-nam-tre.png",
  },
  "NGUOI-055": {
    identity: "Quản lý giải pháp doanh nghiệp",
    target: "/images/people/cta/winterfrost/quan-ly-nam.png",
  },
  "NGUOI-056": {
    identity: "Kỹ sư công nghệ trẻ",
    target: "/images/people/cta/winterfrost/nhan-vien-cong-nghe-tre.png",
  },
  "NGUOI-057": {
    identity: "Chuyên viên tư vấn khách hàng",
    target: "/images/people/cta/winterfrost/chuyen-vien-nu.png",
  },
  "NGUOI-058": {
    identity: "Chuyên viên tư vấn Winterfrost",
    target: "/images/people/cta/winterfrost/chuyen-vien-tu-van-viet-nam.png",
  },
  "NGUOI-059": {
    identity: "Đội ngũ công nghệ Winterfrost",
    target: "/images/people/tuyen-dung/doi-ngu-winterfrost.webp",
  },
  "NGUOI-060": {
    identity: "Một ngày làm việc của đội ngũ kiểm thử Winterfrost",
    target: "/images/people/work-life/mot-ngay-kiem-thu-winterfrost.webp",
  },
  "NGUOI-061": {
    identity: "Một ngày làm việc của Business Analyst Winterfrost",
    target: "/images/people/work-life/mot-ngay-business-analyst-winterfrost.webp",
  },
  "NGUOI-062": {
    identity: "Một ngày làm việc của Flutter Developer Winterfrost",
    target: "/images/people/work-life/mot-ngay-flutter-developer-winterfrost.webp",
  },
  "NGUOI-063": {
    identity: "Văn phòng Winterfrost",
    target: "/images/people/van-phong/van-phong-winterfrost.webp",
  },
  "NGUOI-064": {
    identity: "Trần Gia Bảo — Backend Engineer",
    target: "/images/people/work-life-chi-tiet/tran-gia-bao-backend-engineer.webp",
  },
  "NGUOI-065": {
    identity: "Bắt đầu ngày làm việc của Backend Engineer",
    target: "/images/people/work-life-chi-tiet/bat-dau-ngay-lam-viec-backend.webp",
  },
  "NGUOI-066": {
    identity: "Quá trình làm việc của Backend Developer",
    target: "/images/people/work-life-chi-tiet/qua-trinh-lam-viec-backend.webp",
  },
  "NGUOI-067": {
    identity: "Trao đổi công việc Backend",
    target: "/images/people/work-life-chi-tiet/trao-doi-cong-viec-backend.webp",
  },
  "NGUOI-068": {
    identity: "Đội ngũ Software Engineer Winterfrost",
    target: "/images/people/work-life-chi-tiet/doi-ngu-software-engineer-winterfrost.webp",
  },
  "NGUOI-069": {
    identity: "Tester Nguyễn Quốc Huy và Trần Thục Quyên",
    target: "/images/people/work-life-chi-tiet/hai-chuyen-vien-kiem-thu.webp",
  },
  "NGUOI-070": {
    identity: "Họp nhóm đầu ngày — Kiểm thử phần mềm",
    target: "/images/people/work-life-chi-tiet/hop-nhom-dau-ngay-kiem-thu.webp",
  },
  "NGUOI-071": {
    identity: "Kinh nghiệm dành cho Tester mới",
    target: "/images/people/work-life-chi-tiet/kinh-nghiem-cho-tester-moi.webp",
  },
  "NGUOI-072": {
    identity: "Nguyễn Quốc Huy — Software Tester",
    target: "/images/people/work-life-chi-tiet/nguyen-quoc-huy-tester.webp",
  },
  "NGUOI-073": {
    identity: "Trần Thục Quyên — Software Tester",
    target: "/images/people/work-life-chi-tiet/tran-thuc-quyen-tester.webp",
  },
  "NGUOI-074": {
    identity: "Võ Tuấn Tài và Lê Minh Khương — Business Analyst",
    target: "/images/people/work-life-chi-tiet/hai-chuyen-vien-ba.webp",
  },
  "NGUOI-075": {
    identity: "Business Analyst họp dự án",
    target: "/images/people/work-life-chi-tiet/ba-hop-du-an.webp",
  },
  "NGUOI-076": {
    identity: "Lê Minh Khương — Business Analyst",
    target: "/images/people/work-life-chi-tiet/le-minh-khuong-business-analyst.webp",
  },
  "NGUOI-077": {
    identity: "Võ Tuấn Tài — Business Analyst",
    target: "/images/people/work-life-chi-tiet/vo-tuan-tai-business-analyst.webp",
  },
  "NGUOI-078": {
    identity: "Kinh nghiệm dành cho Business Analyst mới",
    target: "/images/people/work-life-chi-tiet/kinh-nghiem-cho-ba-moi.webp",
  },
  "NGUOI-079": {
    identity: "Nguyễn Gia Bảo — Flutter Developer",
    target: "/images/people/work-life-chi-tiet/nguyen-gia-bao-flutter-developer.webp",
  },
  "NGUOI-080": {
    identity: "Một ngày làm việc của Flutter Developer",
    target: "/images/people/work-life-chi-tiet/mot-ngay-flutter-developer.webp",
  },
};

const rows = parseCsv(fs.readFileSync(CSV_PATH, "utf8"));
const replacements = new Map();
const identityReplacements = new Map();
const portraitRoot = path.join(PUBLIC, "images/people/library/winterfrost");

async function createPortrait(sourceName, target, width, height, seed) {
  const targetPath = path.join(PUBLIC, target.replace(/^\/images\//, "images/"));
  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  await sharp(path.join(portraitRoot, sourceName))
    .resize(width, height, {
      fit: "cover",
      position: seed % 3 === 0 ? "north" : seed % 3 === 1 ? "attention" : "centre",
    })
    .modulate({
      brightness: 0.98 + (seed % 5) * 0.008,
      saturation: 0.94 + (seed % 4) * 0.025,
    })
    .webp({ quality: 88, effort: 5 })
    .toFile(targetPath);
}

for (let index = 0; index < rows.length; index += 1) {
  const row = rows[index];
  const originalIdentity = row.identity;
  const oldLocalPath = localPathFromOriginalUrl(row.current_url);
  let spec = fixedPeople[row.id];

  if (row.id >= "NGUOI-002" && row.id <= "NGUOI-032") {
    const [identity, portrait] = teamIdentities[Number(row.id.slice(-3)) - 2];
    const target = `/images/people/doi-ngu/${slugify(identity)}.webp`;
    spec = { identity, portrait, target, width: 1200, height: 1500 };
  } else if (row.id >= "NGUOI-033" && row.id <= "NGUOI-038") {
    const [identity, portrait] = customerIdentities[Number(row.id.slice(-3)) - 33];
    const target = `/images/people/khach-hang/${slugify(identity.split(" — ")[0])}.webp`;
    spec = { identity, portrait, target, width: 1000, height: 1000 };
  } else if (row.id >= "NGUOI-039" && row.id <= "NGUOI-052") {
    const [identity, portrait] = partnerIdentities[Number(row.id.slice(-3)) - 39];
    const target = `/images/people/doi-tac/${slugify(identity.split(" — ")[0])}.webp`;
    spec = { identity, portrait, target, width: 1000, height: 1000 };
  }

  if (!spec) throw new Error(`Missing person mapping for ${row.id}`);
  if (spec.portrait) {
    await createPortrait(spec.portrait, spec.target, spec.width, spec.height, index);
  }

  replacements.set(oldLocalPath, spec.target);
  replacements.set(row.current_url, spec.target);
  if (row.current_url.startsWith("https://homenest.com.vn/")) {
    replacements.set(row.current_url.replace("https://homenest.com.vn", "https://winterfrost.tech"), spec.target);
  }
  identityReplacements.set(originalIdentity, spec.identity);

  row.identity = spec.identity;
  row.recommended_filename = `public${spec.target}`;
  row.status = "DA_TAO_VA_TICH_HOP";
  row.notes = "Ảnh người Việt đã tạo, chuẩn hóa đúng tỷ lệ và tích hợp vào dữ liệu Winterfrost.";
}

replacements.set(
  "/images/migrated/homenest-com-vn/wp-content/uploads/2026/04/homenest-icon-logo.svg",
  "/images/brand/winterfrost/winterfrost-symbol-transparent.png",
);

const stringReplacements = [
  ["Vũ Sơn", "Nguyễn Quốc Việt"],
  ["CEO tại HÀNG KÊNH", "Giám đốc Verdora Property"],
  ["Ngô Tươi", "Trần Minh Châu"],
  ["Quản lý tại Peace Viet Nam và Nguyen Le Gift", "Quản lý Loomora Rugs"],
  ["Nguyễn Bách", "Lê Đức Anh"],
  ["David Chen", "Phạm Hải Long"],
  ["Chris Trần", "Võ Thanh Hương"],
  ["Lê Minh Khang", "Đặng Minh Khoa"],
  ["Product Marketing Manager", "Quản lý sản phẩm Nivora Connect"],
  ["Minh Tâm", "Nguyễn Gia Hân"],
  ["Marketing Director, Leveltrip", "Marketing Director, Rovena Travel"],
  ["Kiều Loan", "Trần Bảo Ngọc"],
  ["Ngọc Triều", "Lê Quang Huy"],
  ["Ngọc Hà", "Phạm Thu Hà"],
  ["Thu Tuyết", "Võ Khánh Linh"],
  ["Tấn Khang", "Đặng Quốc Bảo"],
  ["Anh Quân", "Nguyễn Quốc Huy"],
  ["Võ Văn Tư Tài", "Võ Tuấn Tài"],
  ["Hứa Minh Khương", "Lê Minh Khương"],
  ["Võ Ngọc Gia Bảo", "Nguyễn Gia Bảo"],
];

const textFiles = [];
function collectFiles(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) collectFiles(fullPath);
    else if (/\.(?:ts|tsx|json|css|md)$/i.test(entry.name)) textFiles.push(fullPath);
  }
}
collectFiles(path.join(ROOT, "src"));

for (const file of textFiles) {
  let source = fs.readFileSync(file, "utf8");
  const before = source;
  for (const [from, to] of replacements) source = source.replaceAll(from, to);
  for (const [from, to] of stringReplacements) source = source.replaceAll(from, to);
  if (source !== before) fs.writeFileSync(file, source);
}

writeCsv(rows);
console.log(`Integrated ${rows.length} people records.`);
console.log(`Updated ${textFiles.length} source files scanned for people references.`);
