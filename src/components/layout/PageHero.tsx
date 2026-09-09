import { CmsImage } from "@/components/ui/CmsImage";

export function PageHero({
  title,
  subtitle,
  imageUrl,
}: {
  title: string;
  subtitle?: string;
  imageUrl?: string;
}) {
  return (
    <section className="relative overflow-x-clip border-b border-border py-16 gradient-bg sm:py-24">
      {imageUrl && (
        <div className="pointer-events-none absolute inset-0 opacity-20">
          <CmsImage src={imageUrl} alt="" fill className="object-cover" />
        </div>
      )}
      <div className="relative mx-auto min-w-0 max-w-7xl px-4 sm:px-6">
        <h1 className="break-words font-display text-[clamp(2rem,8vw,3.75rem)] leading-tight text-white">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl break-words text-base text-cool-grey sm:text-lg">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
