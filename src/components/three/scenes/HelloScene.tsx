"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { motionState } from "@/lib/store";
import { seeded } from "./common";

/** Particles that spell "Hello" and scatter away from the cursor, then re-form. */
function sampleText(text: string, max: number) {
  const c = document.createElement("canvas");
  const W = 600, H = 220;
  c.width = W;
  c.height = H;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#fff";
  ctx.font = "800 190px system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, W / 2, H / 2 + 8);
  const data = ctx.getImageData(0, 0, W, H).data;
  const pts: number[] = [];
  for (let y = 0; y < H; y += 2)
    for (let x = 0; x < W; x += 2) if (data[(y * W + x) * 4 + 3] > 128) pts.push((x - W / 2) / 165, -(y - H / 2) / 165);
  // downsample to max
  const out = new Float32Array(max * 3);
  const n = pts.length / 2;
  for (let i = 0; i < max; i++) {
    const j = Math.floor((i / max) * n);
    out[i * 3] = pts[j * 2] ?? 0;
    out[i * 3 + 1] = pts[j * 2 + 1] ?? 0;
    out[i * 3 + 2] = ((i * 7919) % 100) / 100 * 0.3 - 0.15;
  }
  return out;
}

export default function HelloScene() {
  const { viewport, size } = useThree();
  const mobile = size.width < 768;
  const COUNT = mobile ? 2200 : 4200;
  const points = useRef<THREE.Points>(null);
  const { geo, home, vel } = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const rnd = seeded(77);
    const pos = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT * 3; i++) pos[i] = (rnd() - 0.5) * 12;
    const colors = new Float32Array(COUNT * 3);
    const palette = [new THREE.Color("#7c5cff"), new THREE.Color("#ff5fa2"), new THREE.Color("#3de3f5"), new THREE.Color("#eeeaf7")];
    for (let i = 0; i < COUNT; i++) {
      const c = palette[i % palette.length];
      colors.set([c.r, c.g, c.b], i * 3);
    }
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return { geo: g, home: new Float32Array(COUNT * 3), vel: Float32Array.from(pos) };
  }, [COUNT]);

  useEffect(() => {
    home.set(sampleText("Hello", COUNT));
  }, [home, COUNT]);
  useEffect(() => () => geo.dispose(), [geo]);

  // Offsets from each particle's home position. They start scattered and decay
  // exponentially (frame-rate independent); the cursor pushes them away again.
  useFrame((st, dt) => {
    const t = st.clock.elapsedTime;
    const arr = geo.attributes.position.array as Float32Array;
    const scale = mobile ? 0.85 : 1;
    const offX = mobile ? 0 : viewport.width * 0.26;
    const offY = mobile ? viewport.height * 0.3 : viewport.height * 0.12;
    const mx = (motionState.pointer.x * viewport.width) / 2;
    const my = (motionState.pointer.y * viewport.height) / 2;
    const d = Math.min(dt, 0.5);
    const decay = Math.exp(-d * 2.4);
    for (let i = 0; i < COUNT; i++) {
      const ix = i * 3;
      const hx = home[ix] * scale + offX;
      const hy = home[ix + 1] * scale + offY + Math.sin(t * 1.2 + home[ix] * 0.8) * 0.04;
      const hz = home[ix + 2];
      // vel holds the current offset from home
      let ox = vel[ix] * decay, oy = vel[ix + 1] * decay, oz = vel[ix + 2] * decay;
      const px = hx + ox, py = hy + oy;
      const dx = px - mx, dy = py - my;
      const dist2 = dx * dx + dy * dy;
      if (motionState.pointerActive && dist2 < 0.9) {
        const f = (0.9 - dist2) * 9 * d;
        ox += dx * f;
        oy += dy * f;
        oz += f * 0.6;
      }
      vel[ix] = ox; vel[ix + 1] = oy; vel[ix + 2] = oz;
      arr[ix] = hx + ox;
      arr[ix + 1] = hy + oy;
      arr[ix + 2] = hz + oz;
    }
    geo.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={points} geometry={geo}>
      <pointsMaterial size={mobile ? 0.045 : 0.04} vertexColors sizeAttenuation transparent opacity={0.95} depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}
