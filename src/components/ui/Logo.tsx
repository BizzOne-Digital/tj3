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
    sm: "h-9 w-auto sm:h-10",
    md: "h-11 w-auto sm:h-14",
    lg: "h-14 w-auto sm:h-[4.5rem]",
    xl: "h-20 w-auto sm:h-24",
  };

  const imageSrc = resolveImageUrl(src || BRAND_LOGO);
  const isApiUpload = imageSrc.startsWith("/api/uploads/");

  return (
    <Image
      src={imageSrc}
      alt="Little Mounties Community Sports Complex"
      width={520}
      height={140}
      priority={priority}
      unoptimized={isApiUpload || imageSrc.endsWith(".png")}
      className={cn("h-auto w-auto object-contain object-left", sizes[size], className)}
    />
  );
}
