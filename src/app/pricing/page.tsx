import { ScrollReveal } from "@/components/animation/ScrollReveal";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionBlock, ZeffyPayButton } from "@/components/ui/ContentBlocks";
import { api } from "@/lib/api";
import {
  CAMPAIGN_HEADLINE,
  EXCLUSIVITY_RULES,
  MEDIA_PERKS,
  PRICING_CATEGORY_LABELS,
  SIGNAGE_OPTIONS,
  STATIC_PRICING_TIERS,
  ZEFFY_URL,
} from "@/lib/home-content";
import { buildMetadata } from "@/lib/seo";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Sponsorship & Founding Partners",
  description: "Capital campaign giving levels and recognition opportunities.",
  path: "/pricing",
});

const CATEGORY_ORDER = [
  "Naming Rights",
  "Platinum",
  "Gold",
  "Silver",
  "Bronze",
  "Supporter",
  "Friend",
];

type DisplayTier = {
  _id: string;
  name: string;
  price: string;
  category?: string;
  description?: string;
  features: string[];
  highlighted?: boolean;
  order: number;
  zeffyUrl?: string;
  ctaUrl?: string;
};

export default async function PricingPage() {
  let tiers: DisplayTier[] = [];
  try {
    const res = await api.getPricing();
    tiers = res.data
      .filter((t) => t.published)
      .sort((a, b) => a.order - b.order)
      .map((t) => ({
        _id: t._id,
        name: t.name,
        price: t.price,
        category: t.category,
        description: t.description,
        features: t.features,
        highlighted: t.highlighted,
        order: t.order,
        zeffyUrl: t.zeffyUrl,
        ctaUrl: t.ctaUrl,
      }));
  } catch {
    /* empty */
  }

  if (tiers.length === 0) {
    tiers = STATIC_PRICING_TIERS;
  }

  const grouped = CATEGORY_ORDER.map((cat) => ({
    category: cat,
    label: PRICING_CATEGORY_LABELS[cat] ?? cat,
    items: tiers.filter((t) => t.category === cat),
  })).filter((g) => g.items.length > 0);

  const shownLabels = new Set<string>();

  return (
    <>
      <PageHero title="Founding Partners" subtitle={CAMPAIGN_HEADLINE} />

      <section className="overflow-x-clip py-20">
        <Container>
          <div className="space-y-16">
            {grouped.map((group) => {
              const showLabel = !shownLabels.has(group.label);
              if (showLabel) shownLabels.add(group.label);
              return (
                <div key={group.category}>
                  {showLabel && (
                    <h2 className="mb-8 font-display text-3xl text-white">{group.label}</h2>
                  )}
                  <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                    {group.items.map((tier, i) => (
                      <ScrollReveal key={tier._id} delay={i * 0.05}>
                        <article
                          className={cn(
                            "glass-panel flex h-full min-w-0 flex-col rounded-2xl p-6 sm:p-8",
                            tier.highlighted && "border-ice/40 ring-2 ring-electric/30",
                          )}
                        >
                          <h3 className="break-words font-display text-xl text-white sm:text-2xl">{tier.name}</h3>
                          <p className="mt-4 break-words font-display text-[clamp(1.5rem,6vw,2.25rem)] gradient-text">
                            {tier.price}
                          </p>
                          {tier.description && (
                            <p className="mt-3 text-sm text-cool-grey">{tier.description}</p>
                          )}
                          <ul className="mt-6 flex-1 space-y-3">
                            {tier.features.map((f) => (
                              <li key={f} className="flex items-start gap-2 text-sm text-cool-grey">
                                <Check className="mt-0.5 h-4 w-4 shrink-0 text-ice" />
                                {f}
                              </li>
                            ))}
                          </ul>
                          <div className="mt-8">
                            <ZeffyPayButton
                              href={tier.zeffyUrl || tier.ctaUrl || ZEFFY_URL}
                              label="Click Here For Payment"
                            />
                          </div>
                        </article>
                      </ScrollReveal>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <SectionBlock title="Signage Options (Add-Ons or Included in Tiers)">
        <ul className="grid gap-4 sm:grid-cols-2">
          {SIGNAGE_OPTIONS.map((item) => (
            <li key={item.name} className="glass-panel rounded-xl p-5">
              <p className="font-display text-lg text-white">{item.name}</p>
              <p className="mt-1 text-ice">{item.price}</p>
            </li>
          ))}
        </ul>
        <ZeffyPayButton href={ZEFFY_URL} label="Click Here For Payment" />
      </SectionBlock>

      <SectionBlock title="Digital & Media Perks (Included)">
        <ul className="space-y-2">
          {MEDIA_PERKS.map((item) => (
            <li key={item} className="flex gap-2">
              <Check className="mt-1 h-4 w-4 text-ice" />
              {item}
            </li>
          ))}
        </ul>
        <ZeffyPayButton href={ZEFFY_URL} label="Click Here For Payment" />
      </SectionBlock>

      <SectionBlock title="Exclusivity Rules (Critical)">
        <ul className="space-y-3">
          {EXCLUSIVITY_RULES.map((rule) => (
            <li key={rule} className="flex gap-2">
              <Check className="mt-1 h-4 w-4 text-ice" />
              {rule}
            </li>
          ))}
        </ul>
        <ZeffyPayButton href={ZEFFY_URL} label="Click Here For Payment" />
      </SectionBlock>
    </>
  );
}
