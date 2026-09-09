import { ScrollReveal } from "@/components/animation/ScrollReveal";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { ConceptImage } from "@/components/ui/ConceptImage";
import { api } from "@/lib/api";
import { buildMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

export const metadata = buildMetadata({
  title: "News",
  description: "Latest news and updates from Little Mounties Community Sports Complex.",
  path: "/news",
});

export default async function NewsPage() {
  let articles: Awaited<ReturnType<typeof api.getNews>>["data"] = [];
  try {
    const res = await api.getNews();
    articles = res.data.filter((a) => a.published);
  } catch {
    /* empty */
  }

  return (
    <>
      <PageHero title="News" subtitle="Stay up to date with our community." />
      <section className="py-24">
        <Container>
          {articles.length === 0 ? (
            <p className="text-center text-cool-grey">No news articles yet.</p>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article, i) => (
                <ScrollReveal key={article._id} delay={i * 0.05}>
                  <Link href={`/news/${article.slug}`} className="group glass-panel block overflow-hidden rounded-2xl">
                    <ConceptImage src={article.imageUrl} alt={article.title} className="aspect-video" />
                    <div className="p-6">
                      <time className="text-xs uppercase tracking-wider text-ice">
                        {formatDate(article.publishedAt)}
                      </time>
                      <h2 className="mt-2 font-display text-2xl text-white group-hover:text-ice transition-colors">
                        {article.title}
                      </h2>
                      <p className="mt-2 text-sm text-cool-grey line-clamp-3">{article.excerpt}</p>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
