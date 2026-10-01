"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { motionState } from "@/lib/store";
import { createIridescentMaterial } from "../materials/IridescentMaterial";
import { HeroRig, Dust } from "./common";

/** A logo-mark that morphs sphere -> rounded cube -> torus. Click to cycle. */
const PALETTES = ["#b18cff", "#3de3f5", "#ff5fa2", "#ffb547"];

export default function BrandingScene({ accent }: { accent: string }) {
  const shapes = useRef<(THREE.Mesh | null)[]>([]);
  const mats = useMemo(() => [0, 1, 2].map(() => createIridescentMaterial(accent)), [accent]);
  const state = useRef({ idx: 0, lastPulse: motionState.pulse, timer: 0, colorIdx: 0 });
  const target = useMemo(() => new THREE.Color(accent), [accent]);

  useEffect(() => {
    const onClick = (e: PointerEvent) => {
      const el = e.target as Element | null;
      if (!el?.closest?.("[data-scene-hit]") || el.closest("a,button")) return;
      state.current.idx = (state.current.idx + 1) % 3;
      state.current.colorIdx = (state.current.colorIdx + 1) % PALETTES.length;
      state.current.timer = 0;
    };
    window.addEventListener("pointerdown", onClick);
    return () => {
      window.removeEventListener("pointerdown", onClick);
      mats.forEach((m) => m.dispose());
    };
  }, [mats]);

  useFrame((st, dt) => {
    const t = st.clock.elapsedTime;
    const S = state.current;
    S.timer += dt;
    if (S.timer > 3.6) {
      S.idx = (S.idx + 1) % 3;
      S.timer = 0;
      S.colorIdx = (S.colorIdx + 1) % PALETTES.length;
    }
    target.set(PALETTES[S.colorIdx]);
    const k = 1 - Math.exp(-dt * 5);
    shapes.current.forEach((m, i) => {
      if (!m) return;
      const on = i === S.idx ? 1 : 0;
      const s = m.scale.x + (on * 1 - m.scale.x) * k;
      m.scale.setScalar(Math.max(0.0001, s));
      m.rotation.x = t * 0.3 + i;
      m.rotation.y = t * 0.45;
      const mat = mats[i];
      mat.uniforms.uTime.value = t;
      mat.uniforms.uAmp.value = 0.06 + (1 - Math.min(1, s)) * 0.3;
      (mat.uniforms.uAccent.value as THREE.Color).lerp(target, k);
    });
  });

  return (
    <>
      <Dust color="#d4c3ff" />
      <HeroRig>
        <mesh ref={(el) => { shapes.current[0] = el; }} material={mats[0]}>
          <icosahedronGeometry args={[1.25, 64]} />
        </mesh>
        <mesh ref={(el) => { shapes.current[1] = el; }} material={mats[1]} scale={0.0001}>
          <boxGeometry args={[1.7, 1.7, 1.7, 48, 48, 48]} />
        </mesh>
        <mesh ref={(el) => { shapes.current[2] = el; }} material={mats[2]} scale={0.0001}>
          <torusGeometry args={[1, 0.42, 64, 160]} />
        </mesh>
      </HeroRig>
    </>
  );
}
