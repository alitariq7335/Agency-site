"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { HeroRig, Dust, useAccent } from "./common";

/** A dotted globe that turns to a glowing map pin with ripples. */
export default function LocalScene({ accent }: { accent: string }) {
  const color = useAccent(accent);
  const globe = useRef<THREE.Group>(null);
  const ripples = useRef<(THREE.Mesh | null)[]>([]);
  const pin = useRef<THREE.Group>(null);

  const dots = useMemo(() => {
    const n = 1800;
    const pos = new Float32Array(n * 3);
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < n; i++) {
      const y = 1 - (i / (n - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const th = golden * i;
      // carve rough "continents" with a cheap noise mask
      const x = Math.cos(th) * r;
      const z = Math.sin(th) * r;
      const mask = Math.sin(x * 4.1 + y * 2.3) + Math.cos(z * 3.7 - y * 1.9) + Math.sin(x * z * 6);
      const s = mask > 0.2 ? 1.6 : 1.6 * 0.997;
      pos.set([x * s, y * s, z * s], i * 3);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return g;
  }, []);

  useFrame((st, dt) => {
    const t = st.clock.elapsedTime;
    if (globe.current) globe.current.rotation.y += dt * 0.15;
    ripples.current.forEach((m, i) => {
      if (!m) return;
      const p = ((t * 0.6 + i / 3) % 1);
      m.scale.setScalar(0.2 + p * 1.6);
      (m.material as THREE.MeshBasicMaterial).opacity = (1 - p) * 0.8;
    });
    if (pin.current) pin.current.position.y = 1.62 + Math.abs(Math.sin(t * 2.2)) * 0.18;
  });

  return (
    <>
      <Dust color="#ffb3d4" />
      <HeroRig scale={0.85}>
        <group rotation={[0.35, 0, 0.1]} position={[0, -0.35, 0]}>
          <group ref={globe}>
            <points geometry={dots}>
              <pointsMaterial color="#d9d3ee" size={0.028} sizeAttenuation transparent opacity={0.85} />
            </points>
            <mesh>
              <icosahedronGeometry args={[1.56, 3]} />
              <meshBasicMaterial color={color} wireframe transparent opacity={0.08} />
            </mesh>
            <mesh>
              <sphereGeometry args={[1.5, 48, 48]} />
              <meshStandardMaterial color="#120f20" roughness={0.6} transparent opacity={0.9} />
            </mesh>
          </group>
          {/* pin standing on top of the globe */}
          <group ref={pin} position={[0, 1.62, 0]}>
            <mesh position={[0, 0.42, 0]}>
              <sphereGeometry args={[0.2, 32, 32]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.4} />
            </mesh>
            <mesh position={[0, 0.16, 0]} rotation={[Math.PI, 0, 0]}>
              <coneGeometry args={[0.15, 0.42, 32]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.1} />
            </mesh>
            <mesh position={[0, 0.42, 0.17]}>
              <circleGeometry args={[0.07, 24]} />
              <meshBasicMaterial color="#fff" />
            </mesh>
          </group>
          {[0, 1, 2].map((i) => (
            <mesh
              key={i}
              ref={(el) => {
                ripples.current[i] = el;
              }}
              position={[0, 1.6, 0]}
              rotation={[-Math.PI / 2, 0, 0]}
            >
              <ringGeometry args={[0.3, 0.33, 48]} />
              <meshBasicMaterial color={color} transparent opacity={0.6} side={THREE.DoubleSide} />
            </mesh>
          ))}
        </group>
      </HeroRig>
    </>
  );
}
