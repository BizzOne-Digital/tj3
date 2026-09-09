import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { api } from "@/lib/api";
import { getStaticNewsBySlug } from "@/lib/static-news";
import { articleJsonLd, buildMetadata } from "@/lib/seo";
import { formatDate, getSiteUrl } from "@/lib/utils";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  try {
    const { data } = await api.getNewsBySlug(slug);
    return buildMetadata({
      title: data.title,
      description: data.excerpt,
      path: `/news/${slug}`,
      image: data.imageUrl,
    });
  } catch {
    const article = getStaticNewsBySlug(slug);
    if (!article) return buildMetadata({ title: "Article Not Found", noIndex: true });
    return buildMetadata({
      title: article.title,
      description: article.excerpt,
      path: `/news/${slug}`,
      image: article.imageUrl,
    });
  }
}

export default async function NewsArticlePage({ params }: Props) {
  const { slug } = await params;
  let article = getStaticNewsBySlug(slug);

  try {
    const res = await api.getNewsBySlug(slug);
    if (res.data.published) article = res.data;
  } catch {
    /* use static fallback */
  }

  if (!article) notFound();

  const jsonLd = articleJsonLd({
    title: article.title,
    description: article.excerpt,
    url: `${getSiteUrl()}/news/${slug}`,
    image: article.imageUrl,
    datePublished: article.publishedAt,
    author: article.author,
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero title={article.title} subtitle={article.excerpt} imageUrl={article.imageUrl} />
      <article className="py-16">
        <Container className="max-w-3xl">
          <div className="mb-8 flex flex-wrap items-center gap-4 text-sm text-cool-grey">
            <time>{formatDate(article.publishedAt)}</time>
            {article.author && <span>By {article.author}</span>}
          </div>
          <div className="prose-cms" dangerouslySetInnerHTML={{ __html: article.content }} />
          <div className="mt-12 flex flex-wrap gap-3 border-t border-border pt-8">
            <Button href="/news" variant="outline">
              Back to News
            </Button>
            <Button href="/contact">Contact Us</Button>
          </div>
        </Container>
      </article>
    </>
  );
}
