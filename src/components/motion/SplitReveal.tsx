"use client";

import { createElement, useRef, type ReactNode } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { useSceneStore } from "@/lib/store";
import { useReducedMotion } from "@/lib/useReducedMotion";

type Props = {
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  children: ReactNode;
  className?: string;
  /** "lines" rises each line from a mask; "chars" staggers characters. */
  by?: "lines" | "chars";
  /** Play once the preloader has finished instead of on scroll. */
  onIntro?: boolean;
  delay?: number;
  id?: string;
};

/** Headline reveal: text rises out of a mask line by line (or char by char). */
export function SplitReveal({ as: Tag = "h2", children, className, by = "lines", onIntro = false, delay = 0, id }: Props) {
  const ref = useRef<HTMLElement>(null);
  const introDone = useSceneStore((s) => s.introDone);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || reduced) return;
      if (onIntro && !introDone) {
        gsap.set(el, { autoAlpha: 0 });
        return;
      }
      gsap.set(el, { autoAlpha: 1 });
      const split = SplitText.create(el, {
        type: by === "chars" ? "lines,chars" : "lines",
        mask: "lines",
        linesClass: "split-line",
        autoSplit: true,
        onSplit(self) {
          const targets = by === "chars" ? self.chars : self.lines;
          return gsap.from(targets, {
            yPercent: 110,
            rotate: by === "chars" ? 6 : 2,
            duration: by === "chars" ? 1.1 : 1.25,
            stagger: by === "chars" ? 0.018 : 0.09,
            ease: "expo.out",
            delay,
            scrollTrigger: onIntro ? undefined : { trigger: el, start: "top 85%", once: true },
          });
        },
      });
      return () => split.revert();
    },
    { dependencies: [introDone, reduced], scope: ref },
  );

  // eslint-disable-next-line react-hooks/refs -- ref is attached, not read, during render
  return createElement(Tag, { ref, id, className }, children);
}
