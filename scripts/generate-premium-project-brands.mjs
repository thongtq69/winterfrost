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

const motifs = {
  "website-pixelnova-media": `
    <path d="M38 202V54h77c44 0 72 23 72 61 0 37-28 61-72 61H78v26H38Zm40-61h34c21 0 34-9 34-26 0-17-13-26-34-26H78v52Z" fill="url(#g)"/>
    <path d="M190 47h23v23h-23zM213 70h19v19h-19zM188 92h15v15h-15z" fill="url(#g)" opacity=".72"/>
    <path d="m173 155 50 50" stroke="url(#g)" stroke-width="13" stroke-linecap="round"/>
  `,
  "website-mocvan-tea": `
    <path d="M57 168c5-64 43-108 116-119-5 72-44 112-116 119Z" fill="url(#g)"/>
    <path d="M65 163c36-39 71-65 105-91" fill="none" stroke="#fff" stroke-width="10" stroke-linecap="round" opacity=".86"/>
    <path d="M55 190c22 20 54 22 77 4 22 24 70 20 77-17 28-5 33-44 5-57" fill="none" stroke="url(#g)" stroke-width="18" stroke-linecap="round"/>
  `,
  "aeromint-cleanroom": `
    <path d="m128 22 95 55v102l-95 55-95-55V77l95-55Z" fill="none" stroke="url(#g)" stroke-width="16"/>
    <path d="M57 101c35-31 66-20 94-4 27 15 48 14 69-4M41 132c41-27 75-13 105 4 28 16 51 15 75-2M50 164c36-19 68-5 94 9 27 15 50 14 70-3" fill="none" stroke="url(#g)" stroke-width="12" stroke-linecap="round"/>
  `,
  "app-grevia-lawn": `
    <path d="M43 181c16-89 66-139 151-143-2 90-53 143-151 143Z" fill="url(#g)"/>
    <path d="M59 181c44-47 88-82 132-115" fill="none" stroke="#fff" stroke-width="10" stroke-linecap="round"/>
    <path d="M61 215c38-19 88-20 139 0" fill="none" stroke="url(#g)" stroke-width="17" stroke-linecap="round"/>
  `,
  "website-loomora-rugs": `
    <path d="M43 37h37v144h133v38H43V37Z" fill="url(#g)"/>
    <path d="M79 65h33v84h102v33H79V65Z" fill="none" stroke="url(#g)" stroke-width="14"/>
    <path d="M108 91h27v58M145 91h27v58M182 91h27v58" stroke="url(#g)" stroke-width="10" stroke-linecap="round" opacity=".72"/>
  `,
  "website-chromiva-coatings": `
    <path d="M128 25C93 72 59 107 59 151c0 42 31 74 69 74s69-32 69-74c0-44-34-79-69-126Z" fill="url(#g)"/>
    <path d="M77 160c29-12 56-13 103 1" fill="none" stroke="#fff" stroke-width="15" stroke-linecap="round" opacity=".9"/>
    <path d="M86 190c24-8 51-8 83 0" fill="none" stroke="#fff" stroke-width="10" stroke-linecap="round" opacity=".62"/>
  `,
  "website-verdora-property": `
    <path d="m128 20 106 108-106 108L22 128 128 20Z" fill="url(#g)"/>
    <path d="M72 166V98l56-34 56 34v68h-29v-46h-54v46H72Z" fill="#fff"/>
    <path d="M111 166v-30h34v30" fill="none" stroke="url(#g)" stroke-width="9"/>
  `,
  "website-candella-works": `
    <path d="M192 73c-18-22-40-33-66-33-49 0-86 38-86 88s37 88 86 88c28 0 53-12 70-35l-31-26c-10 13-22 20-38 20-25 0-43-19-43-47 0-27 18-47 43-47 15 0 27 6 36 18l29-26Z" fill="url(#g)"/>
    <path d="m198 33 8 21 22 8-22 8-8 22-8-22-22-8 22-8 8-21ZM215 122l6 15 15 6-15 6-6 16-6-16-16-6 16-6 6-15Z" fill="url(#g)"/>
  `,
  "website-flexora-packaging": `
    <path d="M50 36h156v39H91v43h91v38H91v64H50V36Z" fill="url(#g)"/>
    <path d="m91 75 92 43-1 38-91-38V75Z" fill="url(#g)" opacity=".64"/>
    <path d="m182 118 25-14v39l-25 13v-38Z" fill="url(#g)" opacity=".9"/>
  `,
  "website-polyvera": `
    <path d="M46 211V45h83c47 0 78 27 78 68 0 42-31 69-78 69H89v29H46Zm43-69h37c24 0 37-11 37-29s-13-28-37-28H89v57Z" fill="url(#g)"/>
    <circle cx="198" cy="40" r="16" fill="url(#g)"/><circle cx="222" cy="72" r="11" fill="url(#g)"/><circle cx="207" cy="105" r="8" fill="url(#g)"/>
    <path d="m198 40 24 32-15 33" stroke="url(#g)" stroke-width="7"/>
  `,
  "website-mirava": `
    <path d="M35 207V47h42l51 75 51-75h42v160h-42V112l-51 73-51-73v95H35Z" fill="url(#g)"/>
    <path d="m205 23 7 19 19 7-19 7-7 19-7-19-19-7 19-7 7-19Z" fill="url(#g)"/>
  `,
  "website-bytevera": `
    <path d="M46 35h87c40 0 65 20 65 52 0 17-8 31-23 40 20 9 31 26 31 46 0 31-25 48-70 48H46V35Zm43 35v42h39c18 0 28-7 28-21 0-14-10-21-28-21H89Zm0 76v40h44c19 0 29-7 29-20 0-14-10-20-29-20H89Z" fill="url(#g)"/>
    <path d="m203 37-24 47h23l-19 48 48-65h-25l20-30h-23Z" fill="url(#g)"/>
  `,
  "website-motoria-link": `
    <path d="M34 207V50l60 72 34-43 34 43 60-72v157h-41v-87l-53 63-53-63v87H34Z" fill="url(#g)"/>
    <path d="M128 80v103" stroke="#fff" stroke-width="9" stroke-dasharray="17 15" stroke-linecap="round" opacity=".9"/>
  `,
  "website-dentavera": `
    <path d="M128 31c-25-19-64-14-82 17-18 32-4 69 13 98 16 28 18 77 43 77 18 0 14-45 26-45s8 45 26 45c25 0 27-49 43-77 17-29 31-66 13-98-18-31-57-36-82-17Z" fill="url(#g)"/>
    <path d="m161 99 43-25 43 25v50l-43 25-43-25V99Z" fill="none" stroke="#fff" stroke-width="8" opacity=".92"/>
    <path d="m161 99 43 25 43-25M204 124v50" fill="none" stroke="#fff" stroke-width="7" opacity=".92"/>
  `,
  "website-lumera-living": `
    <path d="M38 42h44v134h136v40H38V42Z" fill="url(#g)"/>
    <path d="M82 82h94v94H82V82Z" fill="none" stroke="url(#g)" stroke-width="15"/>
    <path d="M113 113h63v63h-63v-63Z" fill="url(#g)" opacity=".55"/>
  `,
  "website-auriva-land": `
    <path d="m128 26 104 190h-48l-19-37H91l-19 37H24L128 26Zm0 76-20 40h40l-20-40Z" fill="url(#g)"/>
    <path d="M68 180h121M91 151h74" stroke="#fff" stroke-width="10" stroke-linecap="round" opacity=".72"/>
  `,
  "website-rovena-mobility": `
    <path d="M43 211V43h83c49 0 79 25 79 66 0 28-15 49-41 59l48 43h-56l-41-37H87v37H43Zm44-76h35c24 0 38-9 38-26 0-18-14-27-38-27H87v53Z" fill="url(#g)"/>
    <path d="M154 55c29 11 48 29 64 57M163 84c24 7 39 20 52 38" fill="none" stroke="url(#g)" stroke-width="10" stroke-linecap="round"/>
  `,
  "website-brewvia": `
    <path d="M43 35h86c41 0 66 20 66 52 0 17-8 31-23 40 20 9 31 26 31 46 0 31-25 48-70 48H43V35Zm43 35v42h39c18 0 28-7 28-21 0-14-10-21-28-21H86Zm0 76v40h44c19 0 29-7 29-20 0-14-10-20-29-20H86Z" fill="url(#g)"/>
    <path d="M194 48c35 30 36 79 2 109-31 27-51 44-49 70 37-13 69-39 79-74 12-43-2-82-32-105Z" fill="url(#g)" opacity=".75"/>
  `,
  "website-arcvera-construction": `
    <path d="m128 25 104 194h-46l-22-42H92l-22 42H24L128 25Zm0 77-18 37h36l-18-37Z" fill="url(#g)"/>
    <path d="M55 192h146M75 158h106M94 124h68" stroke="#fff" stroke-width="7" opacity=".62"/>
    <path d="M92 177v42M128 139v80M164 177v42" stroke="url(#g)" stroke-width="8"/>
  `,
  "website-edunora": `
    <path d="M32 73c42-17 75-11 96 15v124c-22-25-55-32-96-16V73Zm192 0c-42-17-75-11-96 15v124c22-25 55-32 96-16V73Z" fill="url(#g)"/>
    <path d="M128 88v124" stroke="#fff" stroke-width="8" opacity=".8"/>
    <circle cx="128" cy="52" r="17" fill="url(#g)"/>
    <path d="M55 45c45-29 102-30 147-1" fill="none" stroke="url(#g)" stroke-width="9" stroke-linecap="round"/>
  `,
  "website-virela-interior": `
    <path d="M26 42h48l54 132 54-132h48L158 214h-60L26 42Z" fill="url(#g)"/>
    <path d="M74 42v67h27M182 42v67h-27M98 214v-47h60v47" fill="none" stroke="url(#g)" stroke-width="12" stroke-linejoin="round"/>
  `,
  "website-ceranova": `
    <path d="M207 76c-20-28-48-42-82-42-53 0-93 40-93 94s40 94 93 94c35 0 65-15 84-46l-34-25c-12 18-28 28-49 28-28 0-49-22-49-51s21-51 49-51c20 0 36 9 48 26l33-27Z" fill="url(#g)"/>
    <path d="M92 103c23-13 53-14 82-1M85 132c29-12 64-11 96 2M95 161c24-8 51-7 75 2" fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round" opacity=".7"/>
  `,
  "website-rovena-travel": `
    <circle cx="128" cy="128" r="94" fill="none" stroke="url(#g)" stroke-width="17"/>
    <path d="m159 66-20 62-62 29 40-58 42-33Z" fill="url(#g)"/>
    <path d="M128 21v24M128 211v24M21 128h24M211 128h24" stroke="url(#g)" stroke-width="11" stroke-linecap="round"/>
    <path d="M78 190c32 18 70 16 98-7" fill="none" stroke="url(#g)" stroke-width="9" stroke-linecap="round"/>
  `,
  "website-zenovia-retail": `
    <path d="M37 45h180l-21 38-92 93h113v40H35l21-39 93-92H37V45Z" fill="url(#g)"/>
    <path d="m149 85 47-2-39 39-53 54H56l93-91Z" fill="url(#g)" opacity=".58"/>
  `,
  "website-veloura-nails": `
    <path d="M128 224c-13-49-36-83-69-101 41-5 64 13 69 54 5-41 28-59 69-54-33 18-56 52-69 101Z" fill="url(#g)"/>
    <path d="M128 177c-36-18-51-51-44-98 34 17 49 47 44 89 5-42 20-72 44-89 7 47-8 80-44 98Z" fill="url(#g)" opacity=".82"/>
    <path d="M128 154c-28-33-28-70 0-112 28 42 28 79 0 112Z" fill="url(#g)"/>
  `,
};

