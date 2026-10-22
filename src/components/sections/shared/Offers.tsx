import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { flagshipOffers, packageTiers } from "@/content/services";
import { SplitReveal } from "@/components/motion/SplitReveal";

/** The four flagship offers and the three package tiers they're sold in. */
export function Offers({ heading, subhead }: { heading: string; subhead: string }) {
  return (
    <section aria-labelledby="offers-title" className="relative py-24 md:py-32">
      <div className="container-x">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <SplitReveal id="offers-title" className="font-display text-title font-bold lg:col-span-6">
            {heading}
          </SplitReveal>
          <p className="max-w-lg text-haze lg:col-span-5 lg:col-start-8">{subhead}</p>
        </div>

        <ul className="mt-12 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {flagshipOffers.map((o) => (
            <li key={o.title}>
              <Link
                href={o.href}
                data-cursor="Explore"
                className="pixel-card group relative flex h-full min-h-64 flex-col justify-between overflow-hidden rounded-[18px] p-6 transition-transform duration-300 hover:-translate-y-1"
              >
                <span aria-hidden className="absolute inset-x-0 top-0 h-1.5" style={{ background: o.accent }} />
                <span className="flex items-start justify-between gap-4">
                  <span className="rounded-md px-2 py-1 text-xs font-semibold text-ink-2" style={{ background: o.accent }}>
                    {o.market}
                  </span>
                  <ArrowUpRight className="h-5 w-5 transition-transform duration-500 ease-out-expo group-hover:-translate-y-1 group-hover:translate-x-1" />
                </span>
                <span>
                  <span className="block font-display text-2xl font-bold leading-tight tracking-[-0.02em]">{o.title}</span>
                  <span className="mt-3 block text-[15px] text-haze">{o.includes}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {packageTiers.map((t, i) => (
            <div key={t.name} className="relative rounded-[18px] border-2 border-line bg-ink-2/50 p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <p className="font-pixel text-xs text-sprout">{t.name}</p>
                <span aria-hidden className="flex gap-1">
                  {[0, 1, 2].map((d) => (
                    <span key={d} className="h-2.5 w-2.5" style={{ background: d <= i ? "#FFD23F" : "rgb(246 240 255 / 0.15)" }} />
                  ))}
                </span>
              </div>
              <p className="mt-4 font-display text-lg font-semibold">{t.for}</p>
              <p className="mt-1 text-[15px] text-haze">{t.scope}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-haze">
          Monthly retainers are available for social media, content, Meta ads, store management and SEO. International projects are quoted as a fixed price or hourly in USD.
        </p>
      </div>
    </section>
  );
}
