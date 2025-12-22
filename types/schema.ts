export type BreadcrumbItem = {
  name: string;
  url: string;
};

export type BreadcrumbListProps = {
  items: BreadcrumbItem[];
  id?: string;
};

export type FAQItem = {
  question: string;
  answer: string;
};

export type FAQSchemaProps = {
  faqs: FAQItem[];
  id?: string;
};

export type ServiceSchemaProps = {
  name: string;
  description: string;
  url: string;
  priceRange?: string;
  serviceType?: string;
};

export type ReviewSchemaProps = {
  name: string;
  ratingValue: number;
  reviewBody: string;
  author: string;
  itemReviewed: string;
  id?: string;
};

export type ArticleSchemaProps = {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
  image?: string;
};
