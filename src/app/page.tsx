import { home } from "@/content/home";
import { pageMeta, organizationLd, faqLd, JsonLd } from "@/lib/seo";
import { SetScene } from "@/components/three/SceneLayer";
import { Hero } from "@/components/sections/home/Hero";
import { Logos } from "@/components/sections/home/Logos";
import { Manifesto } from "@/components/sections/home/Manifesto";
import { ServicesChapter } from "@/components/sections/home/ServicesChapter";
import { Results } from "@/components/sections/home/Results";
import { Work } from "@/components/sections/home/Work";
import { Process } from "@/components/sections/home/Process";
import { WhyUs } from "@/components/sections/home/WhyUs";
import { Testimonials } from "@/components/sections/home/Testimonials";
import { Faq } from "@/components/sections/shared/Faq";
import { FinalCta } from "@/components/sections/shared/FinalCta";

export const metadata = pageMeta({ ...home.meta, path: "/" });

export default function HomePage() {
  return (
    <>
      <SetScene id="core" />
      <JsonLd data={organizationLd()} />
      <JsonLd data={{ "@context": "https://schema.org", ...faqLd(home.faq.items) }} />
      <Hero />
      <Logos />
      <Manifesto />
      <ServicesChapter />
      <Results />
      <Work />
      <Process />
      <WhyUs />
      <Testimonials />
      <Faq heading={home.faq.heading} items={home.faq.items} />
      <FinalCta headline={home.finalCta.headline} subhead={home.finalCta.subhead} primary={home.finalCta.primary} secondary={home.finalCta.secondary} />
    </>
  );
}
