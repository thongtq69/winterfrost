import fs from "node:fs/promises";
import path from "node:path";
import { spawnSync } from "node:child_process";
import sharp from "sharp";

const ROOT = process.cwd();
const inputVideo = path.join(
  ROOT,
  "public/images/migrated/homenest-com-vn/wp-content/uploads/2026/05/Ban-do-HomeNest-Viet-Nam.mp4",
);
const symbolPath = path.join(
  ROOT,
  "public/images/brand/winterfrost/winterfrost-symbol-transparent.png",
);
const outputDir = path.join(
  ROOT,
  "public/images/brand/winterfrost/about",
);
const overlayPath = path.join(outputDir, "winterfrost-map-pin-overlay.png");
const outputVideo = path.join(outputDir, "winterfrost-market-map.mp4");

const canvas = { width: 1000, height: 648 };
const pin = { centerX: 794, centerY: 396, patchRadius: 19 };
const icon = { size: 30, left: 779, top: 381 };
const glowPadding = 9;

await fs.mkdir(outputDir, { recursive: true });

const resizedSymbol = sharp(symbolPath)
  .resize(icon.size, icon.size, { fit: "contain" })
  .ensureAlpha();
const symbolAlpha = await resizedSymbol
  .clone()
  .extractChannel("alpha")
  .raw()
  .toBuffer();

const whiteSymbol = await sharp({
  create: {
    width: icon.size,
    height: icon.size,
    channels: 3,
    background: { r: 247, g: 253, b: 255 },
  },
})
  .joinChannel(symbolAlpha, {
    raw: { width: icon.size, height: icon.size, channels: 1 },
  })
  .png()
  .toBuffer();

const glowSize = icon.size + glowPadding * 2;
const glowAlpha = await sharp(symbolAlpha, {
  raw: { width: icon.size, height: icon.size, channels: 1 },
})
  .extend({
    top: glowPadding,
    right: glowPadding,
    bottom: glowPadding,
    left: glowPadding,
    background: "black",
  })
  .blur(3)
  .linear(1.1, 0)
  .toBuffer();

const cyanGlow = await sharp({
  create: {
    width: glowSize,
    height: glowSize,
    channels: 3,
    background: { r: 145, g: 239, b: 255 },
  },
})
  .joinChannel(glowAlpha, {
    raw: { width: glowSize, height: glowSize, channels: 1 },
  })
  .png()
  .toBuffer();

const pinPatch = Buffer.from(`
  <svg width="${canvas.width}" height="${canvas.height}" xmlns="http://www.w3.org/2000/svg">
    <circle
      cx="${pin.centerX}"
      cy="${pin.centerY}"
      r="${pin.patchRadius}"
      fill="#1052e8"
    />
  </svg>
`);

await sharp({
  create: {
    width: canvas.width,
    height: canvas.height,
    channels: 4,
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  },
})
  .composite([
    { input: pinPatch },
    {
      input: cyanGlow,
      left: icon.left - glowPadding,
      top: icon.top - glowPadding,
    },
    { input: whiteSymbol, left: icon.left, top: icon.top },
  ])
  .png({ compressionLevel: 9, adaptiveFiltering: true })
  .toFile(overlayPath);

const ffmpeg = spawnSync(
  "ffmpeg",
  [
    "-y",
    "-i",
    inputVideo,
    "-loop",
    "1",
    "-framerate",
    "30",
    "-i",
    overlayPath,
    "-filter_complex",
    "[0:v][1:v]overlay=0:0:format=auto:shortest=1[v]",
    "-map",
    "[v]",
    "-map",
    "0:a?",
    "-c:v",
    "libx264",
    "-crf",
    "18",
    "-preset",
    "slow",
    "-pix_fmt",
    "yuv420p",
    "-c:a",
    "copy",
    "-movflags",
    "+faststart",
    "-shortest",
    outputVideo,
  ],
  { encoding: "utf8" },
);

if (ffmpeg.status !== 0) {
  throw new Error(ffmpeg.stderr || "ffmpeg failed to build the market map video");
}

console.log(`Wrote ${path.relative(ROOT, overlayPath)}`);
console.log(`Wrote ${path.relative(ROOT, outputVideo)}`);
