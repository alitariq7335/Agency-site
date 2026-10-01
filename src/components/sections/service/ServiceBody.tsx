import Link from "next/link";
import { Check, ArrowUpRight } from "lucide-react";
import type { Service } from "@/content/types";
import { getService } from "@/content/services";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { WordScrub } from "@/components/motion/WordScrub";
import { Marquee } from "@/components/ui/Marquee";

export function ServiceProblem({ s }: { s: Service }) {
  return (
    <section aria-labelledby="problem" className="relative py-24 md:py-40">
      <div className="container-x grid gap-8 lg:grid-cols-12">
        <h2 id="problem" className="text-lg text-haze lg:col-span-3">The problem we solve</h2>
        <WordScrub text={s.problem} className="font-display text-[clamp(1.75rem,3.6vw,3.5rem)] font-medium leading-[1.08] tracking-[-0.03em] lg:col-span-9" />
      </div>
    </section>
  );
}

export function ServiceIncluded({ s }: { s: Service }) {
  return (
    <section aria-labelledby="included" className="relative py-20 md:py-32">
      <div className="container-x">
        <SplitReveal id="included" className="font-display text-title font-semibold">What&apos;s included</SplitReveal>
        <ul className="mt-14 grid gap-px overflow-hidden rounded-[28px] border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
          {s.included.map((it) => (
            <li key={it.title} className="group relative bg-ink/85 p-7 backdrop-blur-sm transition-colors duration-500 hover:bg-ink-2/90 md:p-9">
              <span
                className="grid h-10 w-10 place-items-center rounded-full transition-transform duration-500 ease-out-expo group-hover:scale-110"
                style={{ background: `${s.accent}26`, color: s.accent }}
              >
                <Check className="h-5 w-5" />
              </span>
              <h3 className="mt-8 font-display text-2xl font-semibold tracking-[-0.025em]">{it.title}</h3>
              <p className="mt-2 text-haze">{it.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function ServiceSteps({ s }: { s: Service }) {
  return (
    <section aria-labelledby="steps" className="relative py-20 md:py-32">
      <div className="container-x">
        <SplitReveal id="steps" className="font-display text-title font-semibold">How it works</SplitReveal>
        <ol className="mt-14 grid gap-10 md:grid-cols-4 md:gap-6">
          {s.steps.map((st, i) => (
            <li key={st.title} className="relative border-t border-line pt-6">
              <span className="absolute -top-px left-0 h-px w-12" style={{ background: s.accent }} />
              <span className="font-display text-6xl font-semibold tracking-[-0.05em] text-bone/15 tabular-nums">{i + 1}</span>
              <h3 className="mt-4 font-display text-2xl font-semibold tracking-[-0.025em]">{st.title}</h3>
              <p className="mt-2 text-haze">{st.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function ServiceAudience({ s }: { s: Service }) {
  return (
    <section aria-labelledby="audience" className="relative py-20 md:py-32">
      <div className="container-x grid gap-10 lg:grid-cols-12">
        <h2 id="audience" className="text-lg text-haze lg:col-span-3">Who it&apos;s for</h2>
        <p className="font-display text-[clamp(1.5rem,2.8vw,2.6rem)] leading-[1.15] tracking-[-0.025em] lg:col-span-9">{s.audience}</p>
      </div>
      <div className="mt-20">
        <div className="container-x mb-6">
          <h2 className="text-lg text-haze">Tools &amp; platforms</h2>
        </div>
        <Marquee speed={36}>
          {s.tools.map((t) => (
            <span key={t} className="mx-2 whitespace-nowrap rounded-full border border-line bg-white/[0.03] px-6 py-3 font-display text-xl tracking-[-0.02em] md:text-2xl">
              {t}
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}

export function ServiceRelated({ s }: { s: Service }) {
  const related = s.related.map(getService).filter(Boolean) as Service[];
  return (
    <section aria-labelledby="related" className="relative pb-10">
      <div className="container-x">
        <h2 id="related" className="mb-6 text-lg text-haze">Pairs well with</h2>
        <ul className="grid gap-3 md:grid-cols-3">
          {related.map((r) => (
            <li key={r.slug}>
              <Link
                href={`/services/${r.slug}`}
                data-cursor="Explore"
                className="group relative flex min-h-48 flex-col justify-between overflow-hidden rounded-[24px] border border-line bg-ink-2/70 p-7 transition-colors duration-500 hover:border-bone/25"
              >
                <span
                  aria-hidden
                  className="absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-25 blur-3xl transition-opacity duration-500 group-hover:opacity-60"
                  style={{ background: r.accent }}
                />
                <span className="relative flex items-start justify-between gap-4">
                  <span className="font-display text-2xl font-semibold tracking-[-0.025em]">{r.name}</span>
                  <ArrowUpRight className="h-5 w-5 shrink-0 transition-transform duration-500 ease-out-expo group-hover:-translate-y-1 group-hover:translate-x-1" />
                </span>
                <span className="relative text-haze">{r.pitch}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
