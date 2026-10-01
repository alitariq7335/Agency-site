"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { motionState, type CorePose } from "@/lib/store";
import { services } from "@/content/services";
import { createIridescentMaterial } from "../materials/IridescentMaterial";
import { Dust, seeded } from "./common";

type Pose = { x: number; y: number; s: number; ring: number; dim: number };

/** Where the Core sits for each chapter of the home page (x/y in viewport fractions). */
function poseFor(name: CorePose, mobile: boolean): Pose {
  if (mobile) {
    switch (name) {
      case "hero": return { x: 0.2, y: 0.33, s: 0.4, ring: 0, dim: 0.35 };
      case "manifesto": return { x: 0.25, y: 0.3, s: 0.45, ring: 0, dim: 0.6 };
      case "services": return { x: 0, y: 0.26, s: 0.42, ring: 1, dim: 0.2 };
      case "aside": return { x: 0.32, y: 0.3, s: 0.35, ring: 0, dim: 0.6 };
      case "away": return { x: 0, y: 0.9, s: 0.3, ring: 0, dim: 0.8 };
      case "finale": return { x: 0, y: 0.3, s: 0.45, ring: 0, dim: 0.6 };
    }
  }
  switch (name) {
    case "hero": return { x: 0.2, y: 0.02, s: 1, ring: 0, dim: 0 };
    case "manifesto": return { x: 0.3, y: -0.05, s: 0.8, ring: 0, dim: 0.55 };
    case "services": return { x: 0.22, y: 0.1, s: 0.62, ring: 1, dim: 0.15 };
    case "aside": return { x: -0.34, y: -0.12, s: 0.5, ring: 0, dim: 0.55 };
    case "away": return { x: 0.45, y: 0.55, s: 0.35, ring: 0, dim: 0.8 };
    case "finale": return { x: 0.36, y: 0.22, s: 0.55, ring: 0, dim: 0.6 };
  }
}

const SHARDS = services.length;

