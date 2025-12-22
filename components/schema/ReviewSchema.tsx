import Script from 'next/script';
import type { ReviewSchemaProps } from '../../types/schema';

export function ReviewSchema({ name, ratingValue, reviewBody, author, itemReviewed, id = 'schema-review' }: ReviewSchemaProps) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Review',
    name,
    reviewBody,
    itemReviewed: {
      '@type': 'Service',
      name: itemReviewed,
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: ratingValue.toString(),
      bestRating: '5',
    },
    author: {
      '@type': 'Person',
      name: author,
    },
  };

  return <Script id={id} type="application/ld+json">{JSON.stringify(data)}</Script>;
}

export default ReviewSchema;
