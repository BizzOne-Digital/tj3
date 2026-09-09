import Image from "next/image";
import { BRAND_LOGO } from "@/lib/constants";
import { resolveImageUrl } from "@/lib/upload-helpers";
import { cn } from "@/lib/utils";

export function Logo({
  src,
  className,
  size = "md",
  priority = false,
}: {
  src?: string;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  priority?: boolean;
}) {
  const sizes = {
    sm: "h-8 w-auto sm:h-9",
    md: "h-10 w-auto sm:h-12",
    lg: "h-14 w-auto sm:h-16",
    xl: "h-20 w-auto sm:h-24",
  };

  const imageSrc = resolveImageUrl(src || BRAND_LOGO);
  const isApiUpload = imageSrc.startsWith("/api/uploads/");

  return (
    <Image
      src={imageSrc}
      alt="Little Mounties Community Sports Complex"
      width={420}
      height={120}
      priority={priority}
      unoptimized={isApiUpload}
      className={cn("object-contain object-left max-w-[min(100%,11rem)] sm:max-w-none", sizes[size], className)}
    />
  );
}
