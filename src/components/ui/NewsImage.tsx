import Image from "next/image";
import { cn } from "@/lib/utils";

export function NewsImage({
  src,
  alt,
  className,
  priority,
  objectPosition = "top",
}: {
  src?: string;
  alt: string;
  className?: string;
  priority?: boolean;
  objectPosition?: "center" | "top" | "bottom";
}) {
  const imageSrc = src || "/hero-bg.jpg";

  return (
    <div className={cn("relative w-full overflow-hidden bg-[#0a1428]", className)}>
      <Image
        src={imageSrc}
        alt={alt}
        fill
        className={cn(
          "object-cover",
          objectPosition === "top" && "object-top",
          objectPosition === "bottom" && "object-bottom",
        )}
        priority={priority}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
}
