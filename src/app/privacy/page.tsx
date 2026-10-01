import { site } from "@/content/site";
import { pageMeta } from "@/lib/seo";
import { SetScene } from "@/components/three/SceneLayer";
import { LegalPage } from "@/components/sections/legal/LegalPage";

export const metadata = pageMeta({ title: `Privacy Policy | ${site.name}`, description: `How ${site.name} collects and uses your information.`, path: "/privacy" });

// TEMPLATE — have this reviewed by a lawyer for your jurisdiction before launch.
export default function PrivacyPage() {
  return (
    <>
      <SetScene id="core" />
      <LegalPage title="Privacy Policy" updated="October 2026">
        <p>This policy explains what information {site.legalName} collects when you use this website or contact us, and how we use it.</p>
        <h2>What we collect</h2>
        <ul>
          <li>Details you send through our contact or newsletter forms: name, email, phone, company, website, project details and any file you attach.</li>
          <li>Basic analytics about how the site is used (pages viewed, device type, approximate location), collected through Google Analytics and Vercel Analytics.</li>
        </ul>
        <h2>How we use it</h2>
        <ul>
          <li>To reply to your enquiry and prepare for a strategy call.</li>
          <li>To send the newsletter, if you subscribed. Every email has an unsubscribe link.</li>
          <li>To understand which pages are useful and improve the site.</li>
        </ul>
        <h2>Sharing</h2>
        <p>We don&apos;t sell your data. We use trusted providers to run the site and send email (for example Vercel, Resend and Google), who process data on our behalf.</p>
        <h2>Your choices</h2>
        <p>You can ask us to access, correct or delete your information at any time by emailing <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>.</p>
      </LegalPage>
    </>
  );
}
