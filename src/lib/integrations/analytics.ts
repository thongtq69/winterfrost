// TODO_BACKEND: GA4 + FB Pixel placeholder.
// Để gắn thật: set NEXT_PUBLIC_GA_ID + NEXT_PUBLIC_FB_PIXEL_ID env và import script
// trong app/layout.tsx (Script tag).

export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  // STUB log — replace with gtag('event', name, params) when GA_ID is set.
  console.log("[STUB analytics]", name, params);
}
