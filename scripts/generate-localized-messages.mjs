import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const messagesDirectory = path.join(root, "messages");
const sourceMessagesPath = path.join(messagesDirectory, "vi.json");
const siteDataPath = path.join(root, "src/lib/site-data.json");
const servicesPageDataPath = path.join(root, "src/lib/dich-vu-page.ts");
const servicesDetailDataPath = path.join(root, "src/lib/dich-vu-detail-pages.ts");
const jobDataPath = path.join(root, "src/lib/job-data.ts");
const industryDetailDataPath = path.join(root, "src/lib/industry-detail-data.json");
const liveCaseDetailDataPath = path.join(root, "src/lib/case-study-live-details.json");
const liveWikiDetailDataPath = path.join(root, "src/_content/wiki-live-details.json");
const localizedContentDirectory = path.join(root, "src/_content/i18n");
const serviceDetailFiles = [
  "thiet-ke-website",
  "phat-trien-devops",
  "phat-trien-iot",
  "phat-trien-blockchain",
  "phat-trien-ai",
  "phat-trien-ung-dung-saas",
  "thiet-ke-app",
  "van-hanh-va-bao-tri",
  "phat-trien-phan-mem-doanh-nghiep",
  "phat-trien-phan-mem-mvp"
];

const targets = ["en", "ja", "zh", "de", "ko", "hi"];
const preservedKeys = new Set([
  "author",
  "avatar",
  "avatars",
  "bgImage",
  "categoryBg",
  "categoryColor",
  "ctaHref",
  "domain",
  "email",
  "href",
  "hoverImg",
  "icon",
  "iconPath",
  "image",
  "imageColumn",
  "imageMain",
  "key",
  "logo",
  "meshGraphic",
  "name",
  "ogImage",
  "phoneImages",
  "slug",
  "social",
  "src",
  "starIcon",
  "type",
  "url",
  "video"
]);

function autoTextKey(source) {
  let hash = 0x811c9dc5;
  for (let index = 0; index < source.length; index += 1) {
    hash ^= source.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }
  return `k${(hash >>> 0).toString(36)}`;
}

