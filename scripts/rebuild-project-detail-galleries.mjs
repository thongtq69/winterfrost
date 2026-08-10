import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const PROJECTS_ROOT = path.join(ROOT, "public/images/projects");
const MIGRATED_ROOT = path.join(ROOT, "public/images/migrated");
const INVENTORY = path.join(
  ROOT,
  "docs/hinh-anh/02-danh-muc-anh-du-an.csv",
);
const BRAND_MAP = path.join(
  ROOT,
  "docs/hinh-anh/04-winterfrost-ban-do-thuong-hieu-du-an.csv",
);

const AI_FINISHED = new Set([
  "app-grevia-lawn",
  "app-nivora-connect",
  "website-loomora-rugs",
  "website-pixelnova-media",
]);

const CENTERED_HEADER_LOGO = new Set([
  "website-mocvan-tea",
  "website-veloura-nails",
  "website-virela-interior",
]);

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;

  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];
    if (quoted) {
      if (character === '"' && text[index + 1] === '"') {
        field += '"';
        index += 1;
      } else if (character === '"') {
        quoted = false;
      } else {
        field += character;
      }
    } else if (character === '"') {
      quoted = true;
    } else if (character === ",") {
      row.push(field);
      field = "";
    } else if (character === "\n") {
      row.push(field.replace(/\r$/, ""));
      rows.push(row);
      row = [];
      field = "";
    } else {
      field += character;
    }
  }

  if (field || row.length) {
    row.push(field.replace(/\r$/, ""));
    rows.push(row);
  }

  const headers = rows.shift();
  return rows
    .filter((values) => values.some(Boolean))
    .map((values) =>
      Object.fromEntries(
        headers.map((header, index) => [header, values[index] ?? ""]),
      ),
    );
}

async function walk(directory) {
  const files = [];
  for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(fullPath)));
    else files.push(fullPath);
  }
  return files;
}

function sourceFilename(url) {
  return decodeURIComponent(path.basename(new URL(url).pathname)).toLowerCase();
}

function escapeXml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

async function darkWordmark(brandName, symbolPath, width, height) {
  const symbolSize = Math.round(height * 0.72);
  const symbol = await sharp(symbolPath)
    .resize(symbolSize, symbolSize, { fit: "contain" })
    .png()
    .toBuffer();
  const fontSize = Math.min(
    Math.round(height * 0.38),
    Math.round((width - symbolSize - 30) / Math.max(6, brandName.length) * 1.8),
  );
  const label = Buffer.from(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <text x="${symbolSize + 24}" y="${Math.round(height * 0.5)}"
        font-family="Arial, Helvetica, sans-serif" font-size="${fontSize}"
        font-weight="700" fill="#ffffff">${escapeXml(brandName)}</text>
      <text x="${symbolSize + 26}" y="${Math.round(height * 0.75)}"
        font-family="Arial, Helvetica, sans-serif" font-size="${Math.max(11, Math.round(fontSize * 0.3))}"
        font-weight="600" letter-spacing="2.5" fill="#ffffff" opacity=".72">DIGITAL EXPERIENCE</text>
    </svg>
  `);

  return sharp(label)
    .composite([
      {
        input: symbol,
        left: 0,
        top: Math.round((height - symbolSize) / 2),
      },
    ])
    .png()
    .toBuffer();
}

async function rebuildImage({
  brandName,
  destination,
  slug,
  source,
}) {
  const metadata = await sharp(source).metadata();
  const width = metadata.width;
  const height = metadata.height;
  if (!width || !height) throw new Error(`Cannot read image size: ${source}`);

  const isPortrait = height > width;
  const patchHeight = Math.round(
    isPortrait
      ? Math.min(height * 0.095, 210)
      : Math.min(Math.max(height * 0.105, 72), 126),
  );
  const patchWidth = Math.round(
    Math.min(width * (isPortrait ? 0.56 : 0.31), patchHeight * 5.2),
  );
  const patchTop = Math.max(0, Math.round(height * 0.012));
  const patchLeft = CENTERED_HEADER_LOGO.has(slug)
    ? Math.round((width - patchWidth) / 2)
    : Math.round(width * 0.035);

  const patch = await sharp(source)
    .extract({
      left: patchLeft,
      top: patchTop,
      width: patchWidth,
      height: patchHeight,
    })
    .blur(Math.max(16, Math.round(patchHeight * 0.24)))
    .png()
    .toBuffer();
  const stats = await sharp(patch).stats();
  const luminance =
    stats.channels.slice(0, 3).reduce((sum, channel) => sum + channel.mean, 0) /
    3;

  const brandDirectory = path.join(PROJECTS_ROOT, slug, "brand");
  const wordmarkPath = path.join(brandDirectory, "wordmark.png");
  const symbolPath = path.join(brandDirectory, "symbol.png");
  const markWidth = Math.round(patchWidth * 0.9);
  const markHeight = Math.round(patchHeight * 0.82);
  const wordmark = luminance < 125
    ? await darkWordmark(brandName, symbolPath, markWidth, markHeight)
    : await sharp(wordmarkPath)
        .resize(markWidth, markHeight, { fit: "inside" })
        .png()
        .toBuffer();
  const wordmarkMetadata = await sharp(wordmark).metadata();

  await fs.mkdir(path.dirname(destination), { recursive: true });
  await sharp(source)
    .composite([
      { input: patch, left: patchLeft, top: patchTop },
      {
        input: wordmark,
        left: patchLeft + Math.round((patchWidth - (wordmarkMetadata.width ?? markWidth)) / 2),
        top: patchTop + Math.round((patchHeight - (wordmarkMetadata.height ?? markHeight)) / 2),
      },
    ])
    .webp({ quality: 91, effort: 6 })
    .toFile(destination);
}

const inventory = parseCsv(await fs.readFile(INVENTORY, "utf8"));
const brands = parseCsv(await fs.readFile(BRAND_MAP, "utf8"));
const brandNames = new Map(
  brands.map((row) => [row.new_slug, row.new_brand]),
);
const migratedFiles = await walk(MIGRATED_ROOT);
const migratedByName = new Map(
  migratedFiles.map((file) => [
    decodeURIComponent(path.basename(file)).toLowerCase(),
    file,
  ]),
);

let rebuilt = 0;
const missing = [];

for (const row of inventory) {
  if (
    !row.project_slug ||
    row.role === "Ảnh bìa dự án" ||
    AI_FINISHED.has(row.project_slug) ||
    !row.current_url?.startsWith("http")
  ) {
    continue;
  }

  const source = migratedByName.get(sourceFilename(row.current_url));
  const brandName = brandNames.get(row.project_slug);
  if (!source || !brandName) {
    missing.push(`${row.project_slug}: ${row.current_filename}`);
    continue;
  }

  await rebuildImage({
    brandName,
    destination: path.join(ROOT, row.recommended_filename),
    slug: row.project_slug,
    source,
  });
  rebuilt += 1;
}

console.log(`Rebuilt ${rebuilt} authentic project-detail images.`);
if (missing.length) {
  console.log(`Skipped ${missing.length} missing rows:`);
  missing.forEach((item) => console.log(`- ${item}`));
}
