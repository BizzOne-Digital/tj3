"use client";

import { ScrollReveal } from "@/components/animation/ScrollReveal";
import { SectionBlock, ZeffyPayButton } from "@/components/ui/ContentBlocks";
import { SiteImage, SiteGalleryImage } from "@/components/ui/SiteImage";
import { Button } from "@/components/ui/Button";
import {
  ECONOMIC_IMPACT,
  FACEBOOK_URL,
  HOME_WELCOME,
  LEAGUE_SPORTS,
  MEMBERSHIPS,
  FOUNDING_MEMBERS_INTRO,
  OFFERINGS,
  REAL_ESTATE,
  INVESTMENT,
  OFFERING_GALLERY,
  ZEFFY_URL,
  LEAGUE_INTRO,
  CAMPAIGN_HEADLINE,
  STAY_CONNECTED_BULLETS,
  STAY_CONNECTED_FOOTER,
  PARTNER_CONTENT,
} from "@/lib/home-content";
import Link from "next/link";
import { Check, ExternalLink } from "lucide-react";

export function WelcomeSection() {
  return (
    <SectionBlock id="welcome" eyebrow={HOME_WELCOME.badge} title={HOME_WELCOME.headline}>
      <div className="grid min-w-0 gap-10 lg:grid-cols-2 lg:items-start">
        <div className="min-w-0 space-y-5 text-base leading-relaxed">
          <p className="text-lg text-ice">{HOME_WELCOME.subheadline}</p>
          {HOME_WELCOME.paragraphs.map((p) => (
            <p key={p.slice(0, 30)}>{p}</p>
          ))}
          <p className="font-display text-2xl text-white">{HOME_WELCOME.legacyLine}</p>
          <p>{HOME_WELCOME.mission}</p>
          <div>
            <h3 className="mb-3 font-display text-xl text-white">{HOME_WELCOME.visionTitle}</h3>
            <p className="mb-3">{HOME_WELCOME.visionIntro}</p>
            <ul className="space-y-2">
              {HOME_WELCOME.visionItems.map((item) => (
                <li key={item} className="flex gap-2">
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
  return (
    <section id="leagues" className="overflow-x-clip border-t border-border py-16 gradient-bg sm:py-20">
      <div className="mx-auto min-w-0 max-w-7xl px-4 sm:px-6">
        <ScrollReveal>
          <p className="break-words text-xs font-semibold uppercase tracking-[0.2em] text-ice sm:tracking-[0.35em]">
            Leagues & Teams
          </p>
          <p className="mt-3 break-words text-cool-grey">{LEAGUE_INTRO.question}</p>
          <h2 className="mt-2 break-words font-display text-[clamp(1.75rem,7vw,3rem)] leading-tight text-white sm:text-5xl">
            {LEAGUE_INTRO.headline}
          </h2>
          <p className="mt-4 max-w-3xl text-cool-grey">{LEAGUE_INTRO.sportsPrompt}</p>
          <ul className="mt-4 flex flex-wrap gap-3">
            {LEAGUE_SPORTS.map((sport) => (
              <li key={sport} className="rounded-full border border-ice/30 px-4 py-1.5 text-sm text-white">
                {sport}
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-3xl text-cool-grey">{LEAGUE_INTRO.formPrompt}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/league">{LEAGUE_INTRO.formTitle}</Button>
            <Button href="/partners" variant="outline">
              Partner With Us
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

export function OfferingsSection() {
  const blocks = [
    OFFERINGS.athletic,
    {
      ...OFFERINGS.family,
      extra: OFFERINGS.family.bullets,
      closing: OFFERINGS.family.closing,
      goal: OFFERINGS.family.goal,
      playStructure: OFFERINGS.family.playStructure,
    },
    {
      ...OFFERINGS.camps,
      extra: OFFERINGS.camps.bullets,
      goal: OFFERINGS.camps.goal,
    },
    {
      ...OFFERINGS.more,
      extra: OFFERINGS.more.bullets,
      closing: OFFERINGS.more.closing,
    },
  ];

  return (
    <SectionBlock
      id="offerings"
      eyebrow="What We Offer"
      title="What Is Little Mounties Community Sports Complex Offering?"
    >
      <p>{OFFERINGS.intro}</p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {OFFERING_GALLERY.map((src) => (
          <SiteGalleryImage
            key={src}
            src={src}
            alt="Facility offerings preview"
            className="aspect-[4/5] min-h-[280px] sm:min-h-[320px] lg:min-h-[360px]"
          />
        ))}
      </div>

      <div className="space-y-16">
        {blocks.map((block, i) => (
          <ScrollReveal key={block.title} delay={i * 0.05}>
            <div className="min-w-0">
              <h3 className="break-words font-display text-[clamp(1.5rem,5vw,1.875rem)] text-white">
                {block.title}
              </h3>
              <p className="mt-4 leading-relaxed">{block.body}</p>
              {"extra" in block && block.extra && (
                <ul className="mt-4 space-y-2">
                  {"playStructure" in block && block.playStructure && (
                    <p className="mb-3 leading-relaxed">{block.playStructure}</p>
                  )}
                  {block.extra.map((item) => (
                    <li key={item} className="flex gap-2">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-ice" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
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
            View Products
          </Button>
        </div>
      </div>
    </SectionBlock>
  );
}

export function MembershipSection() {
  return (
    <SectionBlock id="memberships" title={MEMBERSHIPS.title}>
      <p>{MEMBERSHIPS.body}</p>
      <p className="font-display text-xl text-ice">{MEMBERSHIPS.note}</p>
      <p className="text-cool-grey">{FOUNDING_MEMBERS_INTRO.early}</p>
      <Button href="/founding-members">Founding Members Interest Form</Button>
    </SectionBlock>
  );
}

export function CampaignSection() {
  return (
    <section id="campaign" className="overflow-x-clip border-t border-border py-16 sm:py-20">
      <div className="mx-auto min-w-0 max-w-7xl px-4 sm:px-6">
        <p className="break-words text-xs font-semibold uppercase tracking-[0.2em] text-ice sm:tracking-[0.35em]">
          Capital Campaign
        </p>
        <h2 className="mt-3 break-words font-display text-[clamp(1.75rem,7vw,3rem)] leading-tight text-white sm:text-5xl">
          Capital Campaign Prospectus
        </h2>
        <p className="mt-4 max-w-3xl break-words font-display text-base uppercase leading-snug tracking-wide text-ice sm:text-lg">
          {CAMPAIGN_HEADLINE}
        </p>
        <ScrollReveal className="mt-8">
          <div className="glass-panel mx-auto flex min-w-0 max-w-3xl flex-col rounded-2xl p-6 sm:p-8">
            <p className="text-sm uppercase tracking-[0.25em] text-ice">Campaign Draft Prospectus</p>
            <h3 className="mt-3 font-display text-2xl text-white">Capital Campaign Prospectus</h3>
            <p className="mt-4 text-cool-grey">
              Review the full capital campaign prospectus with giving levels, recognition opportunities, and
              community impact details.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Button href="/images/campaign-prospectus.pdf" external>
                View Prospectus PDF
              </Button>
              <Button href="/pricing" variant="outline">
                View Sponsorship Tiers
              </Button>
            </div>
          </div>
        </ScrollReveal>
        <div className="mx-auto mt-8 flex min-w-0 max-w-3xl flex-col items-center gap-6 text-center">
          <p className="text-cool-grey">
            From facility naming rights to community supporter tiers, every gift helps build Clearfield
            County&apos;s next-generation sports destination.
          </p>
          <ZeffyPayButton href={ZEFFY_URL} label="Donate Any Amount" />
        </div>
      </div>
    </section>
  );
}

export function EconomicSection() {
  return (
    <SectionBlock id="economic-impact" title="An Economic Driver for Clearfield County">
      <ul className="space-y-4">
        {ECONOMIC_IMPACT.map((item) => (
          <li key={item} className="flex gap-3">
            <Check className="mt-1 h-5 w-5 shrink-0 text-ice" />
            <span className="text-base">{item}</span>
          </li>
        ))}
      </ul>
    </SectionBlock>
  );
}

export function DonateSection() {
  return (
    <section id="donate" className="overflow-x-clip border-t border-border py-16 gradient-bg sm:py-20">
      <div className="mx-auto min-w-0 max-w-3xl px-4 text-center sm:px-6">
        <h2 className="break-words font-display text-[clamp(1.75rem,7vw,3rem)] text-white sm:text-5xl">Donate</h2>
        <p className="mt-4 text-lg text-cool-grey">
          Help build a lasting legacy for our community. Please give any amount to this campaign to help build
          our community&apos;s future.
        </p>
        <div className="mt-8 flex justify-center">
          <ZeffyPayButton href={ZEFFY_URL} label="Click Here For Payment" />
        </div>
      </div>
    </section>
  );
}

export function RealEstateSection() {
  return (
    <SectionBlock id="real-estate" title={REAL_ESTATE.title}>
      {REAL_ESTATE.body.map((p) => (
        <p key={p.slice(0, 40)} className="leading-relaxed">
          {p}
        </p>
      ))}
      <ZeffyPayButton href={ZEFFY_URL} />
    </SectionBlock>
  );
}

export function InvestmentSection() {
  return (
    <SectionBlock id="investment" title={INVESTMENT.title}>
      {INVESTMENT.body.map((p) => (
        <p key={p.slice(0, 40)} className="leading-relaxed">
          {p}
        </p>
      ))}
      <ZeffyPayButton href={ZEFFY_URL} />
    </SectionBlock>
  );
}

export function StayConnectedSection() {
  return (
    <section id="stay-connected" className="overflow-x-clip border-t border-border py-16 sm:py-20">
      <div className="mx-auto min-w-0 max-w-7xl px-4 sm:px-6">
        <h2 className="break-words font-display text-[clamp(1.75rem,7vw,3rem)] text-white sm:text-5xl">
          Stay Connected
        </h2>
        <p className="mt-4 max-w-3xl text-cool-grey">
          We&apos;re excited to continue sharing updates as Little Mounties Community Sports Complex develops.
          Join our Facebook Page to stay informed about:
        </p>
        <ul className="mt-6 grid gap-2 sm:grid-cols-2">
          {STAY_CONNECTED_BULLETS.map((item) => (
            <li key={item} className="flex gap-2 text-cool-grey">
              <Check className="mt-1 h-4 w-4 shrink-0 text-ice" />
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-3xl text-cool-grey">{STAY_CONNECTED_FOOTER}</p>
        <Link
          href={FACEBOOK_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex max-w-full flex-wrap items-center justify-center gap-2 rounded-xl bg-[#1877F2] px-5 py-3 text-center text-sm font-semibold text-white transition-opacity hover:opacity-90 sm:px-6"
        >
          <ExternalLink className="h-5 w-5" />
          Join Our Facebook Page
        </Link>
      </div>
    </section>
  );
}

export function PartnersCTASection() {
  return (
    <section className="overflow-x-clip border-t border-border py-12 sm:py-16">
      <div className="mx-auto min-w-0 max-w-7xl px-4 text-center sm:px-6">
        <h2 className="break-words font-display text-[clamp(1.5rem,6vw,1.875rem)] text-white">
          {PARTNER_CONTENT.headline}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-cool-grey">{PARTNER_CONTENT.intro}</p>
        <p className="mx-auto mt-3 max-w-2xl text-cool-grey">{PARTNER_CONTENT.destination}</p>
        <p className="mx-auto mt-3 max-w-2xl text-cool-grey">{PARTNER_CONTENT.letsTalk}</p>
        <Button href="/partners" className="mt-6">
          Partner With Us
        </Button>
      </div>
    </section>
  );
}
