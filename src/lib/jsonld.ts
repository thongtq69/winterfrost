import { siteConfig } from '../config/site.config';

export const organizationJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteConfig.brand.name,
  url: `https://${siteConfig.brand.domain}`,
  email: siteConfig.contact.email,
  telephone: siteConfig.contact.phoneTel,
  address: {
    '@type': 'PostalAddress',
    streetAddress: siteConfig.contact.address,
    addressCountry: 'VN',
  },
  sameAs: [
    siteConfig.links.facebook,
    siteConfig.links.tiktok,
    siteConfig.links.github,
    siteConfig.links.linkedin,
    siteConfig.links.youtube,
    siteConfig.links.instagram,
    siteConfig.links.zalo,
  ],
  logo: siteConfig.assets.logoPath,
});
