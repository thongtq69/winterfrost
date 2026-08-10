import type { CSSProperties } from "react";

type PathStyle = CSSProperties & { "--path-length": string };

const pathStyle = (length: string): PathStyle => ({
  "--path-length": length,
});

export function AnimatedNetworkIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden>
      <path
        d="M 3.949 1.974 C 3.949 3.065 3.065 3.949 1.974 3.949 C 0.884 3.949 0 3.065 0 1.974 C 0 0.884 0.884 0 1.974 0 C 3.065 0 3.949 0.884 3.949 1.974 Z"
        fill="transparent"
        stroke="currentColor"
        strokeWidth="0.99"
        transform="translate(1.974 1.316)"
        style={pathStyle("12.4")}
      />
      <path
        d="M 3.949 1.974 C 3.949 3.065 3.065 3.949 1.974 3.949 C 0.884 3.949 0 3.065 0 1.974 C 0 0.884 0.884 0 1.974 0 C 3.065 0 3.949 0.884 3.949 1.974 Z"
        fill="transparent"
        stroke="currentColor"
        strokeWidth="0.99"
        transform="translate(9.873 7.239)"
        style={pathStyle("12.4")}
      />
      <path
        d="M 3.949 1.974 C 3.949 3.065 3.065 3.949 1.974 3.949 C 0.884 3.949 0 3.065 0 1.974 C 0 0.884 0.884 0 1.974 0 C 3.065 0 3.949 0.884 3.949 1.974 Z"
        fill="transparent"
        stroke="currentColor"
        strokeWidth="0.99"
        transform="translate(1.974 10.53)"
        style={pathStyle("12.4")}
      />
      <path
        d="M 0 0 L 0 5.265"
        fill="transparent"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="0.99"
        transform="translate(3.95 5.264)"
        style={pathStyle("5.26")}
      />
      <path
        d="M 5.923 3.949 L 3.949 3.949 C 1.768 3.949 0 2.181 0 0"
        fill="transparent"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="0.99"
        transform="translate(3.95 5.264)"
        style={pathStyle("8.17")}
      />
    </svg>
  );
}
