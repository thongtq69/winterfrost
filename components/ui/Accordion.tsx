'use client';

import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import clsx from 'clsx';

export type AccordionItem = {
  id: string;
  question: string;
  answer: string;
};

type AccordionProps = {
  items: AccordionItem[];
};

const Accordion = ({ items }: AccordionProps) => {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div className="divide-y divide-gray-100 rounded-2xl border border-gray-100 bg-white/90 shadow-card">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id}>
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={`accordion-panel-${item.id}`}
              id={`accordion-trigger-${item.id}`}
              onClick={() => setOpenId(isOpen ? null : item.id)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500"
            >
              <span className="text-base font-semibold text-ink">{item.question}</span>
              <ChevronDown
                size={18}
                className={clsx('text-gray-500 transition-transform duration-200', isOpen && 'rotate-180 text-brand-600')}
              />
            </button>
            <div
              id={`accordion-panel-${item.id}`}
              role="region"
              aria-labelledby={`accordion-trigger-${item.id}`}
              className={clsx('overflow-hidden transition-all duration-200', isOpen ? 'max-h-64 pb-4 px-5' : 'max-h-0 px-5')}
            >
              <p className="text-sm text-gray-600">{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
