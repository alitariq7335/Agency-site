import * as THREE from "three";
import { simplex3 } from "../shaders/noise";

/**
 * The signature "Core" material: a noise-displaced surface with a thin-film
 * style iridescent palette, fresnel rim and a soft fake environment.
 * Everything is procedural — no textures or HDR downloads.
 */
export function createIridescentMaterial(accent = "#7C5CFF") {
  return new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uAmp: { value: 0.26 },
      uFreq: { value: 0.85 },
      uPointer: { value: new THREE.Vector3() },
      uAccent: { value: new THREE.Color(accent) },
      uHover: { value: 0 },
      uDim: { value: 0 },
    },
    vertexShader: /* glsl */ `
      ${simplex3}
      uniform float uTime;
      uniform float uAmp;
      uniform float uFreq;
      uniform vec3 uPointer;
      uniform float uHover;
      varying vec3 vNormal;
      varying vec3 vViewDir;
      varying float vDisp;
      varying vec3 vWorldPos;

      float field(vec3 p){
        float t = uTime * 0.22;
        float n = snoise(p * uFreq + vec3(t, t * 0.7, -t));
        n += 0.18 * snoise(p * uFreq * 2.1 - vec3(t * 1.3));
        // pointer bulge
        float d = distance(normalize(p), normalize(uPointer + vec3(0.0001)));
        n += uHover * 0.55 * smoothstep(1.2, 0.0, d);
        return n;
      }
      vec3 displace(vec3 p){ return p + normalize(p) * field(p) * uAmp; }

      void main(){
        vec3 p = position;
        vec3 n = normalize(normal);
        vec3 tangent = normalize(cross(n, abs(n.y) > 0.99 ? vec3(1.0,0.0,0.0) : vec3(0.0,1.0,0.0)));
        vec3 bitangent = normalize(cross(n, tangent));
        float e = 0.01;
        vec3 d0 = displace(p);
        vec3 d1 = displace(p + tangent * e);
        vec3 d2 = displace(p + bitangent * e);
        vec3 dn = normalize(cross(d1 - d0, d2 - d0));
        if (dot(dn, n) < 0.0) dn = -dn;
        vDisp = field(p);
        vec4 world = modelMatrix * vec4(d0, 1.0);
        vWorldPos = world.xyz;
        vNormal = normalize(mat3(modelMatrix) * dn);
        vViewDir = normalize(cameraPosition - world.xyz);
        gl_Position = projectionMatrix * viewMatrix * world;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform float uTime;
      uniform vec3 uAccent;
      uniform float uDim;
      varying vec3 vNormal;
      varying vec3 vViewDir;
      varying float vDisp;
      varying vec3 vWorldPos;

      vec3 palette(float t){
        // cosine palette tuned to violet / pink / cyan
        vec3 a = vec3(0.52, 0.42, 0.66);
        vec3 b = vec3(0.45, 0.40, 0.35);
        vec3 c = vec3(1.0, 1.0, 1.0);
        vec3 d = vec3(0.70, 0.95, 0.35);
        return a + b * cos(6.28318 * (c * t + d));
      }

      void main(){
        vec3 n = normalize(vNormal);
        vec3 v = normalize(vViewDir);
        float ndv = clamp(dot(n, v), 0.0, 1.0);
        float fres = pow(1.0 - ndv, 2.4);

        // thin-film: hue shifts with view angle and surface displacement
        float film = ndv * 0.85 + vDisp * 0.18 + uTime * 0.02;
        vec3 irid = palette(film);

        // fake environment: soft key + rim lights
        vec3 L1 = normalize(vec3(0.6, 0.8, 0.5));
        vec3 L2 = normalize(vec3(-0.7, -0.2, 0.4));
        float diff = max(dot(n, L1), 0.0) * 0.55 + max(dot(n, L2), 0.0) * 0.25;
        vec3 h1 = normalize(L1 + v);
        float spec = pow(max(dot(n, h1), 0.0), 90.0) * 1.6;
        vec3 h2 = normalize(L2 + v);
        float spec2 = pow(max(dot(n, h2), 0.0), 40.0) * 0.5;

        vec3 base = mix(vec3(0.03, 0.02, 0.07), uAccent * 0.55, 0.35);
        vec3 col = base * (0.35 + diff);
        col += irid * (0.35 + fres * 1.25);
        col += vec3(1.0) * spec + vec3(0.6, 0.95, 1.0) * spec2;
        col += uAccent * fres * 0.6;

        col = mix(col, vec3(0.04, 0.03, 0.08), uDim);
        gl_FragColor = vec4(col, 1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `,
  });
}