function shouldPreserve(key, value) {
  return (
    preservedKeys.has(key) ||
    value === "Winterfrost" ||
    /^(?:https?:|tel:|mailto:|#)/.test(value) ||
    /^\/[a-z0-9_?=&%+./#-]*$/i.test(value) ||
    /^(?:rgba?\(|#[\da-f]{3,8}$)/i.test(value) ||
    /^[\d\s+%.,:/-]+$/.test(value)
  );
}

function htmlTextSegments(html) {
  const segments = [];
  let skippedElement = "";
  let insideCode = false;
  for (const token of html.split(/(<[^>]+>)/g)) {
    if (!token) continue;
    if (token.startsWith("<")) {
      if (/^<\s*code\b/i.test(token)) insideCode = true;
      if (/^<\s*\/\s*code\b/i.test(token)) insideCode = false;
      const closing = token.match(/^<\s*\/\s*(script|style)\b/i)?.[1];
      const opening = token.match(/^<\s*(script|style)\b/i)?.[1];
      if (closing) skippedElement = "";
      else if (opening && !insideCode && !/\/\s*>$/.test(token)) {
        skippedElement = opening.toLowerCase();
      }
      continue;
    }
    if (!skippedElement && /[\p{L}]/u.test(token) && !shouldPreserve("contentHtml", token)) {
      segments.push(token);
    }
  }
  return segments;
}

function collectTranslatableStrings(value, key = "", strings = new Set()) {
  if (typeof value === "string") {
    if (key === "contentHtml") {
      for (const segment of htmlTextSegments(value)) strings.add(segment);
      return strings;
    }
    if (!shouldPreserve(key, value)) strings.add(value);
    return strings;
  }

  if (Array.isArray(value)) {
    for (const item of value) collectTranslatableStrings(item, key, strings);
    return strings;
  }

  if (value && typeof value === "object") {
    for (const [childKey, childValue] of Object.entries(value)) {
      collectTranslatableStrings(childValue, childKey, strings);
    }
  }

  return strings;
}

function createBatches(strings, maxCharacters = 2_500, maxItems = 30) {
  const batches = [];
  let batch = [];
  let length = 0;

  for (const value of strings) {
    const addition = value.length + 24;
    if (
      batch.length &&
      (length + addition > maxCharacters || batch.length >= maxItems)
    ) {
      batches.push(batch);
      batch = [];
      length = 0;
    }
    batch.push(value);
    length += addition;
  }

  if (batch.length) batches.push(batch);
  return batches;
}

const bingUserAgent =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 Edg/122.0.0.0";
let bingConfigPromise;

function hasVietnameseLetters(value) {
  return /[ĂÂĐÊÔƠƯăâđêôơưÀ-ỹ]/.test(value);
}

async function getBingConfig() {
  bingConfigPromise ??= fetch("https://www.bing.com/translator", {
    headers: { "user-agent": bingUserAgent },
    signal: AbortSignal.timeout(20_000)
  }).then(async (response) => {
    if (!response.ok) throw new Error(`Bing translator auth failed with ${response.status}`);
    const body = await response.text();
    const IG = body.match(/IG:"([^"]+)"/)?.[1];
    const IID = body.match(/data-iid="([^"]+)"/)?.[1];
    const rawParams = body.match(/params_AbusePreventionHelper\s?=\s?([^\]]+\])/)?.[1];
    if (!IG || !IID || !rawParams) throw new Error("Bing translator config was incomplete");
    const [key, token] = JSON.parse(rawParams);
    return { IG, IID, key, token };
  });
  return bingConfigPromise;
}

async function translateBatch(batch, locale) {
  const brandToken = "WFXBRANDXWF";
  const separator = "\nWFXSPLITXWF\n";
  const target = locale === "zh" ? "zh-Hans" : locale;
  const { IG, IID, key, token } = await getBingConfig();
  const payload = batch
    .map((value) => value.trim().replaceAll("Winterfrost", brandToken))
    .join(separator);
  const body = new URLSearchParams({
    fromLang: hasVietnameseLetters(payload) ? "vi" : "auto-detect",
    to: target,
    text: payload,
    token,
    key: String(key),
    tryFetchingGenderDebiasedTranslations: "true"
  });
  const response = await fetch(
    `https://www.bing.com/ttranslatev3?isVertical=1&&IG=${IG}&IID=${IID}&ref=TThis&edgepdftranslator=1`,
    {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        referer: "https://www.bing.com/translator",
        "user-agent": bingUserAgent
      },
      body,
      signal: AbortSignal.timeout(30_000)
    }
  );

  if (!response.ok) {
    if (response.status === 401 || response.status === 429) {
      bingConfigPromise = undefined;
    }
    throw new Error(`Translation request failed with ${response.status}`);
  }

  const result = await response.json();
  const translatedText = result?.[0]?.translations?.[0]?.text;
  if (typeof translatedText !== "string") {
    throw new Error("Bing translator returned an unexpected response");
  }
  const translatedItems = translatedText.split(separator);
  if (translatedItems.length !== batch.length) {
    if (batch.length > 1) {
      const midpoint = Math.ceil(batch.length / 2);
      return [
        ...(await translateBatch(batch.slice(0, midpoint), locale)),
        ...(await translateBatch(batch.slice(midpoint), locale))
      ];
    }
    return [
      `${batch[0].match(/^\s*/)?.[0] ?? ""}${translatedText
        .replaceAll(brandToken, "Winterfrost")}${batch[0].match(/\s*$/)?.[0] ?? ""}`
    ];
  }

  return translatedItems.map((translated, index) => {
    const source = batch[index];
    const leading = source.match(/^\s*/)?.[0] ?? "";
    const trailing = source.match(/\s*$/)?.[0] ?? "";
    return `${leading}${translated.replaceAll(brandToken, "Winterfrost")}${trailing}`;
  });
}

