import Script from 'next/script';
import { siteConfig } from '../../site.config';
import type { ServiceSchemaProps } from '../../types/schema';

const baseUrl = `https://${siteConfig.brand.domain}`;

export function ServiceSchema({ name, description, url, priceRange, serviceType }: ServiceSchemaProps) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    provider: {
      '@type': 'Organization',
      name: siteConfig.brand.name,
      url: baseUrl,
      telephone: siteConfig.contact.phoneTel,
    },
    serviceType: serviceType ?? name,
    areaServed: 'Vietnam',
    offers: {
      '@type': 'Offer',
      url,
      priceCurrency: 'VND',
      price: priceRange,
      availability: 'https://schema.org/InStock',
    },
  };

  return <Script id={`schema-service-${name}`} type="application/ld+json">{JSON.stringify(data)}</Script>;
}

export default ServiceSchema;
