# Agency website

A WebGL-driven marketing site for a 10-service digital agency.
Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · Three.js / React Three Fiber · GSAP (ScrollTrigger, SplitText) · Motion v12 · Lenis.

## Run it

```bash
npm install
cp .env.example .env.local   # fill in what you have; everything is optional locally
npm run dev                  # http://localhost:3000
npm run build && npm start   # production check
```

## Before launch — replace placeholders

All copy lives in `src/content/` (components only read from there):

| File | What to change |
| --- | --- |
| `site.ts` | Brand name (currently the placeholder **Orbitly**), city, email, phone, WhatsApp, address, socials, calendar link, hero stats |
| `home.ts` | Client names in the logo marquee, results numbers, case studies, testimonials, FAQ price range — **all marked as samples** |
| `services.ts` | The 10 service pages (copy from the approved content doc) |
| `contact.ts` | Form options, validation messages |

Also swap the placeholder logo in `src/components/layout/Logo.tsx` and `src/app/icon.svg`, and have `/privacy` and `/terms` reviewed.

## How it fits together

- **One persistent WebGL canvas** (`src/components/three/SceneCanvas.tsx`) sits behind every page. Pages pick a scene with `<SetScene id="…" />`; scenes cross-fade on navigation. All 13 scenes are procedural (no 3D model downloads) and lazy-loaded.
- **Scroll storytelling**: on the home page each chapter is wrapped in `<CorePose pose="…">`, which tells the 3D "Core" where to sit. The services chapter pins and rotates the ring of 10 shards to the active service.
- **Shared motion bus**: `motionState` in `src/lib/store.ts` carries scroll progress, velocity and pointer to the 3D scenes without React re-renders.
- **Animation split**: GSAP for scroll-linked/pinned work, Motion for UI interactions, `useFrame` inside the canvas.
- **Fallbacks**: no WebGL → animated gradient poster; `prefers-reduced-motion` → no smooth scroll, pinning or 3D animation; the PerformanceMonitor drops quality on slow devices.

## Contact form

3 steps, validated with one zod schema on client and server (`src/lib/contactSchema.ts`). The Server Action (`src/app/contact/actions.ts`) checks a honeypot, rate-limits per IP, verifies Turnstile (if keys are set), stores the brief in Vercel Blob (if configured), and sends a notification + auto-reply through Resend using React Email templates (`src/emails`). Without `RESEND_API_KEY` leads are logged to the console.

## Deploy on Hostinger (Node.js hosting)

Hostinger's build servers use an older Linux (glibc < 2.29), so Next.js can't load its native compiler there and falls back to the WebAssembly one. The project is set up for that:

- `npm run build` runs `next build --webpack` (Turbopack needs the native compiler).
- `@next/swc-wasm-nodejs` is a dependency, so nothing is downloaded at build time.
- The config is `next.config.mjs` (plain JS), not `.ts`.

In hPanel: Node.js **20 or 22**, build command `npm run build`, start command `npm start`, and add the environment variables from `.env.example`. Builds are slower than on Vercel (WebAssembly), which is expected.

## Deploy (Vercel)

1. Push to GitHub and import the repo in Vercel.
2. Add the environment variables from `.env.example`.
3. Verify your sending domain in Resend so emails come from your address.
