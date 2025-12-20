import fs from 'node:fs/promises';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { load } from 'cheerio';

const __dirname = dirname(fileURLToPath(import.meta.url));

const detailUrls = [
  "https://xuanhieuit.com/du-an/wbc/",
  "https://xuanhieuit.com/du-an/cong-ty-tnhh-tu-van-va-quan-ly-sct/",
  "https://xuanhieuit.com/du-an/h3-group/",
  "https://xuanhieuit.com/du-an/catherine-cruise/",
  "https://xuanhieuit.com/du-an/meditrain/",
  "https://xuanhieuit.com/du-an/pathfinder/",
  "https://xuanhieuit.com/du-an/viamc/",
  "https://xuanhieuit.com/du-an/vi-vu-quang-binh/",
  "https://xuanhieuit.com/du-an/fly-future/",
  "https://xuanhieuit.com/du-an/thanh-toan-viet-tin/",
  "https://xuanhieuit.com/du-an/hoang-ngan-jp/",
  "https://xuanhieuit.com/du-an/royalcare/",
  "https://xuanhieuit.com/du-an/romo-cons/",
  "https://xuanhieuit.com/du-an/bao-hung/",
  "https://xuanhieuit.com/du-an/viet-sky-agency/",
  "https://xuanhieuit.com/du-an/hang-gift-store/",
  "https://xuanhieuit.com/du-an/tra-sua-bong-bieng/",
  "https://xuanhieuit.com/du-an/cnbuyapp-ung-dung/",
  "https://xuanhieuit.com/du-an/kyodai-hai-duong/",
  "https://xuanhieuit.com/du-an/may-chieu-hoci/",
  "https://xuanhieuit.com/du-an/eclate/",
  "https://xuanhieuit.com/du-an/diademy-elearning/",
  "https://xuanhieuit.com/du-an/ldp-bds-eaton-park/",
  "https://xuanhieuit.com/du-an/cong-vien-76/",
  "https://xuanhieuit.com/du-an/elearning-website/",
  "https://xuanhieuit.com/du-an/website-ban-qua-tet/",
  "https://xuanhieuit.com/du-an/qspa/",
  "https://xuanhieuit.com/du-an/qbeauty/",
  "https://xuanhieuit.com/du-an/tu-an-clinic/",
  "https://xuanhieuit.com/du-an/myosung-trading/",
  "https://xuanhieuit.com/du-an/coinminutes/",
  "https://xuanhieuit.com/du-an/ommani-viet-nam/",
  "https://xuanhieuit.com/du-an/truong-anh-holtel/",
  "https://xuanhieuit.com/du-an/nha-dat-kim-tuan/",
  "https://xuanhieuit.com/du-an/masteri-waterfront/",
  "https://xuanhieuit.com/du-an/travel-newland/",
  "https://xuanhieuit.com/du-an/thuy-san-vuong-phat-68/",
  "https://xuanhieuit.com/du-an/level-up/",
  "https://xuanhieuit.com/du-an/aplus/",
  "https://xuanhieuit.com/du-an/patado-go/",
  "https://xuanhieuit.com/du-an/nha-thuoc-manh-anh/",
  "https://xuanhieuit.com/du-an/nha-khoa-ken/",
  "https://xuanhieuit.com/du-an/luong-dien-ngoc-lien/",
  "https://xuanhieuit.com/du-an/my-candy-viet-nam/",
  "https://xuanhieuit.com/du-an/qacademy/",
  "https://xuanhieuit.com/du-an/kjm-group-korea-ginseng-center/",
  "https://xuanhieuit.com/du-an/6868-logistics/",
  "https://xuanhieuit.com/du-an/mens-hair-designer/",
  "https://xuanhieuit.com/du-an/duoc-bat-phuc/",
  "https://xuanhieuit.com/du-an/agency-mic-creative/",
  "https://xuanhieuit.com/du-an/xuong-thiet-ke-kas-house/",
  "https://xuanhieuit.com/du-an/qgroup/",
  "https://xuanhieuit.com/du-an/benh-vien-mat-ha-noi/",
  "https://xuanhieuit.com/du-an/phong-kham-mat-bich-ngoc/",
  "https://xuanhieuit.com/du-an/wulong/",
  "https://xuanhieuit.com/du-an/mabanol-viet-nam/",
  "https://xuanhieuit.com/du-an/moss-viet-nam/",
  "https://xuanhieuit.com/du-an/sao-ee-viet-nam-va-tot-architects-tay-ban-nha/",
  "https://xuanhieuit.com/du-an/alegolf/",
  "https://xuanhieuit.com/du-an/lau-wang/"
];

const normalizeText = (str = '') => str.replace(/\s+/g, ' ').trim().toLowerCase();

const chunk = (arr, size) => {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
};

const scrapeDetail = async (detailUrl) => {
  const slug = detailUrl.replace(/\/$/, '').split('/').pop();
  try {
    const res = await fetch(detailUrl, { headers: { 'user-agent': 'Mozilla/5.0 CodexBot' } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const html = await res.text();
    const $ = load(html);
    const title = $('h1').first().text().trim() || slug;

    const link = $('a')
      .filter((_, el) => normalizeText($(el).text()).includes('xem thực tế'))
      .first();
    let realUrl = link.attr('href') || null;
    if (realUrl && realUrl.startsWith('/')) {
      realUrl = new URL(realUrl, 'https://xuanhieuit.com').href;
    }

    if (!realUrl) {
      console.warn(`Warning: realUrl not found for ${detailUrl}`);
    }

    return { slug, title, detailUrl, realUrl };
  } catch (error) {
    console.error(`Error scraping ${detailUrl}:`, error.message);
    return { slug, title: slug, detailUrl, realUrl: null };
  }
};

const main = async () => {
  const results = [];
  const batches = chunk(detailUrls, 5);

  for (const batch of batches) {
    const data = await Promise.all(batch.map(scrapeDetail));
    results.push(...data);
  }

  const tsPath = new URL('../data/projects.realurls.ts', import.meta.url);
  const jsonPath = new URL('../data/projects.realurls.json', import.meta.url);

  const jsonContent = JSON.stringify(results, null, 2);
  await fs.writeFile(jsonPath, jsonContent, 'utf8');

  const tsContent = `export const projectsRealUrls = ${jsonContent} as const;`;
  await fs.writeFile(tsPath, tsContent, 'utf8');

  console.log(`Saved ${results.length} entries to ${jsonPath.pathname} and ${tsPath.pathname}`);
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
