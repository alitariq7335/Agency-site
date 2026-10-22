import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { services, serviceLines, servicesInLine } from "@/content/services";
import { site } from "@/content/site";
import { home } from "@/content/home";
import { pageMeta, JsonLd } from "@/lib/seo";
import { SetScene } from "@/components/three/SceneLayer";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Offers } from "@/components/sections/shared/Offers";
import { FinalCta } from "@/components/sections/shared/FinalCta";
import { pad2 } from "@/lib/utils";

export const metadata = pageMeta({
  title: `Services — AI, Development, E-commerce, Marketing & Social | ${site.name}`,
  description:
    "AI chatbots and automation, custom software, mobile apps, websites, Shopify and WordPress, Local SEO, Google Business Profile, Meta ads and social media — one team for the whole digital side.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <SetScene id="helix" />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: services.map((s, i) => ({ "@type": "ListItem", position: i + 1, url: `${site.url}/services/${s.slug}`, name: s.name })),
        }}
      />

      <section data-scene-hit className="relative flex min-h-[100svh] flex-col justify-end pb-16 pt-32 md:pb-24">
        <div className="container-x">
          <p className="mb-6 inline-flex items-center gap-2.5 rounded-lg border-2 border-line bg-ink-2/50 px-3 py-1.5 text-[15px] text-haze">
            <span className="h-2.5 w-2.5 bg-sprout" />
            Our services
          </p>
          <SplitReveal as="h1" onIntro className="max-w-[14ch] font-display text-[clamp(2.75rem,6.8vw,7.25rem)] font-bold leading-[0.95] tracking-[-0.04em]">
            Build it. Automate it. Market it. Keep it running.
          </SplitReveal>
          <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <p className="max-w-[46ch] text-lede text-bone/85">
              Five service lines, one team. Start with the service you need most, and add the rest as you grow.
            </p>
            <div className="flex flex-wrap gap-3">
              <MagneticButton href="/contact" size="lg">Plant your idea</MagneticButton>
              <MagneticButton href="/contact?service=local-seo" size="lg" variant="ghost">Free local audit</MagneticButton>
            </div>
          </div>
          <nav aria-label="Service lines" className="mt-12 flex flex-wrap gap-2 border-t border-line pt-6">
            {serviceLines.map((l) => (
              <a key={l.id} href={`#${l.id}`} className="inline-flex items-center gap-2 rounded-lg border-2 border-line bg-ink-2/40 px-3 py-1.5 text-[15px] hover:border-bone/40">
                <span className="h-2 w-2" style={{ background: l.accent }} />
                {l.title}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {serviceLines.map((l, li) => (
        <section key={l.id} id={l.id} aria-labelledby={`g-${l.id}`} className="relative scroll-mt-24 py-16 md:py-24">
          <div className="container-x grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-32">
                <p className="font-pixel text-[11px]" style={{ color: l.accent }}>
                  Line {pad2(li + 1)}
                </p>
                <SplitReveal id={`g-${l.id}`} className="mt-4 font-display text-[clamp(2.75rem,5vw,5rem)] font-bold leading-[0.95]">
                  {l.title}
                </SplitReveal>
                <p className="mt-4 max-w-xs text-haze">{l.line}</p>
                <p className="mt-4 inline-block rounded-md border border-line px-2 py-1 text-xs text-bone/80">Best fit: {l.market}</p>
              </div>
            </div>
            <ul className="border-t-2 border-line lg:col-span-8">
              {servicesInLine(l.id).map((s) => (
                <li key={s.slug} className="border-b-2 border-line">
                  <Link
                    href={`/services/${s.slug}`}
                    data-cursor="Explore"
                    className="group relative grid grid-cols-[1fr_auto] items-center gap-5 overflow-hidden py-8 md:gap-8 md:py-10"
                  >
                    <span
                      aria-hidden
                      className="absolute inset-0 origin-bottom scale-y-0 transition-transform duration-700 ease-out-expo group-hover:scale-y-100"
                      style={{ background: `linear-gradient(90deg, ${s.accent}24, transparent 70%)` }}
                    />
                    <span className="relative">
                      <span className="flex flex-wrap items-center gap-3 font-display text-[clamp(1.75rem,3.2vw,3rem)] font-bold leading-none tracking-[-0.03em] transition-transform duration-700 ease-out-expo group-hover:translate-x-3">
                        {s.name}
                        {s.flagship && <span className="rounded-md border border-coin/60 px-2 py-1 font-sans text-xs font-semibold tracking-normal text-coin">Flagship</span>}
                      </span>
                      <span className="mt-3 block max-w-lg text-haze transition-transform duration-700 ease-out-expo group-hover:translate-x-3">{s.pitch}</span>
                    </span>
                    <span className="relative grid h-12 w-12 place-items-center rounded-lg border-2 border-line transition-colors duration-500 group-hover:border-transparent group-hover:bg-sprout group-hover:text-ink-2">
                      <ArrowUpRight className="h-5 w-5" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      <Offers heading={home.offers.heading} subhead={home.offers.subhead} />

      <FinalCta
        headline="Not sure where to start?"
        subhead="Book a free 20–30 minute discovery call. We'll recommend the one or two services that will make the biggest difference first — whether you hire us or not."
        primary={{ label: "Book a discovery call", href: "/contact" }}
      />
    </>
  );
}
