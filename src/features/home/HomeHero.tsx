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
    <section className="relative w-full max-w-full overflow-x-clip bg-black">
      {announcement?.enabled && announcement.message && (
        <AnnouncementBar
          message={announcement.message.toUpperCase()}
          link={announcement.link}
          linkLabel={announcement.linkLabel}
          variant="hero"
        />
      )}

      <Header donationUrl={donationUrl} logoUrl={logoUrl} variant="hero" />

      <div className="relative min-h-[calc(100vh-8rem)] lg:min-h-[92vh]">
        <Image
          src={HERO_BG}
          alt="Little Mounties Community Sports Complex concept preview"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#030812]/95 via-[#030812]/70 to-[#030812]/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030812] via-transparent to-[#030812]/30" />
        <div className="absolute inset-0 hero-grid opacity-30" />

        <div className="relative mx-auto flex min-h-[calc(100vh-8rem)] w-full min-w-0 max-w-[1400px] flex-col justify-center px-4 py-16 sm:px-6 lg:min-h-[92vh] lg:flex-row lg:items-center lg:justify-between lg:py-20">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="min-w-0 max-w-3xl"
          >
            <p className="mb-5 break-words text-[10px] font-semibold uppercase tracking-[0.2em] text-cool-grey sm:text-[11px] sm:tracking-[0.4em]">
              The Future of Community Sports
            </p>

            <h1 className="break-words font-display text-[clamp(2rem,8vw,4.75rem)] leading-[0.95] text-white">
              BUILDING MORE THAN A GYM.
              <span className="mt-2 block text-white">BUILDING A STRONGER COMMUNITY.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
              {BRAND.heroDescription}
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 rounded-sm border border-white/35 bg-black/20 px-6 py-3.5 text-[11px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-sm transition-colors hover:border-white hover:bg-white/10 sm:text-xs"
              >
                Explore the Vision
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>

              <SupportButton
                href={supportUrl}
                onClick={() => {
                  trackSupportClick("hero");
                  trackDonationClick("hero");
                }}
              />
            </div>

            <div className="mt-8 flex min-w-0 flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/70 sm:text-[11px] sm:tracking-[0.25em]">
              <MapPin className="h-4 w-4 shrink-0 text-ice" />
              <span className="break-words">Philipsburg • Clearfield County, PA</span>
            </div>
          </motion.div>

          <motion.div
            initial={reduced ? false : { opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-12 hidden flex-col items-end gap-5 lg:mt-0 lg:flex"
          >
            {VERTICAL_WORDS.map((word, i) => (
              <span
                key={word}
                className={cn(
                  "font-display text-2xl tracking-[0.35em] text-white/25",
                  i === 1 && "text-white/40",
                  i === 2 && "text-ice/50",
                )}
                style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
              >
                {word}
              </span>
            ))}
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 border-t border-electric/20 bg-[#030812]/85 backdrop-blur-sm">
          <div className="mx-auto flex min-w-0 max-w-[1400px] flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:px-6 sm:py-4">
            <p className="break-words text-[9px] font-semibold uppercase leading-relaxed tracking-[0.12em] text-cool-grey sm:text-[11px] sm:tracking-[0.35em]">
              Sports // Families // Opportunity // A Stronger Clearfield County
            </p>
            <p className="break-words text-[9px] font-semibold uppercase tracking-[0.12em] text-ice sm:text-[11px] sm:tracking-[0.3em]">
              Play Today. A Brighter Tomorrow.
            </p>
          </div>
        </div>

        <span className="absolute bottom-16 right-6 hidden font-display text-7xl text-white/10 lg:block">
          08
        </span>
      </div>

      <p className="sr-only">Concept Preview — architectural and facility imagery for illustration.</p>
    </section>
  );
}
