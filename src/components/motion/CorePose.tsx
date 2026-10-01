"use client";

import { useRef, type ReactNode } from "react";
import { ScrollTrigger, useGSAP } from "@/lib/gsap";
import { motionState, type CorePose as Pose } from "@/lib/store";

/**
 * Wraps a home-page chapter and tells the 3D Core where to sit while that
 * chapter occupies the middle of the viewport. This is the scroll-driven
 * storytelling spine of the home page.
 */
export function CorePose({ pose, children, className, id }: { pose: Pose; children: ReactNode; className?: string; id?: string }) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      if (!ref.current) return;
      const st = ScrollTrigger.create({
        trigger: ref.current,
        start: "top 55%",
        end: "bottom 45%",
        onToggle: (self) => {
          if (self.isActive) motionState.pose = pose;
        },
      });
      return () => st.kill();
    },
    { scope: ref },
  );
  return (
    <section ref={ref} className={className} id={id}>
      {children}
    </section>
  );
}
