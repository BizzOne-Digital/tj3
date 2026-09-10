import { PageHero } from "@/components/layout/PageHero";
import { BoosterScheduleSections } from "@/features/booster/BoosterScheduleSections";
import { BOOSTER_SCHEDULE } from "@/lib/booster-schedule-content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Varsity Booster Schedule",
  description: "Monthly booster board planning outline for the varsity season.",
  path: "/booster-schedule",
});

export default function BoosterSchedulePage() {
  return (
    <>
      <PageHero title={BOOSTER_SCHEDULE.title} subtitle={BOOSTER_SCHEDULE.subtitle} />
      <BoosterScheduleSections />
    </>
  );
}
