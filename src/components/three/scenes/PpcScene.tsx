"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { motionState } from "@/lib/store";
import { HeroRig, Dust, seeded, useAccent } from "./common";

/** Clicks stream into a funnel and come out the bottom as coins. */
const P = 1400;
const COINS = 14;

export default function PpcScene({ accent }: { accent: string }) {
  const color = useAccent(accent);
  const pts = useRef<THREE.Points>(null);
  const coins = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const seeds = useMemo(() => {
    const r = seeded(5);
    return Array.from({ length: P }, () => ({ a: r() * Math.PI * 2, off: r(), sp: 0.12 + r() * 0.12, j: r() }));
  }, []);
  const coinSeeds = useMemo(() => {
    const r = seeded(9);
    return Array.from({ length: COINS }, () => ({ off: r(), x: (r() - 0.5) * 0.5, z: (r() - 0.5) * 0.5, spin: 1 + r() * 2 }));
  }, []);
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(P * 3), 3));
    return g;
  }, []);

  useFrame((st) => {
    const t = st.clock.elapsedTime;
    const speed = 1 + Math.min(2, Math.hypot(motionState.pointer.x, motionState.pointer.y) * 1.2);
    const arr = geo.attributes.position.array as Float32Array;
    for (let i = 0; i < P; i++) {
      const s = seeds[i];
      const p = (s.off + t * s.sp * speed) % 1; // 0 top -> 1 funnel throat
      const y = 2.0 - p * 2.6;
      const radius = 0.12 + Math.pow(1 - p, 1.6) * 2.1 + s.j * 0.08;
      const a = s.a + p * 9;
      arr[i * 3] = Math.cos(a) * radius;
      arr[i * 3 + 1] = y;
      arr[i * 3 + 2] = Math.sin(a) * radius;
    }
    geo.attributes.position.needsUpdate = true;
    const m = coins.current;
    if (m) {
      for (let i = 0; i < COINS; i++) {
        const c = coinSeeds[i];
        const p = (c.off + t * 0.35 * speed) % 1;
        dummy.position.set(c.x * (1 + p * 2), -0.7 - p * 1.6, c.z * (1 + p * 2));
        dummy.rotation.set(Math.PI / 2 + t * c.spin, t * c.spin * 0.7, 0);
        dummy.scale.setScalar(Math.sin(p * Math.PI) * 1.1 + 0.001);
        dummy.updateMatrix();
        m.setMatrixAt(i, dummy.matrix);
      }
      m.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <>
      <Dust color="#ffd89a" />
      <HeroRig scale={0.78}>
        <group rotation={[0.2, 0, 0]} position={[0, -0.1, 0]}>
          <points ref={pts} geometry={geo}>
            <pointsMaterial color={color} size={0.035} sizeAttenuation transparent opacity={0.9} depthWrite={false} blending={THREE.AdditiveBlending} />
          </points>
          <mesh position={[0, 0.3, 0]}>
            <cylinderGeometry args={[2.2, 0.14, 2.6, 48, 1, true]} />
            <meshBasicMaterial color={color} wireframe transparent opacity={0.07} />
          </mesh>
          <instancedMesh ref={coins} args={[undefined, undefined, COINS]}>
            <cylinderGeometry args={[0.2, 0.2, 0.045, 32]} />
            <meshStandardMaterial color="#ffc94d" emissive="#ff9d1a" emissiveIntensity={0.45} metalness={0.9} roughness={0.25} />
          </instancedMesh>
        </group>
      </HeroRig>
    </>
  );
}
