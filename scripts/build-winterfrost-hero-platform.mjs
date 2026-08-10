import path from "node:path";
import fs from "node:fs/promises";
import sharp from "sharp";

const ROOT = process.cwd();
const sourcePath = path.join(
  ROOT,
  "public",
  "images",
  "migrated",
  "homenest-com-vn",
  "wp-content",
  "uploads",
  "2026",
  "04",
  "Khoi-banner-trang-chu-HomeNest-Viet-Nam.png",
);
const symbolPath = path.join(
  ROOT,
  "public",
  "images",
  "brand",
  "winterfrost",
  "winterfrost-symbol-transparent.png",
);
const outputPath = path.join(
  ROOT,
  "public",
  "images",
  "brand",
  "winterfrost",
  "hero",
  "winterfrost-hero-orb-v4.png",
);

const shellCenter = { x: 192, y: 178 };
const logoFrame = { width: 136, left: 124, top: 112 };
const logoGlowPadding = 24;
const oldMarkRegion = { left: 125, top: 110, right: 238, bottom: 255 };

const {
  data: sourcePixels,
  info: sourceInfo,
} = await sharp(sourcePath)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height, channels } = sourceInfo;
const pixelCount = width * height;
const candidateMask = new Uint8Array(pixelCount);

for (let y = oldMarkRegion.top; y <= oldMarkRegion.bottom; y += 1) {
  for (let x = oldMarkRegion.left; x <= oldMarkRegion.right; x += 1) {
    const pixelOffset = (y * width + x) * channels;
    const red = sourcePixels[pixelOffset];
    const green = sourcePixels[pixelOffset + 1];
    const blue = sourcePixels[pixelOffset + 2];
    const minimum = Math.min(red, green, blue);
    const maximum = Math.max(red, green, blue);

    if (minimum >= 215 && maximum - minimum <= 30) {
      candidateMask[y * width + x] = 255;
    }
  }
}

