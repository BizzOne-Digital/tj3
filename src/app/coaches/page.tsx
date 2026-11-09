import { ScrollReveal } from "@/components/animation/ScrollReveal";
import { PageHero } from "@/components/layout/PageHero";
import { CmsImage } from "@/components/ui/CmsImage";
import { Container } from "@/components/ui/Container";
import { api } from "@/lib/api";
import { buildMetadata } from "@/lib/seo";
import { getContent } from "@/lib/site-content-server";
import type { Coach } from "@/types/cms";
import { Award, Mail, Phone } from "lucide-react";

export const metadata = buildMetadata({
  title: "Our Coaches",
  description: "Meet the coaches and trainers at Little Mounties Community Sports Complex.",
  path: "/coaches",
});

export default async function CoachesPage() {
  const heroes = await getContent("pageHeroes");
  let coaches: Coach[] = [];
  try {
    coaches = (await api.getCoaches()).data;
  } catch {
    /* show empty state */
  }

  return (
    <>
      <PageHero title={heroes.coaches.title} subtitle={heroes.coaches.subtitle} />
      <section className="py-20">
        <Container>
          {coaches.length === 0 ? (
            <p className="mx-auto max-w-xl rounded-xl border border-border bg-surface p-8 text-center text-cool-grey">
              Our coaching staff will be announced soon.
            </p>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {coaches.map((coach, i) => (
                <ScrollReveal key={coach._id} delay={i * 0.05} className="h-full">
                  <article className="glass-panel flex h-full min-w-0 flex-col overflow-hidden rounded-2xl">
                    {coach.photoUrl ? (
                      <div className="relative aspect-[4/5] w-full shrink-0 bg-graphite">
                        <CmsImage src={coach.photoUrl} alt={coach.name} fill className="object-top" />
                      </div>
                    ) : (
                      <div className="flex aspect-[4/5] w-full shrink-0 items-center justify-center bg-ice/10 font-display text-5xl text-ice">
                        {coach.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)}
                      </div>
                    )}
                    <div className="flex flex-1 flex-col p-6">
                      <h2 className="break-words font-display text-2xl text-white">{coach.name}</h2>
                      {(coach.title || coach.sport) && (
                        <p className="mt-1 text-sm font-medium text-ice">
                          {[coach.title, coach.sport].filter(Boolean).join(" · ")}
                        </p>
                      )}
                      {coach.bio && <p className="mt-3 text-sm leading-relaxed text-cool-grey">{coach.bio}</p>}
                      {coach.credentials && coach.credentials.length > 0 && (
                        <ul className="mt-4 space-y-1.5 text-sm text-cool-grey">
                          {coach.credentials.map((c, j) => (
                            <li key={`${j}-${c}`} className="flex gap-2">
                              <Award className="mt-0.5 h-4 w-4 shrink-0 text-ice" />
                              {c}
                            </li>
                          ))}
                        </ul>
                      )}
                      {(coach.email || coach.phone) && (
                        <div className="mt-auto flex flex-col gap-1.5 pt-5 text-sm text-cool-grey">
                          {coach.email && (
                            <a href={`mailto:${coach.email}`} className="flex items-center gap-2 break-all hover:text-ice">
                              <Mail className="h-4 w-4 shrink-0" />
                              {coach.email}
                            </a>
                          )}
                          {coach.phone && (
                            <a href={`tel:${coach.phone}`} className="flex items-center gap-2 hover:text-ice">
                              <Phone className="h-4 w-4 shrink-0" />
                              {coach.phone}
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
