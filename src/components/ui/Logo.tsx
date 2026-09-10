import Image from "next/image";
import { isStoredUploadUrl, resolveSiteLogoUrl } from "@/lib/upload-helpers";
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
    sm: "h-10 w-10 sm:h-11 sm:w-11",
    md: "h-12 w-12 sm:h-14 sm:w-14",
    lg: "h-16 w-16 sm:h-20 sm:w-20",
    xl: "h-24 w-24 sm:h-28 sm:w-28",
  };

  const imageSrc = resolveSiteLogoUrl(src);
  const isApiUpload = isStoredUploadUrl(imageSrc);

  return (
    <Image
      src={imageSrc}
      alt="Little Mounties Community Sports Complex"
      width={280}
      height={280}
      priority={priority}
      unoptimized={isApiUpload || imageSrc.endsWith(".png")}
      className={cn("object-contain", sizes[size], className)}
    />
  );
}