async function translateStrings(strings, locale) {
  const translations = new Map();
  const batches = createBatches(strings);
  let nextBatch = 0;
  const workers = Array.from({ length: Math.min(1, batches.length) }, async () => {
    while (nextBatch < batches.length) {
      const batchIndex = nextBatch;
      nextBatch += 1;
      const batch = batches[batchIndex];
    let translated;
    let lastError;

      for (let attempt = 0; attempt < 8; attempt += 1) {
      try {
        translated = await translateBatch(batch, locale);
        break;
      } catch (error) {
        lastError = error;
          const delay = 1_000 * (attempt + 1);
          await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }

    if (!translated) throw lastError;
    batch.forEach((source, index) => translations.set(source, translated[index]));
      console.log(`${locale}: translated batch ${batchIndex + 1}/${batches.length}`);
  }
  });
  await Promise.all(workers);

  return translations;
}

function localizeHtml(html, translations) {
  let skippedElement = "";
  let insideCode = false;
  return html.split(/(<[^>]+>)/g).map((token) => {
    if (!token) return token;
    if (token.startsWith("<")) {
      if (/^<\s*code\b/i.test(token)) insideCode = true;
      if (/^<\s*\/\s*code\b/i.test(token)) insideCode = false;
      const closing = token.match(/^<\s*\/\s*(script|style)\b/i)?.[1];
      const opening = token.match(/^<\s*(script|style)\b/i)?.[1];
      if (closing) skippedElement = "";
      else if (opening && !insideCode && !/\/\s*>$/.test(token)) {
        skippedElement = opening.toLowerCase();
      }
      return token;
    }
    return skippedElement ? token : (translations.get(token) ?? token);
  }).join("");
}

function localize(value, translations, key = "") {
  if (typeof value === "string") {
    if (key === "contentHtml") return localizeHtml(value, translations);
    return shouldPreserve(key, value) ? value : (translations.get(value) ?? value);
  }

  if (Array.isArray(value)) {
    return value.map((item) => localize(item, translations, key));
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([childKey, childValue]) => [
        childKey,
        localize(childValue, translations, childKey)
      ])
    );
  }

  return value;
}

function seedTranslations(source, localized, translations, key = "") {
  if (typeof source === "string" && typeof localized === "string") {
    if (key === "contentHtml") {
      const sourceTokens = source.split(/(<[^>]+>)/g);
      const localizedTokens = localized.split(/(<[^>]+>)/g);
      if (sourceTokens.length === localizedTokens.length) {
        sourceTokens.forEach((token, index) => {
          if (!token.startsWith("<") && /[\p{L}]/u.test(token)) {
            if (
              localizedTokens[index] !== token ||
              !hasVietnameseLetters(token)
            ) {
              translations.set(token, localizedTokens[index]);
            }
          }
        });
      }
    } else if (!shouldPreserve(key, source)) {
      if (localized !== source || !hasVietnameseLetters(source)) {
        translations.set(source, localized);
      }
    }
    return translations;
  }
  if (Array.isArray(source) && Array.isArray(localized)) {
    source.forEach((item, index) =>
      seedTranslations(item, localized[index], translations, key)
    );
    return translations;
  }
  if (source && localized && typeof source === "object" && typeof localized === "object") {
    for (const [childKey, childValue] of Object.entries(source)) {
      seedTranslations(childValue, localized[childKey], translations, childKey);
    }
  }
  return translations;
}

async function readJsonIfExists(file) {
  try {
    return JSON.parse(await readFile(file, "utf8"));
  } catch {
    return undefined;
  }
}

