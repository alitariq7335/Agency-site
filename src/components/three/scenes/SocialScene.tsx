"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { HeroRig, Dust, seeded, useAccent } from "./common";

function heartShape() {
  const s = new THREE.Shape();
  s.moveTo(0, 0.25);
  s.bezierCurveTo(0, 0.3, -0.05, 0.4, -0.2, 0.4);
  s.bezierCurveTo(-0.45, 0.4, -0.45, 0.12, -0.45, 0.12);
  s.bezierCurveTo(-0.45, -0.05, -0.3, -0.22, 0, -0.38);
  s.bezierCurveTo(0.3, -0.22, 0.45, -0.05, 0.45, 0.12);
  s.bezierCurveTo(0.45, 0.12, 0.45, 0.4, 0.2, 0.4);
  s.bezierCurveTo(0.05, 0.4, 0, 0.3, 0, 0.25);
  return s;
}

/** A phone orbited by chat bubbles and hearts. Click an item to pop it. */
export default function SocialScene({ accent }: { accent: string }) {
  const color = useAccent(accent);
  const items = useMemo(() => {
    const r = seeded(21);
    return Array.from({ length: 12 }, (_, i) => ({
      kind: i % 3 === 0 ? "heart" : "bubble",
      radius: 1.6 + r() * 0.9,
      speed: 0.25 + r() * 0.3,
      phase: r() * Math.PI * 2,
      y: (r() - 0.5) * 2.2,
      tint: i % 4 === 0 ? "#3de3f5" : i % 4 === 1 ? "#7c5cff" : "#ff5fa2",
    }));
  }, []);
  const refs = useRef<(THREE.Group | null)[]>([]);
  const pop = useRef<number[]>(items.map(() => 0));
  const heartGeo = useMemo(
    () => new THREE.ExtrudeGeometry(heartShape(), { depth: 0.12, bevelEnabled: true, bevelSize: 0.03, bevelThickness: 0.03, bevelSegments: 3 }),
    [],
  );
  const screen = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((st, dt) => {
    const t = st.clock.elapsedTime;
    items.forEach((it, i) => {
      const g = refs.current[i];
      if (!g) return;
      const a = it.phase + t * it.speed;
      g.position.set(Math.cos(a) * it.radius, it.y + Math.sin(t + i) * 0.12, Math.sin(a) * it.radius);
      g.rotation.y = -a + Math.PI / 2;
      // popped items shrink to zero, then regrow
      pop.current[i] = Math.max(0, pop.current[i] - dt * 0.6);
      const p = pop.current[i];
      const s = p > 0 ? Math.max(0.001, 1 - Math.sin(Math.min(1, p) * Math.PI) * 1.4) : 1;
      g.scale.setScalar(s);
    });
    if (screen.current) screen.current.emissiveIntensity = 0.55 + Math.sin(t * 2) * 0.1;
  });

  return (
    <>
      <Dust color="#ffb3d4" />
      <HeroRig>
        <group rotation={[0.1, -0.3, 0.05]}>
          <RoundedBox args={[1.25, 2.5, 0.12]} radius={0.16} smoothness={4}>
            <meshPhysicalMaterial color="#17132a" roughness={0.2} metalness={0.6} clearcoat={1} />
          </RoundedBox>
          <RoundedBox args={[1.1, 2.3, 0.02]} radius={0.1} smoothness={3} position={[0, 0, 0.065]}>
            <meshStandardMaterial ref={screen} color={color} emissive={color} emissiveIntensity={0.55} roughness={0.4} />
          </RoundedBox>
          {[0.7, 0.35, 0, -0.35].map((y, i) => (
            <RoundedBox key={i} args={[i % 2 ? 0.6 : 0.8, 0.22, 0.02]} radius={0.05} position={[i % 2 ? 0.17 : -0.07, y, 0.09]}>
              <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.2} transparent opacity={0.85} />
            </RoundedBox>
          ))}
          {items.map((it, i) => (
            <group
              key={i}
              ref={(el) => {
                refs.current[i] = el;
              }}
              onClick={(e) => {
                e.stopPropagation();
                if (pop.current[i] === 0) pop.current[i] = 1.6;
              }}
            >
              {it.kind === "heart" ? (
                <mesh geometry={heartGeo} scale={0.55} rotation={[0, 0, 0]}>
                  <meshStandardMaterial color="#ff5fa2" emissive="#ff2f7f" emissiveIntensity={0.6} roughness={0.3} />
                </mesh>
              ) : (
                <group>
                  <RoundedBox args={[0.62, 0.38, 0.1]} radius={0.12} smoothness={3}>
                    <meshPhysicalMaterial color={it.tint} emissive={it.tint} emissiveIntensity={0.25} roughness={0.15} clearcoat={1} transparent opacity={0.9} />
                  </RoundedBox>
                  {[-0.14, 0, 0.14].map((x) => (
                    <mesh key={x} position={[x, 0, 0.06]}>
                      <circleGeometry args={[0.035, 16]} />
                      <meshBasicMaterial color="#fff" />
                    </mesh>
                  ))}
                </group>
              )}
            </group>
          ))}
        </group>
      </HeroRig>
    </>
  );
}
