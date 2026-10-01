import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { services, serviceGroups, bundles } from "@/content/services";
import { site } from "@/content/site";
import { pageMeta, JsonLd } from "@/lib/seo";
import { SetScene } from "@/components/three/SceneLayer";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { FinalCta } from "@/components/sections/shared/FinalCta";
import { pad2 } from "@/lib/utils";

export const metadata = pageMeta({
  title: `Digital Marketing Services — Web, SEO, Ads & Social | ${site.name}`,
  description:
    "Web design, SEO, Local SEO, Google Ads, social media, content, branding, email, e-commerce and maintenance. One team, measurable results.",
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
          <p className="mb-6 text-[15px] text-haze">Our services</p>
          <SplitReveal as="h1" onIntro className="max-w-[14ch] font-display text-[clamp(3rem,7.6vw,8.25rem)] font-semibold leading-[0.9] tracking-[-0.045em]">
            Ten ways we grow your business. One team behind all of them.
          </SplitReveal>
          <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <p className="max-w-[46ch] text-lede text-bone/80">
              Build it, get found, get chosen, get repeat customers. Pick a single service or let us run your whole digital presence.
            </p>
            <div className="flex flex-wrap gap-3">
              <MagneticButton href="/contact" size="lg">Get a free audit</MagneticButton>
              <MagneticButton href="/contact" size="lg" variant="ghost">Talk to a strategist</MagneticButton>
            </div>
          </div>
        </div>
      </section>

      {serviceGroups.map((g) => (
        <section key={g.id} aria-labelledby={`g-${g.id}`} className="relative py-16 md:py-24">
          <div className="container-x grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-32">
                <SplitReveal id={`g-${g.id}`} className="font-display text-[clamp(2.75rem,5.5vw,5.5rem)] font-semibold leading-[0.92]">
                  {g.title}
                </SplitReveal>
                <p className="mt-4 max-w-xs text-haze">{g.line}</p>
              </div>
            </div>
            <ul className="border-t border-line lg:col-span-8">
              {services
                .filter((s) => s.group === g.id)
                .map((s) => (
                  <li key={s.slug} className="border-b border-line">
                    <Link
                      href={`/services/${s.slug}`}
                      data-cursor="Explore"
                      className="group relative grid grid-cols-[auto_1fr_auto] items-center gap-5 overflow-hidden py-8 md:gap-8 md:py-10"
                    >
                      <span
                        aria-hidden
                        className="absolute inset-0 origin-bottom scale-y-0 transition-transform duration-700 ease-out-expo group-hover:scale-y-100"
                        style={{ background: `linear-gradient(90deg, ${s.accent}22, transparent 70%)` }}
                      />
                      <span className="relative text-sm tabular-nums text-haze">{pad2(s.order)}</span>
                      <span className="relative">
                        <span className="block font-display text-[clamp(1.75rem,3.4vw,3.25rem)] font-semibold leading-none tracking-[-0.035em] transition-transform duration-700 ease-out-expo group-hover:translate-x-3">
                          {s.name}
                        </span>
                        <span className="mt-3 block max-w-lg text-haze transition-transform duration-700 ease-out-expo group-hover:translate-x-3">{s.pitch}</span>
                      </span>
                      <span className="relative grid h-12 w-12 place-items-center rounded-full border border-line transition-colors duration-500 group-hover:border-transparent group-hover:bg-bone group-hover:text-ink">
                        <ArrowUpRight className="h-5 w-5" />
                      </span>
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </section>
      ))}

      <section aria-labelledby="bundles" className="relative py-20 md:py-32">
        <div className="container-x">
          <SplitReveal id="bundles" className="font-display text-title font-semibold">Better together.</SplitReveal>
          <ul className="mt-12 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {bundles.map((b, i) => (
              <li key={b.name} className="relative flex min-h-72 flex-col justify-between overflow-hidden rounded-[24px] border border-line bg-ink-2/75 p-7 backdrop-blur-sm">
                <span
                  aria-hidden
                  className="absolute -bottom-20 -right-20 h-56 w-56 rounded-full opacity-30 blur-3xl"
                  style={{ background: ["#7c5cff", "#3de3f5", "#ff5fa2", "#ffb547"][i] }}
                />
                <h3 className="relative font-display text-4xl font-semibold tracking-[-0.035em]">{b.name}</h3>
                <div className="relative">
                  <p className="text-bone">{b.includes}</p>
                  <p className="mt-3 text-sm text-haze">Best for: {b.bestFor}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-haze">Bundles are priced after a free discovery call so you only pay for what you need.</p>
        </div>
      </section>

      <FinalCta
        headline="Not sure where to start?"
        subhead="Get a free audit of your website, search rankings and ads. You'll get a clear list of what to fix first — whether you hire us or not."
        primary={{ label: "Get my free audit", href: "/contact" }}
      />
    </>
  );
}
