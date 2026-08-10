import { readFile, writeFile } from "node:fs/promises";

const inputPath = process.argv[2] ?? "/tmp/homenest-industries-raw.json";
const outputPath =
  process.argv[3] ?? "src/lib/industry-detail-data.json";

const raw = JSON.parse(await readFile(inputPath, "utf8"));

function lines(section) {
  return section.text
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function findSection(page, predicate) {
  return page.sections.find(predicate);
}

function parsePairs(section, start = 2, expected = 6) {
  const source = lines(section);
  return Array.from({ length: expected }, (_, index) => ({
    title: source[start + index * 2] ?? "",
    description: source[start + index * 2 + 1] ?? "",
    image: section.images[index]?.src ?? "",
    imageAlt: section.images[index]?.alt ?? "",
  })).filter((item) => item.title);
}

function parseWhy(section) {
  const source = lines(section);
  const firstNumber = source.findIndex((line) => line === "1");
  const items = [];

  for (let index = firstNumber; index >= 0 && index < source.length; index += 3) {
    if (!/^[1-6]$/.test(source[index] ?? "")) break;
    items.push({
      number: source[index],
      title: source[index + 1] ?? "",
      description: source[index + 2] ?? "",
    });
  }

  return {
    label: source[0] ?? "Tại sao chọn chúng tôi?",
    title: source.slice(1, firstNumber).join(" "),
    items,
  };
}

function parseProcess(section) {
  const source = lines(section);
  const markers = source
    .map((line, index) => (/^\d{2}$/.test(line) ? index : -1))
    .filter((index) => index >= 0);

  const items = markers.map((marker, index) => {
    const nextMarker = markers[index + 1] ?? source.length;
    const block = source.slice(marker + 1, nextMarker);
    return {
      number: source[marker],
      tag: block[0] ?? "",
      title: block[1] ?? "",
      description: block[2] ?? "",
    };
  });

  const finalMarker = markers.at(-1) ?? 0;
  const finalBlock = source.slice(finalMarker + 1);
  const cta =
    finalBlock.length > 3
      ? finalBlock.at(-1)
      : "Bắt đầu xây dựng sản phẩm của bạn!";

  return {
    label: source[0] ?? "Quy trình triển khai dự án?",
    items,
    cta,
  };
}

function parsePage(slug, page) {
  const hero = page.sections[0];
  const overview = page.sections[1];
  const counters = page.sections[2];
  const values = page.sections[3];
  const why = findSection(page, (section) =>
    section.cls.includes("whySection"),
  );
  const whyIndex = page.sections.indexOf(why);
  const cta = page.sections[whyIndex + 1];
  const cases = findSection(page, (section) =>
    section.cls.includes("CaseStudySection"),
  );
  const deepDive = findSection(
    page,
    (section) =>
      section.cls.includes("deepDiveSection") ||
      (section.images.length === 6 &&
        lines(section).length >= 14 &&
        !section.cls.includes("techSection")),
  );
  const process = findSection(
    page,
    (section) =>
      section.cls.includes("howSection") ||
      lines(section)[0] === "Quy trình triển khai dự án?",
  );
  const faq = findSection(page, (section) =>
    section.cls.includes("faqSection"),
  );

  const heroLines = lines(hero);
  const overviewLines = lines(overview);
  const counterLines = lines(counters);
  const valueLines = lines(values);
  const ctaLines = lines(cta);
  const deepDiveLines = lines(deepDive);
  const faqLines = lines(faq);

  return {
    slug,
    title: page.title.replace(/\s*-\s*HomeNest Việt Nam\s*$/, ""),
    hero: {
      title: heroLines[0] ?? "",
      description: heroLines[1] ?? "",
      image: hero.images[0]?.src ?? "",
      imageAlt: hero.images[0]?.alt ?? heroLines[0] ?? "",
      primaryLabel: heroLines.at(-2) ?? "Liên hệ trực tiếp",
      secondaryLabel: heroLines.at(-1) ?? "Nhắn tin nhận tư vấn",
    },
    overview: {
      label: overviewLines[0] ?? "Overview",
      title: overviewLines[1] ?? "",
      paragraphs: overviewLines.slice(2),
      image: overview.images[0]?.src ?? "",
      imageAlt: overview.images[0]?.alt ?? overviewLines[1] ?? "",
    },
    counters: Array.from({ length: 4 }, (_, index) => ({
      index: counterLines[1 + index * 3] ?? `/0${index + 1}`,
      value: counterLines[2 + index * 3] ?? "",
      label: counterLines[3 + index * 3] ?? "",
    })),
    values: {
      title: valueLines[0] ?? "",
      intro: valueLines[1] ?? "",
      items: parsePairs(values),
      cta: valueLines.at(-1) ?? "Đặt lịch tư vấn ngay!",
    },
    why: parseWhy(why),
    cta: {
      label: ctaLines[0] ?? "Liên hệ ngay!",
      title: ctaLines[1] ?? "",
      description: ctaLines[2] ?? "",
      buttonLabel: ctaLines[3] ?? "Nhận tư vấn giải pháp ngay",
      image: cta.images[0]?.src ?? "",
      imageAlt: cta.images[0]?.alt ?? "",
    },
    cases: cases
      ? {
          title: lines(cases)[0] ?? "Case Studies",
          links: cases.links
            .filter((link) => link.href.includes("/case-studies/"))
            .filter(
              (link, index, all) =>
                all.findIndex((item) => item.href === link.href) === index,
            ),
          images: cases.images,
        }
      : null,
    services: {
      title: deepDiveLines[0] ?? "",
      intro: deepDiveLines[1] ?? "",
      items: parsePairs(deepDive),
      cta: deepDiveLines.at(-1) ?? "Khám phá tất cả dịch vụ",
    },
    process: parseProcess(process),
    faq: {
      label: faqLines[0] ?? "Các câu hỏi thường gặp",
      title: `${faqLines[1] ?? "Giải Đáp Mọi"} ${faqLines[2] ?? "Thắc Mắc"}`,
      intro: faqLines[3] ?? "",
      items: page.faqItems ?? [],
    },
  };
}

const parsed = Object.fromEntries(
  Object.entries(raw).map(([slug, page]) => [slug, parsePage(slug, page)]),
);

await writeFile(outputPath, `${JSON.stringify(parsed, null, 2)}\n`);
