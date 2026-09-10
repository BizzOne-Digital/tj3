"use client";

import Image from "next/image";
import { IMAGE_FALLBACKS, SITE_IMAGES } from "@/lib/home-content";
import { cn } from "@/lib/utils";
import { useState } from "react";

type ImageKey = keyof typeof SITE_IMAGES;

function useFillLayout(className?: string, fill?: boolean) {
  if (fill === false) return false;
  if (fill === true) return true;
  return Boolean(
    className?.includes("aspect") ||
      className?.includes("h-") ||
      className?.includes("min-h-"),
  );
}

export function SiteImage({
  imageKey,
  alt,
  className,
  fill,
  priority,
  showConceptLabel = false,
  objectFit = "cover",
}: {
  imageKey: ImageKey;
  alt: string;
  className?: string;
  fill?: boolean;
  priority?: boolean;
  showConceptLabel?: boolean;
  objectFit?: "cover" | "contain";
}) {
  const [src, setSrc] = useState(SITE_IMAGES[imageKey]);
  const fallback = IMAGE_FALLBACKS[imageKey];
  const useFill = useFillLayout(className, fill);

  if (imageKey === "campaignProspectus") {
    return null;
  }

  return (
    <div
      className={cn(
        "relative w-full max-w-full overflow-hidden bg-graphite",
        className,
        fill && "absolute inset-0",
        useFill && !className?.includes("aspect") && !className?.includes("h-") && "min-h-[12rem]",
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill={useFill}
        width={useFill ? undefined : 900}
        height={useFill ? undefined : 560}
        className={objectFit === "contain" ? "object-contain bg-white p-2" : "object-cover"}
        priority={priority}
        onError={() => setSrc(fallback)}
        sizes="(max-width: 768px) 100vw, 50vw"
      />
      {showConceptLabel && (
        <span className="absolute bottom-3 right-3 rounded-md bg-black/70 px-2 py-1 text-[10px] uppercase tracking-wider text-ice">
          Concept Preview
        </span>
      )}
    </div>
  );
}

export function SiteGalleryImage({
  src,
  alt,
  className,
  objectFit = "contain",
  objectPosition = "center",
}: {
  src: string;
  alt: string;
  className?: string;
  objectFit?: "cover" | "contain";
  objectPosition?: "center" | "top" | "bottom";
}) {
  return (
    <div className={cn("relative w-full max-w-full overflow-hidden rounded-2xl bg-[#0a1428]", className)}>
      <div
        className={cn(
          "absolute inset-0",
          objectFit === "contain" && "inset-2 sm:inset-3",
          "relative",
        )}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className={cn(
            objectFit === "contain" ? "object-contain" : "object-cover",
            objectPosition === "top" && objectFit === "cover" && "object-top",
            objectPosition === "bottom" && objectFit === "cover" && "object-bottom",
          )}
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
    </div>
  );
}
