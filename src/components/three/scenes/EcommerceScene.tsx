"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox, Float } from "@react-three/drei";
import * as THREE from "three";
import { HeroRig, Dust, useAccent } from "./common";

/** Floating product boxes over a turning glass pedestal. */
const BOXES: { p: [number, number, number]; s: [number, number, number]; c: string }[] = [
  { p: [0, 0.45, 0], s: [0.9, 0.9, 0.9], c: "#7c5cff" },
  { p: [-0.95, 0.05, 0.3], s: [0.6, 0.75, 0.45], c: "#3de3f5" },
  { p: [0.9, 0.0, -0.2], s: [0.55, 0.55, 0.55], c: "#ff5fa2" },
  { p: [0.35, 1.35, 0.4], s: [0.42, 0.42, 0.42], c: "#ffb547" },
  { p: [-0.5, 1.2, -0.45], s: [0.35, 0.5, 0.35], c: "#eeeaf7" },
];

export default function EcommerceScene({ accent }: { accent: string }) {
  const color = useAccent(accent);
  const pedestal = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Mesh>(null);
  useFrame((st, dt) => {
    if (pedestal.current) pedestal.current.rotation.y += dt * 0.35;
    if (ring.current) (ring.current.material as THREE.MeshStandardMaterial).emissiveIntensity = 1.2 + Math.sin(st.clock.elapsedTime * 2) * 0.4;
  });
  return (
    <>
      <Dust color="#9ef2ff" />
      <HeroRig>
        <group rotation={[0.3, 0, 0]} position={[0, -0.2, 0]}>
          <group ref={pedestal}>
            <mesh position={[0, -0.75, 0]}>
              <cylinderGeometry args={[1.7, 1.85, 0.3, 64]} />
              <meshPhysicalMaterial color="#120e22" roughness={0.18} metalness={0.85} clearcoat={1} />
            </mesh>
            <mesh ref={ring} position={[0, -0.59, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <torusGeometry args={[1.6, 0.02, 8, 96]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.4} />
            </mesh>
            {BOXES.map((b, i) => (
              <Float key={i} speed={1.5 + i * 0.2} floatIntensity={0.5} rotationIntensity={0.6}>
                <group position={b.p}>
                  <RoundedBox args={b.s} radius={0.06} smoothness={3}>
                    <meshPhysicalMaterial color={b.c} roughness={0.25} clearcoat={1} metalness={0.1} emissive={b.c} emissiveIntensity={0.12} />
                  </RoundedBox>
                  {/* ribbon band */}
                  <mesh>
                    <boxGeometry args={[b.s[0] + 0.01, b.s[1] + 0.01, 0.08]} />
                    <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.15} />
                  </mesh>
                </group>
              </Float>
            ))}
          </group>
        </group>
      </HeroRig>
    </>
  );
}
