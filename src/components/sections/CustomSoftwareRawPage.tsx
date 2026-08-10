"use client";

import { useEffect, useMemo, useRef } from "react";
import { WikiRelated } from "@/components/sections/WikiRelated";
import { useAutoText } from "@/i18n/auto-text-client";
import { localizeHtmlText } from "@/i18n/auto-text";

const STYLESHEETS = [
  "https://winterfrost.tech/_next/static/chunks/f6a48a8a59bef51b.css",
  "https://winterfrost.tech/_next/static/chunks/ca186e3335bcb97a.css",
  "https://winterfrost.tech/_next/static/chunks/539c1a0d4f1b320b.css",
];

const FILTER_RANGES: Record<string, [number, number]> = {
  "Giao diện": [0, 6],
  "Hệ thống": [6, 10],
  "Cơ sở dữ liệu": [10, 14],
  "Vận hành": [14, 22],
  "Quản lý": [22, 23],
};

const FAQ_ANSWERS: Record<string, string> = {
  "What is the difference between custom software development and off-the-shelf software?": "Off-the-shelf software is built for broad market use and requires your business processes to conform to the vendor's product structure. Custom software development services produce a system built around your exact workflows, data models, and business rules, giving you full control, no redundant features, and no forced upgrades on a vendor's timeline.",
  "How do I know if I need custom software or an off-the-shelf solution?": "Off-the-shelf software works well when your processes are standard and you are willing to adapt your workflows to the vendor's product structure. Custom software development is the right choice when your business logic is proprietary, when you need deep integrations with existing systems, when licensing costs at scale exceed development investment, or when off-the-shelf limitations are directly constraining your operational efficiency. We offer a free discovery session to help you evaluate both paths objectively before committing to either.",
  "How long does custom software development take?": "A focused MVP custom software development typically takes 8–12 weeks. A mid-scale system with 3–5 modules and backend integrations takes 3–6 months. A full custom enterprise software platform can take 6–12 months. Timeline depends on scope, number of integrations, and approval turnaround. We provide a milestone roadmap before development begins.",
  "Can you modernize or replace our existing legacy software?": "Yes. Legacy software modernization is one of our core specializations. We audit your existing system's architecture, data structure, and integration dependencies, then design a phased migration plan that transitions your operations to a modern, cloud-native platform without business disruption. We can rebuild from scratch, re-architect modularly, or extend the existing system with a modern API layer.",
  "Do you build custom ERP and CRM systems from scratch?": "Yes. We specialize in both custom ERP development and custom CRM development, designed around your specific business processes rather than a generic module configuration. This includes custom data models, workflow rules, user roles, reporting dashboards, and integrations with your existing tools (accounting software, email platforms, payment gateways, etc.).",
  "How do you handle requirements that change during development?": "We use Agile methodology with 2-week sprints. Requirement changes are managed through a structured change request process, assessed for scope impact and timeline before being added to the backlog. This ensures your custom software development project remains on budget and on schedule while accommodating legitimate business changes.",
  "Who owns the source code after the project is complete?": "100% of the source code, database schemas, API documentation, and all associated Intellectual Property rights are legally transferred to you upon project completion and final payment. No licensing agreements, no vendor lock-in, no recurring fees for software you paid to build.",
  "Can Winterfrost integrate custom software with our existing systems?": "Yes. API and system integration is a core component of every custom software development engagement. We connect to ERP systems, CRMs, accounting platforms, payment gateways, HR systems, warehouse management systems, and custom-built internal tools, using REST, GraphQL, or direct database connectors depending on the integration requirements.",
  "What does the team structure look like for a custom software development project?": "Every custom software development engagement is staffed with a dedicated team: a Solution Architect who owns the technical design, a Project Manager who handles timeline and communication, and 2–5 engineers depending on scope and delivery pace. You have direct access to the team through daily standups, sprint demos, and a shared project management board. No account managers as middlemen, no resource sharing with other projects during your engagement.",
  "What happens after the custom software is launched?": "We offer structured post-launch support covering bug resolution, performance optimization, security patching, third-party API updates, and ongoing feature development sprints. Many clients retain Winterfrost as their long-term engineering partner — shipping new modules and enhancements on a regular sprint cadence as their business requirements evolve.",
};

