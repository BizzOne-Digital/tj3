import Link from "next/link";
import { ChevronRight, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

export function ZeffyPayButton({
  href,
  label = "Click Here For Payment",
  className,
}: {
  href: string;
  label?: string;
  className?: string;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex max-w-full flex-wrap items-center justify-center gap-2 rounded-sm border border-ice/80 bg-[#06142f]/80 px-4 py-3 text-center text-[10px] font-bold uppercase leading-snug tracking-[0.12em] text-white shadow-[0_0_20px_rgba(23,107,255,0.3)] transition-all hover:border-ice hover:shadow-[0_0_28px_rgba(115,199,255,0.45)] sm:px-5 sm:text-[11px] sm:tracking-[0.18em]"
      >
        {label}
        <ChevronRight className="h-4 w-4" />
      </Link>
      <p className="flex items-start gap-1.5 text-xs text-cool-grey">
        <ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0" />
        You will leave this site to complete payment securely on Zeffy.
      </p>
    </div>
  );
}

export function SectionBlock({
  id,
  eyebrow,
  title,
  children,
  className,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("overflow-x-clip border-t border-border py-16 sm:py-20 lg:py-24", className)}>
      <div className="mx-auto min-w-0 max-w-7xl px-4 sm:px-6">
        {eyebrow && (
          <p className="mb-3 break-words text-xs font-semibold uppercase tracking-[0.2em] text-ice sm:tracking-[0.35em]">
            {eyebrow}
          </p>
        )}
        <h2 className="break-words font-display text-[clamp(1.75rem,7vw,3rem)] leading-tight text-white sm:text-5xl">
          {title}
        </h2>
        <div className="mt-8 min-w-0 space-y-6 break-words text-cool-grey">{children}</div>
      </div>
    </section>
  );
}
