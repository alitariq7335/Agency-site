"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useSceneStore } from "@/lib/store";
import { site } from "@/content/site";

const KEY = "intro-seen";

/**
 * 000 → 100 counter tied to real readiness (fonts + first 3D frame), capped at
 * ~2.6s, then the two curtains part. Skipped on repeat visits in a session.
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

  // Skip on repeat visits within the session.
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
    // Climb toward 90% while waiting; readiness pushes to 100.
    const tw = gsap.to(progress.current, {
      v: 90,
      duration: 2,
      ease: "power2.out",
      onUpdate: render,
    });
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
    if (bar.current) bar.current.style.transform = `scaleX(${v / 100})`;
  }

  function finish() {
    if (finished.current || !root.current) return;
    finished.current = true;
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {}
    const tl = gsap.timeline({
      onComplete: () => setGone(true),
    });
    tl.to(progress.current, { v: 100, duration: 0.45, ease: "power3.out", onUpdate: render })
      .to("[data-pl-fade]", { opacity: 0, y: -20, duration: 0.4, stagger: 0.04, ease: "power2.in" }, "+=0.1")
      .add(() => setIntroDone(true), "-=0.1")
      .to("[data-pl-top]", { yPercent: -100, duration: 1.1, ease: "expo.inOut" }, "<")
      .to("[data-pl-bottom]", { yPercent: 100, duration: 1.1, ease: "expo.inOut" }, "<");
  }

  if (gone) return null;

  return (
    <div ref={root} className="fixed inset-0 z-[100]" role="status" aria-label="Loading">
      <div data-pl-top className="absolute inset-x-0 top-0 h-1/2 bg-ink" />
      <div data-pl-bottom className="absolute inset-x-0 bottom-0 h-1/2 bg-ink" />
      <div className="container-x relative flex h-full flex-col justify-between py-8">
        <div data-pl-fade className="flex items-center justify-between text-sm text-haze">
          <span className="font-display text-base text-bone">{site.name}</span>
          <span>Loading something worth the wait</span>
        </div>
        <div>
          <div data-pl-fade className="font-display text-[clamp(5rem,22vw,20rem)] leading-none tracking-[-0.06em] tabular-nums">
            <span ref={num}>000</span>
            <span className="iris-text">%</span>
          </div>
          <div data-pl-fade className="mt-6 h-px w-full bg-line">
            <div ref={bar} className="h-px origin-left scale-x-0 bg-gradient-to-r from-violet via-flare to-cyan" />
          </div>
        </div>
      </div>
    </div>
  );
}
