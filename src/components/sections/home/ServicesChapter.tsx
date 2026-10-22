"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { motionState } from "@/lib/store";
import { serviceLines, servicesInLine } from "@/content/services";
import { home } from "@/content/home";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { pad2 } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;
const STEP_VH = 70; // scroll distance per service line while pinned

/**
 * Pinned chapter: one service line per scroll step. The list highlights the
 * active line while the 3D seeds around the mascot form a ring and turn that
 * line's seeds to the front. Mobile gets a swipeable row of cards.
 */
export function ServicesChapter() {
  const root = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const st = useRef<ScrollTrigger | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const trigger = ScrollTrigger.create({
          trigger: pin.current,
          start: "top top",
          end: () => `+=${(window.innerHeight * STEP_VH * serviceLines.length) / 100}`,
          pin: true,
          anticipatePin: 1,
          onEnter: () => (motionState.pose = "services"),
          onEnterBack: () => (motionState.pose = "services"),
          onUpdate: (self) => {
            const idx = Math.min(serviceLines.length - 1, Math.floor(self.progress * serviceLines.length));
            motionState.services = self.progress;
            if (idx !== motionState.activeService) {
              motionState.activeService = idx;
              setActive(idx);
            }
          },
        });
        st.current = trigger;
        return () => {
          st.current = null;
        };
      });
      mm.add("(max-width: 1023px), (prefers-reduced-motion: reduce)", () => {
        const t = ScrollTrigger.create({
          trigger: root.current,
          start: "top 55%",
          end: "bottom 45%",
          onToggle: (self) => self.isActive && (motionState.pose = "services"),
        });
        return () => t.kill();
      });
    },
    { scope: root },
  );

  const jumpTo = (i: number) => {
    const t = st.current;
    if (!t) {
      setActive(i);
      motionState.activeService = i;
      return;
    }
    const y = t.start + ((t.end - t.start) * (i + 0.5)) / serviceLines.length;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const line = serviceLines[active];

  return (
    <section ref={root} aria-labelledby="services-title" className="relative">
      <div ref={pin} className="relative lg:h-[100svh]">
        <div className="container-x grid h-full gap-10 py-24 lg:grid-cols-12 lg:pb-12 lg:pt-28">
          <div className="flex flex-col lg:col-span-5">
            <SplitReveal as="h2" id="services-title" className="font-display text-[clamp(2.25rem,4.2vw,4.25rem)] font-bold leading-[0.98]">
              {home.services.heading}
            </SplitReveal>
            <p className="mt-5 max-w-md text-haze">{home.services.subhead}</p>

            <ol className="mt-8 hidden flex-1 flex-col justify-end gap-1 lg:flex">
              {serviceLines.map((l, i) => (
                <li key={l.id}>
                  <button type="button" onClick={() => jumpTo(i)} aria-current={i === active} className="group flex w-full items-center gap-4 py-1.5 text-left">
                    <span
                      className="font-pixel text-[10px] transition-colors"
                      style={{ color: i === active ? l.accent : "rgb(196 181 221 / 0.45)" }}
                    >
                      {pad2(i + 1)}
                    </span>
                    <span
                      className={`font-display text-[clamp(1.4rem,2vw,2rem)] font-semibold leading-tight tracking-[-0.025em] transition-[color,transform] duration-500 ease-out-expo ${
                        i === active ? "translate-x-2 text-bone" : "text-haze/45 group-hover:text-haze"
                      }`}
                    >
                      {l.title}
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          </div>

          {/* Active line detail, under the 3D ring */}
          <div className="relative hidden lg:col-span-6 lg:col-start-7 lg:flex lg:flex-col lg:justify-end">
            <div className="glass relative overflow-hidden rounded-[22px] p-8">
              <AnimatePresence mode="wait">
                <motion.div key={line.id} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.45, ease }}>
                  <div className="flex items-start justify-between gap-6">
                    <h3 className="font-display text-4xl font-bold tracking-[-0.03em]">{line.title}</h3>
                    <span className="shrink-0 rounded-md px-2 py-1 text-xs font-semibold text-ink-2" style={{ background: line.accent }}>
                      {line.market}
                    </span>
                  </div>
                  <p className="mt-3 max-w-md text-lede text-bone/80">{line.line}</p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {servicesInLine(line.id).map((s) => (
                      <li key={s.slug}>
                        <Link
                          href={`/services/${s.slug}`}
                          data-cursor="Explore"
                          className="inline-flex items-center gap-1.5 rounded-lg border-2 border-line bg-ink-2/50 px-3 py-2 text-[15px] transition-colors hover:border-bone/40"
                        >
                          {s.shortName}
                          <ArrowUpRight className="h-3.5 w-3.5 opacity-60" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-x-0 bottom-0 flex h-1 gap-1 px-8 pb-0">
                {serviceLines.map((l, i) => (
                  <span key={l.id} className="h-1 flex-1 transition-opacity duration-500" style={{ background: l.accent, opacity: i <= active ? 1 : 0.15 }} />
                ))}
              </div>
            </div>
          </div>

          {/* Mobile / tablet: swipeable cards */}
          <div className="-mx-4 lg:hidden">
            <ul className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-4 [scrollbar-width:none]" data-lenis-prevent-wheel>
              {serviceLines.map((l, i) => (
                <li key={l.id} className="glass w-[82vw] max-w-sm shrink-0 snap-start rounded-[20px] p-6">
                  <span className="font-pixel text-[10px]" style={{ color: l.accent }}>
                    {pad2(i + 1)}
                  </span>
                  <h3 className="mt-8 font-display text-3xl font-bold tracking-[-0.03em]">{l.title}</h3>
                  <p className="mt-2 text-bone/80">{l.line}</p>
                  <ul className="mt-5 flex flex-wrap gap-1.5">
                    {servicesInLine(l.id).map((s) => (
                      <li key={s.slug}>
                        <Link href={`/services/${s.slug}`} className="inline-block rounded-md border border-line px-2.5 py-1 text-sm">
                          {s.shortName}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
