"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "motion/react";
import { gsap, useGSAP } from "@/lib/gsap";
import { motionState } from "@/lib/store";
import { home } from "@/content/home";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";

type Item = (typeof home.work.items)[number];

/** Procedural cover art per project (no stock photos): layered gradients + oversized initials. */
function Cover({ item, depth }: { item: Item; depth: MotionValue<string> }) {
  const h = item.hue;
  const initials = item.client
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        style={{
          x: depth,
          background: `radial-gradient(60% 70% at 25% 30%, hsl(${h} 90% 62% / .95), transparent 70%),
            radial-gradient(50% 60% at 80% 70%, hsl(${(h + 60) % 360} 95% 60% / .85), transparent 70%),
            radial-gradient(80% 80% at 60% 10%, hsl(${(h + 180) % 360} 90% 55% / .55), transparent 70%),
            linear-gradient(160deg, hsl(${h} 50% 14%), #0a0814)`,
        }}
        className="absolute -inset-10"
      />
      <div className="absolute inset-0 opacity-30 mix-blend-overlay [background-image:repeating-linear-gradient(90deg,rgba(255,255,255,.12)_0_1px,transparent_1px_48px)]" />
      <span className="absolute -bottom-[0.18em] -right-[0.04em] select-none font-display text-[12rem] font-bold leading-none tracking-[-0.08em] text-white/15 md:text-[15rem]">
        {initials}
      </span>
    </div>
  );
}

function Card({ item }: { item: Item }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), { stiffness: 150, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-9, 9]), { stiffness: 150, damping: 18 });
  const depth = useTransform(mx, [-0.5, 0.5], ["-14px", "14px"]);
  return (
    <motion.article
      data-cursor="View"
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
      className="group relative flex h-[62vh] max-h-[560px] min-h-[420px] w-[82vw] shrink-0 flex-col justify-end overflow-hidden rounded-[28px] border border-line p-6 sm:w-[60vw] md:p-8 lg:w-[40vw]"
    >
      <Cover item={item} depth={depth} />
      <div className="relative">
        <p className="text-sm text-bone/70">{item.industry}</p>
        <h3 className="mt-1 font-display text-4xl font-semibold tracking-[-0.035em] md:text-5xl">{item.client}</h3>
        <p className="mt-4 font-display text-2xl text-bone md:text-3xl">{item.result}</p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {item.services.map((s) => (
            <li key={s} className="rounded-full border border-white/20 bg-black/20 px-3 py-1 text-sm backdrop-blur-md">
              {s}
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}

/** Horizontal scroll gallery (pinned on desktop, swipe on touch). */
export function Work() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const el = track.current!;
        const distance = () => el.scrollWidth - window.innerWidth + 80;
        gsap.to(el, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            onToggle: (self) => self.isActive && (motionState.pose = "away"),
          },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="work" aria-labelledby="work-title" className="relative overflow-hidden py-24 lg:flex lg:h-[100svh] lg:flex-col lg:justify-center lg:py-0">
      <div className="container-x mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <SplitReveal id="work-title" className="font-display text-title font-semibold">{home.work.heading}</SplitReveal>
          <p className="mt-4 max-w-md text-haze">{home.work.subhead}</p>
        </div>
        <MagneticButton href="/contact" variant="ghost">Ask for case studies</MagneticButton>
      </div>
      <div className="overflow-x-auto [scrollbar-width:none] lg:overflow-visible" data-lenis-prevent-wheel>
        <div ref={track} className="flex w-max gap-4 px-4 md:gap-6 md:px-10">
          {home.work.items.map((item) => (
            <Card key={item.client} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
