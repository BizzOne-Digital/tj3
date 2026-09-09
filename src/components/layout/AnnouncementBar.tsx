"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export function AnnouncementBar({
  message,
  link,
  linkLabel,
  variant = "default",
}: {
  message: string;
  link?: string;
  linkLabel?: string;
  variant?: "default" | "hero";
}) {
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("lm-announcement-dismissed") === "1") setDismissed(true);
  }, []);

  if (dismissed) return null;

  const isHero = variant === "hero";

  return (
    <div
      className={
        isHero
          ? "relative overflow-x-clip border-b border-electric/20 bg-[#041028] px-4 py-2.5 text-center text-[10px] font-semibold uppercase leading-relaxed tracking-[0.15em] text-white/90 sm:text-[11px] sm:tracking-[0.35em]"
          : "relative overflow-x-clip bg-gradient-to-r from-electric to-ice px-4 py-2 pr-10 text-center text-sm font-medium leading-snug text-midnight"
      }
    >
      {message}
      {link && (
        <Link
          href={link}
          className={isHero ? "ml-2 text-ice hover:text-white" : "ml-2 underline underline-offset-2"}
        >
          {linkLabel ?? "Learn more"}
        </Link>
      )}
      {!isHero && (
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2"
          onClick={() => {
            localStorage.setItem("lm-announcement-dismissed", "1");
            setDismissed(true);
          }}
          aria-label="Dismiss"
        >
          ×
        </button>
      )}
    </div>
  );
}
