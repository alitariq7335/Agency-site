import { home } from "@/content/home";
import { pageMeta, organizationLd, faqLd, JsonLd } from "@/lib/seo";
import { SetScene } from "@/components/three/SceneLayer";
import { Hero } from "@/components/sections/home/Hero";
import { Tools } from "@/components/sections/home/Tools";
import { Manifesto } from "@/components/sections/home/Manifesto";
import { ServicesChapter } from "@/components/sections/home/ServicesChapter";
import { Markets } from "@/components/sections/home/Markets";
import { Offers } from "@/components/sections/shared/Offers";
import { Standards } from "@/components/sections/home/Standards";
import { Lab } from "@/components/sections/home/Lab";
import { Process } from "@/components/sections/home/Process";
import { Values } from "@/components/sections/home/Values";
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
      <Tools />
      <Manifesto />
      <ServicesChapter />
      <Markets />
      <Offers heading={home.offers.heading} subhead={home.offers.subhead} />
      <Standards />
      <Lab />
      <Process />
      <Values />
      <Faq heading={home.faq.heading} items={home.faq.items} />
      <FinalCta headline={home.finalCta.headline} subhead={home.finalCta.subhead} primary={home.finalCta.primary} secondary={home.finalCta.secondary} />
    </>
  );
}
