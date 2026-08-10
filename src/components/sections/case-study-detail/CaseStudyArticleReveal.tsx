"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import styles from "./CaseStudyArticleReveal.module.css";

type Props = {
  className: string;
  html: string;
  style?: CSSProperties;
};

export function CaseStudyArticleReveal({ className, html, style }: Props) {
  const articleRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const article = articleRef.current;
    if (!article || visible) return;

    if (typeof IntersectionObserver === "undefined") {
      const frame = window.requestAnimationFrame(() => setVisible(true));
      return () => window.cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "-100px", threshold: 0 },
    );

    observer.observe(article);
    return () => observer.disconnect();
  }, [visible]);

  return (
    <article
      ref={articleRef}
      className={`${className} ${styles.reveal} ${visible ? styles.visible : ""}`}
      style={style}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
