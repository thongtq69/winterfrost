import Script from 'next/script';
import { siteConfig } from '../../site.config';

const baseUrl = `https://${siteConfig.brand.domain}`;

export function OrganizationSchema() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.brand.name,
    url: baseUrl,
    logo: `${baseUrl}${siteConfig.assets.logoPath}`,
    email: siteConfig.contact.email,
    telephone: siteConfig.contact.phoneTel,
    sameAs: [
      siteConfig.links.facebook,
      siteConfig.links.linkedin,
      siteConfig.links.tiktok,
      siteConfig.links.zalo,
      siteConfig.links.youtube,
      siteConfig.links.instagram,
      siteConfig.links.github,
    ].filter(Boolean),
  };

  return <Script id="schema-organization" type="application/ld+json">{JSON.stringify(data)}</Script>;
}

export default OrganizationSchema;
