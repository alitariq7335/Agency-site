"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { home } from "@/content/home";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { CorePose } from "@/components/motion/CorePose";

const items = home.testimonials.items;

/** A stack of quote cards: drag (or use the arrows) to flick the front card to the back. */
export function Testimonials() {
  const [order, setOrder] = useState(items.map((_, i) => i));
  const next = () => setOrder((o) => [...o.slice(1), o[0]]);
  const prev = () => setOrder((o) => [o[o.length - 1], ...o.slice(0, -1)]);

  return (
    <CorePose pose="away" className="relative py-24 md:py-40">
      <div className="container-x grid items-center gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SplitReveal id="t-title" className="font-display text-title font-semibold">{home.testimonials.heading}</SplitReveal>
          <div className="mt-10 flex gap-3">
            <button type="button" onClick={prev} aria-label="Previous testimonial" className="grid h-12 w-12 place-items-center rounded-full border border-line hover:bg-white/5">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button type="button" onClick={next} aria-label="Next testimonial" className="grid h-12 w-12 place-items-center rounded-full border border-line hover:bg-white/5">
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div className="relative h-[440px] lg:col-span-6 lg:col-start-7" aria-live="polite">
          <AnimatePresence initial={false}>
            {order.map((idx, depth) => {
              const t = items[idx];
              const front = depth === 0;
              return (
                <motion.figure
                  key={idx}
                  data-cursor={front ? "Drag" : undefined}
                  drag={front ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.9}
                  onDragEnd={(_, info) => {
                    if (Math.abs(info.offset.x) > 110 || Math.abs(info.velocity.x) > 500) next();
                  }}
                  initial={false}
                  animate={{
                    y: depth * 22,
                    scale: 1 - depth * 0.06,
                    rotate: depth === 0 ? 0 : depth % 2 ? 3 : -3,
                    opacity: depth > 2 ? 0 : 1 - depth * 0.15,
                  }}
                  transition={{ type: "spring", stiffness: 260, damping: 28 }}
                  style={{ zIndex: items.length - depth }}
                  aria-hidden={!front}
                  className="absolute inset-x-0 top-0 flex h-[380px] border border-line bg-[#15112a] shadow-[0_40px_80px_-30px_rgba(0,0,0,.8)] cursor-grab flex-col justify-between rounded-[28px] p-8 active:cursor-grabbing md:p-10"
                >
                  <blockquote className="font-display text-[clamp(1.5rem,2.4vw,2.1rem)] leading-[1.2] tracking-[-0.025em]">
                    “{t.quote}”
                  </blockquote>
                  <figcaption className="flex items-center gap-3 text-haze">
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-violet to-flare font-display text-bone">
                      {t.org[0]}
                    </span>
                    <span>
                      <span className="block text-bone">{t.who}</span>
                      {t.org}
                    </span>
                  </figcaption>
                </motion.figure>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </CorePose>
  );
}
