import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { services } from "@/content/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: site.url, lastModified: now, priority: 1 },
    { url: `${site.url}/services`, lastModified: now, priority: 0.9 },
    ...services.map((s) => ({ url: `${site.url}/services/${s.slug}`, lastModified: now, priority: 0.8 })),
    { url: `${site.url}/contact`, lastModified: now, priority: 0.8 },
    { url: `${site.url}/privacy`, lastModified: now, priority: 0.2 },
    { url: `${site.url}/terms`, lastModified: now, priority: 0.2 },
  ];
}
