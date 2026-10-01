"use client";

import Link from "next/link";
import { motion } from "motion/react";
import type { Service } from "@/content/types";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useSceneStore } from "@/lib/store";

const ease = [0.16, 1, 0.3, 1] as const;
const hints: Partial<Record<Service["sceneId"], string>> = {
  social: "Click a bubble to pop it.",
  branding: "Click anywhere here to morph the mark.",
  ppc: "Move your cursor to speed up the flow.",
  email: "Your cursor steers the flock.",
};

export function ServiceHero({ s }: { s: Service }) {
  const introDone = useSceneStore((st) => st.introDone);
  const show = introDone ? { opacity: 1, y: 0 } : {};
  return (
    <section data-scene-hit className="relative flex min-h-[100svh] flex-col justify-end pb-14 pt-32 md:pb-20">
      <div className="container-x">
        <motion.nav aria-label="Breadcrumb" initial={{ opacity: 0, y: 10 }} animate={show} transition={{ duration: 0.8, ease }} className="mb-6 text-[15px] text-haze">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link href="/" className="hover:text-bone">Home</Link></li>
            <li aria-hidden>/</li>
            <li><Link href="/services" className="hover:text-bone">Services</Link></li>
            <li aria-hidden>/</li>
            <li className="flex items-center gap-2 text-bone" aria-current="page">
              <span className="h-2 w-2 rounded-full" style={{ background: s.accent }} />
              {s.hero.eyebrow}
            </li>
          </ol>
        </motion.nav>
        <SplitReveal as="h1" onIntro className="max-w-[13ch] font-display text-[clamp(3rem,7.6vw,8.25rem)] font-semibold leading-[0.9] tracking-[-0.045em]">
          {s.hero.headline}
        </SplitReveal>
        <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <motion.p initial={{ opacity: 0, y: 16 }} animate={show} transition={{ duration: 0.9, ease, delay: 0.5 }} className="max-w-[48ch] text-lede text-bone/80">
            {s.hero.subhead}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={show} transition={{ duration: 0.9, ease, delay: 0.62 }} className="flex flex-col items-start gap-3 md:items-end">
            <MagneticButton href={`/contact?service=${encodeURIComponent(s.slug)}`} size="lg">{s.hero.cta}</MagneticButton>
            {hints[s.sceneId] && <span className="text-sm text-haze">{hints[s.sceneId]}</span>}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
