import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { site } from "@/content/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  const [mascot, pixelFont] = await Promise.all([
    readFile(path.join(process.cwd(), "public/brand/mascot.png")),
    readFile(path.join(process.cwd(), "src/fonts/press-start-2p.woff")),
  ]);
  const mascotSrc = `data:image/png;base64,${mascot.toString("base64")}`;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", gap: 64, padding: "0 80px", background: "#2A1245", color: "#F6F0FF" }}>
        <img src={mascotSrc} width={300} height={319} alt="" style={{ imageRendering: "pixelated" }} />
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ display: "flex", fontFamily: "PressStart", fontSize: 64, textShadow: "6px 6px 0 #6A2C91" }}>BENGAN</div>
          <div style={{ display: "flex", fontFamily: "PressStart", fontSize: 26, color: "#7BE04F", letterSpacing: 10 }}>STUDIOS</div>
          <div style={{ display: "flex", flexDirection: "column", fontFamily: "PressStart", fontSize: 24, lineHeight: 1.7, marginTop: 24 }}>
            <span>PLANT THE IDEA.</span>
            <span style={{ color: "#FFD23F" }}>WE&apos;LL GROW IT.</span>
          </div>
          <div style={{ display: "flex", fontFamily: "PressStart", fontSize: 14, lineHeight: 1.8, color: "#C4B5DD", maxWidth: 640 }}>
            AI · DEVELOPMENT · E-COMMERCE · GROWTH MARKETING · CONTENT
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "PressStart", data: pixelFont, weight: 400, style: "normal" }] },
  );
}
