"use client";

import { useEffect, useRef } from "react";

const STYLESHEETS = [
  "https://winterfrost.tech/_next/static/chunks/419f318b2056e9cc.css",
  "https://winterfrost.tech/_next/static/chunks/f6a48a8a59bef51b.css",
  "https://winterfrost.tech/_next/static/chunks/591312935a8a436b.css",
  "https://winterfrost.tech/_next/static/chunks/6732512e87e8f355.css",
  "https://winterfrost.tech/_next/static/chunks/356b7c84cad65aa0.css",
];

export function LegacyWikiRawPage({ html }: { html: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const pageHtml = html
    .replaceAll('src="/assets/', 'src="https://winterfrost.tech/assets/')
    .replaceAll('srcset="/assets/', 'srcset="https://winterfrost.tech/assets/');

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const tocWrapper = root.querySelector<HTMLElement>('[class*="WikiDetail-module__77WJ8W__tocWrapper"]');
    const tocToggle = tocWrapper?.querySelector<HTMLButtonElement>('[class*="tocToggle"]');
    const tocPanel = tocWrapper?.querySelector<HTMLElement>('[class*="tocPanel"]');
    const desktop = window.matchMedia("(min-width: 1024px)").matches;
    if (desktop && tocWrapper) {
      tocWrapper.classList.add("WikiDetail-module__77WJ8W__tocAlwaysOpen");
      tocToggle?.remove();
      tocPanel?.setAttribute("aria-hidden", "false");
    }
    const onToggle = () => {
      const expanded = tocToggle?.getAttribute("aria-expanded") !== "true";
      tocToggle?.setAttribute("aria-expanded", String(expanded));
      tocPanel?.setAttribute("aria-hidden", String(!expanded));
    };
    if (!desktop) tocToggle?.addEventListener("click", onToggle);

    const tableButtons = [...root.querySelectorAll<HTMLButtonElement>('[class*="tocList"] button')];
    const headings = [...root.querySelectorAll<HTMLElement>(
      '[class="WikiDetail-module__77WJ8W__content"] h2, [class="WikiDetail-module__77WJ8W__content"] h3',
    )];
    const disposers = tableButtons.map((button) => {
      const onClick = () => {
        const target = headings.find((heading) => heading.textContent?.trim() === button.textContent?.trim());
        target?.scrollIntoView({ behavior: "smooth", block: "start" });
      };
      button.addEventListener("click", onClick);
      return () => button.removeEventListener("click", onClick);
    });

    return () => {
      tocToggle?.removeEventListener("click", onToggle);
      disposers.forEach((dispose) => dispose());
    };
  }, []);

  return (
    <>
      {STYLESHEETS.map((href) => <link key={href} rel="stylesheet" href={href} />)}
      <style>{`
        select.WikiDetailSidebar-module__3oUlga__select { height: 52.5px; }
        .WikiDetail-module__77WJ8W__content hr { height: 2px; }
        .FooterCTA-module__3cCD7a__labelText { line-height: inherit; }

        /* Some older WordPress records contain the wrapper markup from an
           exported ChatGPT response. On the original site those utility class
           names are inert; neutralize this app's Tailwind matches so the
           article keeps the original 800px content measure. */
        .WikiDetail-module__77WJ8W__content > [class*="pb-25"],
        .WikiDetail-module__77WJ8W__content [class*="text-token-text-primary"],
        .WikiDetail-module__77WJ8W__content [class*="thread-content-margin"],
        .WikiDetail-module__77WJ8W__content [class*="group/turn-messages"],
        .WikiDetail-module__77WJ8W__content [class~="grow"],
        .WikiDetail-module__77WJ8W__content [class~="text-message"],
        .WikiDetail-module__77WJ8W__content [class*="empty:hidden"],
        .WikiDetail-module__77WJ8W__content [class*="min-h-[46px]"],
        .WikiDetail-module__77WJ8W__content [class~="markdown"] {
          display: block;
          position: static;
          width: auto;
          max-width: none;
          height: auto;
          min-height: 0;
          margin: 0;
          padding: 0;
          gap: normal;
          flex: none;
          transform: none;
          font-size: 16px;
          line-height: normal;
        }
      `}</style>
      <div ref={rootRef} style={{ display: "contents", lineHeight: "normal" }} dangerouslySetInnerHTML={{ __html: pageHtml }} />
    </>
  );
}
