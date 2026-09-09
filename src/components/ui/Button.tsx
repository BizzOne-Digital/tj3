import { cn } from "@/lib/utils";
import Link from "next/link";
import { forwardRef } from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: string;
  external?: boolean;
  variant?: "primary" | "outline" | "ghost" | "secondary";
  size?: "sm" | "md" | "lg";
};

const variants = {
  primary:
    "bg-gradient-to-r from-electric to-ice text-midnight hover:shadow-[0_0_30px_rgba(23,107,255,0.4)]",
  outline: "border border-ice/40 text-white hover:border-ice hover:bg-white/5",
  ghost: "text-cool-grey hover:text-white hover:bg-white/5",
  secondary: "bg-mountie text-white hover:bg-electric/80",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, href, external, variant = "primary", size = "md", children, ...props }, ref) => {
    const classes = cn(
      "inline-flex max-w-full items-center justify-center rounded-xl font-semibold transition-all duration-300",
      size === "sm" ? "px-3 py-2 text-xs" : size === "lg" ? "px-8 py-4 text-base" : "px-5 py-3 text-sm",
      variants[variant],
      className,
    );

    if (href) {
      return (
        <Link
          href={href}
          className={classes}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
        >
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  },
);
Button.displayName = "Button";
