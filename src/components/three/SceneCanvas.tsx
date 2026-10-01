"use client";

import { lazy, Suspense, useEffect, useRef, useState, type ComponentType } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, PerformanceMonitor, AdaptiveDpr } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { usePathname } from "next/navigation";
import { useSceneStore } from "@/lib/store";
import { hasWebGL2 } from "@/lib/utils";
import { useReducedMotion, useIsMobile } from "@/lib/useReducedMotion";
import type { SceneId } from "@/content/types";

type SceneProps = { accent: string };
const scenes: Record<SceneId, React.LazyExoticComponent<ComponentType<SceneProps>>> = {
  core: lazy(() => import("./scenes/CoreScene")),
  helix: lazy(() => import("./scenes/HelixScene")),
  hello: lazy(() => import("./scenes/HelloScene")),
  web: lazy(() => import("./scenes/WebScene")),
  seo: lazy(() => import("./scenes/SeoScene")),
  local: lazy(() => import("./scenes/LocalScene")),
  ppc: lazy(() => import("./scenes/PpcScene")),
  social: lazy(() => import("./scenes/SocialScene")),
  content: lazy(() => import("./scenes/ContentScene")),
  branding: lazy(() => import("./scenes/BrandingScene")),
  email: lazy(() => import("./scenes/EmailScene")),
  ecommerce: lazy(() => import("./scenes/EcommerceScene")),
  maintenance: lazy(() => import("./scenes/MaintenanceScene")),
};

/** Signals the preloader once the first frame of a scene has actually rendered. */
function ReadySignal() {
  const setReady = useSceneStore((s) => s.setSceneReady);
  const done = useRef(false);
  useFrame(() => {
    if (!done.current) {
      done.current = true;
      setReady(true);
    }
  });
  return null;
}

/** Freezes time-based animation when the user prefers reduced motion. */
function FrozenClock({ frozen }: { frozen: boolean }) {
  useFrame((state) => {
    if (frozen) state.clock.elapsedTime = 2.8;
  }, -1);
  return null;
}

function Studio() {
  // Procedural studio lighting for physical materials — no HDR download.
  return (
    <Environment resolution={128} frames={1}>
      <Lightformer form="rect" intensity={3} color="#b9a8ff" position={[0, 4, -6]} scale={[10, 3, 1]} />
      <Lightformer form="rect" intensity={2} color="#3de3f5" position={[-6, 0, 2]} rotation-y={Math.PI / 2} scale={[8, 2, 1]} />
      <Lightformer form="rect" intensity={2} color="#ff5fa2" position={[6, -1, 2]} rotation-y={-Math.PI / 2} scale={[8, 2, 1]} />
      <Lightformer form="ring" intensity={1.5} color="#ffffff" position={[0, 0, 6]} scale={3} />
    </Environment>
  );
}

export default function SceneCanvas() {
  const pathname = usePathname();
  const { scene, accent, quality, webgl, setQuality, setWebgl, setSceneReady } = useSceneStore();
  const reduced = useReducedMotion();
  const mobile = useIsMobile();
  const [shown, setShown] = useState<{ id: SceneId; accent: string }>({ id: scene, accent });
  const declines = useRef(0);

  useEffect(() => {
    if (!hasWebGL2()) setWebgl(false);
  }, [setWebgl]);

  // Cross-fade between scenes on route change.
  useEffect(() => {
    if (scene === shown.id && accent === shown.accent) return;
    const id = window.setTimeout(() => setShown({ id: scene, accent }), 380);
    return () => window.clearTimeout(id);
  }, [scene, accent, shown.id, shown.accent]);

  // Dim the 3D layer once the visitor is well past the hero of inner pages.
  const [dim, setDim] = useState(false);
  useEffect(() => {
    const onScroll = () => setDim(pathname !== "/" && window.scrollY > window.innerHeight * 0.65);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  const visible = scene === shown.id && accent === shown.accent;
  if (!webgl) return <StaticBackdrop />;

  const Scene = scenes[shown.id];
  const high = quality === "high" && !mobile;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-500"
      style={{ opacity: visible ? (dim ? 0.22 : 1) : 0 }}
    >
      <Canvas
        dpr={high ? [1, 1.75] : [1, 1.25]}
        camera={{ position: [0, 0, 7], fov: 40 }}
        gl={{ antialias: high, alpha: false, powerPreference: "high-performance" }}
        eventSource={typeof document !== "undefined" ? document.body : undefined}
        eventPrefix="client"
        onCreated={({ gl }) => {
          gl.setClearColor("#0a0814");
          gl.domElement.addEventListener("webglcontextlost", (e) => {
            e.preventDefault();
            setWebgl(false);
            setSceneReady(true);
          });
        }}
      >
        <PerformanceMonitor
          onDecline={() => {
            declines.current += 1;
            setQuality("low");
            if (declines.current > 3 && mobile) setWebgl(false);
          }}
        >
          <AdaptiveDpr pixelated={false} />
          <FrozenClock frozen={reduced} />
          <ambientLight intensity={0.35} />
          <directionalLight position={[4, 6, 5]} intensity={1.4} color="#ffffff" />
          <pointLight position={[-4, -2, 3]} intensity={18} color="#7c5cff" />
          <Suspense fallback={null}>
            <Studio />
            <Scene accent={shown.accent} />
            <ReadySignal />
          </Suspense>
          {high && (
            <EffectComposer multisampling={0}>
              <Bloom mipmapBlur intensity={0.45} luminanceThreshold={0.6} luminanceSmoothing={0.2} />
            </EffectComposer>
          )}
        </PerformanceMonitor>
      </Canvas>
    </div>
  );
}

/** Shown when WebGL is unavailable: an animated gradient poster, never a blank hero. */
function StaticBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div
        className="absolute right-[-10%] top-[10%] h-[70vmin] w-[70vmin] rounded-full opacity-80 blur-3xl"
        style={{ background: "conic-gradient(from 120deg, #7c5cff, #ff5fa2, #3de3f5, #7c5cff)", animation: "spin 18s linear infinite" }}
      />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}