function extractConstExpression(source, startMarker, endMarker) {
  const start = source.indexOf(startMarker);
  const end = source.indexOf(endMarker, start + startMarker.length);

  if (start === -1 || end === -1) {
    throw new Error(`Unable to extract ${startMarker}`);
  }

  return source
    .slice(start + startMarker.length, end)
    .trim()
    .replace(/;\s*$/, "")
    .replace(/!([,.)\]])/g, "$1");
}

const sourceMessages = JSON.parse(await readFile(sourceMessagesPath, "utf8"));
const siteData = JSON.parse(await readFile(siteDataPath, "utf8"));
const servicesPageSource = await readFile(servicesPageDataPath, "utf8");
const servicesDetailSource = await readFile(servicesDetailDataPath, "utf8");
const jobDataSource = await readFile(jobDataPath, "utf8");
const industryDetails = JSON.parse(await readFile(industryDetailDataPath, "utf8"));
const liveCaseDetails = JSON.parse(await readFile(liveCaseDetailDataPath, "utf8"));
const liveWikiDetails = JSON.parse(await readFile(liveWikiDetailDataPath, "utf8"));
const remoteWikiSlugs = [
  "cong-viec-cua-tester-tai-winterfrost-viet-nam-se-lam-nhung-gi",
  "mot-ngay-lam-viec-cua-ba-tai-winterfrost-viet-nam",
  "mot-ngay-lam-viec-cua-flutter-developer-se-nhu-the-nao"
];
const remoteWikiPages = Object.fromEntries(
  await Promise.all(
    remoteWikiSlugs.map(async (slug) => {
      try {
        const response = await fetch(`https://winterfrost.tech/${slug}`, {
          signal: AbortSignal.timeout(30_000)
        });
        const source = response.ok ? await response.text() : "";
        return [slug, source.match(/<main\b[^>]*>[\s\S]*?<\/main>/i)?.[0] ?? ""];
      } catch {
        return [slug, ""];
      }
    })
  )
);
const servicesPageExpression = servicesPageSource
  .slice(servicesPageSource.indexOf("export const dichVuPage =") + "export const dichVuPage =".length)
  .replace(/\s+as \[string, string, string\]/g, "")
  .replace(/\s+as const;\s*$/, "");
const servicesPage = Function(`"use strict"; return (${servicesPageExpression});`)();
const baseServiceDetails = Object.fromEntries(
  await Promise.all(
    serviceDetailFiles.map(async (slug) => [
      slug,
      JSON.parse(
        await readFile(path.join(root, "src/_content", `${slug}.json`), "utf8")
      )
    ])
  )
);
const dichVuItExpression = extractConstExpression(
  servicesDetailSource,
  "const dichVuItPage: ServicePageContent =",
  "const tuVanChuyenDoiSoPage: ServicePageContent ="
);
const tuVanChuyenDoiSoExpression = extractConstExpression(
  servicesDetailSource,
  "const tuVanChuyenDoiSoPage: ServicePageContent =",
  "export function getDichVuDetailPage"
);
const evaluateServiceDetail = (expression) =>
  Function(
    "dichVuDetailPages",
    `"use strict"; return (${expression});`
  )(baseServiceDetails);
const serviceDetails = {
  ...baseServiceDetails,
  "dich-vu-it": evaluateServiceDetail(dichVuItExpression),
  "tu-van-chuyen-doi-so": evaluateServiceDetail(tuVanChuyenDoiSoExpression)
};
const jobContentsExpression = jobDataSource
  .slice(
    jobDataSource.indexOf("export const jobContents =") + "export const jobContents =".length,
    jobDataSource.indexOf(" satisfies JobContent[]")
  );
const jobContents = Function(`"use strict"; return (${jobContentsExpression});`)();

async function collectSourceFiles(directory, files = []) {
  const entries = await (await import("node:fs/promises")).readdir(directory, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) await collectSourceFiles(fullPath, files);
    else if (/\.(?:ts|tsx)$/.test(entry.name)) files.push(fullPath);
  }
  return files;
}

