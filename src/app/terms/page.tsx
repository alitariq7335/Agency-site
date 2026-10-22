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
        <h2>Proposals and scope</h2>
        <p>Every project starts with a written proposal that sets out the scope, deliverables, timeline, price, payment terms and number of revision rounds. Work outside that scope, including extra revision rounds, is quoted separately before it starts.</p>
        <h2>Payment</h2>
        <p>Projects require a 50% deposit before work starts and the balance on delivery, unless your proposal says otherwise. Monthly retainers are paid at the start of each month. International projects are billed in USD. We may pause work on overdue invoices.</p>
        <h2>Third-party costs</h2>
        <p>Hosting, domains, ad spend, app store fees, paid plugins and software subscriptions are paid by you directly or billed at cost.</p>
        <h2>Ownership</h2>
        <p>Once paid in full, you own the final deliverables made for you. We may show finished work in our portfolio unless you tell us not to in writing.</p>
        <h2>Confidentiality</h2>
        <p>Your data, logins and customer lists are kept confidential and never shared or reused.</p>
        <h2>Support</h2>
        <p>Projects include a support period after launch (normally 30 days), after which an optional maintenance plan is available.</p>
        <h2>Refunds and cancellation</h2>
        <p>What can be refunded depends on the stage the work has reached and is set out in your service agreement.</p>
        <h2>Website content</h2>
        <p>Content on this website belongs to {site.legalName} unless stated otherwise. Information here is general and may change; your proposal and service agreement are what apply to your project.</p>
        <h2>Contact</h2>
        <p>Questions about these terms? Email <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>.</p>
      </LegalPage>
    </>
  );
}
