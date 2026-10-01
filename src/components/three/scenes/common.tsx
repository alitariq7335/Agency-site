"use client";

import { useMemo, useRef, type ReactNode } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { motionState } from "@/lib/store";

/** Stable seeded random so scenes look identical on every load. */
export function seeded(seed = 1) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

/**
 * Wraps a service hero scene: places it on the right on desktop / top on
 * mobile, tilts toward the pointer, and drifts up + shrinks as the hero
 * scrolls away so the scene becomes an ambient backdrop.
 */
export function HeroRig({ children, scale = 1 }: { children: ReactNode; scale?: number }) {
  const ref = useRef<THREE.Group>(null);
  const { viewport, size } = useThree();
  const mobile = size.width < 768;
  useFrame((_, dt) => {
    const g = ref.current;
    if (!g) return;
    const p = Math.min(1, window.scrollY / Math.max(1, window.innerHeight));
    const k = 1 - Math.exp(-dt * 4);
    const baseX = mobile ? 0 : viewport.width * 0.25;
    const baseY = mobile ? viewport.height * 0.18 : 0;
    g.position.x += (baseX - g.position.x) * k;
    g.position.y += (baseY + p * viewport.height * 0.35 - g.position.y) * k;
    const s = (mobile ? 0.55 : 0.85) * scale * (1 - p * 0.35);
    g.scale.setScalar(g.scale.x + (s - g.scale.x) * k);
    g.rotation.y += (motionState.pointer.x * 0.35 + motionState.drag - g.rotation.y) * k;
    g.rotation.x += (-motionState.pointer.y * 0.2 - g.rotation.x) * k;
  });
  return <group ref={ref}>{children}</group>;
}

/** Faint field of stars/dust giving depth behind every scene. */
export function Dust({ count = 900, radius = 14, color = "#b9a8ff", size = 0.025 }) {
  const ref = useRef<THREE.Points>(null);
  const geo = useMemo(() => {
    const rnd = seeded(7);
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = radius * (0.35 + rnd() * 0.65);
      const th = rnd() * Math.PI * 2;
      const ph = Math.acos(2 * rnd() - 1);
      pos[i * 3] = r * Math.sin(ph) * Math.cos(th);
      pos[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th) * 0.6;
      pos[i * 3 + 2] = r * Math.cos(ph) - radius * 0.4;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return g;
  }, [count, radius]);
  useFrame((_, dt) => {
    if (!ref.current) return;
    ref.current.rotation.y += dt * 0.012 + motionState.velocity * 0.00008;
  });
  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial color={color} size={size} sizeAttenuation transparent opacity={0.55} depthWrite={false} />
    </points>
  );
}

export function useAccent(hex: string) {
  return useMemo(() => new THREE.Color(hex), [hex]);
}
