import { PageHero } from "@/components/layout/PageHero";
import { CmsImage } from "@/components/ui/CmsImage";
import { Container } from "@/components/ui/Container";
import { api } from "@/lib/api";
import { buildMetadata } from "@/lib/seo";
import { getContent } from "@/lib/site-content-server";
import type { GalleryImage } from "@/types/cms";

export const metadata = buildMetadata({
  title: "Gallery",
  description: "Photos from Little Mounties Community Sports Complex.",
  path: "/gallery",
});

export default async function GalleryPage() {
  const heroes = await getContent("pageHeroes");
  let images: GalleryImage[] = [];
  try {
    images = (await api.getGallery()).data;
  } catch {
    /* show empty state */
  }

  return (
    <>
      <PageHero title={heroes.gallery.title} subtitle={heroes.gallery.subtitle} />
      <section className="py-20">
        <Container>
          {images.length === 0 ? (
            <p className="mx-auto max-w-xl rounded-xl border border-border bg-surface p-8 text-center text-cool-grey">
              Photos are coming soon.
            </p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {images.map((img) => (
                <figure key={img._id} className="glass-panel overflow-hidden rounded-2xl">
                  <div className="relative aspect-[4/3] w-full bg-graphite">
                    <CmsImage src={img.imageUrl} alt={img.title || img.caption || "Gallery photo"} fill />
                  </div>
                  {(img.title || img.caption) && (
                    <figcaption className="p-4">
                      {img.title && <p className="font-display text-lg text-white">{img.title}</p>}
                      {img.caption && <p className="mt-1 text-sm text-cool-grey">{img.caption}</p>}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
