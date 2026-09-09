"use client";

import { BRAND, HERO_BG } from "@/lib/constants";
import { trackDonationClick, trackSupportClick } from "@/lib/analytics";
import { Header, SupportButton } from "@/components/layout/Header";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { usePrefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { ChevronRight, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const VERTICAL_WORDS = ["SPORTS", "FAMILIES", "OPPORTUNITY", "COMMUNITY"];

export function HomeHero({
  donationUrl,
  logoUrl,
  announcement,
}: {
  donationUrl?: string;
  logoUrl?: string;
  announcement?: {
    enabled?: boolean;
    message?: string;
    link?: string;
    linkLabel?: string;
  };
}) {
  const reduced = usePrefersReducedMotion();
  const supportUrl = donationUrl || BRAND.donationUrl;

  return (
    <section className="relative w-full max-w-full overflow-x-clip bg-[#030812]">
      {announcement?.enabled && announcement.message && (
        <AnnouncementBar
          message={announcement.message.toUpperCase()}
          link={announcement.link}
          linkLabel={announcement.linkLabel}
          variant="hero"
        />
      )}

      <Header donationUrl={donationUrl} logoUrl={logoUrl} variant="hero" />

      <div className="relative min-h-[calc(100vh-7rem)] lg:min-h-[92vh]">
        <Image
          src={HERO_BG}
          alt="Little Mounties Community Sports Complex"
          fill
          priority
          className="object-cover object-[28%_center] sm:object-[35%_center] lg:object-[42%_center]"
          sizes="100vw"
        />

        {/* Left-heavy overlay for headline readability (matches mockup) */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#030812]/98 via-[#030812]/75 to-[#030812]/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030812] via-[#030812]/20 to-transparent" />
        <div className="absolute inset-0 hero-grid opacity-25" />

        <div className="relative mx-auto flex min-h-[calc(100vh-7rem)] w-full min-w-0 max-w-[1400px] flex-col justify-center px-4 py-14 sm:px-6 lg:min-h-[92vh] lg:flex-row lg:items-center lg:justify-between lg:py-16">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="min-w-0 max-w-2xl lg:max-w-3xl"
          >
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-cool-grey sm:text-[11px] sm:tracking-[0.4em]">
              The Future of Community Sports
            </p>

            <h1 className="break-words font-display text-[clamp(2.25rem,7.5vw,4.5rem)] leading-[0.92] text-white">
              BUILDING MORE THAN A GYM.
              <span className="mt-1 block text-white">BUILDING A STRONGER COMMUNITY.</span>
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/85 sm:text-base lg:text-lg">
              {BRAND.heroDescription}
            </p>

            <div className="mt-8 flex flex-wrap gap-3 sm:mt-10 sm:gap-4">
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 rounded-sm border border-white/40 bg-black/25 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-sm transition-colors hover:border-white hover:bg-white/10 sm:px-6 sm:py-3.5 sm:text-[11px]"
              >
                Explore the Vision
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>

              <SupportButton
                href={supportUrl}
                className="shadow-[0_0_32px_rgba(23,107,255,0.45)]"
                onClick={() => {
                  trackSupportClick("hero");
                  trackDonationClick("hero");
                }}
              />
            </div>

            <div className="mt-7 flex min-w-0 flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/75 sm:text-[11px] sm:tracking-[0.25em]">
              <MapPin className="h-4 w-4 shrink-0 text-ice" />
              <span className="break-words">Philipsburg • Clearfield County, PA</span>
            </div>
          </motion.div>

          <motion.div
            initial={reduced ? false : { opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="pointer-events-none mt-10 hidden flex-col items-end gap-4 lg:mt-0 lg:flex"
          >
            {VERTICAL_WORDS.map((word, i) => (
              <span
                key={word}
                className={cn(
                  "font-display text-xl tracking-[0.35em] text-white/20 xl:text-2xl",
                  i === 1 && "text-white/35",
                  i === 2 && "text-ice/45",
                  i === 3 && "text-white/25",
                )}
                style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
              >
                {word}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Hero bottom ticker (inside hero, above site footer) */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-electric/25 bg-[#030812]/90 backdrop-blur-sm">
          <div className="mx-auto flex min-w-0 max-w-[1400px] flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:px-6 sm:py-3.5">
            <p className="break-words text-[9px] font-semibold uppercase leading-relaxed tracking-[0.12em] text-cool-grey sm:text-[10px] sm:tracking-[0.32em]">
              Sports // Families // Opportunity // A Stronger Clearfield County
            </p>
            <p className="break-words text-[9px] font-semibold uppercase tracking-[0.12em] text-ice sm:text-[10px] sm:tracking-[0.28em]">
              Play Today. A Brighter Tomorrow. ///
            </p>
          </div>
        </div>

        <span
          className="pointer-events-none absolute bottom-14 right-4 hidden select-none font-display text-6xl text-white/[0.07] sm:text-7xl lg:block xl:right-8 xl:text-8xl"
          aria-hidden
        >
          08
        </span>
      </div>
    </section>
  );
}
