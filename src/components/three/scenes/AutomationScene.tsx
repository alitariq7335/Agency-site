"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { HeroRig, Dust, useAccent } from "./common";

/**
 * A workflow graph: inputs on the left flow through a central AI node and out
 * to tools on the right, with data packets travelling along every link.
 */
const NODES: { p: [number, number, number]; size: number; hub?: boolean; color: string }[] = [
  { p: [-2, 1.1, 0], size: 0.42, color: "#7BE04F" },
  { p: [-2.2, 0, 0.3], size: 0.42, color: "#FF7AC8" },
  { p: [-2, -1.1, 0], size: 0.42, color: "#FFD23F" },
  { p: [0, 0, 0.2], size: 0.8, hub: true, color: "#A66BFF" },
  { p: [2, 1.2, -0.1], size: 0.42, color: "#F6F0FF" },
  { p: [2.2, 0.1, 0.2], size: 0.42, color: "#7BE04F" },
  { p: [2, -1.1, -0.1], size: 0.42, color: "#FFD23F" },
];
const EDGES: [number, number][] = [
  [0, 3],
  [1, 3],
  [2, 3],
  [3, 4],
  [3, 5],
  [3, 6],
];

export default function AutomationScene({ accent }: { accent: string }) {
  const color = useAccent(accent);
  const hub = useRef<THREE.Mesh>(null);
  const packets = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const curves = useMemo(
    () =>
      EDGES.map(([a, b]) => {
        const A = new THREE.Vector3(...NODES[a].p);
        const B = new THREE.Vector3(...NODES[b].p);
        const mid = A.clone().lerp(B, 0.5);
        mid.z += 0.5;
        return new THREE.QuadraticBezierCurve3(A, mid, B);
      }),
    [],
  );
  const tubes = useMemo(() => curves.map((c) => new THREE.TubeGeometry(c, 40, 0.018, 6, false)), [curves]);
  const PER = 3;

  useFrame((st) => {
    const t = st.clock.elapsedTime;
    if (hub.current) {
      hub.current.rotation.y = t * 0.6;
      hub.current.rotation.x = Math.sin(t * 0.8) * 0.3;
      (hub.current.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.6 + Math.sin(t * 3) * 0.25;
    }
    const m = packets.current;
    if (!m) return;
    let i = 0;
    curves.forEach((c, ei) => {
      for (let k = 0; k < PER; k++) {
        // inputs flow in first, then results flow out
        const phase = (t * 0.45 + k / PER + (ei >= 3 ? 0.5 : 0)) % 1;
        c.getPoint(phase, dummy.position);
        dummy.scale.setScalar(Math.sin(phase * Math.PI) * 1 + 0.001);
        dummy.updateMatrix();
        m.setMatrixAt(i++, dummy.matrix);
      }
    });
    m.instanceMatrix.needsUpdate = true;
  });

  return (
    <>
      <Dust color="#c9a7ff" />
      <HeroRig scale={0.9}>
        <group rotation={[0.15, -0.35, 0]}>
          {tubes.map((g, i) => (
            <mesh key={i} geometry={g}>
              <meshBasicMaterial color={color} transparent opacity={0.45} />
            </mesh>
          ))}
          {NODES.map((n, i) =>
            n.hub ? (
              <mesh key={i} ref={hub} position={n.p}>
                <icosahedronGeometry args={[n.size * 0.75, 0]} />
                <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} flatShading roughness={0.3} />
              </mesh>
            ) : (
              <RoundedBox key={i} args={[n.size, n.size, n.size]} radius={0.05} position={n.p}>
                <meshStandardMaterial color={n.color} emissive={n.color} emissiveIntensity={0.15} roughness={0.4} />
              </RoundedBox>
            ),
          )}
          <instancedMesh ref={packets} args={[undefined, undefined, EDGES.length * PER]}>
            <boxGeometry args={[0.09, 0.09, 0.09]} />
            <meshBasicMaterial color="#FFD23F" />
          </instancedMesh>
        </group>
      </HeroRig>
    </>
  );
}
