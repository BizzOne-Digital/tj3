import type { Sponsor } from "@/types/cms";
import { SponsorGlowCard } from "@/components/animation/SponsorGlowCard";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function SponsorsSection({ sponsors }: { sponsors: Sponsor[] }) {
  const published = sponsors.filter((s) => s.published);
  if (published.length === 0) return null;

  return (
    <section className="border-t border-border py-24">
      <Container>
        <SectionHeading
          eyebrow="Partners"
          title="Our Sponsors"
          description="Thank you to the organizations powering our community."
          align="center"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {published.map((sponsor) => (
            <SponsorGlowCard key={sponsor._id} sponsor={sponsor} />
          ))}
        </div>
      </Container>
    </section>
  );
}
