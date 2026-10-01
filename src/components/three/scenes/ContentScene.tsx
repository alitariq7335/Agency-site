"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { HeroRig, Dust, seeded, useAccent } from "./common";

/** Pages fan out along a spiral while ribbons of "text" flow through them. */
const PAGES = 9;

export default function ContentScene({ accent }: { accent: string }) {
  const color = useAccent(accent);
  const pages = useRef<(THREE.Group | null)[]>([]);
  const ribbonMats = useRef<(THREE.MeshBasicMaterial | null)[]>([]);
  const lines = useMemo(() => {
    const r = seeded(13);
    return Array.from({ length: PAGES }, () => Array.from({ length: 6 }, () => 0.35 + r() * 0.45));
  }, []);
  const ribbons = useMemo(() => {
    const r = seeded(17);
    return Array.from({ length: 4 }, (_, k) => {
      const pts: THREE.Vector3[] = [];
      for (let i = 0; i <= 40; i++) {
        const a = (i / 40) * Math.PI * 3 + k;
        pts.push(new THREE.Vector3(Math.cos(a) * (1.8 + k * 0.15), (i / 40 - 0.5) * 3.2 + (r() - 0.5) * 0.1, Math.sin(a) * (1.8 + k * 0.15)));
      }
      const curve = new THREE.CatmullRomCurve3(pts);
      return new THREE.TubeGeometry(curve, 160, 0.012 + k * 0.004, 6, false);
    });
  }, []);

  useFrame((st) => {
    const t = st.clock.elapsedTime;
    pages.current.forEach((g, i) => {
      if (!g) return;
      const a = (i / PAGES) * Math.PI * 2 + t * 0.25;
      const open = 0.5 + Math.sin(t * 0.6 + i * 0.5) * 0.5;
      g.position.set(Math.cos(a) * 1.25 * open, (i - PAGES / 2) * 0.18, Math.sin(a) * 1.25 * open);
      g.rotation.set(0, -a + Math.PI / 2, Math.sin(t + i) * 0.08);
    });
    ribbonMats.current.forEach((m, i) => {
      if (m) m.opacity = 0.35 + Math.sin(t * 1.5 + i) * 0.2;
    });
  });

  return (
    <>
      <Dust color="#9ef2ff" />
      <HeroRig scale={0.8}>
        <group rotation={[0.25, 0, -0.1]}>
          {ribbons.map((geo, i) => (
            <mesh key={i} geometry={geo} rotation={[0, i * 0.8, 0]}>
              <meshBasicMaterial
                ref={(m) => {
                  ribbonMats.current[i] = m;
                }}
                color={i % 2 ? "#7c5cff" : color}
                transparent
                opacity={0.5}
              />
            </mesh>
          ))}
          {lines.map((ls, i) => (
            <group
              key={i}
              ref={(el) => {
                pages.current[i] = el;
              }}
            >
              <RoundedBox args={[0.9, 1.2, 0.015]} radius={0.03} smoothness={2}>
                <meshPhysicalMaterial color="#eeeaf7" roughness={0.5} transparent opacity={0.9} />
              </RoundedBox>
              <mesh position={[-0.12, 0.42, 0.01]}>
                <planeGeometry args={[0.55, 0.08]} />
                <meshBasicMaterial color={color} />
              </mesh>
              {ls.map((w, j) => (
                <mesh key={j} position={[-0.38 + w / 2, 0.22 - j * 0.12, 0.01]}>
                  <planeGeometry args={[w, 0.035]} />
                  <meshBasicMaterial color="#6b6585" />
                </mesh>
              ))}
            </group>
          ))}
        </group>
      </HeroRig>
    </>
  );
}
