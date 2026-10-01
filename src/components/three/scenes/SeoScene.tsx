"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { HeroRig, Dust, seeded, useAccent } from "./common";

/** A skyline of ranking bars that rise as you arrive; the #1 tower glows. */
const N = 9;

export default function SeoScene({ accent }: { accent: string }) {
  const color = useAccent(accent);
  const inst = useRef<THREE.InstancedMesh>(null);
  const tower = useRef<THREE.Mesh>(null);
  const ring = useRef<THREE.Mesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const heights = useMemo(() => {
    const r = seeded(11);
    const arr: number[] = [];
    for (let x = 0; x < N; x++)
      for (let z = 0; z < N; z++) {
        const d = Math.hypot(x - (N - 1) / 2, z - (N - 1) / 2);
        arr.push(0.15 + r() * 0.9 * Math.max(0.15, 1 - d / 6));
      }
    return arr;
  }, []);

  useEffect(() => {
    const m = inst.current;
    if (!m) return;
    const c = new THREE.Color();
    for (let i = 0; i < N * N; i++) {
      const h = heights[i];
      c.set("#2a2540").lerp(color, Math.min(1, h * 0.9));
      m.setColorAt(i, c);
    }
    if (m.instanceColor) m.instanceColor.needsUpdate = true;
  }, [heights, color]);

  useFrame((st) => {
    const t = st.clock.elapsedTime;
    const m = inst.current;
    if (!m) return;
    const grow = Math.min(1, t / 2.2);
    const e = 1 - Math.pow(1 - grow, 3);
    let i = 0;
    for (let x = 0; x < N; x++)
      for (let z = 0; z < N; z++) {
        const center = x === 4 && z === 4;
        const wave = 1 + Math.sin(t * 1.2 + x * 0.6 + z * 0.4) * 0.12;
        const h = center ? 0.001 : heights[i] * 2.2 * e * wave;
        dummy.position.set((x - (N - 1) / 2) * 0.34, h / 2 - 1, (z - (N - 1) / 2) * 0.34);
        dummy.scale.set(1, Math.max(0.001, h), 1);
        dummy.updateMatrix();
        m.setMatrixAt(i, dummy.matrix);
        i++;
      }
    m.instanceMatrix.needsUpdate = true;
    if (tower.current) {
      const h = 3.2 * e;
      tower.current.scale.y = Math.max(0.001, h);
      tower.current.position.y = h / 2 - 1;
      (tower.current.material as THREE.MeshStandardMaterial).emissiveIntensity = 1.2 + Math.sin(t * 3) * 0.3;
    }
    if (ring.current) {
      ring.current.position.y = 3.2 * e - 0.85;
      ring.current.rotation.z = t * 0.8;
      const s = 1 + Math.sin(t * 2) * 0.08;
      ring.current.scale.set(s, s, s);
    }
  });

  return (
    <>
      <Dust color="#9ef2ff" />
      <HeroRig scale={0.9}>
        <group rotation={[0.55, 0.6, 0]} position={[0, -0.4, 0]}>
          <instancedMesh ref={inst} args={[undefined, undefined, N * N]}>
            <boxGeometry args={[0.26, 1, 0.26]} />
            <meshStandardMaterial roughness={0.3} metalness={0.4} />
          </instancedMesh>
          <mesh ref={tower}>
            <boxGeometry args={[0.26, 1, 0.26]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.2} roughness={0.2} />
          </mesh>
          <mesh ref={ring} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.32, 0.015, 8, 48]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
          <gridHelper args={[4, 16, color, "#2a2540"]} position={[0, -1, 0]} />
        </group>
      </HeroRig>
    </>
  );
}
