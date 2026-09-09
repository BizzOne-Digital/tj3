import Image from "next/image";
import { cn } from "@/lib/utils";

export function NewsImage({
  src,
  alt,
  className,
  priority,
}: {
  src?: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  const imageSrc = src || "/hero-bg.jpg";

  return (
    <div className={cn("relative w-full overflow-hidden bg-graphite", className)}>
      <Image
        src={imageSrc}
        alt={alt}
        fill
        className="object-cover"
        priority={priority}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
}
