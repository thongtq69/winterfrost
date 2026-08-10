import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const PROJECT_CSV = path.join(
  ROOT,
  "docs",
  "hinh-anh",
  "02-danh-muc-anh-du-an.csv",
);
const BRAND_CSV = path.join(
  ROOT,
  "docs",
  "hinh-anh",
  "04-winterfrost-ban-do-thuong-hieu-du-an.csv",
);
const SOURCE_ROOT = path.join(ROOT, "src");
const WINTERFROST_WORDMARK = path.join(
  ROOT,
  "public",
  "images",
  "brand",
  "winterfrost",
  "winterfrost-wordmark.png",
);

function parseCsv(text) {
  const lines = text.trim().split(/\r?\n/);
  const parseLine = (line) => {
    const fields = [];
    let value = "";
    let quoted = false;
    for (let index = 0; index < line.length; index += 1) {
      const character = line[index];
      if (character === '"') {
        if (quoted && line[index + 1] === '"') {
          value += '"';
          index += 1;
        } else {
          quoted = !quoted;
        }
      } else if (character === "," && !quoted) {
        fields.push(value);
        value = "";
      } else {
        value += character;
      }
    }
    fields.push(value);
    return fields;
  };
  const headers = parseLine(lines[0]);
  return lines.slice(1).map((line) => {
    const values = parseLine(line);
    return Object.fromEntries(
      headers.map((header, index) => [header, values[index] ?? ""]),
    );
  });
}

