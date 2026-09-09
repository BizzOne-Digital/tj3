"use client";

import { resolveImageUrl } from "@/lib/upload-helpers";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function CmsImage({
  src,
  alt,
  className,
  fill,
  priority,
  sizes,
  objectFit = "cover",
}: {
  src?: string | null;
  alt: string;
  className?: string;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
  objectFit?: "cover" | "contain";
}) {
  const resolved = resolveImageUrl(src);
  const isApiUpload = resolved.startsWith("/api/uploads/");

  return (
    <Image
      src={resolved}
      alt={alt}
      fill={fill}
      width={fill ? undefined : 800}
      height={fill ? undefined : 500}
      priority={priority}
      sizes={sizes ?? "(max-width: 768px) 100vw, 50vw"}
      unoptimized={isApiUpload}
      className={cn(objectFit === "contain" ? "object-contain" : "object-cover", className)}
    />
  );
}
