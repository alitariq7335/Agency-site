"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useSceneStore } from "@/lib/store";
import { Mascot } from "@/components/layout/Logo";

const KEY = "intro-seen";
const BLOCKS = 20;

/**
 * Arcade-style loader: the mascot pops in, a pixel bar fills block by block
 * (tied to fonts + the first 3D frame, capped at ~2.6s), then the curtains
 * part. Skipped on repeat visits in a session.
 */
export function Preloader() {
  const sceneReady = useSceneStore((s) => s.sceneReady);
  const webgl = useSceneStore((s) => s.webgl);
  const setIntroDone = useSceneStore((s) => s.setIntroDone);
  const [gone, setGone] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const num = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const progress = useRef({ v: 0 });
  const finished = useRef(false);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(KEY) === "1";
    } catch {}
    if (seen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- sessionStorage is only readable after mount
      setGone(true);
      setIntroDone(true);
      return;
    }
    gsap.from("[data-pl-mascot]", { y: 30, scale: 0.6, opacity: 0, duration: 0.7, ease: "back.out(2.2)" });
    const tw = gsap.to(progress.current, { v: 90, duration: 2, ease: "power2.out", onUpdate: render });
    const cap = window.setTimeout(() => finish(), 2600);
    return () => {
      tw.kill();
      window.clearTimeout(cap);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if ((sceneReady || !webgl) && !gone) {
      document.fonts?.ready.then(() => finish());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sceneReady, webgl]);

  function render() {
    const v = Math.round(progress.current.v);
    if (num.current) num.current.textContent = String(v).padStart(3, "0");
    if (bar.current) {
      const lit = Math.round((v / 100) * BLOCKS);
      bar.current.querySelectorAll<HTMLSpanElement>("span").forEach((b, i) => {
        b.style.opacity = i < lit ? "1" : "0.12";
      });
    }
  }

  function finish() {
    if (finished.current || !root.current) return;
    finished.current = true;
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {}
    const tl = gsap.timeline({ onComplete: () => setGone(true) });
    tl.to(progress.current, { v: 100, duration: 0.4, ease: "power3.out", onUpdate: render })
      .to("[data-pl-mascot]", { y: -16, duration: 0.18, ease: "power2.out", yoyo: true, repeat: 1 })
      .to("[data-pl-fade]", { opacity: 0, y: -20, duration: 0.35, stagger: 0.04, ease: "power2.in" }, "+=0.05")
      .add(() => setIntroDone(true), "-=0.1")
      .to("[data-pl-top]", { yPercent: -100, duration: 1, ease: "expo.inOut" }, "<")
      .to("[data-pl-bottom]", { yPercent: 100, duration: 1, ease: "expo.inOut" }, "<");
  }

  if (gone) return null;

  return (
    <div ref={root} className="fixed inset-0 z-[100]" role="status" aria-label="Loading">
      <div data-pl-top className="absolute inset-x-0 top-0 h-1/2 bg-ink" />
      <div data-pl-bottom className="absolute inset-x-0 bottom-0 h-1/2 bg-ink" />
      <div className="relative flex h-full flex-col items-center justify-center gap-8 px-6">
        <div data-pl-fade>
          <div data-pl-mascot>
            <Mascot size={96} />
          </div>
        </div>
        <p data-pl-fade className="font-pixel text-[11px] text-sprout md:text-xs">
          Planting your idea<span className="caret">_</span>
        </p>
        <div data-pl-fade ref={bar} className="flex gap-1 border-2 border-bone/20 p-1.5" aria-hidden>
          {Array.from({ length: BLOCKS }, (_, i) => (
            <span key={i} className="block h-4 w-2.5 bg-sprout md:w-3.5" style={{ opacity: 0.12 }} />
          ))}
        </div>
        <p data-pl-fade className="font-pixel text-2xl tabular-nums text-bone md:text-3xl">
          <span ref={num}>000</span>%
        </p>
      </div>
    </div>
  );
}
