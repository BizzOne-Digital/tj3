import { ScrollReveal } from "@/components/animation/ScrollReveal";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { api } from "@/lib/api";
import { formatEventDate, formatTimeRange, groupSchedule } from "@/lib/schedule";
import { buildMetadata } from "@/lib/seo";
import { getContent } from "@/lib/site-content-server";
import type { ScheduleItem } from "@/types/cms";
import { Clock, MapPin, User, Users } from "lucide-react";

export const metadata = buildMetadata({
  title: "Schedule",
  description: "Weekly programs, camps, clinics and events at Little Mounties Community Sports Complex.",
  path: "/schedule",
});

function ScheduleCard({ item, showDate }: { item: ScheduleItem; showDate?: boolean }) {
  const time = formatTimeRange(item);
  const when = [showDate ? formatEventDate(item.eventDate) : "", time].filter(Boolean).join(" · ");
  return (
    <article className="glass-panel flex h-full min-w-0 flex-col gap-3 rounded-xl p-5">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <h3 className="break-words font-display text-xl text-white">{item.title}</h3>
        {item.category && (
          <span className="rounded-full border border-ice/30 px-3 py-0.5 text-xs text-ice">{item.category}</span>
        )}
      </div>
      <ul className="space-y-1.5 text-sm text-cool-grey">
        {when && (
          <li className="flex items-center gap-2">
            <Clock className="h-4 w-4 shrink-0 text-ice" />
            {when}
          </li>
        )}
        {item.coach && (
          <li className="flex items-center gap-2">
            <User className="h-4 w-4 shrink-0 text-ice" />
            {item.coach}
          </li>
        )}
        {item.location && (
          <li className="flex items-center gap-2">
            <MapPin className="h-4 w-4 shrink-0 text-ice" />
            {item.location}
          </li>
        )}
        {item.ageGroup && (
          <li className="flex items-center gap-2">
            <Users className="h-4 w-4 shrink-0 text-ice" />
            {item.ageGroup}
          </li>
        )}
      </ul>
      {item.description && <p className="text-sm text-cool-grey">{item.description}</p>}
      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-2">
        {item.price && <span className="font-semibold text-white">{item.price}</span>}
        {item.registrationUrl && (
          <Button href={item.registrationUrl} external size="sm" variant="outline">
            Register
          </Button>
        )}
      </div>
    </article>
  );
}

export default async function SchedulePage() {
  const heroes = await getContent("pageHeroes");
  let items: ScheduleItem[] = [];
  try {
    items = (await api.getSchedule()).data;
  } catch {
    /* show empty state */
  }

  const today = new Date().toISOString().slice(0, 10);
  const { weekly, events } = groupSchedule(items, today);

  return (
    <>
      <PageHero title={heroes.schedule.title} subtitle={heroes.schedule.subtitle} />
      <section className="py-20">
        <Container>
          {weekly.length === 0 && events.length === 0 ? (
            <p className="mx-auto max-w-xl rounded-xl border border-border bg-surface p-8 text-center text-cool-grey">
              Our schedule is being finalized. Check back soon or contact us for updates.
            </p>
          ) : (
            <div className="space-y-16">
              {weekly.length > 0 && (
                <div className="space-y-10">
                  <h2 className="font-display text-3xl text-white">Weekly Schedule</h2>
                  {weekly.map((group) => (
                    <div key={group.day}>
                      <h3 className="mb-4 font-display text-xl tracking-wide text-ice">{group.day}</h3>
                      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                        {group.items.map((item, i) => (
                          <ScrollReveal key={item._id} delay={i * 0.04} className="h-full">
                            <ScheduleCard item={item} />
                          </ScrollReveal>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {events.length > 0 && (
                <div>
                  <h2 className="mb-6 font-display text-3xl text-white">Upcoming Events</h2>
                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {events.map((item, i) => (
                      <ScrollReveal key={item._id} delay={i * 0.04} className="h-full">
                        <ScheduleCard item={item} showDate />
                      </ScrollReveal>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
