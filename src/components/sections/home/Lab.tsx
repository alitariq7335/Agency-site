"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { home } from "@/content/home";
import { CorePose } from "@/components/motion/CorePose";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";

type Item = (typeof home.lab.items)[number];

/** Procedural pixel art cover per sample project — no stock photos. */
function PixelCover({ hue, seed }: { hue: string; seed: number }) {
  const cells = Array.from({ length: 12 * 7 }, (_, i) => {
    const v = Math.sin(i * 12.9898 + seed * 78.233) * 43758.5453;
    return v - Math.floor(v);
  });
  return (
    <div aria-hidden className="absolute inset-0 grid grid-cols-12 grid-rows-7 gap-[3px] p-[3px] opacity-70">
      {cells.map((r, i) => (
        <span key={i} style={{ background: r > 0.72 ? hue : r > 0.5 ? "rgb(246 240 255 / 0.06)" : "transparent", opacity: r > 0.9 ? 1 : 0.55 }} />
      ))}
    </div>
  );
}

function Card({ item, i }: { item: Item; i: number }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 150, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 150, damping: 18 });
  return (
    <motion.article
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onPointerLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      className="pixel-card relative flex min-h-[420px] flex-col justify-end overflow-hidden rounded-[20px] p-7"
    >
      <PixelCover hue={item.hue} seed={i + 1} />
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink-2 via-ink-2/90 to-transparent" />
      <div className="relative">
        <div className="flex items-center gap-2">
          <span className="rounded-md px-2 py-1 text-xs font-semibold text-ink-2" style={{ background: item.hue }}>
            {item.kind}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-md border border-line px-2 py-1 text-xs text-bone/80">
            <span className="h-1.5 w-1.5 animate-pulse bg-coin" />
            {item.status}
          </span>
        </div>
        <h3 className="mt-4 font-display text-3xl font-bold tracking-[-0.03em]">{item.title}</h3>
        <p className="mt-2 text-haze">{item.body}</p>
      </div>
    </motion.article>
  );
}

/** Honest proof for a new studio: sample projects in progress + the founding-client offer. */
export function Lab() {
  const f = home.lab.founding;
  return (
    <CorePose pose="away" id="work" className="relative py-24 md:py-36">
      <div className="container-x">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <SplitReveal className="font-display text-title font-bold lg:col-span-6">{home.lab.heading}</SplitReveal>
          <p className="max-w-lg text-haze lg:col-span-5 lg:col-start-8">{home.lab.subhead}</p>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {home.lab.items.map((item, i) => (
            <Card key={item.title} item={item} i={i} />
          ))}
          <article className="relative flex min-h-[420px] flex-col justify-between overflow-hidden rounded-[20px] bg-sprout p-7 text-ink-2 shadow-[6px_6px_0_0_#3FA83A]">
            <p className="font-pixel text-[10px] leading-relaxed">3 spots · founding discount</p>
            <div>
              <h3 className="font-display text-3xl font-bold tracking-[-0.03em]">{f.title}</h3>
              <p className="mt-3 text-ink-2/80">{f.body}</p>
              <div className="mt-6">
                <MagneticButton href={f.cta.href} variant="ghost" className="border-ink-2/30! bg-ink-2! text-bone!">
                  {f.cta.label}
                </MagneticButton>
              </div>
            </div>
          </article>
        </div>
      </div>
    </CorePose>
  );
}