function symbolSvg(slug, primary, secondary) {
  const artwork = motifs[slug];
  if (!artwork) {
    throw new Error(`Missing premium motif for ${slug}`);
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256">
    <defs>
      <linearGradient id="g" x1="20" y1="20" x2="236" y2="236" gradientUnits="userSpaceOnUse">
        <stop offset="0" stop-color="${primary}"/>
        <stop offset="1" stop-color="${secondary}"/>
      </linearGradient>
    </defs>
    ${artwork}
  </svg>`;
}

function wordmarkSvg(slug, brand, primary, secondary) {
  const symbol = symbolSvg(slug, primary, secondary)
    .replace(/<svg[^>]*>/, "")
    .replace("</svg>", "")
    .replaceAll('id="g"', 'id="wordmarkGradient"')
    .replaceAll("url(#g)", "url(#wordmarkGradient)");
  const fontSize = brand.length > 20 ? 58 : brand.length > 15 ? 66 : 76;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="256" viewBox="0 0 1000 256">
    <defs>
      <linearGradient id="wordmarkGradient" x1="20" y1="20" x2="236" y2="236" gradientUnits="userSpaceOnUse">
        <stop offset="0" stop-color="${primary}"/>
        <stop offset="1" stop-color="${secondary}"/>
      </linearGradient>
    </defs>
    <g>${symbol}</g>
    <text x="294" y="148" fill="${primary}" font-family="Manrope, Arial, Helvetica, sans-serif" font-size="${fontSize}" font-weight="800" letter-spacing="-2">${escapeXml(brand)}</text>
    <text x="299" y="192" fill="#667085" font-family="Manrope, Arial, Helvetica, sans-serif" font-size="23" font-weight="650" letter-spacing="3.2">DIGITAL EXPERIENCE</text>
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

let generatedBrands = 0;
for (const row of rows) {
  if (row.new_slug === "app-nivora-connect") continue;
  const colors = row.primary_colors
    .split("/")
    .map((value) => value.trim())
    .filter(Boolean);
  const primary = colors[0] || "#163A7D";
  const secondary = colors[1] || "#3BC6F3";
  const outputDirectory = path.join(OUTPUT_ROOT, row.new_slug, "brand");
  await fs.mkdir(outputDirectory, { recursive: true });

  const symbol = symbolSvg(row.new_slug, primary, secondary);
  const wordmark = wordmarkSvg(
    row.new_slug,
    row.new_brand,
    primary,
    secondary,
  );
  await fs.writeFile(path.join(outputDirectory, "symbol.svg"), symbol);
  await fs.writeFile(path.join(outputDirectory, "wordmark.svg"), wordmark);
  await sharp(Buffer.from(symbol))
    .png()
    .toFile(path.join(outputDirectory, "symbol.png"));
  await sharp(Buffer.from(wordmark))
    .png()
    .toFile(path.join(outputDirectory, "wordmark.png"));
  generatedBrands += 1;
}

console.log(
  JSON.stringify(
    {
      generatedBrands,
      outputRoot: path.relative(ROOT, OUTPUT_ROOT),
      style: "bespoke-vector-motifs",
    },
    null,
    2,
  ),
);
