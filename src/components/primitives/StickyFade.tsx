"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  direction?: "up" | "left" | "right";
  stickyTop?: number;
  startOffset?: number;
  travel?: number;
};

export function StickyFade({
  children,
  className,
  style,
  direction = "up",
  stickyTop = 120,
  startOffset = 1.0,
  travel = 50,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const startY = vh * startOffset;
      const range = startY - stickyTop;
      if (range <= 0) {
        setProgress(1);
        return;
      }
      const p = Math.max(0, Math.min(1, (startY - r.top) / range));
      setProgress(p);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [stickyTop, startOffset]);

  const tx = direction === "left" ? (1 - progress) * -travel : direction === "right" ? (1 - progress) * travel : 0;
  const ty = direction === "up" ? (1 - progress) * travel : 0;
  const transform = progress >= 1 ? "none" : `translate(${tx}px, ${ty}px)`;

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: progress,
        transform,
      }}
    >
      {children}
    </div>
  );
}
