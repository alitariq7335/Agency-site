"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox, Float } from "@react-three/drei";
import * as THREE from "three";
import { HeroRig, Dust, seeded, useAccent } from "./common";

/** A wireframe browser window whose layout panels fly in and lock into place. */
const PANELS: [number, number, number, number, number][] = [
  // x, y, w, h, tone (0 = accent, 1 = light, 2 = muted)
  [0, 0.78, 2.9, 0.16, 2],
  [-0.55, 0.28, 1.8, 0.62, 0],
  [0.95, 0.28, 0.8, 0.62, 1],
  [-1.0, -0.42, 0.9, 0.56, 1],
  [0, -0.42, 0.9, 0.56, 2],
  [1.0, -0.42, 0.9, 0.56, 1],
  [-0.55, -0.92, 1.8, 0.14, 2],
  [0.95, -0.92, 0.8, 0.14, 0],
];

export default function WebScene({ accent }: { accent: string }) {
  const color = useAccent(accent);
  const refs = useRef<(THREE.Mesh | null)[]>([]);
  const frame = useRef<THREE.LineSegments>(null);
  const starts = useMemo(() => {
    const r = seeded(3);
    return PANELS.map(() => ({
      p: new THREE.Vector3((r() - 0.5) * 6, (r() - 0.5) * 4, 2 + r() * 3),
      rot: new THREE.Euler((r() - 0.5) * 2, (r() - 0.5) * 2, (r() - 0.5) * 1.5),
      delay: r() * 0.9,
    }));
  }, []);
  const edges = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(3.2, 2.3, 0.08)), []);
  const tones = useMemo(() => [color, new THREE.Color("#eeeaf7"), new THREE.Color("#2a2540")], [color]);

  useFrame((st) => {
    const t = st.clock.elapsedTime;
    PANELS.forEach(([x, y], i) => {
      const m = refs.current[i];
      if (!m) return;
      const s = starts[i];
      const raw = Math.min(1, Math.max(0, (t - 0.3 - s.delay) / 1.4));
      const e = 1 - Math.pow(1 - raw, 4);
      m.position.set(
        s.p.x + (x - s.p.x) * e,
        s.p.y + (y - s.p.y) * e,
        s.p.z + (0.06 - s.p.z) * e + Math.sin(t * 1.4 + i) * 0.025,
      );
      m.rotation.set(s.rot.x * (1 - e), s.rot.y * (1 - e), s.rot.z * (1 - e));
    });
    if (frame.current) {
      const mat = frame.current.material as THREE.LineBasicMaterial;
      mat.opacity = 0.35 + Math.sin(t * 2) * 0.1;
    }
  });

  return (
    <>
      <Dust color="#b9a8ff" />
      <HeroRig>
        <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.4}>
          <group rotation={[0.08, -0.35, 0]}>
            <RoundedBox args={[3.2, 2.3, 0.06]} radius={0.06} smoothness={3} position={[0, 0, -0.04]}>
              <meshPhysicalMaterial color="#141024" roughness={0.25} metalness={0.3} clearcoat={1} transparent opacity={0.85} />
            </RoundedBox>
            <lineSegments ref={frame} geometry={edges}>
              <lineBasicMaterial color={color} transparent opacity={0.4} />
            </lineSegments>
            {[-1.42, -1.3, -1.18].map((x, i) => (
              <mesh key={i} position={[x, 1.03, 0.03]}>
                <circleGeometry args={[0.035, 16]} />
                <meshBasicMaterial color={i === 0 ? "#ff5fa2" : i === 1 ? "#ffb547" : "#5cffb0"} />
              </mesh>
            ))}
            {PANELS.map(([, , w, h, tone], i) => (
              <RoundedBox
                key={i}
                ref={(el: THREE.Mesh | null) => {
                  refs.current[i] = el;
                }}
                args={[w, h, 0.03]}
                radius={0.02}
                smoothness={2}
              >
                <meshStandardMaterial
                  color={tones[tone]}
                  emissive={tones[tone]}
                  emissiveIntensity={tone === 0 ? 0.55 : 0.08}
                  roughness={0.35}
                  metalness={0.1}
                />
              </RoundedBox>
            ))}
          </group>
        </Float>
      </HeroRig>
    </>
  );
}
