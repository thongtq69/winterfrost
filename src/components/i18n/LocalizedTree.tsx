"use client";

import {
  Children,
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";
import { useAutoText } from "@/i18n/auto-text-client";

function localizeNode(
  node: ReactNode,
  translate: (source: string) => string,
): ReactNode {
  if (typeof node === "string") {
    const normalized = node.replace(/\s+/g, " ").trim();
    if (!normalized) return node;
    const leading = /^\s/.test(node) ? " " : "";
    const trailing = /\s$/.test(node) ? " " : "";
    return `${leading}${translate(normalized)}${trailing}`;
  }

  if (Array.isArray(node)) {
    return node.map((child) => localizeNode(child, translate));
  }

  if (!isValidElement(node)) return node;
  const element = node as ReactElement<{ children?: ReactNode }>;
  if (element.props.children === undefined) return element;
  return cloneElement(
    element,
    undefined,
    ...Children.toArray(element.props.children).map((child) =>
      localizeNode(child, translate),
    ),
  );
}

export function LocalizedTree({ children }: { children: ReactNode }) {
  const translate = useAutoText();
  return localizeNode(children, translate);
}
