"use client";

import { MOBILE_EXTRA_LINKS, NAV_LINKS } from "@/lib/constants";
import { trackSupportClick } from "@/lib/analytics";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";
import { ChevronRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

function SupportButton({
  href,
  onClick,
  className,
}: {
  href: string;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className={cn(
        "group inline-flex max-w-full items-center gap-2 rounded-sm border border-ice/80 bg-[#06142f]/80 px-3 py-2.5 text-[10px] font-bold uppercase leading-snug tracking-[0.12em] text-white shadow-[0_0_24px_rgba(23,107,255,0.35)] transition-all hover:border-ice hover:shadow-[0_0_32px_rgba(115,199,255,0.5)] sm:px-4 sm:text-[11px] sm:tracking-[0.2em]",
        className,
      )}
    >
      Support the Project
      <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}

function MobileNav({
  open,
  onClose,
  logoUrl,
  supportUrl,
}: {
  open: boolean;
  onClose: () => void;
  logoUrl?: string;
  supportUrl: string;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!open || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] lg:hidden">
      <button
        type="button"
        aria-label="Close menu"
        className="absolute inset-0 bg-midnight/95 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative flex h-full flex-col bg-[#030812]">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-4 sm:px-6">
          <Link href="/" onClick={onClose} className="min-w-0 shrink">
            <Logo src={logoUrl} size="md" priority />
          </Link>
          <button
            type="button"
            className="rounded-lg p-2 text-white transition-colors hover:bg-white/10"
            onClick={onClose}
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto overscroll-contain p-4 sm:p-6">
          <div className="flex flex-col gap-1">
            {[...NAV_LINKS, ...MOBILE_EXTRA_LINKS].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="rounded-lg px-4 py-3 text-lg font-display tracking-wider text-white hover:bg-white/5"
              >
                {link.label}
              </Link>
            ))}
            <SupportButton
              href={supportUrl}
              className="mt-4 justify-center"
              onClick={() => {
                trackSupportClick("mobile-nav");
                onClose();
              }}
            />
          </div>
        </nav>
      </div>
    </div>,
    document.body,
  );
}

export function Header({
  donationUrl,
  logoUrl,
  variant = "default",
}: {
  donationUrl?: string;
  logoUrl?: string;
  variant?: "default" | "hero";
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const isHero = variant === "hero";

  useEffect(() => {
    if (isHero) return;
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHero]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const supportUrl =
    donationUrl ||
    "https://www.zeffy.com/en-US/donation-form/little-mounties-community-sports-complex";

  return (
    <>
      <header
        className={cn(
          "z-50 w-full max-w-full transition-all duration-300",
          isHero
            ? cn(
                "relative border-b border-white/10 bg-[#050b18]/55 backdrop-blur-md",
                open && "sticky top-0",
              )
            : cn(
                "sticky top-0",
                scrolled ? "bg-midnight/95 backdrop-blur-md shadow-lg" : "bg-transparent",
              ),
        )}
      >
        <div className="relative mx-auto flex min-w-0 max-w-[1400px] items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:py-4">
          <Link href="/" className="relative z-10 min-w-0 shrink">
            <Logo src={logoUrl} size={isHero ? "lg" : "md"} priority />
          </Link>

          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/75 transition-colors hover:text-ice"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="relative z-10 hidden lg:block">
            <SupportButton
              href={supportUrl}
              onClick={() => trackSupportClick("nav")}
            />
          </div>

          <button
            type="button"
            className="relative z-10 rounded-lg p-2 text-white lg:hidden"
            onClick={() => setOpen((prev) => !prev)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      <MobileNav
        open={open}
        onClose={() => setOpen(false)}
        logoUrl={logoUrl}
        supportUrl={supportUrl}
      />
    </>
  );
}

export { SupportButton };
