"use client";

import { motion } from "framer-motion";

export function CourtLineDraw() {
  return (
    <svg viewBox="0 0 800 40" className="h-10 w-full opacity-40" aria-hidden>
      <motion.path
        d="M0 20 H800 M400 0 V40"
        fill="none"
        stroke="#73C7FF"
        strokeWidth="1"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />
    </svg>
  );
}
