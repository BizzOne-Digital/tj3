import { ScrollReveal } from "@/components/animation/ScrollReveal";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { CmsImage } from "@/components/ui/CmsImage";
import { api } from "@/lib/api";
import { BRAND } from "@/lib/constants";
import { STATIC_TEAM } from "@/lib/home-content";
import { buildMetadata } from "@/lib/seo";
import { Mail, Phone } from "lucide-react";

export const metadata = buildMetadata({
  title: "Our Team",
  description: "Meet the people behind Little Mounties Community Sports Complex.",
  path: "/team",
});

export default async function TeamPage() {
  let members: Awaited<ReturnType<typeof api.getTeam>>["data"] = [];
  try {
    const res = await api.getTeam();
    members = res.data.filter((m) => m.published);
  } catch {
    /* empty */
  }

  const displayMembers =
    members.length > 0
      ? members.map((m) => ({
          name: m.name,
          role: m.role,
          bio: m.bio,
          photoUrl: m.photoUrl,
        }))
      : STATIC_TEAM.map((m) => ({ ...m, photoUrl: undefined as string | undefined }));

  return (
    <>
      <PageHero title="Our Team" subtitle="The people building Clearfield County's next sports destination." />
      <section className="py-24">
        <Container>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {displayMembers.map((member, i) => (
              <ScrollReveal key={member.name} delay={i * 0.05}>
                <article className="glass-panel rounded-2xl p-8 text-center">
                  {member.photoUrl ? (
                    <div className="relative mx-auto h-24 w-24 overflow-hidden rounded-full bg-graphite">
                      <CmsImage src={member.photoUrl} alt={member.name} fill />
                    </div>
                  ) : (
                    <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-ice/10 font-display text-3xl text-ice">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                  )}
                  <h2 className="mt-6 font-display text-2xl text-white">{member.name}</h2>
                  <p className="mt-1 text-sm font-medium text-ice">{member.role}</p>
                  <p className="mt-3 text-sm text-cool-grey">{member.bio}</p>
                </article>
              </ScrollReveal>
            ))}
          </div>
          <div className="mx-auto mt-12 flex max-w-md flex-col items-center gap-6 text-cool-grey">
            <Button href="/booster-schedule" variant="outline">
              Varsity Booster Schedule
            </Button>
            <a href={`mailto:${BRAND.email}`} className="flex items-center justify-center gap-2 hover:text-ice">
              <Mail className="h-4 w-4" />
              {BRAND.email}
            </a>
            <a href={`tel:${BRAND.phone}`} className="flex items-center justify-center gap-2 hover:text-ice">
              <Phone className="h-4 w-4" />
              {BRAND.phone}
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}
