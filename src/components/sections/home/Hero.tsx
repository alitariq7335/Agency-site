"use client";

import { motion } from "motion/react";
import { home } from "@/content/home";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { CorePose } from "@/components/motion/CorePose";
import { useSceneStore } from "@/lib/store";

const ease = [0.16, 1, 0.3, 1] as const;

/** Home hero: the pixel tagline beside the 3D voxel mascot. */
export function Hero() {
  const introDone = useSceneStore((s) => s.introDone);
  const show = introDone ? { opacity: 1, y: 0 } : {};

  return (
    <CorePose pose="hero" className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pb-8 pt-28 md:pb-10">
      <div className="container-x">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={show}
          transition={{ duration: 0.8, ease, delay: 0.1 }}
          className="mb-8 inline-flex items-center gap-2.5 rounded-lg border-2 border-line bg-ink-2/50 px-3 py-1.5 text-[15px] text-haze backdrop-blur-sm"
        >
          <span className="h-2.5 w-2.5 animate-pulse bg-sprout" />
          {home.hero.eyebrow}
        </motion.p>

        <h1 className="font-pixel text-[clamp(1.15rem,3.5vw,3.6rem)] leading-[1.3] text-bone">
          <SplitReveal as="span" onIntro by="chars" className="block">
            {home.hero.tagline[0]}
          </SplitReveal>
          <SplitReveal as="span" onIntro by="chars" delay={0.35} className="block text-sprout [text-shadow:0.08em_0.08em_0_#6A2C91]">
            {home.hero.tagline[1]}
          </SplitReveal>
        </h1>

        <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-12 md:items-end">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={show}
            transition={{ duration: 0.9, ease, delay: 0.7 }}
            className="max-w-[44ch] text-lede text-bone/85 md:col-span-6"
          >
            {home.hero.subhead}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={show}
            transition={{ duration: 0.9, ease, delay: 0.82 }}
            className="flex flex-wrap items-center gap-3 md:col-span-6 md:justify-end"
          >
            <MagneticButton href={home.hero.primaryCta.href} size="lg">{home.hero.primaryCta.label}</MagneticButton>
            <MagneticButton href={home.hero.secondaryCta.href} size="lg" variant="ghost">{home.hero.secondaryCta.label}</MagneticButton>
          </motion.div>
        </div>

        <motion.ul
          initial={{ opacity: 0 }}
          animate={introDone ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1 }}
          className="mt-12 flex flex-wrap gap-x-8 gap-y-2 border-t border-line pt-5 text-[15px] text-haze"
        >
          {home.hero.promises.map((t) => (
            <li key={t} className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 bg-coin" />
              {t}
            </li>
          ))}
        </motion.ul>
      </div>
    </CorePose>
  );
}
