import { site } from "@/content/site";
import { pageMeta } from "@/lib/seo";
import { SetScene } from "@/components/three/SceneLayer";
import { LegalPage } from "@/components/sections/legal/LegalPage";

export const metadata = pageMeta({ title: `Terms of Use | ${site.name}`, description: `Terms for using the ${site.name} website.`, path: "/terms" });

// TEMPLATE — have this reviewed by a lawyer for your jurisdiction before launch.
export default function TermsPage() {
  return (
    <>
      <SetScene id="core" />
      <LegalPage title="Terms of Use" updated="October 2026">
        <p>By using this website you agree to these terms. If you don&apos;t agree, please don&apos;t use the site.</p>
        <h2>Content</h2>
        <p>All content on this site, including text, graphics and code, belongs to {site.legalName} unless stated otherwise. You may not copy or reuse it without permission.</p>
        <h2>No guarantees</h2>
        <p>Information on this site is general and may change. Results shown are examples and don&apos;t guarantee the same outcome for your business. Project terms are set out in a separate written agreement.</p>
        <h2>Contact</h2>
        <p>Questions about these terms? Email <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>.</p>
      </LegalPage>
    </>
  );
}
