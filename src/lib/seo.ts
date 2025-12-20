import type { Metadata } from 'next';
import { siteConfig } from '../config/site.config';

export const buildBaseMetadata = (): Metadata => ({
  metadataBase: new URL(`https://${siteConfig.brand.domain}`),
  title: {
    default: `WinterFrost — ${siteConfig.brand.tagline}`,
    template: `WinterFrost — %s`,
  },
  description: siteConfig.brand.description,
  openGraph: {
    title: `WinterFrost — ${siteConfig.brand.tagline}`,
    description: siteConfig.brand.description,
    url: `https://${siteConfig.brand.domain}`,
    siteName: siteConfig.brand.name,
    images: [{ url: siteConfig.assets.ogImagePath }],
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `WinterFrost — ${siteConfig.brand.tagline}`,
    description: siteConfig.brand.description,
    images: [siteConfig.assets.ogImagePath],
  },
  icons: {
    icon: siteConfig.assets.faviconPath,
  },
});
