import { PageHero } from "@/components/layout/PageHero";
import { AboutPageContent } from "@/features/about/AboutPageContent";
import { api } from "@/lib/api";
import { ABOUT_CONTENT } from "@/lib/home-content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About",
  description: "Learn about Little Mounties Community Sports Complex — our mission, vision, and community impact.",
  path: "/about",
});

const DEFAULT_ABOUT_HTML = ABOUT_CONTENT.html.trim();

export default async function AboutPage() {
  let subtitle = ABOUT_CONTENT.subtitle;
  let heroImageUrl: string | undefined;
  let extraHtml: string | undefined;

  try {
    const page = await api.getPage("about");
    subtitle = page.data.subtitle ?? subtitle;
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
        title="About Little Mounties"
        subtitle={subtitle}
        imageUrl={heroImageUrl}
      />
      <AboutPageContent extraHtml={extraHtml} />
    </>
  );
}
