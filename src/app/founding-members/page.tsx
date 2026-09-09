import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { FoundingMemberForm } from "@/features/forms/FoundingMemberForm";
import { FOUNDING_MEMBERS_INTRO } from "@/lib/home-content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Founding Members",
  description: "Express interest in future membership at Little Mounties.",
  path: "/founding-members",
});

export default function FoundingMembersPage() {
  return (
    <>
      <PageHero title="Future Members" subtitle={FOUNDING_MEMBERS_INTRO.early} />
      <section className="py-20">
        <Container className="max-w-3xl">
          <div className="mb-8 space-y-3 text-cool-grey">
            <p className="font-display text-xl text-ice">{FOUNDING_MEMBERS_INTRO.notSelling}</p>
            <p>{FOUNDING_MEMBERS_INTRO.body}</p>
          </div>
          <FoundingMemberForm />
        </Container>
      </section>
    </>
  );
}
