"use client";

import { BRAND_LOGO } from "@/lib/constants";
import { usePrefersReducedMotion } from "@/lib/motion";
import { Logo } from "@/components/ui/Logo";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function PageIntro() {
  const reduced = usePrefersReducedMotion();
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDone(true), reduced ? 0 : 1400);
    return () => clearTimeout(t);
  }, [reduced]);

  if (done) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 0.9, duration: 0.45 }}
      onAnimationComplete={() => setDone(true)}
    >
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="px-6"
      >
        <Logo src={BRAND_LOGO} size="xl" priority />
      </motion.div>
    </motion.div>
  );
}
