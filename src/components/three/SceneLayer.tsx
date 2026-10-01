"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useSceneStore } from "@/lib/store";
import type { SceneId } from "@/content/types";

// WebGL never runs on the server; the 3D bundle loads after the page's HTML and text paint.
const SceneCanvas = dynamic(() => import("./SceneCanvas"), { ssr: false });

export function SceneLayer() {
  return <SceneCanvas />;
}

/** Drop into any page to choose which 3D scene sits behind it. */
export function SetScene({ id, accent }: { id: SceneId; accent?: string }) {
  const setScene = useSceneStore((s) => s.setScene);
  useEffect(() => {
    setScene(id, accent);
  }, [id, accent, setScene]);
  return null;
}
