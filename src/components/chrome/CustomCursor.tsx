"use client";

import { useEffect, useRef, useState } from "react";
import s from "./CustomCursor.module.css";

const HOVER_SELECTOR = 'a, button, [role="button"], input, textarea, select, [data-cursor-hover]';

export function CustomCursor() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [text, setText] = useState<string | null>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (wrapRef.current) {
        wrapRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      const cursorTextEl = t.closest("[data-cursor-text]") as HTMLElement | null;
      if (cursorTextEl) {
        setText(cursorTextEl.dataset.cursorText || null);
        setHovered(false);
        return;
      }
      const interactive = t.closest(HOVER_SELECTOR);
      setText(null);
      setHovered(!!interactive);
    };
    const onOut = (e: MouseEvent) => {
      // when leaving an interactive element, reset
      const related = e.relatedTarget as HTMLElement | null;
      if (!related || !related.closest(HOVER_SELECTOR + ", [data-cursor-text]")) {
        setText(null);
        setHovered(false);
      }
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mouseout", onOut);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
    };
  }, []);

  const cls = [s.cursor, hovered ? s.hovered : "", text ? s.withText : ""].filter(Boolean).join(" ");

  return (
    <div ref={wrapRef} className={s.wrapper} aria-hidden>
      <div className={cls}>
        {text ? <span className={s.cursorText}>{text}</span> : null}
      </div>
    </div>
  );
}
