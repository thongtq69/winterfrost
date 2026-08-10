import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const inputPath =
  process.argv[2] ??
  path.join(
    ROOT,
    "public/images/brand/winterfrost/hero/winterfrost-symbol-clean.png",
  );
const outputPath = path.join(
  ROOT,
  "public/images/brand/winterfrost/hero/winterfrost-glowing-symbol-transparent.png",
);

const canvasSize = 1024;
const symbolSize = 680;
const symbolOffset = Math.round((canvasSize - symbolSize) / 2);
const symbolPipeline = sharp(inputPath)
  .ensureAlpha()
  .trim()
  .resize(symbolSize, symbolSize, {
    fit: "contain",
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  })
  .modulate({ brightness: 1.1, saturation: 1.05 });
const symbol = await symbolPipeline.clone().png().toBuffer();

await sharp({
  create: {
    width: canvasSize,
    height: canvasSize,
    channels: 4,
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  },
})
  .composite([{ input: symbol, left: symbolOffset, top: symbolOffset }])
  .png({ compressionLevel: 9, adaptiveFiltering: true })
  .toFile(outputPath);

console.log(`Wrote ${path.relative(ROOT, outputPath)}`);
