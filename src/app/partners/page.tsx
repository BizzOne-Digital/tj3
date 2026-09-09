import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { PartnerForm } from "@/features/forms/PartnerForm";
import { PARTNER_CONTENT } from "@/lib/home-content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Partner With Us",
  description: "Partner with Little Mounties Community Sports Complex.",
  path: "/partners",
});

export default function PartnersPage() {
  return (
    <>
      <PageHero title={PARTNER_CONTENT.headline} subtitle={PARTNER_CONTENT.intro} />
      <section className="py-20">
        <Container className="max-w-4xl">
          <p className="mb-8 text-center text-cool-grey">{PARTNER_CONTENT.destination}</p>
          <PartnerForm />
        </Container>
      </section>
    </>
  );
}
