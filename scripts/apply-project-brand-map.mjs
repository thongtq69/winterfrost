import fs from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const MAP_FILE = path.join(
  ROOT,
  "docs",
  "hinh-anh",
  "04-winterfrost-ban-do-thuong-hieu-du-an.csv",
);

function parseCsv(text) {
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
  const lines = text.trim().split(/\r?\n/);
  const headers = parseLine(lines[0]);
  return lines.slice(1).map((line) => {
    const fields = parseLine(line);
    return Object.fromEntries(
      headers.map((header, index) => [header, fields[index] ?? ""]),
    );
  });
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

const rows = parseCsv(await fs.readFile(MAP_FILE, "utf8"));
const exactReplacements = rows
  .flatMap((row) => [
    [row.old_project, row.new_project],
    [row.old_slug, row.new_slug],
  ])
  .sort((a, b) => b[0].length - a[0].length);

const brandReplacements = [
  ["AUTOLINK Vietnam", "Motoria Link"],
  ["Nội Thất Thanh Tùng", "Lumera Living"],
  ["Nội thất Thanh Tùng", "Lumera Living"],
  ["Nội thất Văn Quyết", "Virela Interior"],
  ["Website dịch vụ cho thuê xe Bontravel", "Website Rovena Mobility"],
  ["Dự án website Chủ Quán Cà Phê", "Website Brewvia"],
  ["Thiết kế website bất động sản Song Quân Land", "Website Auriva Land"],
  ["Bao Bì Tấn Phong", "Flexora Packaging"],
  ["Nhựa Khánh Phong", "Polyvera"],
  ["Trà Nuage Sauvage", "Mocvan Tea"],
  ["Nuage Sauvage", "Mocvan Tea"],
  ["Peace Việt Nam", "Aeromint Cleanroom"],
  ["Peace Vietnam", "Aeromint Cleanroom"],
  ["Lover’s Lawn", "Grevia Lawn"],
  ["Lover's Lawn", "Grevia Lawn"],
  ["Lovers Lawn", "Grevia Lawn"],
  ["Lover_s Lawn", "Grevia Lawn"],
  ["HANG KENH", "Loomora Rugs"],
  ["Hang Kenh", "Loomora Rugs"],
  ["Hằng Kênh", "Loomora Rugs"],
  ["Paint and More", "Chromiva Coatings"],
  ["Paint & More", "Chromiva Coatings"],
  ["Kim Cương Xanh", "Verdora Property"],
  ["Candygogo Factory", "Candella Works"],
  ["Candygogo", "Candella Works"],
  ["Tấn Phong", "Flexora Packaging"],
  ["Khánh Phong", "Polyvera"],
  ["Laptop Alltech", "Website Bytevera"],
  ["Alltech", "Bytevera"],
  ["AUTOLINK", "Motoria Link"],
  ["Autolink", "Motoria Link"],
  ["SingapoDent", "Dentavera"],
  ["Thanh Tùng", "Lumera Living"],
  ["Song Quân Land", "Auriva Land"],
  ["Song Quân Ads", "PixelNova Media"],
  ["Song Quan Ads", "PixelNova Media"],
  ["Chủ Quán Cà Phê", "Brewvia"],
  ["Dava Aesthetic", "Edunora"],
  ["Dava Edu", "Edunora"],
  ["Văn Quyết", "Virela Interior"],
  ["Bảo Vy Pottery", "Ceranova"],
  ["Bảo Vy", "Ceranova"],
  ["Destiny Nail Bar", "Veloura Nails"],
  ["Bontravel", "Rovena Travel"],
  ["Zappa", "Zenovia Retail"],
  ["VietPlus", "Nivora Connect"],
  ["Viet Plus", "Nivora Connect"],
  ["Mida", "Mirava"],
];

function replaceText(value) {
  if (value.startsWith("/images/")) return value;
  let result = value;
  for (const [oldValue, newValue] of exactReplacements) {
    result = result.replaceAll(oldValue, newValue);
  }
  for (const [oldValue, newValue] of brandReplacements) {
    result = result.replaceAll(oldValue, newValue);
  }
  result = result.replace(/\bMCS\b/g, "Arcvera Construction");
  return result;
}

function transformJson(value) {
  if (typeof value === "string") return replaceText(value);
  if (Array.isArray(value)) return value.map(transformJson);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, child]) => [
        replaceText(key),
        transformJson(child),
      ]),
    );
  }
  return value;
}

const jsonFiles = (await walk(path.join(ROOT, "src"))).filter((file) =>
  file.endsWith(".json"),
);
for (const file of jsonFiles) {
  const original = await fs.readFile(file, "utf8");
  const data = JSON.parse(original);
  const transformed = transformJson(data);
  const output = `${JSON.stringify(transformed, null, 2)}\n`;
  if (output !== original) await fs.writeFile(file, output);
}

const sourceFiles = (await walk(path.join(ROOT, "src"))).filter((file) =>
  /\.(js|jsx|ts|tsx)$/.test(file),
);
for (const file of sourceFiles) {
  if (file.endsWith(`${path.sep}next.config.ts`)) continue;
  const original = await fs.readFile(file, "utf8");
  let output = original;
  for (const [oldValue, newValue] of exactReplacements) {
    output = output.replaceAll(oldValue, newValue);
  }
  for (const [oldValue, newValue] of brandReplacements) {
    output = output.replaceAll(oldValue, newValue);
  }
  output = output.replace(/\bMCS\b/g, "Arcvera Construction");
  if (output !== original) await fs.writeFile(file, output);
}

console.log(
  JSON.stringify(
    {
      mappedProjects: rows.length,
      jsonFilesChecked: jsonFiles.length,
      sourceFilesChecked: sourceFiles.length,
    },
    null,
    2,
  ),
);
