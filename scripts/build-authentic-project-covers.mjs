import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const migratedRoot = path.join(root, "public/images/migrated");
const projectsRoot = path.join(root, "public/images/projects");
const winterfrostWordmark = path.join(
  root,
  "public/images/brand/winterfrost/winterfrost-wordmark.png",
);

const projects = [
  {
    slug: "website-pixelnova-media",
    source: "00-nguon-mockup-chuyen-nghiep-ai.png",
    sourceDirectory: "project",
    placements: [],
  },
  {
    slug: "website-mocvan-tea",
    source: "00-nguon-mockup-chuyen-nghiep-ai.png",
    sourceDirectory: "project",
    placements: [],
  },
  {
    slug: "aeromint-cleanroom",
    source: "giao-dien-Peace-Viet-Nam-case-study.jpg",
    placements: [
      { x: 0.195, y: 0.155, w: 0.24, h: 0.085 },
      { x: 0.19, y: 0.745, w: 0.4, h: 0.145 },
    ],
  },
  {
    slug: "app-grevia-lawn",
    source: "00-nguon-mockup-chuyen-nghiep-ai.png",
    sourceDirectory: "project",
    placements: [],
  },
  {
    slug: "website-loomora-rugs",
    source: "Giao-dien-trang-chu-Hang-kenh-Case-study.jpg",
    placements: [
      {
        x: 0.4,
        y: 0.065,
        w: 0.22,
        h: 0.07,
        bg: "#2a211d",
        mark: "white",
      },
      {
        x: 0.34,
        y: 0.355,
        w: 0.4,
        h: 0.15,
        bg: "#2a211d",
        mark: "white",
      },
    ],
  },
  {
    slug: "website-chromiva-coatings",
    source: "Giao-dien-trang-chu-Paint-and-More-Case-study.jpg",
    placements: [
      { x: 0.13, y: 0.185, w: 0.23, h: 0.08 },
      { x: 0.39, y: 0.43, w: 0.23, h: 0.12 },
    ],
  },
  {
    slug: "website-verdora-property",
    source: "Giao-dien-Kim-Cuong-Xanh-case-study.jpg",
    placements: [
      { x: 0.17, y: 0.135, w: 0.23, h: 0.08 },
      {
        x: 0.205,
        y: 0.395,
        w: 0.5,
        h: 0.19,
        bg: "#e8f7fb",
      },
    ],
  },
  {
    slug: "website-candella-works",
    source: "giao-dien-candygogo-case-study.jpg",
    placements: [{ x: 0.4, y: 0.105, w: 0.225, h: 0.075 }],
  },
  {
    slug: "website-flexora-packaging",
    source: "Giao-dien-Tan-Phong-case-study.jpg",
    placements: [
      {
        x: 0.275,
        y: 0.245,
        w: 0.255,
        h: 0.075,
        rotation: -18,
        bg: "#313630",
        mark: "white",
      },
    ],
  },
  {
    slug: "website-polyvera",
    source: "Giao-dien-Khanh-Phong-case-study.jpg",
    placements: [
      {
        x: 0.145,
        y: 0.125,
        w: 0.22,
        h: 0.075,
        bg: "#314438",
        mark: "white",
      },
      {
        x: 0.15,
        y: 0.46,
        w: 0.39,
        h: 0.12,
        bg: "#314438",
        mark: "white",
      },
    ],
  },
  {
    slug: "website-mirava",
    source: "giao-dien-mida-case-study.jpg",
    placements: [
      { x: 0.19, y: 0.115, w: 0.2, h: 0.075 },
      {
        x: 0.18,
        y: 0.24,
        w: 0.44,
        h: 0.2,
        bg: "#342a23",
        mark: "white",
      },
    ],
  },
  {
    slug: "website-bytevera",
    source: "giao-dien-laptop-alltech-case-study.jpg",
    placements: [{ x: 0.335, y: 0.09, w: 0.19, h: 0.07 }],
  },
  {
    slug: "website-motoria-link",
    source: "giao-dien-AUTOLINK-case-study.jpg",
    placements: [{ x: 0.27, y: 0.285, w: 0.2, h: 0.075 }],
  },
  {
    slug: "website-dentavera",
    source: "Giao-dien-Singapoden-Case-Study.jpg",
    placements: [{ x: 0.415, y: 0.105, w: 0.24, h: 0.075 }],
  },
  {
    slug: "website-lumera-living",
    source: "Trang-chu-Thanh-Tung-Case-Study.jpg",
    placements: [
      {
        x: 0.24,
        y: 0.105,
        w: 0.205,
        h: 0.075,
        rotation: -7,
      },
      {
        x: 0.16,
        y: 0.21,
        w: 0.44,
        h: 0.18,
        rotation: -7,
        bg: "#f7ecd9",
      },
    ],
  },
  {
    slug: "website-auriva-land",
    source: "Website-Song-Quan-land.jpg",
    placements: [
      {
        x: 0.335,
        y: 0.035,
        w: 0.33,
        h: 0.07,
        asset: "winterfrost",
      },
      { x: 0.18, y: 0.29, w: 0.25, h: 0.06 },
      {
        x: 0.205,
        y: 0.455,
        w: 0.46,
        h: 0.105,
        bg: "#133f68",
        mark: "white",
      },
    ],
  },
  {
    slug: "website-rovena-mobility",
    source: "Du-an-website-bontravel.jpg",
    placements: [
      {
        x: 0.335,
        y: 0.025,
        w: 0.33,
        h: 0.075,
        asset: "winterfrost",
      },
      { x: 0.165, y: 0.17, w: 0.31, h: 0.075 },
      { x: 0.16, y: 0.555, w: 0.36, h: 0.065 },
    ],
  },
  {
    slug: "website-brewvia",
    source: "Website-chu-quan-ca-phe.jpg",
    placements: [
      {
        x: 0.265,
        y: 0.445,
        w: 0.2,
        h: 0.065,
        bg: "#1f261f",
        mark: "white",
      },
      {
        x: 0.335,
        y: 0.845,
        w: 0.33,
        h: 0.075,
        asset: "winterfrost",
      },
    ],
  },
  {
    slug: "website-arcvera-construction",
    source: "Website-MCS.jpg",
    placements: [
      { x: 0.285, y: 0.115, w: 0.25, h: 0.075 },
      { x: 0.61, y: 0.145, w: 0.14, h: 0.052 },
      {
        x: 0.355,
        y: 0.845,
        w: 0.29,
        h: 0.07,
        asset: "winterfrost",
      },
    ],
  },
  {
    slug: "website-edunora",
    source: "Giao-dien-trang-cua-Website-Dava-Edu.jpg",
    placements: [
      { x: 0.075, y: 0.115, w: 0.22, h: 0.075 },
      {
        x: 0.03,
        y: 0.29,
        w: 0.57,
        h: 0.28,
        bg: "#a4113d",
        mark: "white",
      },
    ],
  },
  {
    slug: "website-virela-interior",
    source: "Giao-dien-trang-chu-website-noi-that-van-quyet.jpg",
    placements: [
      {
        x: 0.055,
        y: 0.075,
        w: 0.2,
        h: 0.07,
        bg: "#2f3032",
        mark: "white",
      },
    ],
  },
  {
    slug: "website-ceranova",
    source: "Giao-dien-trang-chu-Website-Bao-Vy-Pottery.jpg",
    placements: [{ x: 0.145, y: 0.17, w: 0.2, h: 0.07 }],
  },
  {
    slug: "website-rovena-travel",
    source: "Giao-dien-trang-chu-cua-Website-Bontravel.jpg",
    placements: [
      {
        x: 0.065,
        y: 0.085,
        w: 0.2,
        h: 0.07,
        bg: "#3a413c",
        mark: "white",
      },
      { x: 0.205, y: 0.82, w: 0.23, h: 0.065 },
    ],
  },
  {
    slug: "website-zenovia-retail",
    source: "Giao-dien-trang-he-thong-dai-li-chinh-hang-cua-Website-Zappa.jpg",
    placements: [{ x: 0.17, y: 0.005, w: 0.22, h: 0.12 }],
  },
  {
    slug: "website-veloura-nails",
    source: "00-nguon-model-viet-nam-ai.png",
    sourceDirectory: "project",
    placements: [
      { x: 0.03, y: 0, w: 0.24, h: 0.14 },
      {
        x: 0.37,
        y: 0.72,
        w: 0.34,
        h: 0.23,
        bg: "#4a342f",
        mark: "white",
      },
    ],
  },
];

