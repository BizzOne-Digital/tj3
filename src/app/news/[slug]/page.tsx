import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { api } from "@/lib/api";
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
    return buildMetadata({ title: "Article Not Found", noIndex: true });
  }
}

export default async function NewsArticlePage({ params }: Props) {
  const { slug } = await params;
  let article;
  try {
    const res = await api.getNewsBySlug(slug);
    article = res.data;
  } catch {
    notFound();
  }

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
          <div className="mb-8 flex items-center gap-4 text-sm text-cool-grey">
            <time>{formatDate(article.publishedAt)}</time>
            {article.author && <span>By {article.author}</span>}
          </div>
          <div className="prose-cms" dangerouslySetInnerHTML={{ __html: article.content }} />
        </Container>
      </article>
    </>
  );
}
