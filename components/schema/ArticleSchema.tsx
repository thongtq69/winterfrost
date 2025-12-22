import Script from 'next/script';
import { siteConfig } from '../../site.config';
import type { ArticleSchemaProps } from '../../types/schema';

const baseUrl = `https://${siteConfig.brand.domain}`;

export function ArticleSchema({ title, description, url, datePublished, dateModified, authorName, image }: ArticleSchemaProps) {
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    mainEntityOfPage: url,
    author: {
      '@type': 'Organization',
      name: siteConfig.brand.name,
      url: baseUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.brand.name,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}${siteConfig.assets.logoPath}`,
      },
    },
    image: image ? `${baseUrl}${image}` : `${baseUrl}${siteConfig.assets.logoPath}`,
    datePublished,
    dateModified: dateModified ?? datePublished,
  };

  if (authorName) {
    data.author = { '@type': 'Person', name: authorName };
  }

  return <Script id={`schema-article-${title}`} type="application/ld+json">{JSON.stringify(data)}</Script>;
}

export default ArticleSchema;
