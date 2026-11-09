"use client";

import { ScrollReveal } from "@/components/animation/ScrollReveal";
import { useContent } from "@/components/providers/ContentProvider";
import { SectionBlock, ZeffyPayButton } from "@/components/ui/ContentBlocks";
import { SiteImage, SiteGalleryImage } from "@/components/ui/SiteImage";
import { Button } from "@/components/ui/Button";
import { FACEBOOK_URL, ZEFFY_URL } from "@/lib/home-content";
import Link from "next/link";
import { Check, ExternalLink } from "lucide-react";

export function WelcomeSection() {
  const welcome = useContent("home.welcome");
  return (
    <SectionBlock id="welcome" eyebrow={welcome.badge} title={welcome.headline}>
      <div className="grid min-w-0 gap-10 lg:grid-cols-2 lg:items-start">
        <div className="min-w-0 space-y-5 text-base leading-relaxed">
          <p className="text-lg text-ice">{welcome.subheadline}</p>
          {welcome.paragraphs.map((p, i) => (
            <p key={`${i}-${p.slice(0, 30)}`}>{p}</p>
          ))}
          <p className="font-display text-2xl text-white">{welcome.legacyLine}</p>
          <p>{welcome.mission}</p>
          <div>
            <h3 className="mb-3 font-display text-xl text-white">{welcome.visionTitle}</h3>
            <p className="mb-3">{welcome.visionIntro}</p>
            <ul className="space-y-2">
              {welcome.visionItems.map((item, i) => (
                <li key={`${i}-${item}`} className="flex gap-2">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-ice" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <ScrollReveal>
          <SiteImage
            imageKey="welcome"
            alt="Little Mounties Community Sports Complex welcome"
            className="aspect-[4/3] rounded-2xl"
            objectFit="contain"
          />
        </ScrollReveal>
      </div>
    </SectionBlock>
  );
}

export function LeagueCTASection() {
  const leagues = useContent("home.leagues");
  return (
    <section id="leagues" className="overflow-x-clip border-t border-border py-16 gradient-bg sm:py-20">
      <div className="mx-auto min-w-0 max-w-7xl px-4 sm:px-6">
        <ScrollReveal>
          <p className="break-words text-xs font-semibold uppercase tracking-[0.2em] text-ice sm:tracking-[0.35em]">
            {leagues.eyebrow}
          </p>
          <p className="mt-3 break-words text-cool-grey">{leagues.question}</p>
          <h2 className="mt-2 break-words font-display text-[clamp(1.75rem,7vw,3rem)] leading-tight text-white sm:text-5xl">
            {leagues.headline}
          </h2>
          <p className="mt-4 max-w-3xl text-cool-grey">{leagues.sportsPrompt}</p>
          <ul className="mt-4 flex flex-wrap gap-3">
            {leagues.sports.map((sport, i) => (
              <li key={`${i}-${sport}`} className="rounded-full border border-ice/30 px-4 py-1.5 text-sm text-white">
                {sport}
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-3xl text-cool-grey">{leagues.formPrompt}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/league">{leagues.formButtonLabel}</Button>
            <Button href="/partners" variant="outline">
              {leagues.partnerButtonLabel}
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

export function OfferingsSection() {
  const offerings = useContent("home.offerings");
  const blocks = [
    offerings.athletic,
    {
      ...offerings.family,
      extra: offerings.family.bullets,
    },
    {
      ...offerings.camps,
      extra: offerings.camps.bullets,
    },
    {
      ...offerings.more,
      extra: offerings.more.bullets,
    },
  ];

  return (
    <SectionBlock id="offerings" eyebrow={offerings.eyebrow} title={offerings.title}>
      <p>{offerings.intro}</p>

      {offerings.gallery.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {offerings.gallery.map((src, i) => (
            <SiteGalleryImage
              key={`${i}-${src}`}
              src={src}
              alt="Facility offerings preview"
              className="aspect-[4/5] min-h-[280px] sm:min-h-[320px] lg:min-h-[360px]"
            />
          ))}
        </div>
      )}

      <div className="space-y-16">
        {blocks.map((block, i) => (
          <ScrollReveal key={`${i}-${block.title}`} delay={i * 0.05}>
            <div className="min-w-0">
              <h3 className="break-words font-display text-[clamp(1.5rem,5vw,1.875rem)] text-white">
                {block.title}
              </h3>
              <p className="mt-4 leading-relaxed">{block.body}</p>
              {"extra" in block && block.extra && (
                <>
                  {"playStructure" in block && block.playStructure && (
                    <p className="mt-4 leading-relaxed">{block.playStructure}</p>
                  )}
                  <ul className="mt-4 space-y-2">
                    {block.extra.map((item, j) => (
                      <li key={`${j}-${item}`} className="flex gap-2">
                        <Check className="mt-1 h-4 w-4 shrink-0 text-ice" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
              {"closing" in block && block.closing && <p className="mt-4">{block.closing}</p>}
              {"goal" in block && block.goal && (
                <p className="mt-4 font-medium text-ice">{block.goal}</p>
              )}
            </div>
          </ScrollReveal>
        ))}
      </div>

      <div className="border-t border-border pt-10">
        <SiteImage imageKey="products" alt="View products" className="aspect-[21/9] rounded-2xl" objectFit="contain" />
        <div className="mt-6">
          <Button href="/shop" variant="outline">
            {offerings.productsButtonLabel}
          </Button>
        </div>
      </div>
    </SectionBlock>
  );
}

export function MembershipSection() {
  const memberships = useContent("home.memberships");
  return (
    <SectionBlock id="memberships" title={memberships.title}>
      <p>{memberships.body}</p>
      <p className="font-display text-xl text-ice">{memberships.note}</p>
      <p className="text-cool-grey">{memberships.earlyText}</p>
      <Button href="/founding-members">{memberships.buttonLabel}</Button>
    </SectionBlock>
  );
}

export function CampaignSection() {
  const campaign = useContent("home.campaign");
  return (
    <section id="campaign" className="overflow-x-clip border-t border-border py-16 sm:py-20">
      <div className="mx-auto min-w-0 max-w-7xl px-4 sm:px-6">
        <p className="break-words text-xs font-semibold uppercase tracking-[0.2em] text-ice sm:tracking-[0.35em]">
          {campaign.eyebrow}
        </p>
        <h2 className="mt-3 break-words font-display text-[clamp(1.75rem,7vw,3rem)] leading-tight text-white sm:text-5xl">
          {campaign.title}
        </h2>
        <p className="mt-4 max-w-3xl break-words font-display text-base uppercase leading-snug tracking-wide text-ice sm:text-lg">
          {campaign.headline}
        </p>
        <ScrollReveal className="mt-8">
          <div className="glass-panel mx-auto flex min-w-0 max-w-3xl flex-col rounded-2xl p-6 sm:p-8">
            <p className="text-sm uppercase tracking-[0.25em] text-ice">{campaign.cardLabel}</p>
            <h3 className="mt-3 font-display text-2xl text-white">{campaign.cardTitle}</h3>
            <p className="mt-4 text-cool-grey">{campaign.cardBody}</p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Button href={campaign.prospectusUrl} external>
                {campaign.prospectusButtonLabel}
              </Button>
              <Button href="/pricing" variant="outline">
                {campaign.tiersButtonLabel}
              </Button>
            </div>
          </div>
        </ScrollReveal>
        <div className="mx-auto mt-8 flex min-w-0 max-w-3xl flex-col items-center gap-6 text-center">
          <p className="text-cool-grey">{campaign.closingText}</p>
          <ZeffyPayButton href={ZEFFY_URL} label={campaign.donateButtonLabel} />
        </div>
      </div>
    </section>
  );
}

export function EconomicSection() {
  const economic = useContent("home.economic");
  return (
    <SectionBlock id="economic-impact" title={economic.title}>
      <ul className="space-y-4">
        {economic.items.map((item, i) => (
          <li key={`${i}-${item}`} className="flex gap-3">
            <Check className="mt-1 h-5 w-5 shrink-0 text-ice" />
            <span className="text-base">{item}</span>
          </li>
        ))}
      </ul>
    </SectionBlock>
  );
}

export function DonateSection() {
  const donate = useContent("home.donate");
  return (
    <section id="donate" className="overflow-x-clip border-t border-border py-16 gradient-bg sm:py-20">
      <div className="mx-auto min-w-0 max-w-3xl px-4 text-center sm:px-6">
        <h2 className="break-words font-display text-[clamp(1.75rem,7vw,3rem)] text-white sm:text-5xl">
          {donate.title}
        </h2>
        <p className="mt-4 text-lg text-cool-grey">{donate.body}</p>
        <div className="mt-8 flex justify-center">
          <ZeffyPayButton href={ZEFFY_URL} label={donate.buttonLabel} />
        </div>
      </div>
    </section>
  );
}

export function RealEstateSection() {
  const realEstate = useContent("home.realEstate");
  return (
    <SectionBlock id="real-estate" title={realEstate.title}>
      {realEstate.body.map((p, i) => (
        <p key={`${i}-${p.slice(0, 40)}`} className="leading-relaxed">
          {p}
        </p>
      ))}
      <ZeffyPayButton href={ZEFFY_URL} />
    </SectionBlock>
  );
}

export function InvestmentSection() {
  const investment = useContent("home.investment");
  return (
    <SectionBlock id="investment" title={investment.title}>
      {investment.body.map((p, i) => (
        <p key={`${i}-${p.slice(0, 40)}`} className="leading-relaxed">
          {p}
        </p>
      ))}
      <ZeffyPayButton href={ZEFFY_URL} />
    </SectionBlock>
  );
}

export function StayConnectedSection() {
  const stay = useContent("home.stayConnected");
  return (
    <section id="stay-connected" className="overflow-x-clip border-t border-border py-16 sm:py-20">
      <div className="mx-auto min-w-0 max-w-7xl px-4 sm:px-6">
        <h2 className="break-words font-display text-[clamp(1.75rem,7vw,3rem)] text-white sm:text-5xl">
          {stay.title}
        </h2>
        <p className="mt-4 max-w-3xl text-cool-grey">{stay.intro}</p>
        <ul className="mt-6 grid gap-2 sm:grid-cols-2">
          {stay.bullets.map((item, i) => (
            <li key={`${i}-${item}`} className="flex gap-2 text-cool-grey">
              <Check className="mt-1 h-4 w-4 shrink-0 text-ice" />
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-3xl text-cool-grey">{stay.footer}</p>
        <Link
          href={FACEBOOK_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex max-w-full flex-wrap items-center justify-center gap-2 rounded-xl bg-[#1877F2] px-5 py-3 text-center text-sm font-semibold text-white transition-opacity hover:opacity-90 sm:px-6"
        >
          <ExternalLink className="h-5 w-5" />
          {stay.buttonLabel}
        </Link>
      </div>
    </section>
  );
}

export function PartnersCTASection() {
  const partners = useContent("home.partnersCta");
  return (
    <section className="overflow-x-clip border-t border-border py-12 sm:py-16">
      <div className="mx-auto min-w-0 max-w-7xl px-4 text-center sm:px-6">
        <h2 className="break-words font-display text-[clamp(1.5rem,6vw,1.875rem)] text-white">
          {partners.headline}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-cool-grey">{partners.intro}</p>
        <p className="mx-auto mt-3 max-w-2xl text-cool-grey">{partners.destination}</p>
        <p className="mx-auto mt-3 max-w-2xl text-cool-grey">{partners.letsTalk}</p>
        <Button href="/partners" className="mt-6">
          {partners.buttonLabel}
        </Button>
      </div>
    </section>
  );
}
