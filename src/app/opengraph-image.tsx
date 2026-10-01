import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "#0a0814", color: "#eeeaf7", position: "relative" }}>
        <div style={{ position: "absolute", right: -120, top: -80, width: 640, height: 640, borderRadius: 9999, background: "radial-gradient(circle at 35% 35%, #b9a8ff, #7c5cff 35%, #ff5fa2 60%, #3de3f5 80%, transparent 82%)", opacity: 0.9 }} />
        <div style={{ fontSize: 36, display: "flex" }}>{site.name.toLowerCase()}</div>
        <div style={{ fontSize: 96, fontWeight: 700, letterSpacing: -4, lineHeight: 0.95, maxWidth: 800, display: "flex" }}>{site.tagline}</div>
        <div style={{ fontSize: 28, color: "#9a94ae", display: "flex" }}>Web · SEO · Ads · Social · Branding</div>
      </div>
    ),
    size,
  );
}
