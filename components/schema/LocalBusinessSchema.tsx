import Script from 'next/script';
import { siteConfig } from '../../site.config';

const baseUrl = `https://${siteConfig.brand.domain}`;

export function LocalBusinessSchema() {
  const data = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'ProfessionalService'],
    name: siteConfig.brand.name,
    url: baseUrl,
    image: `${baseUrl}${siteConfig.assets.logoPath}`,
    telephone: siteConfig.contact.phoneTel,
    email: siteConfig.contact.email,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.contact.address,
      addressLocality: 'TP.HCM',
      addressCountry: 'VN',
      postalCode: '700000',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 10.8471,
      longitude: 106.8358,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    sameAs: [
      siteConfig.links.facebook,
      siteConfig.links.linkedin,
      siteConfig.links.tiktok,
      siteConfig.links.zalo,
      siteConfig.links.youtube,
      siteConfig.links.instagram,
    ].filter(Boolean),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '69',
    },
  };

  return <Script id="schema-local-business" type="application/ld+json">{JSON.stringify(data)}</Script>;
}

export default LocalBusinessSchema;
