"use client";

import { useState } from "react";
import { useLocalizedHome } from "@/i18n/content";
import { Reveal } from "@/components/primitives/Reveal";
import s from "./FAQAccordion.module.css";

type FAQItem = { q: string; a: string };
type FAQProps = {
  home?: boolean;
  label?: string;
  headline?: [string, string, string];
  intro?: string;
  items?: FAQItem[];
};

const HOME_FAQ_LINK_TEXT = "thiết bị thông minh IoT, cơ sở dữ liệu phi tập trung Blockchain";

function AnswerContent({ question, answer }: { question: string; answer: string }) {
  if (question !== "Winterfrost cung cấp những dịch vụ cốt lõi nào?" || !answer.includes(HOME_FAQ_LINK_TEXT)) {
    return answer;
  }

  const [before, after] = answer.split(HOME_FAQ_LINK_TEXT);
  return (
    <>
      {before}
      <a href="https://winterfrost.tech/blockchain-va-iot-toan-bo-kien-thuc-quan-trong-danh-cho-tech-leaders" target="_blank" rel="noopener noreferrer">
        {HOME_FAQ_LINK_TEXT}
      </a>
      {after}
    </>
  );
}

function StarLabel({ children }: { children: string }) {
  return (
    <div className={s.label}>
      <span aria-label="Star Icon" className={s.labelIcon} role="img">
        <svg overflow="visible" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
          <path d="m1 32 25 6 6 25 6-25 25-6-25-6-6-25-6 25z" strokeLinejoin="round" />
        </svg>
      </span>
      <p className={s.labelText}>{children}</p>
    </div>
  );
}

export function FAQAccordion({ label, headline, intro, items }: FAQProps = {}) {
  const home = useLocalizedHome();
  const faq = home.faq;
  const useLabel = label ?? faq.label;
  const useHeadline = headline ?? faq.headline;
  const useItems = items ?? faq.items;
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className={s.faqSection} data-visual-id="home-faq">
      <div className={s.bgWrapper} aria-hidden="true">
        <div className={`${s.bgRadial} ${s.bgRadial1}`} />
        <div className={`${s.bgRadial} ${s.bgRadial2}`} />
        <div className={`${s.bgRadial} ${s.bgRadial3}`} />
      </div>

      <div className={s.container}>
        <div className={s.wrapper}>
          <div className={s.leftCol}>
            <StarLabel>{useLabel}</StarLabel>
            <div className={s.headingWrapper}>
              <h2 className={s.faqHeading}>
                <span className={s.normalText}>{useHeadline[0]}</span>{" "}
                <span className={s.highlightText}>{useHeadline[1]}</span>{" "}
                <span className={`${s.normalText} ${s.nextLine}`}>{useHeadline[2]}</span>
              </h2>
            </div>
            {intro ? <p className={s.faqDesc}>{intro}</p> : null}
          </div>

          <div className={s.rightCol}>
            {useItems.map((item, index) => {
              const isOpen = open === index;
              return (
                <Reveal direction="up" distance={20} delay={index * 70} amount={0.01} rootMargin="0px" key={item.q}>
                  <div
                    className={`${s.accordionItem} ${isOpen ? s.isOpen : ""}`}
                    data-visual-id={`home-faq-item-${index + 1}`}
                  >
                  <button
                    aria-expanded={isOpen}
                    className={s.accordionHeader}
                    onClick={() => setOpen(isOpen ? null : index)}
                    type="button"
                  >
                    <h3 className={s.question}>{item.q}</h3>
                    <span className={s.iconWrapper} aria-hidden="true">
                      <span className={`${s.iconLine} ${s.lineHorizontal}`} />
                      <span className={`${s.iconLine} ${s.lineVertical}`} />
                    </span>
                  </button>
                  <div className={s.answerMotion}>
                    <div className={s.answerWrapper}>
                      <p className={s.answer}><AnswerContent question={item.q} answer={item.a} /></p>
                    </div>
                  </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
