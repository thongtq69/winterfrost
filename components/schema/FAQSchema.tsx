import Script from 'next/script';
import type { FAQSchemaProps } from '../../types/schema';

export function FAQSchema({ faqs, id = 'schema-faq' }: FAQSchemaProps) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return <Script id={id} type="application/ld+json">{JSON.stringify(data)}</Script>;
}

export default FAQSchema;
