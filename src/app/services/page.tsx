import { ScrollReveal } from "@/components/animation/ScrollReveal";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { CmsImage } from "@/components/ui/CmsImage";
import { SiteImage } from "@/components/ui/SiteImage";
import { api } from "@/lib/api";
import { OFFERINGS, STATIC_SERVICES } from "@/lib/home-content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Facility & Services",
  description: "Programs, training, and services at Little Mounties Community Sports Complex.",
  path: "/services",
});

export default async function ServicesPage() {
  let services: Awaited<ReturnType<typeof api.getServices>>["data"] = [];
  try {
    const res = await api.getServices();
    services = res.data.filter((s) => s.published);
  } catch {
    /* empty */
  }

  const useStatic = services.length === 0;
  const items = useStatic
    ? STATIC_SERVICES
    : services.map((s) => ({
        name: s.name,
        description: s.description,
        imageKey: undefined as undefined,
        imageUrl: s.imageUrl,
      }));

  return (
    <>
      <PageHero
        title="Facility & Services"
        subtitle="What Little Mounties Community Sports Complex is offering."
      />
      <section className="py-24">
        <Container>
          <p className="mx-auto mb-12 max-w-3xl text-center text-cool-grey">{OFFERINGS.intro}</p>
          <div className="grid min-w-0 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {items.map((service, i) => (
              <ScrollReveal key={service.name} delay={i * 0.05} className="h-full">
                <article className="glass-panel flex h-full min-w-0 flex-col overflow-hidden rounded-2xl">
                  {"imageKey" in service && service.imageKey ? (
                    <SiteImage
                      imageKey={service.imageKey}
                      alt={service.name}
                      className="aspect-video shrink-0"
                    />
                  ) : "imageUrl" in service && service.imageUrl ? (
                    <div className="relative aspect-video w-full shrink-0">
                      <CmsImage src={service.imageUrl} alt={service.name} fill />
                    </div>
                  ) : null}
                  <div className="flex flex-1 flex-col p-6">
                    <h2 className="font-display text-2xl text-white">{service.name}</h2>
                    <p className="mt-2 flex-1 text-cool-grey">{service.description}</p>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
