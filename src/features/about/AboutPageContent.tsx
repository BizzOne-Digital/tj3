"use client";

import { ScrollReveal } from "@/components/animation/ScrollReveal";
import { SectionBlock, ZeffyPayButton } from "@/components/ui/ContentBlocks";
import { Button } from "@/components/ui/Button";
import { SiteImage } from "@/components/ui/SiteImage";
import { BRAND } from "@/lib/constants";
import {
  ECONOMIC_IMPACT,
  FACEBOOK_URL,
  HOME_WELCOME,
  ZEFFY_URL,
} from "@/lib/home-content";
import { cn } from "@/lib/utils";
import { Check, ExternalLink, MapPin, Mail, Phone, Target, TrendingUp, Users } from "lucide-react";
import Link from "next/link";

const PILLARS = [
  {
    icon: Target,
    title: "Our Mission",
    body: HOME_WELCOME.mission,
  },
  {
    icon: Users,
    title: "For Every Family",
    body: "From elite athlete development to birthday parties and family experiences, Little Mounties Community Sports Complex brings training, play, and community together under one roof.",
  },
  {
    icon: TrendingUp,
    title: "Community Impact",
    body: "We are building more than a gym — a hub of opportunity, wellness, and connection for Clearfield County and Central Pennsylvania.",
  },
];

export function AboutPageContent({ extraHtml }: { extraHtml?: string }) {
  return (
    <>
      <SectionBlock
        eyebrow={HOME_WELCOME.badge}
        title="Who We Are"
        className="border-t-0"
      >
        <div className="grid min-w-0 gap-10 lg:grid-cols-2 lg:items-start">
          <ScrollReveal className="min-w-0 space-y-5 text-base leading-relaxed">
            <p className="text-lg text-ice">{HOME_WELCOME.subheadline}</p>
            {HOME_WELCOME.paragraphs.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
            <p className="font-display text-xl text-white sm:text-2xl">{HOME_WELCOME.legacyLine}</p>
          </ScrollReveal>
          <ScrollReveal delay={0.08}>
            <SiteImage
              imageKey="welcome"
              alt="Little Mounties Community Sports Complex"
              className="aspect-[4/3] rounded-2xl"
              objectFit="contain"
            />
          </ScrollReveal>
        </div>
      </SectionBlock>

      <section className="overflow-x-clip border-t border-border py-16 sm:py-20">
        <div className="mx-auto min-w-0 max-w-7xl px-4 sm:px-6">
          <div className="grid min-w-0 gap-5 md:grid-cols-3">
            {PILLARS.map((pillar, i) => (
              <ScrollReveal key={pillar.title} delay={i * 0.06}>
                <article className="glass-panel h-full rounded-2xl p-6 sm:p-8">
                  <div className="mb-4 inline-flex rounded-xl bg-electric/15 p-3 text-ice">
                    <pillar.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-display text-xl text-white">{pillar.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-cool-grey sm:text-base">{pillar.body}</p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <SectionBlock id="vision" eyebrow="The Plan" title={HOME_WELCOME.visionTitle}>
        <p className="max-w-3xl">{HOME_WELCOME.visionIntro}</p>
        <div className="mt-8 grid min-w-0 gap-3 sm:grid-cols-2">
          {HOME_WELCOME.visionItems.map((item, i) => (
            <ScrollReveal key={item} delay={i * 0.03}>
              <div className="glass-panel flex h-full gap-3 rounded-xl p-4">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-ice" />
                <span className="text-sm leading-relaxed text-cool-grey sm:text-base">{item}</span>
              </div>
            </ScrollReveal>
          ))}
        </div>
        <div className="mt-10 grid min-w-0 gap-4 sm:grid-cols-3">
          {BRAND.taglines.map((line, i) => (
            <ScrollReveal key={line} delay={i * 0.05}>
              <p
                className={cn(
                  "rounded-xl border border-electric/20 bg-[#06142f]/40 px-4 py-5 text-center font-display text-sm uppercase leading-snug tracking-wide text-white sm:text-base",
                  i === 1 && "border-ice/30 text-ice",
                )}
              >
                {line}
              </p>
            </ScrollReveal>
          ))}
        </div>
      </SectionBlock>

      <SectionBlock id="impact" eyebrow="Clearfield County" title="An Economic Driver for Clearfield County">
        <div className="grid min-w-0 gap-4 lg:grid-cols-2">
          {ECONOMIC_IMPACT.map((item, i) => (
            <ScrollReveal key={item} delay={i * 0.04}>
              <div className="flex h-full gap-3 rounded-xl border border-border bg-graphite/40 p-5">
                <Check className="mt-1 h-5 w-5 shrink-0 text-ice" />
                <span className="leading-relaxed">{item}</span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </SectionBlock>

      <section className="overflow-x-clip border-t border-border py-16 gradient-bg sm:py-20">
        <div className="mx-auto min-w-0 max-w-7xl px-4 sm:px-6">
          <ScrollReveal>
            <div className="glass-panel rounded-2xl p-6 sm:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ice">Get In Touch</p>
              <h2 className="mt-3 font-display text-2xl text-white sm:text-3xl">Project Contact</h2>
              <div className="mt-8 grid min-w-0 gap-6 sm:grid-cols-3">
                <div className="flex gap-3">
                  <MapPin className="h-5 w-5 shrink-0 text-ice" />
                  <div>
                    <p className="text-xs uppercase tracking-wider text-cool-grey">Location</p>
                    <p className="mt-1 text-sm text-white">{BRAND.location}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Mail className="h-5 w-5 shrink-0 text-ice" />
                  <div>
                    <p className="text-xs uppercase tracking-wider text-cool-grey">Email</p>
                    <Link href={`mailto:${BRAND.email}`} className="mt-1 block text-sm text-white hover:text-ice">
                      {BRAND.email}
                    </Link>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Phone className="h-5 w-5 shrink-0 text-ice" />
                  <div>
                    <p className="text-xs uppercase tracking-wider text-cool-grey">Phone</p>
                    <Link href={`tel:${BRAND.phone}`} className="mt-1 block text-sm text-white hover:text-ice">
                      {BRAND.phone}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="overflow-x-clip border-t border-border py-16 sm:py-20">
        <div className="mx-auto min-w-0 max-w-7xl px-4 text-center sm:px-6">
          <ScrollReveal>
            <h2 className="font-display text-[clamp(1.75rem,5vw,2.5rem)] text-white">
              Help Build the Future of Community Sports
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-cool-grey">
              Partner with us, support the capital campaign, or stay connected as Little Mounties Community Sports
              Complex comes to Clearfield County.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button href="/partners">Partner With Us</Button>
              <Button href="/league" variant="outline">
                Bring Your League
              </Button>
              <Button href="/contact" variant="outline">
                Contact Us
              </Button>
              <Link
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-sm border border-[#1877F2]/60 bg-[#1877F2]/20 px-4 py-3 text-[11px] font-bold uppercase tracking-[0.15em] text-white hover:bg-[#1877F2]/35"
              >
                <ExternalLink className="h-4 w-4" />
                Facebook
              </Link>
            </div>
            <div className="mt-10 flex justify-center">
              <ZeffyPayButton href={ZEFFY_URL} label="Support the Project" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {extraHtml ? (
        <SectionBlock eyebrow="Updates" title="Latest From Our Team">
          <div className="prose-cms min-w-0" dangerouslySetInnerHTML={{ __html: extraHtml }} />
        </SectionBlock>
      ) : null}
    </>
  );
}
