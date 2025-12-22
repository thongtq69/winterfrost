import type { MetadataRoute } from 'next';
import { siteConfig } from '../src/config/site.config';
import { serviceDetails } from '../data/services';
import { projects } from '../data/projects';
import { posts } from '../data/posts';
import { courses } from '../data/courses';

const baseUrl = `https://${siteConfig.brand.domain}`;
// Build-time lastModified to avoid per-request "new Date()"
const lastModified = new Date('2025-12-21');

type Entry = MetadataRoute.Sitemap[number];

const staticRoutes: Entry[] = [
  '/',
  '/dich-vu',
  '/du-an',
  '/kien-thuc',
  '/lien-he',
  '/chinh-sach-bao-mat',
  '/dieu-khoan',
  '/quy-trinh-lam-viec',
  '/tai-nguyen',
  '/tiktok',
].map((path) => ({
  url: `${baseUrl}${path}`,
  lastModified,
  changeFrequency: 'weekly',
  priority: 0.6,
}));

export default function sitemap(): MetadataRoute.Sitemap {
  const services = serviceDetails.map<Entry>((svc) => ({
    url: `${baseUrl}/dich-vu/${svc.slug}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  const projectEntries = projects.map<Entry>((project) => ({
    url: `${baseUrl}/du-an/${project.slug}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const blogEntries = posts.map<Entry>((post) => ({
    url: `${baseUrl}/kien-thuc/${post.slug.join('/')}`,
    lastModified,
    changeFrequency: 'daily',
    priority: 0.7,
  }));

  const courseEntries = courses.map<Entry>((course) => ({
    url: `${baseUrl}/khoa-hoc/${course.slug}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const allEntries = [...staticRoutes, ...services, ...projectEntries, ...blogEntries, ...courseEntries];

  // Dedupe by URL to avoid accidental duplicates when static + dynamic overlap.
  const deduped = Array.from(
    allEntries.reduce<Map<string, Entry>>((map, entry) => {
      if (!map.has(entry.url)) {
        map.set(entry.url, entry);
      }
      return map;
    }, new Map()).values(),
  );

  return deduped;
}
