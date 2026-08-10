import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const INPUT = path.join(
  ROOT,
  "docs",
  "hinh-anh",
  "04-winterfrost-ban-do-thuong-hieu-du-an.csv",
);
const OUTPUT_ROOT = path.join(ROOT, "public", "images", "projects");

function parseCsvLine(line) {
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
}

function escapeXml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function iconArtwork(index, initial, primary, secondary) {
  const variant = index % 8;
  const commonInitial = `<text x="128" y="153" text-anchor="middle" fill="#fff" font-family="Arial, Helvetica, sans-serif" font-size="104" font-weight="800">${escapeXml(initial)}</text>`;
  if (variant === 0) {
    return `
      <rect x="28" y="28" width="200" height="200" rx="54" fill="url(#brandGradient)"/>
      <path d="M63 166L128 64l65 102-31-19-34-54-34 54z" fill="#fff" opacity=".24"/>
      ${commonInitial}`;
  }
  if (variant === 1) {
    return `
      <circle cx="128" cy="128" r="104" fill="url(#brandGradient)"/>
      <path d="M72 164c56 7 95-29 110-86-57 6-96 38-110 86Z" fill="#fff" opacity=".2"/>
      <path d="M82 168c26-37 55-62 92-79" fill="none" stroke="#fff" stroke-width="10" stroke-linecap="round" opacity=".55"/>
      ${commonInitial}`;
  }
  if (variant === 2) {
    return `
      <path d="M128 18l94 55v110l-94 55-94-55V73z" fill="url(#brandGradient)"/>
      <path d="M64 115h128M74 145h108" stroke="#fff" stroke-width="9" stroke-linecap="round" opacity=".28"/>
      ${commonInitial}`;
  }
  if (variant === 3) {
    return `
      <rect x="24" y="24" width="208" height="208" rx="64" fill="url(#brandGradient)"/>
      <circle cx="69" cy="74" r="14" fill="#fff" opacity=".72"/>
      <circle cx="187" cy="74" r="14" fill="#fff" opacity=".72"/>
      <circle cx="128" cy="191" r="14" fill="#fff" opacity=".72"/>
      <path d="M80 79l38 89m58-89-38 89" stroke="#fff" stroke-width="9" opacity=".38"/>
      ${commonInitial}`;
  }
  if (variant === 4) {
    return `
      <circle cx="128" cy="128" r="105" fill="url(#brandGradient)"/>
      <path d="M52 150c32-74 120-88 156-23-48-24-95-8-123 39" fill="none" stroke="#fff" stroke-width="15" stroke-linecap="round" opacity=".32"/>
      ${commonInitial}`;
  }
  if (variant === 5) {
    return `
      <rect x="25" y="25" width="206" height="206" rx="42" fill="url(#brandGradient)"/>
      <path d="M46 74h164M46 112h164M46 150h164M46 188h164" stroke="#fff" stroke-width="9" opacity=".2"/>
      <path d="M72 45v166M112 45v166M152 45v166M192 45v166" stroke="#fff" stroke-width="9" opacity=".12"/>
      ${commonInitial}`;
  }
  if (variant === 6) {
    return `
      <path d="M40 32h176a8 8 0 0 1 8 8v176a8 8 0 0 1-8 8H40a8 8 0 0 1-8-8V40a8 8 0 0 1 8-8Z" fill="url(#brandGradient)" transform="rotate(8 128 128)"/>
      <path d="M66 188 190 66" stroke="#fff" stroke-width="12" stroke-linecap="round" opacity=".25"/>
      ${commonInitial}`;
  }
  return `
    <circle cx="128" cy="128" r="106" fill="url(#brandGradient)"/>
    <circle cx="128" cy="128" r="74" fill="none" stroke="#fff" stroke-width="8" opacity=".25"/>
    <path d="M128 38v31M128 187v31M38 128h31M187 128h31" stroke="#fff" stroke-width="8" stroke-linecap="round" opacity=".38"/>
    ${commonInitial}`;
}

function symbolSvg(index, brand, primary, secondary) {
  const initial = [...brand.trim()][0]?.toUpperCase() || "W";
  return `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256">
    <defs>
      <linearGradient id="brandGradient" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${primary}"/>
        <stop offset="1" stop-color="${secondary}"/>
      </linearGradient>
    </defs>
    ${iconArtwork(index, initial, primary, secondary)}
  </svg>`;
}

function wordmarkSvg(index, brand, primary, secondary) {
  const symbol = symbolSvg(index, brand, primary, secondary)
    .replace(/<svg[^>]*>/, "")
    .replace("</svg>", "")
    .replaceAll('id="brandGradient"', 'id="brandGradientWordmark"')
    .replaceAll("url(#brandGradient)", "url(#brandGradientWordmark)");
  const fontSize = brand.length > 20 ? 62 : brand.length > 14 ? 72 : 82;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="256" viewBox="0 0 1000 256">
    <defs>
      <linearGradient id="brandGradientWordmark" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${primary}"/>
        <stop offset="1" stop-color="${secondary}"/>
      </linearGradient>
    </defs>
    <g>${symbol}</g>
    <text x="298" y="150" fill="${primary}" font-family="Arial, Helvetica, sans-serif" font-size="${fontSize}" font-weight="800" letter-spacing="-2">${escapeXml(brand)}</text>
    <text x="302" y="192" fill="#667085" font-family="Arial, Helvetica, sans-serif" font-size="24" font-weight="600" letter-spacing="3">DIGITAL EXPERIENCE</text>
  </svg>`;
}

const [headerLine, ...dataLines] = (await fs.readFile(INPUT, "utf8"))
  .trim()
  .split(/\r?\n/);
const headers = parseCsvLine(headerLine);
const rows = dataLines.map((line) => {
  const values = parseCsvLine(line);
  return Object.fromEntries(headers.map((header, index) => [header, values[index]]));
});

for (const [index, row] of rows.entries()) {
  if (row.new_slug === "app-nivora-connect") continue;
  const colors = row.primary_colors
    .split("/")
    .map((value) => value.trim())
    .filter(Boolean);
  const primary = colors[0] || "#163A7D";
  const secondary = colors[1] || "#3BC6F3";
  const outputDirectory = path.join(OUTPUT_ROOT, row.new_slug, "brand");
  await fs.mkdir(outputDirectory, { recursive: true });

  const symbol = symbolSvg(index, row.new_brand, primary, secondary);
  const wordmark = wordmarkSvg(index, row.new_brand, primary, secondary);
  const symbolPath = path.join(outputDirectory, "symbol.svg");
  const wordmarkPath = path.join(outputDirectory, "wordmark.svg");
  await fs.writeFile(symbolPath, symbol);
  await fs.writeFile(wordmarkPath, wordmark);
  await sharp(Buffer.from(symbol)).png().toFile(path.join(outputDirectory, "symbol.png"));
  await sharp(Buffer.from(wordmark))
    .png()
    .toFile(path.join(outputDirectory, "wordmark.png"));
}

console.log(
  JSON.stringify(
    {
      generatedBrands: rows.filter(
        (row) => row.new_slug !== "app-nivora-connect",
      ).length,
      outputRoot: path.relative(ROOT, OUTPUT_ROOT),
    },
    null,
    2,
  ),
);