const CASE_STUDY_SECTION = `<section class="CaseStudySection-module__j8_1Hq__section"><div class="CaseStudySection-module__j8_1Hq__container"><div class="CaseStudySection-module__j8_1Hq__header"><h2 class="CaseStudySection-module__j8_1Hq__heading">Các dự án tiêu biểu</h2><a class="ViewAllButton-module__yBldoW__viewAllBtn" href="/case-studies"><div class="ViewAllButton-module__yBldoW__line"></div><span class="ViewAllButton-module__yBldoW__btnText">Xem thêm</span><div class="ViewAllButton-module__yBldoW__iconWrapper"><div class="ViewAllButton-module__yBldoW__arrowIcon"></div><div class="ViewAllButton-module__yBldoW__arrowIconHover"></div></div></a></div><div class="CaseStudySection-module__j8_1Hq__grid" style="--cols:3"><div class="Projects-module__io0fUW__itemWrapper Projects-module__io0fUW__item1"><div class="Projects-module__io0fUW__cardWrapper"><a class="Projects-module__io0fUW__card" data-cursor-text="Xem dự án" href="/case-studies/app-nivora-connect"><div class="Projects-module__io0fUW__imageContainer Projects-module__io0fUW__aspect16x9"><div class="Projects-module__io0fUW__imageWrapper"><img src="/images/projects/nivora-connect/01-cover.webp?v=wf-20260726" alt="Giao diện Nivora – case study" title="Giao diện Nivora – case study" class="Projects-module__io0fUW__image" loading="lazy"></div></div><div class="Projects-module__io0fUW__cardFooter"><div class="Projects-module__io0fUW__tagList"><span class="Projects-module__io0fUW__tag">Phát triển ứng dụng theo yêu cầu</span><span class="Projects-module__io0fUW__tag">Thiết kế App</span></div><div class="Projects-module__io0fUW__info"><div class="Projects-module__io0fUW__projectClient"><h3 class="Projects-module__io0fUW__projectName">App Nivora Connect</h3></div><div class="Projects-module__io0fUW__viewProject"><div class="Projects-module__io0fUW__iconWrapper"><div class="Projects-module__io0fUW__arrowIcon"></div><div class="Projects-module__io0fUW__arrowIconHover"></div></div><span class="Projects-module__io0fUW__viewText">Xem dự án</span></div></div></div></a></div></div><div class="Projects-module__io0fUW__itemWrapper Projects-module__io0fUW__item2"><div class="Projects-module__io0fUW__cardWrapper"><a class="Projects-module__io0fUW__card" data-cursor-text="Xem dự án" href="/case-studies/app-grevia-lawn"><div class="Projects-module__io0fUW__imageContainer Projects-module__io0fUW__aspect16x9"><div class="Projects-module__io0fUW__imageWrapper"><img src="/images/projects/app-grevia-lawn/01-anh-bia-du-an.webp?v=wf-grevia-pro-20260726" alt="giao diện Grevia Lawn – case study" title="giao diện Grevia Lawn – case study" class="Projects-module__io0fUW__image" loading="lazy"></div></div><div class="Projects-module__io0fUW__cardFooter"><div class="Projects-module__io0fUW__tagList"><span class="Projects-module__io0fUW__tag">Phát triển ứng dụng theo yêu cầu</span><span class="Projects-module__io0fUW__tag">Thiết kế App</span></div><div class="Projects-module__io0fUW__info"><div class="Projects-module__io0fUW__projectClient"><h3 class="Projects-module__io0fUW__projectName">App Grevia Lawn</h3></div><div class="Projects-module__io0fUW__viewProject"><div class="Projects-module__io0fUW__iconWrapper"><div class="Projects-module__io0fUW__arrowIcon"></div><div class="Projects-module__io0fUW__arrowIconHover"></div></div><span class="Projects-module__io0fUW__viewText">Xem dự án</span></div></div></div></a></div></div><div class="Projects-module__io0fUW__itemWrapper Projects-module__io0fUW__item3"><div class="Projects-module__io0fUW__cardWrapper"><a class="Projects-module__io0fUW__card" data-cursor-text="Xem dự án" href="/case-studies/website-loomora-rugs"><div class="Projects-module__io0fUW__imageContainer Projects-module__io0fUW__aspect16x9"><div class="Projects-module__io0fUW__imageWrapper"><img src="/images/projects/website-loomora-rugs/01-anh-bia-du-an.webp?v=wf-projects-pro-20260726" alt="Giao diện trang chủ Loomora Rugs – Case study" title="Giao diện trang chủ Loomora Rugs – Case study" class="Projects-module__io0fUW__image" loading="lazy"></div></div><div class="Projects-module__io0fUW__cardFooter"><div class="Projects-module__io0fUW__tagList"><span class="Projects-module__io0fUW__tag">Bán lẻ</span><span class="Projects-module__io0fUW__tag">Thương mại điện tử</span><span class="Projects-module__io0fUW__tag">Thiết kế Website</span></div><div class="Projects-module__io0fUW__info"><div class="Projects-module__io0fUW__projectClient"><h3 class="Projects-module__io0fUW__projectName">Website Loomora Rugs</h3></div><div class="Projects-module__io0fUW__viewProject"><div class="Projects-module__io0fUW__iconWrapper"><div class="Projects-module__io0fUW__arrowIcon"></div><div class="Projects-module__io0fUW__arrowIconHover"></div></div><span class="Projects-module__io0fUW__viewText">Xem dự án</span></div></div></div></a></div></div></div></div></section>`;

