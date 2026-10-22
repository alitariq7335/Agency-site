"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { motionState, type CorePose } from "@/lib/store";
import { services, serviceLines } from "@/content/services";
import { Dust, seeded } from "./common";
import { VoxelMascot, type MascotControl } from "./VoxelMascot";

type Pose = { x: number; y: number; s: number; ring: number; dim: number };

/** Where the mascot sits for each chapter of the home page (x/y in viewport fractions). */
function poseFor(name: CorePose, mobile: boolean): Pose {
  if (mobile) {
    switch (name) {
      case "hero": return { x: 0.24, y: 0.34, s: 0.36, ring: 0, dim: 0.1 };
      case "manifesto": return { x: 0.3, y: 0.37, s: 0.3, ring: 0, dim: 0.55 };
      case "services": return { x: 0, y: 0.26, s: 0.42, ring: 1, dim: 0.2 };
      case "aside": return { x: 0.3, y: 0.32, s: 0.35, ring: 0, dim: 0.6 };
      case "away": return { x: 0, y: 0.9, s: 0.3, ring: 0, dim: 0.8 };
      case "finale": return { x: 0, y: 0.3, s: 0.45, ring: 0, dim: 0.5 };
    }
  }
  switch (name) {
    case "hero": return { x: 0.26, y: 0.04, s: 0.95, ring: 0, dim: 0 };
    case "manifesto": return { x: 0.36, y: 0.14, s: 0.55, ring: 0, dim: 0.5 };
    case "services": return { x: 0.22, y: 0.1, s: 0.62, ring: 1, dim: 0.05 };
    case "aside": return { x: -0.34, y: -0.12, s: 0.5, ring: 0, dim: 0.5 };
    case "away": return { x: 0.45, y: 0.55, s: 0.35, ring: 0, dim: 0.75 };
    case "finale": return { x: 0, y: 0.37, s: 0.34, ring: 0, dim: 0.15 };
  }
}

// Seeds (pixels) orbit the mascot — one per service, coloured by service line.
const ORDERED = [...services].sort((a, b) => serviceLines.findIndex((l) => l.id === a.line) - serviceLines.findIndex((l) => l.id === b.line));
const N = ORDERED.length;
const lineCenter = serviceLines.map((l) => {
  const idx = ORDERED.map((s, i) => (s.line === l.id ? i : -1)).filter((i) => i >= 0);
  return idx.reduce((a, b) => a + b, 0) / idx.length;
});

export default function CoreScene() {
  const { viewport, size } = useThree();
  const mobile = size.width < 768;
  const group = useRef<THREE.Group>(null);
  const seedsRef = useRef<THREE.InstancedMesh>(null);
  const control = useRef<MascotControl>({ dim: 0, wobble: 0 });
  const state = useRef({ ring: 0, ringRot: 0 });
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const colors = useMemo(() => ORDERED.map((s) => new THREE.Color(serviceLines.find((l) => l.id === s.line)!.accent)), []);
  const orbits = useMemo(() => {
    const rnd = seeded(42);
    return ORDERED.map((_, i) => ({
      radius: 2.0 + rnd() * 0.7,
      speed: 0.16 + rnd() * 0.2,
      phase: (i / N) * Math.PI * 2 + rnd() * 0.4,
      tilt: (rnd() - 0.5) * 1.6,
      spin: new THREE.Vector3(rnd(), rnd(), rnd()).multiplyScalar(1.4),
    }));
  }, []);
  const scales = useRef(ORDERED.map(() => 1));
  const colorsSet = useRef(false);

  useFrame((st, dt) => {
    const t = st.clock.elapsedTime;
    const k = 1 - Math.exp(-dt * 3.4);
    const pose = poseFor(motionState.pose, mobile);
    const g = group.current;
    const seeds = seedsRef.current;
    if (!g || !seeds) return;

    if (!colorsSet.current) {
      colors.forEach((c, i) => seeds.setColorAt(i, c));
      if (seeds.instanceColor) seeds.instanceColor.needsUpdate = true;
      colorsSet.current = true;
    }

    g.position.x += (pose.x * viewport.width - g.position.x) * k;
    g.position.y += (pose.y * viewport.height - g.position.y) * k;
    g.scale.setScalar(g.scale.x + (pose.s - g.scale.x) * k);

    const S = state.current;
    S.ring += (pose.ring - S.ring) * k;
    control.current.dim += (pose.dim - control.current.dim) * k;

    // the ring turns so the active service line's seeds face the viewer
    const activeLine = Math.min(serviceLines.length - 1, motionState.activeService);
    const targetRot = -(lineCenter[activeLine] / N) * Math.PI * 2;
    let diff = targetRot - S.ringRot;
    diff = Math.atan2(Math.sin(diff), Math.cos(diff));
    S.ringRot += diff * k * 1.6;

    for (let i = 0; i < N; i++) {
      const o = orbits[i];
      const a = o.phase + t * o.speed;
      const sx = Math.cos(a) * o.radius;
      const sy = Math.sin(a * 1.3) * 0.6 + o.tilt * 0.4;
      const sz = Math.sin(a) * o.radius * 0.45;
      const ra = (i / N) * Math.PI * 2 + S.ringRot + Math.PI / 2;
      const R = 2.5;
      const rx = Math.cos(ra) * R;
      const rz = Math.sin(ra) * R;
      const ry = Math.sin(ra) * R * 0.3;
      const r = S.ring;
      dummy.position.set(sx + (rx - sx) * r, sy + (ry - sy) * r, sz + (rz - sz) * r);
      dummy.rotation.set(t * o.spin.x, t * o.spin.y, t * o.spin.z);
      const active = r > 0.5 && ORDERED[i].line === serviceLines[activeLine].id;
      scales.current[i] += ((active ? 1.8 : 1) - scales.current[i]) * k;
      dummy.scale.setScalar(scales.current[i] * (1 - control.current.dim * 0.3));
      dummy.updateMatrix();
      seeds.setMatrixAt(i, dummy.matrix);
    }
    seeds.instanceMatrix.needsUpdate = true;
  });

  return (
    <>
      <Dust color="#c9a7ff" />
      <group ref={group}>
        <VoxelMascot control={control} />
        <instancedMesh ref={seedsRef} args={[undefined, undefined, N]}>
          <boxGeometry args={[0.16, 0.16, 0.16]} />
          <meshStandardMaterial roughness={0.35} metalness={0.1} emissive="#2a1245" emissiveIntensity={0.4} />
        </instancedMesh>
      </group>
    </>
  );
}
