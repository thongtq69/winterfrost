import data from "./site-data.json";

export type NavItem = { label: string; href: string };

export type ContentPage = {
  slug: string;
  title: string;
  metaTitle?: string;
  metaDescription?: string;
  image?: string;
  ogImage?: string;
  url?: string;
  contentText?: string;
  contentHtml: string;
  category?: string;
  author?: string;
  year?: string;
  service?: string;
  desc?: string;
};

export type SiteInfo = {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  company: string;
  parent: string;
  hotline: string;
  hotlineRaw: string;
  phones: string[];
  phonesDisplay: string[];
  email: string;
  address: string;
  social: Record<string, string>;
  relatedSites: Record<string, string>;
  copyright: string;
  url: string;
  title: string;
  domain: string;
};

export type Job = {
  slug: string;
  title: string;
  category: string;
  salary: string;
  deadline: string;
  location: string;
  type: string;
};

type DataShape = {
  site: SiteInfo;
  mainNav: NavItem[];
  servicesNav: NavItem[];
  services: ContentPage[];
  industries: ContentPage[];
  caseStudies: ContentPage[];
  wiki: ContentPage[];
  careers: {
    intro: { title: string; description: string };
    banner: { title: string; subtitle: string };
    jobs: Job[];
  };
  about: { title: string; metaDescription?: string; image?: string; contentText?: string; contentHtml: string };
  aboutPageDetail: {
    hero: {
      title: string;
      description: string;
      bgImage: string;
      phoneImages: string[];
      meshGraphic: string;
      ctaPrimary: { label: string; href: string };
      ctaSecondary: { label: string; href: string };
    };
    whoWeAre: {
      label: string;
      headline: string;
      subhead: string;
      quote: string;
      quoteAuthor: string;
      quoteRole: string;
      quoteImage: string;
    };
    buildingScalable: {
      label: string;
      headline: [string, string, string];
      tabs: Array<{ title: string; desc: string; stats: Array<{ val: string; label: string }> }>;
    };
    counterSection: {
      label: string;
      headline: [string, string, string];
      items: Array<{ value: string; desc: string }>;
    };
  };
  contact: { title: string; metaDescription?: string; contentText?: string; contentHtml: string };
  industriesPage: {
    hero: {
      label: string; headlineMain: string; headlineSub: string;
      paragraphs: string[]; ctaLabel: string; ctaHref: string;
      image: string; imageAlt: string;
    };
    about: {
      label: string; headlinePre: string; headlineScript: string; headlinePost: string;
      paragraphs: string[]; image: string; imageAlt: string;
    };
    counters: {
      label: string;
      items: Array<{ index: string; value: string; suffix: string; desc: string }>;
    };
    grid: { label: string; headlineLight: string; headlineDark: string; ctaLabel: string; ctaHref: string };
    solutions: {
      headlineLight: string; headlineDark: string; description: string;
      items: Array<{ title: string; desc: string; more: string }>;
      ctaLabel: string; ctaHref: string;
    };
    why: {
      label: string; headline: string;
      items: Array<{ n: string; title: string; desc: string }>;
    };
    ctaInline: { label: string; headline: string; description: string; ctaLabel: string; ctaHref: string };
    cases: { headline: string; ctaLabel: string; ctaHref: string; items: string[] };
    process: {
      headline: string;
      items: Array<{ n: string; tag: string; title: string; desc: string }>;
      ctaLabel: string; ctaHref: string;
    };
    tech: {
      headlineLight: string; headlineDark: string;
      tabs: string[];
      items: Array<{ name: string; tab: string; icon: string }>;
    };
    wikiPick: {
      label: string; ctaLabel: string; ctaHref: string;
      items: Array<{
        slug: string; title: string; image: string; category: string;
        categoryBg: string; categoryColor: string;
        author: string; date: string; views: number; desc?: string;
      }>;
    };
    faq: {
      label: string; headline: [string, string, string]; intro: string;
      items: Array<{ q: string; a: string }>;
    };
  };
  home: Record<string, unknown> & {
    hero: {
      title: string;
      description: string;
      ctaPrimary: { label: string; href: string };
      ctaSecondary: { label: string; href: string };
      imageMain: string;
      imageColumn: string;
      logo: string;
      video: string;
      detailCtaPrimary: { label: string; href: string };
      detailCtaSecondary: { label: string; href: string };
      backLabel: string;
      prevLabel: string;
      nextLabel: string;
      pillars: Array<{ key: string; label: string; title: string; desc: string }>;
    };
    about: { label: string; headline: string; paragraphs: string[]; image: string };
    companyOverview: {
      label: string;
      headline: [string, string, string];
      founder: { name: string; role: string; quote: string; image: string };
      vision: { title: string; text: string; ctaLabel: string; ctaHref: string };
      values: { title: string; items: string[] };
      copyright: string;
      stats: Array<{
        label: string;
        value: string;
        suffix?: string;
        desc: string;
        highlight?: boolean;
        avatars?: string[];
        avatarBadgeText?: string;
        starsImage?: string;
        starsLabel?: string;
      }>;
    };
    servicesSection: {
      label: string;
      headline: [string, string, string];
      ctaLabel: string;
      ctaHref: string;
      tabs: Array<{ title: string; items: Array<{ num: string; title: string; desc: string; href: string; hoverImg?: string }> }>;
    };
    industries: { label: string; headline: string; items: Array<{ title: string; href: string }> };
    ctaBanner: { label: string; headline: string; description: string; ctaLabel: string; ctaHref: string };
    caseStudiesSection: {
      label: string;
      headline: [string, string, string];
      headlineLeftPrefix: string;
      headlineLeftScript: string;
      headlineRight: string;
      headlineMobile: [string, string, string];
      ctaLabel: string;
      ctaHref: string;
      items: Array<{ slug: string; title: string; image: string; desc: string }>;
    };
    whyChooseUs: {
      label: string;
      headline: [string, string, string];
      leftCard: {
        title: string;
        intro: string;
        features: string[];
        ctaLabel: string;
        ctaHref: string;
        image: string;
      };
      cardItem1: {
        title: string;
        desc: string;
        innerCardLabel: string;
        chipImage: string;
        lightningImage: string;
        bgImage: string;
      };
      cardItem2: {
        title: string;
        starIcon: string;
        score: string;
        scoreTotal: string;
        avatars: string[];
        centerLogo: string;
      };
      cardItem3: {
        title: string;
        desc: string;
        icons: Array<{ src: string; alt: string; dark: boolean }>;
      };
      cardItem5: {
        title: string;
        desc: string;
        userMessage: string;
        userAvatar: string;
        systemMessage: string;
        systemLogo: string;
        decoration: string;
      };
      cardItem4: {
        title: string;
        scriptText: string;
        bgImage: string;
      };
    };
    testimonials: {
      label: string;
      headline: [string, string];
      avatar: string;
      items: Array<{ quote: string; author: string; role: string; avatar?: string }>;
    };
    techStack: { label: string; headline: [string, string, string]; tabs: string[]; items: Array<{ name: string; icon: string; tab: string }> };
    faq: {
      label: string;
      headline: [string, string, string];
      items: Array<{ q: string; a: string }>;
    };
    wikiSection: {
      label: string;
      ctaLabel: string;
      ctaHref: string;
      items: Array<{
        slug: string;
        title: string;
        image: string;
        category: string;
        categoryBg: string;
        categoryColor: string;
        author: string;
        date: string;
        views: number;
      }>;
    };
    partnersMarquee: {
      avatars: string[];
      ratingLabel: string;
      logos: Array<{ src: string; alt: string }>;
    };
  };
};

const d = data as unknown as DataShape;

export const site = d.site;
export const mainNav = d.mainNav;
export const servicesNav = d.servicesNav;
export const services = d.services;
export const industries = d.industries;
export const caseStudies = d.caseStudies;
export const wiki = d.wiki;
export const aboutPage = d.about;
export const aboutDetail = d.aboutPageDetail;
export const careers = d.careers;
export const contactPage = d.contact;
export const industriesPage = d.industriesPage;
export const home = d.home;
