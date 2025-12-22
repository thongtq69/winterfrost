import type { MetadataRoute } from 'next';
import { siteConfig } from '../src/config/site.config';

const baseUrl = `https://${siteConfig.brand.domain}`;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api', '/admin', '/_next'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
