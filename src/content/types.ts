export type ServiceGroup = "build" | "get-found" | "engage" | "protect";

export type SceneId =
  | "core"
  | "helix"
  | "hello"
  | "web"
  | "seo"
  | "local"
  | "ppc"
  | "social"
  | "content"
  | "branding"
  | "email"
  | "ecommerce"
  | "maintenance";

export interface FaqItem {
  q: string;
  a: string;
}

export interface Service {
  slug: string;
  order: number;
  name: string;
  shortName: string;
  group: ServiceGroup;
  pitch: string;
  sceneId: SceneId;
  /** Accent hue used by the page's 3D scene and highlights */
  accent: string;
  meta: { title: string; description: string };
  hero: { eyebrow: string; headline: string; subhead: string; cta: string };
  problem: string;
  included: { title: string; body: string }[];
  steps: { title: string; body: string }[];
  audience: string;
  tools: string[];
  faq: FaqItem[];
  finalCta: { headline: string; cta: string };
  related: string[];
}
