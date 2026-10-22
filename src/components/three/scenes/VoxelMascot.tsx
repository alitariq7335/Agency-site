"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { motionState } from "@/lib/store";
import { MASCOT_ROWS, PALETTE, BODY, EYE_WHITE, OUTLINE } from "../data/mascot";
import { seeded } from "./common";

const CELL = 0.16;
const GAP = 0.9; // voxel size relative to the cell, leaves a crisp pixel seam

type Voxel = {
  target: THREE.Vector3;
  from: THREE.Vector3;
  normal: THREE.Vector3;
  delay: number;
  eye: boolean;
  color: THREE.Color;
};

/** Distance (in cells) from each filled cell to the nearest empty cell: drives the dome depth. */
function depthMap(rows: string[]) {
  const H = rows.length;
  const W = rows[0].length;
  const filled = (x: number, y: number) => y >= 0 && y < H && x >= 0 && x < W && rows[y][x] !== " ";
  const dist: number[][] = rows.map((r) => [...r].map(() => 0));
  for (let y = 0; y < H; y++)
    for (let x = 0; x < W; x++) {
      if (!filled(x, y)) continue;
      let d = 1;
      while (d < 6 && filled(x - d, y) && filled(x + d, y) && filled(x, y - d) && filled(x, y + d)) d++;
      dist[y][x] = d;
    }
  return dist;
}

function buildVoxels(): Voxel[] {
  const rows = MASCOT_ROWS;
  const H = rows.length;
  const W = rows[0].length;
  const dist = depthMap(rows);
  const rnd = seeded(5);
  const colorOf = (ch: string) => new THREE.Color(PALETTE["abcdefgh".indexOf(ch)]);
  const body = colorOf(BODY);
  const list: Voxel[] = [];
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const ch = rows[y][x];
      if (ch === " ") continue;
      const layers = Math.min(4, dist[y][x]);
      // eyes: white highlights and the dark pupils inside the face (rows 9–10)
      const isFaceDark = ch === OUTLINE && dist[y][x] > 1;
      const eye = (ch === EYE_WHITE || isFaceDark) && (y === 9 || y === 10);
      for (let l = -(layers - 1); l <= layers - 1; l++) {
        const front = l === layers - 1;
        const detail = ch === EYE_WHITE || ch === "g" || isFaceDark;
        const color = front || !detail ? colorOf(ch) : body.clone();
        const px = (x - (W - 1) / 2) * CELL;
        const py = ((H - 1) / 2 - y) * CELL;
        const pz = l * CELL;
        const target = new THREE.Vector3(px, py, pz);
        list.push({
          target,
          from: new THREE.Vector3(px + (rnd() - 0.5) * 3, py - 3 - rnd() * 2, pz + (rnd() - 0.5) * 3),
          normal: target.clone().normalize(),
          // grow from the bottom up, like a sprouting plant
          delay: ((H - y) / H) * 0.9 + rnd() * 0.25,
          eye: eye && front,
          color,
        });
      }
    }
  }
  return list;
}

export type MascotControl = { dim: number; wobble: number };

/**
 * The Bengan eggplant mascot rebuilt as 3D voxels. It grows up from the
 * ground on load, looks toward the cursor, blinks, and its pixels scatter a
 * little with scroll speed before snapping back.
 */
export function VoxelMascot({ control, introStart = 0.2 }: { control: React.RefObject<MascotControl>; introStart?: number }) {
  const voxels = useMemo(() => buildVoxels(), []);
  const mesh = useRef<THREE.InstancedMesh>(null);
  const group = useRef<THREE.Group>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const geo = useMemo(() => new THREE.BoxGeometry(CELL * GAP, CELL * GAP, CELL * GAP), []);
  const mat = useMemo(() => {
    const m = new THREE.MeshStandardMaterial({ roughness: 0.55, metalness: 0.05, flatShading: true });
    // Self-light each voxel with its own colour so the mascot reads like the flat pixel logo,
    // while side faces still pick up shading for depth.
    m.onBeforeCompile = (shader) => {
      // diffuseColor already includes the per-voxel instance colour at this point
      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <emissivemap_fragment>",
        "#include <emissivemap_fragment>\n\ttotalEmissiveRadiance += diffuseColor.rgb * 0.6;",
      );
    };
    return m;
  }, []);
  const blink = useRef({ next: 2.5, t: -1 });
  const scatter = useRef(0);

  useEffect(() => {
    const m = mesh.current;
    if (!m) return;
    voxels.forEach((v, i) => m.setColorAt(i, v.color));
    if (m.instanceColor) m.instanceColor.needsUpdate = true;
  }, [voxels]);

  useEffect(
    () => () => {
      geo.dispose();
      mat.dispose();
    },
    [geo, mat],
  );

  useFrame((st, dt) => {
    const m = mesh.current;
    const g = group.current;
    if (!m || !g) return;
    const t = st.clock.elapsedTime;
    const k = 1 - Math.exp(-dt * 4);

    // look toward the pointer, with a gentle idle sway
    g.rotation.y += (motionState.pointer.x * 0.55 + Math.sin(t * 0.6) * 0.18 - g.rotation.y) * k;
    g.rotation.x += (-motionState.pointer.y * 0.22 - g.rotation.x) * k;
    g.position.y = Math.sin(t * 1.3) * 0.06;

    // blink every few seconds
    const b = blink.current;
    if (t > b.next) {
      b.t = t;
      b.next = t + 2.8 + Math.random() * 2.5;
    }
    const blinkAmt = b.t > 0 && t - b.t < 0.16 ? 0.12 : 1;

    // pixels scatter with scroll speed, then snap back
    const targetScatter = Math.min(0.45, Math.abs(motionState.velocity) * 0.006) + control.current.wobble;
    scatter.current += (targetScatter - scatter.current) * (1 - Math.exp(-dt * 6));

    for (let i = 0; i < voxels.length; i++) {
      const v = voxels[i];
      const raw = Math.min(1, Math.max(0, (t - introStart - v.delay) / 0.9));
      const e = 1 - Math.pow(1 - raw, 3);
      const s = scatter.current * (0.6 + ((i * 37) % 10) / 10);
      dummy.position.set(
        v.from.x + (v.target.x - v.from.x) * e + v.normal.x * s,
        v.from.y + (v.target.y - v.from.y) * e + v.normal.y * s,
        v.from.z + (v.target.z - v.from.z) * e + v.normal.z * s,
      );
      dummy.rotation.set((1 - e) * 3, (1 - e) * 2, 0);
      const sc = Math.max(0.001, e);
      dummy.scale.set(sc, v.eye ? sc * blinkAmt : sc, sc);
      dummy.updateMatrix();
      m.setMatrixAt(i, dummy.matrix);
    }
    m.instanceMatrix.needsUpdate = true;
    mat.color.setScalar(1 - control.current.dim * 0.72);
  });

  return (
    <group ref={group}>
      <instancedMesh ref={mesh} args={[geo, mat, voxels.length]} castShadow={false} />
    </group>
  );
}
