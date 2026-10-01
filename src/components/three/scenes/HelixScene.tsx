"use client";

import { useMemo, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { services } from "@/content/services";
import { motionState } from "@/lib/store";
import { Dust } from "./common";

/** Ten glass tiles on a helix; the hovered tile turns to face the viewer. */
export default function HelixScene() {
  const { viewport, size } = useThree();
  const mobile = size.width < 768;
  const group = useRef<THREE.Group>(null);
  const tiles = useRef<(THREE.Group | null)[]>([]);
  const [hovered, setHovered] = useState<number | null>(null);
  const colors = useMemo(() => services.map((s) => new THREE.Color(s.accent)), []);

  useFrame((st, dt) => {
    const t = st.clock.elapsedTime;
    const k = 1 - Math.exp(-dt * 4);
    const g = group.current;
    if (!g) return;
    const scroll = window.scrollY / Math.max(1, window.innerHeight);
    g.rotation.y = t * 0.12 + scroll * 1.4 + motionState.pointer.x * 0.25;
    g.position.x += ((mobile ? 0 : viewport.width * 0.27) - g.position.x) * k;
    g.position.y += ((mobile ? viewport.height * 0.24 : 0.1) + scroll * viewport.height * 0.3 - g.position.y) * k;
    const s = mobile ? 0.5 : 0.78;
    g.scale.setScalar(g.scale.x + (s - g.scale.x) * k);
    tiles.current.forEach((tile, i) => {
      if (!tile) return;
      const a = (i / services.length) * Math.PI * 2 * 1.4;
      const facing = hovered === i;
      const targetRot = facing ? -g.rotation.y : -a + Math.PI / 2;
      tile.rotation.y += (targetRot - tile.rotation.y) * k;
      const sc = facing ? 1.35 : 1;
      tile.scale.setScalar(tile.scale.x + (sc - tile.scale.x) * k);
      tile.position.y = (i - (services.length - 1) / 2) * 0.42 + Math.sin(t + i) * 0.04;
    });
  });

  return (
    <>
      <Dust />
      <group ref={group}>
        {services.map((s, i) => {
          const a = (i / services.length) * Math.PI * 2 * 1.4;
          return (
            <group
              key={s.slug}
              position={[Math.cos(a) * 1.7, 0, Math.sin(a) * 1.7]}
              ref={(el) => {
                tiles.current[i] = el;
              }}
              onPointerOver={(e) => {
                e.stopPropagation();
                setHovered(i);
              }}
              onPointerOut={() => setHovered((h) => (h === i ? null : h))}
            >
              <RoundedBox args={[1.05, 0.62, 0.04]} radius={0.04} smoothness={3}>
                <meshPhysicalMaterial
                  color={colors[i]}
                  emissive={colors[i]}
                  emissiveIntensity={hovered === i ? 0.8 : 0.15}
                  roughness={0.12}
                  metalness={0.2}
                  clearcoat={1}
                  iridescence={1}
                  transparent
                  opacity={0.88}
                />
              </RoundedBox>
            </group>
          );
        })}
        <mesh>
          <cylinderGeometry args={[0.02, 0.02, 5, 8]} />
          <meshBasicMaterial color="#7c5cff" transparent opacity={0.4} />
        </mesh>
      </group>
    </>
  );
}
