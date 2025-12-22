import Script from 'next/script';
import type { BreadcrumbListProps } from '../../types/schema';

export function BreadcrumbSchema({ items, id = 'schema-breadcrumb' }: BreadcrumbListProps) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return <Script id={id} type="application/ld+json">{JSON.stringify(data)}</Script>;
}

export default BreadcrumbSchema;
