"use client";

import { usePrefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export function MagneticButton({
  href,
  children,
  external,
  variant = "primary",
  size = "md",
  className,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  variant?: "primary" | "outline" | "secondary";
  size?: "md" | "lg";
  className?: string;
  onClick?: () => void;
}) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLAnchorElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const variants = {
    primary: "bg-gradient-to-r from-electric to-ice text-midnight",
    outline: "border border-ice/40 text-white hover:border-ice",
    secondary: "bg-mountie text-white",
  };

  useEffect(() => {
    if (reduced || !ref.current) return;
    const el = ref.current;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.15;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.15;
      setOffset({ x, y });
    };
    const onLeave = () => setOffset({ x: 0, y: 0 });
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [reduced]);

  return (
    <motion.div
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Link
        ref={ref}
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        onClick={onClick}
        className={cn(
          "inline-flex items-center justify-center rounded-xl font-semibold transition-shadow hover:shadow-[0_0_30px_rgba(23,107,255,0.35)]",
          variants[variant],
          size === "lg" ? "px-8 py-4 text-base" : "px-5 py-3 text-sm",
          className,
        )}
      >
        {children}
      </Link>
    </motion.div>
  );
}
