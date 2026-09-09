"use client";

import { motion } from "framer-motion";

export function SponsorGlowCard({
  sponsor,
}: {
  sponsor: { name: string; logoUrl?: string; tier?: string };
}) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      className="glass-panel flex flex-col items-center rounded-2xl p-6 text-center transition-shadow hover:shadow-[0_0_30px_rgba(23,107,255,0.25)]"
    >
      {sponsor.logoUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={sponsor.logoUrl} alt={sponsor.name} className="h-16 object-contain" />
      ) : (
        <div className="flex h-16 items-center font-display text-xl text-ice">{sponsor.name}</div>
      )}
      {sponsor.tier && (
        <p className="mt-3 text-xs uppercase tracking-wider text-cool-grey">{sponsor.tier}</p>
      )}
    </motion.article>
  );
}
