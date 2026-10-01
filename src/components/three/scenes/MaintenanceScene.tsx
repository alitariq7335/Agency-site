"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { HeroRig, Dust, useAccent } from "./common";

function gearShape(teeth: number, rOuter: number, rInner: number, hole: number) {
  const s = new THREE.Shape();
  const step = (Math.PI * 2) / teeth;
  for (let i = 0; i < teeth; i++) {
    const a = i * step;
    const pts: [number, number][] = [
      [rInner, a],
      [rOuter, a + step * 0.15],
      [rOuter, a + step * 0.45],
      [rInner, a + step * 0.6],
    ];
    pts.forEach(([r, ang], j) => {
      const x = Math.cos(ang) * r;
      const y = Math.sin(ang) * r;
      if (i === 0 && j === 0) s.moveTo(x, y);
      else s.lineTo(x, y);
    });
  }
  s.closePath();
  const h = new THREE.Path();
  h.absarc(0, 0, hole, 0, Math.PI * 2, true);
  s.holes.push(h);
  return s;
}

function shieldShape() {
  const s = new THREE.Shape();
  s.moveTo(0, 0.62);
  s.quadraticCurveTo(0.3, 0.5, 0.48, 0.52);
  s.quadraticCurveTo(0.5, -0.1, 0, -0.62);
  s.quadraticCurveTo(-0.5, -0.1, -0.48, 0.52);
  s.quadraticCurveTo(-0.3, 0.5, 0, 0.62);
  return s;
}

/** Interlocking gears turning behind a shield, with a live heartbeat line. */
export default function MaintenanceScene({ accent }: { accent: string }) {
  const color = useAccent(accent);
  const g1 = useRef<THREE.Mesh>(null);
  const g2 = useRef<THREE.Mesh>(null);
  const g3 = useRef<THREE.Mesh>(null);
  const beat = useRef<THREE.Line>(null);
  const ext = { depth: 0.18, bevelEnabled: true, bevelSize: 0.02, bevelThickness: 0.02, bevelSegments: 2 };
  const big = useMemo(() => new THREE.ExtrudeGeometry(gearShape(14, 1.15, 0.95, 0.35), ext).center(), []); // eslint-disable-line react-hooks/exhaustive-deps
  const small = useMemo(() => new THREE.ExtrudeGeometry(gearShape(9, 0.72, 0.55, 0.22), ext).center(), []); // eslint-disable-line react-hooks/exhaustive-deps
  const shield = useMemo(() => new THREE.ExtrudeGeometry(shieldShape(), { ...ext, depth: 0.12 }).center(), []); // eslint-disable-line react-hooks/exhaustive-deps

  const W = 160;
  const lineGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(W * 3), 3));
    return g;
  }, []);
  const lineObj = useMemo(() => new THREE.Line(lineGeo, new THREE.LineBasicMaterial({ color: "#5cffb0" })), [lineGeo]);

  useFrame((st, dt) => {
    const t = st.clock.elapsedTime;
    if (g1.current) g1.current.rotation.z += dt * 0.4;
    if (g2.current) g2.current.rotation.z -= dt * 0.4 * (14 / 9);
    if (g3.current) g3.current.rotation.z -= dt * 0.4 * (14 / 9);
    const arr = lineGeo.attributes.position.array as Float32Array;
    for (let i = 0; i < W; i++) {
      const x = (i / (W - 1)) * 4 - 2;
      const ph = ((i / W) * 2 - t * 0.6) % 1;
      const p = ph < 0 ? ph + 1 : ph;
      let y = 0;
      if (p > 0.42 && p < 0.46) y = (p - 0.42) * 6;
      else if (p >= 0.46 && p < 0.5) y = 0.24 - (p - 0.46) * 16;
      else if (p >= 0.5 && p < 0.53) y = -0.4 + (p - 0.5) * 13.3;
      arr[i * 3] = x;
      arr[i * 3 + 1] = y - 1.55;
      arr[i * 3 + 2] = 0.4;
    }
    lineGeo.attributes.position.needsUpdate = true;
  });

  return (
    <>
      <Dust color="#a6ffd6" />
      <HeroRig>
        <group rotation={[0.1, -0.35, 0]}>
          <mesh ref={g1} geometry={big} position={[-0.45, 0.2, -0.3]}>
            <meshStandardMaterial color="#2a2540" metalness={0.85} roughness={0.25} />
          </mesh>
          <mesh ref={g2} geometry={small} position={[1.15, 0.85, -0.3]}>
            <meshStandardMaterial color={color} metalness={0.6} roughness={0.3} emissive={color} emissiveIntensity={0.25} />
          </mesh>
          <mesh ref={g3} geometry={small} position={[0.95, -0.85, -0.3]}>
            <meshStandardMaterial color="#7c5cff" metalness={0.6} roughness={0.3} emissive="#7c5cff" emissiveIntensity={0.25} />
          </mesh>
          <mesh geometry={shield} position={[-0.45, 0.2, 0.15]} scale={1.05}>
            <meshPhysicalMaterial color="#120f20" roughness={0.15} metalness={0.4} clearcoat={1} emissive={color} emissiveIntensity={0.08} />
          </mesh>
          <mesh position={[-0.45, 0.22, 0.25]}>
            <torusGeometry args={[0.16, 0.035, 8, 32, Math.PI * 1.2]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.5} />
          </mesh>
          <primitive object={lineObj} ref={beat} />
        </group>
      </HeroRig>
    </>
  );
}
