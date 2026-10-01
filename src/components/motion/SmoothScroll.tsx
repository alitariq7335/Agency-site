"use client";

import { ReactLenis, type LenisRef } from "lenis/react";
import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { motionState } from "@/lib/store";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * Lenis smooth scroll driven by GSAP's ticker so ScrollTrigger and Lenis
 * share one animation frame. Also tracks global page progress, scroll
 * velocity and pointer position for the 3D scenes.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);
  const reduced = useReducedMotion();
  const pathname = usePathname();

  useEffect(() => {
    if (reduced) return;
    const update = (time: number) => lenisRef.current?.lenis?.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    const lenis = lenisRef.current?.lenis;
    const onScroll = () => ScrollTrigger.update();
    lenis?.on("scroll", onScroll);
    return () => {
      gsap.ticker.remove(update);
      lenis?.off("scroll", onScroll);
    };
  }, [reduced]);

  // Page progress + velocity, independent of Lenis so it works with reduced motion too.
  useEffect(() => {
    let last = window.scrollY;
    const tick = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const y = window.scrollY;
      motionState.page = max > 0 ? y / max : 0;
      motionState.velocity += (y - last - motionState.velocity) * 0.2;
      last = y;
    };
    gsap.ticker.add(tick);
    const onMove = (e: PointerEvent) => {
      motionState.pointerActive = true;
      motionState.pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      motionState.pointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  // Reset scroll on route change and refresh triggers once the new page lays out.
  useEffect(() => {
    lenisRef.current?.lenis?.scrollTo(0, { immediate: true });
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  if (reduced) return <>{children}</>;

  return (
    <ReactLenis root ref={lenisRef} options={{ autoRaf: false, lerp: 0.1, wheelMultiplier: 1, anchors: { offset: -80 } }}>
      {children}
    </ReactLenis>
  );
}
