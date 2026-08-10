import { Hero } from "@/components/sections/Hero";
import { AboutSection } from "@/components/sections/AboutSection";
import { CompanyOverview } from "@/components/sections/CompanyOverview";
import { ServicesTabs } from "@/components/sections/ServicesTabs";
import { IndustriesGrid } from "@/components/sections/IndustriesGrid";
import { CTABanner } from "@/components/sections/CTABanner";
import { CaseStudiesCarousel } from "@/components/sections/CaseStudiesCarousel";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { PartnersMarquee } from "@/components/sections/PartnersMarquee";
import { Testimonials } from "@/components/sections/Testimonials";
import { MeetTeam } from "@/components/sections/MeetTeam";
import { TechStackTabs } from "@/components/sections/TechStackTabs";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { WikiRelated } from "@/components/sections/WikiRelated";

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutSection />
      <CompanyOverview />
      <ServicesTabs home />
      <IndustriesGrid home />
      <CTABanner home />
      <CaseStudiesCarousel />
      <WhyChooseUs />
      <PartnersMarquee home />
      <Testimonials />
      <MeetTeam />
      <TechStackTabs home />
      <FAQAccordion home />
      <WikiRelated home />
    </>
  );
}