export default function CoreScene() {
  const { viewport, size } = useThree();
  const mobile = size.width < 768;
  const group = useRef<THREE.Group>(null);
  const blob = useRef<THREE.Mesh>(null);
  const shardRefs = useRef<(THREE.Mesh | null)[]>([]);
  const material = useMemo(() => createIridescentMaterial("#7C5CFF"), []);
  const state = useRef({ ring: 0, dim: 0, hover: 0, ringRot: 0 });

  // Randomised orbit parameters per shard (seeded => identical every load).
  const orbits = useMemo(() => {
    const rnd = seeded(42);
    return services.map((s, i) => ({
      radius: 1.9 + rnd() * 0.6,
      speed: 0.18 + rnd() * 0.22,
      phase: (i / SHARDS) * Math.PI * 2 + rnd() * 0.4,
      tilt: (rnd() - 0.5) * 1.6,
      spin: new THREE.Vector3(rnd(), rnd(), rnd()).multiplyScalar(1.2),
      color: new THREE.Color(s.accent),
    }));
  }, []);

  useEffect(() => () => material.dispose(), [material]);

  const tmp = useMemo(() => ({ v: new THREE.Vector3(), q: new THREE.Quaternion(), e: new THREE.Euler() }), []);

  useFrame((st, dt) => {
    const t = st.clock.elapsedTime;
    const k = 1 - Math.exp(-dt * 3.4);
    const pose = poseFor(motionState.pose, mobile);
    const g = group.current;
    if (!g || !blob.current) return;

    // Move the whole rig toward the current chapter's pose.
    g.position.x += (pose.x * viewport.width - g.position.x) * k;
    g.position.y += (pose.y * viewport.height - g.position.y) * k;
    const s = g.scale.x + (pose.s - g.scale.x) * k;
    g.scale.setScalar(s);

    const S = state.current;
    S.ring += (pose.ring - S.ring) * k;
    S.dim += (pose.dim - S.dim) * k;

    // Pointer: blob leans and bulges toward the cursor.
    const px = motionState.pointer.x;
    const py = motionState.pointer.y;
    S.hover += ((Math.abs(px) + Math.abs(py) > 0 ? 1 : 0) - S.hover) * k;
    material.uniforms.uTime.value = t;
    material.uniforms.uDim.value = S.dim;
    material.uniforms.uHover.value = S.hover * (1 - S.ring * 0.7);
    material.uniforms.uPointer.value.set(px * 2, py * 2, 1.4);
    material.uniforms.uAmp.value = 0.24 + Math.min(0.2, Math.abs(motionState.velocity) * 0.003);
    blob.current.rotation.y += dt * 0.08;
    blob.current.rotation.x += ((-py * 0.4) - blob.current.rotation.x) * k;
    blob.current.rotation.z += ((px * 0.3) - blob.current.rotation.z) * k;

    // Ring rotation brings the active service's shard to the front.
    const targetRot = -(motionState.activeService / SHARDS) * Math.PI * 2;
    let diff = targetRot - S.ringRot;
    diff = Math.atan2(Math.sin(diff), Math.cos(diff));
    S.ringRot += diff * k * 1.6;

    for (let i = 0; i < SHARDS; i++) {
      const m = shardRefs.current[i];
      if (!m) continue;
      const o = orbits[i];
      // scattered orbit
      const a = o.phase + t * o.speed;
      tmp.v.set(Math.cos(a) * o.radius, Math.sin(a * 1.3) * 0.55 + o.tilt * 0.4, Math.sin(a) * o.radius * 0.6);
      const sx = tmp.v.x, sy = tmp.v.y, sz = tmp.v.z;
      // ring formation (front of the ring faces camera)
      const ra = (i / SHARDS) * Math.PI * 2 + S.ringRot + Math.PI / 2;
      const R = 2.35;
      const rx = Math.cos(ra) * R;
      const rz = Math.sin(ra) * R;
      const ry = Math.sin(ra) * R * 0.32 + Math.sin(ra * 2 + t) * 0.05;
      const r = S.ring;
      m.position.set(sx + (rx - sx) * r, sy + (ry - sy) * r, sz + (rz - sz) * r);
      // rotation: tumble when scattered, face outward in ring
      const tumbleX = t * o.spin.x, tumbleY = t * o.spin.y, tumbleZ = t * o.spin.z;
      m.rotation.set(tumbleX * (1 - r), tumbleY * (1 - r) + (-ra + Math.PI / 2) * r, tumbleZ * (1 - r));
      const isActive = r > 0.5 && i === motionState.activeService;
      const target = isActive ? 1.45 : 1;
      m.scale.setScalar(m.scale.x + (target - m.scale.x) * k);
      const mat = m.material as THREE.MeshPhysicalMaterial;
      mat.emissiveIntensity += ((isActive ? 0.9 : 0.12) - mat.emissiveIntensity) * k;
      mat.opacity = 0.92 - S.dim * 0.5;
    }
  });

  return (
    <>
      <Dust />
      <group ref={group}>
        <mesh ref={blob} material={material}>
          <icosahedronGeometry args={[1.25, mobile ? 48 : 96]} />
        </mesh>
        {orbits.map((o, i) => (
          <RoundedBox
            key={i}
            ref={(el: THREE.Mesh | null) => {
              shardRefs.current[i] = el;
            }}
            args={[0.34, 0.46, 0.03]}
            radius={0.015}
            smoothness={2}
          >
            <meshPhysicalMaterial
              color={o.color}
              emissive={o.color}
              emissiveIntensity={0.12}
              roughness={0.12}
              metalness={0.2}
              clearcoat={1}
              iridescence={1}
              iridescenceIOR={1.6}
              transparent
              opacity={0.92}
            />
          </RoundedBox>
        ))}
      </group>
    </>
  );
}
