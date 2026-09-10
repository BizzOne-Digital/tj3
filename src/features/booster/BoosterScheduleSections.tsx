"use client";

import { ScrollReveal } from "@/components/animation/ScrollReveal";
import { Button } from "@/components/ui/Button";
import { BOOSTER_SCHEDULE } from "@/lib/booster-schedule-content";
import { Check, CalendarDays } from "lucide-react";

export function BoosterScheduleSections() {
  return (
    <>
      <section className="overflow-x-clip border-b border-border py-12 sm:py-16">
        <div className="mx-auto min-w-0 max-w-3xl px-4 text-center sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ice">{BOOSTER_SCHEDULE.note}</p>
          <p className="mt-4 text-cool-grey">{BOOSTER_SCHEDULE.subtitle}</p>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto min-w-0 max-w-5xl px-4 sm:px-6">
          <div className="space-y-8">
            {BOOSTER_SCHEDULE.months.map((block, i) => (
              <ScrollReveal key={block.month} delay={i * 0.04}>
                <article className="glass-panel overflow-hidden rounded-2xl">
                  <div className="flex items-center gap-3 border-b border-border bg-[#06142f]/50 px-5 py-4 sm:px-6">
                    <CalendarDays className="h-5 w-5 shrink-0 text-ice" />
                    <h2 className="font-display text-2xl text-white">{block.month}</h2>
                  </div>
                  <ul className="space-y-3 px-5 py-5 sm:px-6 sm:py-6">
                    {block.items.map((item) => (
                      <li key={item} className="flex gap-3 text-sm leading-relaxed text-cool-grey sm:text-base">
                        <Check className="mt-1 h-4 w-4 shrink-0 text-ice" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal className="mt-12 text-center">
            <p className="text-sm text-cool-grey">
              Questions about booster activities or community sports programming? Reach out through our contact page.
            </p>
            <Button href="/contact" className="mt-6">
              Contact Us
            </Button>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
