import { PageHero } from "@/components/layout/PageHero";
import { AboutPageContent } from "@/features/about/AboutPageContent";
import { api } from "@/lib/api";
import { ABOUT_CONTENT } from "@/lib/home-content";
import { getContent } from "@/lib/site-content-server";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About",
  description: "Learn about Little Mounties Community Sports Complex — our mission, vision, and community impact.",
  path: "/about",
});

const DEFAULT_ABOUT_HTML = ABOUT_CONTENT.html.trim();

export default async function AboutPage() {
  const heroes = await getContent("pageHeroes");
  let heroImageUrl: string | undefined;
  let extraHtml: string | undefined;

  try {
    const page = await api.getPage("about");
    heroImageUrl = page.data.heroImageUrl;

    const cmsContent = page.data.content?.trim();
    if (cmsContent && cmsContent !== DEFAULT_ABOUT_HTML) {
      extraHtml = cmsContent;
    }
  } catch {
    /* use client content */
  }

  return (
    <>
      <PageHero
        title={heroes.about.title}
        subtitle={heroes.about.subtitle}
        imageUrl={heroImageUrl}
      />
      <AboutPageContent extraHtml={extraHtml} />
    </>
  );
}
