"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import type { JSX } from "react";
import styles from "./Reveal.module.css";

type Props = {
  children: ReactNode;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  delay?: number;
  distance?: number;
  direction?: "up" | "left" | "right";
  amount?: number;
  rootMargin?: string;
  style?: CSSProperties;
};

export function Reveal({
  children,
  as = "div",
  className,
  delay = 0,
  distance,
  direction = "up",
  amount = 0.18,
  rootMargin = "0px 0px -10% 0px",
  style,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || shown) return;
    if (typeof IntersectionObserver === "undefined") {
      const frame = window.requestAnimationFrame(() => setShown(true));
      return () => window.cancelAnimationFrame(frame);
    }
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            obs.disconnect();
            break;
          }
        }
      },
      { threshold: amount, rootMargin },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [shown, amount, rootMargin]);

  const Tag = as as "div";
  const dirClass =
    direction === "left" ? styles.fromLeft : direction === "right" ? styles.fromRight : styles.fromBelow;

  const mergedStyle = {
    ...(style ?? {}),
    ...(delay ? { transitionDelay: `${delay}ms` } : {}),
    ...(distance === undefined ? {} : { "--reveal-distance": `${distance}px` }),
  } as CSSProperties;

  return (
    <Tag
      ref={ref as never}
      className={`${styles.reveal} ${dirClass} ${shown ? styles.shown : ""} ${className ?? ""}`}
      style={Object.keys(mergedStyle).length ? mergedStyle : undefined}
    >
      {children}
    </Tag>
  );
}
