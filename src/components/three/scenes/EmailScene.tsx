"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { motionState } from "@/lib/store";
import { HeroRig, Dust, seeded, useAccent } from "./common";

/** A flock of paper planes streams into a glowing inbox portal; the cursor steers them. */
const N = 36;

function planeGeometry() {
  // simple folded paper plane: two wings + keel
  const g = new THREE.BufferGeometry();
  const v = new Float32Array([
    0, 0, 0.5, -0.35, 0, -0.3, 0, 0.02, -0.15,
    0, 0, 0.5, 0, 0.02, -0.15, 0.35, 0, -0.3,
    0, 0, 0.5, 0, 0.02, -0.15, 0, -0.14, -0.25,
  ]);
  g.setAttribute("position", new THREE.BufferAttribute(v, 3));
  g.computeVertexNormals();
  return g;
}

export default function EmailScene({ accent }: { accent: string }) {
  const color = useAccent(accent);
  const inst = useRef<THREE.InstancedMesh>(null);
  const portal = useRef<THREE.Group>(null);
  const geo = useMemo(() => planeGeometry(), []);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const birds = useMemo(() => {
    const r = seeded(31);
    return Array.from({ length: N }, () => ({ off: r(), lane: (r() - 0.5) * 2, h: (r() - 0.5) * 1.6, sp: 0.1 + r() * 0.08, wob: r() * 6 }));
  }, []);
  const prev = useMemo(() => new THREE.Vector3(), []);
  const next = useMemo(() => new THREE.Vector3(), []);

  const path = (b: (typeof birds)[number], p: number, t: number, out: THREE.Vector3) => {
    // from far left/back toward portal at origin-right
    const steerY = motionState.pointer.y * 0.8;
    const steerX = motionState.pointer.x * 0.5;
    const x = -4 + p * 5.6;
    const conv = 1 - p; // converge as they approach the portal
    out.set(
      x,
      (b.h + Math.sin(t * 1.5 + b.wob) * 0.25 + steerY) * conv + 0.0,
      (b.lane + Math.cos(t * 1.2 + b.wob) * 0.2 + steerX) * conv,
    );
    return out;
  };

  useFrame((st) => {
    const t = st.clock.elapsedTime;
    const m = inst.current;
    if (m) {
      birds.forEach((b, i) => {
        const p = (b.off + t * b.sp) % 1;
        path(b, p, t, dummy.position);
        path(b, Math.min(1, p + 0.01), t, next);
        prev.copy(dummy.position);
        dummy.lookAt(next);
        const s = p > 0.9 ? (1 - p) * 10 : Math.min(1, p * 8);
        dummy.scale.setScalar(0.42 * s + 0.0001);
        dummy.updateMatrix();
        m.setMatrixAt(i, dummy.matrix);
      });
      m.instanceMatrix.needsUpdate = true;
    }
    if (portal.current) {
      portal.current.rotation.z = t * 0.5;
      portal.current.children.forEach((c, i) => {
        c.scale.setScalar(1 + Math.sin(t * 2 + i) * 0.04);
      });
    }
  });

  return (
    <>
      <Dust color="#c9b8ff" />
      <HeroRig>
        <group rotation={[0.15, -0.5, 0]}>
          <instancedMesh ref={inst} args={[geo, undefined, N]}>
            <meshStandardMaterial color="#f3f0ff" emissive={color} emissiveIntensity={0.15} side={THREE.DoubleSide} roughness={0.5} />
          </instancedMesh>
          <group ref={portal} position={[1.6, 0, 0]} rotation={[0, Math.PI / 2 - 0.85, 0]}>
            <mesh>
              <torusGeometry args={[0.9, 0.05, 16, 96]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.6} />
            </mesh>
            <mesh>
              <torusGeometry args={[1.12, 0.012, 8, 96]} />
              <meshBasicMaterial color="#3de3f5" />
            </mesh>
            <mesh>
              <circleGeometry args={[0.86, 64]} />
              <meshBasicMaterial color={color} transparent opacity={0.18} side={THREE.DoubleSide} />
            </mesh>
          </group>
        </group>
      </HeroRig>
    </>
  );
}
