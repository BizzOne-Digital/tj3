import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full min-w-0 max-w-7xl px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("mb-12", align === "center" && "text-center")}>
      {eyebrow && (
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-ice">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-4xl text-white sm:text-5xl">{title}</h2>
      {description && (
        <p
          className={cn(
            "mt-4 max-w-2xl text-cool-grey",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
