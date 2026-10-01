"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { home } from "@/content/home";
import { site } from "@/content/site";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { CorePose } from "@/components/motion/CorePose";
import { useSceneStore } from "@/lib/store";
import { useReducedMotion } from "@/lib/useReducedMotion";

const ease = [0.16, 1, 0.3, 1] as const;

function RotatingWord() {
  const words = home.hero.rotating;
  const [i, setI] = useState(0);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => setI((n) => (n + 1) % words.length), 2400);
    return () => window.clearInterval(id);
  }, [reduced, words.length]);
  return (
    <span className="relative -mb-[0.2em] inline-grid overflow-hidden pb-[0.2em] align-bottom">
      {/* invisible sizer keeps the line height stable for the longest word */}
      <span className="invisible col-start-1 row-start-1 whitespace-nowrap">{words.reduce((a, b) => (b.length > a.length ? b : a))}.</span>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={words[i]}
          initial={{ y: "125%", rotate: 3 }}
          animate={{ y: "0%", rotate: 0 }}
          exit={{ y: "-125%", rotate: -3 }}
          transition={{ duration: 0.9, ease }}
          className="iris-text col-start-1 row-start-1 whitespace-nowrap"
        >
          {words[i]}.
        </motion.span>
      </AnimatePresence>
      <span className="sr-only">{words.join(", ")}</span>
    </span>
  );
}

export function Hero() {
  const introDone = useSceneStore((s) => s.introDone);
  const stats = site.stats;
  const trust = [
    stats.projects && `${stats.projects}+ projects delivered`,
    stats.clients && `${stats.clients}+ happy clients`,
    stats.years && `${stats.years} years in business`,
    stats.rating && `${stats.rating} average rating`,
  ].filter(Boolean) as string[];

  return (
    <CorePose pose="hero" className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pb-8 pt-28 md:pb-10">
      <div className="container-x">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={introDone ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease, delay: 0.1 }}
          className="mb-6 inline-flex items-center gap-2 text-[15px] text-haze"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan" />
          </span>
          {home.hero.eyebrow}
        </motion.p>

        <h1 className="font-display text-display font-semibold">
          <SplitReveal as="span" onIntro by="lines" className="block max-w-[11ch]">
            {home.hero.headlineLead}
          </SplitReveal>
          <motion.span
            className="block"
            initial={{ opacity: 0 }}
            animate={introDone ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.45 }}
          >
            <RotatingWord />
          </motion.span>
        </h1>

        <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-12 md:items-end">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={introDone ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease, delay: 0.6 }}
            className="max-w-[46ch] text-lede text-bone/80 md:col-span-5"
          >
            {home.hero.subhead}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={introDone ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease, delay: 0.72 }}
            className="flex flex-wrap items-center gap-3 md:col-span-7 md:justify-end"
          >
            <MagneticButton href={home.hero.primaryCta.href} size="lg">{home.hero.primaryCta.label}</MagneticButton>
            <MagneticButton href={home.hero.secondaryCta.href} size="lg" variant="ghost">{home.hero.secondaryCta.label}</MagneticButton>
          </motion.div>
        </div>

        {trust.length > 0 && (
          <motion.ul
            initial={{ opacity: 0 }}
            animate={introDone ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.9 }}
            className="mt-12 flex flex-wrap gap-x-8 gap-y-2 border-t border-line pt-5 text-[15px] text-haze"
          >
            {trust.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </motion.ul>
        )}
      </div>
    </CorePose>
  );
}
