import { ScrollReveal } from "@/components/animation/ScrollReveal";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { CmsImage } from "@/components/ui/CmsImage";
import { SiteImage } from "@/components/ui/SiteImage";
import { api } from "@/lib/api";
import { ABOUT_CONTENT } from "@/lib/home-content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About",
  description: "Learn about Little Mounties Community Sports Complex — our mission, vision, and community impact.",
  path: "/about",
});

export default async function AboutPage() {
  let content = ABOUT_CONTENT.html;
  let subtitle = ABOUT_CONTENT.subtitle;
  let heroImageUrl: string | undefined;

  try {
    const page = await api.getPage("about");
    if (page.data.content) content = page.data.content;
    subtitle = page.data.subtitle ?? subtitle;
    heroImageUrl = page.data.heroImageUrl;
  } catch {
    /* use client content */
  }

  return (
    <>
      <PageHero title="About Us" subtitle={subtitle} imageUrl={heroImageUrl} />
      <section className="py-24">
        <Container>
          <div className="grid min-w-0 gap-12 lg:grid-cols-2 lg:items-start">
            <ScrollReveal>
              {heroImageUrl ? (
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-graphite">
                  <CmsImage src={heroImageUrl} alt="About Little Mounties" fill objectFit="contain" />
                </div>
              ) : (
                <SiteImage
                  imageKey="welcome"
                  alt="Little Mounties capital campaign"
                  className="aspect-[4/3] rounded-2xl"
                  objectFit="contain"
                />
              )}
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="prose-cms min-w-0" dangerouslySetInnerHTML={{ __html: content }} />
            </ScrollReveal>
          </div>
        </Container>
      </section>
    </>
  );
}
