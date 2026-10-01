import type { Metadata } from "next";
import { site } from "@/content/site";
import type { Service, FaqItem } from "@/content/types";

export function pageMeta({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, siteName: site.name, type: "website", locale: "en_US" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${site.url}/#org`,
        name: site.legalName,
        url: site.url,
        logo: `${site.url}/icon.svg`,
        email: site.contact.email,
        sameAs: site.social.map((s) => s.href),
      },
      {
        "@type": "ProfessionalService",
        "@id": `${site.url}/#business`,
        name: site.name,
        url: site.url,
        telephone: site.contact.phone,
        email: site.contact.email,
        address: { "@type": "PostalAddress", streetAddress: site.contact.address, addressCountry: site.country },
        areaServed: site.city,
        parentOrganization: { "@id": `${site.url}/#org` },
      },
    ],
  };
}

export function serviceLd(s: Service) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: s.name,
        description: s.meta.description,
        serviceType: s.name,
        provider: { "@id": `${site.url}/#org` },
        areaServed: site.city,
        url: `${site.url}/services/${s.slug}`,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: site.url },
          { "@type": "ListItem", position: 2, name: "Services", item: `${site.url}/services` },
          { "@type": "ListItem", position: 3, name: s.name, item: `${site.url}/services/${s.slug}` },
        ],
      },
      faqLd(s.faq),
    ],
  };
}

export function faqLd(items: FaqItem[]) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
