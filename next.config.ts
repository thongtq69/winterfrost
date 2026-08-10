import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const projectRedirects = [
  ["website-song-quan-ads", "website-pixelnova-media"],
  ["website-tra-nuage-sauvage", "website-mocvan-tea"],
  ["peace-viet-nam", "aeromint-cleanroom"],
  ["app-vietplus", "app-nivora-connect"],
  ["lovers-lawn-app", "app-grevia-lawn"],
  ["website-hang-kenh", "website-loomora-rugs"],
  ["website-paint-and-more", "website-chromiva-coatings"],
  ["website-kim-cuong-xanh", "website-verdora-property"],
  ["website-candygogo-factory", "website-candella-works"],
  ["bao-bi-tan-phong", "website-flexora-packaging"],
  ["nhua-khanh-phong", "website-polyvera"],
  ["website-mida", "website-mirava"],
  ["laptop-alltech", "website-bytevera"],
  ["autolink-vietnam", "website-motoria-link"],
  ["website-singapodent", "website-dentavera"],
  ["website-noi-that-thanh-tung", "website-lumera-living"],
  [
    "thiet-ke-website-bat-dong-san-song-quan-land",
    "website-auriva-land",
  ],
  ["website-dich-vu-cho-thue-xe-bontravel", "website-rovena-mobility"],
  ["du-an-website-chu-quan-ca-phe", "website-brewvia"],
  ["don-vi-thiet-ke-thi-cong-xay-dung-mcs", "website-arcvera-construction"],
  ["website-dava-edu", "website-edunora"],
  ["website-noi-that-van-quyet", "website-virela-interior"],
  ["website-bao-vy-pottery", "website-ceranova"],
  ["website-bontravel", "website-rovena-travel"],
  ["website-zappa", "website-zenovia-retail"],
  ["website-destiny-nail-bar", "website-veloura-nails"],
] as const;

const contentRedirects = [
  [
    "gioi-thieu-ai-chatbot-tai-homenest-viet-nam",
    "gioi-thieu-ai-chatbot-tai-winterfrost-viet-nam",
  ],
  [
    "mot-ngay-lam-viec-cua-mot-backend-engineer-tai-homenest",
    "mot-ngay-lam-viec-cua-mot-backend-engineer-tai-winterfrost",
  ],
  [
    "cong-viec-cua-tester-tai-homenest-viet-nam-se-lam-nhung-gi",
    "cong-viec-cua-tester-tai-winterfrost-viet-nam-se-lam-nhung-gi",
  ],
  [
    "mot-ngay-lam-viec-cua-ba-tai-homenest-viet-nam",
    "mot-ngay-lam-viec-cua-ba-tai-winterfrost-viet-nam",
  ],
  [
    "quy-trinh-thiet-ke-app-chuan-ux-ui-tai-homenest",
    "quy-trinh-thiet-ke-app-chuan-ux-ui-tai-winterfrost",
  ],
  [
    "java-developer-tai-homenest-software-lam-gi-goc-nhin-tu-ben-trong",
    "java-developer-tai-winterfrost-software-lam-gi-goc-nhin-tu-ben-trong",
  ],
] as const;

const localImageVersionQueries = [
  "?v=wf-20260726",
  "?v=wf-gallery-pro-20260726",
  "?v=wf-grevia-pro-20260726",
  "?v=wf-orb-20260727",
  "?v=wf-projects-pro-20260726",
  "?v=wf-team-31-20260727",
] as const;

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    localPatterns: [
      {
        pathname: "/images/**",
        search: "",
      },
      ...localImageVersionQueries.map((search) => ({
        pathname: "/images/**",
        search,
      })),
    ],
  },
  turbopack: {
    root: process.cwd(),
  },
  async redirects() {
    return [
      { source: "/contact", destination: "/lien-he", permanent: true },
      ...projectRedirects.map(([oldSlug, newSlug]) => ({
        source: `/case-studies/${oldSlug}`,
        destination: `/case-studies/${newSlug}`,
        permanent: true,
      })),
      ...contentRedirects.flatMap(([oldSlug, newSlug]) => [
        {
          source: `/${oldSlug}`,
          destination: `/${newSlug}`,
          permanent: true,
        },
        {
          source: `/wiki/${oldSlug}`,
          destination: `/wiki/${newSlug}`,
          permanent: true,
        },
      ]),
    ];
  },
};

export default withNextIntl(nextConfig);