const findByBasename = (directory, basename) => {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      const found = findByBasename(absolute, basename);
      if (found) return found;
    } else if (entry.name.toLowerCase() === basename.toLowerCase()) {
      return absolute;
    }
  }
  return null;
};

const roundedRectSvg = (width, height, background) => Buffer.from(`
  <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="1" width="${width - 2}" height="${height - 2}"
      rx="${Math.max(3, Math.round(height * 0.1))}"
      fill="${background}" fill-opacity="1"
      stroke="${background}" stroke-opacity="1"/>
  </svg>
`);

const buildBadge = async ({
  width,
  height,
  assetPath,
  rotation = 0,
  background = "#ffffff",
  markTreatment = "original",
}) => {
  let markPipeline = sharp(assetPath).ensureAlpha();
  if (markTreatment === "white") {
    markPipeline = markPipeline.tint("#ffffff");
  }
  const mark = await markPipeline
    .resize(Math.round(width * 0.84), Math.round(height * 0.68), {
      fit: "contain",
      withoutEnlargement: false,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();

  const badge = await sharp({
    create: {
      width,
      height,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([
      {
        input: roundedRectSvg(width, height, background),
        left: 0,
        top: 0,
      },
      {
        input: mark,
        left: Math.round(width * 0.08),
        top: Math.round(height * 0.16),
      },
    ])
    .png()
    .toBuffer();

  if (!rotation) return badge;
  return sharp(badge)
    .rotate(rotation, {
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();
};

for (const project of projects) {
  const generatedSource = path.join(
    projectsRoot,
    project.slug,
    "00-nguon-mockup-chuyen-nghiep-ai.png",
  );
  const hasGeneratedSource = fs.existsSync(generatedSource);
  const source = hasGeneratedSource
    ? generatedSource
    : project.sourceDirectory === "project"
      ? path.join(projectsRoot, project.slug, project.source)
      : findByBasename(migratedRoot, project.source);
  if (!source) throw new Error(`Missing source image: ${project.source}`);

  const targetDirectory = path.join(projectsRoot, project.slug);
  const target = path.join(targetDirectory, "01-anh-bia-du-an.webp");
  const master = path.join(targetDirectory, "01-anh-bia-du-an-master-v3.png");
  const current = await sharp(target).metadata();
  const width = current.width;
  const height = current.height;
  const brandWordmark = path.join(targetDirectory, "brand/wordmark.png");

  if (!width || !height) {
    throw new Error(`Cannot resolve target dimensions for ${project.slug}`);
  }

  const overlays = [];
  for (const placement of hasGeneratedSource ? [] : project.placements) {
    const requestedWidth = Math.max(80, Math.round(width * placement.w));
    const requestedHeight = Math.max(32, Math.round(height * placement.h));
    const badge = await buildBadge({
      width: requestedWidth,
      height: requestedHeight,
      assetPath:
        placement.asset === "winterfrost"
          ? winterfrostWordmark
          : brandWordmark,
      rotation: placement.rotation ?? 0,
      background: placement.bg ?? "#ffffff",
      markTreatment: placement.mark ?? "original",
    });
    const badgeMeta = await sharp(badge).metadata();
    const centerX = Math.round(width * placement.x + requestedWidth / 2);
    const centerY = Math.round(height * placement.y + requestedHeight / 2);

    overlays.push({
      input: badge,
      left: Math.max(0, Math.round(centerX - (badgeMeta.width ?? requestedWidth) / 2)),
      top: Math.max(0, Math.round(centerY - (badgeMeta.height ?? requestedHeight) / 2)),
    });
  }

  const rendered = sharp(source)
    .resize(width, height, { fit: "cover", position: "centre" })
    .composite(overlays);

  await rendered.clone().png({ compressionLevel: 8 }).toFile(master);
  await rendered
    .clone()
    .webp({ quality: 91, effort: 6, smartSubsample: true })
    .toFile(`${target}.tmp`);
  fs.renameSync(`${target}.tmp`, target);
  console.log(`${project.slug}: ${width}x${height}`);
}
