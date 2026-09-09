"use client";

import Image from "next/image";
import { resolveImageUrl } from "@/lib/upload-helpers";
import { cn } from "@/lib/utils";

function useFillLayout(className?: string, fill?: boolean) {
  if (fill === false) return false;
  if (fill === true) return true;
  return Boolean(
    className?.includes("aspect") ||
      className?.includes("h-") ||
      className?.includes("min-h-"),
  );
}

export function ConceptImage({
  src,
  alt,
  className,
  fill,
  priority,
}: {
  src?: string;
  alt: string;
  className?: string;
  fill?: boolean;
  priority?: boolean;
}) {
  const url = resolveImageUrl(src || "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1200&q=80");
  const isApiUpload = url.startsWith("/api/uploads/");
  const useFill = useFillLayout(className, fill);

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
        src={url}
        alt={alt}
        fill={useFill}
        width={useFill ? undefined : 800}
        height={useFill ? undefined : 500}
        className="object-cover"
        priority={priority}
        sizes="(max-width: 768px) 100vw, 50vw"
        unoptimized={isApiUpload}
      />
      <span className="absolute bottom-3 right-3 rounded-md bg-black/70 px-2 py-1 text-[10px] uppercase tracking-wider text-ice">
        Concept Preview
      </span>
    </div>
  );
}