function csvCell(value) {
  const stringValue = String(value ?? "");
  return /[",\n]/.test(stringValue)
    ? `"${stringValue.replaceAll('"', '""')}"`
    : stringValue;
}

function sourcePathFromUrl(sourceUrl) {
  const url = new URL(sourceUrl);
  if (url.hostname === "image.homenest.com.vn") {
    return path.join(
      ROOT,
      "public",
      "images",
      "migrated",
      "homenest-com-vn",
      url.pathname,
    );
  }
  if (url.hostname === "image.homenest.software") {
    return path.join(
      ROOT,
      "public",
      "images",
      "migrated",
      "homenest-software",
      url.pathname,
    );
  }
  throw new Error(`Unsupported project image host: ${url.hostname}`);
}

function migratedPublicUrl(sourceUrl) {
  return `/${path
    .relative(path.join(ROOT, "public"), sourcePathFromUrl(sourceUrl))
    .split(path.sep)
    .join("/")}`;
}

async function fileExists(file) {
  try {
    const stats = await fs.stat(file);
    return stats.size > 0;
  } catch {
    return false;
  }
}

async function walk(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  return (
    await Promise.all(
      entries.map(async (entry) => {
        const absolute = path.join(directory, entry.name);
        return entry.isDirectory() ? walk(absolute) : [absolute];
      }),
    )
  ).flat();
}

const projectRows = parseCsv(await fs.readFile(PROJECT_CSV, "utf8"));
const brandRows = parseCsv(await fs.readFile(BRAND_CSV, "utf8"));
const brandsBySlug = new Map(
  brandRows.flatMap((row) => [
    [row.old_slug, row],
    [row.new_slug, row],
  ]),
);
const replacementMap = new Map();
const completedRows = [];
const failedRows = [];

function brandColors(value) {
  const matches = String(value ?? "").match(/#[0-9A-F]{6}/gi) ?? [];
  return [matches[0] ?? "#173A7A", matches[1] ?? "#55C5EA"];
}

function projectLayoutSvg(width, height, primary, secondary, variant) {
  const portrait = height / width > 1.25;
  const margin = Math.max(14, Math.round(Math.min(width, height) * 0.045));
  const radius = Math.max(18, Math.round(Math.min(width, height) * 0.035));
  const panelX = portrait ? margin : Math.round(width * 0.07);
  const panelY = portrait ? margin : Math.round(height * 0.075);
  const panelWidth = width - panelX * 2;
  const panelHeight = height - panelY * 2;
  const headerHeight = Math.round(panelHeight * (portrait ? 0.09 : 0.105));
  const contentX = panelX + Math.round(panelWidth * 0.055);
  const contentY = panelY + headerHeight + Math.round(panelHeight * 0.065);
  const contentWidth = panelWidth - Math.round(panelWidth * 0.11);
  const gap = Math.max(10, Math.round(Math.min(width, height) * 0.022));
  const shift = (variant % 4) * Math.round(gap * 0.36);

  if (portrait) {
    const heroHeight = Math.round(panelHeight * 0.26);
    const cardHeight = Math.round(panelHeight * 0.105);
    return Buffer.from(`
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="back" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="${primary}" stop-opacity=".84"/>
            <stop offset="1" stop-color="${secondary}" stop-opacity=".72"/>
          </linearGradient>
          <linearGradient id="hero" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="${primary}"/>
            <stop offset="1" stop-color="${secondary}"/>
          </linearGradient>
        </defs>
        <rect width="${width}" height="${height}" fill="url(#back)"/>
        <circle cx="${width * 0.82}" cy="${height * 0.1}" r="${width * 0.34}" fill="#fff" opacity=".11"/>
        <rect x="${panelX}" y="${panelY}" width="${panelWidth}" height="${panelHeight}" rx="${radius}" fill="#F8FAFD"/>
        <rect x="${panelX}" y="${panelY}" width="${panelWidth}" height="${headerHeight}" rx="${radius}" fill="#FFFFFF"/>
        <circle cx="${panelX + panelWidth * 0.82}" cy="${panelY + headerHeight * 0.5}" r="${Math.max(5, headerHeight * 0.09)}" fill="${secondary}"/>
        <circle cx="${panelX + panelWidth * 0.89}" cy="${panelY + headerHeight * 0.5}" r="${Math.max(5, headerHeight * 0.09)}" fill="${primary}" opacity=".45"/>
        <rect x="${contentX}" y="${contentY}" width="${contentWidth}" height="${heroHeight}" rx="${radius * 0.65}" fill="url(#hero)"/>
        <circle cx="${contentX + contentWidth * 0.76}" cy="${contentY + heroHeight * 0.46}" r="${heroHeight * 0.29}" fill="#FFFFFF" opacity=".18"/>
        <rect x="${contentX + gap}" y="${contentY + heroHeight * 0.2}" width="${contentWidth * 0.42}" height="${heroHeight * 0.07}" rx="${heroHeight * 0.035}" fill="#FFFFFF" opacity=".95"/>
        <rect x="${contentX + gap}" y="${contentY + heroHeight * 0.33}" width="${contentWidth * 0.31}" height="${heroHeight * 0.045}" rx="${heroHeight * 0.025}" fill="#FFFFFF" opacity=".58"/>
        <rect x="${contentX + gap}" y="${contentY + heroHeight * 0.43}" width="${contentWidth * 0.35}" height="${heroHeight * 0.045}" rx="${heroHeight * 0.025}" fill="#FFFFFF" opacity=".42"/>
        <rect x="${contentX + gap}" y="${contentY + heroHeight * 0.66}" width="${contentWidth * 0.23}" height="${heroHeight * 0.13}" rx="${heroHeight * 0.065}" fill="#FFFFFF"/>
        ${[0, 1, 2, 3].map((index) => {
          const y = contentY + heroHeight + gap * 1.3 + index * (cardHeight + gap);
          const bar = 0.35 + ((index + variant) % 3) * 0.12;
          return `<rect x="${contentX}" y="${y}" width="${contentWidth}" height="${cardHeight}" rx="${radius * 0.48}" fill="#FFFFFF"/>
          <circle cx="${contentX + cardHeight * 0.48}" cy="${y + cardHeight * 0.5}" r="${cardHeight * 0.23}" fill="${index % 2 ? secondary : primary}" opacity=".85"/>
          <rect x="${contentX + cardHeight}" y="${y + cardHeight * 0.29}" width="${contentWidth * bar}" height="${cardHeight * 0.13}" rx="${cardHeight * 0.065}" fill="#173A64" opacity=".76"/>
          <rect x="${contentX + cardHeight}" y="${y + cardHeight * 0.57}" width="${contentWidth * 0.42}" height="${cardHeight * 0.09}" rx="${cardHeight * 0.045}" fill="#8AA0B5" opacity=".52"/>`;
        }).join("")}
        <rect x="${contentX}" y="${panelY + panelHeight - headerHeight * 0.68}" width="${contentWidth}" height="${headerHeight * 0.08}" rx="${headerHeight * 0.04}" fill="${primary}" opacity=".16"/>
      </svg>
    `);
  }

  const heroWidth = Math.round(contentWidth * 0.56);
  const visualX = contentX + heroWidth + gap;
  const visualWidth = contentWidth - heroWidth - gap;
  const heroHeight = Math.round(panelHeight * 0.44);
  const lowerY = contentY + heroHeight + gap;
  const lowerHeight = panelY + panelHeight - lowerY - Math.round(panelHeight * 0.07);
  return Buffer.from(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="back" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="${primary}" stop-opacity=".84"/>
          <stop offset="1" stop-color="${secondary}" stop-opacity=".72"/>
        </linearGradient>
        <linearGradient id="hero" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="${primary}"/>
          <stop offset="1" stop-color="${secondary}"/>
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#back)"/>
      <circle cx="${width * 0.84}" cy="${height * 0.12}" r="${height * 0.38}" fill="#fff" opacity=".12"/>
      <circle cx="${width * 0.12}" cy="${height * 0.92}" r="${height * 0.34}" fill="#fff" opacity=".08"/>
      <rect x="${panelX}" y="${panelY}" width="${panelWidth}" height="${panelHeight}" rx="${radius}" fill="#F8FAFD"/>
      <rect x="${panelX}" y="${panelY}" width="${panelWidth}" height="${headerHeight}" rx="${radius}" fill="#FFFFFF"/>
      <circle cx="${panelX + panelWidth * 0.86}" cy="${panelY + headerHeight * 0.5}" r="${Math.max(5, headerHeight * 0.08)}" fill="${secondary}"/>
      <circle cx="${panelX + panelWidth * 0.91}" cy="${panelY + headerHeight * 0.5}" r="${Math.max(5, headerHeight * 0.08)}" fill="${primary}" opacity=".45"/>
      <rect x="${contentX}" y="${contentY}" width="${heroWidth}" height="${heroHeight}" rx="${radius * 0.7}" fill="url(#hero)"/>
      <rect x="${contentX + gap + shift}" y="${contentY + heroHeight * 0.19}" width="${heroWidth * 0.56}" height="${heroHeight * 0.08}" rx="${heroHeight * 0.04}" fill="#FFFFFF"/>
      <rect x="${contentX + gap + shift}" y="${contentY + heroHeight * 0.34}" width="${heroWidth * 0.41}" height="${heroHeight * 0.045}" rx="${heroHeight * 0.025}" fill="#FFFFFF" opacity=".6"/>
      <rect x="${contentX + gap + shift}" y="${contentY + heroHeight * 0.45}" width="${heroWidth * 0.48}" height="${heroHeight * 0.045}" rx="${heroHeight * 0.025}" fill="#FFFFFF" opacity=".42"/>
      <rect x="${contentX + gap + shift}" y="${contentY + heroHeight * 0.67}" width="${heroWidth * 0.23}" height="${heroHeight * 0.13}" rx="${heroHeight * 0.065}" fill="#FFFFFF"/>
      <rect x="${visualX}" y="${contentY}" width="${visualWidth}" height="${heroHeight}" rx="${radius * 0.7}" fill="#FFFFFF"/>
      <circle cx="${visualX + visualWidth * 0.52}" cy="${contentY + heroHeight * 0.43}" r="${heroHeight * 0.27}" fill="${secondary}" opacity=".25"/>
      <circle cx="${visualX + visualWidth * 0.52}" cy="${contentY + heroHeight * 0.43}" r="${heroHeight * 0.17}" fill="${primary}" opacity=".82"/>
      <rect x="${visualX + visualWidth * 0.18}" y="${contentY + heroHeight * 0.77}" width="${visualWidth * 0.64}" height="${heroHeight * 0.055}" rx="${heroHeight * 0.03}" fill="${primary}" opacity=".2"/>
      ${[0, 1, 2].map((index) => {
        const cardWidth = (contentWidth - gap * 2) / 3;
        const x = contentX + index * (cardWidth + gap);
        const accent = index % 2 ? secondary : primary;
        return `<rect x="${x}" y="${lowerY}" width="${cardWidth}" height="${lowerHeight}" rx="${radius * 0.55}" fill="#FFFFFF"/>
        <rect x="${x + gap}" y="${lowerY + gap}" width="${cardWidth - gap * 2}" height="${lowerHeight * 0.46}" rx="${radius * 0.32}" fill="${accent}" opacity="${0.15 + index * 0.07}"/>
        <rect x="${x + gap}" y="${lowerY + lowerHeight * 0.62}" width="${cardWidth * (0.42 + index * 0.09)}" height="${lowerHeight * 0.085}" rx="${lowerHeight * 0.04}" fill="#173A64" opacity=".72"/>
        <rect x="${x + gap}" y="${lowerY + lowerHeight * 0.78}" width="${cardWidth * 0.48}" height="${lowerHeight * 0.055}" rx="${lowerHeight * 0.03}" fill="#8AA0B5" opacity=".5"/>`;
      }).join("")}
    </svg>
  `);
}

async function createProjectVisual({
  sourcePath,
  outputPath,
  wordmarkPath,
  width,
  height,
  primary,
  secondary,
  variant,
}) {
  const blurRadius = Math.max(7, Math.min(24, Math.round(Math.min(width, height) / 55)));
  const background = await sharp(sourcePath, { failOn: "none" })
    .rotate()
    .resize(width, height, { fit: "fill" })
    .blur(blurRadius)
    .modulate({ brightness: 0.58, saturation: 0.72 })
    .toBuffer();
  const layout = projectLayoutSvg(width, height, primary, secondary, variant);
  const portrait = height / width > 1.25;
  const logoWidth = Math.round(width * (portrait ? 0.4 : 0.18));
  const logoHeight = Math.round(height * (portrait ? 0.038 : 0.055));
  const logo = await sharp(wordmarkPath)
    .resize(logoWidth, logoHeight, {
      fit: "inside",
      background: { r: 255, g: 255, b: 255, alpha: 0 },
    })
    .png()
    .toBuffer();
  const logoMetadata = await sharp(logo).metadata();
  const panelX = portrait
    ? Math.max(14, Math.round(Math.min(width, height) * 0.045))
    : Math.round(width * 0.07);
  const panelY = portrait
    ? Math.max(14, Math.round(Math.min(width, height) * 0.045))
    : Math.round(height * 0.075);
  const panelWidth = width - panelX * 2;
  const headerHeight = Math.round((height - panelY * 2) * (portrait ? 0.09 : 0.105));

  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await sharp(background)
    .composite([
      { input: layout, left: 0, top: 0 },
      {
        input: logo,
        left: panelX + Math.round(panelWidth * 0.05),
        top: panelY + Math.round((headerHeight - logoMetadata.height) / 2),
      },
    ])
    .webp({ quality: 89, effort: 4 })
    .toFile(outputPath);
}

for (const [rowIndex, row] of projectRows.entries()) {
  if (
    row.project_slug === "app-vietplus" ||
    row.project_slug === "app-nivora-connect" ||
    row.project_slug === "nivora-connect" ||
    row.project_slug === "gioi-thieu-nang-luc" ||
    row.id === "DUAN-147"
  ) {
    completedRows.push({
      ...row,
      status: "DA_TAO_VA_TICH_HOP",
    });
    continue;
  }

  const brand = brandsBySlug.get(row.project_slug);
  const outputSlug = brand?.new_slug || row.project_slug;
  const brandName = brand?.new_brand || "Winterfrost";
  const sourcePath = sourcePathFromUrl(row.current_url);
  if (!(await fileExists(sourcePath))) {
    failedRows.push({ ...row, reason: "SOURCE_MISSING", sourcePath });
    completedRows.push({ ...row, status: "LOI_THIEU_ANH_GOC" });
    continue;
  }

  const originalRecommendedName = path.basename(row.recommended_filename);
  const outputPath = path.join(
    ROOT,
    "public",
    "images",
    "projects",
    outputSlug,
    originalRecommendedName,
  );
  const wordmarkPath =
    brand && (await fileExists(
      path.join(
        ROOT,
        "public",
        "images",
        "projects",
        brand.new_slug,
        "brand",
        "wordmark.png",
      ),
    ))
      ? path.join(
          ROOT,
          "public",
          "images",
          "projects",
          brand.new_slug,
          "brand",
          "wordmark.png",
        )
      : WINTERFROST_WORDMARK;

  try {
    const source = sharp(sourcePath, { failOn: "none" }).rotate();
    const metadata = await source.metadata();
    if (!metadata.width || !metadata.height) {
      throw new Error("Missing image dimensions");
    }
    const [primary, secondary] = brandColors(brand?.primary_colors);
    const preserveGeneratedCover =
      outputSlug === "website-pixelnova-media" && row.id === "DUAN-001";
    if (!preserveGeneratedCover) {
      await createProjectVisual({
        sourcePath,
        outputPath,
        wordmarkPath,
        width: metadata.width,
        height: metadata.height,
        primary,
        secondary,
        variant: rowIndex,
      });
    }

    const outputPublicUrl = `/${path
      .relative(path.join(ROOT, "public"), outputPath)
      .split(path.sep)
      .join("/")}`;
    replacementMap.set(migratedPublicUrl(row.current_url), outputPublicUrl);
    const baseNotes = row.notes
      .replace(/\s*Đã phủ nhận diện [^.]+\s+và giữ nguyên kích thước ảnh gốc\./giu, "")
      .replace(/\s*Đã dựng lại giao diện [^,]+,\s*che hoàn toàn nhận diện cũ và giữ nguyên kích thước ảnh gốc\./giu, "")
      .trim();
    completedRows.push({
      ...row,
      project_slug: outputSlug,
      project_name: brand?.new_project || row.project_name,
      recommended_filename: path.relative(ROOT, outputPath),
      status: "DA_REBRAND_VA_TICH_HOP",
      notes: `${baseNotes ? `${baseNotes} ` : ""}Đã dựng lại giao diện ${brandName}, che hoàn toàn nhận diện cũ và giữ nguyên kích thước ảnh gốc.`,
    });
  } catch (error) {
    failedRows.push({
      ...row,
      reason: error instanceof Error ? error.message : String(error),
      sourcePath,
    });
    completedRows.push({ ...row, status: "LOI_XU_LY_ANH" });
  }
}

const sourceFiles = (await walk(SOURCE_ROOT)).filter((file) =>
  /\.(css|html|js|json|jsx|md|mdx|ts|tsx)$/.test(file),
);
for (const file of sourceFiles) {
  const original = await fs.readFile(file, "utf8");
  let content = original;
  for (const [oldUrl, newUrl] of replacementMap) {
    content = content.replaceAll(oldUrl, newUrl);
  }
  content = content.replace(
    /(\/images\/projects\/[^"'`<>\s)]+\.webp)(?!\?v=wf-20260726)/giu,
    "$1?v=wf-20260726",
  );
  if (content !== original) await fs.writeFile(file, content);
}

const headers = Object.keys(completedRows[0]);
await fs.writeFile(
  PROJECT_CSV,
  `${[
    headers,
    ...completedRows.map((row) => headers.map((header) => row[header] ?? "")),
  ]
    .map((values) => values.map(csvCell).join(","))
    .join("\n")}\n`,
);

console.log(
  JSON.stringify(
    {
      processed: completedRows.length,
      replacementsIntegrated: replacementMap.size,
      failed: failedRows.length,
      failures: failedRows.map((row) => ({
        id: row.id,
        reason: row.reason,
        sourcePath: path.relative(ROOT, row.sourcePath),
      })),
    },
    null,
    2,
  ),
);

if (failedRows.length > 0) process.exitCode = 2;
