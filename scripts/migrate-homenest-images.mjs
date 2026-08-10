import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const SOURCE_DIR = path.join(ROOT, "src");
const PUBLIC_DIR = path.join(ROOT, "public", "images", "migrated");
const MANIFEST_PATH = path.join(
  ROOT,
  "docs",
  "hinh-anh",
  "07-winterfrost-migrate-homenest-images.csv",
);
const TARGET_HOSTS = new Set([
  "image.homenest.com.vn",
  "image.homenest.software",
]);
const IMAGE_EXTENSIONS = new Set([
  ".avif",
  ".bmp",
  ".gif",
  ".ico",
  ".jpeg",
  ".jpg",
  ".mp4",
  ".png",
  ".svg",
  ".webp",
  ".webm",
]);
const CONCURRENCY = 16;
const shouldDownload = process.argv.includes("--download");
const shouldRewrite = process.argv.includes("--rewrite");

async function walk(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map(async (entry) => {
      const absolute = path.join(directory, entry.name);
      return entry.isDirectory() ? walk(absolute) : [absolute];
    }),
  );
  return nested.flat();
}

function cleanMatchedUrl(value) {
  return value
    .replaceAll("\\/", "/")
    .replace(/[\\'",);<>\]}]+$/g, "");
}

function isTargetImageUrl(value) {
  try {
    const url = new URL(value);
    const isS3HomeNest =
      url.hostname === "s3.ap-southeast-1.amazonaws.com" &&
      url.pathname.startsWith("/image.homenest.com.vn/");
    return (
      (TARGET_HOSTS.has(url.hostname) || isS3HomeNest) &&
      IMAGE_EXTENSIONS.has(path.extname(url.pathname).toLowerCase())
    );
  } catch {
    return false;
  }
}

function safeSegment(value) {
  let decoded = value;
  try {
    decoded = decodeURIComponent(value);
  } catch {
    // Keep the encoded segment when it cannot be decoded safely.
  }
  return decoded
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 140);
}

function destinationFor(sourceUrl) {
  const url = new URL(sourceUrl);
  const isS3HomeNest =
    url.hostname === "s3.ap-southeast-1.amazonaws.com" &&
    url.pathname.startsWith("/image.homenest.com.vn/");
  const hostFolder = isS3HomeNest
    ? "homenest-s3"
    : url.hostname === "image.homenest.com.vn"
      ? "homenest-com-vn"
      : "homenest-software";
  const rawSegments = url.pathname
    .split("/")
    .filter(Boolean)
    .filter(
      (segment, index) =>
        !(isS3HomeNest && index === 0 && segment === "image.homenest.com.vn"),
    );
  const safeSegments = rawSegments.map(safeSegment).filter(Boolean);
  const originalName = safeSegments.pop() || "asset";
  const extension = path.extname(originalName);
  const basename = path.basename(originalName, extension);
  const queryHash = url.search
    ? `-${crypto.createHash("sha1").update(url.search).digest("hex").slice(0, 10)}`
    : "";
  const fileName = `${basename}${queryHash}${extension.toLowerCase()}`;
  const relative = path.posix.join(
    "images",
    "migrated",
    hostFolder,
    ...safeSegments,
    fileName,
  );
  return {
    absolute: path.join(ROOT, "public", relative),
    publicUrl: `/${relative}`,
  };
}

async function downloadOne(item) {
  if (!shouldDownload) {
    return { ...item, status: "DRY_RUN", size: 0 };
  }

  try {
    const existing = await fs.stat(item.destination.absolute);
    if (existing.size > 0) {
      return { ...item, status: "EXISTING", size: existing.size };
    }
  } catch {
    // Download missing files below.
  }

  await fs.mkdir(path.dirname(item.destination.absolute), {
    recursive: true,
  });

  let lastError = "unknown error";
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const response = await fetch(item.sourceUrl, {
        redirect: "follow",
        headers: {
          "user-agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/138 Safari/537.36",
        },
        signal: AbortSignal.timeout(45_000),
      });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const bytes = Buffer.from(await response.arrayBuffer());
      if (bytes.length === 0) {
        throw new Error("empty response");
      }
      await fs.writeFile(item.destination.absolute, bytes);
      return { ...item, status: "DOWNLOADED", size: bytes.length };
    } catch (error) {
      lastError = error instanceof Error ? error.message : String(error);
    }
  }

  return { ...item, status: `FAILED: ${lastError}`, size: 0 };
}

