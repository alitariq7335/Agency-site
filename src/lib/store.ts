"use client";

import { create } from "zustand";
import type { SceneId } from "@/content/types";

type Quality = "high" | "low";

interface SceneStore {
  scene: SceneId;
  accent: string;
  quality: Quality;
  webgl: boolean;
  sceneReady: boolean;
  introDone: boolean;
  setScene: (scene: SceneId, accent?: string) => void;
  setQuality: (q: Quality) => void;
  setWebgl: (ok: boolean) => void;
  setSceneReady: (ok: boolean) => void;
  setIntroDone: (ok: boolean) => void;
}

export const useSceneStore = create<SceneStore>((set) => ({
  scene: "core",
  accent: "#7C5CFF",
  quality: "high",
  webgl: true,
  sceneReady: false,
  introDone: false,
  setScene: (scene, accent = "#7C5CFF") => set({ scene, accent }),
  setQuality: (quality) => set({ quality }),
  setWebgl: (webgl) => set({ webgl }),
  setSceneReady: (sceneReady) => set({ sceneReady }),
  setIntroDone: (introDone) => set({ introDone }),
}));

/**
 * Mutable, render-free state shared between DOM scroll logic (GSAP) and the
 * 3D scenes (read inside useFrame). Mutating it never triggers a React render.
 */
export type CorePose = "hero" | "manifesto" | "services" | "aside" | "away" | "finale";

export const motionState = {
  /** where the home "Core" should sit — set by sections as they enter */
  pose: "hero" as CorePose,
  /** 0..1 progress through the whole page */
  page: 0,
  /** 0..1 progress through the home "services" chapter */
  services: 0,
  /** active service index in the services chapter */
  activeService: 0,
  /** smoothed scroll velocity (px/frame-ish) */
  velocity: 0,
  /** normalised pointer, -1..1 */
  pointer: { x: 0, y: 0 },
  /** true once the visitor has moved a mouse/finger */
  pointerActive: false,
  /** extra user-driven rotation (drag) */
  drag: 0,
  /** incremented when the user clicks the hero (used by some scenes) */
  pulse: 0,
};
