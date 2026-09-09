"use client";

import { ScrollReveal } from "./ScrollReveal";

export function HorizontalShowcase({
  facilities,
  fallbackImage,
}: {
  facilities: { _id: string; name: string; description: string; imageUrl?: string }[];
  fallbackImage: string;
}) {
  if (facilities.length === 0) return null;
  return (
    <div className="hidden lg:block overflow-x-auto pb-8">
      <div className="flex gap-6 px-[max(1rem,calc((100vw-80rem)/2))]">
        {facilities.map((f, i) => (
          <ScrollReveal key={f._id} delay={i * 0.05}>
            <article className="glass-panel w-[420px] shrink-0 overflow-hidden rounded-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={f.imageUrl || fallbackImage} alt={f.name} className="aspect-video w-full object-cover" />
              <div className="p-6">
                <h3 className="font-display text-2xl text-white">{f.name}</h3>
                <p className="mt-2 text-sm text-cool-grey line-clamp-3">{f.description}</p>
              </div>
            </article>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
