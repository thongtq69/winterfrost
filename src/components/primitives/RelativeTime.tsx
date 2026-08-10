"use client";

import { useEffect, useState } from "react";

function formatRelativeTime(publishedAt: string) {
  const elapsedMinutes = Math.max(
    0,
    Math.floor((Date.now() - new Date(publishedAt).getTime()) / 60_000),
  );

  if (elapsedMinutes < 60) {
    return `${elapsedMinutes} ${elapsedMinutes === 1 ? "min" : "mins"} ago`;
  }

  const elapsedHours = Math.max(
    0,
    Math.floor(elapsedMinutes / 60),
  );

  if (elapsedHours < 24) {
    return `${elapsedHours} ${elapsedHours === 1 ? "hour" : "hours"} ago`;
  }

  const elapsedDays = Math.floor(elapsedHours / 24);
  return `${elapsedDays} ${elapsedDays === 1 ? "day" : "days"} ago`;
}

export function RelativeTime({ publishedAt, fallback }: { publishedAt: string; fallback: string }) {
  const [label, setLabel] = useState(fallback);

  useEffect(() => {
    const update = () => setLabel(formatRelativeTime(publishedAt));
    update();
    const timer = window.setInterval(update, 60_000);
    return () => window.clearInterval(timer);
  }, [publishedAt]);

  return <span>{label}</span>;
}
