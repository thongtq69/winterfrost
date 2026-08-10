import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import postcss from "postcss";

const SOURCES = [
  "https://homenest.com.vn/_next/static/chunks/81283a3f388ea1bf.css",
  "https://homenest.com.vn/_next/static/chunks/f6a48a8a59bef51b.css",
];

const MODULE_PREFIXES = [
  "CTABannerDynamic-module__UTmUdW",
  "PrimaryCTA-module__9FAYqq",
  "Projects-module__io0fUW",
  "ViewAllButton-module__yBldoW",
  "base-module__OZd6jq",
  "content-module__ZwfD0a",
  "header-module__Dea5oa",
  "showcase-module__TljteG",
  "webShowcase-module__j9OAiq",
];

const responses = await Promise.all(SOURCES.map((source) => fetch(source)));
for (const [index, response] of responses.entries()) {
  if (!response.ok) {
    throw new Error(`Unable to fetch ${SOURCES[index]}: HTTP ${response.status}`);
  }
}

const css = (await Promise.all(responses.map((response) => response.text()))).join("\n");
const root = postcss.parse(css);

root.walkRules((rule) => {
  const keyframes = rule.parent?.type === "atrule"
    && ["keyframes", "-webkit-keyframes"].includes(rule.parent.name);
  const keepKeyframe = keyframes
    && MODULE_PREFIXES.some((prefix) => rule.parent.params.includes(prefix));
  if (!keepKeyframe && !MODULE_PREFIXES.some((prefix) => rule.selector.includes(prefix))) {
    rule.remove();
  }
});

root.walkAtRules((atRule) => {
  if (!atRule.nodes?.length) atRule.remove();
});

const compatibilityRules = `
/*
 * Rebranded raw records export marqueeCard nodes while the original stylesheet
 * named the same nodes sliderCard. Keep the adapter local so the archived
 * markup does not depend on a rotating Next.js chunk hash.
 */
.webShowcase-module__j9OAiq__marqueeCard {
  cursor: pointer;
  border-radius: 16px;
  flex-shrink: 0;
  height: 265px;
  overflow: hidden;
  position: absolute;
  box-shadow: 0 10px 30px #00000014;
}
.webShowcase-module__j9OAiq__marqueeCard img {
  object-fit: cover;
  user-select: none;
  width: 100%;
  height: 100%;
  display: block;
}

/*
 * The phone frame is a visual asset managed by the image migration pipeline.
 * Reserve its exact target ratio so layout stays stable while that asset loads.
 */
.showcase-module__TljteG__centerPhone {
  aspect-ratio: 330 / 672;
}

/*
 * The source template uses the browser's default button font size. The cloned
 * shell globally inherits button typography, so pin the source value locally.
 */
.showcase-module__TljteG__navPrev,
.showcase-module__TljteG__navNext,
.webShowcase-module__j9OAiq__navPrev,
.webShowcase-module__j9OAiq__navNext {
  font-size: 13.3333px;
}

@media (max-width: 1100px) {
  .webShowcase-module__j9OAiq__marqueeCard { height: 226px; }
}
@media (max-width: 768px) {
  .webShowcase-module__j9OAiq__marqueeCard { height: 172px; }
}
@media (max-width: 480px) {
  .webShowcase-module__j9OAiq__marqueeCard { height: 132px; }
}
`;

const banner = `/*
 * Vendored from the original HomeNest case-study template.
 * Source snapshots:
 * - ${SOURCES[0]}
 * - ${SOURCES[1]}
 *
 * Regenerate with: node scripts/vendor-legacy-case-study-css.mjs
 */
`;

const output = new URL(
  "../src/components/sections/case-study-detail/legacy-case-study.css",
  import.meta.url,
);
await writeFile(fileURLToPath(output), `${banner}${root.toString()}\n${compatibilityRules}`);

console.log(`Wrote ${fileURLToPath(output)}`);
