import Container from '../ui/Container';
import Accordion from '../ui/Accordion';
import type { ServiceFAQ } from '../../src/data/services';

type Props = {
  faqs: ServiceFAQ[];
};

const FAQ = ({ faqs }: Props) => (
  <section className="bg-white py-12 sm:py-14">
    <Container className="space-y-6">
      <div className="space-y-2 text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">FAQ</p>
        <h2 className="text-3xl font-extrabold text-ink sm:text-4xl">Câu hỏi thường gặp</h2>
      </div>
      <Accordion
        items={faqs.map((faq, idx) => ({
          id: `faq-${idx}`,
          question: faq.question,
          answer: faq.answer,
        }))}
      />
    </Container>
  </section>
);

export default FAQ;
