import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const SRC_ROOT = path.join(ROOT, "src");
const PUBLIC_ROOT = path.join(ROOT, "public");
const SOURCE_EXTENSIONS = /\.(?:css|json|ts|tsx)$/i;

function walk(directory, output = []) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(fullPath, output);
    else output.push(fullPath);
  }
  return output;
}

function collectStrings(value, output = []) {
  if (typeof value === "string") output.push(value);
  else if (Array.isArray(value)) value.forEach((item) => collectStrings(item, output));
  else if (value && typeof value === "object") {
    Object.values(value).forEach((item) => collectStrings(item, output));
  }
  return output;
}

function addImagePath(value, file, references) {
  if (!value.startsWith("/images/")) return;
  const clean = value.split(/[?#]/)[0].trim();
  if (!clean || clean.includes("${")) return;
  if (!references.has(clean)) references.set(clean, new Set());
  references.get(clean).add(path.relative(ROOT, file));
}

function extractFromString(value, file, references) {
  if (value.startsWith("/images/") && !value.includes("<")) {
    addImagePath(value, file, references);
  }
  for (const match of value.matchAll(/\b(?:poster|src)=["'](\/images\/[^"']+)["']/giu)) {
    addImagePath(match[1], file, references);
  }
  for (const match of value.matchAll(/\bsrcset=["']([^"']+)["']/giu)) {
    for (const candidate of match[1].split(",")) {
      addImagePath(candidate.trim().replace(/\s+\d+(?:\.\d+)?[wx]$/i, ""), file, references);
    }
  }
  for (const match of value.matchAll(/url\(\s*["']?(\/images\/[^"')]+)["']?\s*\)/giu)) {
    addImagePath(match[1], file, references);
  }
}

const references = new Map();
const visibleLegacy = [];
const sourceFiles = walk(SRC_ROOT).filter((file) => SOURCE_EXTENSIONS.test(file));

for (const file of sourceFiles) {
  const source = fs.readFileSync(file, "utf8");
  if (file.endsWith(".json")) {
    const data = JSON.parse(source);
    for (const value of collectStrings(data)) extractFromString(value, file, references);
  } else {
    let expanded = source;
    const bases = new Map(
      [...source.matchAll(/const\s+([A-Z][A-Z0-9_]*)\s*=\s*["'](\/images\/[^"']+)["']/g)].map(
        (match) => [match[1], match[2]],
      ),
    );
    for (const [name, base] of bases) expanded = expanded.replaceAll(`\${${name}}`, base);
    for (const match of expanded.matchAll(/["'`](\/images\/[^"'`\n]+)["'`]/g)) {
      addImagePath(match[1], file, references);
    }
    extractFromString(expanded, file, references);
  }

  const withoutPaths = source.replace(
    /(?:https?:\/\/|\/images\/|\/fonts\/)[^"'<>\\\s)]+/giu,
    "",
  );
  const match = withoutPaths.match(/\b(?:Home\s*Nest|Homenest|QuestX|VietPlus|Leveltrip)\b/iu);
  if (match) visibleLegacy.push(`${path.relative(ROOT, file)}: ${match[0]}`);
}

const missing = [];
for (const [webPath, files] of references) {
  const candidates = [webPath];
  try {
    const decoded = decodeURIComponent(webPath);
    if (decoded !== webPath) candidates.push(decoded);
  } catch {
    // Keep the raw path if percent decoding is invalid.
  }
  const exists = candidates.some((candidate) =>
    fs.existsSync(path.join(PUBLIC_ROOT, candidate.replace(/^\/+/, ""))),
  );
  if (!exists) missing.push({ webPath, files: [...files].sort() });
}

console.log(`Source files checked: ${sourceFiles.length}`);
console.log(`Unique local image references: ${references.size}`);
console.log(`Missing local image references: ${missing.length}`);
for (const item of missing) {
  console.log(`MISSING ${item.webPath} <- ${item.files.join(", ")}`);
}
console.log(`Visible legacy brand hits: ${visibleLegacy.length}`);
for (const hit of visibleLegacy) console.log(`LEGACY ${hit}`);

if (missing.length || visibleLegacy.length) process.exitCode = 1;
