import Image from "next/image";
import { cn } from "@/lib/utils";

export function NewsImage({
  src,
  alt,
  className,
  priority,
  objectFit = "cover",
  objectPosition = "top",
}: {
  src?: string;
  alt: string;
  className?: string;
  priority?: boolean;
  objectFit?: "cover" | "contain";
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
          objectFit === "contain" ? "object-contain p-2 sm:p-3" : "object-cover",
          objectFit === "cover" && objectPosition === "top" && "object-top",
          objectFit === "cover" && objectPosition === "bottom" && "object-bottom",
        )}
        priority={priority}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
}

/** Wide campaign flyers — show full graphic without cropping sides */
export function isNewsFlyerImage(article: { slug?: string; imageUrl?: string }) {
  return (
    article.slug === "capital-campaign-underway" ||
    article.imageUrl === "/images/welcome.jpg"
  );
}
