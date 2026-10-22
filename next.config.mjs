// Plain JavaScript config (no TypeScript transpile step) so it loads on hosts
// where Next.js falls back to WebAssembly SWC, e.g. Hostinger's older glibc.

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: { formats: ["image/avif", "image/webp"] },
  experimental: {
    optimizePackageImports: ["lucide-react", "@react-three/drei", "motion"],
    serverActions: { bodySizeLimit: "12mb" }, // allows a 10 MB brief upload
  },
  // Service URLs from the first version of the site → their closest new page (permanent).
  async redirects() {
    const moved = {
      "web-design-development": "website-development",
      seo: "local-seo",
      "google-ads-ppc": "digital-marketing",
      "social-media-marketing": "social-media-management",
      "content-generation": "content-creation",
      "branding-graphic-design": "content-creation",
      "email-marketing": "digital-marketing",
      "ecommerce-solutions": "ecommerce-stores",
      "website-maintenance-support": "wordpress-development",
    };
    return Object.entries(moved).map(([from, to]) => ({ source: `/services/${from}`, destination: `/services/${to}`, permanent: true }));
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