function csvCell(value) {
  const stringValue = String(value ?? "");
  return /[",\n]/.test(stringValue)
    ? `"${stringValue.replaceAll('"', '""')}"`
    : stringValue;
}

const sourceFiles = (await walk(SOURCE_DIR)).filter((file) =>
  /\.(css|html|js|json|jsx|md|mdx|ts|tsx)$/.test(file),
);
const sourceContents = new Map();
const occurrences = new Map();
const urlPattern =
  /https?:\\?\/\\?\/[A-Za-z0-9._~:/?#[\]@!$&'()*+,;=%-]+/g;
const encodedNextImagePattern =
  /\/_next\/image\?url=(https%3A%2F%2F[^"' <\\]+?)(?:(?:&amp;|&)w=\d+)/gi;

for (const file of sourceFiles) {
  const content = await fs.readFile(file, "utf8");
  sourceContents.set(file, content);
  for (const match of content.matchAll(urlPattern)) {
    const sourceUrl = cleanMatchedUrl(match[0]);
    if (!isTargetImageUrl(sourceUrl)) continue;
    if (!occurrences.has(sourceUrl)) occurrences.set(sourceUrl, new Set());
    occurrences.get(sourceUrl).add(path.relative(ROOT, file));
  }
  for (const match of content.matchAll(encodedNextImagePattern)) {
    let sourceUrl;
    try {
      sourceUrl = decodeURIComponent(match[1]);
    } catch {
      continue;
    }
    if (!isTargetImageUrl(sourceUrl)) continue;
    if (!occurrences.has(sourceUrl)) occurrences.set(sourceUrl, new Set());
    occurrences.get(sourceUrl).add(path.relative(ROOT, file));
  }
}

const items = [...occurrences.entries()]
  .map(([sourceUrl, files]) => ({
    sourceUrl,
    files: [...files].sort(),
    destination: destinationFor(sourceUrl),
  }))
  .sort((a, b) => a.sourceUrl.localeCompare(b.sourceUrl));

const results = new Array(items.length);
let nextIndex = 0;
let completed = 0;

async function worker() {
  while (nextIndex < items.length) {
    const index = nextIndex;
    nextIndex += 1;
    results[index] = await downloadOne(items[index]);
    completed += 1;
    if (completed % 50 === 0 || completed === items.length) {
      console.log(`Processed ${completed}/${items.length}`);
    }
  }
}

await fs.mkdir(PUBLIC_DIR, { recursive: true });
await Promise.all(
  Array.from({ length: Math.min(CONCURRENCY, items.length) }, () => worker()),
);

const successful = new Map(
  results
    .filter((item) => !item.status.startsWith("FAILED"))
    .map((item) => [item.sourceUrl, item.destination.publicUrl]),
);

if (shouldRewrite) {
  for (const [file, originalContent] of sourceContents) {
    let content = originalContent;
    for (const [sourceUrl, publicUrl] of successful) {
      content = content.replaceAll(sourceUrl, publicUrl);
      content = content.replaceAll(
        sourceUrl.replaceAll("/", "\\/"),
        publicUrl.replaceAll("/", "\\/"),
      );
      const encodedSourceUrl = encodeURIComponent(sourceUrl).replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&",
      );
      content = content.replace(
        new RegExp(
          `/_next/image\\\\?url=${encodedSourceUrl}(?:(?:&amp;|&)w=\\\\d+)(?:(?:&amp;|&)q=\\\\d+)?`,
          "g",
        ),
        publicUrl,
      );
    }
    if (content !== originalContent) {
      await fs.writeFile(file, content);
    }
  }
}

const csvRows = [
  [
    "source_url",
    "local_url",
    "status",
    "bytes",
    "source_files",
  ],
  ...results.map((item) => [
    item.sourceUrl,
    item.destination.publicUrl,
    item.status,
    item.size,
    item.files.join("; "),
  ]),
];
await fs.mkdir(path.dirname(MANIFEST_PATH), { recursive: true });
await fs.writeFile(
  MANIFEST_PATH,
  `${csvRows.map((row) => row.map(csvCell).join(",")).join("\n")}\n`,
);

const failed = results.filter((item) => item.status.startsWith("FAILED"));
const downloaded = results.filter((item) => item.status === "DOWNLOADED");
const existing = results.filter((item) => item.status === "EXISTING");
console.log(
  JSON.stringify(
    {
      discovered: results.length,
      downloaded: downloaded.length,
      existing: existing.length,
      failed: failed.length,
      rewritten: shouldRewrite ? successful.size : 0,
      manifest: path.relative(ROOT, MANIFEST_PATH),
    },
    null,
    2,
  ),
);

if (failed.length > 0) {
  console.log("Failed URLs:");
  for (const item of failed) console.log(`${item.sourceUrl} — ${item.status}`);
  process.exitCode = 2;
}
