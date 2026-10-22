import { about } from "@/content/about";
import { home } from "@/content/home";
import { pageMeta } from "@/lib/seo";
import { SetScene } from "@/components/three/SceneLayer";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Mascot } from "@/components/layout/Logo";
import { Values } from "@/components/sections/home/Values";
import { Process } from "@/components/sections/home/Process";
import { FinalCta } from "@/components/sections/shared/FinalCta";

export const metadata = pageMeta({ ...about.meta, path: "/about" });

export default function AboutPage() {
  return (
    <>
      <SetScene id="core" />

      <section className="relative flex min-h-[90svh] flex-col justify-end pb-16 pt-36 md:pb-24">
        <div className="container-x">
          <p className="mb-6 inline-flex items-center gap-2.5 rounded-lg border-2 border-line bg-ink-2/50 px-3 py-1.5 text-[15px] text-haze">
            <span className="h-2.5 w-2.5 bg-sprout" />
            {about.hero.eyebrow}
          </p>
          <SplitReveal as="h1" onIntro className="max-w-[13ch] font-display text-[clamp(2.75rem,6.8vw,7.25rem)] font-bold leading-[0.95] tracking-[-0.04em]">
            {about.hero.headline}
          </SplitReveal>
          <p className="mt-8 max-w-[48ch] text-lede text-bone/85">{about.hero.subhead}</p>
        </div>
      </section>

      <section aria-labelledby="story" className="relative py-20 md:py-28">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <Mascot size={88} />
              <h2 id="story" className="mt-6 font-display text-title font-bold">Our story</h2>
            </div>
          </div>
          <div className="space-y-6 text-lede text-bone/85 lg:col-span-7 lg:col-start-6">
            {about.story.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section aria-label="Mission and vision" className="relative py-16 md:py-24">
        <div className="container-x grid gap-3 md:grid-cols-2">
          {[
            { k: "Mission", v: about.mission, c: "#7BE04F" },
            { k: "Vision", v: about.vision, c: "#A66BFF" },
          ].map((x) => (
            <div key={x.k} className="pixel-card rounded-[20px] p-8 md:p-10">
              <p className="font-pixel text-xs" style={{ color: x.c }}>
                {x.k}
              </p>
              <p className="mt-6 font-display text-[clamp(1.5rem,2.6vw,2.4rem)] font-semibold leading-[1.15] tracking-[-0.02em]">{x.v}</p>
            </div>
          ))}
        </div>
      </section>

      <Values />

      <section aria-labelledby="team" className="relative py-20 md:py-28">
        <div className="container-x">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <SplitReveal id="team" className="font-display text-title font-bold lg:col-span-6">
              Who you&apos;ll work with.
            </SplitReveal>
            <p className="max-w-lg text-haze lg:col-span-5 lg:col-start-8">
              A small team where every person owns one area, so every service has a clear owner — and every project has one person who answers all your questions.
            </p>
          </div>
          <ul className="mt-12 grid gap-3 md:grid-cols-2 lg:grid-cols-5">
            {about.roles.map((r, i) => (
              <li key={r.role} className="pixel-card rounded-[18px] p-6">
                <span aria-hidden className="block h-3 w-3" style={{ background: ["#7BE04F", "#A66BFF", "#FFD23F", "#FF7AC8", "#D9C2FF"][i] }} />
                <h3 className="mt-8 font-display text-xl font-bold leading-tight">{r.role}</h3>
                <p className="mt-2 text-[15px] text-haze">{r.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="rules" className="relative py-16 md:py-24">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <h2 id="rules" className="font-display text-title font-bold lg:col-span-4">Our working rules.</h2>
          <div className="lg:col-span-7 lg:col-start-6">
            <ul className="divide-y-2 divide-line border-y-2 border-line">
              {about.rules.map((r) => (
                <li key={r} className="flex gap-4 py-5 text-lede text-bone/85">
                  <span aria-hidden className="mt-2.5 h-2 w-2 shrink-0 bg-sprout" />
                  {r}
                </li>
              ))}
            </ul>
            <dl className="mt-10 grid gap-3 sm:grid-cols-2">
              {about.policies.map((p) => (
                <div key={p.title} className="rounded-[16px] border-2 border-line bg-ink-2/50 p-5">
                  <dt className="font-semibold">{p.title}</dt>
                  <dd className="mt-1 text-[15px] text-haze">{p.body}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <Process />

      <FinalCta headline={home.finalCta.headline} subhead={home.finalCta.subhead} primary={home.finalCta.primary} secondary={home.finalCta.secondary} />
    </>
  );
}
