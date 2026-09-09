import type { StatItem } from "@/types/cms";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function StatsSection({ stats }: { stats: StatItem[] }) {
  const published = stats.filter((s) => s.published);
  if (published.length === 0) return null;

  return (
    <section className="py-24 radial-glow">
      <Container>
        <SectionHeading
          eyebrow="By The Numbers"
          title="Our Impact"
          description="Real stats from our community — updated from CMS."
          align="center"
        />
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {published.map((stat) => (
            <AnimatedCounter
              key={stat._id}
              value={stat.value}
              prefix={stat.prefix}
              suffix={stat.suffix}
              label={stat.label}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
