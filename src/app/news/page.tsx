import { ScrollReveal } from "@/components/animation/ScrollReveal";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { NewsImage } from "@/components/ui/NewsImage";
import { api } from "@/lib/api";
import { getStaticNewsArticles } from "@/lib/static-news";
import { buildMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

export const metadata = buildMetadata({
  title: "News",
  description: "Latest news and updates from Little Mounties Community Sports Complex.",
  path: "/news",
});

export default async function NewsPage() {
  let articles = getStaticNewsArticles();
  try {
    const res = await api.getNews();
    const fromDb = res.data.filter((a) => a.published);
    if (fromDb.length > 0) articles = fromDb;
  } catch {
    /* use static articles */
  }

  return (
    <>
      <PageHero title="News" subtitle="Stay up to date with our community." />
      <section className="py-24">
        <Container>
          <div className="grid min-w-0 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article, i) => (
              <ScrollReveal key={article._id} delay={i * 0.05} className="h-full">
                <Link
                  href={`/news/${article.slug}`}
                  className="group glass-panel flex h-full min-w-0 flex-col overflow-hidden rounded-2xl"
                >
                  <NewsImage
                    src={article.imageUrl}
                    alt={article.title}
                    className="aspect-[4/5] min-h-[220px] shrink-0 sm:min-h-[240px]"
                    priority={i < 3}
                  />
                  <div className="flex flex-1 flex-col p-6">
                    <time className="text-xs uppercase tracking-wider text-ice">
                      {formatDate(article.publishedAt)}
                    </time>
                    <h2 className="mt-2 font-display text-2xl text-white transition-colors group-hover:text-ice">
                      {article.title}
                    </h2>
                    <p className="mt-2 flex-1 text-sm text-cool-grey line-clamp-3">{article.excerpt}</p>
                    <span className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-ice">
                      Read More →
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