const visited = new Uint8Array(pixelCount);
const components = [];
const neighbours = [
  [-1, -1],
  [0, -1],
  [1, -1],
  [-1, 0],
  [1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
];

for (let y = oldMarkRegion.top; y <= oldMarkRegion.bottom; y += 1) {
  for (let x = oldMarkRegion.left; x <= oldMarkRegion.right; x += 1) {
    const start = y * width + x;
    if (!candidateMask[start] || visited[start]) continue;

    const stack = [start];
    const pixels = [];
    visited[start] = 1;

    while (stack.length > 0) {
      const index = stack.pop();
      pixels.push(index);
      const currentX = index % width;
      const currentY = Math.floor(index / width);

      for (const [offsetX, offsetY] of neighbours) {
        const nextX = currentX + offsetX;
        const nextY = currentY + offsetY;
        if (
          nextX < oldMarkRegion.left ||
          nextX > oldMarkRegion.right ||
          nextY < oldMarkRegion.top ||
          nextY > oldMarkRegion.bottom
        ) {
          continue;
        }

        const next = nextY * width + nextX;
        if (candidateMask[next] && !visited[next]) {
          visited[next] = 1;
          stack.push(next);
        }
      }
    }

    components.push(pixels);
  }
}

components.sort((left, right) => right.length - left.length);
const oldMarkMask = new Uint8Array(pixelCount);
for (const component of components.slice(0, 2)) {
  for (const index of component) oldMarkMask[index] = 255;
}

const dilatedMask = new Uint8Array(pixelCount);
const dilationRadius = 14;
for (let index = 0; index < pixelCount; index += 1) {
  if (!oldMarkMask[index]) continue;
  const centerX = index % width;
  const centerY = Math.floor(index / width);

  for (let offsetY = -dilationRadius; offsetY <= dilationRadius; offsetY += 1) {
    for (let offsetX = -dilationRadius; offsetX <= dilationRadius; offsetX += 1) {
      if (offsetX * offsetX + offsetY * offsetY > dilationRadius ** 2) continue;
      const nextX = centerX + offsetX;
      const nextY = centerY + offsetY;
      if (nextX < 0 || nextX >= width || nextY < 0 || nextY >= height) continue;
      dilatedMask[nextY * width + nextX] = 255;
    }
  }
}

const cleanupRadius = 74;
for (let y = 0; y < height; y += 1) {
  for (let x = 0; x < width; x += 1) {
    if (Math.hypot(x - shellCenter.x, y - shellCenter.y) <= cleanupRadius) {
      dilatedMask[y * width + x] = 255;
    }
  }
}

const {
  data: featheredMask,
  info: featheredMaskInfo,
} = await sharp(dilatedMask, {
  raw: { width, height, channels: 1 },
})
  .blur(1.15)
  .raw()
  .toBuffer({ resolveWithObject: true });

const inpaintedChannels = [
  new Float32Array(pixelCount),
  new Float32Array(pixelCount),
  new Float32Array(pixelCount),
];
for (let index = 0; index < pixelCount; index += 1) {
  const pixelOffset = index * channels;
  for (let channel = 0; channel < 3; channel += 1) {
    inpaintedChannels[channel][index] = dilatedMask[index]
      ? [92, 224, 250][channel]
      : sourcePixels[pixelOffset + channel];
  }
}

const maskedIndices = [];
for (let y = 1; y < height - 1; y += 1) {
  for (let x = 1; x < width - 1; x += 1) {
    const index = y * width + x;
    if (dilatedMask[index]) maskedIndices.push(index);
  }
}

for (let iteration = 0; iteration < 1_100; iteration += 1) {
  for (const index of maskedIndices) {
    for (let channel = 0; channel < 3; channel += 1) {
      const values = inpaintedChannels[channel];
      values[index] =
        (values[index - 1] +
          values[index + 1] +
          values[index - width] +
          values[index + width]) /
        4;
    }
  }
}

const restoredShell = Buffer.from(sourcePixels);
for (const index of maskedIndices) {
  const maskAlpha =
    featheredMask[index * featheredMaskInfo.channels] / 255;
  const pixelOffset = index * channels;
  for (let channel = 0; channel < 3; channel += 1) {
    restoredShell[pixelOffset + channel] = Math.round(
      sourcePixels[pixelOffset + channel] * (1 - maskAlpha) +
        inpaintedChannels[channel][index] * maskAlpha,
    );
  }
}

const {
  data: resizedSymbol,
  info: symbolInfo,
} = await sharp(symbolPath)
  .resize({ width: logoFrame.width, fit: "inside" })
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const whiteSymbolPixels = Buffer.alloc(
  symbolInfo.width * symbolInfo.height * 4,
);
const glowSymbolPixels = Buffer.alloc(
  symbolInfo.width * symbolInfo.height * 4,
);
for (let index = 0; index < symbolInfo.width * symbolInfo.height; index += 1) {
  const outputOffset = index * 4;
  const symbolAlpha = resizedSymbol[index * symbolInfo.channels + 3];

  whiteSymbolPixels[outputOffset] = 248;
  whiteSymbolPixels[outputOffset + 1] = 254;
  whiteSymbolPixels[outputOffset + 2] = 255;
  whiteSymbolPixels[outputOffset + 3] = symbolAlpha;

  glowSymbolPixels[outputOffset] = 100;
  glowSymbolPixels[outputOffset + 1] = 236;
  glowSymbolPixels[outputOffset + 2] = 255;
  glowSymbolPixels[outputOffset + 3] = Math.round(symbolAlpha * 0.82);
}

const restoredShellPng = await sharp(restoredShell, {
  raw: { width, height, channels },
})
  .png()
  .toBuffer();
const whiteSymbolPng = await sharp(whiteSymbolPixels, {
  raw: { width: symbolInfo.width, height: symbolInfo.height, channels: 4 },
})
  .png()
  .toBuffer();
const logoGlowPng = await sharp(glowSymbolPixels, {
  raw: { width: symbolInfo.width, height: symbolInfo.height, channels: 4 },
})
  .extend({
    top: logoGlowPadding,
    right: logoGlowPadding,
    bottom: logoGlowPadding,
    left: logoGlowPadding,
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  })
  .blur(7)
  .png()
  .toBuffer();

await sharp(restoredShellPng)
  .composite([
    {
      input: logoGlowPng,
      left: logoFrame.left - logoGlowPadding,
      top: logoFrame.top - logoGlowPadding,
      blend: "screen",
    },
    {
      input: whiteSymbolPng,
      left: logoFrame.left,
      top: logoFrame.top,
    },
  ])
  .png()
  .toFile(`${outputPath}.next`);

await fs.rename(`${outputPath}.next`, outputPath);

console.log(
  JSON.stringify(
    {
      source: path.relative(ROOT, sourcePath),
      output: path.relative(ROOT, outputPath),
      dimensions: "400x364",
      opticalCenter: shellCenter,
      effect: "original-shell-with-large-ice-white-winterfrost-mark-and-cyan-halo",
    },
    null,
    2,
  ),
);
