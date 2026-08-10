import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const PUBLIC_ROOT = path.join(ROOT, "public");
const OUTPUT = path.join(
  ROOT,
  "docs/hinh-anh/08-winterfrost-kho-anh-da-tich-hop.csv",
);

const roots = [
  ["Thương hiệu Winterfrost", "images/brand/winterfrost"],
  ["Dự án và thương hiệu khách hàng", "images/projects"],
  ["Nhân vật và văn phòng", "images/people"],
  ["Dịch vụ Winterfrost", "images/services/winterfrost"],
  ["Biểu tượng ngành nghề", "images/industries/winterfrost"],
];

function walk(directory, output = []) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(fullPath, output);
    else output.push(fullPath);
  }
  return output;
}

function csv(value) {
  const text = String(value ?? "");
  return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function roleFromPath(relativePath) {
  if (/\/brand\/wordmark\.png$/i.test(relativePath)) return "Logo chữ dự án";
  if (/\/brand\/symbol\.png$/i.test(relativePath)) return "Biểu tượng dự án";
  if (/master/i.test(relativePath)) return "Tệp master";
  if (/people\/cta\//i.test(relativePath)) return "Nhân vật CTA nền trong suốt";
  if (/people\/doi-ngu\//i.test(relativePath)) return "Chân dung đội ngũ";
  if (/people\/khach-hang\//i.test(relativePath)) return "Chân dung khách hàng";
  if (/people\/doi-tac\//i.test(relativePath)) return "Chân dung đối tác";
  if (/people\/work-life/i.test(relativePath)) return "Ảnh Work Life";
  if (/people\/van-phong\//i.test(relativePath)) return "Ảnh văn phòng";
  if (/01-(?:anh-bia-du-an|cover)\.webp$/i.test(relativePath)) return "Ảnh bìa dự án";
  if (/projects\//i.test(relativePath)) return "Màn hình hoặc ảnh chi tiết dự án";
  if (/services\//i.test(relativePath)) return "Ảnh dịch vụ";
  if (/industries\//i.test(relativePath)) return "Biểu tượng ngành nghề";
  if (/wordmark/i.test(relativePath)) return "Logo chữ Winterfrost";
  if (/symbol/i.test(relativePath)) return "Biểu tượng Winterfrost";
  return "Tài sản hình ảnh Winterfrost";
}

const rows = [];
for (const [group, relativeRoot] of roots) {
  const absoluteRoot = path.join(PUBLIC_ROOT, relativeRoot);
  if (!fs.existsSync(absoluteRoot)) continue;
  for (const file of walk(absoluteRoot).sort()) {
    if (!/\.(?:avif|gif|jpe?g|png|svg|webp)$/i.test(file)) continue;
    const relativePath = path.relative(PUBLIC_ROOT, file).split(path.sep).join("/");
    const stat = fs.statSync(file);
    let width = "";
    let height = "";
    let format = path.extname(file).slice(1).toUpperCase();
    try {
      const metadata = await sharp(file).metadata();
      width = metadata.width ?? "";
      height = metadata.height ?? "";
      format = (metadata.format ?? format).toUpperCase();
    } catch {
      // SVG and a few vector assets may not expose raster dimensions.
    }
    const isMaster = /(?:\/masters\/|-master\.)/i.test(relativePath);
    rows.push({
      stt: rows.length + 1,
      nhom: group,
      vai_tro: roleFromPath(relativePath),
      duong_dan_website: `/${relativePath}`,
      duong_dan_tap_tin: `public/${relativePath}`,
      dinh_dang: format,
      kich_thuoc_px: width && height ? `${width} × ${height}` : "",
      dung_luong_kb: Math.round(stat.size / 1024),
      trang_thai: isMaster ? "MASTER_LUU_TRU" : "DA_TICH_HOP",
    });
  }
}

const columns = [
  "stt",
  "nhom",
  "vai_tro",
  "duong_dan_website",
  "duong_dan_tap_tin",
  "dinh_dang",
  "kich_thuoc_px",
  "dung_luong_kb",
  "trang_thai",
];
const lines = [
  columns.join(","),
  ...rows.map((row) => columns.map((column) => csv(row[column])).join(",")),
];
fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
fs.writeFileSync(OUTPUT, `${lines.join("\n")}\n`);

const integrated = rows.filter((row) => row.trang_thai === "DA_TICH_HOP").length;
const masters = rows.length - integrated;
console.log(
  `Wrote ${rows.length} assets (${integrated} integrated, ${masters} masters) to ${path.relative(ROOT, OUTPUT)}.`,
);
