import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { LeagueForm } from "@/features/forms/LeagueForm";
import { LEAGUE_INTRO, LEAGUE_SPORTS } from "@/lib/home-content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Bring Your League Here",
  description: "Tell Little Mounties about your league or team.",
  path: "/league",
});

export default function LeaguePage() {
  return (
    <>
      <PageHero title={LEAGUE_INTRO.headline} subtitle={LEAGUE_INTRO.question} />
      <section className="py-20">
        <Container className="max-w-3xl">
          <p className="mb-4 text-cool-grey">{LEAGUE_INTRO.sportsPrompt}</p>
          <ul className="mb-6 flex flex-wrap gap-2">
            {LEAGUE_SPORTS.map((sport) => (
              <li key={sport} className="rounded-full border border-ice/30 px-4 py-1.5 text-sm text-white">
                {sport}
              </li>
            ))}
          </ul>
          <p className="mb-8 text-cool-grey">{LEAGUE_INTRO.formPrompt}</p>
          <h2 className="mb-6 font-display text-2xl text-white">{LEAGUE_INTRO.formTitle}</h2>
          <LeagueForm />
        </Container>
      </section>
    </>
  );
}
