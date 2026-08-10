import { useMessages } from "next-intl";
import { home } from "@/lib/site";
import { dichVuPage } from "@/lib/dich-vu-page";

export type HomeContent = typeof home;
export type ServicesPageContent = typeof dichVuPage;

export function useLocalizedHome(): HomeContent {
  const messages = useMessages() as { Home?: HomeContent };
  return messages.Home ?? home;
}

export function useLocalizedServicesPage(): ServicesPageContent {
  const messages = useMessages() as { ServicesPage?: ServicesPageContent };
  return messages.ServicesPage ?? dichVuPage;
}
