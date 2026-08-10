import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const PROJECT_ROOT = path.join(ROOT, "public", "images", "projects");

async function exists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

const projectSlugs = await fs.readdir(PROJECT_ROOT);
const processed = [];

for (const slug of projectSlugs) {
  const projectDirectory = path.join(PROJECT_ROOT, slug);
  const masterPath = path.join(
    projectDirectory,
    "01-anh-bia-du-an-master-v2.png",
  );
  const coverPath = path.join(projectDirectory, "01-anh-bia-du-an.webp");
  const wordmarkPath = path.join(projectDirectory, "brand", "wordmark.png");

  if (
    !(await exists(masterPath)) ||
    !(await exists(coverPath)) ||
    !(await exists(wordmarkPath))
  ) {
    continue;
  }

  const coverMetadata = await sharp(coverPath).metadata();
  const width = coverMetadata.width;
  const height = coverMetadata.height;
  if (!width || !height) {
    throw new Error(`Unable to read cover dimensions for ${slug}`);
  }

  const plaqueWidth = Math.round(
    Math.min(width * 0.38, Math.max(width * 0.31, 280)),
  );
  const plaqueHeight = Math.round(plaqueWidth * 0.31);
  const plaqueLeft = Math.round(width * 0.038);
  const plaqueTop = Math.round(height * 0.04);
  const plaqueRadius = Math.max(12, Math.round(plaqueHeight * 0.18));
  const logoWidth = Math.round(plaqueWidth * 0.82);

  const plaque = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${plaqueWidth}" height="${plaqueHeight}">
      <defs>
        <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#ffffff" stop-opacity=".97"/>
          <stop offset="1" stop-color="#f8fbff" stop-opacity=".90"/>
        </linearGradient>
      </defs>
      <rect x="3" y="3" width="${plaqueWidth - 6}" height="${plaqueHeight - 10}" rx="${plaqueRadius}" fill="url(#glass)" stroke="#dbe5ef" stroke-opacity=".82" stroke-width="2"/>
    </svg>`,
  );

  const wordmark = await sharp(wordmarkPath)
    .resize({
      width: logoWidth,
      fit: "inside",
      withoutEnlargement: false,
    })
    .png()
    .toBuffer();

  const wordmarkMetadata = await sharp(wordmark).metadata();
  const wordmarkLeft =
    plaqueLeft + Math.round((plaqueWidth - (wordmarkMetadata.width || 0)) / 2);
  const wordmarkTop =
    plaqueTop +
    Math.round((plaqueHeight - (wordmarkMetadata.height || 0)) / 2) -
    Math.round(plaqueHeight * 0.025);

  await sharp(masterPath)
    .resize({
      width,
      height,
      fit: "cover",
      position: "attention",
    })
    .composite([
      { input: plaque, left: plaqueLeft, top: plaqueTop },
      { input: wordmark, left: wordmarkLeft, top: wordmarkTop },
    ])
    .webp({ quality: 92, smartSubsample: true })
    .toFile(`${coverPath}.next`);

  await fs.rename(`${coverPath}.next`, coverPath);
  processed.push({ slug, width, height });
}

console.log(
  JSON.stringify(
    {
      processed: processed.length,
      covers: processed,
    },
    null,
    2,
  ),
);