async function collectUiSourceStrings() {
  const strings = new Set();
  const addUiString = (value) => {
    if (
      value.length <= 800 &&
      !/\b(?:const|let|function|querySelector|addEventListener)\b/.test(value) &&
      !value.includes("${")
    ) {
      strings.add(value);
    }
  };
  const roots = [
    path.join(root, "src/app/[locale]"),
    path.join(root, "src/components")
  ];
  const files = (await Promise.all(roots.map((directory) => collectSourceFiles(directory)))).flat();
  files.push(path.join(root, "src/lib/case-studies-live.ts"), path.join(root, "src/lib/wiki-live.ts"));
  files.push(path.join(root, "src/lib/integrations/contact-form.ts"));
  const literalPattern = /(["'`])((?:\\.|(?!\1)[\s\S])*?)\1/g;
  for (const file of files) {
    const source = await readFile(file, "utf8");
    const customSoftwareSource = file.endsWith("CustomSoftwareRawPage.tsx");
    for (const match of source.matchAll(literalPattern)) {
      const value = match[2]
        .replace(/\\n/g, "\n")
        .replace(/\\"/g, "\"")
        .replace(/\\'/g, "'");
      if (value.includes("<") && value.includes(">")) {
        for (const segment of htmlTextSegments(value)) {
          const normalized = segment.replace(/\s+/g, " ").trim();
          if (normalized) addUiString(normalized);
        }
      } else if (
        /[À-ỹ]/.test(value) ||
        (
          customSoftwareSource &&
          value.length > 15 &&
          /[A-Za-z]{3}\s+[A-Za-z]{3}/.test(value) &&
          !/[<>{}\[\]=]/.test(value)
        )
      ) {
        addUiString(value);
      }
    }
    for (const match of source.matchAll(/>([^<>{}]+)</g)) {
      const value = match[1].replace(/\s+/g, " ").trim();
      if (/[À-ỹ]/.test(value)) addUiString(value);
    }
  }
  for (const value of [
    "Home", "Wiki", "Work life", "NEXT", "Case-studies", "Work Life",
    "WORK LIFE", "Xem Case Study",
    "Work-Life", "AI", "Top List", "UIUX Design", "Website", "Mobile App",
    "Blockchain", "IoT", "Startups", "Date", "Author", "Scope of Work",
    "View Live Site", "Search...", "From our insights,", "industry knowledge.",
    "Back Home"
  ]) addUiString(value);
  const summaries = (value) => {
    const items = Array.isArray(value) ? value : [value];
    return items.map((item) => {
    const summary = { ...item };
    delete summary.contentHtml;
    delete summary.contentText;
    return summary;
    });
  };
  for (const value of collectTranslatableStrings([
    siteData.aboutPageDetail,
    summaries(siteData.about),
    siteData.contact,
    siteData.industriesPage,
    siteData.careers,
    jobContents.map(({ title }) => title),
    summaries(siteData.industries),
    summaries(siteData.services),
    summaries(siteData.caseStudies),
    summaries(siteData.wiki)
  ])) strings.add(value);
  return strings;
}

sourceMessages.Home = siteData.home;
sourceMessages.ServicesPage = servicesPage;
const uiSourceStrings = await collectUiSourceStrings();
sourceMessages.AutoText = Object.fromEntries(
  [...uiSourceStrings].map((value) => [autoTextKey(value), value])
);

await writeFile(sourceMessagesPath, `${JSON.stringify(sourceMessages, null, 2)}\n`);
await mkdir(localizedContentDirectory, { recursive: true });

for (const locale of targets) {
  const existingPath = path.join(messagesDirectory, `${locale}.json`);
  const existing = JSON.parse(await readFile(existingPath, "utf8"));
  const translations = new Map();
  seedTranslations(sourceMessages, existing, translations);
  const existingServiceDetails = await readJsonIfExists(
    path.join(localizedContentDirectory, `${locale}.service-details.json`)
  );
  if (existingServiceDetails) {
    seedTranslations(serviceDetails, existingServiceDetails, translations);
  }
  for (const [name, source] of [
    ["industry-details", industryDetails],
    ["case-details", liveCaseDetails],
    ["wiki-details", liveWikiDetails],
    ["job-details", jobContents],
    ["legacy-case-studies", siteData.caseStudies],
    ["legacy-wiki", siteData.wiki],
    ["legacy-services", siteData.services],
    ["remote-wiki", remoteWikiPages]
  ]) {
    const localized = await readJsonIfExists(
      path.join(localizedContentDirectory, `${locale}.${name}.json`)
    );
    if (localized) seedTranslations(source, localized, translations);
  }
  const strings = [
    ...collectTranslatableStrings([
      sourceMessages,
      serviceDetails,
      industryDetails,
      liveCaseDetails,
      liveWikiDetails,
      jobContents,
      siteData.caseStudies,
      siteData.wiki,
      siteData.services,
      remoteWikiPages
    ])
  ].filter((source) => !translations.has(source));
  const newTranslations = await translateStrings(strings, locale);
  for (const [source, localized] of newTranslations) {
    translations.set(source, localized);
  }
  const localized = localize(sourceMessages, translations);
  const localizedServiceDetails = localize(serviceDetails, translations);
  const localizedIndustryDetails = localize(industryDetails, translations);
  const localizedLiveCaseDetails = localize(liveCaseDetails, translations);
  const localizedLiveWikiDetails = localize(liveWikiDetails, translations);
  const localizedJobContents = localize(jobContents, translations);
  const localizedLegacyCaseStudies = localize(siteData.caseStudies, translations);
  const localizedLegacyWiki = localize(siteData.wiki, translations);
  const localizedLegacyServices = localize(siteData.services, translations);
  const localizedRemoteWiki = localize(remoteWikiPages, translations);

  localized.Navigation = existing.Navigation ?? localized.Navigation;
  await writeFile(existingPath, `${JSON.stringify(localized, null, 2)}\n`);
  await writeFile(
    path.join(localizedContentDirectory, `${locale}.service-details.json`),
    `${JSON.stringify(localizedServiceDetails, null, 2)}\n`
  );
  await Promise.all([
    writeFile(
      path.join(localizedContentDirectory, `${locale}.industry-details.json`),
      `${JSON.stringify(localizedIndustryDetails, null, 2)}\n`
    ),
    writeFile(
      path.join(localizedContentDirectory, `${locale}.case-details.json`),
      `${JSON.stringify(localizedLiveCaseDetails, null, 2)}\n`
    ),
    writeFile(
      path.join(localizedContentDirectory, `${locale}.wiki-details.json`),
      `${JSON.stringify(localizedLiveWikiDetails, null, 2)}\n`
    ),
    writeFile(
      path.join(localizedContentDirectory, `${locale}.job-details.json`),
      `${JSON.stringify(localizedJobContents, null, 2)}\n`
    ),
    writeFile(
      path.join(localizedContentDirectory, `${locale}.legacy-case-studies.json`),
      `${JSON.stringify(localizedLegacyCaseStudies, null, 2)}\n`
    ),
    writeFile(
      path.join(localizedContentDirectory, `${locale}.legacy-wiki.json`),
      `${JSON.stringify(localizedLegacyWiki, null, 2)}\n`
    ),
    writeFile(
      path.join(localizedContentDirectory, `${locale}.legacy-services.json`),
      `${JSON.stringify(localizedLegacyServices, null, 2)}\n`
    ),
    writeFile(
      path.join(localizedContentDirectory, `${locale}.remote-wiki.json`),
      `${JSON.stringify(localizedRemoteWiki, null, 2)}\n`
    )
  ]);
}
