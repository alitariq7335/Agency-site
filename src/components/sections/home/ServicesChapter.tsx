"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { motionState } from "@/lib/store";
import { services } from "@/content/services";
import { home } from "@/content/home";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { pad2 } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;
const STEP_VH = 55; // scroll distance per service while pinned

/**
 * Pinned chapter: one service per scroll step. The list highlights the active
 * service while the 3D shards (rendered by the Core scene) form a ring and
 * rotate that service's shard to the front. Mobile gets a swipeable row.
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
          end: () => `+=${(window.innerHeight * STEP_VH * services.length) / 100}`,
          pin: true,
          anticipatePin: 1,
          onEnter: () => (motionState.pose = "services"),
          onEnterBack: () => (motionState.pose = "services"),
          onUpdate: (self) => {
            const idx = Math.min(services.length - 1, Math.floor(self.progress * services.length));
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
      // Pose for smaller screens (no pin)
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
    const y = t.start + ((t.end - t.start) * (i + 0.5)) / services.length;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const s = services[active];

  return (
    <section ref={root} aria-labelledby="services-title" className="relative">
      <div ref={pin} className="relative lg:h-[100svh]">
        <div className="container-x grid h-full gap-10 py-24 lg:grid-cols-12 lg:pb-12 lg:pt-28">
          {/* Left: heading + list */}
          <div className="flex flex-col lg:col-span-5">
            <SplitReveal as="h2" id="services-title" className="font-display text-[clamp(2.25rem,4.2vw,4.25rem)] font-semibold leading-[0.95]">
              {home.services.heading}
            </SplitReveal>
            <p className="mt-5 max-w-sm text-haze">{home.services.subhead}</p>

            <ol className="mt-8 hidden flex-1 flex-col justify-end lg:flex">
              {services.map((svc, i) => (
                <li key={svc.slug}>
                  <button
                    type="button"
                    onClick={() => jumpTo(i)}
                    aria-current={i === active}
                    className="group flex w-full items-baseline gap-4 py-[0.18rem] text-left"
                  >
                    <span className={`w-7 text-sm tabular-nums transition-colors ${i === active ? "text-bone" : "text-haze/50"}`}>{pad2(i + 1)}</span>
                    <span
                      className={`font-display text-[clamp(1.1rem,1.55vw,1.45rem)] leading-tight tracking-[-0.03em] transition-[color,transform] duration-500 ease-out-expo ${
                        i === active ? "translate-x-2 text-bone" : "text-haze/45 group-hover:text-haze"
                      }`}
                    >
                      {svc.name}
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          </div>

          {/* Right: active service detail, sitting under the 3D ring */}
          <div className="relative hidden lg:col-span-6 lg:col-start-7 lg:flex lg:flex-col lg:justify-end">
            <div className="glass relative overflow-hidden rounded-[28px] p-8">
              <div className="flex items-start justify-between gap-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={s.slug}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.5, ease }}
                  >
                    <h3 className="font-display text-4xl font-semibold tracking-[-0.035em]">{s.name}</h3>
                    <p className="mt-3 max-w-md text-lede text-bone/75">{s.pitch}</p>
                  </motion.div>
                </AnimatePresence>
                <span className="shrink-0 text-sm tabular-nums text-haze">
                  {pad2(active + 1)} / {services.length}
                </span>
              </div>
              <Link
                href={`/services/${s.slug}`}
                data-cursor="Explore"
                className="mt-8 inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-[15px] transition-colors hover:border-bone/40 hover:bg-white/5"
              >
                Explore service <ArrowUpRight className="h-4 w-4" />
              </Link>
              <div className="absolute inset-x-0 bottom-0 h-px bg-line">
                <div
                  className="h-px origin-left transition-transform duration-500"
                  style={{ transform: `scaleX(${(active + 1) / services.length})`, background: s.accent }}
                />
              </div>
            </div>
          </div>

          {/* Mobile / tablet: swipeable cards */}
          <div className="-mx-4 lg:hidden">
            <ul className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-4 [scrollbar-width:none]" data-lenis-prevent-wheel>
              {services.map((svc, i) => (
                <li key={svc.slug} className="glass w-[78vw] max-w-sm shrink-0 snap-start rounded-[24px] p-6">
                  <span className="text-sm tabular-nums text-haze">{pad2(i + 1)}</span>
                  <h3 className="mt-10 font-display text-3xl font-semibold tracking-[-0.03em]">{svc.name}</h3>
                  <p className="mt-3 text-bone/75">{svc.pitch}</p>
                  <Link href={`/services/${svc.slug}`} className="mt-6 inline-flex items-center gap-1.5 text-[15px] text-bone underline decoration-line underline-offset-4">
                    Explore service <ArrowUpRight className="h-4 w-4" />
                  </Link>
                  <span className="mt-6 block h-1 w-10 rounded-full" style={{ background: svc.accent }} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