export function CustomSoftwareRawPage({ html }: { html: string }) {
  const tr = useAutoText();
  const localizedFilterRanges = useMemo(
    () => Object.fromEntries(
      Object.entries(FILTER_RANGES).map(([label, range]) => [tr(label), range]),
    ),
    [tr],
  );
  const localizedFaqAnswers = useMemo(
    () => Object.fromEntries(
      Object.entries(FAQ_ANSWERS).map(([question, answer]) => [
        tr(question),
        tr(answer),
      ]),
    ),
    [tr],
  );
  const rootRef = useRef<HTMLDivElement>(null);
  const localizedCaseStudySection = localizeHtmlText(CASE_STUDY_SECTION, tr);
  const pageHtmlWithCaseStudy = html.replace(
    '<section class="PricingSection-module__st1UUW__priceSection">',
    `${localizedCaseStudySection}<section class="PricingSection-module__st1UUW__priceSection">`,
  );
  const pageHtml = pageHtmlWithCaseStudy.split(
    '<div style="width:100%;margin:0 auto;background:#fff;position:relative;z-index:1;display:flex;justify-content:center;align-items:center"><div class="RelatedPosts-module__1v887G__relatedSection">',
  )[0];

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const revealItems = [...root.querySelectorAll<HTMLElement>('[style*="opacity:0"]')]
      .filter((element) => !element.style.visibility && element.tagName !== "TSPAN");
    const revealObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const element = entry.target as HTMLElement;
          element.style.transition ||= "opacity .65s ease, transform .65s ease";
          element.style.opacity = "1";
          element.style.transform = "none";
          revealObserver.unobserve(element);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.04 },
    );
    revealItems.forEach((element) => revealObserver.observe(element));

    const timelineRows = [...root.querySelectorAll<HTMLElement>('[class*="HowWeWorkSection-module__MLzHAW__row"]')];
    const timelineObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const row = entry.target as HTMLElement;
          const number = row.querySelector<HTMLElement>('[class*="stepNumber"]');
          const fill = row.querySelector<HTMLElement>('[class*="progressFill"]');
          if (number) number.style.opacity = "1";
          if (fill) {
            fill.style.transition = "height .7s ease";
            fill.style.height = "100%";
          }
          timelineObserver.unobserve(row);
        }
      },
      { rootMargin: "0px 0px -35% 0px", threshold: 0.15 },
    );
    timelineRows.forEach((row) => timelineObserver.observe(row));

    const visibleArcText = [...root.querySelectorAll<SVGTSpanElement>('[class*="ArcText-module"] tspan')]
      .filter((node) => node.style.visibility !== "hidden");
    const arcStarts = visibleArcText.map((node) => Number(node.getAttribute("x") || 0));
    const arcLoop = arcStarts.length > 1 ? arcStarts[1] - arcStarts[0] : 1632;
    const arcStartTime = performance.now();
    let arcFrame = 0;
    const animateArc = (now: number) => {
      const offset = ((now - arcStartTime) * 0.18) % arcLoop;
      visibleArcText.forEach((node, index) => node.setAttribute("x", String(arcStarts[index] - offset)));
      arcFrame = requestAnimationFrame(animateArc);
    };
    if (visibleArcText.length) arcFrame = requestAnimationFrame(animateArc);

    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const faqHeader = target.closest<HTMLButtonElement>('[class*="FAQSection-module__tCMUWq__accordionHeader"]');
      if (faqHeader) {
        const item = faqHeader.closest<HTMLElement>('[class*="FAQSection-module__tCMUWq__accordionItem"]');
        if (!item) return;
        const wasOpen = item.classList.contains("FAQSection-module__tCMUWq__isOpen");
        const allItems = [...root.querySelectorAll<HTMLElement>('[class*="FAQSection-module__tCMUWq__accordionItem"]')];
        allItems.forEach((entry) => {
          entry.classList.remove("FAQSection-module__tCMUWq__isOpen");
          entry.querySelector<HTMLElement>('[class*="FAQSection-module__tCMUWq__lineVertical"]')
            ?.classList.remove("FAQSection-module__tCMUWq__lineVerticalOpen");
          const wrapper = entry.querySelector<HTMLElement>('[class*="FAQSection-module__tCMUWq__answerWrapper"]');
          if (wrapper) {
            wrapper.style.transition = "height .3s ease, opacity .3s ease";
            wrapper.style.height = "0px";
            wrapper.style.opacity = "0";
          }
        });
        if (!wasOpen) {
          const question = faqHeader.textContent?.replace(/\s+/g, " ").trim() || "";
          let wrapper = item.querySelector<HTMLElement>('[class*="FAQSection-module__tCMUWq__answerWrapper"]');
          if (!wrapper) {
            wrapper = document.createElement("div");
            wrapper.className = "FAQSection-module__tCMUWq__answerWrapper";
            const answer = document.createElement("p");
            answer.className = "FAQSection-module__tCMUWq__answer";
            answer.textContent = localizedFaqAnswers[question] || "";
            wrapper.append(answer);
            item.append(wrapper);
          }
          item.classList.add("FAQSection-module__tCMUWq__isOpen");
          item.querySelector<HTMLElement>('[class*="FAQSection-module__tCMUWq__lineVertical"]')
            ?.classList.add("FAQSection-module__tCMUWq__lineVerticalOpen");
          wrapper.style.transition = "height .3s ease, opacity .3s ease";
          wrapper.style.height = "0px";
          wrapper.style.opacity = "0";
          requestAnimationFrame(() => {
            if (!wrapper) return;
            wrapper.style.height = `${wrapper.scrollHeight}px`;
            wrapper.style.opacity = "1";
            window.setTimeout(() => {
              if (wrapper && item.classList.contains("FAQSection-module__tCMUWq__isOpen")) wrapper.style.height = "auto";
            }, 320);
          });
        }
        return;
      }

      const filter = target.closest<HTMLButtonElement>('[class*="TechStackSection-module__Ovc2JG__filterBtn"]');
      if (filter) {
        const label = filter.textContent?.trim() || "";
        const buttons = [...root.querySelectorAll<HTMLElement>('[class*="TechStackSection-module__Ovc2JG__filterBtn"]')];
        const cards = [...root.querySelectorAll<HTMLElement>('[class*="TechStackSection-module__Ovc2JG__card"]')]
          .filter((card) => card.querySelector('[class*="cardName"]'));
        buttons.forEach((button) => button.classList.remove("TechStackSection-module__Ovc2JG__filterBtnActive"));
        filter.classList.add("TechStackSection-module__Ovc2JG__filterBtnActive");
        const range = localizedFilterRanges[label];
        cards.forEach((card, index) => {
          card.style.display = !range || (index >= range[0] && index < range[1]) ? "" : "none";
        });
      }
    };

    root.addEventListener("click", onClick);
    return () => {
      root.removeEventListener("click", onClick);
      revealObserver.disconnect();
      timelineObserver.disconnect();
      cancelAnimationFrame(arcFrame);
    };
  }, [localizedFaqAnswers, localizedFilterRanges]);

  return (
    <>
      {STYLESHEETS.map((href) => <link key={href} rel="stylesheet" href={href} />)}
      <style>{`
        .HowWeWorkSection-module__MLzHAW__badgeText { line-height: 1.6; }
        .HowWeWorkSection-module__MLzHAW__label,
        .BenefitsSection-module__Qb1FkW__label,
        .CounterSection-module__N5XKIq__badgeText { line-height: 1.2; }
        .CaseStudySection-module__j8_1Hq__heading { line-height: 1.2; }
        .PricingCard-module__hHZpBq__price { line-height: 1.6; }
      `}</style>
      <div ref={rootRef} style={{ display: "contents", lineHeight: "normal" }} dangerouslySetInnerHTML={{ __html: pageHtml }} />
      <div style={{ width: "100%", margin: "0 auto", background: "#fff", position: "relative", zIndex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <WikiRelated />
      </div>
    </>
  );
}
