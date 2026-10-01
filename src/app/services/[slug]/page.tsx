import { notFound } from "next/navigation";
import { services, getService } from "@/content/services";
import { pageMeta, serviceLd, JsonLd } from "@/lib/seo";
import { SetScene } from "@/components/three/SceneLayer";
import { ServiceHero } from "@/components/sections/service/ServiceHero";
import { ServiceProblem, ServiceIncluded, ServiceSteps, ServiceAudience, ServiceRelated } from "@/components/sections/service/ServiceBody";
import { Faq } from "@/components/sections/shared/Faq";
import { FinalCta } from "@/components/sections/shared/FinalCta";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return pageMeta({ ...s.meta, path: `/services/${s.slug}` });
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();

  return (
    <>
      <SetScene id={s.sceneId} accent={s.accent} />
      <JsonLd data={serviceLd(s)} />
      <ServiceHero s={s} />
      <ServiceProblem s={s} />
      <ServiceIncluded s={s} />
      <ServiceSteps s={s} />
      <ServiceAudience s={s} />
      <Faq heading="Questions, answered." items={s.faq} />
      <FinalCta
        headline={s.finalCta.headline}
        primary={{ label: s.finalCta.cta, href: `/contact?service=${encodeURIComponent(s.slug)}` }}
        secondary={{ label: "See all services", href: "/services" }}
      />
      <ServiceRelated s={s} />
    </>
  );
}
