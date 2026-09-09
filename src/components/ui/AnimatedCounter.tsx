"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/motion";

export function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  label,
  duration = 2000,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  label?: string;
  duration?: number;
}) {
  const [display, setDisplay] = useState(0);
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (reduced) {
      setDisplay(value);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            setDisplay(Math.floor(progress * value));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration, reduced]);

  return (
    <div ref={ref} className="text-center">
      <p className="font-display text-5xl gradient-text">
        {prefix}
        {display.toLocaleString()}
        {suffix}
      </p>
      {label && <p className="mt-2 text-sm uppercase tracking-wider text-cool-grey">{label}</p>}
    </div>
  );
}
