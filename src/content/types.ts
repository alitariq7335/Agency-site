export type ServiceLineId = "ai" | "development" | "ecommerce" | "growth" | "content";

export type SceneId =
  | "core"
  | "helix"
  | "hello"
  | "web"
  | "phone"
  | "seo"
  | "local"
  | "ppc"
  | "social"
  | "content"
  | "email"
  | "ecommerce"
  | "maintenance"
  | "automation";

export type Market = "local" | "international" | "both";

export interface FaqItem {
  q: string;
  a: string;
}

export interface ServiceLine {
  id: ServiceLineId;
  title: string;
  line: string;
  accent: string;
  market: string;
  /** How work in this line is delivered (from the delivery standards) */
  approach: string;
  /** Quality check before handover */
  qualityCheck: string;
  steps: { title: string; body: string }[];
}

export interface Service {
  slug: string;
  order: number;
  name: string;
  shortName: string;
  line: ServiceLineId;
  market: Market;
  flagship?: boolean;
  pitch: string;
  sceneId: SceneId;
  /** Accent used by the page's 3D scene and highlights */
  accent: string;
  meta: { title: string; description: string };
  hero: { eyebrow: string; headline: string; subhead: string; cta: string };
  problem: string;
  included: { title: string; body: string }[];
  audience: string;
  tools: string[];
  faq: FaqItem[];
  finalCta: { headline: string; cta: string };
  related: string[];
}
